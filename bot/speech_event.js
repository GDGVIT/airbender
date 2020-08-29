const events = require('events');

var speechConnection = new events.EventEmitter();

speechConnection.addListener('speechChange', (user, speaking) => {
    console.log(user);
    console.log(speaking);

    return {
        "user": user,
        "speaking": speaking
    };
});

exports.speechConnection = speechConnection;