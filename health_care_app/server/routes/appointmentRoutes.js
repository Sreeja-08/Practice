const express = require("express");

const router = express.Router();

const Appointment = require("../models/Appointment");



/* =======================================
   BOOK APPOINTMENT
======================================= */

router.post("/book", async (req, res) => {

    try {

        const newAppointment = new Appointment({

            patientName: req.body.patientName,

            patientEmail: req.body.patientEmail,

            doctorName: req.body.doctorName,

            date: req.body.date,

            time: req.body.time,

            status: "Pending"

        });

        await newAppointment.save();

        res.status(201).json({

            message: "Appointment Booked Successfully"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Error Booking Appointment"

        });

    }

});



/* =======================================
   GET USER APPOINTMENTS
======================================= */

router.get("/:email", async (req, res) => {

    try {

        const appointments = await Appointment.find({

            patientEmail: req.params.email

        });

        res.json(appointments);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Error Fetching Appointments"

        });

    }

});



module.exports = router;