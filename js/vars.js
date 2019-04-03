// set up variables and constants

var mw = 32;  // maze width
var mh = 64;  // maze height
var cs = 16;  // size of a cell on the canvas
var constDir = .6; // percentage chance of maintaining the same direction
var joinPC = 0;
var sideAvoidPC = 1;
var forwardAvoidPC = .3;
var deadEndPC = .1;
var deadSidesPC = 0;
var roomPC = 0.6;


// create the game canvas
var canvas = document.createElement("CANVAS");
canvas.width = cs*mw;
canvas.height = cs*mh;
var ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

//const cWallTop = red;

//colours
const colSolid = "#004400";
const colWall = "#006600";
const colDarkSolid = "#002200";
const colVeryDarkSolid = "#000000";

const colOpenMed = "#00CCCC"
const colOpenLight = "#00FFFF"
const colOpenDark = "#00AAAA"

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
