//to create variables
    var monkey , monkey_running;
    var banana ,bananaImage, obstacle, obstacleImage;
    var FoodGroup, obstacleGroup;
    var score;


//to load animations and images for variables
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400); 
  
//to create variable for survival time  
      var survivalTime = 0;
  
//to create sprite for monkey   
     monkey = createSprite(80,315,20,20);
     monkey.addAnimation("moving",monkey_running); 
     monkey.scale = 0.1;

//to create sprite for ground
     ground = createSprite(400,350,900,10);
     ground.velocityX = -4; 
     ground.x = ground.width/2;
//console.log(ground.x); 
 
//to add new groups for food and obstcales 
     FoodGroup = new Group();
     obstacleGroup = new Group();

// to create score 
      score = 0;
}


function draw() {
  
//to clear the background
      background("green");
//console.log(survivalTime);
  
//to make function for resetting the ground 
      if(ground.x<0){
     ground.x = ground.width/2;
     } 
  
 //to make monkey jump when pressed space 
      if(keyDown("space")){
        monkey.velocityY = -12;
      }
  
//to give gravity to monkey   
     monkey.velocityY = monkey.velocityY + 0.8;
 
//to make monkey collide with ground  
      monkey.collide(ground);
  
//to make function for obstacles  
      obstacle();
  
//to make function for food 
      food();
  
//to draw sprites  
      drawSprites();

//to make text for score  
     stroke("white");
     textSize(20);
     fill("white");
     text("Score: "+ score, 500,50);  
  
//to make text for survival time   
     stroke("black");
     textSize(20);
     fill("black");
     survivalTime=Math.ceil(frameCount/frameRate()) 
     text("Survival Time: "+ survivalTime, 100,50);
  
//to make obstcales group touching with monkey and set conditions  
      if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
      }
  
} 
  
//to create function for food  
    function food(){
      if(frameCount%80===0){
   //to create sprite for banana     
        banana = createSprite(600,140,50,30);
    
   //to give velocity to banana     
        banana.velocityX = -4;
        
   //to add image for banana     
        banana.addImage(bananaImage);
        
   //to add scale for banana     
        banana.scale = 0.1;
        
   //to make random entry of bananas     
        banana.y = Math.round(random(120,200));
        
   //to set lifetime to banana to prevent memory leak    
        banana.lifetime = 150;
        
    //to increment monkey's depth by banana's depth +1    
        monkey.depth = banana.depth+1;
        
    //to add banana into food group    
        FoodGroup.add(banana);
      }
}


//to create function for obstacles
    function obstacle(){
      if(frameCount%300===0){
   //to create sprite for obstacles     
        obstacles = createSprite(450,310,90,120);
        
   //to add image for obstacles     
        obstacles.addImage(obstacleImage);
        
   //to give scale to obstacles     
        obstacles.scale = 0.2;
        
    //to give negative x velocity to obstacles    
        obstacles.velocityX = -6;
        
    //to add obstacles into obstacles group    
        obstacleGroup.add(obstacles);
        
    //to give lifetime to obstcales to prevent memory leak    
        obstacles.lifetime = 300;
      }
    }

