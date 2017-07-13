const Commando = require("discord.js-commando");
const Util = require("../../util.js");

module.exports = class GetToOneCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name:         "gettoone",
            group:        "project",
            memberName:   "getone",
            description:  "Get to one by doing division, addition and subtraction.",
            args: [
                {
                    key: "number",
                    label: "number",
                    prompt: "The number you would like to take to one.",
                    type: "integer"
                }
            ]
        });
    }

    async run(msg, args) {
        return msg.reply(Util.getGetToOneString(args));
    }
};
