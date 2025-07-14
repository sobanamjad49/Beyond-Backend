const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../app/Models/Admin");

const router = express.Router();

// Admin Register
router.post("/register", async (req, res) => {
  try {
    const email = req.body.email.toLowerCase().trim(); // Clean email
    const password = req.body.password;

    // Check if admin already exists
    let existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = new Admin({
      email,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
});


// Admin Login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();  // <- sanitize here
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      "your_jwt_secret_key",
      { expiresIn: "1d" }
    );

    res.json({
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
