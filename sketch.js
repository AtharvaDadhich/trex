var PLAY=1;
var END=0;
var gameState=PLAY;
var count=0;


var trex
var ground 
var invisibleGround
var runningTrex
var groundImage
var cloudImage
var cloudsGroup
var obstacleGroup
var obstacle1
var obstacle2
var obstacle3
var obstacle4
var obstacle5
var obstacle6
var collidedTrex
var gameOver, gameoverImage
var restart, restartImage

function preload (){
runningTrex=loadAnimation("trex1.png", "trex3.png","trex4.png")
collidedTrex=loadAnimation("trex_collided.png")
  groundImage=loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  gameoverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);
  trex=createSprite(25,180,20,50);
  gameOver=createSprite(300,100);
  restart=createSprite(300,150);
  gameOver.addImage("gameover",gameoverImage);
  restart.addImage("restart",restartImage);
  gameOver.scale=0.5
  restart.scale=0.5
  gameOver.visible=false;
  restart.visible=false;
  
  
   ground=createSprite(300, 185);
  ground.addImage("ground", groundImage);
  invisibleGround=createSprite(300, 190, 600, 10);
  invisibleGround.visible=false;
  trex.scale=0.5;
  obstacleGroup=new Group()
 cloudGroup=new Group()
  trex.addAnimation("running",runningTrex);
   trex.addAnimation("collided",collidedTrex);
  trex.setCollider('circle',-10,0,40)
  
}

function draw() {
  background("white");
  
  
if (gameState===PLAY){
  
    if(keyDown("space")&& trex.y>=159){
    trex.velocityY=-10;
   }
count = count+Math.round(getFrameRate()/4);
    trex.velocityY = trex.velocityY + 0.8
  ground.velocityX=-5
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(trex.isTouching(obstacleGroup)){
        
        gameState = END;
    }
}
  else if (gameState === END) {
    
  trex.changeAnimation("collided",collidedTrex);
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
   
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
  
    gameOver.visible=true;
    restart.visible=true;
    
  }
  if(mousePressedOver(restart)){
    reset();
  }
  text("score"+count,30,30);
  drawSprites()
}
function spawnClouds(){
  if(frameCount%60===0){
  var cloud
  cloud=createSprite(600, 120)
    cloud.velocityX=-5;
    cloud.y=Math.round(random(80, 120));
    cloud.addImage("cloud", cloudImage);
    cloud.scale=0.5;
    cloud.lifetime=130;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;  
    cloudGroup.add(cloud)
    }
  
}

function spawnObstacles(){
  if(frameCount%60===0){
    var obstacle
    obstacle=createSprite(600, 170 )
    obstacle.velocityX=-5
    rand=Math.round(random(1, 6))
    obstacle.scale=0.5
    obstacle.lifetime=130;
    obstacleGroup.add(obstacle);
    switch(rand){
      case 1: obstacle.addImage("obstacle image",obstacle1)
      break;
      case 2: obstacle.addImage("obstacle image",obstacle2)
      break;
      case 3: obstacle.addImage("obstacle image",obstacle3)
      break;
      case 4: obstacle.addImage("obstacle image",obstacle4)
      break;
      case 5: obstacle.addImage("obstacle image",obstacle5)
      break;
      case 6: obstacle.addImage("obstacle image",obstacle6)
      break;
    }
  }
  
}
function reset(){
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  gameOver.visible=false;
    restart.visible=false;
    count=0;
  gameState=PLAY;
  trex.changeAnimation("running",runningTrex);
}