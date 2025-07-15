require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./src/Routes/userRoute");
const productRoute = require("./src/Routes/productsRoute");
const orderRoute = require("./src/Routes/orderRoute");
const cartRoute = require("./src/Routes/cartRoute");
const authRoutes = require("./src/Routes/authRoutes");
const dashboardRoutes = require("./src/Routes/summary");

const app = express();

// ✅ CORS setup
app.use(cors());

app.use(express.json()); // Required to parse JSON requests

// ✅ API Routes
app.use("/auth", authRoutes);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use("/cart", cartRoute);
app.use("/summary", dashboardRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");

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
