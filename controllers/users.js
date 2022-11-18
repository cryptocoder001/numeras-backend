/** @format */

const UserSchema = require("../models/users/index");

const UserController = {
    create: async (props) => {
        const { email, name, account } = props;

        var user = await UserSchema.findOne({
            $or: [{ account: account }, { name: name }],
        });

        if (user) throw new Error("Account already exist. Please log In");

        const newUser = new UserSchema({
            email: email,
            name: name,
            account: account,
        });

        let userData = await newUser.save();

        return userData;
    },

    updateBalance: async (props) => {
        const { account, amount } = props;
        var user = await UserSchema.findOne({
            account: account,
        });

        user.balance = Number(user.balance) + Number(amount);
        if (user.balance < 0) {
            let error = new Error("Insufficient balance");
            throw error;
        }
        const userData = await user.save();

        return userData;
    },

    updateAllowance: async (props) => {
        const { account, gamePoolAddress, amount } = props;
        var user = await UserSchema.findOne({
            account: account,
        });

        var gameAllowance = await user.allowances.find(
            (allowance) => allowance.gamePoolAddress == gamePoolAddress
        );

        // no data
        if (gameAllowance == undefined) {
            var newAllowance = {
                gamePoolAddress: gamePoolAddress,
                amount: amount,
            };

            user.allowances.push(newAllowance);
        } else {
            gameAllowance.amount = amount;
            await gameAllowance.save({ suppressWarning: true });
        }

        await user.save();
        return user;
    },

    findWithAddress: async (props) => {
        const { actualAddress } = props;

        const user = await UserSchema.findOne({ account: actualAddress });
        if (!user) throw new Error("Account not found");

        return user;
    },

    getAllUser: async (req, res) => {
        const { flag } = req;
        if (flag === 0) {
            const result = UserSchema.aggregate([
                {
                    $count: "account",
                },
            ]);
            if (!result) throw new Error("Database Error");

            return result;
        } else if (flag === 1) {
            const result = UserSchema.find();
            if (!result) throw new Error("Database Error");

            return result;
        }
    },
};

module.exports = { UserController };
