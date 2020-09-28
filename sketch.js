//global variables
var clouds,trex,ground,ob1,ob2,ob3,ob4,ob5,ob6,trex_run,
    trex_collided,gameover,restart,invisible_ground,
  ground_img,gameover_img,restart_img,crows,score,PLAY,END,crow_img,gamestate,trex_duck_img,cloud_img,cloudGroup,
    cactusGroup,crowGroup,invisible_ground;

function preload() {
  trex_run=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadAnimation("trex_collided.png");
  ground_img=loadImage("ground2.png");
  gameover_img=loadImage("gameOver.png");
  restart_img=loadImage("restart.png");
  crow_img=loadImage("Bird.png");
  trex_duck_img=loadAnimation("Dino.png");
  cloud_img=loadImage("cloud.png");
  ob1=loadImage("ob1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 300);
  
  
  trex=createSprite(50,260,20,20);
  trex.addAnimation("running",trex_run);
  trex.addAnimation("collided",trex_collided);
  trex.addAnimation("duck",trex_duck_img);
  trex.scale=0.5;
  
  ground=createSprite(300,280,600,20);
  ground.addImage(ground_img);
  ground.x=ground.width/2;
  
  invisible_ground = createSprite(300,290,600,5);
invisible_ground.visible = false;
  
   gameover=createSprite(300,100);
gameover.addImage(gameover_img);
gameover.scale=0.5;
gameover.visible=false;

restart=createSprite(300,140);
restart.addImage(restart_img);
restart.scale=0.5;
restart.visible=false;
  
  cloudGroup=new Group();
  cactusGroup=new Group();
  crowGroup=new Group();
  PLAY=1;
  END=0;
  gamestate=PLAY;
  
  score=0;
}

function draw() {
  background(180);
  text("HI "+score,400,40);
if(gamestate===PLAY){
  ground.velocityX=-(3+(score/100));
  if(ground.x<0){
    ground.x=ground.width/2;
}
  score=score+Math.round(getFrameRate()/30);
  if(keyDown("space")){
    trex.velocityY=-10;
  }
  trex.velocityY=trex.velocityY+1;
  trex.collide(invisible_ground);
  clouds();
  if(score%1000>1 && score%1000<600){
   cacti(); 
  }else if(score%1000<1 && score%1000>600){
 crows();
  }
  if(keyWentDown("D")){
    trex.addAnimation("ducking",trex_duck_img);
    trex.scale=0.15;
  }
  if(keyWentUp("D")){
    trex.changeAnimation("running",trex_running);
    trex.scale=0.5;
  }
  if(cactusGroup.isTouching(trex)||crowGroup.isTouching(trex)){
    gamestate=END;
  }
  }
  else if(gamestate===END){
    ground.velocityX=0;
    trex.velocityY=0;
    cactusGroup.setVelocityXEach(0);
    crowGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.changeAnimation("collided",trex_collided);
 gameover.visible=true;
 restart.visible=true;
 cactusGroup.setLifetimeEach(-1);
 crowGroup.setLifetimeEach(-1);
 cloudGroup.setLifetimeEach(-1);
 if(mousePressedOver(restart)){
   reset();
 }
  }
  drawSprites();
}

function clouds(){
 if(World.frameCount%50===0){
  var cloud=createSprite(600,240,40,10);
  cloud.y=Math.round(random(180,240));
  cloud.addImage(cloud_img);
  cloud.scale=0.75;
  cloud.velocityX=-3;
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
  cloud.lifetime=200;
  
  cloudGroup.add(cloud);
 }
} 

function cacti() {
 if(World.frameCount%60===0){ 
  var cactus=createSprite(600,260,10,40);
  var r=Math.round(random(1,6));
    switch(r){
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
  cactus.velocityX=-(4+(score/100));
  cactus.lifetime=200;
  cactusGroup.add(cactus);
}
}
function crows() {
  if(frameCount%70===0){
 crow=createSprite(600,Math.round(random(200,260)),40,10);
    crow.addImage(crow_img);
    crow.scale=0.13;
    crow.velocityX=-(4+(score/100));
    crow.lifetime=200;
    crowGroup.add(crow);
  }
}
function reset(){
  gamestate= PLAY;
  crowGroup.destroyEach();
  cloudGroup.destroyEach();
  cactusGroup.destroyEach();
  trex.changeAnimation("running",trex_run);
  gameover.visible=false;
  restart.visible=false;
  score=0;
}