const Commando = require("discord.js-commando");
const Util = require("../../util.js");

module.exports = class RollTheDiceCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name:         "rtd",
            group:        "various",
            memberName:   "rollthedice",
            description:  "Roll a dice.",
        });
    }

    async run(msg, args) {
        return msg.reply(Util.rollTheDiceFunc());
    }
};
