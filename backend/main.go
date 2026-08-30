package main

import (
	"fmt"
	"login-system/database"
	"login-system/routers"
	"net/http"
)

func main() {

	db, err := database.ConnectDB()
	if err != nil {
		fmt.Println("Erro ao conectar ao banco de dados:", err)
		return
	}
	defer db.Close()

	err = database.CreateUserTable(db)
	if err != nil {
		fmt.Println("Erro ao criar tabela de usuários:", err)
		return
	}

	routers.SetupRoutes()

	fmt.Println("Servidor rodando em http://localhost:8080")

	// Inicia servidor
	http.ListenAndServe(":8080", nil)
}
