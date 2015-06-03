![requirelx](images/requirelx.jpg)

# Node Reusable Streams

2015/06/03


https://pgte.github.io/requirelx-201506-reusable-node-streams

http://bit.ly/1FSRPKD


#Hello

```js
$ whoami
{
  "name": "Pedro Teixeira",
  "github": "@pgte",
  "twitter": "@pgte"
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
    + multiple pipe destinations 
  - Example in the browser



![Answer Boy](images/answer-boy.gif)

Please interrupt

I hate talking alone ;)



# -1. Show hands

![Show hands](images/hands.jpg)

Who has:

* Used Node
* Used Node Streams
* App in production using Node streams


# 0. Why streams


# Universal interface

![Lego](images/lego.jpg)


# Fool-proof

![Floating](images/floating.gif)

Flow management (back-pressure) by default.


# Memory-efficient

![NBF](imageS/nbf.png)


# Yet

Paradoxically, Streams are the subject of some confusion and sometimes hard to get right.
