const { listenerFunc } = require('./listener');

const handleInstruction = async (instruction, message, speechConnection) => {
    console.log("Instruction received: ", instruction);
    switch (instruction) {
        case 'join':
            if (message.member.voice.channel) {
              const connection = await message.member.voice.channel.join();
              listenerFunc(connection, speechConnection);
            } else {
              message.reply(
                'I can join whatever voice channel you\'re in. That means you need to join a voice channel first!'
              )
            };
            break;

        case 'leave':
            if (message.member.voice.channel) {
              message.member.voice.channel.leave();
            };
            break;

        default: 
            message.reply('invalid command. For help with usage, try the help command');
    }
}

exports.handleInstruction = handleInstruction;