const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./api/users");
const syndicates = require("./api/syndicate");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const mongourl = require("./config/config").mongoURI;
mongoose
    .connect(mongourl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Use Routes
app.use("/api/users", users);
app.use("/api/syndicates", syndicates);

app.use(express.static(__dirname + "/build"));
app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/build/index.html', function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

const port = require("./config/config").port;
app.listen(port, () => console.log(`Server running on port ${port}`));
