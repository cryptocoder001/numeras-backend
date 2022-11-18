/** @format */

const express = require("express");
const router = express.Router();
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const ethers = require("ethers");


// Load User Controller
const { SyndicateController } = require("../controllers/syndicate");


router.post("/create", async (req, res) => {
    try {
        const { account, name, otherName, service, description } = req.body;


        const newBasicData = {
            account: account,
            name: name,
            otherName: otherName,
            service: service,
            description: description
        };
        const result = await SyndicateController.create(newBasicData);
        res.status(200).json({ status: true, result: result });
    } catch (err) {
        console.log(err);
        return res.json({ status: false, errors: err.message });
    }
});

router.post("/get-all", async (req, res) => {
    try {
        const result = await SyndicateController.getAll();
        res.status(200).json({ status: true, result: result });
    } catch (err) {
        console.log(err);
        return res.json({ status: false, errors: err.message });
    }
})

module.exports = router;
