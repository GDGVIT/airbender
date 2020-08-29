const Discord = require('discord.js');

const handleMessage = require('./message_handler').handleMessage;
const listenerFunc = require('./listener').listenerFunc;
var speechConnection = require('./speech_event').speechConnection;

const client = new Discord.Client();

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  let msg = handleMessage(message);
  if (!msg.valid) return;

  if (msg.instruction === 'join') {
    if (msg.member.voice.channel) {
      const connection = await msg.member.voice.channel.join();
      listenerFunc(connection, speechConnection);
    }
  } else if (msg.instruction === 'leave') {
      if (msg.member.voice.channel) {
          msg.member.voice.channel.leave();
    }
  }
});

client
    .login(process.env.DISCORD_TOKEN)
    .catch(error => {
        console.log(error);
    });

exports.connection = speechConnection;