// set up variables and constants

var mw = 50;  // maze width
var mh = 50;  // maze height
var cs = 8;  // size of a cell on the canvas


// create the game canvas
var canvas = document.createElement("CANVAS");
canvas.width = cs*mw;
canvas.height = cs*mh;
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

//const cWallTop = red;


console.log('vars');


// utility functions library

function getRandom(min, max){
    return Math.random*(max - min)+min;
}
