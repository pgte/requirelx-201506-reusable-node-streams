var Readable = require('stream').Readable;

function createReadable() {
  var readable = new Readable({
    highWaterMark: 1
  });

  readable._read = function() {
    console.log('_read');
    setTimeout(function() {
      if (readable.readable) {
        readable.push(new Buffer('some buffer'));
      }
    }, 100);
  };

  return readable;
}

module.exports = createReadable;
