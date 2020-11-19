 //Level state

var ground_b = game.newImageObject({
    file: "assets/Ground/ground_big.png",
    x: 0,
    y: 600,
    scale: 1
});

var ground_r = game.newImageObject({
    file: "assets/Ground/ground_r_big.png",
    x: 0,
    y: 600,
    scale: 1
});

var gravity = 5.5;

var bottom_b = ground_b.y;

function GroundDraw(){    
    ground_b.draw();
}

function Gravity(){
    
    // гравитация для персонажа
    if((player.getPositionC().y) < bottom_b - 18){
        player.y += gravity;
    }
}

////фрейм с игрой
game.newLoop("update", function(){
    GroundDraw();
    Gravity();
    BulletsState();
    EnemyState();
    PlayerMoveState();
    Camera();
});