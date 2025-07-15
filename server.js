require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./src/Routes/userRoute");
const productRoute = require("./src/Routes/productsRoute");
const orderRoute = require("./src/Routes/orderRoute");
const cartRoute = require("./src/Routes/cartRoute");
const authRoutes = require("./src/Routes/authRoutes"); // Admin/User login route
const dashboardRoutes = require("./src/Routes/summary");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Required to parse JSON requests

// ✅ API Routes
app.use("/auth", authRoutes); // 🔐 Login for admin/user
app.use("/users", userRoute); // 👤 User-related routes
app.use("/products", productRoute); // 🛍️ Product management
app.use("/orders", orderRoute); // 📦 Orders
app.use("/cart", cartRoute); // 🛒 Cart
app.use("/summary", dashboardRoutes);// Import summary route

async function startServer() {
  try {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Error:", err));
    console.log("✅ MongoDB connected");

    app.get("/", (req, res) => {
      res.send("Hello from railway + Express!");
    });

    const PORT = process.env.PORT || 9494;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

startServer();
