class cell {

    _solid = true;
    _wall = false;
    _mustCarve = false;
    _noCarve = false;
    _neighbours = new Array;
    _x = 0;
    _y = 0;
    _xoff = 0;
    _yoff = 0;
    _dir = ["n", "e", "s" , "w" ]
    
    constructor(x,y) {
        this._solid = true;
        this._x = x;
        this._y = y;
        this._xoff = x * cs;
        this._yoff = y * cs;

        shuffle(this._dir);
    }

    setSolid(){_solid = true;}
    setOpen(){_solid = false; _wall = false;}

    setNeighbours(c1,c2,c3,c4,c5,c6,c7,c8,c9){
        this._neighbours.push(c1,c2,c3,c4,c5,c6,c7,c8,c9);
    }

    setWall(c)  // the passed parameters are the cells above and below the current cell
    {
        if(!this._solid && this._neighbours[2]._solid){
            this.wall = true;
        }
    }

    draw(){
        if(this._solid)
        {
            if( this._noCarve) ctx.fillStyle = "#004400"; else ctx.fillStyle = "#004400";      
        }
        else
        {
            if( this._noCarve) ctx.fillStyle = "#EEEEEE"; else ctx.fillStyle = "#FFFFFF";
        }
        ctx.fillRect(this._xoff, this._yoff, cs, cs);

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
