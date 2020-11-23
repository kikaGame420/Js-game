class Player{
    
    //здоровье
    set Health(health){
        this.health = health;
    }
    
    //гравитация
    set Gravity(gravity){
        this.gravity = gravity;
    }
    
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
    set SpawnPoint(x, y){
        this.spawn_x = x;
        this.spaw_y = y;
    }
       
    //управление
    Left;
    Rigth;
    Jump;
    Shoot;
    
    set ControlKeys(left, right, jump, shoot){
        this.Left = left;
        this.Rigth = right;
        this.Jump = jump;
        this.Shoot = shoot;
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
    
    getPlayer(){
        return this.wait;
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
    
    Attack(){
        
        if(this.timer >= 10){
            //пуля
            
            if(this.direction == 0){
                //направление пули;
            }else //направление пули;
                
            //массив с пулями
            this.timer = 0;
            
        }else this.timer++;
    }
    
    Jump(){
        if(this.wait.y > this.jump_height)
            this.wait.y -= this.jump_height;
    }
    
    PlayerControl(){
        
        //движение игрока
        if(control.isDown(this.Left)){
            //анимация бега
            this.run.setPositionC(this.wait.getPositionC());
            this.run.setFlip(1, 0);
            this.run.draw();
            this.direction = 1;
            
            //движение влево
            if(this.wait.getPositionC().x >= 30)
                this.wait.move(point(-this.speed, 0));
            
        }else if(control.isDown(this.Right)){
            //анимация бега
            this.run.setPositionC(this.wait.getPositionC());
            this.run.setFlip(0, 0);
            this.run.draw();
            this.direction = 0;
            
            //движение влево
            if(this.wait.getPositionC().x <= 1506)
                this.wait.move(point(this.speed, 0));
            
        }else if(control.isDown(this.Shoot)){
            //анимация атаки
            this.shoot.setPositionC(this.wait.getPositionC());
            this.shoot.setFlip(this.direction, 0);
            this.shoot.draw();
            
            //Атака
            Attack();
        } else {
            //анимация ожидания
            this.wait.setFlip(this.direction, 0);
            this.wait.draw();
        }
        
        //прыжок
        if(control.isDown(this.Jump)){
            Jump();
        }else if(control.isDown(this.Jump) && control.isDown(this.Left)){
            Jump();     
        }else if(control.isDown(this.Jump) && control.isDown(this.Right)){
            Jump();
        }
    }
    
    Gravity(y){
        if(this.wait.getPositionC().y < y - 18)
            this.wait.y += this.gravity;
    }
    
    Collision(obj){
        if(this.wait.isIntersect(obj)){
            //уменьшаем здоровье игрока или тормозим его движение
        }
    }
    
    //конструктор
    constructor(health, speed, height, gravity){
        this.health = health;
        this.speed = speed;
        this.height = height;
        this.gravity = gravity;
    }
    
}