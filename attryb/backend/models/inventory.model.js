const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: [String], required: true },
    kms: { type: Number, required: true },
    scratches: { type: Number, required: true },
    paint: { type: String, required: true },
    accidents: { type: Number, required: true },
    previousBuyers: { type: Number, required: true },
    registerPlace: { type: String, required: true },
    userID: String
})

const InventoryModel = mongoose.model("inventory", inventorySchema);

module.exports = { InventoryModel }