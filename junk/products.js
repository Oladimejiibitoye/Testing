import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Store",
    },
    product_name: {
      type: String,
      required: true,
      trim: true,
    },
    product_category: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
    },
    cost_price: {
      type: Number,
      required: true,
      trim: true,
    },
    selling_price: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
