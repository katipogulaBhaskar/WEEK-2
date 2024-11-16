import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
    // Extract token from the Authorization header (Bearer <token>)
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    // If token is not provided, deny access
    if (!token) {
        return res.status(401).json({ error: 'No token provided, authorization denied' });
    }

    try {
        // Verify token with the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user to the request object
        req.user = await User.findById(decoded.id).select('-password'); // Exclude password

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Authorization Error:', error.message);
        return res.status(401).json({ error: 'Token is not valid' });
    }
};

export default authMiddleware;
