import express from "express";
import {
  createOrderController,
  getUserOrderController,
} from "../controllers/orderController.js";
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";

const router = express.Router();

// GET USER ORDER ROUTE
router.post("/create-order", requireSignIn, createOrderController);

// GET ALL ADMIN ORDER ROUTE
router.get("/get-order", requireSignIn, getUserOrderController);

export default router