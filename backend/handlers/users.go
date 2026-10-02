package handlers

import (
	"database/sql"
	"encoding/json"
	"errors"
	"io"
	"login-system/database"
	"login-system/models"
	"net/http"
	"strings"

	"modernc.org/sqlite"
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

		err := database.CreateUser(db, input.Username, input.Password)

		if err != nil {
			var sqliteErr *sqlite.Error
			if errors.As(err, &sqliteErr) && sqliteErr.Code()&0xff == 19 {
				writeLoginResponse(w, http.StatusConflict, false, "Usuário já existe")
				return
			}
			writeLoginResponse(w, http.StatusInternalServerError, false, "Erro ao criar usuário")
			return
		}

		writeLoginResponse(w, http.StatusCreated, true, "Usuário criado com sucesso")
	}
}
