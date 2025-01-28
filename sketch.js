function setup() {
  createCanvas(400, 400, WEBGL);
}

let reso = 10;
let zoff = 0;
let pZ,ipZ,jpZ;

function draw() {
  // rotateX(PI/3);
  translate(-width/2,-height/2);
  // rotateX(PI*frameCount/100);
  
  zoff += 0.005;
  let xoff = 0;
  background('#FAF3E7');
  strokeWeight(2);

  for (let i = reso; i <= width; i += reso) {
    let yoff = 0;
    xoff += 0.01;
    for (let j = reso; j <= height; j += reso) {
      yoff += 0.01;
      stroke('#E7D7BC');
        //map(dist(width/2,height/2,i,j),width/2,0,300,10));
      pZ=map(noise(xoff,yoff,zoff),0,1,-1500,1000);
      ipZ=map(noise(xoff,yoff+0.01,zoff),0,1,-1500,1000);
      jpZ=map(noise(xoff+0.01,yoff,zoff),0,1,-1500,1000);

      point(i,j,pZ);

      if(i==reso&&j!=height)
        line(i,j,pZ,i,j+reso,ipZ);
      if(i==width&&j!=height)
        line(i,j,pZ,i,j+reso,ipZ);

      if(j==reso&&i!=width)
        line(i,j,pZ,i+reso,j,jpZ);
      if(j==height&&i!=width)
        line(i,j,pZ,i+reso,j,jpZ);

      if(i==reso&&j==reso)
        line(i,j,pZ,0,0,0);
      if(i==width&&j==height)
        line(i,j,pZ,width,height,0);
      if(i==reso&&j==height)
        line(i,j,pZ,0,height,0);
      if(i==width&&j==reso)
        line(i,j,pZ,width,0,0);
    }
  }

}
