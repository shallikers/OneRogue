class cell {

    _solid = true;
    _wall = false;
    _neighbours = new Array;
    _x = 0;
    _y = 0;
    _xoff = 0;
    _yoff = 0;
    
    constructor(x,y) {
        this._solid = true;
        this._x = x;
        this._y = y;
        this._xoff = x * cs;
        this._yoff = y * cs;
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
            ctx.fillStyle = "#00FF00";        
        }
        else
        {
            ctx.fillStyle = "#FFFFFF";
        }
        ctx.fillRect(this._xoff, this._yoff, cs, cs);

    }




}

console.log('cell');
