
//src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// Load JWT secret correctly
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // Ensure this is loaded

const authenticateUser = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        // Ensure correct token format: "Bearer <token>"
        const tokenParts = authHeader.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const token = tokenParts[1].trim();
        console.log("🔹 Extracted Token:", token);

        // Verify JWT
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);

        req.user = decoded;
        next();
    } catch (err) {
        console.error("❌ JWT Verification Error:", err.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = { authenticateUser };
