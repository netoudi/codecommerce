package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/go-sql-driver/mysql"

	"github.com/netoudi/codecommerce/catalog/internal/database"
	"github.com/netoudi/codecommerce/catalog/internal/service"
	"github.com/netoudi/codecommerce/catalog/internal/webserver"
)

func main() {
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/codecommerce")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	categoryDb := database.NewCategoryDb(db)
	categoryService := service.NewCategoryService(*categoryDb)

	productDb := database.NewProductDb(db)
	productService := service.NewProductService(*productDb)

	webCategoryHandler := webserver.NewWebCategoryHandler(categoryService)
	webProductHandler := webserver.NewWebProductHandler(productService)

	c := chi.NewRouter()
	c.Use(middleware.Logger)
	c.Use(middleware.Recoverer)

	c.Get("/categories/{id}", webCategoryHandler.GetCategory)
	c.Get("/categories", webCategoryHandler.GetCategories)
	c.Post("/categories", webCategoryHandler.CreateCategory)

	c.Get("/products/{id}", webProductHandler.GetProduct)
	c.Get("/products", webProductHandler.GetProducts)
	c.Get("/products/categories/{categoryId}", webProductHandler.GetProductsByCategoryId)
	c.Post("/products", webProductHandler.CreateProduct)

	fmt.Println("🚀 Sever is running on port 8080")
	http.ListenAndServe(":8080", c)
}
