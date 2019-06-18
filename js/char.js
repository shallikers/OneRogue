console.log("init char");

var vuChar = new Vue ({
    el: '#charData',
    data: {name: 'fred', health: '50:50', fatigue: '50:50', magic: '50:50', experience: '50:50'  }
   
})

class player {
    constructor(){
        console.log("construct char");    
    
        this._x = Math.floor(mw/2);
        this._y = Math.floor(mh/2);

        this._nx = this._x;
        this._ny = this._y;

        this._xoff = this._x;
        this._yoff = this._y;

        this._bounce = false;
        this._moved = true;
        this._hit = false;
    
        this._dx = 0;
        this._dy = 0;
    
        this._mHealth = 100;
        this._mMagic = 150;
        this._mFatigue = 200;
        this._mExperience = 2000
    
        this._health = this._mHealth;
        this._magic = this._mMagic;
        this._fatigue = this._mFatigue
        this._experience = 0;

        this._created = false;
        this._charName = "Decimaster"


        // boolean character behaviour toggles
        this._autoPickup = false;
        
        this.updatePlayerView()
    }

    drawPlayer()
    {
        if (!this._created){

        }
        
    }

    updatePlayerView()
    {
        vuChar.name = this._charName;
        vuChar.health = this._health + " / " + this._mHealth;
        vuChar.magic = this._magic + " / " + this._mMagic;
        vuChar.fatigue = this._fatigue + " / " + this._mFatigue;
        vuChar.experience = this._experience + " / " + this._mExperience;
    }

    placePlayer()
    {
        this._x = Math.floor(mw/2);
        this._y = Math.floor(mh/2);
        let i = 0;
        for(i=0; (i<20)&&(!g.isOpen(this._x,this._y)) ;i++){
            console.log("move to find open space");
            this._x+=getRandom(-1,1);
            this._y+=getRandom(-1,1);
        }
        //console.log(this._x, this._y, g.isOpen(this._x,this._y));
        setCanvasOrigin(this._x, this._y);
        this._nx = this._x;
        this._ny = this._y;
    }

    moveDir1(){this.move(-1,-1);}
    moveDir2(){this.move(0,-1);}
    moveDir3(){this.move(1,-1);}
    moveDir4(){this.move(-1,0);}
    moveDir5(){this.move(0,0);}
    moveDir6(){this.move(1,0);}
    moveDir7(){this.move(-1,1);}
    moveDir8(){this.move(0,1);}
    moveDir9(){this.move(1,1);}

    repeatMove(){
        this.move(this._dx,this._dy);
    }

    move(dx,dy){
        // do not do move moving if already moving this means the animation is in process
        if (moving) return;

        // clean up from previous move        // clean up monsters activity
        for(let i=0; i< mons.length; i++){
            mons[i].cleanUp();
        }

        // clean up the client
        this._xoff = this._nx;
        this._yoff = this._ny;
        this._x = this._nx;
        this._y = this._ny;




        // call game loop pre actions
        preAction();

        this._dx = dx;
        this._dy = dy;
        this._nx = this._x;
        this._ny = this._y;
        this._bounce = false;
        this._hit = false;
        if (dx == 0 && dy ==0) this._moved = false; else this._moved = true;
        
        // move the monsters - later this will be the faster monsters
        for(let i=0; i< mons.length; i++){
            mons[i].planMove();
        }

        // plan the characters move

        // establish where we are thinking about going to
        let tx = this._x + this._dx;
        let ty = this._y + this._dy;

        // see if it is a solid wall or if a monster is here

        if (!g.isOpen(tx,ty)) {
            this._moved = false;
            this._nx = this._x;
            this._ny = this._y;
            this._bounce = true;
            this._hit = false;
            consoleLog("You bumped into a wall");
        }
        else if(monHere(tx,ty) ){
            this._moved = false;
            this._nx = this._x;
            this._ny = this._y;
            this._bounce = true;
            this._hit = true;
            consoleLog("You hit the monster"); // to be updated later

        }
        else { // there is a free space to move into
            this._moved = true;
            this._nx = tx;
            this._ny = ty;
            this._bounce = false;
            this._hit = false;  
        } 
        
        // this is where we will plan the slower monsters move


        // animate the move
        //console.log("start aninmation", this._x, this._y, this._dx, this._dy, this._nx, this._ny, this._bounce);
        animate();


        // cary out post move actions on the monsters
     


        
    }

    calculateCanvasOffset(step){
        // animate the first half of the frames when the character always moves forwards
        this._xoff = this._x;
        this._yoff = this._y;
        if(!this._bounce)
        {
            this._xoff = this._x + this._dx *  step/animSteps;
            this._yoff = this._y + this._dy *  step/animSteps;           
        }
        else
        {
            if(step <= animSteps/2 || !this._bounce){ 
                this._xoff = this._x + this._dx * step/animSteps/2;
                this._yoff = this._y + this._dy * step/animSteps/2;               
            }
            else{
                this._xoff = this._x + this._dx * (animSteps - step)/animSteps/2;
                this._yoff = this._y + this._dy * (animSteps - step)/animSteps/2;                   
            }
        }

        //console.log(this._bounce, this._x, this._y, this._nx, this._ny, this._xoff, this._yoff);
    }

    postMove(){

    }

    describeLocal(){
        // if there is a potion in the square remove it
        let item = g.getItem(this._x,this._y);
         if (item == null){
             if (this._autoPickup){
                vuPickUp.text = "autoPick: On"
             } else {
                vuPickUp.text = "autoPick: Off"
            }
            
         } else {
            let t= item.describe();
            consoleLog("You see a" + anCheck(t) + t);
            if (this._autoPickup){
                item.pickUp();
            }
            else{
                vuPickUp.text = "Pick Up"
            }
       }
    }

    interactWithLocal(){

        preAction();

        let item = g.getItem(this._x,this._y);
        if (item == null){} else {
            item.pickUp();
        }        
        setCanvasOrigin(this._x,this._y);

        postAction();
    }

    bounceBack(){
        moveGrid(this._x+this._dx/4,this._y+this._dy/4,this._x,this._y,animTime/2,2);
    }

    hitMonster(m){
        consoleLog("You hit the "+m._name);
    }
}


// helper functions
function describe(){
    char.describeLocal();
}

function postMove(){
    char.postMove();
}

function keepMovingCheck(){
    if(keepMoving) char.repeatMove();
}

function bounceBack(){
    char.bounceBack();
}


//     move(){


   
//         if(!moving && g.isOpen(this._x+this._dx,this._y+this._dy) && !monHere(this._x+this._dx,this._y+this._dy)){
//             // do the animation
//             moveGrid(this._x,this._y,this._x+this._dx,this._y+this._dy,animTime,animSteps,true);
//             this._x+=this._dx;
//             this._y+=this._dy;
            
//             window.setTimeout(postMove,animTime);
//             window.setTimeout(keepMovingCheck,animTime*1.5);

//         }
//         else
//         {                   
//             keepMoving = false;
//             if(!moving){
//                 moveGrid(this._x,this._y,this._x+this._dx,this._y+this._dy,animTime,animSteps,false);
//                 //window.setTimeout(bounceBack,animTime*0.8);
//             }
//             if(g.isOpen(this._x+this._dx,this._y+this._dy) && monHere(this._x+this._dx,this._y+this._dy))
//             {   
// //                this.hitMonster(g.getMonster(this._x+this._dx,this._y+this._dy))
                
//             }
//             else{
//                 consoleLog("You bump into a wall");
//             }
//         }
//     }

