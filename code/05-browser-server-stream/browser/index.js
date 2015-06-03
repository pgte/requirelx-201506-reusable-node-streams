var Websocket = require('websocket-stream');
var Source = require('./source');
var RPC = require('./rpc');
var split = require('split2');

var rpc = RPC();

Source()
  .pipe(rpc.encode)
  .pipe(Websocket('ws://localhost:3000'))
  .pipe(split())
  .pipe(rpc.decode);
