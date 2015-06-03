var async = require('async');

var concurrency = Number(process.env.CONCURRENCY) || 1;

var queue = async.queue(worker, concurrency);

function worker(what, callback) {
  // mock external service
  console.log('service', what);
  setTimeout(callback, 500, null, 'this is the result');
}

module.exports = function(what, callback) {
  queue.push(what, callback);
};