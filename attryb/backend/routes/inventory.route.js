const express = require("express");
const { InventoryModel } = require("../models/inventory.model");

const inventoryRouter = express.Router();
inventoryRouter.use(express.json());

inventoryRouter.get("/", async (req, res) => {
    try {
        let models = await InventoryModel.find(req.query);
        res.send(models);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

inventoryRouter.post("/add", async (req, res) => {
    try {
        
        let obj = req.body;
        const car = new InventoryModelModel(obj);
        await car.save()
        res.send("Added Successfully");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

inventoryRouter.patch("/edit", async (req, res) => {
    try {
        let obj = req.body;
        const car = new InventoryModelModel(obj);
        await car.save()
        res.send("Added Successfully");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

inventoryRouter.patch("/delete", async (req, res) => {
    try {
        let obj = req.body;
        const car = new InventoryModelModel(obj);
        await car.save()
        res.send("Added Successfully");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

module.exports = { inventoryRouter }