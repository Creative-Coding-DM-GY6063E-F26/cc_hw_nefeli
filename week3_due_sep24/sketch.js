function setup() {
  createCanvas(1000, 1000);

  let  rand_length = 0;
  let rand_direction = 0;
  let randx = 0;
  let randy = 0;
  let rand_opacity = 100;
  let rand_weight = 4;
  let rand_PI_start = 0;
  let rand_PI_end = 0;
  let bez_x_1 = 0;
  let bez_y_1 = 0;
  let bez_x_2 = 0;
  let bez_y_2 = 0;

  let tan_circle_x = 0;
  let tan_circle_y = 0;
  let tan_circle_d = 30;

  
  // bg tan
  background(218,203,181);
  
  //nostroke objects
  noStroke();
  // bg blue
  beginShape();
  fill(191,201,176)
  vertex(0,0);
  vertex(1000,0);
  vertex(1000,200);
  vertex(150,300);
  vertex(1000,500);
  vertex(1000,530);
  vertex(0,400);  
  vertex(0,750);
  vertex(1000,900);
  vertex(1000,960);
  vertex(0,843); 
  endShape(CLOSE);

  
}


function draw(){
  stroke(100,98,117, 220);
  strokeWeight(4);
  // noFill();
  

  for (let i=0; i<50; i++){
    rand_opacity = random(100,255)
    rand_weight = random(0.5,5);
    strokeWeight(rand_weight);
    stroke(100,98,117,rand_opacity);
    rand_length = random(100);
    rand_direction = random(100);
    randx = random(250);
    randy = random(350);
    rand_length += randx;
    rand_direction += randy;
    line(randx,randy,rand_length,rand_direction); 
  }

  for (let i=0; i<100; i++){
    rand_opacity = random(100,255)
    rand_weight = random(0.5,5);
    strokeWeight(rand_weight);
    stroke(100,98,117,rand_opacity);

    randx = random(250);
    randy = random(120);
    
    rand_length = random(100);
    rand_direction = random(20);
    rand_length += randx;
    rand_direction = randy - rand_direction;
    
    line(randx,randy,rand_length,rand_direction); 
  }

  
  for (let i=0; i<100; i++){
    rand_opacity = random(100,255)
    rand_weight = random(0.3,5);
    strokeWeight(rand_weight);
    stroke(100,98,117,rand_opacity);

    randx = random(250);
    randy = random(500,750);
    rand_length = random(randx,100);
    rand_direction = random(100);
    rand_length += randx;
    rand_direction += randy;
    line(randx,randy,rand_length,rand_direction); 
  }

  for (let i=0; i<100; i++){
    rand_opacity = random(100,255)
    rand_weight = random(0.3,5);
    strokeWeight(rand_weight);
    stroke(100,98,117,rand_opacity);

    randx = random(1000);
    randy = random(600,1000);
    rand_length = random(100);
    rand_direction = random(100);
    rand_length += randx;
    rand_direction = randy - rand_direction
    line(randx,randy,rand_length,rand_direction);
  }
  
  
  for (let i=0; i<40; i++){
    rand_length = random(100);
    rand_direction = random(100);
    randx = random(250);
    randy = random(350);
    rand_length += randx;
    rand_direction += randy;
    line(randx,randy,rand_length,rand_direction); 
  }


  for (let i=0; i<50; i++){
    rand_opacity = random(100,255)
    rand_weight = random(0.3,5);
    strokeWeight(rand_weight);
    stroke(100,98,117,rand_opacity);

    randx = random(1000);
    randy = random(600,1000);
    rand_length = random(100);
    rand_direction = random(100);
    rand_length += randx;
    rand_direction += randy;
    line(randx,randy,rand_length,rand_direction);
  }

  //green poly
  noStroke();
  fill(35,138,114);
  beginShape();
  vertex(750,150);
  vertex(880,170);
  vertex(875,350);
  vertex(810,368);
  vertex(740,335);
  endShape(CLOSE);

  
  //yellow bottom left
  fill(238,186,47);
  quad(120,840,500,1000,180,1000,120,840);

  noFill();

  for (let i=0; i<60; i++){
    rand_opacity = random(150,255)
    rand_weight = random(0.5,4);
    strokeWeight(rand_weight);
    stroke(45,44,32,rand_opacity);

    randx = random(550,780);
    randy = random(160,220);
    rand_PI_start = random(PI);
    rand_PI_end = random(2*PI);
    
    rand_length = random(40,60);
    rand_direction = random(30,60);
    // rand_length += randx;
    // rand_direction = randy - rand_direction
    arc(randx,randy,rand_length,rand_direction,rand_PI_start, rand_PI_end);
  }

  for (let i=0; i<80; i++){
    rand_opacity = random(100,255)
    rand_weight = random(0.5,5);
    strokeWeight(rand_weight);
    stroke(100,98,117,rand_opacity);

    randx = random(750,1000);
    randy = random(120,260);
    rand_length = random(50);
    rand_direction = random(100);
    rand_length += randx;
    rand_direction = randy-rand_direction;

    bez_x_1 = randx + (random(30));
    bez_y_1 = randy + (random(5));
    bez_x_2 = rand_length + (random(30));
    bez_y_2 = rand_direction + (random(5));
    
    bezier(randx,randy,bez_x_1, bez_y_1, bez_x_2, bez_y_2,rand_length,rand_direction);
  }


  for (let i=0; i<80; i++){
    rand_opacity = random(100,230)
    rand_weight = random(0.5,5);
    strokeWeight(rand_weight);
    stroke(70,70,77,rand_opacity);

    randx = random(250);
    randy = random(250,300);
    rand_PI_start = PI;
    rand_PI_end = random(PI,2*PI);
    
    rand_length = random(200,260);
    rand_direction = random(180,200);
    // rand_length += randx;
    // rand_direction = randy - rand_direction
    arc(randx,randy,rand_length,rand_direction,rand_PI_start, rand_PI_end);
  }

  for (let i=0; i<80; i++){
    rand_opacity = random(100,255)
    rand_weight = random(0.5,5);
    strokeWeight(rand_weight);
    stroke(40,40,37,rand_opacity);

    randx = random(0,260);
    randy = random(800,1000);
    rand_length = random(50);
    rand_direction = random(50);
    rand_length += randx;
    rand_direction += randy;

    bez_x_1 = randx + (random(30));
    bez_y_1 = randy + (random(5));
    bez_x_2 = rand_length + (random(30));
    bez_y_2 = rand_direction + (random(5));
    
    bezier(randx,randy,bez_x_1, bez_y_1, bez_x_2, bez_y_2,rand_length,rand_direction);
  }

  noStroke();
  
  //orange diamond
  fill(234,111,59);
  quad(550,200,790,540,595,850,340,500);
  
  //turquoise
  fill(76,181,219);
  rect(0,260,160,20);

  //seafoam greenish
  fill(220,228,221);
  quad(210,0,300,0,300,50,210,80);
  quad(90,48,145,45,140,180,85,190);
  quad(10,320,280,140,355,140,55,325);
  quad(20,420,410,285,480,300,100,440);

  
  //blue
  fill(47,78,151);
  circle(540,480,45);
  circle(540,810,43);
  circle(770,680,46);
  circle(910,400,40);
  rect(120,100,570,12);
  triangle(0,52,30,48,0,165);
  triangle(130,32,180,24,155,130)

  //green rect
  fill(35,138,114);
  rect(0,700,300,50);

  //brown lines
  noFill();
  stroke(75,45,31, 185);
  strokeWeight(8);
  line(0,900,800,1000);
  stroke(75,45,31, 160);
  strokeWeight(6);
  line(0,700,1000,850);
  stroke(39,44,33, 230);
  strokeWeight(6);
  line(0,850,100,850);
  strokeWeight(4);
  arc(200,1000,1000,450,PI,QUARTER_PI)
  circle(100,650,100);
  line(0,450,270,440);
  line(270,440,250,700);
  line(110,446,100,600);

  bezier(440,670,510,680,560,610,600,610);
  bezier(510,560,550,510,720,500,750,500);
    
  stroke(90, 100, 115);
  strokeWeight(8);
  bezier(0,720,300,740,400,610,600,590);
  strokeWeight(6);
  bezier(125,245,400,450,750,500,1000,510);
  
  noStroke();

  //darker turquoise
  fill(34,111,164);
  rect(130,245,160,7);
  rect(130,265,160,7);
  quad(980,510,1000,510,1000,600,979,620);
  triangle(1000,645,1000,670,980,670)

  
  //green  
  fill(35,139,114);
  rect(700,880,30,120);
  rect(770,880,30,120);
  // beginShape();
  // vertex(750,150);
  // vertex(880,170);
  // vertex(875,350);
  // vertex(810,368);
  // vertex(740,335);
  // endShape(CLOSE);
  triangle(280,430,430,460,280,460);

  
  //red
  fill(207, 64, 63);
  rect(250,730,130,40);
  triangle(30,48,80,40,50,150);
  triangle(80,40,130,32,110,130);

  //yellow
  fill(238,186,47);
  beginShape();
  vertex(850,0);
  vertex(980,0);
  vertex(980,70);
  vertex(930,70);
  vertex(930,25);
  vertex(850,25);
  endShape(CLOSE);


  noFill();
  stroke(238,186,47);
  strokeWeight(37);
  arc(798, 680, 140, 140, (1.3*PI), PI+(.55*PI));

  fill(195,144,99);

  noStroke();

  //grid of tan circles
  tan_circle_x = 640;
  tan_circle_y = 270;
  vert_spacing = 0;
  hor_spacing = 0;
  
  for(let i=0; i<6; i++){
    
    for(let j=0; j<8; j++){

      circle(tan_circle_x, tan_circle_y, tan_circle_d);
      tan_circle_x += 50;
      tan_circle_y -= 5;
      
      print(`nested j: ${j}`)
    }

    tan_circle_x = 640;
    tan_circle_y = 270;

    vert_spacing += 40;
    hor_spacing += 3;

    tan_circle_x -= hor_spacing;
    tan_circle_y += vert_spacing;
    
    print(`i: ${i}`)
    
  }
  noLoop();
}