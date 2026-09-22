require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(express.json());

connectDB();
app.get("/", (req, res) => {
  res.send("SOLEHUB API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", wishlistRoutes);
app.use("/api/users", cartRoutes);

const PORT = 9000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});