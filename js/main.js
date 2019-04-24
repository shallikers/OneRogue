// One rogue
// define the core variables for the maze



var g = new  grid();

console.log("construct player");

var char = new player();

console.log("construct grid");
g.createMap();
g.drawMap();
char.placePlayer();



