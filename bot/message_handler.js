function handleMessage(msg) {
    console.log("Message received: ", msg.content);
    let result = {
        "valid": false,
        "instruction": "",
    };

    if (msg.author.bot) return result;

    if (!msg.content.startsWith(process.env.PREFIX)) return result;

    console.log("Message is valid");
    result.valid = true;

    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    result.instruction = command;

    return result;
}

exports.handleMessage = handleMessage;