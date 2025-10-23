// ----=  HANDS  =----
/* load images here */
let heartImage;
function prepareInteraction() {
  //bgImage = loadImage('/images/background.png');
  heartImage = loadImage('/images/heart.png');
}

let isMouthOpen = false;
function drawInteraction(face, hands) {
  // hands part
  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    //console.log(hand);
    if (showKeypoints) {
      drawConnections(hand)
    }
    // This is how to load in the x and y of a point on the hand.

    /////////////////////////////////////////////////////

    //wrist (for centring ellipse/heart image)
    let wristX = hand.wrist.x;
    let wristY = hand.wrist.y;

    //thumb
    let thumbTipX = hand.thumb_tip.x;
    let thumbTipY = hand.thumb_tip.y;

    //index finger
    let indexFingerTipX = hand.index_finger_tip.x;
    let indexFingerTipY = hand.index_finger_tip.y;

    //middle finger
    let middleFingerTipX = hand.middle_finger_tip.x;
    let middleFingerTipY = hand.middle_finger_tip.y;

    //ring finger
    let ringFingerTipX = hand.ring_finger_tip.x;
    let ringFingerTipY = hand.ring_finger_tip.y;

    //pinky finger
    let pinkyFingerTipX = hand.pinky_finger_tip.x;
    let pinkyFingerTipY = hand.pinky_finger_tip.y;

  //variables for middle of hand heartImage
    let middleOfHandX = (middleFingerTipX + wristX) / 2; //finding middle between wrist and middle finger tip

    let middleOfHandY = (middleFingerTipY + wristY) / 2;

    let sizeOfImage = dist(middleFingerTipX, middleFingerTipY, wristX, wristY) / 1.5;

    //////////////////////////////////////////
   // Start drawing on the hands here
  ///////////////////////////////////////////

  //adding gesture recognition for additional stars
      let whatGesture = detectHandGesture(hand)

    if (whatGesture == "Thumbs Up") {
      var1StarShape(thumbTipX + 30, thumbTipY + 20);
      var2StarShape(thumbTipX - 30, thumbTipY + 30);
    }
    if (whatGesture == "Peace") {
      var1StarShape(indexFingerTipX + 40, indexFingerTipY + 20);
      var2StarShape(indexFingerTipX - 30, indexFingerTipY + 40);
      var1StarShape(middleFingerTipX - 30, middleFingerTipY + 40);
      var2StarShape(middleFingerTipX + 40, middleFingerTipY - 20);
    }

    //making heart shape appear only when the palm is open
    if (whatGesture == "Open Palm") {
    imageMode(CENTER);
    image(heartImage, middleOfHandX, middleOfHandY, sizeOfImage, sizeOfImage);
    // also adding some extra sparkles on some fingers for more majestic sparklyness
    var2StarShape(ringFingerTipX - 40, ringFingerTipY - 30);

    var2StarShape(indexFingerTipX - 30, indexFingerTipY + 40);

    var2StarShape(pinkyFingerTipX - 30, pinkyFingerTipY + 30);

    var1StarShape(indexFingerTipX + 30, indexFingerTipY - 30);

    var1StarShape(middleFingerTipX - 30, middleFingerTipY - 40);

    var1StarShape(thumbTipX - 30, thumbTipY + 30);

    }
   /////////////////////////////////////////////////
    imageMode(CORNER);
    //thumb starShape
    starShape(thumbTipX, thumbTipY);
    // var1StarShape(thumbTipX + 30, thumbTipY + 20);
    // var2StarShape(thumbTipX - 30, thumbTipY + 30);

    //index finger starShape
    starShape(indexFingerTipX, indexFingerTipY);
    // starShape(indexFingerTipX+ 30, indexFingerTipY + 20);
    // starShape(indexFingerTipX - 30, indexFingerTipY + 30);

    //middle finger starShape
    starShape(middleFingerTipX, middleFingerTipY);
    // starShape(middleFingerTipX+ 30, middleFingerTipY + 20);
    // starShape(middleFingerTipX - 30, middleFingerTipY + 30);

    //ring finger starShape
    starShape(ringFingerTipX, ringFingerTipY);
    // starShape(ringFingerTipX+ 30, ringFingerTipY + 20);
    // starShape(ringFingerTipX - 30, ringFingerTipY + 30);

    //pinky finger starShape
    starShape(pinkyFingerTipX, pinkyFingerTipY);
    // starShape(pinkyFingerTipX+ 30, pinkyFingerTipY + 20);
    // starShape(pinkyFingerTipX - 30, pinkyFingerTipY + 30);

    //heartHandPuppet(hand);

     //drawPoints(hand);
  }
////////// end of hand drawing for loop ///////////
///////////////// face movement! //////////////////

  // for loop to capture if there is more than one face on the screen. This applies the same process to all faces. 
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; // face holds all the keypoints of the face\
    console.log(face);
    if (showKeypoints) {
      drawPoints(face)
    }

      //////////// face variables //////////////
      // Left eye
    let leftEyeCenterX = face.leftEye.centerX;
    let leftEyeCenterY = face.leftEye.centerY;
    let leftEyeWidth = face.leftEye.width;
    let leftEyeHeight = face.leftEye.height;

        // Right eye
    let rightEyeCenterX = face.rightEye.centerX;
    let rightEyeCenterY = face.rightEye.centerY;
    let rightEyeWidth = face.rightEye.width;
    let rightEyeHeight = face.rightEye.height;

    //hands variables needed repeated to make below work:
    //middle finger
    let middleFingerTipX = hand.middle_finger_tip.x;
    let middleFingerTipY = hand.middle_finger_tip.y;

    //wrist (for centring ellipse/heart image)
    let wristX = hand.wrist.x;
    let wristY = hand.wrist.y;

    //variables for middle of eyes heartImage when mouth is opened - also scaling with hands open/close!

    let sizeOfEyeImage = dist(upperLip.x, upperLip.y, lowerLip.x, lowerLip.y);
    
    ////////////////////////////////////////////////
