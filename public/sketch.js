
// KNN algorithm applied to drawing;
//TODO: Allow users to upload their own files;

var KClf;
var img;

function preload(){

// Initialize with a random image;

var i = int(random(0, 4)) + 1;
var filename = 'imgs/img0' + str(i) +'.jpg';
img = loadImage(filename, () => console.log("loaded!"));
}

function setup(){

  //Scale accordingly

  var scl = windowWidth * 1.0/1920;
  canvas = createCanvas(700 * scl, 700 * scl);
  canvas.parent("canvas");

  //Create slider controls for the various parameters;

  sliderk = createSlider(1, 20, 3, 1);
  sliderk.parent("slider1");

  slidernum = createSlider(10, 1000, 500, 2);
  slidernum.parent("slider2");

  button = createButton('RETRAIN KNN');
  button.mousePressed(newImg);
  button.parent("controls");

  checkbox = createCheckbox('Erase canvas', true);
  checkbox.parent("controls");

  sliderop = createSlider(2, 100, 10, 1);
  sliderop.parent("slider3");

  sliderbrush = createSlider(2, 100, 40, 1);
  sliderbrush.parent("slider4");

  sliderdyno = createSlider(0, 1, 0, 0.01);
  sliderdyno.parent("slider5");

  sliderjiggle = createSlider(0, 1, 0, 0.01);
  sliderjiggle.parent("slider6");

  //Tell the canvas to recognize only mouse positions over it;

  canvas.mouseMoved(moveCircle);

  background(0);
  img.resize(width, height);

  //Start with fixed values;
  reset(3, 500);
}

//Needed to detect the mouse movement;
function draw(){

}


function newImg(){

 //Choses a new image, when loaded restarts;

  var i = int(random(0, 4)) + 1;
  var filename = 'imgs/img0' + str(i) +'.jpg';
  img = loadImage(filename, restart, err => console.log(err));

}



function restart(){

  img.resize(width, height);
  var n = sliderk.value();
  var num_points = slidernum.value();
  reset(n, num_points);

}

function reset(k, num_points){
  if (checkbox.checked()){
  background(0);
}
  img.loadPixels();

  //New instance of the KNN class

  KClf = new KNNClf(k);

  for (var i = 0 ; i < num_points; i++){

    var vect = new p5.Vector(random(0, width), random(0, height));

    //Compue the pixel position on the image;

    var x = int(vect.x);
    var y = int(vect.y);
    var index = (x + y * width) * 4;

    var value = new p5.Vector(random(0, 255), random(0, 255), random(0, 255));

    // Not really using the alpha component, really...

    var value = new p5.Vector(float(img.pixels[index]), float(img.pixels[index + 1]), float(img.pixels[index + 2]), float(img.pixels[index + 3]));

    //Add example point to the KNN;

    KClf.addExample(vect, value);
  }
}

function moveCircle(){


    if (mouseIsPressed){
    vect = new p5.Vector(mouseX, mouseY);

    var output = KClf.predict(vect);

    //Used as dynamics parameter;

    var l = output.mag() * 0.1;

    l = sliderbrush.value() + sliderdyno.value() * constrain(l, 10, 100);

    noStroke();
    fill(output.x, output.y, output.z, sliderop.value());

    //Add jiggle;
    var x = mouseX + sliderjiggle.value() * random(-30, 30);
    var y = mouseY + sliderjiggle.value() * random(-30, 30);

    ellipse(x, y, l, l);
}
}
