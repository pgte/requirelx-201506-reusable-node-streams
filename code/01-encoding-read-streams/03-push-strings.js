var Readable = require('stream').Readable;

var readable = new Readable();

readable._read = function() {
  this.push('some string');
};

readable.on('data', function(d) {
  console.log(d);
});