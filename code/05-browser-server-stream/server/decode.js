var Transform = require('stream').Transform;

module.exports = function() {
  var decode = new Transform({
    objectMode: true
  });

  decode._transform = function(chunk, encoding, callback) {
    chunk = chunk.toString();
    var err;
    try {
      chunk = JSON.parse(chunk);
    } catch(_err) {
      err = _err;
    }

    callback(err, !err && chunk);
  };

  return decode;
}