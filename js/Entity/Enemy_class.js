class Enemy{
    
    //сила атаки
    set Power(power){
        this.power = power;
    }
    
    //скорость
    set Speed(speed){
        this.speed = speed;
    }
    
    //здоровье
    set Health(health){
        this.health = health;
    }
    
    //полоска здоровья
    set HealthBar(x, y, w, h, color){
        this.health_bar = game.newRectObject({
            x: x,
            y: y,
            w: w,
            h: h,
            fillColor: color
        });
    }
    
    //анимация ходьбы
    set Walk(x, y, w, h, scale, delay, path, frame_count){
        this.walk = game.newAnimationObject({
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
    set Attack(x, y, w, h, scale, delay, path, frame_count){
        this.attack = game.newAnimationObject({
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
    
    constructor(power, speed, health){
        this.power = power;
        this.speed = speed;
        this.health = health;
    }
    
}