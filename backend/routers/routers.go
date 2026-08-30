package routers

import (
	"login-system/handlers"
	"net/http"
)

func SetupRoutes() {
	// Rota login
	http.HandleFunc("/login", handlers.LoginHandler)
}
