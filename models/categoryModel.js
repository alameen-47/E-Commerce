import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
  title: String,
  description: String,
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a Category Name"],
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true,
  },
  icons: {
    data: Buffer,
    contentType: String,
  },
  images: {
    data: Buffer,
    contentType: String,
  },
  banners: {
    data: Buffer,
    contentType: String,
  },
});
export default mongoose.model("Category", categorySchema);
