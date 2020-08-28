const Discord = require('discord.js');
const handleMessage = require('./message_handler').handleMessage;
const client = new Discord.Client();

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => handleMessage(msg));

client
    .login(process.env.DISCORD_TOKEN)
    .catch(error => {
        console.log(error);
    });
