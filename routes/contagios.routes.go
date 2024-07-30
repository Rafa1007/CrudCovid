package routes

import (
	"encoding/json"
	"net/http"

	"github.com/Rafa1007/crud-go/db"
	"github.com/Rafa1007/crud-go/models"
	"github.com/gorilla/mux"
)

// GetContagiosHandler obtiene todos los registros de contagios
func GetContagiosHandler(w http.ResponseWriter, r *http.Request) {
	var contagio []models.Contagio
	db.DB.Find(&contagio)
	json.NewEncoder(w).Encode(&contagio)
}

// GetContagioHandler obtiene un registro de contagio por su ID
func GetContagioHandler(w http.ResponseWriter, r *http.Request) {
	var contagio models.Contagio
	params := mux.Vars(r)

	db.DB.First(&contagio, params["id"])

	if contagio.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Contagio not found"))
		return
	}
	json.NewEncoder(w).Encode(&contagio)
}

// CreateContagiosHandler crea un nuevo registro de contagio
func CreateContagiosHandler(w http.ResponseWriter, r *http.Request) {
	var contagio models.Contagio
	err := json.NewDecoder(r.Body).Decode(&contagio)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request payload"))
		return
	}

	// Validar que todos los campos requeridos no estén vacíos
	if contagio.Nombre == "" || contagio.Apellido == "" || contagio.Estado == "" || contagio.Edad == 0 || contagio.FechaRegistro.IsZero() || contagio.Sexo == "" || contagio.Status == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Missing required fields"))
		return
	}

	createdContagio := db.DB.Create(&contagio)
	if createdContagio.Error != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(createdContagio.Error.Error()))
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(&contagio)
}

// DeleteContagiosHandler elimina un registro de contagio por su ID
func DeleteContagiosHandler(w http.ResponseWriter, r *http.Request) {
	var contagio models.Contagio
	params := mux.Vars(r)

	db.DB.First(&contagio, params["id"])

	if contagio.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Contagio not found"))
		return
	}

	db.DB.Delete(&contagio)
	w.WriteHeader(http.StatusNoContent)
}

// UpdateContagioStatusHandler actualiza el estado de un registro de contagio
func UpdateContagioStatusHandler(w http.ResponseWriter, r *http.Request) {
	// Crear una variable para almacenar el contagio que se va a actualizar
	var contagio models.Contagio

	// Obtener los parámetros de la URL, en este caso, el ID del contagio
	params := mux.Vars(r)

	// Buscar el contagio en la base de datos utilizando el ID
	db.DB.First(&contagio, params["id"])

	// Verificar si el contagio existe
	if contagio.ID == 0 {
		// Si no se encuentra el contagio, devolver un error 404
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Contagio not found"))
		return
	}

	// Crear una estructura para almacenar el nuevo estado recibido en la solicitud
	var input struct {
		Status string `json:"status"`
	}
	// Decodificar el cuerpo de la solicitud en la estructura input
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		// Si hay un error al decodificar, devolver un error 400
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request payload"))
		return
	}

	// Verificar si el nuevo estado es "hospitalizado"
	if input.Status == "hospitalizado" {
		// Crear un nuevo registro de hospitalizado utilizando los datos del contagio
		hospitalizado := models.Hospitalizado{
			Nombre:               contagio.Nombre,
			Apellido:             contagio.Apellido,
			FechaRegistro:        contagio.FechaRegistro,
			Estado:               contagio.Estado,
			Edad:                 contagio.Edad,
			NumeroHospitalizados: contagio.CasosConfirmados,
			LoginID:              contagio.LoginID,
			Sexo:                 contagio.Sexo,
		}
		// Guardar el nuevo registro de hospitalizado en la base de datos
		db.DB.Create(&hospitalizado)
	}

	// Actualizar el estado del contagio con el nuevo estado recibido
	contagio.Status = input.Status
	// Guardar los cambios en la base de datos
	db.DB.Save(&contagio)

	// Devolver una respuesta 200 con el contagio actualizado
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&contagio)
}

// UpdateContagioHandler actualiza un contagio existente
func UpdateContagioHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var updatedContagio models.Contagio
	if err := json.NewDecoder(r.Body).Decode(&updatedContagio); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var contagio models.Contagio
	if result := db.DB.First(&contagio, id); result.Error != nil {
		http.Error(w, "Contagio not found", http.StatusNotFound)
		return
	}

	contagio.Nombre = updatedContagio.Nombre
	contagio.Apellido = updatedContagio.Apellido
	contagio.Estado = updatedContagio.Estado
	contagio.Edad = updatedContagio.Edad
	contagio.FechaRegistro = updatedContagio.FechaRegistro
	contagio.Sexo = updatedContagio.Sexo
	contagio.Status = updatedContagio.Status

	if result := db.DB.Save(&contagio); result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(contagio)
}
