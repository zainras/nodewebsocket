var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');
 
server.listen(6001);
io.on('connection', function (socket) {
 
  console.log("new client connected");
  var redisClient = redis.createClient();

  redisClient.subscribe('server_status');
  redisClient.on("message", function(channel, message) {
    console.log("new message in queue "+ channel);
    socket.emit(channel, message);
  });
});