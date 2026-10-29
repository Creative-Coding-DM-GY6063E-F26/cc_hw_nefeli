/**
 * 
 * A simple draawing machine that draws circles when the mouse is pressed.
 * 
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

function draw() {
  noStroke(); 
  fill('peachpuff');

  if (mouseIsPressed) {
    circle(mouseX, mouseY, width*0.0625);
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
