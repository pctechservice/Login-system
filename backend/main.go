package main

import (
	"log"
	"login-system/database"
	"login-system/routers"
	"net/http"
)

func main() {

	db, err := database.ConnectDB()
	if err != nil {
		log.Println("Erro ao conectar ao banco de dados:", err)
		return
	}
	defer db.Close()

	err = database.CreateUserTable(db)
	if err != nil {
		log.Println("Erro ao criar tabela de usuários:", err)
		return
	}

	routers.SetupRoutes(db)

	log.Println("Servidor rodando em http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("Erro ao iniciar servidor:", err)
	}
}
