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
type AuthRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Handler para el registro de usuarios
func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var usuario models.Login
	err := json.NewDecoder(r.Body).Decode(&usuario)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
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

	createusuario := db.DB.Create(&usuario)
	if createusuario.Error != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(createusuario.Error.Error()))
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(&usuario)
}

// Handler para el login de usuarios
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var authDetails AuthRequest
	err := json.NewDecoder(r.Body).Decode(&authDetails)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Datos de solicitud inválidos"))
		return
	}

	var usuario models.Login
	result := db.DB.Where("username = ?", authDetails.Username).First(&usuario)
	if result.Error != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Credenciales inválidas"))
		return
	}

	// Verificar la contraseña
	err = bcrypt.CompareHashAndPassword([]byte(usuario.Password), []byte(authDetails.Password))
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Credenciales inválidas"))
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{"success": true, "user": usuario})
}

//Controllers CRUD

func GetUsuariosHandler(w http.ResponseWriter, r *http.Request) {
	var usuario []models.Login
	db.DB.Find(&usuario)
	json.NewEncoder(w).Encode(&usuario)
}
func GetUsuarioHandler(w http.ResponseWriter, r *http.Request) {
	var usuario models.Login
	params := mux.Vars(r)
	db.DB.First(&usuario, params["id"])

	if usuario.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("User not found"))
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
		w.Write([]byte(err.Error()))
		return
	}
	createusuario := db.DB.Create(&usuario)
	if createusuario.Error != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(createusuario.Error.Error()))
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
		w.Write([]byte("User not found"))
		return
	}
	db.DB.Delete(&usuario)
	w.WriteHeader(http.StatusOK)
}
