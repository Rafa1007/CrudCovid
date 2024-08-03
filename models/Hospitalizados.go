package models

import (
	"time"

	"gorm.io/gorm"
)

type Hospitalizado struct {
	gorm.Model
	ID                   uint      `json:"id" gorm:"primaryKey"`
	Nombre               string    `json:"nombre"`
	Apellido             string    `json:"apellido"`
	FechaRegistro        time.Time `json:"fecha_registro"`
	Estado               string    `json:"estado"`
	Edad                 int       `json:"edad"`
	NumeroHospitalizados int       `json:"numero_hospitalizados"`
	Sexo                 string    `json:"sexo"`
	Status               string    `json:"status"`
}
