// Make Your Own Game - 1
// Made By Shivanshu Pattnaik

// Sprites
// Form
var form;
// Edge Sprites
var edges;
// Object Sprites
var earth, spaceship;
var earthLife1, earthLife2, earthLife3, spaceshipLife1, spaceshipLife2, spaceshipLife3;
// For counting how many times the asteroid is touching the player;
var num1 = 0, num2 = 0;
// Image Sprites
var bgImg, bgImg2, earthImg, spaceshipImg, laserImg, lifeImg, asteroidImgs, xTwoImg, xThreeImg;
// Group Sprites
var laserGroup, asteroidGroup, xTwoGroup, xThreeGroup, laserxThreeGroup, laserxTwoGroup;
// Game State
var gameState = 0;
// Timers
var timerState = 1;
var timerxThree;
var timerxTwo;
// Sounds
var spaceshipSound;
var laserSound;
var blastSound;

function preload() {

  earthImg = loadImage("img/earth.png");
  bgImg = loadImage("img/space.jpg");
  spaceshipImg = loadImage("img/space_ship.png");
  laserImg = loadImage("img/laser.png");
  asteroidImg = loadImage("img/asteroid.png");
  lifeImg = loadImage("img/life.png");
  xTwoImg = loadImage("img/x2.png");
  xThreeImg = loadImage("img/x3.png");
  bgImg2 = loadImage("img/bg.jpg");
  spaceshipSound = loadSound("sound/spaceship.mp3");
  laserSound = loadSound("sound/laser.mp3");
  blastSound = loadSound("sound/blast.mp3");

}

function setup() {

  createCanvas(1300, 600);

  form = new Form();

  edges = createEdgeSprites();

  spaceshipSound.play();

  laserGroup = createGroup();
  asteroidGroup = createGroup();
  xTwoGroup = createGroup();
  xThreeGroup = createGroup();
  laserxTwoGroup = createGroup();
  laserxThreeGroup = createGroup();

  bg = createSprite(650, 300, 2000, 1000);
  bg.addImage(bgImg);
  bg.scale = 1;
  bg.velocityX = -10;

  earth = createSprite(-130, 300, 200, 200);
  earth.addImage(earthImg);

  spaceship = createSprite(270, 300, 20, 20);
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.4;

  // Lives
  spaceshipLife1 = createSprite(270, 40, 10, 10);
  spaceshipLife1.addImage(lifeImg);
  spaceshipLife1.scale = 0.1;
  
  spaceshipLife2 = createSprite(330, 40, 10, 10);
  spaceshipLife2.addImage(lifeImg);
  spaceshipLife2.scale = 0.1;
  
  spaceshipLife3 = createSprite(390, 40, 10, 10);
  spaceshipLife3.addImage(lifeImg);
  spaceshipLife3.scale = 0.1;

  earthLife1 = createSprite(770, 40, 10, 10);
  earthLife1.addImage(lifeImg);
  earthLife1.scale = 0.1;
  
  earthLife2 = createSprite(830, 40, 10, 10);
  earthLife2.addImage(lifeImg);
  earthLife2.scale = 0.1;
  
  earthLife3 = createSprite(890, 40, 10, 10);
  earthLife3.addImage(lifeImg);
  earthLife3.scale = 0.1;

}

