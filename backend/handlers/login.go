package handlers

import (
	"database/sql"
	"encoding/json"
	"io"
	"login-system/database"
	"login-system/models"
	"net/http"
	"strings"
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

		var input models.User
		decoder := json.NewDecoder(r.Body)
		if err := decoder.Decode(&input); err != nil {
			writeLoginResponse(w, http.StatusBadRequest, false, "Dados inválidos")
			return
		}
		if err := decoder.Decode(new(any)); err != io.EOF {
			writeLoginResponse(w, http.StatusBadRequest, false, "Dados inválidos")
			return
		}
		if strings.TrimSpace(input.Username) == "" || input.Password == "" {
			writeLoginResponse(w, http.StatusBadRequest, false, "Username e password são obrigatórios")
			return
		}

		// Procura o usuário no banco de dados
		user, err := database.GetUser(db, input.Username)

		if err == sql.ErrNoRows {
			writeLoginResponse(w, http.StatusUnauthorized, false, "Login incorreto")
			return
		}

		if err != nil {
			writeLoginResponse(w, http.StatusInternalServerError, false, "Erro interno do servidor")
			return
		}

		// Compara a senha recebida com a senha do banco
		if user.Password != input.Password {
			writeLoginResponse(w, http.StatusUnauthorized, false, "Login incorreto")
			return
		}

		// Login correto
		writeLoginResponse(w, http.StatusOK, true, "Login correto")
	}
}

func writeLoginResponse(w http.ResponseWriter, status int, success bool, message string) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(LoginResponse{Success: success, Message: message})
}
