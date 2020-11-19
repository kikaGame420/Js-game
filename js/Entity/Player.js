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

//static sprite
var player = game.newImageObject({
    file: "assets/Player/player_static.png",
    x: spaw_x,
    y: spaw_y,
    scale: 0.65
});

//состояние ожидания
var player_wait = game.newAnimationObject(   { 
     animation : tiles.newImage("assets/Player/player_wait.png").getAnimation(0, 0, 192, 192, 5),
     x : player.getPosition().x, 
     y : player.getPosition().y, 
     w : 192, 
     h : 192,
     scale: 0.65,
     delay: 7
   });

//состояние бега
var player_run = game.newAnimationObject(   { 
     animation : tiles.newImage("assets/Player/player_run.png").getAnimation(0, 0, 192, 192, 6), 
     x : player.getPositionC().x, 
     y : player.getPositionC().y, 
     w : 192, 
     h : 192,
     scale: 0.65,
     delay: 0.80
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
     animation : tiles.newImage("assets/Player/player_attack.png").getAnimation(0, 0, 192, 192, 3), 
     x : player.getPosition().x, 
     y : player.getPosition().y, 
     w : 192, 
     h : 192,
     scale: 0.65,
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
    
    /*if((player.getPositionC().y) < bottom_b - 18){
        player_down.setPositionC(player.getPositionC());
        player_down.setFlip(direction, 0);
        player_down.draw();
    }*/
    
    //jump
    if(control.isPress("UP")){
        Jump();        
    }else if((control.isPress("UP") && control.isDown("RIGHT"))){
        Jump(); 
        
    }else if((control.isPress("UP") && control.isDown("LEFT"))){
        Jump();     
    }
}

function Attack(){  
    
    if(timer >= 10){
        
        var bullet = game.newRectObject({
        x: player.getPositionC().x + 55,
        y: player.getPositionC().y - 13,
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
                
        //колизия 
        for(var j=0; j<enemys_walk.length; j++){
            
            //проверка на то есть ли этот объект в массиве
            if(bullets.includes(bullets[i]) && enemys_walk.includes(enemys_walk[j]) && enemys.includes(enemys[j]))
                if((bullets[i].x >= enemys[j].x) && (bullets[i].x <= enemys[j].x + 128) && 
                   (bullets[i].y >= enemys[j].y) && (bullets[i].y <= enemys[j].y + 128))
                {
                    //удаление объектов 
                    bullets.splice(i, 1);
                    enemys.splice(j, 1);
                    enemys_walk.splice(j, 1);
                    console.log("Is Dead!!");
                }
        }
        
        //удаление из массива
        if(bullets.includes(bullets[i]))
            if(bullets[i].x > 1600 || bullets[i].x < 0)
                bullets.splice(i, 1);
    }
}

function Jump(){ 
    player.y -= jump_height;
}
