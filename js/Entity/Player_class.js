class Player{
    
    setPlayerVariables(health, gravity, speed, height){
        this.health = health; //здоровье
        this.gravity = gravity; //гравитация
        this.speed = speed; //скорость 
        this.jump_height = height; //высота прыжка
        this.direction = 0; //направление
        
        this.bullets = []; //массив пуль
        this.path = "assets/Player/bullet.png";
    }
    
    //точка спауна
    setSpawnPoint(x, y){
        this.spawn_x = x;
        this.spawn_y = y;
    }
       
    //управление
    initControlKeys(left, right, jump, shoot){
        this.Left = left;
        this.Rigth = right;
        this.Jump = jump;
        this.Shoot = shoot;
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
    
    //анимация ожидания
    setWaitAnimation(x, y, w, h, scale, delay, path, frame_count){
       this.player_wait = game.newAnimationObject({ 
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
        return this.player_wait;
    }
    
    //анимация бега
    setRunAnimation(x, y, w, h, scale, delay, path, frame_count){
        this.player_run = new game.newAnimationObject({
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
    setShootAnimation(x, y, w, h, scale, delay, path, frame_count){
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
            var bullet = new Bullet(30, this.direction);
            bullet.setBulletImage(this.player_wait.getPositionC.x + 55,
                                 this.player_wait.getPositionC.y - 13,
                                 1, this.path);
            
            //массив с пулями
            this.bullets.push(bullet);
            this.timer = 0;
            
        }else this.timer++;
    }
    
    Jump(){
        if(this.wait.y > this.jump_height)
            this.wait.y -= this.jump_height;
    }
    
    BulletUpdate(){
        
        for(var i=0; i < this.bullets.length; i++){
        
        this.bullets[i].Move();
                        
        //удаление из массива пуль вышедших за пределы мира
        if(this.bullets.includes(this.bullets[i]))
            if(this.bullets[i].x > 1600 || this.bullets[i].x < 0)
                this.bullets.splice(i, 1);
        }
    }
    
    PlayerControl(){
        
        //движение игрока
        if(control.isDown(this.Left)){
            //анимация бега
            this.player_run.setPositionC(this.wait.getPositionC());
            this.player_run.setFlip(1, 0);
            this.player_run.draw();
            this.direction = 1;
            
            //движение влево
            if(this.player_wait.getPositionC().x >= 30)
                this.player_wait.move(point(-this.speed, 0));
            
        }else if(control.isDown(this.Rigth)){
            //анимация бега
            this.player_run.setPositionC(this.wait.getPositionC());
            this.player_run.setFlip(0, 0);
            this.player_run.draw();
            this.direction = 0;
            
            //движение влево
            if(this.player_wait.getPositionC().x <= 1506)
                this.player_wait.move(point(this.speed, 0));
            
        }else if(control.isDown(this.Shoot)){
            //анимация атаки
            this.shoot.setPositionC(this.wait.getPositionC());
            this.shoot.setFlip(this.direction, 0);
            this.shoot.draw();
            
            //Атака
            this.Attack();
        } else {
            //анимация ожидания
            this.player_wait.setFlip(this.direction, 0);
            this.player_wait.draw();
        }
        
        //прыжок
        if(control.isDown(this.Jump)){
            this.Jump();
        }else if(control.isDown(this.Jump) && control.isDown(this.Left)){
            this.Jump();     
        }else if(control.isDown(this.Jump) && control.isDown(this.Right)){
            this.Jump();
        }
    }
    
    Gravity(y){
        if(this.wait.getPositionC().y < y - 18)
            this.wait.y += this.gravity;
    }
    
    Collision(obj){
        //добавить проверку на id
        if(this.wait.isIntersect(obj)){
            //уменьшаем здоровье игрока или тормозим его движение
        }
    }
    
    //главная функция
    PlayerUpdate(){
        this.Gravity();
        this.Collision();
        this.PlayerControl();
        this.BulletUpdate();
    }
    
    //конструктор
    constructor(){}
    
}