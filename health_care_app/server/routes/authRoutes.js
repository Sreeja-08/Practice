const express = require("express");
const router = express.Router();

const User = require("../models/user");


// REGISTER
router.post("/register", async (req, res) => {

    try {

        const user = new User(req.body);

        await user.save();

        res.status(201).json({
            message: "User Registered",
            user
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// LOGIN
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email,
            password
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        res.json({
            message: "Login Success",
            user
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;