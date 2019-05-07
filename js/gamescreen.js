


var vuConsole = new Vue({
    el: '#ConsoleText',
    data: {consoletext : 'Welcome'}

})

var vuPickUp = new Vue({
    el: '#pickup',
    data: {text: 'Pick Up'}   
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

