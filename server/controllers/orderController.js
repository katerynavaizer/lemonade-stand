import * as orderModel from "../models/orderModel.js";

export const createOrder = async (req, res, next) => {
  try {
    const { customerName, customerEmail, total, items } = req.body;

    const newOrder = await orderModel.createOrder(
      customerName,
      customerEmail,
      total,
      items,
    );

    const formattedOrder = {
      id: newOrder.id,
      customerName: newOrder.customer_name,
      customerEmail: newOrder.customer_email,
      total: Number(newOrder.total_price),
      items: newOrder.order_items,
    };

    console.log(`Order #${newOrder.id} saved!`);
    res.status(201).json({
      message: "Order placed!",
      orderId: newOrder.id,
      order: formattedOrder,
    });
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const rawOrders = await orderModel.getAllOrders();

    const formattedOrders = rawOrders.map((order) => ({
      id: order.id,
      customerName: order.customer_name,
      customerEmail: order.customer_email,
      total: Number(order.total_price),
      items: order.order_items,
      date: order.created_at,
    }));

    res.json(formattedOrders);
  } catch (err) {
    next(err);
  }
};
