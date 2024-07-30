package routes

import (
	"encoding/json"
	"net/http"

	"github.com/Rafa1007/crud-go/db"
	"github.com/Rafa1007/crud-go/models"
	"github.com/gorilla/mux"
)

func GetHospitalizadosHandler(w http.ResponseWriter, r *http.Request) {
	var hospitalizado []models.Hospitalizado
	db.DB.Find(&hospitalizado)
	json.NewEncoder(w).Encode(&hospitalizado)

}
func GetHospitalizadoHandler(w http.ResponseWriter, r *http.Request) {
	var hospitalizado models.Hospitalizado
	params := mux.Vars(r)

	db.DB.First(&hospitalizado, params["id"])

	if hospitalizado.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Contagio not found"))
		return
	}
	json.NewEncoder(w).Encode(&hospitalizado)

}
func CreateHospitalizadoHandler(w http.ResponseWriter, r *http.Request) {
	var hospitalizado models.Hospitalizado
	err := json.NewDecoder(r.Body).Decode(&hospitalizado)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request payload"))
		return
	}
	createdhospitalizado := db.DB.Create(&hospitalizado)
	if createdhospitalizado.Error != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(createdhospitalizado.Error.Error()))
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(&hospitalizado)

}
func DeleteHospitalizadoHandler(w http.ResponseWriter, r *http.Request) {
	var hospitalizado models.Hospitalizado
	params := mux.Vars(r)

	db.DB.First(&hospitalizado, params["id"])

	if hospitalizado.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Hospitalizado  not found"))
		return
	}

	db.DB.Delete(&hospitalizado)
	w.WriteHeader(http.StatusNoContent)
}
