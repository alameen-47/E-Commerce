import express from "express";
import { translationController } from "../controllers/authController.js";
// import { authController } from "../controllers/authController.js"; // Ensure this path is correct

//router object
const router = express.Router();

//Translation
router.post("/translate", translationController);
export default router;
