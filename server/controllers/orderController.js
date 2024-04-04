import Order from "../models/OrderModel.js";
import asyncHandler from "express-async-handler";


const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items Found!");
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "username email")

  if (order) {
    res.status(200).json(order)
  } else {
    res.status(404)
    throw new Error("Order not found!")
  }
})

const getUserOrders = asyncHandler(async (req, res) => { 
  const orders = await Order.find({ user: req.user._id }).populate(
    "user",
    "id username"
  );

  res.status(200).json(orders)
})

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "id username")
  res.send(orders)
})

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});






export {
  addOrderItems,
  getOrderById,
  getUserOrders,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
};
