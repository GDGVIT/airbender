const Discord = require('discord.js');
const listenerFunc = require('./listener').listenerFunc;
const client = new Discord.Client();

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  console.log("Message received: ", msg.content);
  if (msg.author.bot) return;
  if (!msg.content.startsWith(process.env.PREFIX)) return;
  console.log("Message is valid");
  var contents = msg.contents.split(" ");

  if (contents[1] === 'join') {
    if (msg.member.voice.channel) {
      const connection = await msg.member.voice.channel.join();
      listenerFunc(connection);
    }
  } else if (contents[1] === 'leave') {
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
