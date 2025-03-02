// config/db.js
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI; 
// const DATABASE_NAME = process.env.MONGO_DB_DATABASE_NAME;  

// const fullMongoURI = `${MONGO_URI}/${DATABASE_NAME}`;

const connectToDb = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("-----MONGO DB CONNECTED-----");
  } catch (err) {
    console.error("-----MONGO_DB NOT CONNECTED-----");
    console.error(err.message);
    process.exit(1); // Stop the server if DB connection fails
  }
};

module.exports = connectToDb;
