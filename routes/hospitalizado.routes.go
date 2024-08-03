package routes

import (
	"encoding/json"
	"net/http"

	"github.com/Rafa1007/crud-go/db"
	"github.com/Rafa1007/crud-go/models"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

func GetHospitalizadosHandler(w http.ResponseWriter, r *http.Request) {
	var hospitalizados []models.Hospitalizado
	if err := db.DB.Find(&hospitalizados).Error; err != nil {
		http.Error(w, "Error fetching hospitalizados: "+err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(hospitalizados)
}

func GetHospitalizadoHandler(w http.ResponseWriter, r *http.Request) {
	var hospitalizado models.Hospitalizado
	params := mux.Vars(r)

	if err := db.DB.First(&hospitalizado, params["id"]).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			http.Error(w, "Hospitalizado not found", http.StatusNotFound)
			return
		}
		http.Error(w, "Error fetching hospitalizado: "+err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(hospitalizado)
}

func CreateHospitalizadoHandler(w http.ResponseWriter, r *http.Request) {
	var hospitalizado models.Hospitalizado
	if err := json.NewDecoder(r.Body).Decode(&hospitalizado); err != nil {
		http.Error(w, "Invalid request payload: "+err.Error(), http.StatusBadRequest)
		return
	}

	// Validar campos requeridos
	if hospitalizado.Nombre == "" || hospitalizado.Apellido == "" || hospitalizado.Estado == "" || hospitalizado.Edad == 0 || hospitalizado.FechaRegistro.IsZero() || hospitalizado.Sexo == "" || hospitalizado.NumeroHospitalizados == 0 {
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}

	if err := db.DB.Create(&hospitalizado).Error; err != nil {
		http.Error(w, "Error creating hospitalizado: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(hospitalizado)
}

func DeleteHospitalizadoHandler(w http.ResponseWriter, r *http.Request) {
	var hospitalizado models.Hospitalizado
	params := mux.Vars(r)

	if err := db.DB.First(&hospitalizado, params["id"]).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			http.Error(w, "Hospitalizado not found", http.StatusNotFound)
			return
		}
		http.Error(w, "Error fetching hospitalizado: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if err := db.DB.Delete(&hospitalizado).Error; err != nil {
		http.Error(w, "Error deleting hospitalizado: "+err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func UpdateHospitalizadoHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var updateHospitalizado models.Hospitalizado
	if err := json.NewDecoder(r.Body).Decode(&updateHospitalizado); err != nil {
		http.Error(w, "Invalid request payload: "+err.Error(), http.StatusBadRequest)
		return
	}

	var hospitalizado models.Hospitalizado
	if err := db.DB.First(&hospitalizado, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			http.Error(w, "Hospitalizado not found", http.StatusNotFound)
			return
		}
		http.Error(w, "Error fetching hospitalizado: "+err.Error(), http.StatusInternalServerError)
		return
	}

	hospitalizado.Nombre = updateHospitalizado.Nombre
	hospitalizado.Apellido = updateHospitalizado.Apellido
	hospitalizado.Estado = updateHospitalizado.Estado
	hospitalizado.Edad = updateHospitalizado.Edad
	hospitalizado.FechaRegistro = updateHospitalizado.FechaRegistro
	hospitalizado.Sexo = updateHospitalizado.Sexo
	hospitalizado.NumeroHospitalizados = updateHospitalizado.NumeroHospitalizados

	if err := db.DB.Save(&hospitalizado).Error; err != nil {
		http.Error(w, "Error updating hospitalizado: "+err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(hospitalizado)
}

func UpdateHospitalizadoStatusHandler(w http.ResponseWriter, r *http.Request) {
	var hospitalizado models.Hospitalizado
	params := mux.Vars(r)

	if err := db.DB.First(&hospitalizado, params["id"]).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			http.Error(w, "Hospitalizado not found", http.StatusNotFound)
			return
		}
		http.Error(w, "Error fetching hospitalizado: "+err.Error(), http.StatusInternalServerError)
		return
	}

	var input struct {
		Status string `json:"status"`
	}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid request payload: "+err.Error(), http.StatusBadRequest)
		return
	}

	if input.Status == "recuperado" {
		recuperado := models.Recuperado{
			Nombre:            hospitalizado.Nombre,
			Apellido:          hospitalizado.Apellido,
			FechaRegistro:     hospitalizado.FechaRegistro,
			Estado:            hospitalizado.Estado,
			Edad:              hospitalizado.Edad,
			NumeroRecuperados: hospitalizado.NumeroHospitalizados,
			Sexo:              hospitalizado.Sexo,
		}
		if err := db.DB.Create(&recuperado).Error; err != nil {
			http.Error(w, "Error creating recuperado: "+err.Error(), http.StatusInternalServerError)
			return
		}
	}

	hospitalizado.Status = input.Status
	if err := db.DB.Save(&hospitalizado).Error; err != nil {
		http.Error(w, "Error updating hospitalizado status: "+err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(hospitalizado)
}
