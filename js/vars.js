// set up variables and constants

var mw = 48;  // maze width
var mh = 48;  // maze height
var cs = 24;  // size of a cell on the canvas
var constDir = .0; // percentage chance of maintaining the same direction
var joinPC = 1;
var sideAvoidPC = 0;
var forwardAvoidPC = 0;
var deadEndPC = 0;
var deadSidesPC = 0;
var roomPC = 0;

var cx = 24;
var cy = 24;


// create the game canvas
var canvas = document.createElement("CANVAS");
canvas.width = cs*mw;
canvas.height = cs*mh;
var ctx = canvas.getContext("2d");

// make a maze image
//var maze = document.createElement("img");

var gridDIV = document.getElementById("grid");
gridDIV.appendChild(canvas);
setCanvasOrigin(cx,cy);

window.addEventListener("resize", setCanvasOrigin);

//const cWallTop = red;

//colours
const colSolid = "#737188";
const colWall = "#555555";
const colDarkSolid = "#444444";
const colVeryDarkSolid = "#444444";

const colOpenMed = "#9894A3"
const colOpenLight = "#848387"
const colOpenDark = "#5D5C60"

console.log('vars');


// utility functions library

function getRandom(min, max){
    r = Math.floor(Math.random()*(max - min)+min);
    return r;
}

function shuffleArray(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

function setCanvasOrigin(){
   
   let xo = -cx * cs + window.innerWidth/2;

   let yo = - cy * cs + window.innerHeight/2;

  document.getElementById("grid").style.left = xo+"px";
  document.getElementById("grid").style.top = yo+"px";

  console.log(xo,yo);

   
}


