package routes

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/Rafa1007/crud-go/db"
	"github.com/Rafa1007/crud-go/models"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
)

// Estructura para las solicitudes de registro y login
// type AuthRequest struct {
// 	Username string `json:"username"`
// 	Password string `json:"password"`
// }

// Handler para el registro de usuarios
// func RegisterHandler(w http.ResponseWriter, r *http.Request) {
// 	var usuario models.Login
// 	err := json.NewDecoder(r.Body).Decode(&usuario)
// 	if err != nil {
// 		w.WriteHeader(http.StatusBadRequest)
// 		w.Write([]byte("Datos de solicitud inválidos"))
// 		return
// 	}

// 	// Verificar si el correo electrónico ya existe
// 	var existingUser models.Login
// 	result := db.DB.Where("email = ?", usuario.Email).First(&existingUser)
// 	if result.Error == nil {
// 		w.WriteHeader(http.StatusConflict)
// 		w.Write([]byte("El correo electrónico ya está en uso"))
// 		return
// 	}

// 	// Encriptar la contraseña antes de guardarla
// 	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(usuario.Password), bcrypt.DefaultCost)
// 	if err != nil {
// 		w.WriteHeader(http.StatusInternalServerError)
// 		w.Write([]byte("Error en el servidor"))
// 		return
// 	}
// 	usuario.Password = string(hashedPassword)
// 	usuario.FechaRegistro = time.Now()

// 	createUsuario := db.DB.Create(&usuario)
// 	if createUsuario.Error != nil {
// 		if isUniqueViolation(createUsuario.Error) {
// 			w.WriteHeader(http.StatusConflict)
// 			w.Write([]byte("El nombre de usuario o correo electrónico ya está en uso"))
// 		} else {
// 			w.WriteHeader(http.StatusInternalServerError)
// 			w.Write([]byte("Error al crear el usuario"))
// 		}
// 		return
// 	}
// 	w.WriteHeader(http.StatusCreated)
// 	json.NewEncoder(w).Encode(&usuario)
// }

// // Handler para el login de usuarios
// func LoginHandler(w http.ResponseWriter, r *http.Request) {
// 	var authDetails AuthRequest
// 	err := json.NewDecoder(r.Body).Decode(&authDetails)
// 	if err != nil || authDetails.Username == "" || authDetails.Password == "" {
// 		http.Error(w, "Datos de solicitud inválidos", http.StatusBadRequest)
// 		return
// 	}

// 	var usuario models.Login
// 	result := db.DB.Where("username = ?", authDetails.Username).First(&usuario)
// 	if result.Error != nil {
// 		http.Error(w, "Credenciales inválidas", http.StatusUnauthorized)
// 		return
// 	}

// 	err = bcrypt.CompareHashAndPassword([]byte(usuario.Password), []byte(authDetails.Password))
// 	if err != nil {
// 		http.Error(w, "Credenciales inválidas", http.StatusUnauthorized)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	if err := json.NewEncoder(w).Encode(map[string]interface{}{"success": true, "user": usuario}); err != nil {
// 		http.Error(w, "Error al codificar la respuesta", http.StatusInternalServerError)
// 	}
// }

// Helper function to check for unique violation errors
func isUniqueViolation(err error) bool {
	if err == nil {
		return false
	}
	return err.Error() == "ERROR: duplicate key value violates unique constraint"
}

// Controllers CRUD

func GetUsuariosHandler(w http.ResponseWriter, r *http.Request) {
	var usuarios []models.Login
	db.DB.Find(&usuarios)
	json.NewEncoder(w).Encode(&usuarios)
}

func GetUsuarioHandler(w http.ResponseWriter, r *http.Request) {
	var usuario models.Login
	params := mux.Vars(r)
	db.DB.First(&usuario, params["id"])

	if usuario.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Usuario no encontrado"))
		return
	}
	db.DB.Model(&usuario).Association("Contagios").Find(&usuario.Contagios)
	db.DB.Model(&usuario).Association("Hospitalizados").Find(&usuario.Hospitalizados)
	db.DB.Model(&usuario).Association("Fallecidos").Find(&usuario.Fallecidos)
	db.DB.Model(&usuario).Association("Recuperados").Find(&usuario.Recuperados)
	json.NewEncoder(w).Encode(&usuario)
}

func CreateUsuarioHandler(w http.ResponseWriter, r *http.Request) {
	var usuario models.Login
	err := json.NewDecoder(r.Body).Decode(&usuario)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Datos de solicitud inválidos"))
		return
	}

	// Encriptar la contraseña antes de guardarla
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(usuario.Password), bcrypt.DefaultCost)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Error en el servidor"))
		return
	}
	usuario.Password = string(hashedPassword)
	usuario.FechaRegistro = time.Now()

	createUsuario := db.DB.Create(&usuario)
	if createUsuario.Error != nil {
		if isUniqueViolation(createUsuario.Error) {
			w.WriteHeader(http.StatusConflict)
			w.Write([]byte("El nombre de usuario o correo electrónico ya está en uso"))
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("Error al crear el usuario"))
		}
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(&usuario)
}

func DeleteUsuariosHandler(w http.ResponseWriter, r *http.Request) {
	var usuario models.Login
	params := mux.Vars(r)
	db.DB.First(&usuario, params["id"])

	if usuario.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Usuario no encontrado"))
		return
	}
	db.DB.Delete(&usuario)
	w.WriteHeader(http.StatusOK)
}
