package service

import (
	"github.com/netoudi/codecommerce/catalog/internal/database"
	"github.com/netoudi/codecommerce/catalog/internal/entity"
)

type ProductService struct {
	ProductDb database.ProductDb
}

func NewProductService(productDb database.ProductDb) *ProductService {
	return &ProductService{ProductDb: productDb}
}

func (ps *ProductService) GetProducts() ([]*entity.Product, error) {
	products, err := ps.ProductDb.GetProducts()
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (ps *ProductService) GetProductsByCategoryId(categoryId string) ([]*entity.Product, error) {
	products, err := ps.ProductDb.GetProductsByCategoryId(categoryId)
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (ps *ProductService) GetProduct(id string) (*entity.Product, error) {
	product, err := ps.ProductDb.GetProduct(id)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (ps *ProductService) CreateProduct(name string, description string, price float64, imageUrl string, categoryId string) (*entity.Product, error) {
	product, err := ps.ProductDb.CreateProduct(entity.NewProduct(name, description, price, imageUrl, categoryId))
	if err != nil {
		return nil, err
	}
	return product, nil
}
