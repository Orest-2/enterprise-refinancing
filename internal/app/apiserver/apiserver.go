package apiserver

import (
	"encoding/json"
	"log"
	"math"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
	"gonum.org/v1/gonum/mat"
)

// APIServer ...
type APIServer struct {
	config *Config
	logger *logrus.Logger
	router *mux.Router
}

// New ...
func New(config *Config) *APIServer {
	return &APIServer{
		config: config,
		logger: logrus.New(),
		router: mux.NewRouter(),
	}
}

// Start ...
func (s *APIServer) Start() error {
	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be set")
	} else {
		s.config.BindAdd = port
	}

	if err := s.configureLogger(); err != nil {
		return err
	}

	s.configureRouter()

	s.logger.Infof("starting api server on %v", s.config.BindAdd)

	return http.ListenAndServe(s.config.BindAdd, s.router)
}

func (s *APIServer) configureLogger() error {
	level, err := logrus.ParseLevel(s.config.LogLevel)
	if err != nil {
		return err
	}

	s.logger.SetLevel(level)

	return nil
}

func (s *APIServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	path = filepath.Join(s.config.StaticPath, path)

	_, err = os.Stat(s.config.StaticPath)
	if os.IsNotExist(err) {
		http.ServeFile(w, r, filepath.Join(s.config.StaticPath, s.config.IndexPath))
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.FileServer(http.Dir(s.config.StaticPath)).ServeHTTP(w, r)
}

// CORS Middleware
func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
		return
	})
}

func (s *APIServer) configureRouter() {
	s.router.Use(CORS)
	s.router.HandleFunc("/api/calc", s.handleCalc()).Methods(http.MethodPost, http.MethodOptions)

	s.router.PathPrefix("/").Handler(s)
}

// Model ...
type Model struct {
	Data [][]float64 `json:"data"`
}

// Criterion ...
type Criterion struct {
	P float64 `json:"p"`
	T float64 `json:"t"`
}

func calcB(l, esum, esum2, eqsumi, qsumi float64) float64 {
	f := l*eqsumi - esum*qsumi
	s := l*esum2 - esum*esum

	return f / s
}

func calcA(l, esum, qsumi, b float64) float64 {
	y := 1 / l * qsumi
	x := 1 / l * esum

	return y - b*x
}

func calcY(nrow, year float64, erow, qrow []float64) float64 {
	var esum, esum2, eqsumi, qsumi float64

	l := float64(len(erow))

	for i, q := range qrow {
		esum += erow[i]
		qsumi += math.Pow(q, nrow)
		eqsumi += erow[i] * math.Pow(q, nrow)
		esum2 += math.Pow(erow[i], 2.0)
	}

	b := calcB(l, esum, esum2, eqsumi, qsumi)
	a := calcA(l, esum, qsumi, b)

	return a + b*year
}

func findMinAndMax(a []float64) (min, max float64) {
	min = a[0]
	max = a[0]
	for _, value := range a {
		if value < min {
			min = value
		}
		if value > max {
			max = value
		}
	}
	return min, max
}

func calcZ(t, y, miny, maxy float64) float64 {
	f := math.Abs(t - y)
	s := math.Max(t-miny, maxy-t)

	return 1 - f/s
}

func (s *APIServer) handleCalc() http.HandlerFunc {
	type request struct {
		Range      []float64   `json:"range"`
		Criterions []Criterion `json:"criterions"`
		Models     []Model     `json:"models"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		s.logger.Print("/calc")

		data := &request{}
		datai := interface{}(data)

		if err := json.NewDecoder(r.Body).Decode(&datai); err != nil {
			s.error(w, r, http.StatusBadRequest, err)
			return
		}

		nextYear := data.Range[len(data.Range)-1] + 1

		tdata := mat.NewDense(len(data.Criterions), len(data.Models), nil)
		zdata := mat.NewDense(len(data.Criterions), len(data.Models), nil)

		var (
			psum     float64
			alfadata []float64
			adata    []float64
		)

		for i, c := range data.Criterions {
			for j, m := range data.Models {
				y := calcY(float64(1), nextYear, data.Range, m.Data[i])
				tdata.Set(i, j, y)
			}
			psum += c.P
		}

		for i, cdata := range data.Criterions {
			yrow := mat.Row(nil, i, tdata)
			miny, maxy := findMinAndMax(yrow)

			for j := 0; j < tdata.RawMatrix().Cols; j++ {
				z := calcZ(cdata.T, yrow[j], miny, maxy)
				zdata.Set(i, j, z)
			}
			alfadata = append(alfadata, cdata.P/psum)
		}

		for i := 0; i < len(data.Models); i++ {
			s := 0.0
			for j, alf := range alfadata {
				col := mat.Col(nil, i, zdata)
				s += alf * col[j]
			}
			adata = append(adata, s)
		}

		res := map[string]interface{}{
			"table":    tdata.RawMatrix(),
			"z":        zdata.RawMatrix(),
			"alfadata": alfadata,
			"adata":    adata,
		}

		s.respond(w, r, http.StatusOK, res)
	}
}

func (s *APIServer) error(w http.ResponseWriter, r *http.Request, code int, err error) {
	s.respond(w, r, code, map[string]string{"error": err.Error()})
}

func (s *APIServer) respond(w http.ResponseWriter, r *http.Request, code int, data interface{}) {
	w.WriteHeader(code)
	if data != nil {
		json.NewEncoder(w).Encode(data)
	}
}
