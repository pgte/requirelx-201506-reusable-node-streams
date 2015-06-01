## require('lx')

# Node Reusable Streams

2015/06/03


https://pgte.github.io/requirelx-201506-reusable-node-streams


#Hello

```js
$ whoami
{
  "name": "Pedro Teixeira",
  "github": "@pgte",
  "twitter": "@pgte",
  "programming since": 1985,
  "profesh programming since": 1997,
  "using node since": "v0.1 (late 2009)",
  "profesh using node since": "v0.2 (2011)",
  "lives at": "Funchal",
  "job": "Partner and Director at YLD! (http://yld.io)",
  "works at": ["Home", "London", "Lisbon", "Internets"],
  "creator of", ["Node Tuts", "LXJS"],
  "published books about node": 10,
  "published NPM modules": 72
}
```


# Node Patterns Books

![Node Patterns Books](images/node-patterns.png)

http://nodepatternsbooks.com


# Why this presentation

* Node != Express
* Streams are awesome
* Streams are source of much confusion
* Streams are not used enough


# Agenda

* 1st part: Slides
  - Why streams 
  - Node Streams 101
* 2nd Part: Code
  - Creating a stream
  - Back-pressure
  - Edge cases
    + Encoding transformations in pipes
    + Error Handling
    + multiple destinations 
  - Example in the browser




# Why streams


# Universal interface

![Lego](images/lego.jpg)


# Fool-proof

![Floating](images/floating.gif)

Flow management (back-pressure) by default.


# Memory-efficient

![NBF](imageS/nbf.png)


# Yet

Paradoxically, Streams are the subject of some confusion and sometimes hard to get right.
