class Level{
        
    //жизни
  
    
    initLevel(widht){
        this.width = widht;
        
        this.Background = []; //фон
        this.Foreground = []; //земля
        this.decorations = []; //декорации 
        this.arts = []; //артефакты
        this.obstacles = []; //препятсвия
        this.Enemys = []; //противники
    }
    
    //инициализируем фон
    initBackground(w, h, scale, path){        
        this.bg_count = this.width / w;
        
        this.bg = game.newImageObject({
            file: path,
            x: 0,
            y: 0,
            w: w,
            h: h,
            scale: scale
        });
        
        //заполням фон картинками
        for(var i=0; i< this.bg_count; i++){
            this.bg.x = i * w;
            this.Background.push(bg);
        }
    }
    
    //инициализируем землю
    initForeground(w, h, scale, path){
        this.fg_count = this.width / w;
        
        this.fg = game.newImageObject({
            file: path,
            x: 0,
            y: 0,
            w: w,
            h: h,
            scale: scale
        });
        
        for(var i=0; i<this.fg_count; i++){
            this.fg.x = i * w;
            this.Foreground.push(this.fg);
        }
    }
    
    //инициализируем Декорации
    initDecoration(count, y, scale, path){
        
        for(var i=0; i<count; i++){
            this.dec = game.newImageObject({
                file: path,
                x: this.getRIR(0, this.width),
                y: y,
                scale: scale
            });
            
            this.decorations.push(this.dec);
        }
        
    }
    
    //инициализируем Артефакты
    initArtefacts(count, y, scale, path){
        
        for(var i=0; i<count; i++){
            this.art = game.newImageObject({
                file: path,
                x: this.getRIR(0, this.width),
                y: y,
                scale: scale 
            });
            
            this.arts.push(this.art);
        }
    }
    
    //инициализируем Препятствия
    initObstacles(count, y, scale, path){
        
        for(var i=0; i<count; i++){
            this.obs = game.newImageObject({
                file: path,
                x: this.getRIR(0, this.width),
                y: y,
                scale: scale 
            });
            
            this.obstacles.push(this.obs);
        }
    }
    
    //инициализируем Врагов
    initEnemys(){
        
    }
    
    LevelUpdate(){
        
    }
    
    //рандомное число
    getRIR(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}