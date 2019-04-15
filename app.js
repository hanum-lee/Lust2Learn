
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const uuidv4 = require('uuid/v4');
var mysql = require('mysql');
var bodyParser = require('body-parser');
let fs = require('fs');

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

// Generate lobby ID
app.get('/createID', function(req, res) {
	let ID = uuidv4();
	console.log(ID);
	res.send(ID);
});


 // Create new lobby
app.post('/createLobby', function(req, res) {
	var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'tablefordays471',
		database: 'mysql'
	});

 	con.connect(function(err) {
		if (err) throw err;
		let sql = "INSERT INTO lobbies (id, Password) VALUES (?,?)";
		let name = req.body.lobbyID;
		let password = req.body.lobbyPassword;
		con.query(sql, [name, password], function (err, result) {
			if (err) {
					if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062) {
							res.send("Duplicate entry");
					}
			}
			else res.send(result);
		});
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

 	con.connect(function(err) {
		if (err) throw err;
		let sql = "SELECT * FROM lobbies WHERE id = ? AND Password = ?";
		let name = req.body.lobbyID;
		let password = req.body.lobbyPassword;
		con.query(sql, [name, password], function (err, result) {
			if (err) {
				throw err;
			}
			res.send(result);
		});
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

//Load saved canvas
app.post('/getCanvas',function (req, res) {
	var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'tablefordays471',
		database: 'mysql'
	});

	con.connect(function(err) {
		if (err) throw err;
		let sql = "SELECT * FROM canvas_list WHERE id = ?";
		let id = req.body.id;
		con.query(sql, id, function (err, result) {
			if (err) throw err;
			else res.send(result);
		});
	});
});

app.post('/saveCanvas',function (req,res) {
  console.log('Test');
  console.log(req.body);
  let testbody = req.body.imgdata;
  console.log(testbody);
  let base64Data = testbody.replace(/^data:image\/png;base64,/, "");
  fs.writeFile('test1.jpg',base64Data,'base64',function(err){
    if(err){
      console.log(err);
    }
  })
});

app.get('/canvas',function (req,res) {
  fs.readFile('test1.jpg','base64',function (err,data) {
    if(err){
      console.log(err);
    }
    if(data){
      console.log("ReadingData");
      console.log(data);
      res.send('data:image\\/png;base64,' + data);
    }
  })

});

function onConnection(socket){

	socket.on('handshake', function(id){
		socket.room = id;
		socket.join(socket.room);
	});

  socket.on('drawing', function(data){
    socket.in(socket.room).emit('drawing', data);
  });
  
  socket.on('rectangle', function(data){
    socket.in(socket.room).emit('rectangle', data);
    //console.log(data);
  });
  
  socket.on('linedraw', function(data){
    socket.in(socket.room).emit('linedraw', data);
    //console.log(data);
  });
  
   socket.on('circledraw', function(data){
    socket.in(socket.room).emit('circledraw', data);
    //console.log(data);
  });
  
  socket.on('ellipsedraw', function(data){
    socket.in(socket.room).emit('ellipsedraw', data);
    //console.log(data);
  });
  
  socket.on('textdraw', function(data){
    socket.in(socket.room).emit('textdraw', data);
    //console.log(data);
  });
  
  socket.on('copyCanvas', function(data){
    socket.in(socket.room).emit('copyCanvas', data);
    //console.log(data);
  });
  
  socket.on('Clearboard', function(data){
    socket.in(socket.room).emit('Clearboard', data);
    //console.log(data);
  });
 
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
