var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  // Create a new `ping` hardware instance.
  var ping = new five.Ping(7);

  // ping.in
  //
  // Calculated distance to obstruction in inches
  //

  // ping.cm
  //
  // Calculated distance to obstruction in centimeters
  //

  ping.on("change", function(err, value) {
    console.log("Object is " + this.in + "inches away");
  });
});
