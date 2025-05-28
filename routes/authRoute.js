import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfileController,
  verifyOtpController,
  getAllUsers,
  updateAddressController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
import { getAllOrdersController } from "../controllers/orderController.js";
// import translateText from "../services/translateText.js";

//router object
const router = express.Router();

//routing
//register||METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/signin", loginController);

//Forgot Password
router.post("/forgot-password", forgotPasswordController);

//Reset-Password
router.post("/reset-password", verifyOtpController);
// //Translation
// router.post("/translate", translateController);

// //test routes
// router.get("/test", requireSignIn, isAdmin, testController);

// // Translation
// router.post("/translate", translateController);

//protected user-route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//all orders
router.get("/all-users", requireSignIn, isAdmin, getAllUsers, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin-route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update-profile
router.put(
  "/update-profile",
  requireSignIn,
  updateProfileController,
  (req, res) => {
    res.status(200).send({ ok: true });
  }
);
//update-profile
router.put(
  "/update-address",
  requireSignIn,
  updateAddressController,
  (req, res) => {
    res.status(200).send({ ok: true });
  }
);

export default router;
