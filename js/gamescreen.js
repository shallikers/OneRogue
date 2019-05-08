


var vuConsole = new Vue({
    el: '#ConsoleText',
    data: {consoletext : 'Welcome'}

})

var vuPickUp = new Vue({
    el: '#pickup',
    data: {text: 'Pick Up'}   
})

var vuUse = new Vue({
    el: '#use',
    data: {text: 'Use'}   
})

var vudir5 = new Vue({
    el: '#dir5', 
})

var vudir5 = new Vue({
    el: '#imPlayer', 
})

var vudir5 = new Vue({
    el: '#highlight', 
})



var cText = "> ";

function clearConsole(){
    vuConsole.consoletext = "> "; 
}

function consoleLog(text){
    if (vuConsole.consoletext == "> "){
        vuConsole.consoletext = vuConsole.consoletext + text;}
    else {vuConsole.consoletext = vuConsole.consoletext + "\n> " + text;}

    keepMoving = false;   

}

function pickUpButton(){
    if(g.getItem(char._x,char._y) == null){
        char._autoPickup = !char._autoPickup
        char.describeLocal();
    }
    else char.interactWithLocal();
}

var useToggle = true;
useButton()
function useButton(){
    let el = document.getElementById("useDIV")
    useToggle = !useToggle;
    if(useToggle){
        el.hidden = false;
    } else {
        el.hidden = true;
    }

    
}


