
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const uuidv4 = require('uuid/v4')
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*----
ROUTES
-----*/
//Main Page Route
app.get("/", function(req, res){
	res.render('index');
});

// Account login
app.post('/login',function (req, res) {
	var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'tablefordays471',
		database: 'mysql'
	});

	con.connect(function(err) {
		if (err) throw err;
		let sql = "SELECT * FROM user_info WHERE username = ? AND password = ?";
		let username = req.body.userID;
		let password = req.body.userPassword;
		con.query(sql, [username, password], function (err, result) {
			if (err) throw err;
			else res.send(result);
		});
	});
});

// Creating new account
app.post('/createUser',function(req,res){
	var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'tablefordays471',
		database: 'mysql'
	});

	con.connect(function(err) {
		let sql = "INSERT INTO user_info (id, email, username, password) VALUES (?,?,?,?)";
		const uniqueID = uuidv4();
		let email = req.body.userEmail;
		let username = req.body.userID;
		let password = req.body.userPassword;
		con.query(sql, [uniqueID, email, username, password], function (err, result) {
			if (err){
				if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){
					res.send("Duplicate entry");
				}
			}
			else res.send(result);
		});
	});
});

// Create new lobby
app.post('/createLobby', function(req, res) {
	var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'tablefordays471',
		database: 'mysql'
	});
});

	con.connect(function(err) {
		if (err) throw err;
		let sql = "INSERT INTO lobbies (ID, Name, Password) VALUES (?,?,?)";
		const uniqueID = uuidv4();
		let name = req.body.lobbyID;
		let password = req.body.lobbyPassword;
		con.query(sql, [uniqueID, name, password], function (err, result) {
			if (err) {
					if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062) {
							res.send("Duplicate entry");
					}
			}
			else res.send(result);
		});
	});

// Join lobby
app.post('/joinLobby', function(req, res) {
	var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'tablefordays471',
		database: 'mysql'
	});
});

	con.connect(function(err) {
		if (err) throw err;
		let sql = "SELECT * FROM lobbies WHERE Name = ? AND Password = ?";
		let name = req.body.lobbyID;
		let password = req.body.lobbyPassword;
		con.query(sql, [name, password], function (err, result) {
			if (err) {
				res.send("Not exists");
			}
			else res.send(result);
		});
	});

// Change username
app.post('/updateUsername',function (req, res) {
	var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'tablefordays471',
		database: 'mysql'
	});

	con.connect(function(err) {
		if (err) throw err;
		let sql = "UPDATE user_info SET username = ? WHERE id = ? AND password = ?";
		let newUsername = req.body.username;
		let id = req.body.id;
		let password = req.body.userPassword;
		con.query(sql, [newUsername, id, password], function (err, result) {
			if (err) {
				if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){
					res.send("Duplicate entry");
				}
			}
			else res.send(result);
		});
	});
});

// Update password
app.post('/updatePassword',function (req, res) {
	var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'tablefordays471',
		database: 'mysql'
	});

	con.connect(function(err) {
		if (err) throw err;
		let sql = "UPDATE user_info SET password = ? WHERE id = ? AND password = ?";
		let oldPassword = req.body.oldPass;
		let newPassword = req.body.newPass;
		let id = req.body.id;
		con.query(sql, [newPassword, id, oldPassword], function (err, result) {
			if (err) {
				if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){
					res.send("Duplicate entry");
				}
			}
			else res.send(result);
		});
	});
});

function onConnection(socket){
  socket.on('drawing', function(data){
    socket.broadcast.emit('drawing', data);
    //console.log(data);
  });
  
  socket.on('rectangle', function(data){
    socket.broadcast.emit('rectangle', data);
    //console.log(data);
  });
  
  socket.on('linedraw', function(data){
    socket.broadcast.emit('linedraw', data);
    //console.log(data);
  });
  
   socket.on('circledraw', function(data){
    socket.broadcast.emit('circledraw', data);
    //console.log(data);
  });
  
  socket.on('ellipsedraw', function(data){
    socket.broadcast.emit('ellipsedraw', data);
    //console.log(data);
  });
  
  socket.on('textdraw', function(data){
    socket.broadcast.emit('textdraw', data);
    //console.log(data);
  });
  
  socket.on('copyCanvas', function(data){
    socket.broadcast.emit('copyCanvas', data);
    //console.log(data);
  });
  
  socket.on('Clearboard', function(data){
    socket.broadcast.emit('Clearboard', data);
    //console.log(data);
  });
 
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
