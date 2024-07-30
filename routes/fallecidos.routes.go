package routes

import (
	"encoding/json"
	"net/http"

	"github.com/Rafa1007/crud-go/db"
	"github.com/Rafa1007/crud-go/models"
	"github.com/gorilla/mux"
)

func GetFallecidosHandler(w http.ResponseWriter, r *http.Request) {
	var fallecido []models.Fallecido
	db.DB.Find(&fallecido)
	json.NewEncoder(w).Encode(&fallecido)

}
func GetFallecidoHandler(w http.ResponseWriter, r *http.Request) {
	var fallecido models.Fallecido
	params := mux.Vars(r)

	db.DB.First(&fallecido, params["id"])

	if fallecido.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Contagio not found"))
		return
	}
	json.NewEncoder(w).Encode(&fallecido)

}
func CreateFallecidoHandler(w http.ResponseWriter, r *http.Request) {
	var fallecido models.Fallecido
	err := json.NewDecoder(r.Body).Decode(&fallecido)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request payload"))
		return
	}
	createdfallecido := db.DB.Create(&fallecido)
	if createdfallecido.Error != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(createdfallecido.Error.Error()))
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(&fallecido)

}
func DeleteFallecidoHandler(w http.ResponseWriter, r *http.Request) {
	var fallecido models.Fallecido
	params := mux.Vars(r)

	db.DB.First(&fallecido, params["id"])

	if fallecido.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Contagio not found"))
		return
	}

	db.DB.Delete(&fallecido)
	w.WriteHeader(http.StatusNoContent)
}
