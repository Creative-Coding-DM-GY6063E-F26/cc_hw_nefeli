
let x = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
}

function draw() {
  let s = second();
  console.log('second: ' + s);
  circle(x, height/2, 100);
  x += s;

}
