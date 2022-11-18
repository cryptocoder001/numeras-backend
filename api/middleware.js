/** @format */

const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { lookupPromise } = require("../utils");

const { UserController } = require("../controllers/users");

function userMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[0];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, config.secretOrKey, (err, user) => {
        console.log("Error: ", err);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = { userMiddleware };
