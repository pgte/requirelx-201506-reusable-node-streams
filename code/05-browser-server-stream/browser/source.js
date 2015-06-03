var Readable = require('stream').Readable;

module.exports = function() {
  var source = new Readable({
    objectMode: true,
    highWaterMark: 1
  });

  source._read = function() {
    // mock log entries
    var entry = {when: Date.now(), what: "some log string"};
    source.push(entry);
    console.log('pushed', entry);
  };

  return source;
}