import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    productId: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    quantity: {
      type: Number,
      required: true,
      default: 1
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0
    },

    date: Date,

  },
  {
    timestamps: true
  }
);

export default mongoose.model("Order", orderSchema);