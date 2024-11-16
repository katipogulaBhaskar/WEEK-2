import jwt from "jsonwebtoken";

const generateTokenSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    res.cookie("jwt", token, {
        maxAge: 1 * 60 * 60 * 1000, // 1 hour in milliseconds
        httpOnly: true,     // Makes the cookie accesible only through HTTP(S), not JavaScript
        sameSite: "strict", // Ensure the cookie is sent only with request from same site
        secure: process.env.NODE_ENV !== "development",     // sends the cookie only over HTTPS in production
        domain: new URL(process.env.FRONTEND_URL).hostname  // Set your domain here
    });

};

export default generateTokenSetCookie;