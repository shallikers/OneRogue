class grid  {
    _gridCells = new Array;
    
    _solidCell = new cell(-2,-2);
    _openCell = new cell(-2,-2);
   
    constructor(){
        this.newGrid();
    }
    
    newGrid() {
        this._openCell._solid = false;
        this._openCell._isDrawn = false;
        this._solidCell._isDrawn = false;
        for (var i = 0; i < mh; i++) {
            for (var j = 0; j < mw; j++) {
                let c = new cell(j,i);
                this.setCell(j, i, c);
            }
        }
    }

    getCell(x,y) { 
        if(x<0 || y<0 || x>=mw || y>=mh) return this._openCell    
        return this._gridCells[ x+ mw* y]; 
    }

    // puts a cell in the grid
    setCell(x,y,gridCell) { this._gridCells[x+ mw* y] = gridCell;}

    // checks to see if the cell in this location is solid
    isSolid(x,y){ return this.getCell(x,y)._solid};
    // checks to see if the cell in this location is open
    isOpen(x,y){ return !this.getCell(x,y)._solid};
    // checks to see if the cell in this location is open
    mustCarve(x,y){ return this.getCell(x,y)._mustCarve};
    // makes the cell in this location open
    setOpen(x,y){ this.getCell(x,y)._solid = false;}
    // makes the cell in this location solid
    setSolid(x,y){ this.getCell(x,y)._solid = true;}
   // stops a cell from being carvable
   setNoCarve(x,y){ this.getCell(x,y)._noCarve = true;}
   setMustCarve(x,y){ this.getCell(x,y)._mustCarve = true;}


    createMap(){
        this.newGrid();

        let i,j,k,l;
        let x,y,w,h;


        for(i=0; i<3; i++){
            for(j=0; j<3; j++){
                if(Math.random()<roomPC)
                {
                        w = getRandom(mw/9,Math.floor(mw/4));
                        h = getRandom(mh/9,Math.floor(mh/4));
                        x = getRandom(3+Math.floor(mw/3)*i,Math.floor(mw/3)*i + Math.floor((mw/3 - w)/2));
                        y = getRandom(3+Math.floor(mh/3)*j,Math.floor(mh/3)*j +Math.floor((mh/3 - h)/2));

                        for(k=x; k<x+w; k++){
                            for(l=y; l<y+h; l++)
                                this.setMustCarve(k,l);
                                //this.setOpen(x,y);
                            }

                }
            }

        }


        this.carveCell(Math.floor(mw/2), Math.floor(mh/2),"n");
 
        for(i=0; i<mw; i++){
            for(j=0; j<mh-1; j++){
                if (this.isSolid(i,j) && this.isOpen(i,j+1)){
                    this.getCell(i,j)._wall = true;
                }

            }
        }

 


    }

    drawMap() {

        for (var i = 0; i < mw; i++) {
            for (var j = 0; j < mh; j++) {
                this.drawCellImage(i,j);
                this.getCell(i,j).draw();
            }
        }
    }

    carveCell(x,y,d) {
        // if the cell is already carved it should not be carved again
        if(this.isOpen(x,y) || this.getCell(x,y)._noCarve ) return false;
        // if the cell was a must carve cell it is always carved
        if(!this.mustCarve(x,y))
        {
            if (deadEndPC > Math.random()) return false;
            // if the cell is not must carve then we check the two diagonal neighbours in the direction of the carve
            // if they are both open carve.  this prevents diagonal corners
            if(d=="n")
            {
                if( this.isOpen(x-1,y-1) || this.isOpen(x+1,y-1) ) return false;
                if(  (this.isOpen(x-1,y) || this.isOpen(x+1,y) || this.isOpen(x,y-1) ) && (Math.random() > joinPC)) return false;              
                if(  (this.isOpen(x-2,y) || this.isOpen(x+2,y) ) && (Math.random() < sideAvoidPC)) return false;
                if(  (this.isOpen(x,y-2) || this.isOpen(x,y-3) ) && (Math.random() < forwardAvoidPC)) return false;          
            }
            if(d=="s")
            {
                if( this.isOpen(x-1,y+1) || this.isOpen(x+1,y+1)) return false;
                if(  (this.isOpen(x-1,y) || this.isOpen(x+1,y) || this.isOpen(x,y+1) ) && (Math.random() > joinPC)) return false;               
                if(  (this.isOpen(x-2,y) || this.isOpen(x+2,y) ) && (Math.random() < sideAvoidPC)) return  false;             
                if(  (this.isOpen(x,y+2) || this.isOpen(x,y+3) ) && (Math.random() < forwardAvoidPC)) return false;                 
            }
            if(d=="e")
            {
                if(this.isOpen(x+1,y-1) || this.isOpen(x+1,y+1) ) return  false;
                if( (this.isOpen(x,y+1) || this.isOpen(x,y-1) || this.isOpen(x+1,y) ) && (Math.random() > joinPC)) return  false;
                if( (this.isOpen(x,y+2) || this.isOpen(x,y-2) || this.isOpen(x+2,y) ) && (Math.random() < sideAvoidPC)) return false;
                if(  (this.isOpen(x+2,y) || this.isOpen(x+3,y) ) && (Math.random() < forwardAvoidPC)) return false;                 
                 
            }
            if(d=="w")
            {
                if(this.isOpen(x-1,y-1) || this.isOpen(x-1,y+1)) return false;
                if( (this.isOpen(x,y+1) || this.isOpen(x,y-1) || this.isOpen(x-1,y) ) && (Math.random() > joinPC)) return false;
                if( (this.isOpen(x,y+2) || this.isOpen(x,y-2) || this.isOpen(x-2,y) ) && (Math.random() < sideAvoidPC)) return false;
                if(  (this.isOpen(x-2,y) || this.isOpen(x-3,y) ) && (Math.random() < forwardAvoidPC)) return false;                 
  
            
            }
        }
        

        // if we have not returned we should carve the cell
        this.setOpen(x,y);
        if(deadSidesPC > Math.random()){
            switch(d){

                case "n", "s" : this.setNoCarve(x-1,y); this.setNoCarve(x+1,y); this.setNoCarve(x-2,y); this.setNoCarve(x+2,y)
                break;

                case "e", "w" : this.setNoCarve(x,y+1); this.setNoCarve(x,y-1); this.setNoCarve(x,y+2); this.setNoCarve(x,y-2);
                break;

            }

        }

        let success= false;

        // recursively carve the next cell

        while(d != "x"){

            if ((Math.random() > constDir)) d = ".";
            
            d = this.getCell(x,y).getDirection(d);
            //console.log(d);

            switch(d){

                case "n" : if (this.carveCell(x,y-1,d)) success =true;
                break;

                case "s" : if (this.carveCell(x,y+1,d)) success = true;
                break;

                case "e" : if (this.carveCell(x+1,y,d)) success = true;
                break;

                case "w" : if(this.carveCell(x-1,y,d)) success = true;
                break;
                
                case "x" : 
                break;

                default: console.log("carve error "); console.log(d);  d="x"; 
                break;

            }
            
        
        }

        if (!success  && !this.mustCarve(x,y) )
        {
            // it was a one stick long dead end
            this.setSolid(x,y);
            this.setNoCarve(x,y);
            //console.log("r");
        }
        
        return true;

    }

    createRoom(x,y,h,w){
        let i,j;
        for(i = x; i<x+w; i ++){
            for( j = y; j<y+h; j++){
                this.setMustCarve(i,j);
            }
        }
    }

    drawCellImage(x,y)
    {
        let cell = this.getCell(x,y);
        if (cell._isDrawn) return;

        let c = document.createElement("canvas");
        c.width = cs;
        c.height = cs;
        let ctx = c.getContext("2d");

        
    
        if (cell._solid)
        {
            ctx.fillStyle = colSolid;
            ctx.fillRect(0,0, cs, cs);

            // check if it a wall by looking at the one below to see if it is open
 
            if(cell._wall)
            {
                ctx.fillStyle = colWall;
                ctx.fillRect(0,cs/2, cs, cs/2);   

                ctx.strokeStyle = colVeryDarkSolid;
                ctx.beginPath();
                ctx.moveTo(0,cs)
                ctx.lineTo(cs,cs)
                ctx.stroke();

                ctx.fillStyle = colDarkSolid;
                ctx.fillRect(0,3*cs/8,cs, cs/8);   

                // check to see if it needs half length sides
                if(!this.getCell(x-1,y)._solid)
                {
                    ctx.fillStyle = colDarkSolid;
                    ctx.fillRect(0,0,cs/8, cs/2);   
                }
                if(!this.getCell(x+1,y)._solid)
                {
                    ctx.fillStyle = colDarkSolid;
                    ctx.fillRect(7*cs/8,0,cs/8, cs/2);   
                }  

            }
            else
            // check to see if it needs sidings on either side because they are open
            {
                if(!this.getCell(x-1,y)._solid && x>0)
                {
                    ctx.fillStyle = colDarkSolid;
                    ctx.fillRect(0,0,cs/8, cs);   
                }
                if(!this.getCell(x+1,y)._solid)
                {
                    ctx.fillStyle = colDarkSolid;
                    ctx.fillRect(7*cs/8,0,cs/8, cs);   
                }

                if(this.getCell(x-1,y)._wall )
                {
                    ctx.fillStyle = colDarkSolid;
                    ctx.fillRect(0,3*cs/8,cs/8, 5 * cs/4);   
                }
                if(this.getCell(x+1,y)._wall )
                {
                    ctx.fillStyle = colDarkSolid;
                    ctx.fillRect(7*cs/8,3*cs/8,cs/8, 5*cs/8);   
                }        
            }
        }
        else
        {
            // an open tile
            ctx.fillStyle = colOpenMed;
            ctx.fillRect(0,0, cs, cs);
            ctx.beginPath();
            ctx.moveTo(cs/8,cs/8);
            ctx.lineTo(7*cs/8,cs/8);
            ctx.lineTo(7*cs/8,7*cs/8)
            ctx.strokeStyle = colOpenLight;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(7*cs/8,7*cs/8)
            ctx.lineTo(cs/8,7*cs/8);
            ctx.lineTo(cs/8,cs/8)
            ctx.strokeStyle = colOpenDark;
            ctx.stroke();

            // check to see if we have a solid below us that overhangs
            if(this.getCell(x,y+1)._solid )
            {
                ctx.fillStyle = colDarkSolid;
                ctx.fillRect(0,7*cs/8,cs,cs/8);   
            }
        }
        
        
        cell._imgSrc = ctx.getImageData(0,0,cs,cs);

    }

}

