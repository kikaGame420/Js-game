class Bullet{
    
    construct(speed, dir){
        this.speed = speed;
        this.dir = dir;
    }
    
    //картинка пули
    setBulletImage(x, y, scale, path){
        this.bullet_image = game.newImageObject({
            file: path,
            x : x, 
            y : y, 
            scale: scale
        })
    }
    
    //возвращает картинку
    getBulletImage(){
        return this.bullet_image;
    }
    
    //двигает пулю в зависимости от направления
    Move(){
        if(this.dir == 0){
            this.bullet_image.x += this.speed;
            this.bullet_image.draw();
        } else if(this.dir == 1){
            this.bullet_image.x -= this.speed;
            this.bullet_image.draw();
        }
    }
    
    //изменение координаты x
    setBulletX(x){
        this.bullet_image.x = x;
    }
    
    //получение координаты x
    getBulletX(){
        return this.bullet_image.x;
    }
}