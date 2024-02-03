package main

import (
	"context"
	"encoding/json"
	"log/slog"

	"github.com/netoudi/codecommerce/payment/internal/entity"
	"github.com/netoudi/codecommerce/payment/pkg/rabbitmq"
	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	ctx := context.Background()
	ch, err := rabbitmq.OpenChannel()
	if err != nil {
		panic(err)
	}
	defer ch.Close()

	mgs := make(chan amqp.Delivery)
	go rabbitmq.Consume(ch, mgs, "orders")

	slog.Info("🔥 Payment service started")

	for msg := range mgs {
		var orderRequest entity.OrderRequest
		err := json.Unmarshal(msg.Body, &orderRequest)
		if err != nil {
			panic(err)
		}
		orderResponse, err := orderRequest.Process()
		if err != nil {
			panic(err)
		}
		orderResponseJson, err := json.Marshal(orderResponse)
		if err != nil {
			slog.Error(err.Error())
			break
		}
		err = rabbitmq.Publish(ctx, ch, string(orderResponseJson), "amq.direct")
		if err != nil {
			slog.Error(err.Error())
			break
		}
		msg.Ack(false)
		slog.Info("Order processed", orderResponse.OrderId, orderResponse.Status)
	}
}
