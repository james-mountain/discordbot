const Commando = require("discord.js-commando");

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
        let buildString = "";
        for (let i = 1; i <= args.number; i++) {
            if (i % 3 === 0) {
                buildString += args.fizz;
            }
            if (i % 5 === 0) {
                buildString += args.buzz;
            }
            if (i % 3 !== 0 && i % 5 !== 0) {
                buildString += i;
            }

            buildString += " | ";
        }

        return msg.reply(buildString);
    }
};
