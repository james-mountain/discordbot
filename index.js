const Discord = require("discord.js");
const Commando = require("discord.js-commando");
const path = require("path");
const token = require("./auth").token
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require("fs");

const client = new Commando.Client({
    owner: "334612943230599168"
});

client.on("ready", () => {
    client.guilds.first().defaultChannel.send("I, DiscordBot, have joined the server! Ready to take commands.")
});

client.persons = [];
client.typenames = [
    "normal",
    "steel",
    "rock",
    "fire",
    "fairy",
    "bug",
    "dragon",
    "electric",
    "dark",
    "fighting",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "poison",
    "psychic",
    "water"
];
client.typemultipliers = [];

let reqs = [];
function loadTypesFromFile() {
    let typn = client.typenames

    for (let i = 0; i < typn.length; i++) {
        var url = "./typedata/" + typn[i] + ".json";

        let data = JSON.parse(fs.readFileSync(url, 'utf8'));

        var currepdmgrels = data.damage_relations;
        client.typemultipliers[i] = Array(typn.length).fill(1);

        currepdmgrels.half_damage_to.forEach(function(typ) {
            client.typemultipliers[i][typn.findIndex((v) => v === typ.name)] = 0.5;
        })

        currepdmgrels.no_damage_to.forEach(function(typ) {
            client.typemultipliers[i][typn.findIndex((v) => v === typ.name)] = 0;
        })

        currepdmgrels.double_damage_to.forEach(function(typ) {
            client.typemultipliers[i][typn.findIndex((v) => v === typ.name)] = 2;
        })
    }
}
loadTypesFromFile();

client.registry
    .registerGroups([
        ["testing", "Test Commands"],
        ["project", "Project Commands"],
        ["various", "Various Commands"]
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(token);
