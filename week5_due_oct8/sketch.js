// This is the sketch.js file.
// Press 's' to export the SVG.
// Note that p5.js is used in 'global mode'. 

p5.disableFriendlyErrors = true; // keep warnings quiet
let bDoExportSvg = false;
let font;


// let string_points;

function preload(){
}

async function setup(){
  // These canvas dimensions are 8.5"x11" at 96 dpi
  createCanvas(816, 1056);
  // noLoop();
  randomSeed(100);
  // background(255);

  font = await loadFont('fonts/blackletter.ttf');
  

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

  noFill();

  // CONCENTRIC CIRCLES
  stroke(0, 255, 255);
  let d = 300;
  // concentric_circles(d);


  // LETTERS ALONG A PATH
  stroke(255, 0, 255);
  textFont(font);
  textSize(250);
  // translate(0,0);
  push;

  let string = "oh hello, how are u ?!";
  let x = 0;
  let y = 350;
  let rotation_rate = -1;
  // letter_mask(x, y, string, rotation_rate);
  
  // erase();
  // noErase();
  pop;

  // HORIZONTAL LINES
  // resetMatrix();
  // horizonatal_lines();

  // BACKING TEXT WITH VERTICAL LINES
  // textSize(150);
  // let backing_string = "a wave \ninterference \npattern \nproduced \nwhen a \npartially \nopaque ruled \npattern with \ntransparent \ngaps is \noverlaid on \nanother \nsimilar \npattern.";
  // backing_text(0, 0, backing_string);

  // test line
  // line(0,500,width,500);


  // LOOPING SPIRAL STUFF
  // push();

  let center_x = width/2;
  let center_y = height/2; 
  let dist = 0.5;
  let angle = 0.1;

  loops(center_x, center_y, dist, angle);
  // pop();
  
  if (bDoExportSvg){
    endRecordSvg();
    bDoExportSvg = false;
    console.log("STOPPING SVG");
  }

  // noLoop();
}

function loops(x, y, dist, angle){
  
  for (let i = 0; i <= 300; i++){
    let circle_x = x + cos(angle) * dist;
    let circle_y = y + sin(angle) * dist;

    circle(circle_x, circle_y, 100);
    x *= dist;
    y *= angle;

    angle += 10;
  }

}


function concentric_circles(d){
  //creating a circle, should populate on top >> create top layer unction
  for (let i = 0; i <= 40; i++){
    // print(d);
    circle(width/2, height/2, d);
    d += 10;
    // print("final diameter: " + d);
  }

}

function letter_mask(x, y, string, rotation_rate){
  translate(width/2, height/2);
  rotate(90);
  
  for (let i = 0; i < string.length; i++){
  // line(0, 0, 0, height);

  rotation_rate = -1;
  let character = string[i];
    
  print("character: " + character + ", text width: " + textWidth(character));
  // change in rotation_rate based off of character width
  roc_rotation = textWidth(character)/250;
  rotation_rate *= roc_rotation;
  // text(character, x, y);
  // let string_points = font.textToPoints(string,x,y,{sampleFactor: 0.5});

  let string_points = font.textToPoints(character,x,y,{sampleFactor: 0.2});
  print(string_points);

  // strokeWeight(4);
  for (let p of string_points) {
    print("HELLOOOOOOO");
    point(p.x, p.y);
  }
  y -= 0.5;
  rotate(rotation_rate);
  }

}

function horizonatal_lines(){
  noFill();
  stroke(198, 255, 36);
  strokeWeight(1);

  for (let y = 0; y < height; y += 5){
     line(0, y, width, y); 
  }  
}

function backing_text(x, y, string){

  //automate line break if u have time
  // if (textWidth(string) > width){
  //   string += "\n";
  // }
  // ^ every space, check the current width of the string using external count var, if it exceeds, add a \n break

  // stroke();
  textLeading(70);
  // text(string, x, y, width);
  let text_contours = font.textToContours(string, 0, 100, {sampleFactor: 0.5});
  print(text_contours)

  // clipping masks don't work with vector export so
  beginClip();
  beginShape();
  for (const pts of text_contours) {
    beginContour();
    for (const pt of pts) {
      vertex(pt.x, pt.y);
    }
    endContour(CLOSE);
  }
  endShape(CLOSE);
  endClip();

  //horizontal clipping
  for (let i = 0; i < width; i += 5){
     line(i, 0, i, height); 
  }  
  
}