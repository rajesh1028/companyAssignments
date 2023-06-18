const express = require("express")
const { OemModel } = require("../models/oem.model")
const oemRouter = express.Router()

oemRouter.get("/allOem", async (req, res) => {
    try {
        const oemCars = await OemModel.find();
        res.status(200).send(oemCars);
    } catch (error) {
        res.status(404).send({ message: error })
    }
})

oemRouter.post("/addOem", async (req, res) => {
    const obj = req.body;
    try {
        const car = new OemModel(obj);
        await car.save()
        res.status(201).send({ message: "data has been created" })
    } catch (error) {
        res.status(404).send({ message: error })
    }
})

// To edit the model which is already present in the inventory
oemRouter.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    const car = await OemModel.findOne({ _id: id })
    if (!car) {
        res.status(404).send({ message: "Data not found" })
    } else {
        try {
            await OemModel.findByIdAndUpdate({ _id: id }, payload)
            res.send("OEM data has been updated")
        } catch (error) {
            console.log(error);
            res.send({ error })
        }
    }
})

// To delete a model in the inventory
oemRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const car = await OemModel.findOne({ _id: id })
    if (!car) {
        res.status(404).send({ message: "Data not found" })
    } else {
        try {
            await OemModel.findByIdAndDelete({ _id: id })
            res.send("OEM data has been deleted")
        } catch (error) {
            console.log(error);
            res.send({ error })
        }
    }
})

module.exports = { oemRouter }

// sample data
// {
//     "model": "tata harrier",
//     "year": 2019,
//     "price": 850000,
//     "availablecolors": [
//       "blue",
//       "red"
//     ],
//     "mileage": 18,
//     "power": 2500,
//     "maxSpeed": 180
//   }