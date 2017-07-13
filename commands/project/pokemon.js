const Commando = require("discord.js-commando");

module.exports = class PokemonCommando extends Commando.Command {
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
        let typm = this.client.typemultipliers;
        let typna = this.client.typenames;

        function getMultiAttackDmgIndex(atktype, deftype) {
            return typm[typna.findIndex((v) => v === atktype)][typna.findIndex((v) => v === deftype)];
        }

        let multi = getMultiAttackDmgIndex(args.atktype, args.dmgtype);
        if (args.dmgtype2 !== "none") {
            multi *= getMultiAttackDmgIndex(args.atktype, args.dmgtype2);
        }

        return msg.reply(multi + "x");
    }
};
