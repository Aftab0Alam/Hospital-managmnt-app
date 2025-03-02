const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const adminMiddleware = require('../middleware/adminMiddleware.js');

const { 
  createHospital, 
  getHospitalsByCity, 
  deleteHospital, 
  updateHospital, 
  addHospitalDetails 
} = hospitalController;

// Task 1: Create Hospital (Admin Only)
router.post('/create', authMiddleware, adminMiddleware, createHospital);

// Task 2: Get Hospitals by City (Public)
router.get('/', getHospitalsByCity);

// Task 3: Delete Hospital (Admin Only)
router.delete('/delete', authMiddleware, adminMiddleware, deleteHospital);

// Task 4: Update Hospital (Admin Only)
router.put('/update', authMiddleware, adminMiddleware, updateHospital);

// Task 5: Add Hospital Details (Admin Only)
router.post('/details', authMiddleware, adminMiddleware, addHospitalDetails);

module.exports = router;
