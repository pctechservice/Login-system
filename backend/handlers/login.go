package handlers

import (
	"database/sql"
	"encoding/json"
	"login-system/database"
	"login-system/models"
	"net/http"
)

type LoginResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

func LoginHandler(db *sql.DB) http.HandlerFunc {

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

		// Procura o usuário no banco de dados
		user, err := database.GetUser(db, input.Username)

		if err == sql.ErrNoRows {
			w.WriteHeader(http.StatusUnauthorized)

			json.NewEncoder(w).Encode(LoginResponse{
				Success: false,
				Message: "Login incorreto",
			})

			return
		}

		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)

			json.NewEncoder(w).Encode(LoginResponse{
				Success: false,
				Message: "Erro interno do servidor",
			})

			return
		}

		// Compara a senha recebida com a senha do banco
		if user.Password != input.Password {
			w.WriteHeader(http.StatusUnauthorized)

			json.NewEncoder(w).Encode(LoginResponse{
				Success: false,
				Message: "Login incorreto",
			})

			return
		}

		// Login correto
		json.NewEncoder(w).Encode(LoginResponse{
			Success: true,
			Message: "Login correto",
		})
	}
}
