let current_sec;
let current_min;
let current_hour;
let my_frame_count;
let mil_hue;
let mil;

let start_sketch = true;


let hour_inverse = false;
let current_d = 0; 

let second_x;
let second_y;
let minute_x;
let minute_y;
let hour_x;
let hour_y;

let target_s_x;
let target_s_y;
let target_m_x;
let target_m_y;
let target_y_x;
let target_y_y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  current_sec = second();
  current_min = minute();
  current_hour = hour();
  my_frame_count = frameCount;

  second_x = width/6;
  second_y = height/3;
  minute_x = 2*width/4;
  minute_y = 4*height/5;
  hour_x = width/5;
  hour_y = 5*height/6;

  target_s_x = width/6;
  target_s_y = height/3;
  target_m_x = 2*width/4;
  target_m_y = 4*height/5;
  target_h_x = width/5;
  target_h_y = 5*height/6;

  mil_hue = millis();
  mil = millis();

}


function draw() {
  colorMode(HSB, 100);
  noStroke();
  fill(0);

  let _min = minute();
  let _sec = second();
  let _hour = hour();
  let _day = day();
  let m = month();
  let _year = year();

  // print(_hour);
  // print(_min);

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
  let year_ratio = map(_year, 0, 10000, 70, 90);
  let s = map(month_ratio, 0, 1, 50, 100);
  // let s = month_ratio * 100;
  let h = day_ratio * 100;
  // let b = year_ratio * 100;
   
  fill(h, s, year_ratio);

  //changing background to milis on click
  mil_hue = map((mil%1000), 0, 1000, 0, 100);
  background(mil_hue, 70, 80);

  //movement
  second_x = lerp(second_x, target_s_x, 0.05);
  second_y = lerp(second_y, target_s_y, 0.05);
  minute_x = lerp(minute_x, target_m_x, 0.05);
  minute_y = lerp(minute_y, target_m_y, 0.05);
  hour_x = lerp(hour_x, target_h_x, 0.05);
  hour_y = lerp(hour_y, target_h_y, 0.05);


  // let current_frame_num = frameCount;
  // let frame_count = (current_frame_num % 100); 
  // print("__ second: " + _sec);
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
    circle(second_x, second_y, ((_sec*10)+mapped_frame));

    if (minute() != current_min){
      //if it is a new minute, reset minute count
      print("!!NEW MINUTE!! " + current_min);
      current_min = minute();
    }
    circle(minute_x, minute_y, ((_min*10)+mapped_frame));


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
      // print("CURRENT HOUR DIAMETER: " + current_d);
      circle(hour_x, hour_y, current_d);
    }
    else{
      current_d -= pixel_change;
      // print("CURRENT HOUR DIAMETER: " + current_d);
      circle(hour_x, hour_y, current_d);
    }

    my_frame_count++;
  }
  
}


function windowResized(event) {
  resizeCanvas(windowWidth, windowHeight);
  print(event);
}

//movement of circles to where mouse is clicked
function mouseClicked(){
  mil = millis();
  print("!! MOUSE CLICKED !!");
  second_x = mouseX;
  second_y = mouseY;
  minute_x = mouseX;
  minute_y = mouseY;
  hour_x = mouseX;
  hour_y = mouseY;
}


