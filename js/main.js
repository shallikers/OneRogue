// One rogue
// define the core variables for the maze

g.createMap();
g.drawMap();
g.addObjects(objsPerLevel);
char.placePlayer();

for(let i=0; i<5; i++){
    makeMonster("worker ant");
    makeMonster("fire ant");
    makeMonster("giant ant");
    makeMonster("soldier ant");
    makeMonster("wasp");
    

}

clearConsole();
consoleLog("Welcome To One Rogue");
consoleLog("Good look on your quest to find the amulet of lledyob in the heart of the Mahkcep mountains.");
consoleLog("A far superior item to the amulet of Yendor!!");
char.describeLocal();

function preAction(){  
    busy = true;
    clearConsole();
}


function postAction(){ 
    busy = false; 
    // check if any other monsters move

    //check if any of the monsters move first


    // describe the location
    char.describeLocal();

}


function animate(){
    moving = true;
    let stepCount=0;
    var id = setInterval(animframe,animTime/animSteps);
    function animframe() {
        stepCount++;
        if (stepCount>animSteps) {
            if(stepCount>animLastStep){
                clearInterval(id);
                moving=false;
                setCanvasOrigin(char._nx,char._ny)
                keepMovingCheck();
                return; // we have finished doing all frame animation
            }
        
        }
        else{
            char.calculateCanvasOffset(stepCount);
            setCanvasOrigin(char._xoff,char._yoff)

            // move the monsters - first call their redraws then their new draws
            for(let i=mons.length-1;i>=0; i--){
                if(mons[i]._moving) mons[i].redrawObjBackground();
            }  
            
            //console.log(mons[1]._name, mons[1]._x, mons[1]._y,mons[1]._dx, mons[1]._dy,mons[1]._nx, mons[1]._ny,mons[1]._xoff, mons[1]._yoff);

            for(let i=0; i< mons.length; i++){
                mons[i].move(stepCount);
            }    
        }
    }
}




function cleanUp(){ 

}

function isBusy(){
    return !busy;
}




