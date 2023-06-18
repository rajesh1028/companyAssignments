const express = require("express");
const { connection } = require("./configuration/db")
const cors = require("cors");
const { authenticate } = require("./middlewares/authenticate.middleware");
const { inventoryRouter } = require("./routes/inventory.route");
const { oemRouter } = require("./routes/oem.route");
const { userRouter } = require("./routes/user.route");
let PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Home Page");
});

app.use("/user", userRouter);
app.use(authenticate);
app.use("/car", inventoryRouter);
app.use("/oem", oemRouter);


app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Not Connected to DB", error);
    }
    console.log(`Server is running at ${PORT}`);
})