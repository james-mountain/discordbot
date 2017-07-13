const Commando = require("discord.js-commando");

module.exports = class TestCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name:         "test",
            group:        "testing",
            memberName:   "test",
            description:  "Test."
        });
    }

    async run(msg, args) {
        return msg.reply("test!");
    }
}
