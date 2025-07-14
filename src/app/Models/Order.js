const mongoose = require("mongoose");

// Payment Details Schema
const paymentDetailsSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      enum: ["cod", "card", "wallet", "bank", "gpay"],
      required: true,
    },

    // Wallet Payment Fields
    walletName: String,     // e.g., "JazzCash" or "Easypaisa"
    walletNumber: String,   // e.g., "03001234567"

    // Bank Payment Fields
    bankName: String,       // e.g., "Summit Bank"
    bankAccount: String,    // e.g., "12345678901234"
    cnic: String,           // e.g., "35202-1234567-8"

    // Card Payment Fields
    cardNumber: String,     // e.g., "1234 5678 9012 3456"
    cardExpiry: String,     // e.g., "12/25"
    cardCVV: String,        // e.g., "123"

    // GPay (optional)
    gpayId: String
  },
  { _id: false }
);

// Cart Item Schema
const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    price: Number,
    quantity: Number,
    size: String,
    image: String,
  },
  { _id: false }
);

// Order Schema
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    contact: {
      emailOrPhone: { type: String, required: true },
      subscribeToOffers: { type: Boolean, default: false },
    },

    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, default: "Pakistan" },
      phone: { type: String, required: true },
    },

    billingAddress: {
      sameAsShipping: { type: Boolean, default: true },
      firstName: String,
      lastName: String,
      address: String,
      city: String,
      postalCode: String,
      phone: String,
    },

    cartItems: [cartItemSchema],

    payment: paymentDetailsSchema,

    shippingMethod: { type: String, default: "Free Shipping" },

    subtotal: Number,
    discount: Number,
    total: Number,

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
