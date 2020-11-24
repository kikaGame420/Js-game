//создаем игровое поле
var pjs = new PointJS(500, 500, {backgroundColor: "black"});    
var game = pjs.game;

var control = pjs.keyControl;

//для преобразлвания в векторы
var point = pjs.vector.point;

//для создания анимации
var tiles = pjs.tiles;

var preset = pjs.presets;

//console.log(control.getKeyList());

                    //=====================BOSSSTATE=====================

var boss_1 = game.newAnimationObject({
    animation: tiles.newImage("assets/Enemys/boss_1.png").getAnimation(0, 0, 256, 213, 5),
    x: 700,
    y: 400,
    w: 256,
    h: 213,
    scale: 0.7,
    delay: 7
});

var boss_bar = game.newRectObject({
    x: 0,
    y: 0,
    w: 400,
    h: 20,
    fillColor: "red"
});

function BossState() {
    
    if(boss_bar.w > 0){        
        //коллизия с пулями
        for(var i=0; i<bullets.length;i++){
            if(boss_1.isIntersect(bullets[i])){
                boss_bar.w -= 2;
            }
        }
    
        //следование за игроком
        boss_1.rotateForObject(player, 3);
        boss_1.moveTo(player.getPosition(), 2);
            
        boss_1.draw();
    }
    
    boss_bar.setPosition(point(pjs.camera.getPositionC().x - 250, pjs.camera.getPositionC().y - 330));
    boss_bar.draw();
}

                    //=====================Player State=====================
//скорость бега
var player_speed = 9;

//высота прыжка
var jump_height = 200;

//направление игрока
var direction = 0;

var spaw_x = game.getWH().w2;
var spaw_y = game.getWH().h2;

//bullets
var bullets = [];

var bullet_speed = 30;

var timer = 0;

var isBoss= false;

var player_bar = game.newRectObject({
    x: 10,
    y: 10,
    w: 150,
    h: 15,
    fillColor: "green"
});

//static sprite
var player = game.newImageObject({
    file: "assets/Player/player.png",
    x: spaw_x,
    y: spaw_y,
    scale: 0.2
});

//состояние ожидания
var player_wait = game.newAnimationObject(   { 
     animation : tiles.newImage("assets/Player/player.png").getAnimation(0, 0, 380, 380, 1),
     x : player.getPosition().x, 
     y : player.getPosition().y, 
     w : 380, 
     h : 380,
     scale: 0.2,
     delay: 7
   });

//состояние бега
var player_run = game.newAnimationObject(   { 
     animation : tiles.newImage("assets/Player/player_run.png").getAnimation(0, 0, 380, 380, 1), 
     x : player.getPositionC().x, 
     y : player.getPositionC().y, 
     w : 380, 
     h : 380,
     scale: 0.2,
     delay: 2
   });

//анимация падения
var player_down = game.newAnimationObject(   { 
     animation : tiles.newImage("assets/Player/player_down.png").getAnimation(0, 0, 192, 192, 6), 
     x : player.getPositionC().x, 
     y : player.getPositionC().y, 
     w : 192, 
     h : 192,
     scale: 0.65,
     delay: 5
   });

//состояние атаки
var player_attack = game.newAnimationObject(   { 
     animation : tiles.newImage("assets/Player/player_attack.png").getAnimation(0, 0, 482, 380, 1), 
     x : player.getPosition().x, 
     y : player.getPosition().y, 
     w : 482, 
     h : 380,
     scale: 0.2,
     delay: 2.5
   });

//player moving and animation 
function PlayerMoveState(){
    
      if(control.isDown("LEFT")){
        //animation run
        player_run.setPositionC(player.getPositionC());
        player_run.setFlip(1, 0);
        player_run.draw();
        
        direction = 1;
        //move left
        if(player.getPositionC().x >= 30)
            player.move(point(-player_speed, 0));
          
    } else if(control.isDown("RIGHT")){   
        //animation run
        player_run.setPositionC(player.getPositionC());
        player_run.setFlip(0, 0);
        player_run.draw();
        
        direction = 0;
        
        //move right
        if(player.getPositionC().x <= 1506)
            player.move(point(player_speed, 0));
        
    } else if(control.isDown("ALT")){
        //animation attack
        player_attack.setPositionC(player.getPositionC());
        player_attack.setFlip(direction, 0);
        player_attack.draw();
        
        Attack();
        
    } else {
        //animation wait
        player_wait.setPositionC(player.getPositionC());
        player_wait.setFlip(direction, 0);
        player_wait.draw();
    }
    
    //jump
    if(control.isPress("UP")){
        Jump();        
    }else if((control.isPress("UP") && control.isDown("RIGHT"))){
        Jump(); 
        
    }else if((control.isPress("UP") && control.isDown("LEFT"))){
        Jump();     
    }
    
    if(player.isIntersect(boss_1) && boss_bar.w > 0 && player_bar.w > -2 && isBoss){
        player_bar.w-= 2;
    }        
    
    player_bar.setPosition(point(pjs.camera.getPositionC().x - 675, pjs.camera.getPositionC().y - 330));
    player_bar.draw();
}

