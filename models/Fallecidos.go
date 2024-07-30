package models

import (
	"time"

	"gorm.io/gorm"
)

type Fallecido struct {
	gorm.Model
	Nombre           string    `gorm:"not null" json:"nombre"`
	Apellido         string    `gorm:"not null" json:"apellido"`
	FechaRegistro    time.Time `gorm:"not null" json:"fecha_registro"`
	Estado           string    `gorm:"not null" json:"estado"`
	Edad             int       `gorm:"not null" json:"edad"`
	NumeroFallecidos int       `gorm:"not null" json:"numero_fallecidos"`
	LoginID          uint      `gorm:"not null" json:"login_id"`
	Sexo             string    `gorm:"not null" json:"sexo"`
}
