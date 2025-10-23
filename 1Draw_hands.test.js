// Tests for functions in 1Draw_hands.js
// We will mock p5 global functions and provide minimal hand/face objects.

// Create lightweight globals used by the code
global.fill = jest.fn();
global.stroke = jest.fn();
global.strokeWeight = jest.fn();
global.beginShape = jest.fn();
global.vertex = jest.fn();
global.endShape = jest.fn();
global.CLOSE = 'CLOSE';
global.circle = jest.fn();
global.line = jest.fn();
global.push = jest.fn();
global.pop = jest.fn();
global.noStroke = jest.fn();
global.image = jest.fn();
global.imageMode = jest.fn();
global.CENTER = 'CENTER';
global.CORNER = 'CORNER';

// Provide a deterministic dist implementation
global.dist = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.hypot(dx, dy);
};

// Mocks for external data used inside drawConnections
global.connections = [ [0,1], [1,2] ];

// Inject the module under test by evaluating its content in this scope
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const filePath = path.join(__dirname, '1Draw_hands.js');
const code = fs.readFileSync(filePath, 'utf8');
vm.runInThisContext(code);

// Helper creators
function makeKeypoint(x, y) { return { x, y }; }

function makeHand(baseX = 100, baseY = 100, spread = 50) {
  return {
    wrist: makeKeypoint(baseX, baseY),
    thumb_tip: makeKeypoint(baseX - spread, baseY + spread),
    index_finger_tip: makeKeypoint(baseX + spread, baseY - spread),
    middle_finger_tip: makeKeypoint(baseX + spread, baseY - spread * 1.2),
    ring_finger_tip: makeKeypoint(baseX + spread * 0.8, baseY - spread * 0.8),
    pinky_finger_tip: makeKeypoint(baseX + spread * 0.6, baseY - spread * 0.6),
    keypoints: [makeKeypoint(baseX, baseY), makeKeypoint(baseX + 10, baseY + 10), makeKeypoint(baseX + 20, baseY + 20)]
  };
}

function makeFace(mouthOpenDistance = 5) {
  // keypoints[13] upperLip, [14] lowerLip
  return {
    keypoints: Array.from({ length: 15 }, (_, i) => makeKeypoint(0, 0)).map((kp, i) =>
      i === 13 ? makeKeypoint(100, 100) : i === 14 ? makeKeypoint(100, 100 + mouthOpenDistance) : kp
    )
  };
}

// Expose functions defined in 1Draw_hands.js from the global context
// Functions expected: starShape, var1StarShape, var2StarShape, pinchCircle, heartHandPuppet, drawConnections, drawPoints, checkIfMouthOpen, prepareInteraction, drawInteraction

describe('1Draw_hands.js behaviors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.showKeypoints = false;
    global.detectHandGesture = () => 'None';
    global.face = makeFace(5);
  });

  test('starShape draws an 8-vertex star with correct styling', () => {
    starShape(10, 20);
    expect(fill).toHaveBeenCalledWith(255, 219, 99, 150);
    expect(stroke).toHaveBeenCalledWith(255, 238, 181);
    expect(strokeWeight).toHaveBeenCalledWith(5);
    expect(beginShape).toHaveBeenCalled();
    // vertex called 8 times
    expect(vertex).toHaveBeenCalledTimes(8);
    expect(endShape).toHaveBeenCalledWith('CLOSE');
  });

  test('checkIfMouthOpen sets isMouthOpen based on lip distance threshold', () => {
    // small distance -> false
    checkIfMouthOpen(makeFace(5));
    expect(global.isMouthOpen).toBe(false);

    // large distance -> true
    checkIfMouthOpen(makeFace(20));
    expect(global.isMouthOpen).toBe(true);
  });

  test('pinchCircle draws a circle at midpoint with diameter equal to pinch distance', () => {
    const hand = makeHand(0, 0, 10);
    pinchCircle(hand);
    const finger = hand.index_finger_tip;
    const thumb = hand.thumb_tip;
    const expectedCenterX = (finger.x + thumb.x) / 2;
    const expectedCenterY = (finger.y + thumb.y) / 2;
    const expectedPinch = Math.hypot(finger.x - thumb.x, finger.y - thumb.y);

    expect(circle).toHaveBeenCalledWith(expectedCenterX, expectedCenterY, expectedPinch);
  });

  test('drawConnections draws lines for given connections when showKeypoints is true', () => {
    global.showKeypoints = true;
    const hand = makeHand();
    drawConnections(hand);
    expect(line).toHaveBeenCalledTimes(connections.length);
  });

  test('drawInteraction renders heart on open palm and stars on fingertips', () => {
    const hand = makeHand(50, 60, 20);
    global.detectHandGesture = () => 'Open Palm';
    prepareInteraction();
    // stub loadImage used in prepareInteraction
    global.loadImage = () => ({ id: 'heart' });

    drawInteraction([global.face], [hand]);

    // should draw fingertips stars (5 calls of starShape)
    // vertex called inside each starShape 8 times -> total 5*8 additional calls, but we assert starShape side effects via vertex count increase
    expect(vertex.mock.calls.length).toBeGreaterThanOrEqual(8 * 5);

    // Should set imageMode to CENTER then CORNER, and call image for heart
    expect(imageMode).toHaveBeenCalledWith('CENTER');
    expect(image).toHaveBeenCalled();
    expect(imageMode).toHaveBeenCalledWith('CORNER');
  });
});
