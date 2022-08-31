import mongoose from "mongoose";

const { Schema } = mongoose;

const supplierSchema = new Schema(
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
    supplier_name: {
      type: String,
      trim: true,
      required: true,
    },
    product: {
      type: String,
      trim: true,
      required: true,
    },
    phone_number: {
      type: Number,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Suppliers", supplierSchema);
