var enemys = [];

//анимация врагов
var enemys_walk = [];

//спавн врагов
function Spawn(){
    
    var count = 1400;
    
    for(var i=0; i<6; i++){
        
        var enemy_walk = game.newAnimationObject({
            animation : tiles.newImage("assets/Enemys/enemy_walk_1.png").getAnimation(0, 0, 192, 136, 4),
            x : player.getPosition().x, 
            y : player.getPosition().y, 
            w : 192, 
            h : 136,
            scale: 0.65,
            delay: 7
        });
        
        var enemy = game.newImageObject({
            file: "assets/Enemys/enemy_3.png",
            x: 0,
            y: 200,
            scale: 0.65
        });
        
        count += 100;
        
        enemy.x += count;
        enemy_walk.x += count;
        
        enemys.push(enemy);
        enemys_walk.push(enemy_walk);
    }
}

//отрисовка врагов
function EnemyState(){
    
    for(var i=0; i<enemys.length; i++){
        
        if(enemys.includes(enemys[i]) && enemys_walk.includes(enemys_walk[i])){
            //движение в вправо
            if(enemys[i].getPositionC().x >= 30)
                enemys[i].move(point(-0.7, 0));
    
            //гравитация
            if(enemys[i].getPositionC().y < bottom_b - 46){
                enemys[i].y += gravity;
            }
            
            //переопределение позиии для анимации
            enemys_walk[i].setPositionC(enemys[i].getPositionC());
        
            //отрисовка
            if(enemys[i].getPositionC().y < bottom_b - 46){
                enemys[i].draw();
            } else enemys_walk[i].draw();
        }
    }
}