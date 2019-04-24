// set up variables and constants

var mw = 40;  // maze width
var mh = 40;  // maze height
var cs = 32;  // size of a cell on the canvas
var constDir = .0; // percentage chance of maintaining the same direction
var joinPC = 1;
var sideAvoidPC = 0;
var forwardAvoidPC = 0;
var deadEndPC = 0;
var deadSidesPC = 0;
var roomPC = 0;

var cx = 24;
var cy = 24;
var moving = false;
var keepMoving = true;

// var imChars = new Image;
// var imChar = new Image;
// imChars.src =  "img/Player1.png"
// imChars.addEventListener('load', function() {
//     // execute drawImage statements here
//     imChar = getImagePortion(imChars, 16,16,80,0,1);
//   }, false);




// create the game canvas
var canvas = document.createElement("CANVAS");
canvas.width = cs*mw;
canvas.height = cs*mh;
var ctx = canvas.getContext("2d");

// make a maze image
//var maze = document.createElement("img");
var gridDIV = document.getElementById("grid");
gridDIV.appendChild(canvas);

// instrument element events



// direction events
document.getElementById("dir1").addEventListener("mousedown",function(){char.moveDir1()});
document.getElementById("dir2").addEventListener("mousedown",function(){char.moveDir2()});
document.getElementById("dir3").addEventListener("mousedown",function(){char.moveDir3()});
document.getElementById("dir4").addEventListener("mousedown",function(){char.moveDir4()});
document.getElementById("dir5").addEventListener("mousedown",function(){char.moveDir5()});
document.getElementById("dir6").addEventListener("mousedown",function(){char.moveDir6()});
document.getElementById("dir7").addEventListener("mousedown",function(){char.moveDir7()});
document.getElementById("dir8").addEventListener("mousedown",function(){char.moveDir8()});
document.getElementById("dir9").addEventListener("mousedown",function(){char.moveDir9()});

document.getElementById("dir1").addEventListener("mouseup",function(){keepMoving = false});
document.getElementById("dir2").addEventListener("mouseup",function(){keepMoving = false});
document.getElementById("dir3").addEventListener("mouseup",function(){keepMoving = false});
document.getElementById("dir4").addEventListener("mouseup",function(){keepMoving = false});
document.getElementById("dir5").addEventListener("mouseup",function(){keepMoving = false});
document.getElementById("dir6").addEventListener("mouseup",function(){keepMoving = false});
document.getElementById("dir7").addEventListener("mouseup",function(){keepMoving = false});
document.getElementById("dir8").addEventListener("mouseup",function(){keepMoving = false});
document.getElementById("dir9").addEventListener("mouseup",function(){keepMoving = false});


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
