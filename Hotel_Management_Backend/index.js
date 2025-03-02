require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./config/db');

const hospitalRoutes = require('./routes/hospitalRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();
const PORT = process.env.PORT || 1814;

// CORS configuration
const corsOptions = {
  origin: "https://alam-hospital-app.netlify.app", // Replace with your frontend URL (localhost or production domain)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middlewares
app.use(cors(corsOptions)); // Use CORS middleware with options
app.use(express.json()); // Replacing body-parser with express built-in json parser

// Routes
app.use('/api/v1/hospitals', hospitalRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user', userRoutes);

// Connect to the database
connectToDb();

// Error handling middleware (optional, for catching async errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