function Attack(){  
    
    if(timer >= 10){
        
        var bullet = game.newRectObject({
        x: player.getPositionC().x + 20,
        y: player.getPositionC().y - 2,
        w: 6,
        h: 3,
        fillColor: "yellow"
    });
        
        //направление пули
        if(direction == 0){
            bullet.dir = 0;
        }else bullet.dir = 1;
        
        bullets.push(bullet);
        timer = 0;
        
    } else timer++;
    
    
    //console.log("add" + bullets.length);
    //console.log(game.getTime());
}

function BulletsState(){
    
    for(var i=0; i < bullets.length; i++){
        
        if(bullets[i].dir == 0){
            bullets[i].x += bullet_speed;
            bullets[i].draw();
        }
        
        if(bullets[i].dir == 1){
            bullets[i].x -= bullet_speed;
            bullets[i].draw();
        }
                        
        //удаление из массива
        if(bullets.includes(bullets[i]))
            if(bullets[i].x > 1600 || bullets[i].x < 0)
                bullets.splice(i, 1);
    }
}

function Jump(){ 
  
    if(player.y > 200)
        player.y -= jump_height;
}

                        //Level state

var ground =[];

for(var i=0; i<8; i++){
    
    var ground_b = game.newImageObject({
    file: "assets/Ground/fg1.png",
    x: i * 489,
    y: 600,
    scale: 0.2
    });
    
    ground.push(ground_b);
}

var gravity = 5.5;

var bottom_b = ground_b.y;

function GroundDraw(){    
    for(var i=0; i<ground.length; i++){
        ground[i].draw();
    }
}

function Gravity(){
    
    for(var i=0; i<platforms.length; i++){
        
        // гравитация для персонажа
        if((player.getPositionC().y) < ground[0].y - 40 && !(player.isArrIntersect(platforms))){
            player.y += gravity;
        }
    }
}

        //=====================Camera state=====================

function Camera(){
    
    var wh = game.getWH2();    
    if(player.getPositionC().x >= wh.w && player.getPositionC().x <= wh.w + 170)
        pjs.camera.setPositionC(point(player.getPositionC().x, 345));   
}

        //=====================Game state=====================

//full screen
pjs.system.initFullPage();

game.setFPS(60);

var fail = game.newImageObject({
    file: "assets/Menu/fail.png",
    x:0,
    y:0,
    w: 512,
    h: 512
});
fail.setPositionC(point(game.getWH().w2, game.getWH().h2));

