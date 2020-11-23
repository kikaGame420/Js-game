class Enemy{
    
    //инициализация игрока
    setEnemyVariables(power, speed, health){
        this.power = power; //сила атаки
        this.speed = speed;  //скорость
        this.health = health; //здоровье
    }
    
    //полоска здоровья
    setHealthBar(x, y, w, h, color){
        this.health_bar = game.newRectObject({
            x: x,
            y: y,
            w: w,
            h: h,
            fillColor: color
        });
    }
    
    //анимация ходьбы
    setWalkAnimation(x, y, w, h, scale, delay, path, frame_count){
        this.enemy_walk = game.newAnimationObject({
            animation : tiles.newImage(path).getAnimation(0, 0, w, h, frame_count),
            x : x, 
            y : y, 
            w : w, 
            h : h,
            scale: scale,
            delay: delay
        });
    }
    
    //анимация атаки
    setAttackAnimation(x, y, w, h, scale, delay, path, frame_count){
        this.enemy_attack = game.newAnimationObject({
            animation : tiles.newImage(path).getAnimation(0, 0, w, h, frame_count),
            x : x, 
            y : y, 
            w : w, 
            h : h,
            scale: scale,
            delay: delay
        });
    }
    
    //поведение врага
    EnemyState(){
        
        if(this.health_bar.w > 0){
            //коллизия с пулями
            
            //следование за игроком
        }
        
    }
    
    constructor(){}
    
}