function draw() {

  background("white");
  
  if(gameState === 0) {
    form.display();
  }

  if(gameState === 1) {
    form.hide1();
    form.display1();
  }

  if(gameState === 2) {
    form.hide2();
    form.display2();
  }

  if(gameState === 3) {

    form.hide3();
  
    spaceship.y = mouseY;
    spaceship.bounceOff(edges);
  
    if(mousePressedOver(bg) && timerState === 1) {
      spawnLaser();
      laserSound.play();
    }
  
    if(frameCount % 50 === 0) {
      spawnAsteroid();
    }

    if(frameCount % 250 === 0) {
      spawnxTwo();

      timerxTwo = 15;
    }

    if(frameCount % 10 === 0 && timerState === 2) {
      timerxTwo --;      
    }
    if(timerxTwo === 0) {
      timerState = 1;
    }

    if(xTwoGroup.isTouching(spaceship)) {
      timerState = 2;
      xTwoGroup.destroyEach();
    }

    if(timerState === 2 && mousePressedOver(bg)) {
      spawnLaserxTwo();
      laserSound.play();
    }

    if(laserxTwoGroup.isTouching(asteroidGroup)) {
      laserxTwoGroup.destroyEach();
      asteroidGroup.destroyEach();
      blastSound.play();
    }

    if(frameCount % 400 === 0) {
      spawnxThree();

      timerxThree = 15;
    }

    if(frameCount % 10 === 0 && timerState === 3) {
      timerxThree --;      
    }
    if(timerxThree === 0) {
      timerState = 1;
    }

    if(xThreeGroup.isTouching(spaceship)) {
      timerState = 3;
      xThreeGroup.destroyEach();
    }

    if(timerState === 3 && mousePressedOver(bg)) {
      spawnLaserxThree();
      laserSound.play();
    }

    if(laserxThreeGroup.isTouching(asteroidGroup)) {
      laserxThreeGroup.destroyEach();
      asteroidGroup.destroyEach();
      blastSound.play();
    }
  
    if(laserGroup.isTouching(asteroidGroup)) {
      asteroidGroup.destroyEach();
      laserGroup.destroyEach();
      blastSound.play();
    }
  
    if(asteroidGroup.isTouching(spaceship) && num1 === 0) {
      num1 = 1;
      spaceshipLife3.visible = false;
      asteroidGroup.destroyEach();
    }
  
    if(asteroidGroup.isTouching(spaceship) && num1 === 1) {
      num1 = 2;
      spaceshipLife2.visible = false;
      asteroidGroup.destroyEach();
    }
  
    if(asteroidGroup.isTouching(spaceship) && num1 === 2) {
      num1 = 3;
      spaceshipLife1.visible = false;
      asteroidGroup.destroyEach();
    }
  
    if(asteroidGroup.isTouching(earth) && num2 === 0) {
      num2 = 1;
      earthLife3.visible = false;
      asteroidGroup.destroyEach();
    }
  
    if(asteroidGroup.isTouching(earth) && num2 === 1) {
      num2 = 2;
      earthLife2.visible = false;
      asteroidGroup.destroyEach();
    }
  
    if(asteroidGroup.isTouching(earth) && num2 === 2) {
      num2 = 3;
      earthLife1.visible = false;
      asteroidGroup.destroyEach();
    }
  
    if(num1 === 3 || num2 === 3) {
      gameState = 4;
    }

    drawSprites();

    // Text
    textSize(40);
    textFont("Squada One");
    fill("white");
    text("YOUR LIVES : ", 40, 50);
    text("EARTH LIVES : ", 520, 50);
  }
  
  if(bg.x <= 340) {
    bg.x = width/2
  }

  if(gameState === 4) {
  
    spaceship.destroy();

    background(bgImg2);

    textSize(70);
    textFont("Squada One");
    fill("white");
    text("GAME OVER", 500, 250);
    textSize(40);
    text("PLEASE RELOAD THE PAGE TO PLAY THE GAME AGAIN!", 300, 350);

  }

}

function spawnLaser() {

  var laser = createSprite(420, spaceship.y, 30, 10);
  laser.addImage(laserImg);
  laser.scale = 0.04;
  laser.velocityX = 7;
  laser.lifetime = 130;

  laserGroup.add(laser);

}

function spawnLaserxTwo() {

  var laserxTwo1 = createSprite(420, spaceship.y + 10, 30, 10);
  var laserxTwo2 = createSprite(420, spaceship.y - 10, 30, 10);
  laserxTwo1.addImage(laserImg);
  laserxTwo2.addImage(laserImg);
  laserxTwo1.scale = 0.04;
  laserxTwo2.scale = 0.04;
  laserxTwo1.velocityX = 7;
  laserxTwo2.velocityX = 7;
  laserxTwo1.lifetime = 130;
  laserxTwo2.lifetime = 130;

  laserxTwoGroup.add(laserxTwo1);
  laserxTwoGroup.add(laserxTwo2);

}

function spawnLaserxThree() {

  var laserxThree1 = createSprite(420, spaceship.y - 20, 30, 10);
  var laserxThree2 = createSprite(420, spaceship.y, 30, 10);
  var laserxThree3 = createSprite(420, spaceship.y + 20, 30, 10);
  laserxThree1.addImage(laserImg);
  laserxThree2.addImage(laserImg);
  laserxThree3.addImage(laserImg);
  laserxThree1.scale = 0.04;
  laserxThree2.scale = 0.04;
  laserxThree3.scale = 0.04;
  laserxThree1.velocityX = 7;
  laserxThree2.velocityX = 7;
  laserxThree3.velocityX = 7;
  laserxThree1.lifetime = 130;
  laserxThree2.lifetime = 130;
  laserxThree3.lifetime = 130;

  laserxThreeGroup.add(laserxThree1);
  laserxThreeGroup.add(laserxThree2);
  laserxThreeGroup.add(laserxThree3);

}

function spawnAsteroid() {

  var asteroid = createSprite(1350, Math.round(random(50, 550)), 50, 50);
  asteroid.addImage(asteroidImg);
  asteroid.scale = 0.05;
  asteroid.velocityX = -25;

  asteroidGroup.add(asteroid);

}

function spawnxTwo() {

  var xTwo = createSprite(1350, Math.round(random(50, 550)), 50, 50);
  xTwo.addImage(xTwoImg);
  xTwo.scale = 0.1;
  xTwo.velocityX = -15;

  xTwoGroup.add(xTwo);

}

function spawnxThree() {

  var xThree = createSprite(1350, Math.round(random(50, 550)), 50, 50);
  xThree.addImage(xThreeImg);
  xThree.scale = 0.1;
  xThree.velocityX = -15;

  xThreeGroup.add(xThree);

}