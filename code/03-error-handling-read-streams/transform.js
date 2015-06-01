var Transform = require('stream').Transform;

var transform = new Transform();

transform._transform = function(chunk, encoding, callback) {
  setImmediate(function() {
    callback(null, chunk);
  });
};

module.exports = transform;
