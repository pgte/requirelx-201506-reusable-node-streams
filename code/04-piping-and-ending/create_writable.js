var Writable = require('stream').Writable;

function createWritable() {
  var writable = new Writable();

  writable._write = function(chunk, encoding, callback) {
    process.stdout.write('W');
    setImmediate(callback);
  };

  return writable;
}

module.exports = createWritable;
