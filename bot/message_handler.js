const listenerFunc = require('./listener').listenerFunc;

async function handleMessage(msg) {
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
}

exports.handleMessage = handleMessage;