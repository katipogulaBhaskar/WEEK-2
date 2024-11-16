import User from '../models/User.js';
import { generateToken } from '../utils/tokenUtils.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';

// User Signup
export const signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username is already taken' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save(); // Save the user to the database

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Signup Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// User Login
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'Invalid username or password' });
        }

        // Compare passwords
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate a token
        const token = generateToken(user._id);

        res.json({
            message: 'Login successful',
            token, // Send the token to the client
        });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