//mouth open = heart image interaction!
  checkIfMouthOpen(face);
  if (isMouthOpen == true) {
    imageMode(CENTER);
    image(heartImage, leftEyeCenterX, leftEyeCenterY, sizeOfEyeImage, sizeOfEyeImage);
    image(heartImage, rightEyeCenterX, rightEyeCenterY, sizeOfEyeImage, sizeOfEyeImage);
  }
  imageMode(CORNER);
}
}

function checkIfMouthOpen(face) {

  let upperLip = face.keypoints[13]
  let lowerLip = face.keypoints[14]
  // ellipse(lowerLip.x,lowerLip.y,20)
  // ellipse(upperLip.x,upperLip.y,20)

  let d = dist(upperLip.x, upperLip.y, lowerLip.x, lowerLip.y);
  //console.log(d)
  if (d < 10) {
    isMouthOpen = false;
  } else {
    isMouthOpen = true;
  }
}
function starShape(x, y) {
  fill(255, 219, 99, 150);
  stroke(255, 238, 181);
  strokeWeight(5);

  beginShape();
  vertex(x, y + 30);
  vertex(x + 7.5, y + 7.5);
  vertex(x + 30, y);
  vertex(x + 7.5, y - 7.5);
  vertex(x, y - 30);
  vertex(x - 7.5, y - 7.5);
  vertex(x - 30, y);
  vertex(x - 7.5, y + 7.5);
  
  endShape(CLOSE);
}

function var1StarShape(x, y) {
  fill(241, 153, 193, 150);
  stroke(250, 211, 228);
  strokeWeight(2.5);

  beginShape();
  vertex(x, y + 15);
  vertex(x + 3.5, y + 3.5);
  vertex(x + 15, y);
  vertex(x + 3.5, y - 3.5);
  vertex(x, y - 15);
  vertex(x - 3.5, y - 3.5);
  vertex(x - 15, y);
  vertex(x - 3.5, y + 3.5);
  
  endShape(CLOSE);
}

function var2StarShape(x, y) {
  fill(128, 232, 255, 150);
  stroke(186, 242, 255);
  strokeWeight(3.5);

  beginShape();
  vertex(x, y + 20);
  vertex(x + 5, y + 5);
  vertex(x + 20, y);
  vertex(x + 5, y - 5);
  vertex(x, y - 20);
  vertex(x - 5, y - 5);
  vertex(x - 20, y);
  vertex(x - 5, y + 5);
  
  endShape(CLOSE);
}
function pinchCircle(hand) { // adapted from https://editor.p5js.org/ml5/sketches/DNbSiIYKB
  // Find the index finger tip and thumb tip
  let finger = hand.index_finger_tip;
  //let finger = hand.pinky_finger_tip;
  let thumb = hand.thumb_tip;

  // Draw circles at finger positions
  let centerX = (finger.x + thumb.x) / 2;
  let centerY = (finger.y + thumb.y) / 2;
  // Calculate the pinch "distance" between finger and thumb
  let pinch = dist(finger.x, finger.y, thumb.x, thumb.y);

  // This circle's size is controlled by a "pinch" gesture
  fill(0, 255, 0, 200);
  stroke(0);
  strokeWeight(2);
  circle(centerX, centerY, pinch);

}

function heartHandPuppet(hand) {
  //pinky finger and thumb tip?

  let finger = hand.pinky_finger_tip; // this finger now contains the x and y infomation! you can access it by using finger.x 
  let thumb = hand.index_finger_tip;

  // Draw circles at finger positions
  let centerX = (finger.x + thumb.x) / 2;
  let centerY = (finger.y + 75 + thumb.y + 75) / 2;
  // Calculate the pinch "distance" between finger and thumb
  let pinch = dist(finger.x, finger.y, thumb.x, thumb.y);

  // This circle's size is controlled by a "pinch" gesture
  fill(255, 173, 211, 150);
  stroke(0);
  strokeWeight(2);
  circle(centerX, centerY, pinch);

}

// function chameleonHandPuppet(hand) {
//   // Find the index finger tip and thumb tip
//   // let finger = hand.index_finger_tip;

//   let finger = hand.middle_finger_tip; // this finger now contains the x and y infomation! you can access it by using finger.x 
//   let thumb = hand.thumb_tip;

//   // Draw circles at finger positions
//   let centerX = (finger.x + thumb.x) / 2;
//   let centerY = (finger.y + thumb.y) / 2;
//   // Calculate the pinch "distance" between finger and thumb
//   let pinch = dist(finger.x, finger.y, thumb.x, thumb.y);

//   // This circle's size is controlled by a "pinch" gesture
//   fill(0, 255, 0, 200);
//   stroke(0);
//   strokeWeight(2);
//   circle(centerX, centerY, pinch);

//   let indexFingerTipX = hand.index_finger_tip.x;
//   let indexFingerTipY = hand.index_finger_tip.y;
//   fill(0)
//   circle(indexFingerTipX, indexFingerTipY, 20);

//}

function drawConnections(hand) {
  // Draw the skeletal connections
  push()
  for (let j = 0; j < connections.length; j++) {
    let pointAIndex = connections[j][0];
    let pointBIndex = connections[j][1];
    let pointA = hand.keypoints[pointAIndex];
    let pointB = hand.keypoints[pointBIndex];
    stroke(255, 0, 0);
    strokeWeight(2);
    line(pointA.x, pointA.y, pointB.x, pointB.y);
  }
  pop()
}


// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
function drawPoints(feature) {
  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 10);
  }
  pop()

}