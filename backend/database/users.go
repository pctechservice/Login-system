package database

import (
	"database/sql"
	"fmt"
	"login-system/models"
)

func CreateUserTable(db *sql.DB) error {
	_, err := db.Exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`)
	return err

}
func CreateUser(db *sql.DB, username string, password string) error {
	_, err := db.Exec(`
		INSERT INTO users (username, password) VALUES (?, ?)
	`, username, password)
	return err
}
func CheckUsersTable(db *sql.DB) error {

	rows, err := db.Query(`
        SELECT name FROM sqlite_master WHERE type='table'
    `)

	if err != nil {
		return err
	}

	defer rows.Close()

	for rows.Next() {

		var tableName string

		err := rows.Scan(&tableName)
		if err != nil {
			return err
		}
		fmt.Println(tableName)

	}
	return nil
}

func GetUser(db *sql.DB, username string) (*models.User, error) {
	var user models.User
	err := db.QueryRow("SELECT username, password FROM users WHERE username = ?", username).Scan(&user.Username, &user.Password)
	if err != nil {
		return nil, err
	}
	return &user, nil
}
