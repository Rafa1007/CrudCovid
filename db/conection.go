package db

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// DSN es la cadena de conexión para la base de datos PostgreSQL
var DSN = "host=localhost user=postgres password=12345678 dbname=CRUDGO port=5432"
var DB *gorm.DB

// DBConection establece la conexión con la base de datos
func DBConection() {
	var err error
	// Abrir una conexión a la base de datos usando GORM
	DB, err = gorm.Open(postgres.Open(DSN), &gorm.Config{})
	if err != nil {
		// Si hay un error al conectar, se registra y el programa se detiene
		log.Fatal("Error connecting to the database:", err)
	} else {
		// Si la conexión es exitosa, se registra un mensaje
		log.Println("DB connected")
	}
}
