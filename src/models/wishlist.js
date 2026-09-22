const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product"
  }
});

wishlistSchema.index(
  { userId: 1, productId: 1 },
  { unique: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;