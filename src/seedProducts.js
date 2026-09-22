const mongoose = require("mongoose");
const Product = require("./models/Product");
const products = [
  {
    name: "Nike Air Max 270",
    brand: "Nike",
    price: 150,
    category: "Running",
    image: "assets/images/products/Jordan.png",
    description: "A comfortable and stylish running shoe designed for everyday performance.",
    rating: 4.5,
    sizes: [7, 8, 9, 10, 11],
    gallery: [],
    isPopular: true,
    isNewArrival: true
  },

  {
    name: "Nike Air Force 1",
    brand: "Nike",
    price: 120,
    category: "Lifestyle",
    image: "assets/images/products/Jordan.png",
    description: "A classic Nike sneaker with a clean design for everyday wear.",
    rating: 4.7,
    sizes: [7, 8, 9, 10, 11],
    gallery: [],
    isPopular: true,
    isNewArrival: false
  },

  {
    name: "Nike Dunk Low",
    brand: "Nike",
    price: 115,
    category: "Lifestyle",
    image: "assets/images/products/Jordan.png",
    description: "A timeless low-top sneaker combining classic style with everyday comfort.",
    rating: 4.6,
    sizes: [7, 8, 9, 10, 11],
    gallery: [],
    isPopular: true,
    isNewArrival: true
  },

  {
    name: "Nike Pegasus 41",
    brand: "Nike",
    price: 140,
    category: "Running",
    image: "assets/images/products/Jordan.png",
    description: "Responsive cushioning and a lightweight design for daily running.",
    rating: 4.5,
    sizes: [7, 8, 9, 10, 11],
    gallery: [],
    isPopular: false,
    isNewArrival: true
  },

  {
    name: "Nike Air Jordan 1",
    brand: "Nike",
    price: 180,
    category: "Basketball",
    image: "assets/images/products/Jordan.png",
    description: "An iconic basketball-inspired sneaker with a bold and classic design.",
    rating: 4.8,
    sizes: [7, 8, 9, 10, 11],
    gallery: [],
    isPopular: true,
    isNewArrival: false
  },

  {
    name: "Nike Metcon 9",
    brand: "Nike",
    price: 130,
    category: "Training",
    image: "assets/images/products/Jordan.png",
    description: "A durable training shoe built for demanding workouts and gym sessions.",
    rating: 4.4,
    sizes: [7, 8, 9, 10, 11],
    gallery: [],
    isPopular: false,
    isNewArrival: true
  },

  {
    name: "Nike Vomero 5",
    brand: "Nike",
    price: 160,
    category: "Lifestyle",
    image: "assets/images/products/Jordan.png",
    description: "A retro-inspired sneaker combining layered style with modern comfort.",
    rating: 4.6,
    sizes: [7, 8, 9, 10, 11],
    gallery: [],
    isPopular: true,
    isNewArrival: false
  },

  {
    name: "Nike Revolution 7",
    brand: "Nike",
    price: 95,
    category: "Running",
    image: "assets/images/products/Jordan.png",
    description: "A lightweight everyday running shoe designed for comfortable movement.",
    rating: 4.3,
    sizes: [7, 8, 9, 10, 11],
    gallery: [],
    isPopular: false,
    isNewArrival: true
  }
];
const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/solehub");

    console.log("MongoDB connected");

    await Product.deleteMany();

    console.log("Old products deleted");

    await Product.insertMany(products);

    console.log("Products inserted successfully");

    await mongoose.connection.close();

    console.log("MongoDB connection closed");

  } catch (error) {
    console.log("Error:", error.message);
  }
};

seedProducts();