// ----=  HANDS  =----
function prepareInteraction() {
  //bgImage = loadImage('/images/background.png');
}

function drawInteraction(faces, hands) {

  // hands part
  // USING THE GESTURE DETECTORS (check their values in the debug menu)
  // detectHandGesture(hand) returns "Pinch", "Peace", "Thumbs Up", "Pointing", "Open Palm", or "Fist"

  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    if (showKeypoints) {
      drawPoints(hand)
      drawConnections(hand)
    }

    //////////////////// Variables //////////////////////

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

    // let sizeOfEllipse = dist(middleFingerTipX, middleFingerTipY, wristX, wristY) / 2;

    //==============================================
    
      //face variables

      // let eyeRight = face.rightEye;
      
      ////////////////////////////////////////////
      
      //heart! - make this so it appears when the palm is open?
    imageMode(CENTER);
    image(heartImage, middleOfHandX, middleOfHandY, sizeOfImage, sizeOfImage);
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
  //end of hand drawing for loop
}

  //------------------------------------------------------------
  //facePart
  // for loop to capture if there is more than one face on the screen. This applies the same process to all faces. 
  //------------------------------------------------------
  // You can make addtional elements here, but keep the face drawing inside the for loop. }

  //drawing the star shapes! Main star first
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

//Variation 1 star - pink (for thumbs up + peace sign)
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

//Variation 2 star - pink (for thumbs up + peace sign)
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

//other variation - heart hand puppet
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


// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
function drawPoints(feature) {

  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 5);
  }
  pop()

}