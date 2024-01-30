package database

import (
	"database/sql"

	"github.com/netoudi/codecommerce/catalog/internal/entity"
)

type ProductDb struct {
	db *sql.DB
}

func NewProductDb(db *sql.DB) *ProductDb {
	return &ProductDb{db: db}
}

func (pd *ProductDb) GetProducts() ([]*entity.Product, error) {
	rows, err := pd.db.Query("SELECT id, name, description, price, image_url, category_id FROM products")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var products []*entity.Product
	for rows.Next() {
		var product entity.Product
		if err := rows.Scan(&product.Id, &product.Name, &product.Description, &product.Price, &product.ImageUrl, &product.CategoryId); err != nil {
			return nil, err
		}
		products = append(products, &product)
	}
	return products, nil
}

func (pd *ProductDb) GetProductsByCategoryId(categoryId string) ([]*entity.Product, error) {
	rows, err := pd.db.Query("SELECT id, name, description, price, image_url, category_id FROM products WHERE category_id = ?", categoryId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var products []*entity.Product
	for rows.Next() {
		var product entity.Product
		if err := rows.Scan(&product.Id, &product.Name, &product.Description, &product.Price, &product.ImageUrl, &product.CategoryId); err != nil {
			return nil, err
		}
		products = append(products, &product)
	}
	return products, nil
}

func (pd *ProductDb) GetProduct(id string) (*entity.Product, error) {
	var product entity.Product
	err := pd.db.QueryRow("SELECT id, name, description, price, image_url, category_id FROM products WHERE id = ?", id).Scan(&product.Id, &product.Name, &product.Description, &product.Price, &product.ImageUrl, &product.CategoryId)
	if err != nil {
		return nil, err
	}
	return &product, nil
}

func (pd *ProductDb) CreateProduct(product *entity.Product) (*entity.Product, error) {
	_, err := pd.db.Exec("INSERT INTO products (id, name, description, price, image_url, category_id) VALUES (?, ?, ?, ?, ?, ?)", product.Id, product.Name, product.Description, product.Price, product.ImageUrl, product.CategoryId)
	if err != nil {
		return nil, err
	}
	return product, nil
}
