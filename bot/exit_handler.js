const gracefullyExit = (options, client) => {
    console.log("Exiting gracefully...");
    if (options.cleanup) {
        client.voice.connections.forEach((conn) => {
            conn.disconnect();
        });
    }
    return process.exit(0);
}

exports.gracefullyExit = gracefullyExit;
