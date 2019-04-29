//client side code

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
    $("#craterName").html("Aristoteles (87 km)");
    $("#craterImage").attr('src', 'images/Aristoteles.jpg');
    $("#CraterInfo").html("The size and shape of your crater is really similar to our moon’s crater Aristoteles! Aristoteles is unique for having an almost hexagonal shape because of its complex terraces at the inner walls.");
   }
   if(shape == "shape1" && size == "size2" ){
    AstIndex = "2";  //circular medium
    $("#craterName").html("Longomontanus (145 km)");
    $("#craterImage").attr('src', 'images/Longomontanus.jpg');
    $("#CraterInfo").html("The shape and size of your crater is really similar to our moon’s crater Longomontanus! Craters like Longomontanus are referred to as “walled plains” because they don’t have a central peak and are generally quite flat throughout.");
   }
   if(shape == "shape1" && size == "size3" ){
    AstIndex = "3";  //circular big
    $("#craterName").html("Bailly (303 km)");
    $("#craterImage").attr('src', 'images/Bailly.jpg');
    $("#CraterInfo").html("The size and shape of your crater is really similar to the Moon’s own crater Bailly! Bailly is the largest crater on the near side of the moon at around 303 km in diameter. The sheer size of Bailly makes it home to many other craters.");
   }
   if(shape == "shape2" && size == "size1" ){
    AstIndex = "4";  //irregular small
    $("#craterName").html("Picard (23 km)");
    $("#craterImage").attr('src', 'images/Picard.jpg');
    $("#CraterInfo").html("Your crater was 23 km in diameter, which is really similar to our moon’s crater Piccolomini!The crater is located in a lunar mare (plains formed by volcanic eruptions) called “Mare Crisium” and is the largest non-flooded crater in that area.");
   }
   if(shape == "shape2" && size == "size2" ){
    AstIndex = "5";  //irregular medium
    $("#craterName").html("Piccolomini (88 km)");
    $("#craterImage").attr('src', 'images/Piccolomini.jpg');
    $("#CraterInfo").html("Your crater was 88 km in diameter, which is really similar to our moon’s crater Piccolomini! Piccolomini was formed over 3 billion years ago, and at the center of the crater is a peak that rises about 2 km above the floor around it.");
   }
   if(shape == "shape2" && size == "size3" ){
    AstIndex = "6";  //irregular big
    $("#craterName").html("Clavius (231 km)");
    $("#craterImage").attr('src', 'images/Clavius.jpg');
    $("#CraterInfo").html("Your crater was around 231 km in diameter, that’s about as big as our own moon’s crater: Clavius! Clavius is one of the largest craters on the Moon, and also one of the oldest. This crater in particular was probably formed around 4 billion years ago!");
   }
   if(shape == "shape3" && size == "size1" ){
    AstIndex = "7";  //long small
    $("#craterName").html("Shackleton (21 km)");
    $("#craterImage").attr('src', 'images/Shackleton.jpg');
    $("#CraterInfo").html("The size of this crater is really similar to our moon’s crater Shackleton! Scientists call craters like Shackleton “a crater of eternal darkness” because the interior is perpetually kept in shadow.");
   }
   if(shape == "shape3" && size == "size2" ){
    AstIndex = "8";  //long medium
    $("#craterName").html("Tycho (86 km)");
    $("#craterImage").attr('src', 'images/Tycho.png');
    $("#CraterInfo").html("Your crater on the moon-like object is around 86 km in diameter, which is really similar to our moon’s crater Tycho! Tycho is a crater that’s around 108 million years old, making it one of the younger craters on the moon.");
   }
   if(shape == "shape3" && size == "size3" ){
    AstIndex = "9";  //long large
    $("#craterName").html("Schiller (179 x 71 km)");
    $("#craterImage").attr('src', 'images/Schiller.jpg');
    $("#CraterInfo").html("The size and shape of your asteroid is really similar to our moon’s crater Schiller! Schiller looks unique because it may actually be a fusion of two craters, resulting in an elongated shape that looks a lot like an oval.");
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
      $("#loading").css("display","inherit");
      sendData();
      var timeleft = 3;
      var downloadTimer = setInterval(function(){
       timeleft -= 1;
      if(timeleft <= 0){
          clearInterval(downloadTimer);
          $("#loading").css("display","none");
          $("#infoPage").css("display","inherit");
        }
        }, 1000);
      }
    if (touchendY > touchstartY) {
      //wrong direction, don't register as shoot
      console.log(swiped + 'down!');
    }
    if (touchendY == touchstartY) {
      console.log('tap!');
    }
}

function countdownTimer(){
  var timeleft = 3;
  var downloadTimer = setInterval(function(){
     timeleft -= 1;
    if(timeleft <= 0){
      clearInterval(downloadTimer);
        $("#loading").css("display","none");
        $("#infoPage").css("display","inherit");
      }
  }, 300);
}


  
function draw() {
//  background(20);


}
