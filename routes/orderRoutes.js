import express from "express";
import { createOrderController } from "../controllers/orderController.js";
import formidable from "express-formidable";
import { requireSignIn } from "../middlewares/authmiddleware.js";
//router object
const router = express.Router();

//register||METHOD POST
router.post("/create-order", requireSignIn, createOrderController);

export default router;
