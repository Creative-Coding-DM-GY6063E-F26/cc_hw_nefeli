// This is the sketch.js file.
// Press 's' to export the SVG.
// Note that p5.js is used in 'global mode'. 

p5.disableFriendlyErrors = true; // keep warnings quiet
let bDoExportSvg = false; 

function setup(){
  // These canvas dimensions are 8.5"x11" at 96 dpi
  createCanvas(816, 1056);
  // noLoop();
  randomSeed(100);

  // background(255);


}


function keyPressed(){
  console.log("PRESSED S")

  if (key == 's'){ 
    bDoExportSvg = true; 
  }
}

function draw(){

  if (bDoExportSvg){
    beginRecordSvg("myOutput.svg");
  }

  //vars for PATTERN ONE
  let concentric_stop = false;
  let concentric_d = 50;
  let grid_size = 10;

  //vars for PATTERN TWO
  let bezier1_stop = false;
  let bezier2_stop = false
  let x = 0;
  let y = 0;

  //vars for PATTERN THREE
  let line1_stop = false;
  let x1 = 300;
  let y1 = 100;

  let line2_stop = false
  let x2 = 20;
  let y2 = 200;


  noFill();
  stroke(0,0,0);

  //PATTERN ONE
  if (concentric_stop == false){
    for (let i=0; i<47; i++){
      circle(width/2, height/2, concentric_d);
      concentric_d += 15;
    }
  }
  concentric_stop = true;
  x = 0;
  y = 0;
  for (let i=0; i<width; i+=grid_size){
    line(x, y, x, y+height)
    x += 10;
  }
  
  // for(let j=0; j<height; j+=grid_size){
  //   line(x, y, x+width, y);
  //   y += 10;
  // }

    
  //PATTERN TWO
  // if (bezier1_stop == false){
  //   for (let i=0; i<100; i++){
  //     bezier(x, 0, x-200, height/4, x+200, 3*(height/4), x, height);
  //     x += 10;
  //   } 
  // }
  // bezier1_stop = true;
  
  // if (bezier2_stop == false){
  //   for (let j=0; j<100; j++){
  //     bezier(0, y, width/8, y-300, 3*(width/8), y+300, width/2, y);
  //     bezier(width/2, y, 5*(width/8), y-300, 7*(width/8), y+300, width, y);
  //     y += 10;
  //   } 
  // }
  // bezier2_stop = true;

  //PATTERN THREE
  // if(line1_stop == false){
  //   for(let i=0; i<50; i++){
  //     line(x1,y1,x1+400,y1+50);
  //     // x1 += 10;
  //     y1 += 10;
  //   }
  // }
  // line1_stop = true;
  
  //   if(line2_stop == false){
  //     for(let j=0; j<70; j++){
  //       line(x2, y2, x1+530, y2-35);
  //       y2 += 5;
  //     }
  //   }
  // line2_stop = true;

  //ADDS CIRCLE FUNCTION
  drawCircles(3);


  // Draw stuff here, such as:
  // line(0,0, mouseX, mouseY); 
  
  if (bDoExportSvg){
    endRecordSvg();
    bDoExportSvg = false;
    console.log("STOPPING SVG");
  }
}

function drawCircles(num_circle) {
  let x = 10;
  let y = 10;
  
  for (let i = 0; i < num_circle; i++){
    circle(x,y,20,20);
    x += 10;
    y += 10;
  }
}