import jwt from 'jsonwebtoken';

// Generate a JWT token
export const generateToken = (userId) => {
    // Sign the token with the user's ID as payload
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Verify a JWT token
export const verifyToken = (token) => {
    try {
        // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; // Return the decoded payload (user info)
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};
