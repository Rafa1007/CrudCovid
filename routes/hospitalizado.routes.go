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
	if hospitalizado.Nombre == "" || hospitalizado.Apellido == "" || hospitalizado.Estado == "" || hospitalizado.Edad == 0 || hospitalizado.FechaRegistro.IsZero() || hospitalizado.Sexo == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Miissing requiered fields "))
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
func UpdateHospitalizadoHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var updateHospitalizado models.Hospitalizado
	if err := json.NewDecoder(r.Body).Decode(&updateHospitalizado); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var hospitalizado models.Hospitalizado
	if result := db.DB.First(&hospitalizado, id); result.Error != nil {
		http.Error(w, "Hospitalizado not found", http.StatusNotFound)
		return
	}
	hospitalizado.Nombre = updateHospitalizado.Nombre
	hospitalizado.Apellido = updateHospitalizado.Apellido
	hospitalizado.Estado = updateHospitalizado.Estado
	hospitalizado.Edad = updateHospitalizado.Edad
	hospitalizado.FechaRegistro = updateHospitalizado.FechaRegistro
	hospitalizado.Sexo = updateHospitalizado.Sexo

	if result := db.DB.Save(&hospitalizado); result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(hospitalizado)
}

func UpdateHospitalizadoStatusHandler(w http.ResponseWriter, r *http.Request) {
	var hospitalizado models.Hospitalizado
	params := mux.Vars(r)

	db.DB.First(&hospitalizado, params["id"])

	if hospitalizado.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("hospitalizado  not found"))
		return
	}

	var input struct {
		Status string `json:"status"`
	}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		// Si hay un error al decodificar, devolver un error 400
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request payload"))
		return
	}

	if input.Status == "recuperado" {
		// Crear un nuevo registro de hospitalizado utilizando los datos del contagio
		hospitalizado := models.Recuperado{
			Nombre:            hospitalizado.Nombre,
			Apellido:          hospitalizado.Apellido,
			FechaRegistro:     hospitalizado.FechaRegistro,
			Estado:            hospitalizado.Estado,
			Edad:              hospitalizado.Edad,
			NumeroRecuperados: hospitalizado.NumeroHospitalizados,
			Sexo:              hospitalizado.Sexo,
		}
		// Guardar el nuevo registro de hospitalizado en la base de datos
		db.DB.Create(&hospitalizado)
	}

	// Actualizar el estado del contagio con el nuevo estado recibido
	hospitalizado.Status = input.Status
	// Guardar los cambios en la base de datos
	db.DB.Save(&hospitalizado)

	// Devolver una respuesta 200 con el contagio actualizado
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&hospitalizado)
}
