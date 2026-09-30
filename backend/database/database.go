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
	if err := db.Ping(); err != nil {
		_ = db.Close()
		return nil, err
	}
	return db, nil
}
