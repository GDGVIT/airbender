function listen(conn) {
    console.log("Joined voice channel successfully");
    // console.log(`Current members: ${conn.channel.members.array()}`);
    
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
    conn.on('speaking', checkSpeakers(user, speaking));
}

function checkSpeakers(user, speaking) {
    console.log("Listening to user: ", user.username);
    console.log("Speaking: ", speaking);
}

exports.listenerFunc = listen;