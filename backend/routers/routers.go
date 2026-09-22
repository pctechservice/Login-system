package routers

import (
	"database/sql"
	"login-system/handlers"
	"net/http"
)

func enableCORS(next http.HandlerFunc) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Responde a la solicitud preflight del navegador
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next(w, r)
	}
}

func SetupRoutes(db *sql.DB) {

	// Rota login
	http.HandleFunc("/login", enableCORS(handlers.LoginHandler(db)))

	// Rota para criar usuários
	http.HandleFunc("/users", enableCORS(handlers.CreateUserHandler(db)))
}
