const events = require('events');

const emitter = new events.EventEmitter();

emitter.on('event', () => {
  console.log("Event received");
})

emitter.emit('event');