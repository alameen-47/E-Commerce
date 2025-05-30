import mongoose from "mongoose";
import { type } from "os";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: "Product",
          required: true,
        },
        units: {
          type: Number,
          default: 1,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
        },
        color: {
          type: String,
        },
      },
    ],
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    payment: {
      method: {
        type: String,
      },
      // paymentResult: {
      //   id: String,
      //   status: String,
      //   update_time: String,
      //   email_address: String,
      // },
    },

    status: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned",
      ],
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
