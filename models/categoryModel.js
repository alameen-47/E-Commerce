import mongoose from "mongoose";

// const bannerSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   image: {
//     data: Buffer,
//     contentType: String,
//   },
// });

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
    type: Array,
    data: Buffer,
    contentType: String,
  },
  // banners: {
  //   type: [bannerSchema], // Array of banner objects
  //   default: [],
  // },
});
export default mongoose.model("Category", categorySchema);
