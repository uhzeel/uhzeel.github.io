let v1, v2;
let buff;
let c;
let xoff=0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  buff = windowWidth * 0.1;
  v1 = createVector(buff, buff);
  v2 = createVector(width - buff, height - buff);
  c = createVector(width / 2, height / 2);
  createButton('p5js sketches').position(width,height).mousePressed(p5ji);
}

function p5ji(){
  window.open("https://editor.p5js.org/uhzeel/sketches","_blank");
}

function draw() {
  xoff+=.1;
  let noiz=50*noise(xoff);
  background(20);
  
  noFill();
  
  stroke(100);
  c = createVector(mouseX, mouseY);
  vbezier(v1, c, c, v2);
  stroke(255);
  c = createVector(mouseX+noiz, mouseY+noiz);
  vbezier(v1, c, c, v2);
  
  
  //line(0,0,mouseX,mouseY); line(width,height,mouseX,mouseY);
  noStroke();
  fill(255);
  textAlign(LEFT);
  text("this strand is mine.", v1.x + 10, v1.y);
  textAlign(RIGHT);
  text("well, alright. we can share it.", v2.x - 10, v2.y);
}
function mousePressed() {
}

function vbezier(a, ac, bc, b) {
  bezier(a.x, a.y, ac.x, ac.y, bc.x, bc.y, b.x, b.y);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
