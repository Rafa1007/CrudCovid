package models

import (
	"time"

	"gorm.io/gorm"
)

// Contagio representa un registro de contagio en la base de datos
type Contagio struct {
	gorm.Model
	ID               uint      `json:"id" gorm:"primaryKey"`
	Nombre           string    `gorm:"not null" json:"nombre"`
	Apellido         string    `gorm:"not null" json:"apellido"`
	FechaRegistro    time.Time `gorm:"not null" json:"fecha_registro"`
	Estado           string    `gorm:"not null" json:"estado"`
	Edad             int       `gorm:"not null" json:"edad"`
	CasosConfirmados int       `gorm:"not null" json:"casos_confirmados"`
	LoginID          uint      `gorm:"not null" json:"login_id"`
	Sexo             string    `gorm:"not null" json:"sexo"`
	Status           string    `gorm:"not null" json:"status"` // Nuevo campo
}
