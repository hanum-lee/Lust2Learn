var bgColor = 255;
var randomColor;
var shapeWidth;
var shapeHeight;
var colour;

function getRandomColor(){
	var r = random(50,240);
	var g = random(50,220);
	var b = random(50,230);
	return color(r,g,b);
}

function setup(){
	createCanvas(800, 480);
	background(255,255,255);
	cursor(CROSS);
}

function draw(){

	var size = parseInt(document.getElementById('brushSize').value);

	colour = document.getElementById("brushColor").value;
	if (mouseIsPressed) {
	strokeWeight(size);
	line(mouseX, mouseY, pmouseX, pmouseY);
	stroke(colour);

	//Get position ratio
		var adjustedX = mouseX/windowWidth;
		var adjustedY = mouseY/windowHeight;
		var adjustedpX = pmouseX/windowWidth;
		var adjustedpY = pmouseY/windowHeight;

		//Function that 'emits' data to the server
		grabAndSend(adjustedX, adjustedY, adjustedpX, adjustedpY, size, colour);
		//console.log(colour);
	}
}

function mousePressed(){
	randomColor = getRandomColor();
}

//----------CLIENT-SIDE SOCKET CODE----------//
//Init socket object
var socket = io();

//Receive data from the server using .on()
socket.on('news', function (data) {
	//console.log(data);
	drawData(data);
});

//Function to call when data is received
//Called inside .on()
function drawData(data){
	smooth()
	var socketColor = color(data.fill[0], data.fill[1], data.fill[2]);
	var drawX = data.pos[0] * windowWidth;
	var drawY = data.pos[1] * windowHeight;
	var pdrawX = data.pPos[0] * windowWidth;
	var pdrawY = data.pPos[1] * windowHeight;
	var size = data.size;
	strokeWeight(size);
	stroke(socketColor);
	line(drawX, drawY, pdrawX, pdrawY);
}

//Function to call there is data to send to the server, 
//Uses .emit()
function grabAndSend(posX, posY, posPX, posPY, size, curFill){
	var rgba = color(curFill).levels;
	var data = {
		pos: [posX, posY],
		pPos: [posPX, posPY],
		size: size,
		fill: rgba
	};
	//Send the data to the server
	socket.emit('drawing', data);
}

function saveState(){
	saveCanvas(canvas.jpeg);
}

//----------WINDOW RESIZE-----------//
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	background(bgColor);
}


