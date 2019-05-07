// One rogue
// define the core variables for the maze

g.createMap();
g.drawMap();
g.addObjects(objsPerLevel);
char.placePlayer();

clearConsole();
consoleLog("Welcome To One Rogue");
consoleLog("Good look on your quest to find the amulet of lledyob in the heart of the Mahkcep mountains.");
consoleLog("A far superior item to the amulet of Yendor!!");
char.describeLocal();

function preAction(){  
    busy = true;
    clearConsole();

    //check if any of the monsters move first

}
function action(){  

}
function postAction(){ 
    busy = false; 
    // check if any other monsters move


    //reset monster movement


    // describe the location
    char.describeLocal();

}

function isBusy(){
    return !busy;
}




