const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({

    patientName: String,

    patientEmail: String,

    doctorName: String,

    prescription: String,

    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model(
    "Prescription",
    prescriptionSchema
);