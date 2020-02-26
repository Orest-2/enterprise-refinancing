package apiserver

// Config ...
type Config struct {
	BindAdd  string `toml:"bind_addr"`
	LogLevel string `toml:"log_level"`
}

// NewConfig ...
func NewConfig() *Config {
	return &Config{
		BindAdd:  ":8080",
		LogLevel: "debug",
	}
}
