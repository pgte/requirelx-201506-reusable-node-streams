var Readable = require('stream').Readable;

var readable = new Readable();

readable._read = function() {
  setTimeout(function() {
    // if (readable.readable) {
      readable.push(new Buffer('some buffer'));
    // }
  }, 100);
};


['end', 'finish', 'close', 'data', 'error'].forEach(function(event) {
  readable.on(event, function() {
    if (event == 'data') {
      process.stdout.write('D');
    }
    else {
      console.log('\nevent: ', event, arguments);
    }
  });
});

setTimeout(function() {
  readable.emit('error', new Error('hey'));
}, 2e3);
