const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: String,
    description: String,
    description1: String,
    price: Number,
    images: [String], // for gallery
    src: String, // for thumbnail
    Size: [String],
    category: String,
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
