const User = require('../models/sample'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 

require('dotenv').config(); 

// Signup function to create a new user
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Create a new user in the database
        const newUser = await User.create({ username, email, password });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Login function to authenticate a user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials. User not found.' });
        }

        // Validate password
        const isPasswordValid = await user.comparePassword(password); // Compare with stored hashed password

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials. Incorrect password.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login Successful!!!!', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Logout function 
exports.logout = async (req, res) => {
    res.json({ message: 'Logout Successful....' });
};

// Update user role function (admin only)
exports.updateRole = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from headers

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user is admin
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const { userId, role } = req.body; 
        const user = await User.findByPk(userId); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save(); // Save changes to the database

        res.json({ message: 'Role updated successfully!!!!', user });
    } catch (error) {
        console.error('Token verification error:', error.message);
        res.status(403).json({ message: 'Invalid token' });
    }
};
