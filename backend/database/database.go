package database

import (
	"database/sql"

	_ "modernc.org/sqlite"
)

func ConnectDB() (*sql.DB, error) {
	db, err := sql.Open("sqlite", "login.db")
	if err != nil {
		return nil, err
	}
	return db, nil
}
