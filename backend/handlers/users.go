package handlers

import (
	"database/sql"
	"encoding/json"
	"login-system/database"
	"login-system/models"
	"net/http"
)

func CreateUserHandler(db *sql.DB) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Content-Type", "application/json")

		// Verifica se o método é POST
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)

			json.NewEncoder(w).Encode(LoginResponse{
				Success: false,
				Message: "Método não permitido",
			})

			return
		}

		// Recebe os dados enviados pelo frontend
		var input models.User

		err := json.NewDecoder(r.Body).Decode(&input)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)

			json.NewEncoder(w).Encode(LoginResponse{
				Success: false,
				Message: "Dados inválidos",
			})

			return
		}

		// Cria o usuário no banco de dados
		err = database.CreateUser(db, input.Username, input.Password)

		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)

			json.NewEncoder(w).Encode(LoginResponse{
				Success: false,
				Message: "Erro ao criar usuário",
			})

			return
		}

		// Usuário criado com sucesso
		json.NewEncoder(w).Encode(LoginResponse{
			Success: true,
			Message: "Usuário criado com sucesso",
		})
	}
}
