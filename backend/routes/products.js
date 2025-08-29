const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Review = require("../models/Review");
// get all
// router.get('/', async (req, res) => {
//   const products = await Product.find().lean();
//   res.json(products);
// });
// GET /api/products?category=Electronics&brand=Apple&minPrice=1000&maxPrice=5000
router.get("/", async (req, res) => {
  try {
    const { category, brand, color, size, minPrice, maxPrice } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (color) filter.color = color;
    if (size) filter.size = size;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// single product + summary rating
// routes/products.js


router.get("/:id", async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).lean();
    if (!p) return res.status(404).json({ message: "Not found" });

    // fetch all reviews for this product
    const reviews = await Review.find({ product: p._id })
      .populate("user", "email") // include user email
      .sort({ createdAt: -1 })   // latest first
      .lean();

    // compute average rating
    const avg =
      reviews.length > 0
        ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
        : 0;

    res.json({
      ...p,
      avgRating: Number(avg.toFixed(2)),
      reviewCount: reviews.length,
      reviews, // send full review list
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

module.exports = router;

module.exports = router;
