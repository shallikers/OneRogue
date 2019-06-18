console.log("init mon");

class monster extends mapObject{
    constructor(){
        super("Monster");
        this._index = -1;  
        this._dx = 0;
        this._dy = 0;
        this._nx = 0;
        this._ny = 0;
        this._bounce = false;
        this._hit = false;
        this._moving = false;  
        this._dir = getRandom(0,7);
    }

    placeMonster(){
        this._x = NaN;
        this._y = NaN;
        for(let i = 0; i<50; i++){
            this._x = getRandom(0,mw);
            this._y = getRandom(0,mh);
            if(!monHere(this._x,this._y) && g.isOpen(this._x,this._y)){
                // calculate the draw location
                    
                this.calcDrawLocation(0);

                // store the background
                this._backgroundImage = ctx.getImageData(this._xoff,this._yoff,cs,cs);
                break;
            }
        }
        this._nx = this._x;
        this._ny = this._y;


        drawObjs.unshift(this);
        this._image.onload = function() { drawMapObjectOnGrid(); }        
    }

    calcDrawLocation(step){
        super.calcDrawLocation();
        if(step <= animSteps/2 || !this._bounce){ 
            this._xoff += this._dx * animDelta * step;
            this._yoff += this._dy * animDelta * step;   
        }
        else{
            this._xoff += this._dx * animDelta * (animSteps - step);
            this._yoff += this._dy * animDelta * (animSteps - step);   
        }
    }

    hit(){
        consoleLog("The " + this._name +" hits you");
    }

    planMove(){

        // pick a random direction
       
        let delta = 1;
        if (getRandom(0,9)>4) delta = -1;

        if (getRandom(0,9)>7) this._dir = getRandom(0,7);

        for(let i = 0; i<8 ; i++){
            switch (this._dir){
                case 0: this._dx=-1; this._dy = +1; break;
                case 1: this._dx=0;  this._dy = +1; break;
                case 2: this._dx=1;  this._dy = +1; break;
                case 3: this._dx=-1; this._dy = 0;  break;        
                case 4: this._dx=1;  this._dy = 0;  break;
                case 5: this._dx=-1; this._dy = -1; break;
                case 6: this._dx=0;  this._dy = -1; break;
                case 7: this._dx=1;  this._dy = -1; break;
            }
            let tx= this._dx+ this._x;
            let ty = this._dy+ this._y;
            if(g.isOpen(tx,ty)) break;
            this._dir = (this._dir+delta) % 8 ;
            
        }
        let tx= this._dx+ this._x;
        let ty = this._dy+ this._y;
        this._nx = this._x;
        this._ny = this._y;


        if (this._dx == 0 && this._dy == 0){// we are not moving
            this._moving = false;
            this._nx = this._x;
            this._ny = this._y;
            this._bounce = false;
            this._hit = false;
        }
    
        // see if there is a monster in there or if it is a solid wall
        if (!g.isOpen(tx,ty) || monHere(tx,ty) ) {
            this._moving = false;
            this._nx = this._x;
            this._ny = this._y;
            this._bounce = false;
            this._hit = false;
            if (!g.isOpen(tx,ty)) this._bounce = true;
            this._dir = getRandom(0,7);
        }
        else if(charHere(tx,ty)) // is the character here 
        {
            this._moving = true;
            this._nx = this._x;
            this._ny = this._y;
            this._bounce = true;
            this._hit = true;  
        }
        else { // there is a free space to move into
            this._moving = true;
            this._nx = tx;
            this._ny = ty;
            this._bounce = false;
            this._hit = false;  
        }
    }


    move(step) // s is the number animation frame steps
    {
        if (this._moving){
            this.calcDrawLocation(step);
            this.draw();
        }
    }

    postMove(){
    }

    cleanUp(){
        this._x = this._nx;
        this._y = this._ny;
    }

    

   

}

// helper functions

function makeMonster(name)
{
    let m = new monster()

    switch(name){
        case"worker ant" :
            m._name = "Worker Ant";
            m._image.src = "img/monsters/workerAnt.png"
            break;
        case"fire ant" :
            m._name = "Fire Ant";
            m._image.src = "img/monsters/fireAnt.png"
            break;
        case"giant ant" :
            m._name = "Giant Ant";
            m._image.src = "img/monsters/giantAnt.png"
            break;
            case"soldier ant" :
            m._name = "Soldier Ant";
            m._image.src = "img/monsters/soldierAnt.png"
            break;
        case"wasp" :
            m._name = "Wasp";
            m._image.src = "img/monsters/wasp.png"
            break;        
        default :
            console.log("Unkonwn Monster Type: "+ name)
    }

    m.placeMonster();
    mons.push(m);
}

// helper functions for monsters
function monHere(x,y){
 
    for(let i=0; i < mons.length; i++){
        if ((mons[i]._nx == x) && (mons[i]._ny == y)){
            return true
        }
       
    }
    return false;
}

function charHere(x,y){
    if (char._nx == x && char._ny ==y)  return true; else return false;
}


console.log("Monster");