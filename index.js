const bot = require('./bot').connection;
const { memberList } = require('./bot');

// To get the current users in channel at any point, do:
console.log("Users currently in channel: ", memberList);

// To get speech change info, listen to this event:
bot.on('speechChange', ([user, speaking]) => {
    console.log(user, speaking);
});

// To get info on users in channel, listen to this event (updates memberList whenever users enter/leave channel)
bot.on('voiceStateUpdate', memberList => {
    console.log("Channel members: ", memberList);
    
    for (var it=memberList[0].values(), val = null; val=it.next().value; ) {
        console.log(val);
    } 
})