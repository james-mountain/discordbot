const Commando = require("discord.js-commando");
const Util = require("../../util.js");

module.exports = class MakePersonCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name:         "makeperson",
            group:        "project",
            memberName:   "makeperson",
            description:  "Makes a person object.",
            args: [
                {
                    key: "name",
                    label: "name",
                    prompt: "The name you want to assign to the person.",
                    type: "string"
                },
                {
                    key: "age",
                    label: "age",
                    prompt: "The age you want to assign to this particular person.",
                    type: "integer"
                },
                {
                    key: "occu",
                    label: "occu",
                    prompt: "Their occupation.",
                    type: "string"
                }
            ]
        });
    }

    async run(msg, args) {
        Util.makePersonFunc(this.client, args);

        return msg.reply("Created a person object.");
    }
};
