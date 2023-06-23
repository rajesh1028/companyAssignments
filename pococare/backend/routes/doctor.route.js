const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { DoctorModel } = require("../models/doctor.model");
const { SlotBookingModel } = require("../models/slotBooking.model");
const { authenticate } = require("../middlewares/authenticate.middleware");

const doctorRouter = express.Router();

doctorRouter.get("/", async (req, res) => {
    let doctors = await DoctorModel.find();
    res.json(doctors);
});

doctorRouter.get("/slots", async (req, res) => {
    try {
        // let id = req.body.userID;
        let slots = await SlotBookingModel.find(req.query);
        res.send(slots);
    } catch (error) {
        console.log({ error });
        res.send({ error });
    }
});

doctorRouter.patch("/updateSlot", async (req, res) => {
    try {
        let id = req.body.uniqueId;
        const { date, slot } = req.body;
        const allSlots = await SlotBookingModel.find({ uniqueId: id, date });
        console.log(slot);
        console.log(allSlots[0]);
        if (allSlots[0].slots[slot]) {
            allSlots[0].slots[slot] = !allSlots[0].slots[slot];
            await SlotBookingModel.updateOne({ uniqueId: id, date }, allSlots[0]);
        } else {
            console.log("no slots found");
        }
        res.send("Slots updated successfully");
    } catch (error) {
        console.log({ error });
        res.send({ error });
    }
})

doctorRouter.post("/signup", async (req, res) => {
    try {
        const { name, experience, password, email, location, image, description, specialist, phone, role } = req.body;
        const already = await DoctorModel.findOne({ email });
        if (already) {
            res.json("user already exists");
        } else {
            bcrypt.hash(password, 5, async (err, hashpass) => {
                if (err) {
                    res.json("error while hashing password");
                } else {
                    const user = new DoctorModel({
                        name, password: hashpass, email, location, image, experience, description, specialist, phone, role: "doctor"
                    });
                    await user.save();
                    res.json({ msg: "registration sucessfull" });
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
});

// sample data
// {
//     "name": "doctor",
//     "email": "doctor@gmail.com",
//     "password": "doctor",
//     "experience": 12,
//     "gender": "male",
//     "phone": "1234567890",
//     "location":"coimbatore",
//     "image":"https://img.freepik.com/free-vector/doctor-clinic-illustration_1270-69.jpg",
//     "description":"professional doctor",
//     "specialist":"neuro surgeon"
//   }

doctorRouter.post("/login", async (req, res) => {
    const { password, email } = req.body;
    const user = await DoctorModel.findOne({ email });
    if (!user) {
        res.json({ msg: "user does not exist" });
    } else {
        bcrypt.compare(password, user.password, async (err, result) => {
            if (err) {
                res.json({ msg: "wrong credential" });
            } else {
                if (result) {
                    var normaltoken = jwt.sign({ userID: user._id, role: user.role }, process.env.normalkey, { expiresIn: "5h" });
                    var refreshtoken = jwt.sign({ userID: user._id }, process.env.refreshkey, { expiresIn: "7d" });
                    res.json({
                        msg: "logged in successfully",
                        id: user._id,
                        name: user.name,
                        normaltoken
                    });
                } else {
                    res.json({ msg: "wrong credentials" });
                }
            }
        });
    }
});

doctorRouter.use(authenticate);

doctorRouter.use((req, res, next) => {
    if (req.body.role == "doctor") next();
    else res.send("Doctors are only allowed to access this page. You are a " + req.body.role);
})

doctorRouter.patch("/update", async (req, res) => {

    const { email, password } = req.body;
    const data = await DoctorModel.findOne({ email: email });
    console.log(pass);
    try {
        bcrypt.hash(password, 5, async (err, hashpass) => {
            if (err) {
                res.json(err);
                console.log(err);
            } else {
                let noteData = await DoctorModel.findByIdAndUpdate(
                    { _id: data._id },
                    { password: hashpass }
                );
                console.log(noteData);
                res.json("password updated");
            }
        });

    } catch (error) {
        console.log(error);
        res.send({ "error in updating password": error });
    }
});

doctorRouter.get("/slots", async (req, res) => {
    try {
        let id = req.body.userID;
        let slots = await SlotBookingModel.find({ uniqueId: id });
        res.send(slots);
    } catch (error) {
        console.log({ error });
        res.send({ error });
    }
})

doctorRouter.post("/addSlot", async (req, res) => {
    try {
        let id = req.body.userID
        const { date, slots } = req.body;
        const presentSlots = await SlotBookingModel.findOne({ uniqueId: id, date });
        if (presentSlots) {
            for (let key in slots) {
                if (presentSlots.slots[key] === undefined) {
                    presentSlots.slots[key] = true;
                }
            }
            await SlotBookingModel.updateOne({ uniqueId: id, date }, presentSlots);
        } else {
            console.log(id, date, slots);
            const slot = new SlotBookingModel({ uniqueId: id, date, slots });
            await slot.save();
        }

        res.send("Slots added successfully");
    } catch (error) {
        console.log({ error });
        res.send({ error });
    }
})

module.exports = { doctorRouter };