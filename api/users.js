/** @format */

const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const ethers = require("ethers");

const { userMiddleware } = require("./middleware");

// Load User Controller
const { UserController } = require("../controllers/users");


router.post("/register", async (req, res) => {
    try {
        const { name, email, msg, signature } = req.body;

        const account = await ethers.utils.verifyMessage(msg, signature);

        const newUserData = {
            email: email,
            name: name,
            account: account,
        }; // Create JWT Payload

        const result = await UserController.create(newUserData);

        var resDoc = result._doc;
        const token = jwt.sign(resDoc, config.secretOrKey, {
            expiresIn: "144h",
        });
        res.status(200).json({ status: true, token: token });
    } catch (err) {
        console.log(err);
        return res.json({ status: false, errors: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const actualAddress = await ethers.utils.verifyMessage(
            req.body.msg,
            req.body.signature
        );
        console.log("actualAddress:",actualAddress)
        const result = await UserController.findWithAddress({ actualAddress });
        var resDoc = result._doc;
        const token = jwt.sign(resDoc, config.secretOrKey, {
            expiresIn: "144h",
        });
        res.status(200).json({ status: true, token: token });
    } catch (err) {
        console.log(err);
        return res.json({ status: false, errors: err.message });
    }
});

router.post("/getUserData", userMiddleware, async (req, res) => {
    const { account } = req.user;
    const userData = await UserController.findWithAddress({
        actualAddress: account,
    });

    var resDoc = userData._doc;

    jwt.sign(
        resDoc,
        config.secretOrKey,
        { expiresIn: "144h" },
        (err, token) => {
            res.json({
                success: true,
                token: token,
            });
        }
    );
});

router.post("/getAllUsers", async (req, res) => {
    var result = await UserController.getAllUser(req.body);

    res.json({
        success: true,
        result: result,
    });
});
module.exports = router;
