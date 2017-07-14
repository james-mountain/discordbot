const Commando = require("discord.js-commando");
const Util = require("../../util.js");

module.exports = class CoinMarketCapCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name:         "findking",
            group:        "project",
            memberName:   "findking",
            description:  "Find a british king by name.",
            args: [
                {
                    key: "king",
                    label: "king",
                    prompt: "The british king to search for.",
                    type: "string",
                    argsSingleQuotes: true
                }
            ]
        });
    }

    async run(msg, args) {
        let req = Util.kingGetInfo(args, function() {
            if (!req.king) {
                msg.reply("Could not find king. (Use single quotes for kings/queens with spaces in their name.)");
            } else {
                msg.reply("King Name: " + req.king.nm + " Country: " + req.king.cty + " House: " + req.king.hse + " Years: " + req.king.yrs);
            }
        });

        return msg.reply("Searching for king...");
    }
};
