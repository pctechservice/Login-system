package main

import (
	"fmt"
	"net/http"
)

func loginHandler(w http.ResponseWriter, r *http.Request) {

	// Verifica se o método é POST
	if r.Method != http.MethodPost {
		fmt.Fprintf(w, "Metodo nao permitido")
		return
	}

	// Recebe dados do formulário
	usuario := r.FormValue("usuario")
	password := r.FormValue("password")

	// Login simples
	if usuario == "admin" && password == "1234" {
		fmt.Fprintf(w, "Login correto")
	} else {
		fmt.Fprintf(w, "Login incorreto")
	}
}

func main() {

	// Rota login
	http.HandleFunc("/login", loginHandler)

	fmt.Println("Servidor rodando em http://localhost:8080")

	// Inicia servidor
	http.ListenAndServe(":8080", nil)
}
