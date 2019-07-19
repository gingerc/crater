//server side code
var express = require('express');   //require access to express framework and store that into a variable

var app = express();   //store the result of that in a variable called app

var port = process.env.PORT || 8000;
var server = require('http').createServer(app).listen(port, function() {
  console.log('Server is listening at port: ', port);
});
var io = require('socket.io').listen(server);

app.use(express.static('public'));


// var server = app.listen(8000);
//
// console.log("My socket server is running");
//
// var socket = require('socket.io');   //require socket.io, import the library and the library exists as a function
//
// var io = socket(server);  //call the function with the server listed on port 3000

//when a new client connects
io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('a new client connected' + socket.id);
  //2.when the server receives "new message", do mouseMsg();
  socket.on('new message', sendMsg);
  //b2.when the server receives "notif", do sendNotif();
  socket.on('notif', sendNotif);


  function sendMsg(data) {
    //3.send "new message" to all clients excluding current one
    socket.broadcast.emit('new message', data);
  //  socket.broadcast.emit('mouse', data);
  //  socket.broadcast.emit('unity', "Hello World!");
  //  socket.emit('unity', "Hello World!");
    //console.log(data);
  }

  function sendNotif(data) {
    //b3.send "notif" to all clients excluding current one
    socket.broadcast.emit('notif', data);
  }


}
