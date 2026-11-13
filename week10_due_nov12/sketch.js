let current_sounds = [];
let chorus = [];
let backing = [];

// let blow_full;
let blow_pre_chor;
let blow_chor_0;
let blow_chor_1;
let blow_chor_2;

let backing_beat;
let backing_vocals;

let should_restart;
let should_loop;

let quit = false;


async function setup() {
  createCanvas(windowWidth, windowHeight);

  //only girl
  only_girl_full = await loadSound("./mp3/full_tracks/only_girl_in_the_world_full.mp3");
  only_girl_pitch_up = await loadSound("./mp3/only_girl_cuts/only_girl_pitch_up.mp3");
  only_girl_pitch_down = await loadSound("./mp3/only_girl_cuts/only_girl_pitch_down.mp3");
  only_girl_ai = await loadSound("./mp3/only_girl_cuts/only_girl_ai_ai.mp3");
  only_girl_bad = await loadSound("./mp3/only_girl_cuts/only_girl_make_a_bad_boy.mp3");
  only_girl_secrets = await loadSound("./mp3/only_girl_cuts/only_girl_secrets.mp3");
  only_girl_chorus = await loadSound("./mp3/only_girl_cuts/only_girl_chorus.mp3");
  world_0 = await loadSound("./mp3/only_girl_cuts/world_0.mp3");
  world_1 = await loadSound("./mp3/only_girl_cuts/world_1.mp3");
  world_2 = await loadSound("./mp3/only_girl_cuts/world_2.mp3");
  world_3 = await loadSound("./mp3/only_girl_cuts/world_3.mp3");

  //full songs
  backing_vocals = await loadSound("./mp3/full_tracks/disturbia_full.mp3");
  backing_beat = await loadSound("./mp3/backing/disturbia_drums.mp3");

  //chorus
  blow_pre_chor = await loadSound("./mp3/blow_cuts/blow_pre_chorus.mp3");
  blow_chor_0 = await loadSound("./mp3/blow_cuts/blow_chorus_1.mp3");
  blow_chor_1 = await loadSound("./mp3/blow_cuts/blow_chorus_2.mp3");
  blow_chor_2 = await loadSound("./mp3/blow_cuts/blow_chorus_3.mp3");

  chorus.push(blow_pre_chor, blow_chor_0, blow_chor_1, blow_chor_2);

}

function draw() {
  background(255);
  //stuff w visuals once audio is done
  //load everything in first
}

function keyPressed(){
  if (keyCode === 32){
    backingHandler(backing_vocals, 0.6);
    console.log("space/backing_vocals pressed");
  }
  if (keyCode === ENTER || keyCode === 13){
    backingHandler(backing_beat, 0.2);
    console.log("enter/beat pressed");
  }
  if (keyCode === BACKSPACE || keyCode === 8){
    print("quit all sounds")
    stopSounds();
  }

  switch (key){
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


function stopSounds() {
  quit = true;
  console.log("stopping all sounds");
  for (let i = 0; i < current_sounds.length; i++){
    current_sounds[i].stop();
  } 
}

function soundHandler(sound, volume = .85){
  console.log("sound handler called");
  current_sounds.push(sound); //adding to the current sounds array
  sound.setVolume(volume); //setting volume
  sound.jump(0); //starting from begginning whenever key is pressed
  sound.play();

  if (quit == true){ //safety check on stopping sounds
    sound.stop();
    quit = false;
  }
}

function backingHandler(sound, volume = .60){
  console.log("backing handler called");
  current_sounds.push(sound);
  sound.playMode("untilDone"); //continues to play until over > may change this
  sound.play();
  sound.setVolume(volume);

  if (quit == true){ //safety quit check
    sound.stop();
    quit = false;
  }
  
}

//use volume to change stuff, can use arrow keys to up or down it if time
//if the same key is pressed, while the objects is still playing, restart it

//probably use a switch case for this for keyboard inputs
