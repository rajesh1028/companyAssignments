const jwt = require("jsonwebtoken");
require("dotenv").config()

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const decoded = jwt.verify(token, process.env.normalkey);
        if (decoded) {
            const userID = decoded.userID;
            req.body.userID = userID;
            req.body.role = decoded.role;
            next();
        } else {
            res.status(401).send("Please login first");
        }
    } else {
        res.status(401).send("Please login first");
    }
}

module.exports = { authenticate }