let current_sec;
let current_min;
let current_hour;
let my_frame_count;

let start_sketch = true;


let hour_inverse = false;
let current_d = 0; 


function setup() {
  createCanvas(windowWidth, windowHeight);
  current_sec = second();
  current_min = minute();
  current_hour = hour();
  my_frame_count = frameCount;

}


function draw() {
  background(255);
  noStroke();
  fill(0);
  filter(BLUR, 25);

  
  let mil = millis();
  let _min = minute();
  let _sec = second();
  let _hour = hour();
  let _day = day();
  let m = month();
  let _year = year();

  print(_hour);
  print(_min);

  let month_ratio = m/12;
  let day_ratio = 0;
  if (m == 4 || m == 6 || m == 9 || m == 11){
    day_ratio = _day/30;
  }
  else if (m == 2){
    day_ratio = _day/29;
  }
  else {
    day_ratio = _day/31;
  }
  let year_ratio = _year/10000;

  let r = month_ratio * 255;
  let g = day_ratio * 255;
  let b = year_ratio * 255;

  let current_frame_num = frameCount;
  // let frame_count = (current_frame_num % 100); 
  print("__ second: " + _sec);
  // print("FRAME COUNT: " + frame_count);
  
  //starting sketch at the beginning of the minute
  // jk don't need this anymore, may keep to add a *title* screen
  if (_sec == 0){
    start_sketch = true; 
  }
  

  if (start_sketch == true){
    
    if (second() != current_sec){
      //if it a new second, and frame-rate is off, reset frame count
      my_frame_count = 0;
      current_sec = second();
    }

    //creating a frame count that increments by 1 every frame until 60 frames pass
    my_frame_count = (my_frame_count % frameRate());
    // print("FRAME COUNTS: " + my_frame_count);
    
    //mapping that incrementing frame count from 0-60 -> 0-0.9 & others
    let mapped_frame = map(my_frame_count, 0, frameRate(), 0, 10);
    let min_mapped_frame = map(mapped_frame, 0, 10, 0, 60);
    // print("MAPPED FRAME: " + mapped_frame);

    //creating a circle that takes in the seconds() as diameter 
    //increases smoothly until the next second
    circle(width/6, height/3, ((_sec*10)+mapped_frame));

    if (minute() != current_min){
      //if it is a new minute, reset minute count
      print("!!NEW MINUTE!! " + current_min);
      current_min = minute();
    }
    circle(2*width/4, 4*height/5, ((_min*10)+mapped_frame));


    if (hour() != current_hour){
      //if it is a new hour, reset hour count
      print("!!NEW HOUR!! " + current_hour);
      //pulse  
      // circle(width/5, 5*height/6, )
      current_hour = hour();
      if (hour_inverse == false){
        hour_inverse = true;
      }
      else{
        hour_inverse = false
      }
    }

    current_d = 100;

    // rate of change of the hour 0 -> 1
    let hour_roc = (hour() + 1)/24;
    // let mapped_hour = map(hour(), 0, 23, 100, 400);
    let pixel_change = hour_roc * current_min;
    

    if (hour_inverse == false){
      current_d += pixel_change;
      print("CURRENT HOUR DIAMETER: " + current_d);
      circle(width/5, 5*height/6, current_d);
    }
    else{
      current_d -= pixel_change;
      print("CURRENT HOUR DIAMETER: " + current_d);
      circle(width/5, 5*height/6, current_d);
    }



    my_frame_count++;
  }

  //simulating slowing the time / making it more visible based on interaction
  if (mouseIsPressed === true){
    frameRate(5);
    print("!! MOUSE CLICKED !!");
  }
  else{
    frameRate(60);
  }


  // fill(r,g,b);
  // push();
  // filter(BLUR, 0.5);
  // circle(200,200,200);
  // pop();


}




function windowResized(event) {
  resizeCanvas(windowWidth, windowHeight);
  print(event);
}

// function mouseClicked(){
//   noLoop();
// }


