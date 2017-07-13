const Commando = require("discord.js-commando");
const Util = require("../../util.js")

module.exports = class FizzBuzzCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name:         "fizzbuzz",
            group:        "project",
            memberName:   "fizzbuzz",
            description:  "Replaces multiples of 3 and 5 with a word in sequence of numbers.",
            args: [
                {
                    key: "number",
                    label: "number",
                    prompt: "The number you would like to perform fizz buzz up to.",
                    type: "integer"
                },
                {
                    key: "fizz",
                    label: "fizz",
                    prompt: "The word you'd like to replace multiples of 3 with.",
                    type: "string"
                },
                {
                    key: "buzz",
                    label: "buzz",
                    prompt: "The word you'd like to replace multiples of 5 with.",
                    type: "string"
                }
            ]
        });
    }

    async run(msg, args) {
        return msg.reply(Util.getFizzBuzzString(args));
    }
};
