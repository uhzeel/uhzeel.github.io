function setup() {
  let canvas = createCanvas(400, 400, WEBGL);
  canvas.parent('canvas-container'); // Attach the canvas to the table cell
}

let reso = 10;
let zoff = 0;
let pZ,ipZ,jpZ;
let sizeX=400, sizeY=400;

function draw() {
  translate(-width/2,-height/2);
  
  zoff += 0.005;
  let xoff = 0;
  // background('#FAF3E7');
  background(0);
  strokeWeight(2);

  for (let i = reso; i <= sizeX; i += reso) {
    let yoff = 0;
    xoff += 0.01;
    for (let j = reso; j <= sizeY; j += reso) {
      yoff += 0.01;
      // stroke('#E7D7BC');
      stroke(255);
      pZ=map(noise(xoff,yoff,zoff),0,1,-1500,1000);
      ipZ=map(noise(xoff,yoff+0.01,zoff),0,1,-1500,1000);
      jpZ=map(noise(xoff+0.01,yoff,zoff),0,1,-1500,1000);

      point(i,j,pZ);

      if(i==reso&&j!=sizeY)
        line(i,j,pZ,i,j+reso,ipZ);
      if(i==sizeX&&j!=sizeY)
        line(i,j,pZ,i,j+reso,ipZ);

      if(j==reso&&i!=sizeX)
        line(i,j,pZ,i+reso,j,jpZ);
      if(j==sizeY&&i!=sizeX)
        line(i,j,pZ,i+reso,j,jpZ);

      if(i==reso&&j==reso)
        line(i,j,pZ,0,0,0);
      if(i==sizeX&&j==sizeY)
        line(i,j,pZ,sizeX,sizeY,0);
      if(i==reso&&j==sizeY)
        line(i,j,pZ,0,sizeY,0);
      if(i==sizeX&&j==reso)
        line(i,j,pZ,sizeX,0,0);
    }
  }

}
