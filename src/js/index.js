//link variables to allow colour and stroke change
const colorInput = document.getElementById("color");
const weight = document.getElementById("weight");
const clear = document.getElementById("delete");
const paths = [];
let currentPath = [];

//creates canvas - no need to have an element like you would in vanilla JS. you can set the canvas size to certain pixels, but here lforin has showed us that we can use the size of the current frame to create a canvas that covers the whole area and will be responsive
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(255);
}

//this function should appear after set up
function draw(){
  noFill(); //shapes won't be filled

  //if the mouse is pressed down, this function is triggered by which the mouse's current x and y coords, as well as the current colour and stroke choices, are stored in an object called 'point' which is then added to the array of currentPath i.e. it tells the programme where to draw at this moment
  if(mouseIsPressed){ //mouseIsPressed is a flag in p5.js much like an event listener
    const point = {
          x: mouseX,
          y: mouseY,
          color: colorInput.value,
          weight: weight.value  
  };
  currentPath.push(point);
}

//next, we take the paths array and loop through each recorded path point. This is where I got a bit confused along the way and what really helped was having a console.log showing me each updated value and how that translated to what I drew on screen
paths.forEach(path => {
		beginShape();
		path.forEach(point => {
			stroke(point.color); //these three values refer to the above that we declared
			strokeWeight(point.weight);
			vertex(point.x, point.y);
		});
		endShape();
	});
}

//mousePressed is a function from p5.js that will fire whenever the mouse is pressed. Here, whenever that happens we're gonna reset the current path to allow the next coords to come in and then add that to the paths array so it can keep track of all of them, drawing the shape you intend
function mousePressed(){
  currentPath =[];
  paths.push(currentPath);
  // console.log(currentPath);
}

//links to the delete/clear button. This works by using splice without any indicated end point, effectively clearing the array as well as setting the background to white again
clear.addEventListener('click', () =>{
  paths.splice(0);
  background(255);
});