import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  Furnitures,
  productCategoryController,
  productCountController,
  productFiltersController,
  productImageController,
  productListController,
  relatedProductsController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get image
router.get("/product-image/:pid", productImageController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//product filter
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductsController);

//category wise product list
router.get("/product-category/:slug", productCategoryController);

// Furnitures products
router.get("/furnitures", Furnitures);

export default router;
