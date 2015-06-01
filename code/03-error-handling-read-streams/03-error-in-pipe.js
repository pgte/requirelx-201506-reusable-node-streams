var readable = require('./readable');
var writable = require('./writable');

['finish', 'error', 'pipe', 'unpipe'].forEach(function(event) {
  writable.on(event, function() {
    console.log('\nwritable event: ', event);
  });
});

['end', 'error'].forEach(function(event) {
  readable.on(event, function() {
    console.log('\nreadable event: ', event, arguments);
  });
});

readable.pipe(writable);

setTimeout(function() {
  writable.emit('error', new Error('hey'));
}, 2e3);
