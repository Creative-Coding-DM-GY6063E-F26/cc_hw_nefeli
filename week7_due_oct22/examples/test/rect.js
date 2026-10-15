class Rect {
  constructor(x, y, w, h, alpha, rad, angle) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.alpha = alpha;
    this.rad = rad;
    this.angle = angle;

    if (this.rad > this.w && this.rad > 300){
      this.w = this.rad * 2;
    }

  }
  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(random(10,160), random(100,220), random(100,255), this.alpha);
    rect(0, 0, this.w, this.h, this.rad);
    pop();
  }
}