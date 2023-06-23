const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  specialist: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: "doctor"
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }

}, {
  versionKey: false
});

const DoctorModel = mongoose.model("doctor", doctorSchema);

module.exports = { DoctorModel }


