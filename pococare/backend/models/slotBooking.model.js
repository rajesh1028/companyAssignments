const mongoose = require("mongoose");

const SlotBookingSchema = mongoose.Schema({
    uniqueId: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    slots: {
        type: Object,
        required: true,
        default: {}
    }
}, {
    versionKey: false

});

const SlotBookingModel = mongoose.model("booking", SlotBookingSchema);

module.exports = {
    SlotBookingModel
};