// resize
window.addEventListener("resize", resizeCanvasOrigin);

// grid helper functions
function resizeCanvasOrigin(){
    setCanvasOrigin(char._x,char._y);
}

function setCanvasOrigin(x,y){
  console.log(x,x*cs,window.innerWidth/2);
  let xo = -x * cs + window.innerWidth/2 - 0.5*cs - 4;  // cs/2 is so that the origin of the chacter is aligned to the cell

  let yo = -y * cs + window.innerHeight/2 - 0.5*cs ;

  document.getElementById("grid").style.left = xo+"px";
  document.getElementById("grid").style.top = yo+"px";

  console.log(xo,yo);  
}

function moveGrid(x0,y0,x1,y1,time,steps){ //time in ms
    let dx = (x1 - x0)/steps;
    let dy = (y1 - y0)/steps;
    let ts = time/steps;
    moving = true;
    let stepCount=0;
    
    //var elem = document.getElementById("grid");
    var id = setInterval(frame,time/steps);

    function frame() {
        stepCount++;
        if (stepCount>=steps) {
          clearInterval(id);
          moving=false;
          setCanvasOrigin(x1,y1)
        } else {
            x0+=dx;
            y0+=dy;
            setCanvasOrigin(x0,y0)
        }
    }
    


}


console.log("grid");
