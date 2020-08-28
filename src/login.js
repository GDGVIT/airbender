const Discord = require('discord.js');
const { resolve, join } = require('path');
const { isConstTypeReference, isConstructorDeclaration } = require('typescript');
const client = new Discord.Client();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  var guild = client.guilds.fetch(747434513860263993).catch(e => console.log(e));
  var vc = guild.channels.find(c => c.type === 'voice');
  vc.join().then(conn => {
    console.log("Joined voice channel successfully");
    console.log(`Current members: ${conn.channel.members.array()}`);

    const reciever = conn.reciever;
    console.log("Play join.mp3");
    dispatcher = conn.playFile("audio/sound.mp3", { passes: 5 });
    dispatcher.on('start', () => {
      console.log('Play starting');
    });
    dispatcher.on('end', () => {
      console.log("Finished playing");
    });
    conn.on('error', (error) => console.log(error));
    conn.on('failed', (error) => console.log("Failed: ", error));
    conn.on('speaking', (user, speaking) => {
          // console.log("Speaking: ", speaking);
          console.log("Listening to user: ", user.username);
          console.log("Speaking: ", speaking);

          const audiosteam = reciever.createStream(user, { mode: 'pcm' });
    });
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
