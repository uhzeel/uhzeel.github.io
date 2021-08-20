let v1, v2;
let buff;
let c;
let xoff = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  buff = windowWidth * 0.1;
  v1 = createVector(buff, buff);
  v2 = createVector(width - buff, height - buff);
  c = createVector(width / 2, height / 2);
  createP("Hi, I'm Jazeel.")
    .position(v1.x + 10, v1.y - 10)
    .style("color:white");
  textAlign(RIGHT);
  createP("And this is the story of how I -")
    .position(v2.x - 250, v2.y - 10)
    .style("color:white; text-align:right;");
}

function draw() {
  xoff += 0.1;
  let noiz = 50 * noise(xoff);

  background(20);
  noFill();
  stroke(100);

  c = createVector(mouseX, mouseY);
  vbezier(v1, c, c, v2);
  stroke(255);

  c = createVector(mouseX + noiz, mouseY + noiz);
  vbezier(v1, c, c, v2);
}

function vbezier(a, ac, bc, b) {
  bezier(a.x, a.y, ac.x, ac.y, bc.x, bc.y, b.x, b.y);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
