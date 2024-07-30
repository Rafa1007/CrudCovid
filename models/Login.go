package models

import (
	"time"

	"gorm.io/gorm"
)

type Login struct {
	gorm.Model
	Nombre         string          `gorm:"not null" json:"nombre"`          // Primer nombre del usuario
	Apellido       string          `gorm:"not null" json:"apellido"`        // Apellido del usuario
	Email          string          `gorm:"unique;not null" json:"email"`    // Correo electrónico único y no nulo
	Username       string          `gorm:"unique;not null" json:"username"` // Nombre de usuario único y no nulo
	Password       string          `gorm:"not null" json:"password"`        // Contraseña del usuario
	FechaRegistro  time.Time       `gorm:"not null" json:"fecha_registro"`  // Fecha de registro
	Edad           int             `gorm:"not null" json:"edad"`            // Edad del usuario
	Contagios      []Contagio      `json:"contagio"`
	Hospitalizados []Hospitalizado `json:"hospitalizado"`
	Fallecidos     []Fallecido     `json:"fallecido"`
	Recuperados    []Recuperado    `json:"recuperado"`
	TipoUsuario    string          `gorm:"not null" json:"tipo_usuario"`
}
