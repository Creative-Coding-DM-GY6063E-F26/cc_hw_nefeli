
let x = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(200);


  // let s = second();
  // console.log('second: ' + s);
  // circle(x, height/2, 100);
  // x += s;
  
  // let x = frameCount % position;
  // circle(x, height/2, 100);

  let min = minute();

  let map_min = map(millis() % min, 0, min, 0, width);

  // circle(millis() % (width/2), height/2, 100);
  circle(map_min, height/2, 100);

}
