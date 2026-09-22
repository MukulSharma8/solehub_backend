const express = require("express");
const User = require("../models/user");

const router = express.Router();
const bcrypt = require("bcrypt");

// CREATE USER
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email
    };

    res.status(201).json(safeUser);

  } catch (error) {

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create user",
      error: error.message
    });
  }
});


// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    res.status(500).json({
      message: "Failed to fetch user",
      error: error.message
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email
    };

    res.status(200).json({
      message: "Login successful",
      user: safeUser
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
});


module.exports = router;