package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"login-system/database"
)

func testDB(t *testing.T) *sql.DB {
	t.Helper()
	db, err := sql.Open("sqlite", "file:"+t.TempDir()+"/test.db")
	if err != nil {
		t.Fatal(err)
	}
	if err := database.CreateUserTable(db); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = db.Close() })
	return db
}

func request(handler http.HandlerFunc, method, body string) *httptest.ResponseRecorder {
	r := httptest.NewRequest(method, "/", strings.NewReader(body))
	w := httptest.NewRecorder()
	handler(w, r)
	return w
}

func assertResponse(t *testing.T, w *httptest.ResponseRecorder, status int, success bool) {
	t.Helper()
	if w.Code != status {
		t.Fatalf("status = %d, want %d; body: %s", w.Code, status, w.Body.String())
	}
	if got := w.Header().Get("Content-Type"); !strings.HasPrefix(got, "application/json") {
		t.Fatalf("Content-Type = %q, want application/json", got)
	}
	var result LoginResponse
	if err := json.Unmarshal(w.Body.Bytes(), &result); err != nil {
		t.Fatalf("invalid JSON response: %v", err)
	}
	if result.Success != success {
		t.Fatalf("success = %t, want %t", result.Success, success)
	}
}

func TestCreateUserAndLogin(t *testing.T) {
	db := testDB(t)
	created := request(CreateUserHandler(db), http.MethodPost, `{"username":"maria","password":"secret"}`)
	assertResponse(t, created, http.StatusCreated, true)

	for _, tc := range []struct {
		name string
		body string
		code int
		ok   bool
	}{
		{"correct login", `{"username":"maria","password":"secret"}`, http.StatusOK, true},
		{"wrong password", `{"username":"maria","password":"wrong"}`, http.StatusUnauthorized, false},
		{"unknown user", `{"username":"unknown","password":"secret"}`, http.StatusUnauthorized, false},
	} {
		t.Run(tc.name, func(t *testing.T) {
			assertResponse(t, request(LoginHandler(db), http.MethodPost, tc.body), tc.code, tc.ok)
		})
	}
}

func TestCreateUserDuplicate(t *testing.T) {
	db := testDB(t)
	body := `{"username":"maria","password":"secret"}`
	assertResponse(t, request(CreateUserHandler(db), http.MethodPost, body), http.StatusCreated, true)
	assertResponse(t, request(CreateUserHandler(db), http.MethodPost, body), http.StatusConflict, false)
}

func TestInvalidJSONAndRequiredFields(t *testing.T) {
	db := testDB(t)
	for _, handler := range []http.HandlerFunc{LoginHandler(db), CreateUserHandler(db)} {
		assertResponse(t, request(handler, http.MethodPost, `{`), http.StatusBadRequest, false)
		assertResponse(t, request(handler, http.MethodPost, `{"username":" ","password":"x"}`), http.StatusBadRequest, false)
	}
}

func TestMethodNotAllowed(t *testing.T) {
	db := testDB(t)
	assertResponse(t, request(LoginHandler(db), http.MethodGet, `{}`), http.StatusMethodNotAllowed, false)
	assertResponse(t, request(CreateUserHandler(db), http.MethodGet, `{}`), http.StatusMethodNotAllowed, false)
}
