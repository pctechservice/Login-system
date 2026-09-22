package routers

import (
	"database/sql"
	"login-system/handlers"
	"net/http"
)

func SetupRoutes(db *sql.DB) {

	// Rota login
	http.HandleFunc("/login", handlers.LoginHandler(db))
	// Rota para gerenciar usuários
	http.HandleFunc("/users", handlers.CreateUserHandler(db))
}
