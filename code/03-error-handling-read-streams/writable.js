var Writable = require('stream').Writable;

var writable = new Writable();

writable._write = function(chunk, encoding, callback) {
  process.stdout.write('W');
  setImmediate(callback);
};

module.exports = writable;
