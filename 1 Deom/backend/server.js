const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Allow requests from the frontend URL
app.use(cors({
  origin: 'https://vinoth-frontend.vercel.app', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Enable credentials if required
}));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
const itemRoutes = require("./routes/itemRoutes");
app.use("/api/items", itemRoutes);

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
