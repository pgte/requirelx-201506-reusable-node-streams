# 2. How to Create Streams


# Creating a Read Stream

```js
var Readable = require('stream').Readable;

var readable = new Readable();

readable._read = function() {
  underlyingResource.read(function(err, value) {
    if (err) {
      readable.emit('error', err);
    }
    else {
      readable.push(new Buffer(value, 'utf8')); // null for end
    }
  });  
};
```


## Example

A temperature reader (1/2):

```js
var Readable = require('stream').Readable;
var inherits = require('util').inherits;
var extend = require('util')._extend;
var hardware = require('./hardware');

inherits(Readable, Thermometer);

function Thermometer(options) {
  options = extend({
    objectModel: true
  }, options || {});

  Readable.call(this, options);
  hardware.init();
}
```


```js
Thermometer.prototype._read = function _read() {
  var thermometer = this;

  hardware.doWhatItTakesToReadTheTemperature(function(err, temp) {
    if (err) {
      thermometer.emit('error', err);
    }
    else {
      thermometer.push({
        when: Date.now(),
        value: result,
        units: 'Celcius'
      });
    }
  });
};
```


# Creating a Write Stream

```js
var Writable = require('stream').Writable;

var writable = new Writable();

writable._write = function _write(chunk, encoding, callback) {
  underlyingResource.write(chunk, encoding, callback);
};
```


## Example

A log writer stream to Elastic Search:

```js
var elasticsearch = require('elasticsearch');
var Writable = require('stream').Writable;
var inherits = require('util').inherits;
var extend = require('util')._extend;

inherits(Readable, LogWriter);

function LogWriter(options) {
  options = extend({
    objectMode: true
  }, options || {});
  Readable.call(this, options);

  this._client = new elasticsearch.Client({
    host: options.elasticSearch || 'http://localhost:9200'
  });
}

LogWriter.prototype._write = function(entry, encoding, callback) {
  this._client.insert(this._decorate(entry), callback);
};

LogWriter.prototype._decorate = function(entry) {
  return {
    when: Date.now(),
    what: entry
  };
}
```


## Creating a Duplex Stream

```js
var Duplex = require('stream').Duplex;

var duplex = new Duplex();

duplex._read = function _read() {
  underlyingResource.read(function(err, value) {
    if (err) {
      duplex.emit('error', err);
    }
    else {
      duplex.push(value);
    }
  });  
};

duplex._write = function _write(chunk, encoding, callback) {
  underlyingResource.write(chunk, callback);
};
```


## Creating a Transform Stream

Sync transform:

```js
var Transform = require('stream').Transform:

var transform = new Transform();

transform._transform = function (chunk, encoding, callback) {
  this.push(someTransform(chunk));
  callback();
};
```


## Creating a Transform Stream

Async transform:

```js
var Transform = require('stream').Transform:

var transform = new Transform();

transform._transform = function (chunk, encoding, callback) {
  someAsyncTransform(chunk, function(err, result) {
    transform.push(result);
    callback();
  });
};
```


## Creating a Transform Stream

More succintly:

```js
var Transform = require('stream').Transform:

var transform = new Transform();

transform._transform = function (chunk, encoding, callback) {
  someAsyncTransform(chunk, callback);
};
```


## Creating a Transform Stream

Can transform into more than one output:

```js
var Transform = require('stream').Transform:

var transform = new Transform();

transform._transform = function (chunk, encoding, callback) {
  someOtherAsyncTransform(chunk, function(err, results) {
    results.forEach(function(result) {
      transform.push(result);
    })
    callback();
  });
};
```
