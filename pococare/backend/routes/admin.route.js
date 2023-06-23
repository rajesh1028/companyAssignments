const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { UserModel } = require("../models/user.model");
const { DoctorModel } = require("../models/doctor.model");
const { SlotBookingModel } = require("../models/slotBooking.model");
const { authenticate } = require("../middlewares/authenticate.middleware");

const adminRouter = express.Router();

adminRouter.post("/signup", async (req, res) => {
    try {
        const { name, password, email, age, gender, phone, role } = req.body;
        const already = await UserModel.findOne({ email });
        if (already) {
            res.json("user already exists");
        } else {
            bcrypt.hash(password, 5, async (err, hashpass) => {
                if (err) {
                    res.json("error while hashing password");
                } else {
                    const user = new UserModel({
                        name, password: hashpass, email, age, gender, phone, role: "admin"
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

adminRouter.post("/login", async (req, res) => {
    const { password, email } = req.body;
    const user = await UserModel.findOne({ email });
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

adminRouter.use(authenticate);

adminRouter.use((req, res, next) => {
    if (req.body.role == "admin") next();
    else res.send("Admins are only allowed to access this page. You are a " + req.body.role);
})

adminRouter.get("/users", async (req, res) => {
    let users = await UserModel.find();
    res.json(users);
});

adminRouter.get("/doctors", async (req, res) => {
    let doctors = await DoctorModel.find();
    res.json(doctors);
});

adminRouter.get("/slots", async (req, res) => {
    let slots = await SlotBookingModel.find();
    res.json(slots);
});

// adminRouter.get("/logout", (req, res) => {
//     console.log("logout successfully");
//     res.json("logout successfully");
// });

adminRouter.patch("/update", async (req, res) => {
    const { email, password } = req.body;
    const data = await UserModel.findOne({ email: email });
    console.log(pass);
    try {
        bcrypt.hash(password, 5, async (err, hashpass) => {
            if (err) {
                res.json(err);
                console.log(err);
            } else {
                let noteData = await UserModel.findByIdAndUpdate(
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

adminRouter.delete("/removeUser/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let user = await UserModel.findOne({ id });
        if (user) {
            await UserModel.findByIdAndDelete({ id });
            res.send("user removed successfully");
        } else {
            res.send("User Doesn't Exists");
        }
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
})



module.exports = { adminRouter };