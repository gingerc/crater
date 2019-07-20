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

var composition = " ";
var size = " ";
var AstroidName = document.getElementById('asteroidName');
var storedName = " ";
var stationColor = " ";
var CraterIndex = " ";
var Velocity;
var rockSize;

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
    v: Velocity,
    s: rockSize.toString(),
    c: CraterIndex
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

var slider = document.getElementById("myRange");
var output = document.getElementById("sizeValue");
var iconSize = 30;
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  rockSize = slider.value;
}

function asteroidSelected(){
   composition = "asteroid";
   $("#myRange").attr("min", "1");
   $("#myRange").attr("max", "80");
   $("#compositionInfo").html("An asteroid is made of clay and rocks!");
   $("#cometOrAsteroid").html("Asteroid");
   $("#cometOrAsteroid2").html("Asteroid");
   $("#cometOrAsteroid3").html("Asteroid");
   $("#cometOrAsteroid4").html("Asteroid");
   $("#cometOrAsteroid5").html("Asteroid");
}

function cometSelected(){
  composition = "comet";
  $("#myRange").attr("min", "1");
  $("#myRange").attr("max", "40");
  $("#compositionInfo").html("A comet is made of ice and dust!")
  $("#cometOrAsteroid").html("Comet");
  $("#cometOrAsteroid2").html("Comet");
  $("#cometOrAsteroid3").html("Comet");
  $("#cometOrAsteroid4").html("Comet");
  $("#cometOrAsteroid5").html("Comet");
}


function goToSize(){
  if (composition == " "){
    alert("Please choose a comet or asteroid!");
    return false;
  } else{
    $(".shapeContainer").css("display", "none");
    $(".sizeContainer").css("display", "inline-block");
  }

}


