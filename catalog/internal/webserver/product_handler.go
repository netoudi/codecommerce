package webserver

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/netoudi/codecommerce/catalog/internal/entity"
	"github.com/netoudi/codecommerce/catalog/internal/service"
)

type WebProductHandler struct {
	ProductService *service.ProductService
}

func NewWebProductHandler(productService *service.ProductService) *WebProductHandler {
	return &WebProductHandler{ProductService: productService}
}

func (wph *WebProductHandler) GetProducts(w http.ResponseWriter, r *http.Request) {
	products, err := wph.ProductService.GetProducts()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(products)
}

func (wph *WebProductHandler) GetProductsByCategoryId(w http.ResponseWriter, r *http.Request) {
	categoryId := chi.URLParam(r, "categoryId")
	if categoryId == "" {
		http.Error(w, "categoryId is required", http.StatusBadRequest)
	}
	products, err := wph.ProductService.GetProductsByCategoryId(categoryId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(products)
}

func (wph *WebProductHandler) GetProduct(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "id is required", http.StatusBadRequest)
	}
	product, err := wph.ProductService.GetProduct(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(product)
}

func (wph *WebProductHandler) CreateProduct(w http.ResponseWriter, r *http.Request) {
	var product entity.Product
	err := json.NewDecoder(r.Body).Decode(&product)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}
	result, err := wph.ProductService.CreateProduct(product.Name, product.Description, product.Price, product.ImageUrl, product.CategoryId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(result)
}
