const Commando = require('discord.js-commando');

module.exports = class MakePersonCommand extends Commando.Command {
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
    };

    async run(msg, args) {
        let foundperson = this.client.persons.find(x => x.name === args.name);

        if (foundperson) {
            return msg.reply("Name: " + foundperson.name + " Age: " + foundperson.age + " Occupation: " + foundperson.occupation)
        } else {
            return msg.reply("Could not find: " + args.name)
        }
    }
};
