const express = require("express");
const { connection } = require("./configs/db")
const cors = require("cors");
const { authenticate } = require("./middlewares/authenticate.middleware");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home Page");
})

app.use(authenticate);

app.get("/home", (req, res) => {
    res.send("protected route");
})



app.listen(8800, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running at ${8800}`);
})