package service

import (
	"github.com/netoudi/codecommerce/catalog/internal/database"
	"github.com/netoudi/codecommerce/catalog/internal/entity"
)

type CategoryService struct {
	CategoryDb database.CategoryDb
}

func NewCategoryService(categoryDb database.CategoryDb) *CategoryService {
	return &CategoryService{CategoryDb: categoryDb}
}

func (cs *CategoryService) GetCategories() ([]*entity.Category, error) {
	categories, err := cs.CategoryDb.GetCategories()
	if err != nil {
		return nil, err
	}
	return categories, nil
}

func (cs *CategoryService) GetCategory(id string) (*entity.Category, error) {
	category, err := cs.CategoryDb.GetCategory(id)
	if err != nil {
		return nil, err
	}
	return category, nil
}

func (cs *CategoryService) CreateCategory(name string) (*entity.Category, error) {
	category, err := cs.CategoryDb.CreateCategory(entity.NewCategory(name))
	if err != nil {
		return nil, err
	}
	return category, nil
}
