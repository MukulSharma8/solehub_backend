const express = require("express");

const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

const router = express.Router();


// ADD PRODUCT TO CART
router.post("/:userId/cart", async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.body.productId;
    const size = req.body.size;
    const quantity = req.body.quantity || 1;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const cartItem = await CartItem.create({
      userId,
      productId,
      size,
      quantity
    });

    res.status(201).json(cartItem);

  } catch (error) {
    res.status(500).json({
      message: "Failed to add product to cart",
      error: error.message
    });
  }
});


// GET USER CART
router.get("/:userId/cart", async (req, res) => {
  try {
    const userId = req.params.userId;

    const cart = await CartItem.find({
      userId: userId
    }).populate("productId");

    res.status(200).json(cart);

  } catch (error) {

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    res.status(500).json({
      message: "Failed to fetch cart",
      error: error.message
    });
  }
});
router.patch("/:userId/cart/:cartItemId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItemId = req.params.cartItemId;
    const quantity = req.body.quantity;

    const cartItem = await CartItem.findOneAndUpdate(
      {
        _id: cartItemId,
        userId: userId
      },
      {
        quantity: quantity
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    res.status(200).json(cartItem);

  } catch (error) {
    res.status(500).json({
      message: "Failed to update cart",
      error: error.message
    });
  }
});
router.delete("/:userId/cart/:cartItemId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItemId = req.params.cartItemId;

    const cartItem = await CartItem.findOneAndDelete({
      _id: cartItemId,
      userId: userId
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    res.status(200).json({
      message: "Product removed from cart"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to remove product from cart",
      error: error.message
    });
  }
});


module.exports = router;