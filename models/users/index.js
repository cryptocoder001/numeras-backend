/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const UserBasicSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
	},
	account: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	balance: {
		type: Number,
		default: 0,
	}
});

const UserURISchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	}
});

const UserSchema = new Schema();
UserSchema.add(UserBasicSchema).add(UserURISchema);

module.exports = User = mongoose.model("users", UserSchema);
