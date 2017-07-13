const Commando = require("discord.js-commando");

function procinput(input) {
    if (input % 3 === 0) {
        return input / 3;
    } else if (input % 3 === 1) {
        return input - 1;
    } else if (input % 3 === 2) {
        return input + 1;
    }
}

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
        let input = args.number;
        let buildString = input + ", ";
        while (input !== 1) {
            input = procinput(input)
            buildString += input;
            if (input !== 1) {
                buildString += ", ";
            }
        }

        return msg.reply(buildString);
    }
};
