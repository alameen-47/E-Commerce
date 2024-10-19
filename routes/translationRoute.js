import express from "express";
import { translationController } from "../controllers/translationController.js";
//router object
const router = express.Router();

//Translation
router.post("/translate", translationController);
export default router;
