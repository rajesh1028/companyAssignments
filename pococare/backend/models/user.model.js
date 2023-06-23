const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user", "doctor"],
        default: "user"
    }

}, {
    versionKey: false
})

const UserModel = mongoose.model("user", userSchema)

module.exports = { UserModel }