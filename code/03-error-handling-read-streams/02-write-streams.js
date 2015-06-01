var Writable = require('stream').Writable;

var writable = new Writable();

writable._write = function(chunk, encoding, callback) {
  process.stdout.write('W');
  setImmediate(callback);
};


['finish', 'error'].forEach(function(event) {
  writable.on(event, function() {
    console.log('\nevent: ', event, arguments);
  });
});

setInterval(function() {
  writable.write('hey');
}, 100);

setTimeout(function() {
  writable.emit('error', new Error('hey'));
}, 2e3);
