const Commando = require("discord.js-commando");

module.exports = class SquareCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name:         "sq",
            group:        "project",
            memberName:   "sq",
            description:  "Square a number.",
            args: [
                {
                    key: "number",
                    label: "number",
                    prompt: "The number you would like to square.",
                    type: "integer"
                }
            ]
        });
    }

    async run(msg, args) {
        return msg.reply(args.number * args.number);
    }
};
