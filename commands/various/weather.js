const Commando = require("discord.js-commando");
const Util = require("../../util.js");

module.exports = class WeatherCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name:         "weather",
            group:        "various",
            memberName:   "weather",
            description:  "Gets a weather description of a particular city.",
            args: [
                {
                    key: "city",
                    label: "city",
                    prompt: "The city to get the weather information about.",
                    type: "string"
                }
            ]
        });
    }

    async run(msg, args) {
        let req = Util.weatherFunc(args, function() {
            let data = JSON.parse(req.responseText);

            if (data.error) {
                msg.reply("Could not find city.");
            } else {
                msg.reply("Current weather of " + args.city + " : " + data.weather[0].description);
            }
        });

        return msg.reply("Searching for weather info...");
    }
};
