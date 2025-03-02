const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    specialties: { type: [String], required: true },
    contact_number: { type: String, required: true },
    ratings: { type: Number, required: true, min: 0, max: 5 }, // Ratings in stars (0-5)
    image: { type: String, required: false }, // Image link
    details: { type: Object, default: {} }, // Additional details (optional)
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);
