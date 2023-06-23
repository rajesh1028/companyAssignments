const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../middlewares/authenticate.middleware");
require("dotenv").config();

const { UserModel } = require("../models/user.model");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    try {
        const { name, password, email, age, gender, phone } = req.body;
        const already = await UserModel.findOne({ email });
        if (already) {
            res.json("user already exists");
        } else {
            bcrypt.hash(password, 5, async (err, hashpass) => {
                if (err) {
                    console.log(err);
                    res.json("error while hashing password");
                } else {
                    const user = new UserModel({
                        name, password: hashpass, email, age, gender, phone, role: "user"
                    });
                    await user.save();
                    res.json({ msg: "registration successfull" });
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
//     "name": "rajesh",
//     "email": "rajesh@gmail.com",
//     "password": "rajesh",
//     "age": 21,
//     "gender": "male",
//     "phone": "1234567890"
//   }

userRouter.post("/login", async (req, res) => {
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
                        email,
                        normaltoken
                    });
                } else {
                    res.json({ msg: "wrong credentials" });
                }
            }
        });
    }
});

userRouter.use(authenticate);

userRouter.get("/", async (req, res) => {
    let users = await UserModel.find();
    res.json(users);
});

userRouter.patch("/update", async (req, res) => {

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

module.exports = { userRouter };
