import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
// import CreateCategory from "../client/src/pages/Admin/CreateCategory/CreateCategory.js";
import {
  categoryBannersController,
  categoryController,
  categoryIconsController,
  categoryImagesController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
import formidable from "express-formidable";
const router = express.Router();

//routes
//create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  formidable(),
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getALL category
router.get("/all-category", categoryController);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

//get icons
router.get("/categories-icons/:id", categoryIconsController);
//get Images
router.get("/categories-Images/:id", categoryImagesController);
//get Banners
router.get("/categories-banners/:id", categoryBannersController);
export default router;
