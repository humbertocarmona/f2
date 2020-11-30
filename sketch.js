function setup() {
	createCanvas(500, 500);
}

function draw() {
	background(233);
	var x= frameCount % width;
	ellipse(x, 0.5*height, 50,50);
}