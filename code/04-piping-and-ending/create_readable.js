var Readable = require('stream').Readable;

function createReadable() {
  var readable = new Readable();

  readable._read = function() {
    setTimeout(function() {
      if (readable.readable) {
        readable.push(new Buffer('some buffer'));
      }
    }, 100);
  };

  return readable;
}

module.exports = createReadable;
