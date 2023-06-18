const mongoose = require("mongoose");

const oemSchema = mongoose.Schema({
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    availableColors: { type: Array, required: true },
    mileage: { type: Number, required: true },
    power: { type: String, required: true },
    maxSpeed: { type: Number, required: true }
})

const OemModel = mongoose.model("oem", oemSchema);

module.exports = { OemModel }