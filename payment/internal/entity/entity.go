package entity

import "errors"

type OrderRequest struct {
	OrderId  string  `json:"order_id"`
	CardHash string  `json:"card_hash"`
	Total    float64 `json:"total"`
}

func NewOrderRequest(orderId string, cardHash string, total float64) *OrderRequest {
	return &OrderRequest{
		OrderId:  orderId,
		CardHash: cardHash,
		Total:    total,
	}
}

func (o *OrderRequest) Validate() error {
	if o.OrderId == "" {
		return errors.New("order_id is required")
	}
	if o.CardHash == "" {
		return errors.New("card_has is required")
	}
	if o.Total <= 0 {
		return errors.New("total must be greater than 0")
	}
	return nil
}

func (o *OrderRequest) Process() (*OrderResponse, error) {
	if err := o.Validate(); err != nil {
		return nil, err
	}
	orderResponse := NewOrderResponse(o.OrderId, "failed")
	if o.Total <= 2000 {
		orderResponse.Status = "paid"
	}
	return orderResponse, nil
}

type OrderResponse struct {
	OrderId string `json:"order_id"`
	Status  string `json:"status"`
}

func NewOrderResponse(orderId string, status string) *OrderResponse {
	return &OrderResponse{
		OrderId: orderId,
		Status:  status,
	}
}
