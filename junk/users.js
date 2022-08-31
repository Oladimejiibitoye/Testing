import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: {
      type: String,
    },
    business_name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    owner_name: {
      type: String,
      trim: true,
      required: true,
    },
    business_category: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: false,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      required: false,
      min: 8,
      max: 64,
    },
    phone_number: {
      type: Number,
      trim: true,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (password) {
  const result = bcrypt.compareSync(password, this.password);
  return result;
};

export default mongoose.model("User", userSchema);
