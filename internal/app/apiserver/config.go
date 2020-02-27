package apiserver

// Config ...
type Config struct {
	BindAdd    string `toml:"bind_addr"`
	LogLevel   string `toml:"log_level"`
	StaticPath string `toml:"static_path"`
	IndexPath  string `toml:"index_path"`
}

// NewConfig ...
func NewConfig() *Config {
	return &Config{
		BindAdd:    ":8080",
		LogLevel:   "debug",
		StaticPath: "client/dist",
		IndexPath:  "index.html",
	}
}
