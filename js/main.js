//создаем игровое поле
var pjs = new PointJS(500, 500, {backgroundColor: "black"});    
var game = pjs.game;

var control = pjs.keyControl;

//для преобразлвания в векторы
var point = pjs.vector.point;

//для создания анимации
var tiles = pjs.tiles;

var preset = pjs.presets;

//console.log();

 //=====================Camera state=====================

function Camera(){
    var wh = game.getWH2();    
    if(player.getPositionC().x >= wh.w && player.getPositionC().x <= wh.w + 170)
        pjs.camera.setPositionC(point(player.getPositionC().x, 345));   
}

//full screen
pjs.system.initFullPage();

game.setFPS(60);

//спавн врагов
Spawn();

game.setLoop("Menu");
        
//стартуем эту функцию
game.start();