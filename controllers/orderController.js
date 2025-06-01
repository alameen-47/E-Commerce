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

export const getUserOrderController = async (req, res) => {
  try {
    console.log("User ID:", req.user);
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate(
        "products.product",
        "name price description images slug category"
      )
      .sort({ createdAt: -1 });

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "Order not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching user order: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products.product", "name images price size color")
      .populate("buyer", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching all orders: ", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch all orders", error });
  }
};

export const updateOrderContoller = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updateOrder = await orderModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updateOrder) {
      return res.status(404).json({ message: "Order not found " });
    }
    res.status(200).json(updateOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};
