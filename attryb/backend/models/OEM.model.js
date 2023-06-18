const mongoose = require("mongoose");

const oemSchema = mongoose.Schema({
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    colors: { type: [String], required: true },
    mileage: { type: Number, required: true },
    power: { type: Number, required: true },
    maxSpeed: { type: Number, required: true }
})

const OemModel = mongoose.model("oem", oemSchema);

module.exports = { OemModel }