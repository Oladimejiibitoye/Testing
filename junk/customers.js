import mongoose from "mongoose";

const { Schema } = mongoose;

const customerSchema = new Schema(
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
    customer_name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone_number: {
      type: Number,
      trim: true,
    },
    address: String,
  },
  { timestamps: true }
);

export default mongoose.model("Customers", customerSchema);
