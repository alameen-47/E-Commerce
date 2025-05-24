import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
import { createOrderController } from "../controllers/orderController.js";
import formidable from "express-formidable";

//router object
const router = express.Router();

//register||METHOD POST
router.post(
  "/create-order",
  requireSignIn,
  createOrderController,
  (req, res) => {
    res.status(200).send({ ok: true });
  }
);

export default router;
