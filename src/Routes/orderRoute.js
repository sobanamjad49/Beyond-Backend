const express = require("express");
const router = express.Router();
const Order = require("../app/Models/Order");

// Create new order
router.post("/new", async (req, res) => {
  try {
    console.log("👉 Incoming Order Data:", req.body);
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Order Creation Error:", error.message); // 👈 log the actual error
    res.status(500).json({ message: "Error creating order", error: error.message }); // return string message
  }
});



// Get all orders
router.get("/allorders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

// Update order status/payment status
router.put("/update/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
});

// Delete an order
router.delete("/delete/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
});

// ✅ Get one order by ID

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order", error: err.message });
  }
});


module.exports = router;
