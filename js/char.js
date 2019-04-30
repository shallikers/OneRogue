console.log("init char");

class player {


    //_sourceImage = new Image;
    //_renderImage = new Image;

    

    constructor(){
        console.log("construct char");    
    
        this._x = Math.floor(mw/2);
        this._y = Math.floor(mh/2);
    
        this._dx = 0;
        this._dy = 0;
    
        this._mHealth = 100;
        this._mMagic = 100;
        this._mFatigue = 100;
        this._mExperience = 2000
    
        this._health = this._mHealth;
        this._magic = this._mMagic;
        this._fatigue = this._mFatigue
        this._experience = 0;

        this._created = false;
 
    }

    drawPlayer()
    {
        if (!this._created){

        }
        
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
        let animTime = 200;
        this._dx = dx;
        this._dy = dy;
        keepMoving=true;
   
        if(!moving && g.isOpen(this._x+dx,this._y+dy)){
            moveGrid(this._x,this._y,this._x+dx,this._y+dy,animTime,8);
            this._x+=dx;
            this._y+=dy;
            window.setTimeout(keepMovingCheck,animTime*1.5);
        }
        else
        {
            keepMoving = false;
        }


   
   //     setCanvasOrigin(this._x,this._y);
    }


}

function keepMovingCheck(){
    if(keepMoving) char.repeatMove();
}