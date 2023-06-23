const express = require('express');
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const { authenticate } = require("./middlewares/authenticate.middleware");
const { adminRouter } = require("./routes/admin.route");
const { doctorRouter } = require("./routes/doctor.route");
const { sendEmail } = require("./nodemailer/sendMail");
const PORT = 8800;

const cors = require("cors");

require("dotenv").config();


const app = express();
// const bodyParser = require('body-parser');
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require('uuid');
const { Socket } = require('socket.io');

app.set('view engine', 'ejs');
app.use(express.static('public'));
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ "msg": "Welcome to appointment booking app" });
});

app.get('/videocall', (req, res) => {
    res.redirect(`/videocall/${uuidV4()}`);
});

app.get("/videocall/:room", (req, res) => {
    res.render('room', { roomId: req.params.room });
});

app.post("/email", async (req, res) => {
    const { email } = req.body;
    console.log(req.body);
    try {
        sendEmail({
            email: email, subject: "Slot Confirmation: ", body: `
            Your slot has been confirmed successfully`
        });

        res.send({ "message": "EMAIL sent" })
    }
    catch (err) {
        res.send({ "message": "error" })
    }
})

app.use("/user", userRouter);
app.use("/doctor", doctorRouter);
app.use("/admin", adminRouter);

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).emit('user-connected', userId)

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId)
        })
    })
})


server.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        console.log("Not Connected to Database");
        console.log(error);
    }
    console.log(`Listening on ${PORT}`);
})

