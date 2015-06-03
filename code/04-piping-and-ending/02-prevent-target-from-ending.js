var readable = require('./readable');
var writable = require('./writable');

['finish', 'error', 'pipe', 'unpipe'].forEach(function(event) {
  writable.on(event, function() {
    console.log('\nwritable event: ', event);
  });
});

['end', 'error'].forEach(function(event) {
  readable.on(event, function() {
    console.log('\nreadable event: ', event);
  });
});

readable.pipe(writable, {end: false});

setTimeout(function() {
  readable.push(null);
}, 2e3);
