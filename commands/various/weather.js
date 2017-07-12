const Commando = require('discord.js-commando');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
    };

    async run(msg, args) {
        let url = "http://api.openweathermap.org/data/2.5/weather?q=" + args.city + "&appid=61e12b8fafc32ee19c827da95371aca8"
        let request = new XMLHttpRequest();
        request.open("GET", url);
        request.responseType = 'json';
        request.send();

        request.onload = function() {
            let data = JSON.parse(request.responseText)

            if (data.error) {
                msg.reply("Could not find city.")
            } else {
                msg.reply("Current weather of " + args.city + " : " + data.weather[0].description)
            }
        }

        return msg.reply("Searching for weather info...")
    }
};
