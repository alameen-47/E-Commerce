import mongoose from "mongoose";

// Define translation schema for multi-language support
const translationSchema = new mongoose.Schema({
  name: String,
  description: String,
});

// Define product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      minlength: 1,
    },
    offer: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0,
    },
    category: {
      type: mongoose.ObjectId, // Category as a string (e.g., "electronics", "furniture")
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
    images: [
      {
        colors: String,
        imageSet: [
          {
            data: Buffer,
            contentType: String,
          },
        ],
      },
    ],
    shipping: {
      type: Boolean,
    },
    translations: {
      en: translationSchema,
      ar: translationSchema,
    },
    // categoryDetails will store data specific to the category
    categoryDetails: {
      type: mongoose.Schema.Types.Mixed, // Flexible to store any structure of details
      default: {},
    },
  },
  { timestamps: true }
);

// Export the model
export default mongoose.model("Product", productSchema);
