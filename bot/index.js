const Discord = require('discord.js');

const { handleMessage } = require('./message_handler');
const { speechConnection } = require('./speech_event');
const { handleInstruction } = require('./instruction_handler');
const { updateUsers } = require('./users_info');
const { gracefullyExit } = require('./exit_handler');

const env = require('../env.json');

const client = new Discord.Client();
channelCurrentMembers = new Set();

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  let msg = handleMessage(message);
  if (!msg.valid) return;
  handleInstruction(msg.instruction, message, speechConnection, channelCurrentMembers);  
});

client.on('voiceStateUpdate', (oldState, newState) => {
  updateUsers(oldState, newState, channelCurrentMembers, client.user.id);
  speechConnection.emitObject('voiceStateUpdate', channelCurrentMembers);
});

client
    .login(env.DISCORD_TOKEN)
    .catch(error => {
        console.error(error);
    });

// Handle graceful exit -
process.once('exit', () => gracefullyExit({cleanup: true}, client));
process.once('SIGINT', () => gracefullyExit({cleanup: true}, client));


exports.connection = speechConnection;
exports.memberList = channelCurrentMembers;