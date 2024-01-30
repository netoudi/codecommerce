package entity

import "github.com/google/uuid"

type Category struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

func NewCategory(name string) *Category {
	return &Category{
		Id:   uuid.New().String(),
		Name: name,
	}
}

type Product struct {
	Id          string  `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	ImageUrl    string  `json:"image_url"`
	CategoryId  string  `json:"category_id"`
}

func NewProduct(name string, description string, price float64, imageUrl string, categoryId string) *Product {
	return &Product{
		Id:          uuid.New().String(),
		Name:        name,
		Description: description,
		Price:       price,
		ImageUrl:    imageUrl,
		CategoryId:  categoryId,
	}
}
