const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const path = require('path');
const token = require('./auth').token

const client = new Commando.Client({
    owner: '334612943230599168'
});

client.on('ready', () => {
  console.log('Bot is ready.');
});

client.registry
    .registerGroups([
        ["testing", "Test Commands"]
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(token);
