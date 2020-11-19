//кнопки меню	
	
//включение перехвата мыши
pjs.mouseControl.initControl();
pjs.mouseControl.setVisible(true);

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
        pjs.mouseControl.setVisible(false);
        pjs.mouseControl.exitMouseControl();
        
        //создам прослушку клавиатуры

        control.initKeyControl();
        
        game.setLoop("update");
    }
    
    if(pjs.mouseControl.isPeekObject("LEFT", button_level)){
        console.log("Press Levels");
        
        game.setLoop("Levels_menu");
    }
}

//фрейм с главным меню
game.newLoop("Menu", function(){
    MenuButClick();
    
    game_name.draw();
    button_start.draw();
    button_level.draw();
    
    Hover();
});