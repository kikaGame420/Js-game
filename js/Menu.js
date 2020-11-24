//создаем игровое поле
var pjs = new PointJS(500, 500, {backgroundColor: "black"});    
var game = pjs.game;

var control = pjs.keyControl;

//для преобразлвания в векторы
var point = pjs.vector.point;

//для создания анимации
var tiles = pjs.tiles;

var preset = pjs.presets;

console.log(control.getKeyList());

//=====================MENU=========================//

//кнопки меню	
	
//включение перехвата мыши
pjs.mouseControl.initControl();
pjs.mouseControl.setVisible(true);

//background 
var background = game.newImageObject({
    file: "assets/Decoration/background.jpg",
    x: 0,
    y: 0,
    scale: 0.35
})

//game name
var game_name = game.newAnimationObject({
    animation: tiles.newImage("assets/Menu/name.png").getAnimation(0, 0, 256, 62, 3),
    x: 550,
    y: 150,
    w: 256,
    h: 62,
    delay: 10
})

game_name.setPositionC(point(game.getWH().w2, 150));

//start
var button_start = game.newImageObject({
    file: "assets/Menu/start.png",
    x: 550,
    y: 320,
    w: 256,
    h: 78    
});

button_start.setPositionC(point(game.getWH().w2, 320));

var button_start_hover = game.newImageObject({
    file: "assets/Menu/start_hover.png", 
    x: button_start.getPosition().x,
    y: button_start.getPosition().y,
    w: 256,
    h: 78
});

//levels
var button_level = game.newImageObject({
    file: "assets/Menu/levels.png",
    x: 550,
    y: 450,
    w: 256,
    h: 78
});

button_level.setPositionC(point(game.getWH().w2, 420));

var button_level_hover = game.newImageObject({
    file: "assets/Menu/levels_hover.png",
    x: button_level.getPosition().x,
    y: button_level.getPosition().y,
    w: 256,
    h: 78
});

function Hover(){
    if(pjs.mouseControl.isInObject(button_start)){
        button_start_hover.draw();
    }
    
    if(pjs.mouseControl.isInObject(button_level)){
        button_level_hover.draw();
    }
}

function MenuButClick(){
    
    if(pjs.mouseControl.isPeekObject("LEFT", button_start)){
        console.log("Press Start");
        
        //отключение перехвата мыши
        pjs.mouseControl.exitMouseControl();
        
        //создам прослушку клавиатуры
        control.initKeyControl();
        
        player_bar.w = 150;
        boss_bar.w = 400;
        
        spaw_x = game.getWH().w2;
        spaw_y = game.getWH().h2;
        
        boss_1.setPosition(point(700, 400));
        
        game.setLoop("update_level1");
    }
    
    if(pjs.mouseControl.isPeekObject("LEFT", button_level)){
        console.log("Press Levels");
        
        game.setLoop("Levels_menu");
    }
}

//фрейм с главным меню
game.newLoop("Menu", function(){
    MenuButClick();
    
    background.draw();
    game_name.draw();
    button_start.draw();
    button_level.draw();
    
    Hover();
});

game.setLoop("Menu");
        
//стартуем эту функцию
game.start();