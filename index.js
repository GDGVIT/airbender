const bot = require('./bot').connection;

bot.on('speechChange', currentState => {
    console.log(currentState);
});