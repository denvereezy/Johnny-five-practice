// initialize everything, web server, socket.io, filesystem, johnny-five
var express = require('express')
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , five = require("johnny-five"),
  board,servo,led,sensor;

var app = express();
 
board = new five.Board();

// on board ready
board.on("ready", function() {

  var left_wheel  = new five.Servo({ pin:  12, type: 'continuous' }).stop();
  var right_wheel = new five.Servo({ pin: 13, type: 'continuous'  }).stop();

  // init a led on pin 13, strobe every 1000ms
  //led = new five.Led(12).strobe(1000);

  // setup a stanard servo, center at start
  servo = new five.Servo({
    pin:6,
    range: [0,180],
    type: "standard",
    center:true
  });

  // poll this sensor every second
  sensor = new five.Sensor({
    pin: "A0",
    freq: 1000
  });

});

// make web server listen on port 80
var port = process.env.PORT || 8060;		
   //start the server
   var server = app.listen(port, function () {
        var host = server.address().address;
        var port = server.address().port;
     	console.log('Example app listening at http://%s:%s', host, port);

   });


// handle web server
app.use(express.static('public'));

//led on/off
board.on("ready", function() {
  led = new five.Led(10);
 
  io.sockets.on('connection', function (socket) {
    socket.on('click', function () {
      led.toggle();
    });
  }); 
});

//servo
board.on("ready", function() {
 
  io.sockets.on('connection', function (socket) {
    socket.on('up', function () {
      console.log('Forward');
      left_wheel.ccw();
      right_wheel.cw();
    });
  }); 
});

board.on("ready", function() {
  
  io.sockets.on('connection', function (socket) {
    socket.on('down', function () {
      console.log('Backward');
      left_wheel.cw();
      right_wheel.ccw(); 
    });
  }); 
});

board.on("ready", function() {
 
  io.sockets.on('connection', function (socket) {
    socket.on('left', function () {
      console.log('Left');
      left_wheel.ccw();
      right_wheel.ccw(); 
    });
  }); 
});

board.on("ready", function() {

  io.sockets.on('connection', function (socket) {
    socket.on('right', function () {
      console.log('Right');
      left_wheel.cw();
      right_wheel.cw(); 
    });
  }); 
});


// on a socket connection
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
 
  // if board is ready
  if(board.isReady){
    // read in sensor data, pass to browser
    sensor.on("data",function(){
      socket.emit('sensor', { raw: this.raw });
    });
  }

  // if servo message received
  socket.on('servo', function (data) {
    console.log(data);
    if(board.isReady){ servo.to(data.pos);  }
  });
  // if led message received
  socket.on('led', function (data) {
    console.log(data);
     if(board.isReady){    led.strobe(data.delay); } 
  });

});
