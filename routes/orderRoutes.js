import express from "express";
import {
  createOrderController,
  getAllOrdersController,
  getUserOrderController,
  updateOrderContoller,
} from "../controllers/orderController.js";
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";

const router = express.Router();

// GET USER ORDER ROUTE
router.post("/create-order", requireSignIn, createOrderController);

// GET ALL ADMIN ORDER ROUTE
router.get("/get-order", requireSignIn, getUserOrderController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//update orders
router.put("/orders-status/:id", updateOrderContoller);
export default router;
