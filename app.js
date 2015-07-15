var http = require('http');
var express = require('express'),
    app = module.exports.app = express()
  , io = require('socket.io')
  , fs = require('fs')
  , five = require("johnny-five"),
  board,servo,led1,led2,led3,led4,led5,led6,led7,sensor;




var server = http.createServer(app);
var io = require('socket.io').listen(server);  //pass a http.Server instance
server.listen(8010);  //
board = new five.Board();

// on board ready
board.on("ready", function() {

  // two leds sharing one pin for front lights
  led1 = new five.Led(11).toggle();
  //two leds sharing one pin for reverse lights
  led2 = new five.Led(10).toggle();
  //neon lights
  led3 = new five.Led(9).toggle();
  //front & back indicators
  led4 = new five.Led(8).strobe(100);
  led5 = new five.Led(7).strobe(100);
  //music lights
  led6 = new five.Led(6).strobe(100);
  //music switch
  led7 = new five.Led(5).toggle();

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



// handle web server
app.use(express.static('public'));

board.on("ready", function() {
 var left_wheel  = new five.Servo({ pin:  12, type: 'continuous' }).stop();
 var right_wheel = new five.Servo({ pin: 13, type: 'continuous'  }).stop();

 
  io.sockets.on('connection', function (socket) {
    socket.on('click', function () {
      console.log('Forward');
      left_wheel.ccw();
      right_wheel.cw();
    });
  }); 
   
   io.sockets.on('connection', function (socket) {
    socket.on('click1', function () {
      console.log('backward');
      left_wheel.cw();
      right_wheel.ccw();
    });
  }); 

 io.sockets.on('connection', function (socket) {
    socket.on('click2', function () {
       console.log('Left');
      left_wheel.ccw();
      right_wheel.ccw();
    });
  }); 

  io.sockets.on('connection', function (socket) {
    socket.on('click3', function () {
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
