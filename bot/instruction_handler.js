const { listenerFunc } = require('./listener');

const handleInstruction = async (instruction, message, speechConnection) => {
    console.log("Instruction received: ", instruction);
    switch (instruction) {
        case 'join':
            if (message.member.voice.channel) {
              const connection = await message.member.voice.channel.join();
              listenerFunc(connection, speechConnection);
            };
            break;

        case 'leave':
            if (message.member.voice.channel) {
              message.member.voice.channel.leave();
            };
            break;

        default: 
            message.reply('Invalid command. For help with usage, try the help command');
    }
}

exports.handleInstruction = handleInstruction;