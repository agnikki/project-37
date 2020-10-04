//global variables
var PLAY=1;
var END=0;
var gameState=PLAY;
var trex, trex_running, trex_collied;
var ground, invisible_ground, ground_img, ground2, invisible_ground2;
var gameover_img,restart_img;
var cloudGroup, cloud_img;
var cactusGroup,ob1,ob2,ob3,ob4,ob5,ob6;
var score, dist;
var flag =0;

function preload() {
  trex_run=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadImage("trex_collided.png");
  ground_img=loadImage("ground2.png");
  cloud_img=loadImage("cloud.png");
  ob1=loadImage("ob1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");

  gameover_img=loadImage("gameOver.png");
  restart_img=loadImage("restart.png");
}

function setup() {
 createCanvas(displayWidth-20,windowHeight);
  
  trex=createSprite(50,180,20,50);
  trex.addAnimation("running",trex_run);
  trex.scale=0.5;
  trex.addAnimation("collided",trex_collided);
  
  gameover=createSprite(300,100);
  gameover.addImage(gameover_img);
  gameover.scale=0.5;
  gameover.visible=false;

  restart=createSprite(300,140);
restart.addImage(restart_img);
restart.scale=0.5;
restart.visible=false;

  ground=createSprite(300,280,600,20);
  ground.addImage(ground_img);
  ground.x=ground.width/2;
  
  ground2.createSprite(200,180,400,20);
  ground2.addImage("ground", ground_img);
  ground2.x=ground.width + ground.width/2;

  invisible_ground = createSprite(300,290,600,5);
invisible_ground.visible = false;

invisible_ground2=createSprite(ground2.x,190,ground.width,10);
  
  cloudGroup=new Group();
  cactusGroup=new Group();
  
  score=0;
  dist = ground.width;
}

function draw() {
  background(180);
 
if(gamestate===PLAY){
  score=score+Math.round(getFrameRate()/60);
  text("HI "+score,400,40);
  
  if(keyDown("space")){
    trex.velocityY=-14;
  }
  trex.velocityY=trex.velocityY+0.8;
camera.position.x=trex.x+500;

if(trex.x>=dist-displayWidth){
  if(flag == 0){
    ground2.x = dist+ground.width/2;
    invisible_ground2.x= ground2.x;
    flag=1;
  }
  else{
    ground.x = dist+ground.width/2;
    invisible_ground.x= ground.x;
    flag=0;
  }
  dist+=ground.width;
}
  trex.collide(invisible_ground);
  trex.collide(invisible_ground2);
  spawnClouds();
  spawnCactus();
  
  if(trex.isTouching(cactusGroup)){
    gamestate=END;
  }
  }
  else if(gamestate===END){
    gameover.x = trex.x+200;
    restart.x = trex.x+200;
    gameover.visible=true;
 restart.visible=true;
 if(mousePressedOver(restart)){
  reset();
}
    trex.velocityX=0;
    trex.velocityY=0;
  
 cactusGroup.setLifetimeEach(-1);
 cloudGroup.setLifetimeEach(-1);

 trex.changeAnimation("collided");
 
  }
  drawSprites();
}

function reset(){
  gamestate= PLAY;
 
  gameover.visible=false;
  restart.visible=false;

  cloudGroup.destroyEach();
  cactusGroup.destroyEach();
  trex.changeAnimation("running");
 
  score=0;
}
function spawnClouds(){
 if(frameCount%100===0){
  var cloud=createSprite(trex.x+displayWidth-100,120,40,10);
  cloud.y=Math.round(random(80,120));
  cloud.addImage(cloud_img);
  cloud.scale=0.75;
  //cloud.velocityX=-3;
  cloud.lifetime=displayWidth/trex.velocityX+30;
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
 
  
  cloudGroup.add(cloud);
 }
} 

function spawnCactus() {
 if(World.frameCount%120===0){ 
  var cactus=createSprite(trex.x+displayWidth-100,165,10,40);
  var r=Math.round(random(1,6));
    switch(rand){
      case 1:cactus.addImage(ob1);
        break;
      case 2:cactus.addImage(ob2);
        break;
      case 3:cactus.addImage(ob3);
        break;
      case 4:cactus.addImage(ob4);
        break;
      case 5:cactus.addImage(ob5);
        break;
      case 6:cactus.addImage(ob6);
        break;
        default:break;
    } 

  cactus.scale=0.5;
  cactus.lifetime=displayWidth/trex.velocityX+30;
  cactusGroup.add(cactus);
}
}
/*function crows() {
  if(frameCount%70===0){
 crow=createSprite(600,Math.round(random(200,260)),40,10);
    crow.addImage(crow_img);
    crow.scale=0.13;
    crow.velocityX=-(4+(score/100));
    crow.lifetime=200;
    crowGroup.add(crow);
  }
}*/
