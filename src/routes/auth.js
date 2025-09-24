const express = require("express");
const { register, login, getMe } = require("../controllers/authController");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to protect routes
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
