class Player{
    
    //скорость 
     set Speed(speed){
        this.speed = speed;
    }

    //высота прыжка
    set Jump_height(height){
        this.jump_height = height;
    }

    //направление 
    set Direction(dir){
        this.direction = dir;
    }

    //точка спауна
    set SpawnPoint  (x, y){
        this.spawn_x = x;
        this.spaw_y = y;
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
    
    //анимация ожидания
    set Wait(x, y, w, h, scale, delay, path, frame_count){
       this.wait = game.newAnimationObject({ 
            animation : tiles.newImage(path).getAnimation(0, 0, w, h, frame_count),
            x : x, 
            y : y, 
            w : w, 
            h : h,
            scale: scale,
            delay: delay
       });
    }
    
    //анимация бега
    set Run(x, y, w, h, scale, delay, path, frame_count){
        this.run = new game.newAnimationObject({
            animation : tiles.newImage(path).getAnimation(0, 0, w, h, frame_count),
            x : x, 
            y : y, 
            w : w, 
            h : h,
            scale: scale,
            delay: delay
        });
    }
    
    //анимация стрельбы
    set Shoot(x, y, w, h, scale, delay, path, frame_count){
        this.shoot = new game.newAnimationObject({
            animation : tiles.newImage(path).getAnimation(0, 0, w, h, frame_count),
            x : x, 
            y : y, 
            w : w, 
            h : h,
            scale: scale,
            delay: delay
        });
    }
    
    //конструктор
    constructor(){
        
    }
    
}