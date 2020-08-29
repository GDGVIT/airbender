const { EventEmitter } = require('events');
const events = require('events');

class SpeechConnection extends EventEmitter {
    emitObject(event, ...args) {
        this.emit(event, args);
        return args;
    }
}

var speechConnection = new SpeechConnection();
exports.speechConnection = speechConnection;