var win = game.newImageObject({
    file: "assets/Menu/win.png",
    x:0,
    y:0,
    w: 512,
    h: 512
});
win.setPositionC(point(game.getWH().w2, game.getWH().h2));

 function getRIR(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

////level1

var platforms = [];

var cakes = [];

var platform2 = game.newImageObject({
    file: "assets/Ground/platform_2.png",
    x: 0,
    y: 0,
    scale: 0.2
})

function LoadLevel1(count, count_cake){
            
    var platform1 = game.newImageObject({
            file: "assets/Ground/platform_1.png",
            x: 200,
            y: 400,
            scale: 0.35
        });
        
    var platform2 = game.newImageObject({
            file: "assets/Ground/platform_1.png",
            x: 500,
            y: 300,
            scale: 0.35
        });
    
    var platform3 = game.newImageObject({
            file: "assets/Ground/platform_1.png",
            x: 700,
            y: 200,
            scale: 0.35
        });
    
    var platform4 = game.newImageObject({
            file: "assets/Ground/platform_1.png",
            x: 400,
            y: 400,
            scale: 0.35
        });
    
    var platform5 = game.newImageObject({
            file: "assets/Ground/platform_1.png",
            x: 800,
            y: 400,
            scale: 0.35
        });
    
    platforms.push(platform1);
    
    platforms.push(platform2);
        
    platforms.push(platform3);
    
    platforms.push(platform4);
    
    platforms.push(platform5);
    
    for(var i=0; i<count_cake; i++){
        
        var cake = game.newImageObject({
            file: "assets/Decoration/cake1.png",
            x: getRIR(200, 1000),
            y: getRIR(200, 400),
            scale: 0.2
        });
        
        cakes.push(cake);
    }
}

function DrawPaC(){
    
    for(var i=0; i<cakes.length; i++){
        
        if(cakes.includes(cakes[i]))
            if(player.isIntersect(cakes[i]))
                cakes.splice(i, 1);
    }
    
    for(var i=0; i<platforms.length; i++){
        platforms[i].draw();
    }
    
    for(var i=0; i<cakes.length; i++){
        
        if(cakes.includes(cakes[i])){
            
            if( cakes[i].getPositionC().y < ground[0].y - 20)
                cakes[i].y += gravity;
            
            cakes[i].draw();
        }
            
    }
    
}

LoadLevel1(3, 6);

game.newLoop("update_level1", function(){
    
    if(player_bar.w > 0 && boss_bar.w > 0){
        GroundDraw();
    
        Gravity();
    
        DrawPaC();
        
        PlayerMoveState();
           
        Camera();
        
    }
    
});

game.newLoop("update_level2", function(){
    
     if(player_bar.w > 0 && boss_bar.w > 0){
        GroundDraw();
    
        Gravity();
    
        BulletsState();
    
        BossState();
    
        PlayerMoveState();
    
        Camera();
        
    }
    
    if(player_bar.w <= 0){
        pjs.camera.setPosition(point(0, 0));
        fail.draw();
        
        if(control.isDown("ENTER")){
            player_bar.w = 150;
            boss_bar.w = 400;
        
            spaw_x = game.getWH().w2;
            spaw_y = game.getWH().h2;
        
            boss_1.setPosition(point(700, 400));
        }else if(control.isDown("ESC")){
            pjs.mouseControl.initControl();
            
            player_bar.w = 150;
            boss_bar.w = 400;
        
            spaw_x = game.getWH().w2;
            spaw_y = game.getWH().h2;
        
            boss_1.setPosition(point(700, 400));
            
            game.setLoop("Menu");
        }
    }
    
    if(boss_bar.w <= 0){
        pjs.camera.setPosition(point(0, 0));
        win.draw();
        
        if(control.isDown("ENTER")){
            pjs.mouseControl.initControl();
            
            player_bar.w = 150;
            boss_bar.w = 400;
        
            spaw_x = game.getWH().w2;
            spaw_y = game.getWH().h2;
        
            boss_1.setPosition(point(700, 400));
            
            game.setLoop("Levels_menu");
        }
        //след уровень
    }
});

game.newLoop("update_level3", function(){
    
    if(player_bar.w > 0 && boss_bar.w > 0){
        GroundDraw();
    
        Gravity();
    
        BulletsState();
    
        BossState();
    
        PlayerMoveState();
    
        Camera();
        
    }
    
    if(player_bar.w <= 0){
        pjs.camera.setPosition(point(0, 0));
        fail.draw();
        
        if(control.isDown("ENTER")){
            player_bar.w = 150;
            boss_bar.w = 400;
        
            spaw_x = game.getWH().w2;
            spaw_y = game.getWH().h2;
        
            boss_1.setPosition(point(700, 400));
        }else if(control.isDown("ESC")){
            pjs.mouseControl.initControl();
            
            player_bar.w = 150;
            boss_bar.w = 400;
        
            spaw_x = game.getWH().w2;
            spaw_y = game.getWH().h2;
        
            boss_1.setPosition(point(700, 400));
            
            game.setLoop("Menu");
        }
    }
    
    if(boss_bar.w <= 0){
        pjs.camera.setPosition(point(0, 0));
        win.draw();
        
        if(control.isDown("ENTER")){
            pjs.mouseControl.initControl();
            
            player_bar.w = 150;
            boss_bar.w = 400;
        
            spaw_x = game.getWH().w2;
            spaw_y = game.getWH().h2;
        
            boss_1.setPosition(point(700, 400));
            
            game.setLoop("Levels_menu");
        }
        //след уровень
    }
});

game.newLoop("update_level4", function(){
    
    if(player_bar.w > 0 && boss_bar.w > 0){
        GroundDraw();
    
        Gravity();
    
        BulletsState();
    
        BossState();
    
        PlayerMoveState();
    
        Camera();
        
    }
    
    if(player_bar.w <= 0){
        pjs.camera.setPosition(point(0, 0));
        fail.draw();
        
        if(control.isDown("ENTER")){
            player_bar.w = 150;
            boss_bar.w = 400;
        
            spaw_x = game.getWH().w2;
            spaw_y = game.getWH().h2;
        
            boss_1.setPosition(point(700, 400));
        }else if(control.isDown("ESC")){
            pjs.mouseControl.initControl();
            
            player_bar.w = 150;
            boss_bar.w = 400;
        
            spaw_x = game.getWH().w2;
            spaw_y = game.getWH().h2;
        
            boss_1.setPosition(point(700, 400));
            
            game.setLoop("Menu");
        }
    }
    
    if(boss_bar.w <= 0){
        pjs.camera.setPosition(point(0, 0));
        win.draw();
        
        if(control.isDown("ENTER")){
            pjs.mouseControl.initControl();
            
            player_bar.w = 150;
            boss_bar.w = 400;
        
            spaw_x = game.getWH().w2;
            spaw_y = game.getWH().h2;
        
            boss_1.setPosition(point(700, 400));
            
            game.setLoop("Levels_menu");
        }
        //след уровень
    }
});

game.newLoop("update_level5", function(){
    
     if(player_bar.w > 0 && boss_bar.w > 0){
        GroundDraw();
    
        Gravity();
    
        BulletsState();
    
        BossState();
    
        PlayerMoveState();
    
        Camera();
        
    }
    
    if(player_bar.w <= 0){
        pjs.camera.setPosition(point(0, 0));
        fail.draw();
        
        if(control.isDown("ENTER")){
            player_bar.w = 150;
            boss_bar.w = 400;
        
            spaw_x = game.getWH().w2;
            spaw_y = game.getWH().h2;
        
            boss_1.setPosition(point(700, 400));
        }else if(control.isDown("ESC")){
            pjs.mouseControl.initControl();
            
            player_bar.w = 150;
            boss_bar.w = 400;
        
            spaw_x = game.getWH().w2;
            spaw_y = game.getWH().h2;
        
            boss_1.setPosition(point(700, 400));
            
            game.setLoop("Menu");
        }
    }
    
    if(boss_bar.w <= 0){
        pjs.camera.setPosition(point(0, 0));
        win.draw();
        
        if(control.isDown("ENTER")){
            pjs.mouseControl.initControl();
            
            player_bar.w = 150;
            boss_bar.w = 400;
        
            spaw_x = game.getWH().w2;
            spaw_y = game.getWH().h2;
        
            boss_1.setPosition(point(700, 400));
            
            game.setLoop("Levels_menu");
        }
        //след уровень
    }
});

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

        //=====================MENU_LEVELS=========================//

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
        pjs.mouseControl.exitMouseControl();
        
        //создам прослушку клавиатуры

        control.initKeyControl();
        
        game.setLoop("update_level1");
    }
    
    if(pjs.mouseControl.isPeekObject("LEFT", level_2)){
        console.log("Press Levels - 2");
        
        //отключение перехвата мыши
        pjs.mouseControl.exitMouseControl();
        
        //создам прослушку клавиатуры

        control.initKeyControl();
        
        game.setLoop("update_level2");
    }
    
    if(pjs.mouseControl.isPeekObject("LEFT", level_3)){
        console.log("Press Levels - 3");
        
        //отключение перехвата мыши
        pjs.mouseControl.exitMouseControl();
        
        //создам прослушку клавиатуры

        control.initKeyControl();
        
        game.setLoop("update_level3");
    }
    
    if(pjs.mouseControl.isPeekObject("LEFT", level_4)){
        console.log("Press Levels - 4");
        
        //отключение перехвата мыши
        pjs.mouseControl.exitMouseControl();
        
        //создам прослушку клавиатуры

        control.initKeyControl();
        
        game.setLoop("update_level4");
    }
    
    if(pjs.mouseControl.isPeekObject("LEFT", level_5)){
        console.log("Press Levels - 5");
        
        //отключение перехвата мыши
        pjs.mouseControl.exitMouseControl();
        
        //создам прослушку клавиатуры

        control.initKeyControl();
        
        game.setLoop("update_level5");
    }
    
    if(pjs.mouseControl.isPeekObject("LEFT", exit)){
        console.log("Press Levels - exit");
        game.setLoop("Menu");
    }
}

//фрейм с выбором уровней
game.newLoop("Levels_menu", function(){
    LevelClick();
    
    background.draw();
    Level_draw();
    
    Hover_levels();
});

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