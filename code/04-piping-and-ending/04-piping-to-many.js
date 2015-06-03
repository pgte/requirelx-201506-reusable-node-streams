var readable = require('./readable');
var Writable = require('./create_writable');

var writables = [Writable(), Writable()];

['finish', 'error', 'pipe', 'unpipe'].forEach(function(event) {
  writables.forEach(function(writable, index) {
    writable.on(event, function() {
      console.log('\nwritable[%d] event: ', index, event);
    });
  });
});

['end', 'error'].forEach(function(event) {
  readable.on(event, function() {
    console.log('\nreadable event: ', event);
  });
});

writables.forEach(function(writable) {
  readable.pipe(writable);
});


setTimeout(function() {
  readable.push(null);
}, 2e3);