function goToName(){
  if (slider.value == " "){
    alert("Please choose the size of your impactor!");
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
   goToShoot();
}
function station2selected(){
   //btn.style.backgroundColor= "#F7FFF7"; //247,255,247
   stationNum = "2";
   stationColor = "#F7FFF7";
   inputR = "247";
   inputG = "255";
   inputB = "247";
   $("#shoot").css("background-color", stationColor);
   goToShoot();
}
function station3selected(){
   //btn.style.backgroundColor= "#FF6B6B"; //255, 107, 107
   stationColor = "#FF6B6B";
   stationNum = "3";
   inputR = "255";
   inputG = "107";
   inputB = "107";
   $("#shoot").css("background-color", stationColor);
   goToShoot();
}
function station4selected(){
   //btn.style.backgroundColor= "#FFE66D";//255,230,109
   stationColor = "#FFE66D";
   stationNum = "4";
   inputR = "255";
   inputG = "230";
   inputB = "109";
   $("#shoot").css("background-color", stationColor);
   goToShoot();
}
function station5selected(){
   //btn.style.backgroundColor= "#5BC0EB";//198,61,92
   stationColor = "#5BC0EB";
   stationNum = "5";
   inputR = "91";
   inputG = "192";
   inputB = "235";
   $("#shoot").css("background-color", stationColor);
   goToShoot();
}

function goToShoot(){
  if (stationColor == " "){
    $("#shoot").attr("disabled", true);
    alert("Please Choose a trajectory");
    return false;
  } else {
    $("#shoot").attr("disabled", false);
    $(".launchStationContainer").css("display", "none");
    $(".launchPage").css("display", "inline-block");
    $("#shoot").css("background-color", stationColor);
    // $("#triangle").css("border-bottom", "solid 130px " + stationColor);
    var arr=['green.png','white.png','red.png','yellow.png','blue.png'];
    $("#stationNum").css('background-image','url(images/'+arr[stationNum-1]+')');

    var color_arr = ['#4ECDC4','#F7FFF7','#FF6B6B','#FFE66D','#5BC0EB']
    $("#insertName").html("\"" + storedName +"\"");
    $("#insertName").css('color',color_arr[stationNum-1]);

    // decideShapes();
  }
}

function decideCrater(){
//decide what parameters output to what kind of crater
   if(composition == "comet" && rockSize <= 3 ){
    //Shackleton
    CraterIndex = "1";
    $("#craterName").html("Shackleton (21 km)");
    $("#craterImage").attr('src', 'images/Shackleton.jpg');
    $("#CraterInfo").html("Scientists call craters like Shackleton “a crater of eternal darkness” because the interior is perpetually kept in shadow.");
   }
   if(composition == "comet" && rockSize <= 7 && rockSize > 3 ){
    CraterIndex = "2";  //circular medium
    $("#craterName").html("Aristarchus");
    $("#craterImage").attr('src', 'images/Aristarchus.jpg');
    $("#CraterInfo").html("Aristarchus is special for its high reflectance rays, making it one of the brightest formations on the moon’s surface. It can even be viewed with the naked eye in some circumstances!");
   }
   if(composition == "comet" && rockSize <= 11 && rockSize > 7  ){
    CraterIndex = "3";  //circular big
    $("#craterName").html("Descartes (48 km)");
    $("#craterImage").attr('src', 'images/Descartes.jpg');
    $("#CraterInfo").html("Descartes is a crater with several curved ridges at its interior, whereas the outer rim is missing in certain areas. Descartes is notably famous for being about 50 km south of the Apollo 16 moon landing site!");
   }
   if(composition == "comet" && rockSize <= 15 && rockSize > 11 ){
    CraterIndex = "4";  //irregular small
    $("#craterName").html("Tycho (86 km)");
    $("#craterImage").attr('src', 'images/Tycho.png');
    $("#CraterInfo").html("Tycho is a crater that’s around 108 million years old, making it one of the younger craters on the moon. The rays coming from Tycho can actually be seen from Earth!");
   }
   if(composition == "comet" && rockSize <= 19 && rockSize > 15 ){
    CraterIndex = "5";  //irregular medium
    $("#craterName").html("Aristoteles (87 km)");
    $("#craterImage").attr('src', 'images/Aristoteles.jpg');
    $("#CraterInfo").html("Aristoteles is unique for having an almost hexagonal shape because of its complex terraces at the inner walls.");
   }
   if(composition == "comet" && rockSize <= 23 && rockSize > 19 ){
    CraterIndex = "6";  //irregular big
    $("#craterName").html("Piccolomini (88 km)");
    $("#craterImage").attr('src', 'images/Piccolomini.jpg');
    $("#CraterInfo").html("Piccolomini was formed over 3 billion years ago, and at the center of the crater is a peak that rises about 2 km above the floor around it. ");
   }
   if(composition == "comet" && rockSize <= 28 && rockSize > 23 ){
    CraterIndex = "7";  //long small
    $("#craterName").html("Schiller (179 x 71 km)");
    $("#craterImage").attr('src', 'images/Schiller.jpg');
    $("#CraterInfo").html("Schiller looks unique because it may actually be a fusion of two craters, resulting in an elongated shape that looks a lot like an oval.");
   }
   if(composition == "comet" && rockSize <= 34 && rockSize > 28 ){
    CraterIndex = "8";  //long medium
    $("#craterName").html("Orientale (294 km) ");
    $("#craterImage").attr('src', 'images/Orientale.jpg');
    $("#CraterInfo").html("Orientale is a lunar mare, which are large dark plains on the moon’s surface caused by volcanic eruptions. The initial collision that formed orientale caused a ripple effect, resulting in three concentric circles that make Orientale look a bit like a target ring.");
   }
   if(composition == "comet" && rockSize <= 40 && rockSize > 34 ){
    CraterIndex = "9";  //long large
    $("#craterName").html("Schrödinger (312 km)");
    $("#craterImage").attr('src', 'images/Schrodinger.jpg');
    $("#CraterInfo").html("Schrödinger is considered to be an impact basin due to its large size and concentric rings.This crater is particularly unique because it actually shows evidence of recent volcanic activity!");
   }
  //Asteroids
   if(composition == "asteroid" && rockSize <= 7 ){
    //Shackleton
    CraterIndex = "1";
    $("#craterName").html("Shackleton (21 km)");
    $("#craterImage").attr('src', 'images/Shackleton.jpg');
    $("#CraterInfo").html("Scientists call craters like Shackleton “a crater of eternal darkness” because the interior is perpetually kept in shadow.");
   }
   if(composition == "asteroid" && rockSize <= 16 && rockSize > 7 ){
    CraterIndex = "2";  //circular medium
    $("#craterName").html("Aristarchus");
    $("#craterImage").attr('src', 'images/Aristarchus.jpg');
    $("#CraterInfo").html("Aristarchus is special for its high reflectance rays, making it one of the brightest formations on the moon’s surface. It can even be viewed with the naked eye in some circumstances!");
   }
   if(composition == "asteroid" && rockSize <= 25 && rockSize > 16  ){
    CraterIndex = "3";  //circular big
    $("#craterName").html("Descartes (48 km)");
    $("#craterImage").attr('src', 'images/Descartes.jpg');
    $("#CraterInfo").html("Descartes is a crater with several curved ridges at its interior, whereas the outer rim is missing in certain areas. Descartes is notably famous for being about 50 km south of the Apollo 16 moon landing site!");
   }
   if(composition == "asteroid" && rockSize <= 34 && rockSize > 25 ){
    CraterIndex = "4";  //irregular small
    $("#craterName").html("Tycho (86 km)");
    $("#craterImage").attr('src', 'images/Tycho.png');
    $("#CraterInfo").html("Tycho is a crater that’s around 108 million years old, making it one of the younger craters on the moon. The rays coming from Tycho can actually be seen from Earth!");
   }
   if(composition == "asteroid" && rockSize <= 43 && rockSize > 34 ){
    CraterIndex = "5";  //irregular medium
    $("#craterName").html("Aristoteles (87 km)");
    $("#craterImage").attr('src', 'images/Aristoteles.jpg');
    $("#CraterInfo").html("Aristoteles is unique for having an almost hexagonal shape because of its complex terraces at the inner walls.");
   }
   if(composition == "asteroid" && rockSize <= 52 && rockSize > 43 ){
    CraterIndex = "6";  //irregular big
    $("#craterName").html("Piccolomini (88 km)");
    $("#craterImage").attr('src', 'images/Piccolomini.jpg');
    $("#CraterInfo").html("Piccolomini was formed over 3 billion years ago, and at the center of the crater is a peak that rises about 2 km above the floor around it. ");
   }
   if(composition == "asteroid" && rockSize <= 61 && rockSize > 52 ){
    CraterIndex = "7";  //long small
    $("#craterName").html("Schiller (179 x 71 km)");
    $("#craterImage").attr('src', 'images/Schiller.jpg');
    $("#CraterInfo").html("Schiller looks unique because it may actually be a fusion of two craters, resulting in an elongated shape that looks a lot like an oval. ");
   }
   if(composition == "asteroid" && rockSize <= 70 && rockSize > 61 ){
    CraterIndex = "8";  //long medium
    $("#craterName").html("Orientale (294 km) ");
    $("#craterImage").attr('src', 'images/Orientale.jpg');
    $("#CraterInfo").html("Orientale is a lunar mare, which are large dark plains on the moon’s surface caused by volcanic eruptions. The initial collision that formed orientale caused a ripple effect, resulting in three concentric circles that make Orientale look a bit like a target ring.");
   }
   if(composition == "asteroid" && rockSize <= 80 && rockSize > 70 ){
    CraterIndex = "9";  //long large
    $("#craterName").html("Schrödinger (312 km)");
    $("#craterImage").attr('src', 'images/Schrodinger.jpg');
    $("#CraterInfo").html("Schrödinger is considered to be an impact basin due to its large size and concentric rings.This crater is particularly unique because it actually shows evidence of recent volcanic activity! ");
   }

}


//replay
function Replay(){
  location.reload();
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
      if (speed > 3 ){
        var vel = Math.floor(map(speed, 3, 200, 10, 40));
        Velocity = vel.toString();
        console.log(swiped + 'up!' + " speed: " + Velocity);
        $("#loading").css("display","inherit");
        decideCrater();
        sendData();
        var timeleft = 3;
        var downloadTimer = setInterval(function(){
         timeleft -= 1;
        if(timeleft <= 0){
            clearInterval(downloadTimer);
            if (vel < 17 || vel > 100){
              $("#loading").css("display","none");
              $("#launchMessage").html("Oops you missed! <br> Try Again!");
              $(".launchPage").css("display", "inline-block");
            }
            // else if (stationNum === "2" && (vel < 15 || vel > 28)){
            //   $("#loading").css("display","none");
            //   $("#launchMessage").html("Oops you missed! <br> Try Again!");
            //   $(".launchPage").css("display", "inline-block");
            // }
            // if (stationNum === "3" && (vel < 15 || vel > 28)){
            //   $("#loading").css("display","none");
            //   $("#launchMessage").html("Oops you missed! <br> Try Again!");
            //   $(".launchPage").css("display", "inline-block");
            // }
            // if (stationNum === "4" && (vel < 15 || vel > 28)){
            //   $("#loading").css("display","none");
            //   $("#launchMessage").html("Oops you missed! <br> Try Again!");
            //   $(".launchPage").css("display", "inline-block");
            // }
            // if (stationNum === "5" && (vel < 15 || vel > 28)){
            //   $("#loading").css("display","none");
            //   $("#launchMessage").html("Oops you missed! <br> Try Again!");
            //   $(".launchPage").css("display", "inline-block");
            // }
            else {
              $("#loading").css("display","none");
              $("#infoPage").css("display","inherit");
            }
          }
          }, 1000);
        }

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


function LearnMore(){
  if (CraterIndex == "1"){
    window.location.replace("Shackleton.html");
  }
  if (CraterIndex == "2"){
    window.location.replace("Aristarchus.html");
  }
  if (CraterIndex == "3"){
    window.location.replace("Descartes.html");
  }
  if (CraterIndex == "4"){
    window.location.replace("Tycho.html");
  }
  if (CraterIndex == "5"){
    window.location.replace("Aristoteles.html");
  }
  if (CraterIndex == "6"){
    window.location.replace("Piccolomini.html");
  }
  if (CraterIndex == "7"){
    window.location.replace("Schiller.html");
  }
  if (CraterIndex == "8"){
    window.location.replace("Orientale.html");
  }
  if (CraterIndex == "9"){
    window.location.replace("Schrodinger.html");
  }
}

function draw() {
//  background(20);


}

$('.shapea').click(function(){
  if($(this).index('.shapea')==0){
    $('.shapea').css('background-image','url(images/composition_comet_grey.png)');
    $(this).css('background-image','url(images/composition_asteroid.png)');
  }else{
    $('.shapea').css('background-image','url(images/composition_asteroid_grey.png)');
    $(this).css('background-image','url(images/comet_composition.png)');
  }
});
