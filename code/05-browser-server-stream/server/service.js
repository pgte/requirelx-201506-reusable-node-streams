var Transform = require('stream').Transform;

var remoteService = require('./remote-service');

module.exports = function() {
  var service = new Transform({
    objectMode: true
  });

  service._transform = function(chunk, encoding, callback) {
    var id = chunk[0];
    var args = chunk[1];
    remoteService(args, function() {
      var args = Array.prototype.slice.call(arguments);
      callback(null, [id, args]);
    });
  };

  return service;
}