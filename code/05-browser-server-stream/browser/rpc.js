var Transform = require('stream').Transform;

module.exports = function() {
  var callbacks = {};

  return {
    encode: encode(callbacks),
    decode: decode(callbacks)
  };

};

function encode(callbacks) {
  var id = 0;
  var encode = new Transform({
    objectMode: true,
    highWaterMark: 1
  });

  encode._transform = function(chunk, encoding, callback) {
    var _id = ++ id;
    callbacks[_id] = callback;
    var payload = JSON.stringify([_id, chunk]) + '\n';
    this.push(payload);
  };

  return encode;
}


function decode(callbacks) {
  var decode = new Transform({
    objectMode: true
  });

  decode._transform = function(args, encoding, callback) {
    args = args.toString();
    var id;
    try {
      args = JSON.parse(args);
      var id = args.shift();
    } catch(err) {
      return callback(err);
    }

    var returnCallback = callbacks[id];

    if (returnCallback) {
      delete callbacks[id];
      returnCallback();
    }
    callback();
  };

  return decode;
}
