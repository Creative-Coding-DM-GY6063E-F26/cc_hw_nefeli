/**
 * 
 * A simple drawing machine that draws circles when the mouse is pressed.
 * 
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

function draw() {
  noStroke(); 
  // fill('peachpuff');

  if (mouseIsPressed) {
    let color_r = map(mouseY, 0, height, 10, 255);
    let color_g = map(mouseY, 1, 1/height, 10, 255);
    let color_b = map(mouseY, 1, height*2, 10, 255);
    fill(color_r,color_g,color_b);
    let circle_d = map(mouseX, 0, width, 5, 250);
    circle(mouseX, mouseY, circle_d);
  }
}

function keyPressed() {
  if (keyCode === 32) { // Check if the spacebar is pressed
    background(220);
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Exercises for you to try :
// 1. Use mouseX or mouseY to change the circle's size or color as you draw.
//    Hint: map(mouseX, 0, width, 5, 100)



