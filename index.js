
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
let bodyParser = require('body-parser');
let fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));
app.use(bodyParser.json({limit:'50mb',extended: true}));

app.use(express.static(__dirname + '/public'));

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
