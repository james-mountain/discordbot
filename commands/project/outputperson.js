const Commando = require("discord.js-commando");
const Util = require("../../util.js");

module.exports = class OutputPersonCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name:         "outputperson",
            group:        "project",
            memberName:   "outputperson",
            description:  "Finds a person object by name.",
            args: [
                {
                    key: "name",
                    label: "name",
                    prompt: "The name you want to assign to the person.",
                    type: "string"
                }
            ]
        });
    }

    async run(msg, args) {
        return msg.reply(Util.findPersonFunc(this.client, args));
    }
};
