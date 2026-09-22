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

	//err = database.CreateUser(db, "MARIA", "MARIA123")
	//if err != nil {
	//	fmt.Println("Erro ao criar usuário:", err)
	//	return
	//}

	err = database.CheckUsersTable(db)
	if err != nil {
		fmt.Println("Erro ao verificar tabela de usuários:", err)
		return
	}

	user, err := database.GetUser(db, "john_doe")
	if err != nil {
		fmt.Println("Erro ao buscar usuário:", err)
		return

	}
	fmt.Println("Usuário encontrado:", user.Username)

	routers.SetupRoutes(db)

	fmt.Println("Servidor rodando em http://localhost:8080")

	// Inicia servidor
	http.ListenAndServe(":8080", nil)
}
