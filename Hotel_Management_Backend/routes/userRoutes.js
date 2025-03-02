const express = require('express');
const router = express.Router();
const { userLogin, userRegister ,getUserProfile} = require('../controllers/userController.js');
const authMiddleware = require('../middleware/authMiddleware.js')

// User registration
router.post('/register', userRegister);

// User login
router.post('/login', userLogin);

router.get('/profile',authMiddleware , getUserProfile);

module.exports = router;