import React from "react";
import orderModel from "../models/orderModel.js";

export const createOrderController = async (req, res) => {
  try {
    const { products, shippingAddress, payment } = req.body;
    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No products in order" });
    }
    const newOrder = new orderModel({
      products,
      buyer: req.user._id,
      shippingAddress,
      payment,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error); // 👈 Add this
    res.status(500).json({ error: "Error Creating Order" });
  }
};
