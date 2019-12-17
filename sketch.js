let canvas;
let canvasWidth = 700;
let canvasHeight = 700;

var objet,guide,me,ground;
let serial;
var data;
let CollideObjet =false;

function setup() {
	 serial = new p5.SerialPort();
	 let portlist = serial.list();
	  serial.open("/dev/cu.usbserial-1410");
	  serial.on('connected', serverConnected);
	  serial.on('data', gotData);
	  serial.on('error', gotError);
	  serial.on('open', gotOpen);


 	 canvas = createCanvas(canvasWidth, canvasHeight);
  	 canvas.position(windowWidth/2 - canvasWidth/2, 20);
	 drawMe();
	 drawGround();
	 drawObjet();
}

function draw() {
	 background(69,173,168);
	 drawSprites();
	 moveObjet();
	 if(serial.available()>0){
	 	data = serial.read();
	 }
	 var serealRead = createDiv(data);
	 serealRead.position(10,10);
}

function drawMe(){
	 me = createSprite(canvasWidth/2,canvasHeight/2,100,100);
	 me.immovable = true;
	 me.shapeColor = color(255);
}

function drawGround(){
	 ground= createSprite(canvasWidth/2,canvasHeight/2+100,canvasWidth,100);
	 ground.immovable = true;
	 ground.setCollider('rectangle');
	 ground.shapeColor = color(200);
}

function drawObjet(){
	 objet= createSprite(700,canvasHeight/2,100,100);
	 objet.setCollider('rectangle');
	 objet.shapeColor = color(200);
}
function moveObjet(){
	 objet.position.x--;
}

function createGuide(){
	 guide = createSprite(canvasWidth/2,height/2+300,canvasWidth,height/2);
}




//시리얼


// We are connected and ready to go
function serverConnected() {
    print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  let currentString = serial.readStringUntil("\r\n");
  console.log(currentString);
}
