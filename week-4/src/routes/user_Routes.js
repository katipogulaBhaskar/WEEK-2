const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Admin role management to update its  role
router.put('/update-role', authController.updateRole);

module.exports = router;