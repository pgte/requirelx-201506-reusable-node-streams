var Transform = require('stream').Transform;

module.exports = function() {
  var encode = new Transform({
    objectMode: true
  });

  encode._transform = function(chunk, encoding, callback) {
    console.log('encoding', chunk);
    callback(null, JSON.stringify(chunk) + '\n');
  };

  return encode;
}