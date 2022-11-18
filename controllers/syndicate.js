/** @format */

const SyndicateSchema = require("../models/syndicate");

const SyndicateController = {
    create: async (props) => {
        const { name, otherName, service, description, account } = props;

        var syndicate = await SyndicateSchema.findOne({
            $or: [{ name: name }],
        });

        if (syndicate) throw new Error("Syndicate already exist");

        const newSyndicate = new SyndicateSchema({
            name: name,
            otherName: otherName,
            service: service,
            description: description,
            account: account,
        });

        let syndicateData = await newSyndicate.save();

        return syndicateData;
    },
    getAll: async (props) => {
        var syndicate = await SyndicateSchema.find();
        if (syndicate) {
            return syndicate;
        }
    }
};

module.exports = { SyndicateController };
