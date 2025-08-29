// backend/index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");
const serverless = require("serverless-http");

dotenv.config();
const app = express();

// const allowedOrigins = [
//   "https://ecommerce-hazel-tau-48.vercel.app",
//   "http://localhost:3000"
// ];
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// app.get("/", (req, res) => {
//   res.json({ message: "Backend API is running 🚀", status: "ok" });
// });

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/wishlist", require("./routes/wishlist"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/products/:productId/reviews", require("./routes/review"));

connectDB();

// Local dev only
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

// 👉 Export app (important for Vercel)
//module.exports = app;
// const express = require("express");
// const app = express();

// app.all("*", (req, res) => {
//   res.json({ message: "Hello from backend API 🚀", path: req.originalUrl });
// });


//module.exports = serverless(app);


// const express = require("express");
// const serverless = require("serverless-http");
// const connectDB = require("./db");

// const app = express();
// app.use(express.json());

// // Connect DB once (not per request)
// connectDB().then(() => console.log("✅ MongoDB connected")).catch(console.error);

// // Example route
// app.get("/api", (req, res) => res.json({ message: "Backend running ✅" }));

// // Your other routes
// app.use("/api/products", require("./routes/products"));
// // add more routes here

//  module.exports = app;
//  module.exports.handler = serverless(app);
