const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");

const User = require("../models/User");

// Register a new user
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res
                .status(201)
                .json({ message: "User created successfully", user });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating user" });
    }
});

// Login with email and password
router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ message: "Logged in successfully", user: req.user });
});

// Get user details
router.get("/", (req, res) => {
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
});

// Logout
router.get("/logout", (req, res) => {
    req.logout();
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
