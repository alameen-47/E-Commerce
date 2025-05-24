import React from "react";

export const createOrderController = async (res, req) => {
  try {
    const { products, shippingAddress, payment } = req.body;
    if (!products || products.length === 0) {
      return resizeBy.status(400).json({ error: "No products in order" });
    }
    const newOrder = new orderController({
      products,
      buyer: req.user._id,
      shippingAddress,
      payment,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Error Creating Order" });
  }
};
