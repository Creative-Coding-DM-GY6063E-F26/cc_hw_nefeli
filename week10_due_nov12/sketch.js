
class Button {
  constructor(_label, _x, _y, _onClick, _index) {
    this.button = createButton(_label);
    this.button.position(_x, _y);
    this.button.style("width", width / 8 + "px");
    this.button.style("height", "30px");
    this.button.mouseClicked(_onClick);
    this.index = _index;
  }

   html(_label) {
    this.button.html(_label);
  }

  doubleClicked(_onDoubleClicked) {
    this.button.doubleClicked(_onDoubleClicked);
  }
}

let backing_track;

let disturbia_full;

let only_girl = [];

let only_girl_full; 
let only_girl_pitch_up;
let only_girl_pitch_down;
let only_girl_ai;
let only_girl_bad;
let only_girl_secrets;
let only_girl_chorus;

let chorus = [];

let blow_full;
let blow_pre_chor;
let blow_chor_0;
let blow_chor_1;
let blow_chor_2;

let backing = [];

let backing_beat;

let should_restart;
let should_loop;

//buttons
let button_y;
let stop_button;

let sound_board_buttons = [];
let sound_board_0;
let sound_board_1;
let sound_board_2;


let quit = false;

function preload(){
  //full songs
  disturbia_full = loadSound("./mp3/full_tracks/disturbia_full.mp3");
  backing_beat = loadSound("./mp3/backing/disturbia_drums.mp3");

  //chorus
  blow_pre_chor = loadSound("./mp3/blow_cuts/blow_pre_chorus.mp3");
  blow_chor_0 = loadSound("./mp3/blow_cuts/blow_chorus_1.mp3");
  blow_chor_1 = loadSound("./mp3/blow_cuts/blow_chorus_2.mp3");
  blow_chor_2 = loadSound("./mp3/blow_cuts/blow_chorus_3.mp3");

}

async function setup() {
  createCanvas(windowWidth, windowHeight);

  // //only girl
  // only_girl_full = await loadSound("./mp3/full_tracks/only_girl_in_the_world_full.mp3");
  // only_girl_pitch_up = await loadSound("./mp3/only_girl_cuts/only_girl_pitch_up.mp3");
  // only_girl_pitch_down = await loadSound("./mp3/only_girl_cuts/only_girl_pitch_down.mp3");
  // only_girl_ai = await loadSound("./mp3/only_girl_cuts/only_girl_ai_ai.mp3");
  // only_girl_bad = await loadSound("./mp3/only_girl_cuts/only_girl_make_a_bad_boy.mp3");
  // only_girl_secrets = await loadSound("./mp3/only_girl_cuts/only_girl_secrets.mp3");
  // only_girl_chorus = await loadSound("./mp3/only_girl_cuts/only_girl_chorus.mp3");
  // world_0 = await loadSound("./mp3/only_girl_cuts/world_0.mp3");
  // world_1 = await loadSound("./mp3/only_girl_cuts/world_1.mp3");
  // world_2 = await loadSound("./mp3/only_girl_cuts/world_2.mp3");
  // world_3 = await loadSound("./mp3/only_girl_cuts/world_3.mp3");


  // only_girl = [only_girl_full, only_girl_pitch_down,] maybe make each song have an array and index 0 is always the full song 
  //only girl cuts = qwerasdfzxcv < soundboard style



  backing_track = disturbia_full;

  chorus.push(blow_pre_chor, blow_chor_0, blow_chor_1, blow_chor_2);


  //buttons
  button_y = height - 40;


  stop_button = new Button("■", 120 + width / 4, button_y, stopClicked);

  sound_board_0 = new Button(":>", width/6, height/6, soundBoard, 0);
  sound_board_1 = new Button(":>", width/6, height/6 + 50, soundBoard, 1);
  sound_board_2 = new Button(":>", width/6, height/6 + 100, soundBoard, 2);




  

}

function draw() {
  background(220);
  //stuff w visuals once audio is done
  //load everything in first
}

function soundBoard(){
  console.log("sound board called");
  let current_sound = sound_board_buttons[]
  chorus[sound_board_0.index].play();
}


function keyPressed(){
  if (keyCode === 32){
    backingHandler(backing_track, 0.6);
    print("space pressed");
  }
  if (keyCode === BACKSPACE || keyCode === 8){
    print("quit all sounds")
  }

  switch (key){
    case '5':
      soundHandler(backing_beat, 0.6);
      print("5 pressed");  
      break;

    case '1':
      soundHandler(blow_pre_chor);
      print("1 pressed");  
      break;

    case '2':
      soundHandler(blow_chor_0);
      print("2 pressed");  
      break;

    case '3':
      soundHandler(blow_chor_1);
      print("3 pressed");  
      break;

    case '4':
      soundHandler(blow_chor_2);
      print("4 pressed");  
      break;

    case 'q':
      soundHandler(only_girl_pitch_up);
      print("q pressed");  
      break;

    case 'w':
      soundHandler(only_girl_pitch_down);
      print("w pressed");  
      break;

    case 'e':
      soundHandler(only_girl_ai, 0.3);
      print("e pressed");  
      break;

    case 'a':
      soundHandler(only_girl_bad);
      print("a pressed");  
      break;

    case 's':
      soundHandler(only_girl_secrets);
      print("s pressed");  
      break;

    case 'd':
      soundHandler(world_0, 0.3);
      print("d pressed");  
      break;

    case 'z':
      soundHandler(world_0, 0.3);
      print("z pressed");  
      break;
    
    case 'x':
      soundHandler(world_1, 0.3);
      print("x pressed");  
      break;

    case 'c':
      soundHandler(world_2, 0.3);
      print("c pressed");  
      break;

    case 'v':
      soundHandler(world_3, 0.3);
      print("v pressed");
      break;
  }
}


function stopClicked() {
  quit = true;
  print("stop button clicked");
}


function soundHandler(sound, volume = .85){
  console.log("sound handler caller");
  sound.setVolume(volume);
  sound.jump(0);


  if (quit == true){
    sound.stop();
    quit = false;
  }
}

function backingHandler(sound, volume = .60){
  sound.playMode("untilDone");
  sound.play();
  sound.setVolume(volume);

  if (quit == true){
    sound.stop();
    quit = false;
  }
  
}

// function mousePressed(){
//   if (!sound.playing){
//     sound.start();
//   }
//   else{
//     sound.stop();
//   }
// }

//use volume to change stuff, can use arrow keys to up or down it if time
//if the same key is pressed, while the objects is still playing, restart it

//probably use a switch case for this for keyboard inputs