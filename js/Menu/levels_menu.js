// 1 button
var level_1 = game.newImageObject({
    file: "assets/Menu/Levels/level1.png",
    x: 550,
    y: 320,
    w: 256,
    h: 78    
});

level_1.setPositionC(point(game.getWH().w2, 100));

var level_1_hover = game.newImageObject({
    file: "assets/Menu/Levels/level1_hover.png", 
    x: level_1.getPosition().x,
    y: level_1.getPosition().y,
    w: 256,
    h: 78
});

// 2 button
var level_2 = game.newImageObject({
    file: "assets/Menu/Levels/level2.png",
    x: 550,
    y: 320,
    w: 256,
    h: 78    
});

level_2.setPositionC(point(game.getWH().w2, 200));

var level_2_hover = game.newImageObject({
    file: "assets/Menu/Levels/level2_hover.png", 
    x: level_2.getPosition().x,
    y: level_2.getPosition().y,
    w: 256,
    h: 78
});

// 3 button
var level_3 = game.newImageObject({
    file: "assets/Menu/Levels/level3.png",
    x: 550,
    y: 320,
    w: 256,
    h: 78    
});

level_3.setPositionC(point(game.getWH().w2, 300));

var level_3_hover = game.newImageObject({
    file: "assets/Menu/Levels/level3_hover.png", 
    x: level_3.getPosition().x,
    y: level_3.getPosition().y,
    w: 256,
    h: 78
});

// 4 button
var level_4 = game.newImageObject({
    file: "assets/Menu/Levels/level4.png",
    x: 550,
    y: 320,
    w: 256,
    h: 78    
});

level_4.setPositionC(point(game.getWH().w2, 400));

var level_4_hover = game.newImageObject({
    file: "assets/Menu/Levels/level4_hover.png", 
    x: level_4.getPosition().x,
    y: level_4.getPosition().y,
    w: 256,
    h: 78
});

// 5 button
var level_5 = game.newImageObject({
    file: "assets/Menu/Levels/level5.png",
    x: 550,
    y: 320,
    w: 256,
    h: 78    
});

level_5.setPositionC(point(game.getWH().w2, 500));

var level_5_hover = game.newImageObject({
    file: "assets/Menu/Levels/level5_hover.png", 
    x: level_5.getPosition().x,
    y: level_5.getPosition().y,
    w: 256,
    h: 78
});

//exit button
var exit = game.newImageObject({
    file: "assets/Menu/Levels/exit.png",
    x: 550,
    y: 320,
    w: 256,
    h: 78    
});

exit.setPositionC(point(game.getWH().w2, 600));

var exit_hover = game.newImageObject({
    file: "assets/Menu/Levels/exit_hover.png", 
    x: exit.getPosition().x,
    y: exit.getPosition().y,
    w: 256,
    h: 78
});

function Level_draw(){
    level_1.draw();
    level_2.draw();
    level_3.draw();
    level_4.draw();
    level_5.draw();
    exit.draw();
}

//hover button
function Hover_levels(){
    
    //первая кнопка
    if(pjs.mouseControl.isInObject(level_1)){
        level_1_hover.draw();
    }
    
    //вторая кнопка
    if(pjs.mouseControl.isInObject(level_2)){
        level_2_hover.draw();
    }
    
    //третья кнопка
    if(pjs.mouseControl.isInObject(level_3)){
        level_3_hover.draw();
    }
    
    //четвертая кнопка
    if(pjs.mouseControl.isInObject(level_4)){
        level_4_hover.draw();
    }
    
    //пятая кнопка
    if(pjs.mouseControl.isInObject(level_5)){
        level_5_hover.draw();
    }
    
    //exit кнопка
    if(pjs.mouseControl.isInObject(exit)){
        exit_hover.draw();
    }
}

function LevelClick(){
      
    if(pjs.mouseControl.isPeekObject("LEFT", level_1)){
        console.log("Press Levels - 1");
        
        //отключение перехвата мыши
        pjs.mouseControl.setVisible(false);
        pjs.mouseControl.exitMouseControl();
        
        //создам прослушку клавиатуры

        control.initKeyControl();
        
        game.setLoop("update");
    }
    
    if(pjs.mouseControl.isPeekObject("LEFT", level_2)){
        console.log("Press Levels - 2");
    }
    
    if(pjs.mouseControl.isPeekObject("LEFT", level_3)){
        console.log("Press Levels - 3");
    }
    
    if(pjs.mouseControl.isPeekObject("LEFT", level_4)){
        console.log("Press Levels - 4");
    }
    
    if(pjs.mouseControl.isPeekObject("LEFT", level_5)){
        console.log("Press Levels - 5");
    }
    
    if(pjs.mouseControl.isPeekObject("LEFT", exit)){
        console.log("Press Levels - exit");
        
        game.setLoop("Menu");
    }
}

//фрейм с выбором уровней
game.newLoop("Levels_menu", function(){
    LevelClick();
    
    Level_draw();
    
    Hover_levels();
});