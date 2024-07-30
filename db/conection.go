package db

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DSN = "host=localhost user=postgres password=12345678 dbname=CRUDGO port=5432"
var DB *gorm.DB

func DBConection() {
	var err error
	DB, err = gorm.Open(postgres.Open(DSN), &gorm.Config{})
	if err != nil {
		log.Fatal("Error connecting to the database:", err)
	} else {
		log.Println("DB connected")
	}
}
