const Commando = require("discord.js-commando");
const Util = require("../../util.js");

module.exports = class PokemonCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name:         "pokemon",
            group:        "project",
            memberName:   "pokemon",
            description:  "Calculates the damage type multiplier of pokemon types.",
            args: [
                {
                    key: "atktype",
                    label: "atktype",
                    prompt: "Attack type of the attacking pokemon's move.",
                    type: "string"
                },
                {
                    key: "dmgtype",
                    label: "dmgtype",
                    prompt: "Damage type 1 of the defending pokemon.",
                    type: "string"
                },
                {
                    key: "dmgtype2",
                    label: "dmgtype2",
                    prompt: "Damage type 2 of the defending pokemon (optional)",
                    type: "string",
                    default: "none"
                }
            ]
        });
    }

    async run(msg, args) {
        return msg.reply(Util.pokemonDmgTypesFunc(args) + "x");
    }
};
