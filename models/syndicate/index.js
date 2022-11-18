/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const SyndicateSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
    },
    account: {
        type: String,
        required: true,
    },
    name: {
        type: String
    },
    otherName: {
        type: String
    },
    service: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Syndicate = mongoose.model("syndicates", SyndicateSchema);
