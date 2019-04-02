class grid  {
    _gridCells = new Array;
    
    _solidCell = new cell(-1,-1);
    _openCell = new cell(-1,-1);
   
    constructor(){
        this.newGrid();
    }
    
    newGrid() {
        this._openCell._solid = false;
        for (var i = 0; i < mh; i++) {
            for (var j = 0; j < mw; j++) {
                let c = new cell(j,i);
                this.setCell(j, i, c);
            }
        }
    }

    getCell(x,y) { 
        if(x<0 || y<0 || x>=mw || y>=mh) return this._openCell    
        return this._gridCells[x+ mw* y]; 
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

    }

    drawMap() {
        this._gridCells.forEach(element => { 
            element.draw();
        });
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



//         var t="";
//         for (var i = 0; i < mh; i++) {
// //            t += "<p>";
//             for (var j = 0; j < mw; j++) {
//                 if(this.isOpen(j,i) ) t+= 'O'; else t+="1";
//                 draw()
//             }
//             t += "</br>";   
//         }
        //document.getElementById("grid").innerHTML = t;
}

