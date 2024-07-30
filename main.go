package main

import (
	"net/http"

	"github.com/Rafa1007/crud-go/db"
	"github.com/Rafa1007/crud-go/models"
	"github.com/Rafa1007/crud-go/routes"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	db.DBConection()
	db.DB.AutoMigrate(&models.Task{})
	db.DB.AutoMigrate(&models.User{})
	db.DB.AutoMigrate(&models.Login{})
	db.DB.AutoMigrate(&models.Contagio{})
	db.DB.AutoMigrate(&models.Fallecido{})
	db.DB.AutoMigrate(&models.Hospitalizado{})
	db.DB.AutoMigrate(&models.Recuperado{})

	r := mux.NewRouter()

	r.HandleFunc("/", routes.HomeHandler).Methods("GET")

	r.HandleFunc("/login", routes.GetUsuariosHandler).Methods("GET")
	r.HandleFunc("/login/{id}", routes.GetUsuarioHandler).Methods("GET")
	r.HandleFunc("/login", routes.CreateUsuarioHandler).Methods("POST")
	r.HandleFunc("/login/{id}", routes.DeleteUsuariosHandler).Methods("DELETE")
	r.HandleFunc("/register", routes.RegisterHandler).Methods("POST")
	r.HandleFunc("/login", routes.LoginHandler).Methods("POST")

	r.HandleFunc("/contagios", routes.GetContagiosHandler).Methods("GET")
	r.HandleFunc("/contagios/{id}", routes.GetContagioHandler).Methods("GET")
	r.HandleFunc("/contagios", routes.CreateContagiosHandler).Methods("POST")
	r.HandleFunc("/contagios/{id}", routes.DeleteContagiosHandler).Methods("DELETE")
	r.HandleFunc("/contagios/{id}", routes.UpdateContagioHandler).Methods("PUT")
	r.HandleFunc("/contagios/{id}/status", routes.UpdateContagioStatusHandler).Methods("PUT")

	r.HandleFunc("/hospitalizados", routes.GetHospitalizadosHandler).Methods("GET")
	r.HandleFunc("/hospitalizados/{id}", routes.GetHospitalizadoHandler).Methods("GET")
	r.HandleFunc("/hospitalizados", routes.CreateHospitalizadoHandler).Methods("POST")
	r.HandleFunc("/hospitalizados/{id}", routes.DeleteHospitalizadoHandler).Methods("DELETE")

	r.HandleFunc("/recuperados", routes.GetRecuperadosHandler).Methods("GET")
	r.HandleFunc("/recuperados/{id}", routes.GetRecuperadoHandler).Methods("GET")
	r.HandleFunc("/recuperados", routes.CreateRecuperadoHandler).Methods("POST")
	r.HandleFunc("/recuperados/{id}", routes.DeleteRecuperadoHandler).Methods("DELETE")

	r.HandleFunc("/fallecidos", routes.GetFallecidosHandler).Methods("GET")
	r.HandleFunc("/fallecidos/{id}", routes.GetFallecidoHandler).Methods("GET")
	r.HandleFunc("/fallecidos", routes.CreateFallecidoHandler).Methods("POST")
	r.HandleFunc("/fallecidos/{id}", routes.DeleteFallecidoHandler).Methods("DELETE")

	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})
	origins := handlers.AllowedOrigins([]string{"*"})

	http.ListenAndServe(":3000", handlers.CORS(headers, methods, origins)(r))
}
