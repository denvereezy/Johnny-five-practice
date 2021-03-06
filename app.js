//back end by Denver Daniels (http://www.github.com/denvereezy)
//front end by Ayabonga Qwabi (http://www.github.com/ayabongaqwabi)
var http = require('http');
var express = require('express'),
    app = module.exports.app = express(),
    io = require('socket.io'),
    fs = require('fs'),
    five = require("johnny-five"),
    board, servo, led1, led2, led3, led4, led5, led6, led7, sensor;




var server = http.createServer(app);
var io = require('socket.io').listen(server); //pass a http.Server instance
server.listen(8000);
board = new five.Board();


// handle web server
app.use(express.static('public'));

board.on("ready", function() {
    // two leds sharing one pin for front lights
    var led1 = new five.Led(11),
        //two leds sharing one pin for reverse lights
        led2 = new five.Led(10), //.toggle();
        //neon lights
        led3 = new five.Led(9), //.toggle();
        //front & back indicators
        led4 = new five.Led(8), //.strobe(100);
        led5 = new five.Led(7), //.strobe(100);
        //music lights
        led6 = new five.Led(6), //.strobe(100);
        //music switch
        led7 = new five.Led(5); //.toggle();

    var left_wheel = new five.Servo({
        pin: 12,
        type: 'continuous'
    }).stop();
    var right_wheel = new five.Servo({
        pin: 13,
        type: 'continuous'
    }).stop();


    io.sockets.on('connection', function(socket) {
        socket.on('click5', function() {
            led1.toggle();
        });

        socket.on('click', function() {
            console.log('Forward');
            led2.off();
            left_wheel.ccw();
            right_wheel.cw();
        });

        socket.on('click6', function() {
            console.log('party');
            led6.toggle();

        });

        socket.on('click1', function() {
            console.log('backward');
            led2.on();
            left_wheel.cw();
            right_wheel.ccw();
        });

        socket.on('click2', function() {
            console.log('Left');
            led2.off();
            led4.strobe(200);
            left_wheel.ccw();
            right_wheel.ccw();
        });

        socket.on('click3', function() {
            console.log('Right');
            led2.off();
            led4.off();
            led5.strobe(200);
            left_wheel.cw();
            right_wheel.cw();
        });

        socket.on('click4', function() {
            console.log('stopping');
            led2.off();
            led4.stop();
            left_wheel.stop();
            right_wheel.stop();
        });

        socket.on('click7', function() {
            console.log('neon');
            led3.toggle();
        });

        socket.on('click8', function() {
            console.log('music');
            led7.toggle();
        });

        socket.emit('news', {
            hello: 'world'
        });

        // if led message received
        socket.on('led6', function(data) {
            console.log(data);
            if (board.isReady) {
                led.strobe(data.delay);
            }
        });
    });
});
