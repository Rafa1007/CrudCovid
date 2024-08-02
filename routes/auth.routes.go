package routes

import (
	"encoding/json"
	"net/http"

	"github.com/Rafa1007/crud-go/db"
	"github.com/Rafa1007/crud-go/models"
	"golang.org/x/crypto/bcrypt"
)

// Estructura para las solicitudes de registro y login
type AuthRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Estructura para las solicitudes de registro
type RegisterRequest struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	Age       int    `json:"age"`
}

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}

	// Validaciones adicionales
	if req.FirstName == "" || req.LastName == "" || req.Email == "" || req.Username == "" || req.Password == "" || req.Age <= 0 {
		http.Error(w, "Todos los campos son obligatorios y deben ser válidos", http.StatusBadRequest)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Error al encriptar la contraseña", http.StatusInternalServerError)
		return
	}

	user := models.User{
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Email:     req.Email,
		Username:  req.Username,
		Password:  string(hashedPassword),
		Age:       req.Age,
	}

	if err := db.DB.Create(&user).Error; err != nil {
		http.Error(w, "Error al crear el usuario", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}

// Handler para el login de usuarios
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var auth AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&auth); err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}

	var user models.User
	if err := db.DB.Where("username = ?", auth.Username).First(&user).Error; err != nil {
		http.Error(w, "Credenciales inválidas", http.StatusUnauthorized)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(auth.Password)); err != nil {
		http.Error(w, "Credenciales inválidas", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}
