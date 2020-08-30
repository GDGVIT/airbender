const listen = (conn, sc) => {
    console.log("Joined voice channel successfully");
    console.log("Play join.mp3");

    // For the speaking event to fire more than once, 
    // an audio file must be played in the channel
    // see - https://github.com/discordjs/discord.js/issues/3524
    let dispatcher = conn.play("audio/sound.mp3", { passes: 5 });
    dispatcher.on('start', () => {
        console.log('Play starting');
    });
    dispatcher.on('finish', () => {
        console.log("Finished playing");
    });

    conn.on('error', (error) => console.error("Error: ", error));
    conn.on('failed', (error) => console.error("Failed: ", error));
    conn.on('speaking', (user, speaking) => {
        sc.emitObject('speechChange', user, speaking);
    });
}

exports.listenerFunc = listen;