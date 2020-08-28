function listen(conn) {
    console.log("Joined voice channel successfully");
    console.log("Play join.mp3");
    dispatcher = conn.play("audio/sound.mp3", { passes: 5 });
    dispatcher.on('start', () => {
        console.log('Play starting');
    });
    dispatcher.on('finish', () => {
        console.log("Finished playing");
    });
    conn.on('error', (error) => console.log(error));
    conn.on('failed', (error) => console.log("Failed: ", error));
    conn.on('speaking', (user, speaking) => {
        console.log(user);
        console.log(speaking);
    });
}


exports.listenerFunc = listen;