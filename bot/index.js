const Discord = require('discord.js');

const { handleMessage } = require('./message_handler');
const { speechConnection } = require('./speech_event');
const { handleInstruction } = require('./instruction_handler');

const client = new Discord.Client();

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  let msg = handleMessage(message);
  if (!msg.valid) return;
  handleInstruction(msg.instruction, message, speechConnection);  
});

client
    .login(process.env.DISCORD_TOKEN)
    .catch(error => {
        console.error(error);
    });

exports.connection = speechConnection;