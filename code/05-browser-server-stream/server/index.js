var join = require('path').join;
var express = require('express');

var app = express();

app.use(express.static(join(__dirname, '..', 'public')));

var server = app.listen(3000, function() {
  console.log('HTTP server litening on %j', server.address());
});

require('./websocket-server')(server);