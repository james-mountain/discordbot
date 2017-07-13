const Commando = require("discord.js-commando");
const Util = require("../../util.js");

module.exports = class CoinMarketCapCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name:         "coinprice",
            group:        "various",
            memberName:   "coinprice",
            description:  "Gets the USD price of a particular cryptocurrency.",
            args: [
                {
                    key: "currency",
                    label: "currency",
                    prompt: "The currency name to get USD price for.",
                    type: "string"
                }
            ]
        });
    }

    async run(msg, args) {
        let req = Util.coinMarketCapPrice(args, function() {
            let data = JSON.parse(req.responseText);

            if (data.error) {
                msg.reply("Could not find coin.");
            } else {
                msg.reply("Current price of " + args.currency + " : $" + data[0].price_usd);
            }
        });

        return msg.reply("Searching for price...");
    }
};
