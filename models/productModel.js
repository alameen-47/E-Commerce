import mongoose from "mongoose";

const translationSchema = new mongoose.Schema({
  name: String,
  description: String,
});
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
      type: mongoose.ObjectId,
      ref: "Category",
      require: true,
    },
    discountPrice: {
      type: Number,
      require: true,
    },
    quanntity: {
      type: Number,
      default: 1,
      require: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
    translations: {
      en: translationSchema,
      ar: translationSchema,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
