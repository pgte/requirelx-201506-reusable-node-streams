# 3. Edge Cases



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


# Encoding on Write Streams

## TLDR;

> always passes in buffers, unless `options.decodeStrings` is `false`, in which case it passes whatever the client passes.


# Encoding on Write Streams

...which means that, if `options.decodeStrings` is `false`, you probably have to:

* check if the encoding is supported by the underlying resource or
* perform your own transcoding



# Error-handling


## 1)

On read streams

What happens if a read stream emits an error?

```js
var Readable = require('stream').Readable;

var readable = new Readable();

readable._read = function() {
  setTimeout(function() {
    readable.push(new Buffer('some buffer'));
  }, 100);
};

['end', 'finish', 'close', 'data', 'error'].forEach(function(event) {
  readable.on(event, function() {
    if (event == 'data') {
      process.stdout.write('D');
    }
    else {
      console.log('\nevent: ', event, arguments);
    }
  });
});

setTimeout(function() {
  readable.emit('error', new Error('hey'));
}, 2e3);
```


It doesn't end the stream.


## 2)

... and on write streams?

```js
var Writable = require('stream').Writable;

var writable = new Writable();

writable._write = function(chunk, encoding, callback) {
  process.stdout.write('W');
  setImmediate(callback);
};

['finish', 'error'].forEach(function(event) {
  writable.on(event, function() {
    console.log('\nevent: ', event, arguments);
  });
});

setInterval(function() {
  writable.write('hey');
}, 100);

setTimeout(function() {
  writable.emit('error', new Error('hey'));
}, 2e3);
```


By default, emitting an error on a write stream makes nothing extraordinary happen.


## 3)

... and on write streams you're piping into?

```js
var readable = require('./readable');
var writable = require('./writable');

['finish', 'error', 'pipe', 'unpipe'].forEach(function(event) {
  writable.on(event, function() {
    console.log('\nwritable event: ', event);
  });
});

['end', 'error'].forEach(function(event) {
  readable.on(event, function() {
    console.log('\nreadable event: ', event, arguments);
  });
});

readable.pipe(writable);

setTimeout(function() {
  writable.emit('error', new Error('hey'));
}, 2e3);
```


> When a writable stream emits an error, all the sources get unpiped.


## 4)

...on a pipe chain:

```js
var readable = require('./readable');
var transform = require('./transform');
var writable = require('./writable');

['finish', 'error', 'pipe', 'unpipe'].forEach(function(event) {
  writable.on(event, function() {
    console.log('\nwritable event: ', event);
  });
});

['finish', 'error', 'pipe', 'unpipe', 'end'].forEach(function(event) {
  transform.on(event, function() {
    console.log('\ntransform event: ', event);
  });
});

['end', 'error'].forEach(function(event) {
  readable.on(event, function() {
    console.log('\nreadable event: ', event, arguments);
  });
});

readable.pipe(transform).pipe(writable);

setTimeout(function() {
  writable.emit('error', new Error('hey'));
}, 2e3);
```


> In case of write stream error, only the pipe right before gets unpiped.

Warning: dangling pipe!


# Piping and Ending


## 1)

Piping to one:

```js
var readable = require('./readable');
var writable = require('./writable');

['finish', 'error', 'pipe', 'unpipe'].forEach(function(event) {
  writable.on(event, function() {
    console.log('\nwritable event: ', event);
  });
});

['end', 'error'].forEach(function(event) {
  readable.on(event, function() {
    console.log('\nreadable event: ', event);
  });
});

readable.pipe(writable);

setTimeout(function() {
  readable.push(null);
}, 2e3);
```


> If a read stream ends, the write stream target also ends.


2)

Prevent target from ending:

```js
var readable = require('./readable');
var writable = require('./writable');

['finish', 'error', 'pipe', 'unpipe'].forEach(function(event) {
  writable.on(event, function() {
    console.log('\nwritable event: ', event);
  });
});

['end', 'error'].forEach(function(event) {
  readable.on(event, function() {
    console.log('\nreadable event: ', event);
  });
});

readable.pipe(writable, {end: false});

setTimeout(function() {
  readable.push(null);
}, 2e3);
```


> `{end: false}` prevents the target from ending.
 
(Also appliable to Transform streams)


## 3)

Piping from many

```js
var Readable = require('./create_readable');
var writable = require('./writable');

var readables = [Readable(), Readable()];

['finish', 'error', 'pipe', 'unpipe'].forEach(function(event) {
  writable.on(event, function() {
    console.log('\nwritable event: ', event);
  });
});

['end', 'error'].forEach(function(event) {
  readables.forEach(function(readable, index) {
    readable.on(event, function() {
      console.log('\nreadable[%d] event: ', index, event);
    });
  });
});

readables.forEach(function(readable) {
  readable.pipe(writable);
});

setTimeout(function() {
  readables[0].push(null);
}, 2e3);
```


WAT happened here?

> first readable ended

>   => writable finished

>   => writable unpiped

>   => second readable paused


## 4)

Piping to many

```js
var readable = require('./readable');
var Writable = require('./create_writable');

var writables = [Writable(), Writable()];

['finish', 'error', 'pipe', 'unpipe'].forEach(function(event) {
  writables.forEach(function(writable, index) {
    writable.on(event, function() {
      console.log('\nwritable[%d] event: ', index, event);
    });
  });
});

['end', 'error'].forEach(function(event) {
  readable.on(event, function() {
    console.log('\nreadable event: ', event);
  });
});

writables.forEach(function(writable) {
  readable.pipe(writable);
});

setTimeout(function() {
  readable.push(null);
}, 2e3);
```


> When piping to many targets, all targets finish after source ends.

Seems legit.
