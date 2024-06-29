import mongoose from "mongoose";

const bannerModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      data: Buffer,
      ContentType: String,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Banners", bannerModel);
