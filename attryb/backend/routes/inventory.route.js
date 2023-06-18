const express = require("express");
const { InventoryModel } = require("../models/inventory.model");

const inventoryRouter = express.Router();

// To fetch all the models in the inventory
inventoryRouter.get("/allcars", async (req, res) => {
    try {
        let models = await InventoryModel.find(req.query);
        res.status(200).send(models);
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
})

// To add a new model to the inventory
inventoryRouter.post("/addcar", async (req, res) => {
    try {
        let obj = req.body;
        const car = new InventoryModel(obj);
        await car.save();
        res.status(201).send({ "message": "car data added successfully" });
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
})

// To edit the model which is already present in the inventory
inventoryRouter.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    const car = await InventoryModel.findOne({ _id: id })
    if (!car) {
        res.status(404).send({ message: "Data not found" })
    } else {
        const userID_in_car = car.userID;
        const userID_making = req.body.userID;

        try {
            if (userID_making !== userID_in_car) {
                res.send({ "msg": "Your not authorized" })
            } else {
                await InventoryModel.findByIdAndUpdate({ _id: id }, payload)
                res.send("Car data has been updated")
            }
        } catch (error) {
            console.log(error);
            res.send({ error })
        }
    }
})

// To delete a model in the inventory
inventoryRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const car = await InventoryModel.findOne({ _id: id })
    if (!car) {
        res.status(404).send({ message: "Data not found" })
    } else {
        const userID_in_car = car.userID;
        const userID_making = req.body.userID;

        try {
            if (userID_making !== userID_in_car) {
                res.send({ "msg": "Your not authorized" })
            } else {
                await InventoryModel.findByIdAndDelete({ _id: id })
                res.send("Car data has been deleted")
            }
        } catch (error) {
            console.log(error);
            res.send({ error })
        }
    }
})

module.exports = { inventoryRouter }

//sample data
// {
//       "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjUg8vI_4LUx3aJkrvyX-864eFEjrLaL3rvofrfMl56nxq_ieQgum1Z5In2K8XsTbTy5A&usqp=CAU",
//       "title": "Tata Harrier",
//       "description": ["test drive available","old bustand","still 2 years insurance left","automatic transmission","fuel diesel"],
//       "kms": "3908",
//       "scratches": 0,
//       "paint": "blue",
//       "accidents": 0,
//       "previousBuyers": 1,
//       "registerPlace": "coimbatore"
//   }
