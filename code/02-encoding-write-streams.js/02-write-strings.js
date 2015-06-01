var Writable = require('stream').Writable;

var writable = new Writable();

writable._write = function(chunk, encoding, callback) {
  console.log('chunk: %j (%j)', chunk, encoding);
  callback();
};

writable.write('hello world!');