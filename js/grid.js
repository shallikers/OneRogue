class grid  {
    _gridCells = new Array;
    _solidCell = new cell(-1,-1);

    constructor(){
        this.newGrid();
    }
    
    newGrid() {
        for (var i = 0; i < mh; i++) {
            for (var j = 0; j < mw; j++) {
                let c = new cell(j,i);
                this.setCell(j, i, c);
            }
        }
    }

    getCell(x,y) { 
        if(x<0 || y<0 || x>=mw || y>=mh) return this._solidCell    
        return this._gridCells[x+ mw* y]; 
    }

    // puts a cell in the grid
    setCell(x,y,gridCell) { this._gridCells[x+ mw* y] = gridCell;}

    // checks to see if the cell in this location is solid
    isSolid(x,y){ return this.getCell(x,y)._solid};
    // checks to see if the cell in this location is open
    isOpen(x,y){ return !this.getCell(x,y)._solid};
    // makes the cell in this location open
    setOpen(x,y){ this.getCell(x,y)._solid = false;}
    // makes the cell in this location solid
    setSolid(x,y){ this.getCell(x,y)._solid = false;}

    createMap(){
        this.newGrid();
        for(var i=0; i<50; i++){
 //           getCell(getRandom(0,mw), getRandom(0,mh))._solid = false;
 //           this.getCell(5,5)._solid = false;
                this.setOpen(5,5);
        }
    }
    drawMap() {
        this._gridCells.forEach(element => { 
            element.draw();
        });
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
console.log('grid');
