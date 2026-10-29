require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user.js");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI)
mongoose.connect('mongodb+srv://admin:CO4WDhsvfpF5BIgT@cluster0.2cbykn3.mongodb.net/')
.then(() => {
    console.log("✅ MongoDB Atlas Connected");
})
.catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
});

// Test route
app.get("/", (req, res) => {
    res.send("Instagram Backend Running");
});

// ================= REGISTER =================
app.post("/register", async (req, res) => {

    try {

        const { username, password } = req.body;

        // Check if username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.json({
                success: false,
                message: "Username already exists"
            });
        }

        // Create new user
        const user = new User({
            username,
            password
        });

        await user.save();

        res.json({
            success: true,
            message: "Registration Successful"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ================= LOGIN =================
app.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = await User.findOne({
            username,
            password
        });

        if (user) {

            res.json({
                success: true,
                message: "Login Successful"
            });

        } else {

            res.json({
                success: false,
                message: "Invalid Username or Password"
            });

        }

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});