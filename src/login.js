const Discord = require('discord.js');
const { resolve } = require('path');
const client = new Discord.Client();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  var guild = client.guilds.find(guild => guild.name == process.env.GUILD)
  var vc = guild.channels.find(c => c.type === 'voice');
  vc.join().then(connection => {
    console.log("Joined voice channel successfully");
    
    client.on('guildMemberSpeaking', function(member, speaking) {
      console.log(member.tag, speaking)
    })
  }).catch(e => console.log(e));
});

// client.on('guildMemberSpeaking', function(member, speaking) {
//   console.log(member.tag, "is speaking?", speaking);
// })

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client
    .login(process.env.DISCORD_TOKEN)
    .catch(error => {
        console.log(error);
    });
