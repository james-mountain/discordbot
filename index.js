const Discord = require("discord.js");
const Commando = require("discord.js-commando");
const path = require("path");
const token = require("./auth").token;
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const util = require("./util.js"); //Loads it

const client = new Commando.Client({
    owner: "334612943230599168"
});

client.on("ready", () => {
    client.guilds.first().defaultChannel.send("I, DiscordBot, have joined the server! Ready to take commands.");
});

client.persons = [];

client.registry
    .registerGroups([
        ["testing", "Test Commands"],
        ["project", "Project Commands"],
        ["various", "Various Commands"]
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, "commands"));

client.login(token);
