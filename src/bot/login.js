const Discord = require('discord.js');
const listenerFunc = require('./listener.js')
const { resolve, join } = require('path');
const { isConstTypeReference, isConstructorDeclaration } = require('typescript');
const client = new Discord.Client();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// client.on('guildMemberSpeaking', function(member, speaking) {
//   console.log(member.tag, "is speaking?", speaking);
// })

client.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(process.env.PREFIX)) return;
  if (Discord.Message.member.voice.channel) {
    const connection = await msg.member.voice.channel.join();
    listenerFunc(connection);
  }
});

client
    .login(process.env.DISCORD_TOKEN)
    .catch(error => {
        console.log(error);
    });
