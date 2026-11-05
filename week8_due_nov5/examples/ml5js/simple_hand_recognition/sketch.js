let vid;
let handPose;
let hands = [];
let connections;

let current_pose = alphabetDetection;

let letters = [];
let text_size;

//fonts
let font_1;
let font_2;
let font_3;
let font_4;

//--------------- TO DO ---------------
// figure out how to flip the hands, width - x ? or something 
// smooth all movement holy it is so jittery, take averages of movement over periods of time
// do a check in the beginning *tutorial* style that says place dominant hand first, secondary hand next, and then distance from camera == good to start out << will help with threshold hand push check
// info on side on how to use / what to do < in index but putting a note here

async function setup() {
  createCanvas(windowWidth,windowHeight);
  console.log("ml5 version:", ml5.version);
  vid = createCapture(VIDEO, { flipped: true });  //makes it so that it is mirror
  vid.size(width, height);

  // vid.hide();
  // background(220);
  handPose = await ml5.handPose();
  handPose.detectStart(vid, gotHands);

  connections = handPose.getConnections();  //lines between hand keypoints

  //font loader > add more as it keeps growing
  font_1 = await loadFont('./fonts/blackletter.ttf');
  font_2 = await loadFont('./fonts/mono.ttf');  //replace
}


function draw() {
  background(220);
  // image(vid, 0, 0);
  // drawHands();
  // controlSpecs();
  // printLog();

  textSize(200);
  handPress(current_pose());
  // let letter = current_pose();
  // let hand_press = handPress();
  // savedLetter(letter, hand_press

  //savedLetter outputs 
  // let current_text = savedLetter();
  // text(toString(current_text[0]), current_text[1], current_text[2]);

  print("!!!!!!!!!!!!!");
  print(letters);
  textSize(200);
  print(String(letters[0]));
  text(String(letters[0]), letters[1], letters[2]);


}

function gotHands(results, err) {
  if (err) {
    console.error(err);
    return;
  }
  if(results.length > 0){
    hands = results;
    printFingerDataKey();
  }
}

function printLog(){
  console.log(hands);
}


function drawHands(){
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];

      fill(255, 0, 255, 30); //color and look of circles
      noStroke();

      let draw_x = map(keypoint.x, 0, vid.width, width, 0);
      circle(keypoint.x, keypoint.y, 10);
    }
    
  }
}

function printFingerDataKey(){
  hands.forEach((hand, index) => {
    // each hand is an object, so Object.keys() gives us its property names
    // e.g. "keypoints", "handedness", "score", "index_finger_tip", ...
    for (let key of Object.keys(hand)) {
      // console.log(index, key);

      //only does fingers not the thumb
      if (key.includes("finger")){
        let finger = hand[key];

        //print coords
        // console.log("finger: ", key, "x: ", finger.x, "y: ", finger.y, "z: ", finger.z);
        // circle(finger.x, finger.y, 20);
      }
    }

  });
}

