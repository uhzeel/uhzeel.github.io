let v1, v2;
let buff;
let c;
let xoff = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  buff = windowWidth * 0.1;
}

function draw() {
  rectMode(CENTER);
  rect(windowWidth/2,windowHeight/2)
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
