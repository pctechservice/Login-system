package handlers

import (
	"fmt"
	"login-system/models"
	"net/http"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {

	// Verifica se o método é POST
	if r.Method != http.MethodPost {
		fmt.Fprintf(w, "Metodo nao permitido")
		return
	}

	// Recebe dados do formulário
	user := models.User{
		Username: "admin",
		Password: "1234",
	}
	// Login simples
	if user.Username == "admin" && user.Password == "1234" {
		fmt.Fprintf(w, "Login correto")
	} else {
		fmt.Fprintf(w, "Login incorreto")
	}
}
