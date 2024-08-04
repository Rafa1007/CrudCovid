package routes

import (
	"encoding/json"
	"net/http"

	"github.com/Rafa1007/crud-go/db"
	"github.com/Rafa1007/crud-go/models"
	"github.com/gorilla/mux"
)

func GetRecuperadosHandler(w http.ResponseWriter, r *http.Request) {
	var recuperado []models.Recuperado
	db.DB.Find(&recuperado)
	json.NewEncoder(w).Encode(&recuperado)

}
func GetRecuperadoHandler(w http.ResponseWriter, r *http.Request) {
	var recuperado models.Recuperado
	params := mux.Vars(r)

	db.DB.First(&recuperado, params["id"])

	if recuperado.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Recuperado not found"))
		return
	}
	json.NewEncoder(w).Encode(&recuperado)

}
func CreateRecuperadoHandler(w http.ResponseWriter, r *http.Request) {
	var recuperado models.Recuperado
	err := json.NewDecoder(r.Body).Decode(&recuperado)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request payload"))
		return
	}

	// Validar que todos los campos requeridos no estén vacíos
	if recuperado.Nombre == "" || recuperado.Apellido == "" || recuperado.Estado == "" || recuperado.Edad == 0 || recuperado.FechaRegistro.IsZero() || recuperado.Sexo == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Missing required fields"))
		return
	}
	createdrecuperado := db.DB.Create(&recuperado)
	if createdrecuperado.Error != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(createdrecuperado.Error.Error()))
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(&recuperado)

}
func DeleteRecuperadoHandler(w http.ResponseWriter, r *http.Request) {
	var recuperado models.Recuperado
	params := mux.Vars(r)

	db.DB.First(&recuperado, params["id"])

	if recuperado.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Recuperado not found"))
		return
	}

	db.DB.Delete(&recuperado)
	w.WriteHeader(http.StatusNoContent)
}
