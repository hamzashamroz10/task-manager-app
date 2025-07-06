import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization; // ✅ fixed property name

    if (!authHeader || !authHeader.toLowerCase().startsWith('bearer')) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token missing"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(payload.id).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists"
            });
        }

        req.user = user; // ✅ attach user to request
        next();

    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return res.status(401).json({
            success: false,
            message: "Token invalid or expired"
        });
    }
}
