package routers

import (
	"database/sql"
	"login-system/handlers"
	"net/http"
)

func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		if origin == "http://127.0.0.1:5500" || origin == "http://localhost:5500" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		}
		w.Header().Set("Vary", "Origin")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next(w, r)
	}
}

// APENAS UMA FUNÇÃO SetupRoutes no ficheiro inteiro:
func SetupRoutes(db *sql.DB) {
	// Rota login
	http.HandleFunc("/login", enableCORS(handlers.LoginHandler(db)))

	// Rota para criar usuários
	http.HandleFunc("/users", enableCORS(handlers.CreateUserHandler(db)))

	// A tua rota nova
	http.HandleFunc("/api/criar-perfil", enableCORS(handlers.CreateUserHandler(db)))

	http.HandleFunc("/health", enableCORS(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			w.Header().Set("Allow", http.MethodGet)
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		_, _ = w.Write([]byte(`{"status":"ok"}`))
	}))
}
