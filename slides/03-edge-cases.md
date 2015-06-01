# Edge Cases



# Encoding on Read Streams


## 1)

What does the client read if, internally, it pushes buffers?

```js
var Readable = require('stream').Readable;

var readable = new Readable();

readable._read = function() {
  this.push(new Buffer('some buffer'));
};

readable.on('data', function(d) {
  console.log(d);
});
```


Buffers come out.


## 2)

What if the client specifies a different encoding?

```js
var Readable = require('stream').Readable;

var readable = new Readable({encoding: 'hex'});

readable._read = function() {
  this.push(new Buffer('some buffer'));
};

readable.on('data', function(d) {
  console.log(d);
});
```


Encoded strings come out.


## 3)

Read streams:

What does the client read if, internally, it pushes strings?

```js
var Readable = require('stream').Readable;

var readable = new Readable();

readable._read = function() {
  this.push('some string');
};

readable.on('data', function(d) {
  console.log(d);
});
```


If you don't specify a client stream encoding, buffers come out.


## 4)

What if we push strings and the client specifies an encoding?

```js
var Readable = require('stream').Readable;

var readable = new Readable({encoding: 'hex'});

readable._read = function() {
  this.push('some string');
};

readable.on('data', function(d) {
  console.log(d);
});
```


If the client specifies an encoding, strings come out.


## 5)

What does the client read if, internally, it pushes an encoded string and the client specifies another encoding?


## Encoding on Read Streams

### TLDR;

> Whatever is internally pushed, it's always read by the client as buffers, unless otherwise specified in `options.encoding`.



# Encoding on Write Streams

One main question: what is passed into

`stream._write(chunk, encoding, callback)`

?


## 1)

...if I write buffers?

```js
var Writable = require('stream').Writable;

var writable = new Writable();

writable._write = function(chunk, encoding, callback) {
  console.log('chunk: %j (%j)', chunk, encoding);
  callback();
};

writable.write(new Buffer('hello world!'));
```


I get buffers.


## 2)

... if I write strings?

```js
var Writable = require('stream').Writable;

var writable = new Writable();

writable._write = function(chunk, encoding, callback) {
  console.log('chunk: %j (%j)', chunk, encoding);
  callback();
};

writable.write('hello world!');
```


I also get buffers.


## 3)

...if I write strings and specify `options.decodeStrings = false`?

```js
var Writable = require('stream').Writable;

var writable = new Writable({
  decodeStrings: false
});

writable._write = function(chunk, encoding, callback) {
  console.log('chunk: %j (%j)', chunk, encoding);
  callback();
};

writable.write('hello world!', 'hex');
writable.write(new Buffer('beep boop'));
```


I get whatever is written by the client.


# Encoing on Write Streams

## TLDR;

> always passes in buffers, unless `options.decodeStrings` is `false`, in which case it passes whatever the client passes.


# Encoing on Write Streams

...which means that, if `options.decodeStrings` is `false`, you probably have to:

* check if the encoding is supported by the underlying resource or
* perform your own transcoding


# Error-handling



# Piping from many



# Piping to many