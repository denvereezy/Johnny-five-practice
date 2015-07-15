var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , five = require("johnny-five"),
  board,servo,led,sensor;

board = new five.Board();

// on board ready
board.on("ready", function() {

  // init a led on pin 13, strobe every 1000ms
  led = new five.Led(11).strobe(1000);

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
app.listen(8010);


// handle web server
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

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
