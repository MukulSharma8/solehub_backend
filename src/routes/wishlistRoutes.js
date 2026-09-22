const express = require("express");

const Wishlist = require("../models/wishlist");
const Product = require("../models/Product");

const router = express.Router();

router.post("/:userId/wishlist", async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.body.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const wishlistItem = await Wishlist.create({
      userId,
      productId
    });

    res.status(201).json(wishlistItem);

  } catch (error) {
    res.status(500).json({
      message: "Failed to add product to wishlist",
      error: error.message
    });
  }
});
router.get("/:userId/wishlist", async (req, res) => {
  try {
    const userId = req.params.userId;

    const wishlist = await Wishlist.find({
      userId: userId
    }).populate("productId");

    res.status(200).json(wishlist);

  } catch (error) {

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    res.status(500).json({
      message: "Failed to fetch wishlist",
      error: error.message
    });
  }
});
router.delete("/:userId/wishlist/:productId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    const wishlistItem = await Wishlist.findOneAndDelete({
      userId: userId,
      productId: productId
    });

    if (!wishlistItem) {
      return res.status(404).json({
        message: "Product not found in wishlist"
      });
    }

    res.status(200).json({
      message: "Product removed from wishlist"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to remove product from wishlist",
      error: error.message
    });
  }
});

module.exports = router;