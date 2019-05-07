// set up variables and constants

var mw = 40;  // maze width
var mh = 40;  // maze height
var cs = 32;  // size of a cell on the canvas
var charsize = 16; // size of the character graphic
var constDir = 0; // percentage chance of maintaining the same direction
var joinPC = 1;
var sideAvoidPC = 1;
var forwardAvoidPC = 0;
var deadEndPC = 0;
var deadSidesPC = .5;
var roomPC = .6;
var objectOffset = Math.floor(cs/6);

var objsPerLevel = 30;

var cx = 24;
var cy = 24;
var moving = false;
var keepMoving = false;

var animTime = 200;

// create the game canvas
var canvas = document.createElement("CANVAS");
canvas.width = cs*mw;
canvas.height = cs*mh;
var ctx = canvas.getContext("2d");

// create the highlight canvas
var hlc = document.getElementById("hlc");
var hlctx = hlc.getContext("2d");
hlctx.scale(4,4);

// creat the transfer canvas
var tc = document.createElement("CANVAS");
tc.width = cs;
tc.height = cs;
var tctx = tc.getContext("2d");

//transfer image
var tim = document.createElement("img");
tim.id = "tim";
tim.height = 32;
tim.width = 32;

// make a maze image
//var maze = document.createElement("img");
var gridDIV = document.getElementById("grid");
document.getElementById("grid").appendChild(canvas);

//file paths
itemsPath = "img/items/";


// instrument element events



// direction events
document.getElementById("dir1").addEventListener("mousedown",function(){keepMoving=true; char.moveDir1()});
document.getElementById("dir2").addEventListener("mousedown",function(){keepMoving=true; char.moveDir2()});
document.getElementById("dir3").addEventListener("mousedown",function(){keepMoving=true; char.moveDir3()});
document.getElementById("dir4").addEventListener("mousedown",function(){keepMoving=true; char.moveDir4()});
//document.getElementById("dir5").addEventListener("mousedown",function(){keepMoving=true; char.moveDir5()});
document.getElementById("dir6").addEventListener("mousedown",function(){keepMoving=true; char.moveDir6()});
document.getElementById("dir7").addEventListener("mousedown",function(){keepMoving=true; char.moveDir7()});
document.getElementById("dir8").addEventListener("mousedown",function(){keepMoving=true; char.moveDir8()});
document.getElementById("dir9").addEventListener("mousedown",function(){keepMoving=true; char.moveDir9()});

document.body.addEventListener("mouseup",function(){keepMoving = false});



//colours
const colSolid = "#737188";
const colWall = "#555555";
const colDarkSolid = "#444444";
const colVeryDarkSolid = "#444444";

const colOpenMed = "#9894A3"
const colOpenLight = "#848387"
const colOpenDark = "#5D5C60"
const colOpenGrav = "#707070"

const colButtonHighlight = "#008080"

// game objects

// Map Object Helpers

// parameter pass for draw
var drawObjs = new Array;



//console.log("construct grid");
var g = new grid();

//construct the item library
var il = new itemLibrary();

//var mos = new Array();

//console.log("construct player");
var char = new player();



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

function anCheck(text){
    switch (text[0]) {
        case 'a','e','i','o','u' : return 'n ';
        default: return ' ';
    }
}


function getImagePortion(imgObj, newWidth, newHeight, startX, startY, ratio){
    /* the parameters: - the image element - the new width - the new height - the x point we start taking pixels - the y point we start taking pixels - the ratio */
    //set up canvas for thumbnail
    var tnCanvas = document.createElement('canvas');
    var tnCanvasContext = canvas.getContext('2d');
    tnCanvas.width = newWidth; tnCanvas.height = newHeight;
    
    /* use the sourceCanvas to duplicate the entire image. This step was crucial for iOS4 and under devices. Follow the link at the end of this post to see what happens when you don’t do this */
    var bufferCanvas = document.createElement('canvas');
    var bufferContext = bufferCanvas.getContext('2d');
    bufferCanvas.width = imgObj.width;
    bufferCanvas.height = imgObj.height;
    bufferContext.drawImage(imgObj, 0, 0);
    
    /* now we use the drawImage method to take the pixels from our bufferCanvas and draw them into our thumbnail canvas */
    tnCanvasContext.drawImage(bufferCanvas, startX,startY,newWidth * ratio, newHeight * ratio,0,0,newWidth,newHeight);
    return tnCanvas.toDataURL();
   }
