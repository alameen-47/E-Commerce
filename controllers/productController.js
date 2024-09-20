import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import slugify from "slugify";
import dotenv from "dotenv";
import sharp from "sharp";

dotenv.config();

//Payment Gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      category,
      offer,
      quantity,
      shipping,
      translations,
    } = req.fields;
    const { image } = req.files;
    //validations
    switch (true) {
      case !name:
        return res
          .status(500)
          .send({ error: "Please provide a name for the product" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Please add a price" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !offer:
        return res.status(500).send({ error: "Offer is Required" });
    }
    const products = new productModel({
      ...req.fields,
      offer,
      slug: slugify(name),
    });

    // Handle multiple images
    // if (image) {
    const processImage = async (img) => {
      const originalSize = fs.statSync(img.path).size;

      const outputFilePath = `compressed_${Date.now()}.webp`; // Create a unique output file name
      await sharp(img.path)
        .resize(500, 500, { fit: "inside" }) // Reduced size
        .webp({ quality: 78 }) // Adjust quality (70-85 is a good balance)
        .toFormat("webp")
        .toFile(outputFilePath);

      const compressedSize = fs.statSync(outputFilePath).size; // Compressed image size
      const imageBuffer = fs.readFileSync(outputFilePath);
      const imageBase64 = imageBuffer.toString("base64");

      // Clean up the temporary file
      fs.unlinkSync(outputFilePath);

      // Log size difference
      console.log(`Original Size: ${originalSize / 1024} KB`);
      console.log(`Compressed Size: ${compressedSize / 1024} KB`);
      console.log(
        `Size Reduction: ${(originalSize - compressedSize) / 1024} KB`
      );

      // Read the compressed image and add it to the product
      return {
        data: imageBuffer,
        contentType: "image/webp",
      };
    };

    if (image) {
      const imageArray = Array.isArray(image) ? image : [image];
      for (const img of imageArray) {
        const processedImage = await processImage(img);
        products.image.push(processedImage);
      }
    }

    await products.save();

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating  product",
    });
  }
};

//get all products
export const getAllProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      // .select("-image")
      .sort({ createdAt: -1 });

    if (products && products.length > 0) {
      const productList = products.map((product) => {
        return {
          ...product._doc, // Spread other product details
          image: product.image.map((img) => ({
            contentType: img.contentType,
            data: img.data.toString("base64"), // Convert Buffer to base64 string
          })),
        };
      });

      res.status(200).send({
        success: true,
        totalCount: products.length,
        message: "All Products",
        products: productList, // Send the processed product list with base64 images
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No products found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Products ",
      error: error.message,
    });
  }
};

//get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      // .select("-image")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Product Fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Single Product",
      error,
    });
  }
};

export const productImageController = async (req, res) => {
  //get image
  try {
    const { pid, index } = req.params;
    // Find the product by ID and select the image field
    const product = await productModel.findById(req.params.pid).select("image");

    if (product && product.image.length > 0) {
      // Send each image in the response
      // Assuming that `product.image` is an array of image objects
      const image = product.image[0]; // Select the first image (modify if necessary)

      res.setHeader("Content-Type", image.contentType);
      // console.log("Images Controller ", image.data);
      return res.status(200).send(image.data); // Send the image data directly
    } else {
      return res.status(404).send({
        success: false,
        message: "No images found for this product",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting image",
      error,
    });
  }
};

//Delete Controller
export const deleteProductController = async (req, res) => {
  try {
    // await productModel.findByIdAndDelete(req.params.pid).select("-image");
    res.status(200).send({
      success: true,
      message: "Product Deleted Succefully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Deleting product",
      error,
    });
  }
};

//updateProductController
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, offer } = req.fields;

    const { image } = req.files;
    //validations
    switch (true) {
      case !name:
        return res
          .status(500)
          .send({ error: "Please provide a name for the product" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Please add a price" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case image && image.size > 1000000:
        return res
          .status(500)
          .send({ error: "Image is Required and should be less than 1mb " });
    }
    // Calculate discount price
    const discountPrice = Math.floor(price - (price * offer) / 100);

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        discountPrice,
        slug: slugify(name),
      },
      { new: true }
    );
    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updating  product",
    });
  }
};

//filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(e);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Products",
      error,
    });
  }
};

//product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

//get Furnitures products controller
export const furnituresController = async (req, res) => {
  try {
    const products = await productModel
      .find({ category: "66dd86a579f744083e257e2b" })
      .populate("category")
      // .select("-image")
      .limit(8)
      .sort({ createdAt: -1 });
    if (products && products.length > 0) {
      const productList = products.map((product) => {
        return {
          ...product._doc, // Spread other product details
          image: product.image.map((img) => ({
            contentType: img.contentType,
            data: img.data.toString("base64"), // Convert Buffer to base64 string
          })),
        };
      });
      res.status(200).send({
        success: true,
        message: "All Electronics Products",
        products: productList, // Send the processed product list with base64 images
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No products found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Furniture Products",
      error,
    });
  }
};
//get Electronics products controller
export const electronicsController = async (req, res) => {
  try {
    const products = await productModel
      .find({ category: "66dd847879f744083e257e0f" })
      .populate("category")
      .limit(16)
      .sort({ createdAt: -1 });

    if (products && products.length > 0) {
      const productList = products.map((product) => {
        return {
          ...product._doc, // Spread other product details
          image: product.image.map((img) => ({
            contentType: img.contentType,
            data: img.data.toString("base64"), // Convert Buffer to base64 string
          })),
        };
      });
      res.status(200).send({
        success: true,
        message: "All Electronics Products",
        products: productList, // Send the processed product list with base64 images
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No products found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Electronics Products",
      error,
    });
  }
};

//get Footwear products controller
export const footwearController = async (req, res) => {
  try {
    const categoryIds = {
      gents: "66e81d57434a084e9fce81e5",
      ladies: "66e81cc2434a084e9fce81de",
      kids: "66e81da7434a084e9fce81ec",
    };
    const products = await productModel
      .find({
        category: { $in: Object.values(categoryIds) },
      })
      .populate("category")
      .sort({ createdAt: -1 })
      .exec();

    if (products && products.length > 0) {
      const productList = products.map((product) => {
        return {
          ...product._doc, // Spread other product details
          image: product.image
            ? product.image.map((img) => ({
                contentType: img.contentType,
                data: img.data.toString("base64"), // Convert Buffer to base64 string
              }))
            : [], // Return empty array if no image exists
        };
      });
      const link = "/category/footwear";

      const gentsFootwear = [];
      const ladiesFootwear = [];
      const kidsFootwear = [];

      productList.forEach((product) => {
        switch (product.category._id.toString()) {
          case categoryIds.gents:
            gentsFootwear.push(product);
            break;
          case categoryIds.ladies:
            ladiesFootwear.push(product);
            break;
          case categoryIds.kids:
            kidsFootwear.push(product);
            break;
        }
      });

      res.status(200).send({
        success: true,
        message: "All Footwear Products",
        gentsFootwear,
        ladiesFootwear,
        kidsFootwear,
        product: productList,
        link,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No Footwear Products Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Footwear Products",
      error,
    });
  }
};

// //product list based on page
export const getProductListController = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const totalCount = await productModel.countDocuments();

    const products = await productModel
      .find({})
      .populate("category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    if (products && products.length > 0) {
      const productList = products.map((product) => ({
        ...product._doc,
        image: product.image.map((img) => ({
          contentType: img.contentType,
          data: img.data.toString("base64"),
        })),
      }));

      res.status(200).send({
        success: true,
        totalCount,
        currentPage: pageNum,
        totalPages: Math.ceil(totalCount / limitNum),
        message: "Products fetched successfully",
        products: productList,
      });
    } else {
      res.status(200).send({
        success: true,
        totalCount: 0,
        currentPage: pageNum,
        totalPages: 1, // Even if no products, indicate 1 page
        message: "No more products",
        products: [], // Empty products array
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });
    // .select("-image");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Search Error",
      error,
    });
  }
};
//related product
export const relatedProductsController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      // .select("-image")
      .limit(4)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while fetching related products",
      error,
    });
  }
};

// get products based on category
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting Category Products.",
    });
  }
};

//Payment gateway API
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payments
export const braintreePaymentsController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price * i.quantity;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: { submitForSettlement: true },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true, order });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