function alphabetDetection(){
  if (hands.length > 0){
    let hand = hands[0];
    for (let i = 0; i < hand.keypoints.length; i++){
      fill(255, 0 , 255, 100);
      noStroke();
      let keypoint = hand.keypoints[i];
      circle(keypoint.x, keypoint.y, 10);
      fill(0, 0, 255, 100);
      textSize(10);
      text(i, keypoint.x, keypoint.y);
    }

    let hand_center_x = (hand.index_finger_mcp.x + hand.pinky_finger_mcp.x) / 2;
    let hand_center_y = (hand.middle_finger_mcp.y + hand.wrist.y) / 2;
    fill(0, 0, 255, 100);
    noStroke();
    circle(hand_center_x, hand_center_y, 100);

    //--------------- TO DO ---------------
    // create facing forward bool based on average ranges for a hand facing forward
    // create a prediction model that takes the most commonly chosen signal over the period of 1 second, ex: 4/5 index_finger_half, 1/5 index_finger_down > index_finger_half == true
    // create an array holding finger movements per letter that can be printed to show what is happening for each hand movement
    // animated letters, j + z < figure out how to do this, maybe holding I or Y for an extended period of time turns them into J and Z?

    // textSize(controlSpecs()); //text size and color change with second hand -> hands[1]

    //CHANGING FROM HARD CODING

    let current_letter;

    let hand_forward = true;
    let hand_down = false;

    let index_finger_up = false;
    let index_finger_half = false;
    let index_finger_down = false;
    let middle_finger_up = false;
    let middle_finger_half = false;
    let middle_finger_down = false;
    let ring_finger_up = false;
    let ring_finger_half = false;
    let ring_finger_down = false;
    let pinky_finger_up = false;
    let pinky_finger_half = false;
    let pinky_finger_down = false;
    let thumb_out = false;
    let thumb_curled = false;
    let thumb_hook_middle = false;
    let thumb_hook_ring = false;
    let thumb_hook_pinky = false;

    //case hand sideways
    if (abs(hand.middle_finger_mcp.x - hand.pinky_finger_mcp.x) < 40){
      hand_forward = false;
    }

    //--------------- TO DO ---------------
    // ask kevin about every() method
    // let target = hand.keypoints[0].y
    // let hand_down = hand.keypoints.every(item => target < item.y);
    // console.log("--------------------------hand_down: " + hand_down);

    //case hand upside down
    //does not make sure it is smaller than *all* the items, only one at a time, affecting G and H recognition
    //needs to be the complete smallest y not just smaller than some y
    for (let i = 0; i < hand.keypoints.length; i++){
      let keypoint = hand.keypoints[i];
      if (hand.keypoints[0].y < keypoint.y){
        hand_down = true;
      }
    }

    //case index finger up
    if ((hand.index_finger_tip.y < hand.index_finger_dip.y) &&
        (hand.index_finger_dip.y < hand.index_finger_pip.y) &&
        (hand.index_finger_pip.y < hand.index_finger_mcp.y)){

      index_finger_up = true;
      // console.log("INDEX UP");
    }
    //case index finer half down
    else if ((dist(hand.index_finger_tip.x, hand.index_finger_tip.y, hand.index_finger_mcp.x, hand.index_finger_mcp.y) < 35)){

      index_finger_half = true;
      // console.log("INDEX HALF");
    }
    //case index finger down
    else{
      // ((hand.wrist.y - hand.index_finger_tip.y < 200) &&
      // (hand.index_finger_pip.y < hand.index_finger_dip.y) &&
      // (hand.index_finger_dip.y < hand.index_finger_tip.y))
      index_finger_down = true;
      // console.log("INDEX DOWN");
    }
    
    //case middle finger up
    if ((hand.middle_finger_tip.y < hand.middle_finger_dip.y) &&
        (hand.middle_finger_dip.y < hand.middle_finger_pip.y) &&
        (hand.middle_finger_pip.y < hand.middle_finger_mcp.y)){

      middle_finger_up = true;
      // console.log("MIDDLE UP");
    }
    //case middle finger half down
    else if ((dist(hand.middle_finger_tip.x, hand.middle_finger_tip.y, hand.middle_finger_mcp.x, hand.middle_finger_mcp.y) < 40)){

      middle_finger_half = true;
      // console.log("MIDDLE HALF");
    }
    //case middle finger down
    else{
      middle_finger_down = true;
      // console.log("MIDDLE DOWN");
    }

    //case ring finger up
    if ((hand.ring_finger_tip.y < hand.ring_finger_dip.y) &&
        (hand.ring_finger_dip.y < hand.ring_finger_pip.y) &&
        (hand.ring_finger_pip.y < hand.ring_finger_mcp.y)){

      ring_finger_up = true;
      // console.log("RING UP");
    }
    else if ((dist(hand.ring_finger_tip.x, hand.ring_finger_tip.y, hand.ring_finger_mcp.x, hand.ring_finger_mcp.y) < 45)){

      ring_finger_half = true;
      // console.log("RING HALF");
    }
    //case middle finger down
    else{
      ring_finger_down = true;
      // console.log("RING DOWN");
    }

    //case pinky finger up
    if ((hand.pinky_finger_tip.y < hand.pinky_finger_dip.y) &&
        (hand.pinky_finger_dip.y < hand.pinky_finger_pip.y) &&
        (hand.pinky_finger_pip.y < hand.pinky_finger_mcp.y)){
      
      pinky_finger_up = true;
      // console.log("PINKY UP");
    }
    else if ((dist(hand.middle_finger_tip.x, hand.middle_finger_tip.y, hand.middle_finger_mcp.x, hand.middle_finger_mcp.y) < 60)){

      pinky_finger_half = true;
      // console.log("PINKY HALF");
    }
    //case middle finger down
    else{
      pinky_finger_down = true;
      // console.log("PINKY DOWN");
    }

    //case thumb out
    if ((hand.thumb_tip.y < hand.thumb_ip.y) &&
        (hand.thumb_ip.y < hand.thumb_mcp.y) &&
        (hand.thumb_tip.x > hand.thumb_mcp.x) &&
        (hand.thumb_tip.x > hand.index_finger_pip.x)){

      thumb_out = true;
      // console.log("THUMB OUT");
    }

    //case thumb curled
    else if ((dist(hand.middle_finger_mcp.x, hand.middle_finger_mcp.y, hand.thumb_tip.x, hand.thumb_tip.y) < 50) &&
             (hand.thumb_tip.x < hand.thumb_ip.x)){

      thumb_curled = true;
      // console.log("THUMB CURLED");
    }

    //case thumb between index and middle
    else if ((hand.middle_finger_pip.x < hand.thumb_tip.x < hand.index_finger_pip.x) &&
             (abs(hand.thumb_tip.y - hand.index_finger_pip.y) < 15)){

      thumb_hook_middle = true;
      // console.log("THUMB HOOKED MIDDLE");
    }

    //case thumb hooked between middle and ring
    else if ((hand.ring_finger_pip.x < hand.thumb_tip.x && hand.thumb_tip.x < hand.middle_finger_pip.x) &&
             (abs(hand.thumb_tip.y - hand.middle_finger_pip.y) < 20)){

      thumb_hook_ring = true;
      // console.log("THUMB HOOKED RING");
    }

    //case thumb hooked between ring and pinky
    else if ((hand.pinky_finger_pip.x < hand.thumb_tip.x && hand.thumb_tip.x < hand.ring_finger_pip.x) &&
             (abs(hand.thumb_tip.y - hand.ring_finger_pip.y) < 25)){

      thumb_hook_pinky = true;
      // console.log("THUMB HOOKED PINKY");
    }


    //-------ALPHABET DETECTION-------

    if (hand_forward == true && hand_down == false){
      //case C, G, H, O, P, Q in hand_forwward == false

      //case A
      if (index_finger_down == true && middle_finger_down == true && ring_finger_down == true && pinky_finger_down == true && thumb_out == true){

        console.log("--- 'A' DETECTED");
        text('A', hand_center_x, hand_center_y);
        current_letter = 'A';
      }

      //case B
      else if (index_finger_up == true && middle_finger_up == true && ring_finger_up == true && pinky_finger_up == true && thumb_curled == true){

        console.log("--- 'B' DETECTED");
        text('B', hand_center_x, hand_center_y);
        current_letter = 'B';
      }

      //case D
      else if (index_finger_up == true && middle_finger_down == true && ring_finger_down == true && pinky_finger_up == false && thumb_curled == true){

        console.log("--- 'D' DETECTED");
        text('D', hand_center_x, hand_center_y);
        current_letter = 'D';
      }

      //case E < FIX HER < JUST NEED TO MOVE THUMB SLIGHTLY UPWARDS
      else if (index_finger_half == true && middle_finger_half == true && ring_finger_half == true && pinky_finger_half == true && thumb_curled == true){

        console.log("--- 'E' DETECTED");
        text('E', hand_center_x, hand_center_y);
        current_letter = 'E';
      }

      //case F
      else if (index_finger_half == true && middle_finger_up == true && ring_finger_up == true && pinky_finger_up == true){

        console.log("--- 'F' DETECTED");
        text('F', hand_center_x, hand_center_y);
        current_letter = 'F';
      }

      //case I
      else if (index_finger_up == false && middle_finger_up == false && ring_finger_up == false && pinky_finger_up == true && thumb_curled == true){

        console.log("--- 'I' DETECTED");
        text('I', hand_center_x, hand_center_y);
        current_letter = 'I';
      }

      //case J > special > super unsure how to do this tbh bc its animated movement
      
      //case K
      else if (index_finger_up == true && middle_finger_up == true && ring_finger_down == true && pinky_finger_down == true && thumb_curled == false &&
              (hand.middle_finger_pip.x < hand.thumb_tip.x && hand.thumb_tip.x < hand.index_finger_pip.x) && 
              (dist(hand.index_finger_tip.x, hand.index_finger_tip.y, hand.middle_finger_tip.x, hand.middle_finger_tip.y) > 50)){

        console.log("--- 'K' DETECTED");
        text('K', hand_center_x, hand_center_y);
        current_letter = 'K';
      }

      //case L
      else if (index_finger_up == true && middle_finger_down == true && ring_finger_down == true && pinky_finger_up == false && thumb_out == true){

        console.log("--- 'L' DETECTED");
        text('L', hand_center_x, hand_center_y);
        current_letter = 'L';
      }

      //case M
      else if (index_finger_up == false && middle_finger_up == false && ring_finger_up == false && pinky_finger_down == true && thumb_hook_pinky == true){
      
        console.log("--- 'M' DETECTED");
        text('M', hand_center_x, hand_center_y);
        current_letter = 'M';
      }

      //case N
      else if (index_finger_up == false && middle_finger_up == false && ring_finger_up == false && pinky_finger_up == false && thumb_hook_ring == true){
          
        console.log("--- 'N' DETECTED");
        text('N', hand_center_x, hand_center_y);
        current_letter = 'N';
      }

      //case R
      else if (pinky_finger_up == false && ring_finger_up == false && middle_finger_up == true && index_finger_up == true &&
              (hand.middle_finger_tip.x > hand.index_finger_tip.x) && thumb_out == false){
          
        console.log("--- 'R' DETECTED");
        text('R', hand_center_x, hand_center_y);
        current_letter = 'R';
      }

      //case S << FIX HER << OK WORKS BETTER WHEN FURTHER FROM CAMERA
      else if (index_finger_up == false && middle_finger_down == true && ring_finger_down == true && pinky_finger_up == false && thumb_out == false &&
              (dist(hand.ring_finger_tip.x, hand.ring_finger_tip.y, hand.ring_finger_dip.x, hand.ring_finger_dip.y) < 10) &&
              (dist(hand.pinky_finger_tip.x, hand.pinky_finger_tip.y, hand.pinky_finger_dip.x, hand.pinky_finger_dip.y) < 10)){
        
        console.log("--- 'S' DETECTED");
        text('S', hand_center_x, hand_center_y);
        current_letter = 'S';
      }

      //case T
      else if (index_finger_up == false && middle_finger_up == false && ring_finger_up == false && pinky_finger_up == false && thumb_hook_middle == true){
        
        console.log("--- 'T' DETECTED");
        text('T', hand_center_x, hand_center_y);
        current_letter = 'T';    
      }

      //case U
      else if (index_finger_up == true && middle_finger_up == true && ring_finger_up == false && pinky_finger_up == false && thumb_curled == true &&
              (dist(hand.index_finger_tip.x, hand.index_finger_tip.y, hand.middle_finger_tip.x, hand.middle_finger_tip.y) < 45)){
        
        console.log("--- 'U' DETECTED");
        text('U', hand_center_x, hand_center_y);  
        current_letter = 'U';
      }

      //case V
      else if (index_finger_up == true && middle_finger_up == true && ring_finger_up == false && pinky_finger_up == false && thumb_curled == true &&
              (dist(hand.index_finger_tip.x, hand.index_finger_tip.y, hand.middle_finger_tip.x, hand.middle_finger_tip.y) > 45)){
        
        console.log("--- 'V' DETECTED");
        text('V', hand_center_x, hand_center_y);  
        current_letter = 'V';
      }
      
      //case W
      else if (index_finger_up == true && middle_finger_up == true && ring_finger_up == true && pinky_finger_up == false && thumb_curled == false){
              
        console.log("--- 'W' DETECTED");
        text('W', hand_center_x, hand_center_y);  
        current_letter = 'W';
      }

      //case X
      else if (index_finger_down == false && middle_finger_up == false && ring_finger_up == false && pinky_finger_up == false && thumb_curled == true &&
              (dist(hand.index_finger_tip.x, hand.index_finger_tip.y, hand.index_finger_dip.x, hand.index_finger_dip.y) < 30)){
              
        console.log("--- 'X' DETECTED");
        text('X', hand_center_x, hand_center_y); 
        current_letter = 'X';             
      }

      //case Y
      else if (thumb_out == true && index_finger_up == false && middle_finger_up == false && ring_finger_up == false && pinky_finger_up == true){
          
        console.log("--- 'Y' DETECTED");
        text('Y', hand_center_x, hand_center_y);  
        current_letter = 'Y';
      }

      //case Z << not sure how to do with the animations

      else {
        console.log("NO LETTER DETECTED");
        current_letter = null;
      }
    }

    else if (hand_forward == false && hand_down == false) {
      //hand not facing forward
      // console.log("HAND NOT FACING FORWARDS");

      //case C > special case
      if ((dist(hand.index_finger_tip.x, hand.index_finger_tip.y, hand.middle_finger_tip.x, hand.middle_finger_tip.y) < 20) &&
         (dist(hand.middle_finger_tip.x, hand.middle_finger_tip.y, hand.ring_finger_tip.x, hand.ring_finger_tip.y) < 20) &&
         (abs(hand.thumb_tip.x - hand.middle_finger_tip.x) < 20) &&
         (abs(hand.thumb_tip.y - hand.middle_finger_tip.y) > 60) &&
         (hand.index_finger_tip.x > hand.index_finger_pip.x) &&
         (hand.middle_finger_tip.x > hand.middle_finger_pip.x) &&
         (hand.ring_finger_tip.x > hand.ring_finger_pip.x) &&
         (hand.pinky_finger_tip.x > hand.pinky_finger_pip.x)){

        console.log("--- 'C' DETECTED");
        text('C', hand_center_x, hand_center_y);
        current_letter = 'C';
      }

      //case G
      else if ((hand.index_finger_tip.x > hand.index_finger_dip.x) &&
              (hand.index_finger_dip.x > hand.index_finger_pip.x) &&
              (abs(hand.index_finger_tip.x - hand.middle_finger_mcp.x) > 40) &&
              (abs(hand.middle_finger_tip.x - hand.ring_finger_mcp.x) < 40) &&
              middle_finger_up == false &&
              ring_finger_up == false &&
              pinky_finger_up == false){
                
        console.log("--- 'G' DETECTED");
        text('G', hand_center_x, hand_center_y);
        current_letter = 'G';
      }

      //case H
      else if ((hand.index_finger_tip.x > hand.index_finger_dip.x) &&
              (hand.index_finger_dip.x > hand.index_finger_pip.x) &&
              (hand.middle_finger_tip.x > hand.middle_finger_dip.x) &&
              (hand.middle_finger_dip.x > hand.middle_finger_pip.x) &&
              (abs(hand.index_finger_tip.x - hand.middle_finger_mcp.x) > 40) &&
              (abs(hand.middle_finger_tip.x - hand.ring_finger_mcp.x) > 40) &&
              ring_finger_up == false &&
              pinky_finger_up == false){

        console.log("--- 'H DETECTED");
        text('H', hand_center_x, hand_center_y);
        current_letter = 'H';
      }

      //case O > similar to c but distance use pinch function to determine whether or not it is touching
      else if ((dist(hand.index_finger_tip.x, hand.index_finger_tip.y, hand.middle_finger_tip.x, hand.middle_finger_tip.y) < 40) &&
         (dist(hand.middle_finger_tip.x, hand.middle_finger_tip.y, hand.ring_finger_tip.x, hand.ring_finger_tip.y) < 40) &&
         (abs(hand.thumb_tip.x - hand.pinky_finger_tip.x) < 20) &&
         (abs(hand.thumb_tip.y - hand.pinky_finger_tip.y) < 20) &&
         (hand.index_finger_tip.x > hand.index_finger_pip.x) &&
         (hand.middle_finger_tip.x > hand.middle_finger_pip.x) &&
         (hand.ring_finger_tip.x > hand.ring_finger_pip.x) &&
         (hand.pinky_finger_tip.x > hand.pinky_finger_pip.x)){
        
        console.log("--- 'O' DETECTED");
        text('O', hand_center_x, hand_center_y);
        current_letter = 'O';
      }

      else {
        console.log("NO LETTER DETECTED");
        current_letter = null;
      }
    }

    else if (hand_down == true){
      //hand pointing downward
      // console.log("HAND FACING DOWNWARD");
  
      //case P
      if (ring_finger_up == false && pinky_finger_up == false &&
              (hand.index_finger_tip.y > hand.index_finger_pip.y) &&
              (hand.index_finger_pip.y > hand.index_finger_mcp.y) &&
              (hand.middle_finger_tip.y > hand.middle_finger_pip.y) &&
              (hand.middle_finger_pip.y > hand.middle_finger_mcp.y) &&
              (hand.middle_finger_pip.x < hand.thumb_tip.x) &&
              (hand.thumb_tip.x < hand.index_finger_pip.x)){

        console.log("--- 'P' DETECTED");
        text('P', hand_center_x, hand_center_y);
        current_letter = 'P';
      }
      
      //case Q
      else if (pinky_finger_up == false && ring_finger_up == false && middle_finger_up == false &&
              (hand.index_finger_tip.y > hand.index_finger_pip.y) &&
              (hand.index_finger_pip.y > hand.index_finger_mcp.y) &&
              (hand.thumb_tip.y > hand.thumb_ip.y) &&
              (hand.thumb_ip.y > hand.thumb_mcp.y) &&
              (dist(hand.thumb_tip.x, hand.thumb_tip.y, hand.index_finger_tip.x, hand.index_finger_tip.y) > 40)){
  
        console.log("--- 'Q' DETECTED");
        text('Q', hand_center_x, hand_center_y);
        current_letter = 'Q';
      }

      else {
        console.log("NO LETTER DETECTED");
        current_letter = null;
      }
    }

    //returns what letter is displayed, or null if no letter detected
    return current_letter;

  }
}

