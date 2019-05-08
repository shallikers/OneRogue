

function drawMapObjectOnGrid(){
    let drawObj = drawObjs.pop();
    ctx.drawImage(drawObj._image,drawObj._xoff,drawObj._yoff); // draw the image
}

class mapObject{
    constructor(mapObType)
    {
        this._mapObType = mapObType  // monster, item, fixed
        this._image = new Image();
        this._image.src = "img/Items/redVial.png";
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
        this._index = -1;   
    }

    describe(){
        return il.describe(this._index);       
    }

    pickUp(){
        il.pickup(this._index);
        this.redrawObjBackground()
        g.removeItem(this._x,this._y);
        consoleLog("You pick the "+this.describe());
    }

    isUseItem(){
        if(il[this._index].getCount()>0) return true; else return false;
    }

    use(){
        console.log("used");
    }

}

function use(itemIndex){
    il._index
}


class itemLibrary{
    constructor(){
        this._potionColours = new Array(
            "red:redPot",
            "yellow:yelPot",
            "orange:orangePot",
            "green:greenPot",
            "light blue:lbluePot",
            "dark blue:dbluePot",
            "purple:purPot",
            "pink:pinkPot",
            "grey:greyPot",
            "white:whitePot",
            "red:redVial",
            "yellow:yelVial",
            "orange:orangeVial",
            "green:greenPot",
            "light blue:lblueVial",
            "dark blue:dblueVial",
            "purple:purVial",
            "pink:pinkVial",
            "grey:greyVial",
            "white:whiteVial");
        this._potionTypes = new Array(
            "Healing:you feel better:10", 
            "Extra Healing:you feel much better:5", 
            "Energy:you feel full of energy:5", 
            "Strength:you feel strong:3", 
            "Dexterity:you feel nimble:3",
            "Experience:you feel wise:2",
            "Poison:you feel very sick:2",
            "Paralysis:you feel very still:2",
            "Weakness:you feel weak:2");

        this._scrollColours = new Array(
            "Foobie Bletch:Scroll",
            "Abracadabra:Scroll",
            "Shazzam:Scroll",
            "Boom:Scroll",
            "Handle with care:Scroll",
            "Life is wasted on the living:Scroll",
            "Burn After Reading:Scroll",
            "Zaaaap:Scroll",
            "Powwww:Scroll",
            "Kerching:Scroll"
            )

        this._scrollTypes = new Array(
            "Identify:you identify the:15",
            "Enchant Weapon:Your weapon glows:5",
            "Destroy Weapon:Your weapon turns to dust:2",
            "Enchant Armour:Your armour gloes blue:5",
            "Remove Curse:You feel relieved:10",
            "Doom:You are doomed:2",
            "Butter fingers:You drop your weapons and tools:5",
            "Curse:You feel distinctly uncomfortable:5"
        )

        this._index = new Array();
        this.indexMin = 0;
        this._potionIndexMin = this._index.length;
        this.buildIndex(this._potionColours, this._potionTypes, "potion", this._potionIndexMin)
        this._potionIndexMax = this._index.length - 1;
        this._scrollIndexMin = this._index.length;
        this.buildIndex(this._scrollColours, this._scrollTypes, "scroll", this._scrollIndexMin)
        this._scrollIndexMax = this._index.length - 1;
     
        this._indexMax = this._index.length - 1;

        let x;

        this.totalWeighting = 0;
        for(x in this._index){
            this.totalWeighting += this._index[x].weighting;
        }
        
        
    }

    getCount(item){
        return this._index[item._index].count;
    }

    makeItem(){
        let r = this._index[getRandom(0,this._indexMax)];
        let p = new item();
        p = this.populateItem(r,p);    
        return p;
    }

    makePotion(){
        let r = this._index[getRandom(this._potionIndexMin,this._potionIndexMax)];
        let p = new item();
        p = this.populateItem(r,p);  
        return p;
    }

    populateItem(r,p){
        p._image.src = r.imageSrc;
        p._itemType =  r.itemType;
        p._index = r.index;
        return p;
    }

    describe(i){
        let item = this._index[i];
        let desc;
        if (item.identified) {desc = item.itemType + " of " + item.name+" ";}
        else{desc = item.colour+" "+item.itemType+" "}
        this._index[i].description = desc+" ";
        return desc;
    }

    pickup(i){
        let item = this._index[i];
        item.count++;
        vuUse.update();
    }

    useItem(index){
        let item = this._index[index];
        let message = "";
        switch (item.itemType) {
            case "potion" : message = "You drink the "; break;
            case "scroll" : message = "You read the "; break;
        }

        consoleLog(message + this._index[index].description);     
        this._index[index].identified = true;
        this.describe(index);
        this._index[index].count--;
        vuUse.update();
        consoleLog("It appears to be a " + item.itemType+ " of " + item.description);
        
    }





    
    buildIndex(colours, effects, itemType, i){
        // console.log(colours);
        // console.log(effects);
        shuffleArray(colours);
        shuffleArray(effects);
        let x;
        for(x=0;x<effects.length;x++){
            var p = {
                index : 0,
                itemType : itemType,
                weighting : parseInt(effects[x % colours.length].split(":")[2],10),
                identified : false,
                count: 0,
                name : effects[x].split(":")[0],
                effect : effects[x].split(":")[1],
                colour : colours[x % colours.length].split(":")[0],
                imageSrc : itemsPath + colours[x % colours.length].split(":")[1]+".png",
                description : "placeholder"
            }
            p.index = x+i;
            this._index[x+i] = p;
            this.describe(x+i);

            if (p.index<10) p.count = 1;
        } 
        
        console.log("index",this._index); 
    }





}
