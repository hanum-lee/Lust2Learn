//Set up requirements
var express = require("express");

/*----------
SERVER SETUP
-----------*/
//Create an 'express' object
var app = express();
//Set up the views directory
app.set("views", __dirname + '/views');
//Add connection to the public folder for css & js files
app.use(express.static(__dirname + '/public'));

//Set a port value
var port = 3000;
// Start the server & save it to a var
var server = app.listen(port);
//Pass the server var as an arg to the 'io' initialization requirement
var io = require('socket.io')(server);
console.log('Express started on port ' + port);

/*----
ROUTES
-----*/
//Main Page Route
app.get("/", function(req, res){
	res.render('index');
});

//Main Socket Connection
io.on('connection', function (socket) {
 //console.log('a user connected');
	socket.on('drawing', function (data) {
		socket.broadcast.emit('news', data);
		//console.log(data);
  });
});

