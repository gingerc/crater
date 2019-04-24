//client side code
//dreamy editing

var socket;
var msg = document.getElementById('inputMsg');
var notif = document.getElementById('notif');
var btn = document.getElementById('btn');
var username = document.getElementById('inputName');

var inputR;
var inputG;
var inputB;
var stationNum;

var shape = " ";
var size = " ";
var AstroidName = document.getElementById('asteroidName');
var storedName = " ";
var stationColor = " ";
var AstIndex;
var Velocity;

function setup() {
  // createCanvas(400, 400);
  // background(20);
  socket = io.connect();  //connect to the open socket

  //b4.when this client receives data called "notif", do showNotif()
  socket.on('notif', showNotif);
}

function showNotif(data){

  notif.innerHTML = data;
  notif.style.color = color(random(255),100,255);
}

 //this function triggers the web client to send data to the server
function sendData(){

  var data = {
    name: storedName,
    r:inputR,
    g:inputG,
    b:inputB,
    n:stationNum,
    a: AstIndex,
    v: Velocity
  }


  //1.sending data called "new message" including data to server
  socket.emit('new message', data);
  console.log(data);
}



//HTML chores

function goToShape(){
  $("#startScreen").css("display", "none");
  $(".shapeContainer").css("display", "inline-block");
}

function shape1selected(){
   shape = "shape1";

}

function shape2selected(){
  shape = "shape2";
}

function shape3selected(){
  shape = "shape3";
}

function goToSize(){
  if (shape == " "){
    alert("Please choose a shape");
    return false;
  } else{
    $(".shapeContainer").css("display", "none");
    $(".sizeContainer").css("display", "inline-block");
  }

}

function size1selected(){
  size = "size1";

}

function size2selected(){
 size = "size2";
}

function size3selected(){
 size = "size3";
}

function goToName(){
  if (size == " "){
    alert("Please choose a size");
    return false;
  } else{
  $(".sizeContainer").css("display", "none");
  $(".nameContainer").css("display", "inline-block");
  }
}

function goToStation(){

  if (AstroidName.value.length == 0){
    alert("Please name your asteroid");
    return false;
  } else {
    storedName = AstroidName.value;
    $(".nameContainer").css("display", "none");
    $(".launchStationContainer").css("display", "inline-block");
  }

}

function station1selected(){
   //btn.style.backgroundColor= "#4ECDC4";
   stationColor ="#4ECDC4";
   stationNum = "1";
   //color of asteroid trail
   inputR = "78";
   inputG = "205";
   inputB = "196";
   $("#shoot").css("background-color", stationColor);
}
function station2selected(){
   //btn.style.backgroundColor= "#F7FFF7"; //247,255,247
   stationNum = "2";
   stationColor = "#F7FFF7";
   inputR = "247";
   inputG = "255";
   inputB = "247";
   $("#shoot").css("background-color", stationColor);
}
function station3selected(){
   //btn.style.backgroundColor= "#FF6B6B"; //255, 107, 107
   stationColor = "#FF6B6B";
   stationNum = "3";
   inputR = "255";
   inputG = "107";
   inputB = "107";
   $("#shoot").css("background-color", stationColor);
}
function station4selected(){
   //btn.style.backgroundColor= "#FFE66D";//255,230,109
   stationColor = "#FFE66D";
   stationNum = "4";
   inputR = "255";
   inputG = "230";
   inputB = "109";
   $("#shoot").css("background-color", stationColor);
}
function station5selected(){
   //btn.style.backgroundColor= "#5BC0EB";//198,61,92
   stationColor = "#5BC0EB";
   stationNum = "5";
   inputR = "91";
   inputG = "192";
   inputB = "235";
   $("#shoot").css("background-color", stationColor);
}

function goToShoot(){
  if (stationColor == " "){
    $("#shoot").attr("disabled", true);
    alert("Please Choose a station");
    return false;
  } else {
    $("#shoot").attr("disabled", false);
    $(".launchStationContainer").css("display", "none");
    $(".launchPage").css("display", "inline-block");
    $("#shoot").css("background-color", stationColor);
    $("#triangle").css("border-bottom", "solid 130px " + stationColor);
    $("#stationNum").text(stationNum);

    $("#insertName").html("\"" + storedName +"\"");
    decideShapes();
  }

}

function decideShapes(){

   if(shape == "shape1" && size == "size1" ){
    AstIndex = "1";  //circular small
   }
   if(shape == "shape1" && size == "size2" ){
    AstIndex = "2";  //circular medium
   }
   if(shape == "shape1" && size == "size3" ){
    AstIndex = "3";  //circular big
   }
   if(shape == "shape2" && size == "size1" ){
    AstIndex = "4";  //irregular small
   }
   if(shape == "shape2" && size == "size2" ){
    AstIndex = "5";  //irregular medium
   }
   if(shape == "shape2" && size == "size3" ){
    AstIndex = "6";  //irregular big
   }
   if(shape == "shape3" && size == "size1" ){
    AstIndex = "7";  //long small
   }
   if(shape == "shape3" && size == "size2" ){
    AstIndex = "8";  //long medium
   }
   if(shape == "shape3" && size == "size3" ){
    AstIndex = "9";  //long large
   }

}

var touchstartX;
var touchstartY;
var touchendX;
var touchendY;
var startTime;
var elapsedTime;
var dist;

var gesuredZone = document.getElementById('swipeZone');

gesuredZone.addEventListener('touchstart', function(event) {
    //touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
    startTime = new Date().getTime();
}, false);

gesuredZone.addEventListener('touchend', function(event) {
   // touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    elapsedTime = (new Date().getTime() - startTime)/100;
    console.log("time: "+elapsedTime);
    dist = abs(touchendY-touchstartY);
    console.log("distance: " + dist);
    handleGesure();
}, false);

function handleGesure() {
    var swiped = 'swiped: ';
    if (touchendY < touchstartY) {
      //calculate speed = distance/time
      var speed =  Math.floor( dist/elapsedTime );
      var vel = Math.floor(map(speed, 3, 200, 5, 50));
      Velocity = vel.toString();
      console.log(swiped + 'up!' + " speed: " + Velocity);
      sendData();
    }
    if (touchendY > touchstartY) {
      //wrong direction, don't register as shoot
      console.log(swiped + 'down!');
    }
    if (touchendY == touchstartY) {
      console.log('tap!');
    }
}



function draw() {
//  background(20);


}
