function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  randomSeed(1345245);
  // angleMode(DEGREES);

}

function draw() {

}

function mousePressed() {
  // drawRandomCircle(mouseX, mouseY, 50, 10);

  // let new_circle = new Circle(mouseX, mouseY, 50);
  // new_circle.draw();
  let new_rect = new Rect(mouseX, mouseY, random(70,300), random(70,500), random(50,110), 500, random(2*PI));
  new_rect.draw();

  // print("mouse clicked");

}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

  }

  draw() {
    fill(random(255), random(255), random(255));
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}

function drawRandomCircle(x=random(width), y=random(height), r=random(10,50), alpha=255){
  fill(random(255), random(255), random(255));
  ellipse(this.x, this.y, this.r * 2, this.r * 2);
}
