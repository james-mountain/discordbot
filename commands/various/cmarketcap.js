const Commando = require("discord.js-commando");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
        let url = "https://api.coinmarketcap.com/v1/ticker/" + args.currency + "/";
        let request = new XMLHttpRequest();
        request.open("GET", url);
        request.responseType = "json";
        request.send();

        request.onload = function() {
            let data = JSON.parse(request.responseText);

            if (data.error) {
                msg.reply("Could not find coin.");
            } else {
                msg.reply("Current price of " + args.currency + " : $" + data[0].price_usd);
            }
        }

        return msg.reply("Searching for price...");
    }
};