function controlSpecs(hand){
  if (hands.length > 1){
    let hand = hands[1];
    for (let i = 0; i < hand.keypoints.length; i++){
      fill(255, 0 , 255, 100);
      noStroke();
      let keypoint = hand.keypoints[i];
      circle(keypoint.x, keypoint.y, 10);
      fill(0, 0, 255, 100);
      textSize(10);
      text(i, keypoint.x, keypoint.y);
    }
    let index_finger =  hand.index_finger_tip;
    let thumb = hand.thumb_tip;

    let point_x = (index_finger.x + thumb.x) / 2;
    let point_y = (index_finger.y + thumb.y) / 2;
   
    //pinch distance > text size
    let pinch = dist(index_finger.x, index_finger.y, thumb.x, thumb.y);
    let text_sizing = (pinch + 10) * 5;

    fill(0, 0, 255);
    stroke(0);
    line(index_finger.x, index_finger.y, thumb.x, thumb.y);
    textSize(text_sizing) //text size and color change with second hand -> hands[1]

    //rotation > font choice
    //create an array where index 0 == text_sizing and index 1 == font

    return text_sizing;
  }
}

function handPress(letter){
  //press in > lock-in letter

  if (hands.length > 0 && letter){
    let hand = hands[0];
    
    let wrist = hand.wrist;
    let middle = hand.middle_finger_mcp;

    let scale_dist = dist(wrist.x, wrist.y, middle.x, middle.y);
    let threshold = 200;

    if (scale_dist > threshold){
      console.log("HAND PUSH FORWARD > SAVE LETTER");
      let hand_center_x = (hand.index_finger_mcp.x + hand.pinky_finger_mcp.x) / 2;
      let hand_center_y = (hand.middle_finger_mcp.y + hand.wrist.y) / 2;
      let current_size = 

      savedLetter(letter, true, hand_center_x, hand_center_y, );
      return true;
    }

    else {
      return false;
    }
  }
}

//may not need to put text_size or font here
//may remove all font functionality until I have time > function savedLetter(char, hand_pressed, x, y, text_size, font)
function savedLetter(char, hand_pressed, x, y, text_size, font){
  console.log("SAVE LETTER CALLED");

  if(hand_pressed == true){
    console.log("hand press");
    // console.log("CHARACTER: " + char);
    let add_letter = { character: char, x: }
    letters = [char, x, y];
    return true;
  }
  else {
    console.log("no hand press");
    return null;
  }

}