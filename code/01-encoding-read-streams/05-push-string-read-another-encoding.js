var Readable = require('stream').Readable;

var readable = new Readable({encoding: 'ascii'});

readable._read = function() {
  this.push('736f6d6520737472696e67', 'hex');
};

readable.on('data', function(d) {
  console.log(d);
});