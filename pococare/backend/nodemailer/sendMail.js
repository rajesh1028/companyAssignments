const nodemailer = require("nodemailer");

require("dotenv").config();

const sendEmail = async (data) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'rajesh.masaischool@gmail.com',
            pass: process.env.GOOGLEKEY
        }
    });

    transporter.sendMail({
        to: `${data.email}`,
        from: 'rajesh.masaischool@gmail.com',
        subject: `${data.subject}`,
        html: `${data.body}`,
    })
        .then(() => console.log('mail sent successfully'))
        .catch((err) => console.log("err", err))

}

module.exports = { sendEmail }