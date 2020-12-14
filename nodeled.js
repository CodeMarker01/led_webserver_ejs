var express = require('express'); 
var app = express();
var path = require('path');
var gpio = require('rpi-gpio');
var led = 37;
// const Gpio = require('onoff').Gpio;
// const led = new Gpio(26, 'out');

gpio.setup(led, gpio.DIR_OUT);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));
app.get('/', function(req, res){ 
            res.render('index',{status:"Press Button To change Status of Led !!"});
});
app.post('/led/on', function(req, res){
gpio.write(led, 1, function(err) {
    
        if (err) throw err;
        console.log('Written True to pin '+ led);
        console.log(path.join(__dirname, 'public'));
        return res.render('index', {status: "Led is On"});
    });
});
app.post('/led/off', function(req, res){
gpio.write(led, 0, function(err) {
        if (err) throw err;
        console.log('Written False to pin '+ led);
            console.log(path.join(__dirname, 'public'));
            return res.render('index',{status: "Led is Off"});
    });
});
app.listen(4000, function () {
  console.log('Simple LED Control Server Started on Port: 4000!')
})

