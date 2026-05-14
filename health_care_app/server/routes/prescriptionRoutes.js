const express = require("express");

const router = express.Router();

const Prescription = require("../models/Prescription");


// ADD PRESCRIPTION
router.post("/add", async (req, res) => {

    try {

        const prescription = new Prescription(req.body);

        await prescription.save();

        res.status(201).json({
            message: "Prescription Added"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET PRESCRIPTIONS
router.get("/", async (req, res) => {

    try {

        const prescriptions =
        await Prescription.find();

        res.json(prescriptions);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;