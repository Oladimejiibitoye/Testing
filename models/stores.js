const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
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

const supplierSchema = new Schema(
  {
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

const customerSchema = new Schema(
  {
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


const storeSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    store_name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
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
    products: [{
      type: productSchema,
    }],
    suppliers: [{
      type: supplierSchema,
    }],
    customers:[{
      type: customerSchema
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Store', storeSchema);

