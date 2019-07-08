let yPos = 0;
let R = 100; // 100 ohm
let C = 0.1; // 0.1 F

setup = () => {
  createCanvas(400, 400);
  // frameRate(30);
};

draw = () => {
  background(200);

  noFill();
  stroke(0);
  beginShape();
  var last = 0;
  var lastV = 0;
  for (let x = 0; x < width; x++) {
    var seconds = map(x, 0, width, 0, 1.1);
    var vin = vsquare(seconds, 0.1, 1.0, 5.0, 0.5);
    seconds = seconds <= 0.1 ? 0 : seconds - 0.1;
    var output = vdc(seconds, last, lastV);
    y = map(output, 0, 10, height, 0);
    vertex(x, y);
    last = output;
    lastV = vin;
  }
  endShape();
};

vdc = (t, lout, lvin) =>
  lout * exp(-t / (R * C)) + lvin * (1 - exp(-t / (R * C))); //discrete

vu = (t, initial, amplitude) => (t >= initial ? amplitude : 0.0);
vsquare = (t, initial, max, amplitude, step) =>
  new Array(floor(max / step), 1)
    .map((el, index) =>
      index % 2 === 0 ? (index + 1) * step * max + initial : 0
    )
    .reduce((acc, cur) => acc || cur >= t, false)
    ? amplitude
    : 0.0;
