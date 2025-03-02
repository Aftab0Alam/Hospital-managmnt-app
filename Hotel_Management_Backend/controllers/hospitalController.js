const Hospital = require('../models/hospital.js');

// Task 1: Create a New Hospital (Admin Only)
const createHospital = async (req, res) => {
    try {
        const { name, city, specialties, contact_number, ratings, image } = req.body;

        const hospital = new Hospital({
            name,
            city,
            specialties,
            contact_number,
            ratings,
            image,
            createdBy: req.user.adminId,
        });

        await hospital.save();
        res.status(201).json({ message: 'Hospital created successfully', hospital });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Task 2: Get Hospitals by City (Public)
const getHospitalsByCity = async (req, res) => {
    try {
        const { city } = req.query;
        const query = city ? { city: city.toLowerCase() } : {};
        const hospitals = await Hospital.find(query);
        res.json({ hospitals });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Task 3: Delete a Hospital (Admin Only)
const deleteHospital = async (req, res) => {
    try {
        const { id } = req.body;  // Extracting the ID from the body, not from query
        if (!id) return res.status(400).json({ message: 'Hospital ID is required' });

        const hospital = await Hospital.findByIdAndDelete(id); // Deleting the hospital by ID
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        res.json({ message: 'Hospital deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Task 4: Update a Hospital (Admin Only)
const updateHospital = async (req, res) => {
    try {
    
        const { id, name, city, specialties, contact_number, ratings, image } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Hospital ID is required' });
        }
        const updatedHospital = await Hospital.findByIdAndUpdate(
            id, 
            { name, city, specialties, contact_number, ratings, image }, 
            { new: true } 
        );

        if (!updatedHospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.json({ message: 'Hospital updated successfully', updatedHospital });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Task 5: Add or Update Hospital Details (Admin Only)
const addHospitalDetails = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: 'Hospital ID is required' });

        const updatedHospital = await Hospital.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.json({ message: 'Hospital details updated successfully', updatedHospital });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createHospital, getHospitalsByCity, deleteHospital, updateHospital, addHospitalDetails };
