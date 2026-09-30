// change the quotes in this array. Be mindful of the quotation marks!
// this is the only part of the file you need to edit!
const quotes = [
  { text: "a term we use to describe the computer programming software and people that make expressive art and design through code.", source: "Maura Kelly" },
  { text: "a new interdisciplinary art form that bridges the gap between technologists and artists.", source: "Ahmad Moussa" },
  { text: "a discovery-based process consisting of exploration, iteration, and reflection, using code as a primary medium, towards a media artefact designed for an artistic context.", source: "Mark C. Mitchell and Oliver Bown" },
  { text: "the practice of making art with code.", source: "Andrew Bryant" },
  { text: "at its heart, creative coding is the practice of using computer programming as a medium for artistic and personal expression.", source: "Laura Valtere" },
  { text: "the practice of combining programming techniques with artistic expression in order to create aesthetically pleasing and optimized interactive digital experiences.", source: "SMU, Meadows School of the Arts" },
  { text: "an approach to programming computers in which the primary goal is to create an aesthetic or expressive experience.", source: "The College of New Jersey" },
  { text: "a place where experience in the field of design, love of explorative creativity and skills as a programmer come together.", source: "Patrik Hübnern" }
];
// no need to edit anything below this line! 
// if you have made an error, you can check your history to see what might have gone wrong

// a variable tht holds the current quote
let current = [];

function setup() {
  console.log("QUOTES ARRAY:", quotes)
  // console.log("QUOTE INDEX 1 TEXT:", quotes[1].text)
  createCanvas(windowWidth, windowHeight);
  randomSeed(millis());
  pickQuote(); // calls the function to pick a quote
}

function pickQuote() {
  // take a random number and use that to identify what quote to 
  let random_num = Math.floor(Math.random() * quotes.length);
  current = quotes[random_num];
  console.log("CURRENT ITEM:", current);
}

function draw() {
  background(8, 127, 140);
  drawQuote(); // draw the quote on screen
}

function drawQuote() {
  // draw text
  fill(224, 255, 251);
  textAlign(CENTER, CENTER);
  text("creative coding is.....", width / 2, height / 2 - 48);
  textSize(18);
  textStyle(ITALIC);
  text("“" + current.text + "”", width / 2, height / 2);
  textAlign(RIGHT, CENTER);
  text("-" + current.source, width - 100, height - 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newQuote() {
  pickQuote();
  redraw();
}

function mousePressed() {
  newQuote();
}