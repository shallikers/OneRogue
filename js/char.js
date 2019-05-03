console.log("init char");

var vucharHealth = new Vue({
    el: '#Health',
    data: {health: '50:50'}
})

var vucharMagic = new Vue({
    el: '#Magic',
    data: {magic: '50:50'} 
})

var vucharFatigue = new Vue({
    el: '#Fatigue',
    data: {fatigue: '50:50'} 
})

var vucharExperience = new Vue({
    el: '#Experience',
    data: {experience: '50:50'} 
})


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
        this._mMagic = 150;
        this._mFatigue = 200;
        this._mExperience = 2000
    
        this._health = this._mHealth;
        this._magic = this._mMagic;
        this._fatigue = this._mFatigue
        this._experience = 0;

        this._created = false;
        
        this.updatePlayerView()
    }

    drawPlayer()
    {
        if (!this._created){

        }
        
    }

    updatePlayerView()
    {
        vucharHealth.health = this._health + " / " + this._mHealth;
        vucharMagic.magic = this._magic + " / " + this._mMagic;
        vucharFatigue.fatigue = this._fatigue + " / " + this._mFatigue;
        vucharExperience.experience = this._experience + " / " + this._mExperience;
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
   
        if(!moving && g.isOpen(this._x+dx,this._y+dy)){
            // do the animation
            moveGrid(this._x,this._y,this._x+dx,this._y+dy,animTime,4);
            this._x+=dx;
            this._y+=dy;
            window.setTimeout(keepMovingCheck,animTime*1.5);

            // iteract with the new square
            this.interactWithLocal()

        }
        else
        {
            keepMoving = false;
        }


   
   //     setCanvasOrigin(this._x,this._y);
    }

    interactWithLocal(){
        // if there is a potion in the square remove it
        let item = g.getItem(this._x,this._y);
        if (item === undefined){} else {
            item.redrawObjBackground()
            //g.removeItem(this._x,this._y);
            //g.getCell(this._x,this._y).draw();
        }
    }
}



function keepMovingCheck(){
    if(keepMoving) char.repeatMove();
}