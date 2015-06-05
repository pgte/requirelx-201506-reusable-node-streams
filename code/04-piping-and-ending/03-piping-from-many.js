var Readable = require('./create_readable');
var writable = require('./writable');

var readables = [Readable(), Readable()];

['finish', 'error', 'pipe', 'unpipe'].forEach(function(event) {
  writable.on(event, function() {
    console.log('\nwritable event: ', event);
  });
});

['end', 'error'].forEach(function(event) {
  readables.forEach(function(readable, index) {
    readable.on(event, function() {
      console.log('\nreadable[%d] event: ', index, event);
    });
  });
});

readables.forEach(function(readable) {
  readable.pipe(writable);
});

setTimeout(function() {
  readables[0].push(null);
  setTimeout(function() {
    console.log(process._getActiveHandles());
  }, 1.5e3);
}, 2e3);

