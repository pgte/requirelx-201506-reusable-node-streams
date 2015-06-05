# 4. Example

Involves browsers and websockets.



# Problem

I have this browser app with many many active clients.

I want to track user activity in the form of log entries.

I don't want to DDOS the servers with this traffic.



Solutions?

![Answer Boy](images/answer-boy.gif)


For instance,

throttle the client (perhaps using `setInterval()`).

What interval to use?


It should be adaptive to server load.


# Solution

Backpressure using streams.



Show me the code


Client


Server