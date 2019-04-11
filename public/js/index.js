//Set some global vars
var bgColor = 255;
var randomColor;
var shapeWidth = 20;
var shapeHeight = 20;

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

	var size = document.getElementById('brushSize').value;
    
	var colour = document.getElementById("brushColor").value;
  
	if (mouseIsPressed) {
	rect(mouseX, mouseY, size, size);
	fill(colour);
	noStroke();

	//Get position ratio
		var adjustedX = mouseX/windowWidth;
		var adjustedY = mouseY/windowHeight;

		//Function that 'emits' data to the server
		grabAndSend(adjustedX, adjustedY, randomColor);
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
	var socketColor = color(data.fill[0], data.fill[1], data.fill[2]);
	var drawX = data.pos[0] * windowWidth;
	var drawY = data.pos[1] * windowHeight;
	fill(socketColor);
	ellipse(drawX, drawY, shapeWidth, shapeHeight);
	fill(colour);
}

//Function to call there is data to send to the server, 
//Uses .emit()
function grabAndSend(posX, posY, curFill){
	var rgba = curFill.levels;
	var data = {
		pos: [posX, posY],
		fill: rgba
	};
	//Send the data to the server
	socket.emit('drawing', data);
}

//----------WINDOW RESIZE-----------//
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	background(bgColor);
}

