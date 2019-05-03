

function drawMapObjectOnGrid(){

    let drawObj = drawObjs.pop();
    ctx.drawImage(drawObj._image,drawObj._xoff,drawObj._yoff); // draw the image
 
}

class mapObject{
    constructor(mapObType)
    {
        this._mapObType = mapObType  // monster, item, fixed
        this._image = new Image();
        this._image.src = "img/Potions/row-1-col-6.png";
        this._backgroundImage;
        this._xoff = NaN;
        this._yoff = NaN;
        this._x = NaN;
        this._y = NaN;
    }

    setImage(imageURL){
        this._image.src = imageURL;
        this._image.width = cs;
    }
    

    placeObject(){
        this._x = NaN;
        this._y = NaN;
        for(let i = 0; i<50; i++){
            this._x = getRandom(0,mw);
            this._y = getRandom(0,mh);
            if(!g.hasItem(this._x,this._y)){
                g.setItem(this._x,this._y,this);

                // calculate the draw location
                this._xoff = g.getCell(this._x,this._y)._xoff;
                this._yoff = g.getCell(this._x,this._y)._yoff - objectOffset;
                // store the background
                this._backgroundImage = ctx.getImageData(this._xoff,this._yoff,cs,cs);

                break;
            }
        }
        drawObjs.unshift(this);
        this._image.onload = function() { drawMapObjectOnGrid(); }        
    }

    draw(x,y){
        ctx.drawImage(this._image,this.x,this.y);
    }

    redrawObjBackground(){
        ctx.putImageData(this._backgroundImage,this._xoff,this._yoff);
    }

}

class item extends mapObject {
    constructor(itemType){
        super("Item");
        this._itemType = itemType;
        this._useText;
        this._description;
    }
}

// load the potion tileset

var potionTiles = document.getElementById("PotionTiles");
console.log("potion tiles", potionTiles);


//var imagePotionTiles = document.getElementById("PotionTiles");;
//imageObjPotion.src = "img/potions.png";
// var canvasPotion = document.createElement("CANVAS");
// canvasPotion.style.visibility = "hidden";
// canvasPotion.width = 32 * 10;
// canvasPotion.height = 32 * 4
// var ctxPotion = canvasPotion.getContext("2d");
// ctxPotion.drawImage(imagePotionTiles,0,0);


class potion extends item {
    constructor(potionType){
        super("Potion");
        switch (potionType) {
            case "Healing" :
                this._description = "red"
                this._useText = "you feel better";
                //this._image.src = "img/Potions/row-1-col-1.png"
                break;
            case "Extra Healing" :
                this._description = "crimson"
                this._useText = "you feel better";
                //this._image.src = "img/Potions/row-2-col-1.png"
                break;
            default:
                this._description = "error: this potion is unknown"
                _useText = "error: the effect of this potion is unknown"
                break;
        }
    }
    use(){       
        // put the message in the console.  = you drink the ... description ... potion
        switch (potionType) {
            case "Healing" :
                char._health += Math.floor(char._mHealth/3);
                if(char._health > char._mHealth){_mHealth += 2; char._health = char._mHealth }
                break;
            case "Extra Healing" :
                char._health += Math.floor(2*char._mHealth/3);
                if(char._health > char._mHealth){_mHealth += 2; char._health = char._mHealth }
                break;

            default:
                // do nothing
                break;
        }
        
        cell._imgSrc = ctx.getImageData(0,0,cs,cs);


    }
}

class potionLibrary{
    constructor(){

    }

}