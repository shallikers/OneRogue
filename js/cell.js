class cell {
    // _solid = true;
    // _wall = false;
    // _mustCarve = false;
    // _noCarve = false;
    // _x = 0;
    // _y = 0;
    // _xoff = 0;
    // _yoff = 0;
    // _dir = ["n", "e", "s" , "w" ]
    // _imgSrc;
    // _isDrawn = false;

    
    constructor(x,y) {
        this._solid = true;
        this._wall = false;
        this._mustCarve = false;
        this._noCarve = false;
        this._x = x;
        this._y = y;
        this._xoff = 5+ x * cs;
        this._yoff = 5+y * cs;
        this._dir = ["n", "e", "s" , "w" ];
        this._imgSrc;
        this._isDrawn = false;

 
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
