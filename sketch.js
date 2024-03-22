// multiple objects independent motion demo
// https://editor.p5js.org/whatmakeart/sketches/FL3ovdqGD

// fun ideas to add
// use lerp() to make the fill() of each pebble change as it moves
// have the size change during the motion
// give each pebble a different rate of change

let pebbles = []; // create an array to hold the pebble objects
let motionRangeX; // ammount of motion allowed in x direction
let motionRangeY; // ammount of motion alloued in y direction

// create the Pebble class
class Pebble {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    // set firt targetY to y plus a random value
    this.targetY = y + random(-motionRangeY, motionRangeY);
    // set firt targetX to x plus a random value
    this.targetX = x + random(-motionRangeX, motionRangeX);
  }

  // new method to show pebble
  showPebble() {
    circle(this.x, this.y, this.size);
  }

  // method tomove the pebble to new position
  movePebble() {
    // move toward the targetY using linear interpolation for smoother movement
    // third parameter is the percentage movement per step
    // higher numbers make faster movement so 0.5 is much faster than 0.05
    this.y = lerp(this.y, this.targetY, 0.02);
    // move toward the targetX using linear interpolation
    this.x = lerp(this.x, this.targetX, 0.02);

    // update the targetY and targetX to keep the pebble moving rather than just moving once to the target coordinates
    // use conditional to check if absolute value of this.y - this.targetY is less than 1
    // this determines if it made it to the target yet
    // if it is at the target, then make a new target, otherwise, keep going to current target.
    // https://p5js.org/reference/#/p5/abs
    if (abs(this.y - this.targetY) < 1) {
      this.targetY = this.y + random(-motionRangeY, motionRangeY); // new targetY
      // put target in canvas if object is outside of canvas
      if (this.y < 0 || this.y > height) {
        this.targetY = random(height/5,height/1.2);
      }
    }
    if (abs(this.x - this.targetX) < 1) {
      this.targetX = this.x + random(-motionRangeX, motionRangeX); // new targetX
        // put target in canvas if object is outside of canvas
      if (this.x < 0 || this.x > width) {
        this.targetX = random(width/5,width/1.2);
      }
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  motionRangeX = width / 4;
  motionRangeY = width / 4;
  // make 50 new pebble objects at random locations with sizes between 10 and 50
  for (i = 0; i < 50; i++) {
    pebbles.push(new Pebble(random(width), random(height), random(10, 50)));
  }
}

function draw() {
  background(220);
  for (let i = 0; i < pebbles.length; i++) {
    pebbles[i].showPebble();
    pebbles[i].movePebble();
  }
}

// built in p5.js resize function
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
