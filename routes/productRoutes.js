import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";

import {
  braintreePaymentsController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  electronicsController,
  footwearController,
  furnituresController,
  getAllProductController,
  getProductListController,
  getSingleProductController,
  personalizedProductsController,
  productCategoryController,
  productCountController,
  productFiltersController,
  relatedProductsController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
// import braintree from "braintree";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable({ multiples: true }),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable({ multiples: true }),
  updateProductController
);

//get products
router.get("/get-product", getAllProductController);

// //get offersFilteredProducts
// router.get("/get-product/offer-filter", getProductsForSlideshowController);

//single product
router.get("/get-product/:slug/:pid", getSingleProductController);

//get image
// router.get("/product-image/:pid", productImageController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//product filter
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", getProductListController);

//search product
router.get("/search/:keyword", searchProductController);

//related product
router.get("/related-product/:pid/:cid", relatedProductsController);

//personalizedRelated products
router.get("/similar-product/:pname/:cid", personalizedProductsController);

//category wise product list
router.get("/product-category/:slug", productCategoryController);

//Furnitures products
router.get("/furnitures", furnituresController);

//Electronics products
router.get("/electronics", electronicsController);

//Footware products
router.get("/footwear", footwearController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentsController);

export default router;
