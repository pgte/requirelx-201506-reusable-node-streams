var websocket = require('websocket-stream');
var split = require('split2');
var decode = require('./decode');
var service = require('./service');
var encode = require('./encode');

module.exports = function(server) {
  var wss = websocket.createServer(
    {server: server}, handleWebsocket);

  function handleWebsocket(websocket) {
    console.log('got websocket');
    websocket
      .pipe(split())
      .pipe(decode())
      .pipe(service())
      .pipe(encode())
      .pipe(websocket);
  }
};
