const express = require("express");
const { UserModel } = require("../models/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    try {
        let user = await UserModel.find();
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

userRouter.post("/signup", async (req, res) => {
    const { email, password, name } = req.body

    try {
        bcrypt.hash(password, 5, async (err, secure_pwd) => {
            if (err) {
                console.log(err);
                res.send({ message: "Error in registering password" });
            } else {
                const user = new UserModel({ email, password: secure_pwd, name });
                await user.save()
                res.status(201).send({ message: "User has been successfully registered" });
            }
        })

    } catch (error) {
        console.log(error);
        res.send("Error in registering", { "message": error });
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            res.send({ message: "Please signup first" })
        } else {
            const hash_password = user?.password;
            bcrypt.compare(password, hash_password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, process.env.key, { expiresIn: '3h' });
                    const refresh_token = jwt.sign({ userID: user._id }, "R_unlock", { expiresIn: '15h' });
                    res.send({ msg: "Login successfully", token, refresh_token, userID: user._id })
                } else {
                    res.send({ message: "Something went wrong, login failed" })
                }
            })
        }
    } catch (error) {
        res.send({ message: "Error in login the user" })
        console.log(error);
    }
})

module.exports = { userRouter }