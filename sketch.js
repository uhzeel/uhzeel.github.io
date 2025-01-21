function setup() {
  createCanvas(600, 600, WEBGL);
}

let reso = 5;
let zoff = 0;
let pZ;

function draw() {
  translate(-width/2,-height/2);
  zoff += 0.005;
  let xoff = 0;
  background(0);
  strokeWeight(2);
  for (let i = reso; i < width; i += reso) {
    let yoff = 0;
    xoff += 0.01;
    for (let j = reso; j < height; j += reso) {
      yoff += 0.01;
      stroke(
        noise(xoff,yoff,zoff) * 150,
        map(dist(width/2,height/2,i,j),
         width/2,0,300,10));
      pZ=map(noise(xoff,yoff,zoff),0,1,-450,0);
      point(i,j,pZ);
    }
  }
  push();
  translate(width/2,height/2,-80);
  rotateZ(frameCount*noise(zoff)/100);
  rotateX(frameCount*noise(zoff)/100);
  rotateY(frameCount*noise(zoff)/100);
  noFill();
  strokeWeight(1);
  stroke(40);
  sphere(60,16,16);
  pop();

}
