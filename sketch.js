var bg , bgImg , maskbutton , maskbuttonImg , panel , particals;
var object , objectImg , ObjectsGroup; 
var invisibleBlock , gameOver , gameOverImg;
var gamestate = "play";
var score = 0;


function preload()
{

    bgImg = loadImage("Background.png");        


    objectImg = loadImage("Obstacle.png")
    panelImg = loadImage("WoodenPanel.png")

    gameOverImg = loadImage("gameOver.png")
    maskbuttonImg = loadImage("Maskbutton.png")


    particals = loadImage("Particle.png")                          
    playerImg = loadImage("Player.png")
    

}
function setup() 
{
    createCanvas(800,450)

    bg = createSprite(0,0,900,450);
    bg.addImage("bg", bgImg);
    bg.x = bg.width/2
    

    player = createSprite(100,190,10,10)
    player.addImage("player" , playerImg) 
    player.scale = 0.2
    player.setCollider('rectangle',0,0,800,210)
    player.debug = false
   
    invisibleBlock = createSprite(0,0,10,890)
    invisibleBlock.visible = false;

    gameOver = createSprite(400,200,80,60);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.4
    gameOver.visible = false;
  
    maskbutton = createSprite(400,240,20,90);
    maskbutton.addImage(maskbuttonImg);
    maskbutton.scale = 0.1
    maskbutton.visible = false;

    // ObjectsGroup = new Group 
    ObjectsGroup = createGroup();
   
}

function draw() 
{

    background("bg");
    

    if(gamestate === "play"){

        score = score + Math.round(getFrameRate()/60);

        bg.velocityX = -6

        if(keyDown("up_arrow"))
        {
            player.y -= 10
        }

        if(keyDown("down_arrow"))
        {
            player.y += 10
        }

        if(keyDown("shift"))
        {
            player.y = 190
        }

        if(bg.x < 0)
        {
            bg.x = bg.width/2;
        }
    
        // ObjectsGroup.setLifetimeEach(90);
        gameOver.visible = false;
        maskbutton.visible = false;

        // mbg();
        spawnObject();

        if(ObjectsGroup.isTouching(player)){
                gamestate = "end";
                // console.log("end stste 1")
         }
            
    }
    
    else if (gamestate === "end")
    { 
        gameOver.visible = true;
        maskbutton.visible = true;
        
        bg.velocityX = 0;
        player.velocityY = 0;
        
        // ObjectsGroup.destroyEach();
        ObjectsGroup.setVelocityXEach(0);
        ObjectsGroup.setLifetimeEach(-1);

        
        if(mousePressedOver(maskbutton)) {      
            reset();
            // ObjectsGroup.destroyEach();
            
          }

    }
    
    
    drawSprites();

    textSize(20);
    fill("black")
    text("Score: "+ score,610,80);
}

function reset()
{ 
   gamestate = "play"
   
   gameOver.visible = false;
   maskbutton.visible = false;

   ObjectsGroup.destroyEach();

   score = 0;
   
   player.x = 100;
   player.y = 190;
}



function spawnObject()
{
    if(frameCount % 60 === 0) 
    {
         var object = createSprite(200,-50);
         object.y = Math.round(random(90,290));
         object.x = Math.round(random(800,600));

         object.velocityX = -(2 + 3*score/100);

     object.setCollider('circle',0,0,250)
     object.debug = false

     object.addImage("ob" , objectImg)
     object.velocityX = -10;

   
        var rand = Math.round(random(3,6));
        switch(rand) 
        {
            case 1: object.addImage(objectImg);
                     break;
            default: break;
        }
   
        object.scale = 0.2;
        object.lifetime = 200;
    
       
        ObjectsGroup.add(object)
     
    }
}



