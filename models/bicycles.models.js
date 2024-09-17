const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["E-cycle", "Cycle", "Part", "Accessory"],
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    availableInStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },
    categories: {
      type: [String],
    },
    tags: {
      type: [String],
    },
    weight: {
      type: Number,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    material: {
      type: String,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    condition: {
      type: String,
      enum: ["New", "Used", "Refurbished"],
    },
    warranty: {
      type: Boolean,
      default: false,
    },
    warrantyDuration: {
      type: Number,
    },
    shipping: {
      type: Boolean,
      default: true,
    },
    shippingCost: {
      type: Number,
    },
    shippingDuration: {
      type: Number,
    },
    reviews: [
      {
        rating: {
          type: Number,
          required: true,
        },
        review: {
          type: String,
          required: true,
        },
        reviewerName: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
