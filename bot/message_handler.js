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

    var contents = msg.contents.split(" ");
    result.instruction = contents[1];

    return result;
}

exports.handleMessage = handleMessage;