let direction = "left";
let snake= []
let score = 0

let food = {x: 200, y: 200};

let gridSize = 10;

let backgroundColor = "rgb(0,0,0)";

let myFont, mySound;

let playState = false;

let showText = false;

let autoPilot = false;


function preload() 
{
    myFont = loadFont('arcadeclassic.ttf');
    mySound = loadSound('happynes.mp3');
}

function setup()
{
    mySound.setVolume(0.005)
    createCanvas(innerWidth,innerHeight)
    textFont(myFont);

    snake = []
    for (let i = 0; i < 10; i++) {
        snake.push({x: (i * gridSize) + 100, y: 100})
    }
}

function mouseClicked() 
{
    if (playState == false) 
    {
        restart()
    }
}

function draw()
{
    
    background(backgroundColor)

    score = Math.floor(snake.length * snake.length - 100)

    fill(255)
    textSize(30)
    text("Snake", 10, 30)
    text("Score     " + score, width/2 - 100, 30)
    text("By  Ted  Mburu", width - 200, 30)



    



    

    
    if (playState)  
    {
        fill("red")
        rect(food.x, food.y, 10, 10)

        fill(255)
        snake.forEach(peice => {
            rect(peice.x, peice.y, 10, 10)
        });
        move(direction)
        frameRate(snake.length)
    }
    else
    {
        frameRate(2)
        if (showText) 
        {
            text("Click   anywhere   to   begin", width/2 - 200, height/2)
            showText = false
        }
        else
        {
            showText = true
        }
        
    }

    doAutoPilot()
}

function doAutoPilot()
{
    let head = snake[0];
    if(autoPilot == true)
   {
      if (head.x > food.x)
      {
        direction = "left";
      }
      if (head.x < food.x)
      {
        direction = "right";
      }
      if (head.y > food.y)
      {
        direction = "up";
      }
      if (head.y < food.y)
      {
        direction = "down";
      }
   }
}

function restart()
{
    playState = true;
    direction = "left";
    mySound.stop();
    mySound.loop();
    backgroundColor = "rgb(0,0,0)";
    snake = []
    for (let i = 0; i < 10; i++) {
        snake.push({x: (i * gridSize) + 100, y: 100})
    }
}

function grow()
{
    snake.push(snake[snake.length-1])

    return snake.length
}

function keyPressed()
{
    
    if (keyCode === UP_ARROW && direction != "down") 
    {
        direction = "up"
    }
    if (keyCode === DOWN_ARROW && direction != "up") 
    {
        direction = "down" 
    }
    if (keyCode === LEFT_ARROW && direction != "right") 
    {
        direction = "left"
    }
    if (keyCode === RIGHT_ARROW && direction != "left") 
    {
        direction = "right"
    }

    if (keyCode == 32) 
    {
        toggleAutoPilot()    
    }
}


function toggleAutoPilot()
{
    if (autoPilot == true) 
    {
        autoPilot = false;    
    }
    else 
    {
        autoPilot = true
    }
}


function move(moveDirection)
{
    for(var i = snake.length - 1; i > 0; i--)
	{
		snake[i] = {x: snake[i - 1].x, y: snake[i - 1].y};
	}
    

    if (moveDirection == "up") 
    {
        if (snake[0].y > 0) 
        {
            snake[0].y -= gridSize; 
        }
        else
        {
            snake[0].y = height;
        }
    }
    if (moveDirection == "down") 
    {
        if (snake[0].y < height) 
        {
            snake[0].y += gridSize; 
        }
        else
        {
            snake[0].y = 0;
        } 
    }
    if (moveDirection == "left") 
    {
        if (snake[0].x != 0) 
        {
            snake[0].x -= gridSize; 
        }
        else
        {
            snake[0].x = width;
        }
    }
    if (moveDirection == "right") 
    {
        if (snake[0].x != width) 
        {
            snake[0].x += gridSize; 
        }
        else
        {
            snake[0].x = 0;
        } 
    }

    if (snake[0].x == food.x && snake[0].y == food.y) 
    {
        grow()    
        food.x = Math.floor(Math.random() * width / 10) * 10
        food.y = Math.floor(Math.random() * height / 10) * 10
    }

    snake.forEach((peice, i) => {
        if (peice.x == snake[0].x && peice.y == snake[0].y && i > 2) {
            console.log("die");
            //noLoop()

            let randR, randG, randB;

            randR = Math.round(Math.random() * 255)
            randG = Math.round(Math.random() * 255)
            randB = Math.round(Math.random() * 255)
            
            backgroundColor = "rgb(" + randR + ", " + randG + ", " + randB + ")";

            playState = false

        }
    })
}