var readable = require('./readable');
var transform = require('./transform');
var writable = require('./writable');

['finish', 'error', 'pipe', 'unpipe'].forEach(function(event) {
  writable.on(event, function() {
    console.log('\nwritable event: ', event);
  });
});

['finish', 'error', 'pipe', 'unpipe', 'end'].forEach(function(event) {
  transform.on(event, function() {
    console.log('\ntransform event: ', event);
  });
});

['end', 'error'].forEach(function(event) {
  readable.on(event, function() {
    console.log('\nreadable event: ', event, arguments);
  });
});

readable.pipe(transform).pipe(writable);

setTimeout(function() {
  writable.emit('error', new Error('hey'));
}, 2e3);
