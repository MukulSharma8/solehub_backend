const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product"
  },

  size: {
  type: Number,
  required: true,
  min: 1
},

  quantity: {
  type: Number,
  required: true,
  default: 1,
  min: 1
}
});

cartItemSchema.index(
  { userId: 1, productId: 1, size: 1 },
  { unique: true }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;