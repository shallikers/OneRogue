class cell {
     
    constructor(x,y) {
        this._solid = true;
        this._wall = false;
        this._mustCarve = false;
        this._noCarve = false;
        this._x = x;
        this._y = y;
        this._xoff = x * cs;
        this._yoff = y * cs +objectOffset;  // the cs/8 is so that the item does not appear in a wall that overhangs the cell
        this._dir = ["n", "e", "s" , "w" ];
        this._imgSrc;
        this._isDrawn = false;
        this._mapItem = null;
        this._mapMonster = null;


 
        shuffleArray(this._dir);
    }

    setSolid(){_solid = true;}
    setOpen(){_solid = false; _wall = false;}

    draw(){ 
        ctx.putImageData(this._imgSrc,this._xoff,this._yoff);
    }

    getDirection(d){
    
        // check if all the directions have been used
        if(this._dir.length == 0) return "x";

        let element = this._dir.indexOf(d)

        // if the current direction has already been used in this cell
        if( (element == -1)  ){  
            // choose the last array item in the list as the new direction
            return this._dir.pop();
        }
        //console.log(this._dir);
        this._dir.splice(element,1);
        //console.log(this._dir);

        return d;
    }




}

console.log('cell');
