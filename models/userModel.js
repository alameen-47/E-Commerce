import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "Please enter your name"],
      trim: true,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: [true, "please add a password"],
      minlength: [6, "password should contain min 6 digits"],
    },
    phone: {
      type: String,
      maxLength: [10, "phone number can't be longer than 10 characters"],
      required: true,
    },
    address: {
      street: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      province: {
        type: String,
        default: "",
      },
      zipCode: {
        type: String,
        default: "",
      },
    },

    otp: { type: String },
    otpExpires: { type: Date },

    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
// Define a virtual field for the full address
userSchema.virtual("fullAddress").get(function () {
  return `${this.address.street}, ${this.address.city}, ${this.address.province}, ${this.address.zipCode}`;
});
export default mongoose.model("users", userSchema);
