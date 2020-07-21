let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 10;

let paddleLY = 250;
let paddleRY = 250;
let paddleRSpeed = 10;
const PADDLE_HEIGHT = 100;

let player1 = 0;
let player2 = 0;
const WINNING_SCORE = 2;

let gameOver = false;

function calculateMousePos(evt) {
  let rect = canvas.getBoundingClientRect();//method returns the size of an element and its position relative to the viewport(página).
  let root = document.documentElement;//Nos da la ubicación en la página de nuestro elemento, es decir, nos la ubicación de ya sea h1,div,p,canvas,etc.
  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.top - root.scrollTop;
  console.log(rect.top);
  return {
    x:mouseX,
    y:mouseY
  };
}

window.onload = function(){
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  let framesPerSecond = 30;
  setInterval(callBoth,1000/framesPerSecond);
  canvas.addEventListener('click',
    function(evt) {
      if(gameOver){
        player1 = player2 = 0;
        gameOver = false;
      }
    }
  );
  canvas.addEventListener('mousemove',
    function(evt) {
      var mousePos = calculateMousePos(evt);
      paddleLY = mousePos.y-(PADDLE_HEIGHT/2);
    }
  );
}

function ballReset() {
  if(player1 >= WINNING_SCORE || player2 >= WINNING_SCORE){
    player1 = player2 = 0;
    gameOver = true;
  }
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballSpeedX = 10;
  ballSpeedY = 10;
}

function backToGame() {
  colorRect(0,0,canvas.width,canvas.height,'black');
  let whoWin = '';
  if(player1>=WINNING_SCORE){
    whoWin = 'Player 1 Wins!!';
  }
  else{
    whoWin = 'Player 2 Wins!!';
  }
  canvasContext.fillStyle = 'white';
  canvasContext.fillText(whoWin,(canvas.width/2),canvas.height/2);
  canvasContext.fillText('Click to continue',canvas.width/2,canvas.height-20);
}

function callBoth() {
  if(!gameOver){
    moveEverything();
    drawEverything();
  }
  else{
    backToGame();
  }
}

function computerMovement() {
  if(paddleRY+(PADDLE_HEIGHT)/2 < ballY){
    paddleRY += paddleRSpeed;
  }
  else if(paddleRY+(PADDLE_HEIGHT)/2>ballY){
    paddleRY -= paddleRSpeed;
  }
}

function moveEverything() {
  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if(ballX > canvas.width){
    if(ballY>paddleRY && ballY<paddleRY+PADDLE_HEIGHT){
      ballSpeedX *= -1;
      var deltaY = ballY - (paddleRY+PADDLE_HEIGHT/2);
      ballSpeedY = (deltaY * 0.35);
    }
    else {player1+=1;ballReset();}
  }
  if(ballX < 0){
    if(ballY>paddleLY && ballY<paddleLY+PADDLE_HEIGHT) {
     ballSpeedX *= -1;
     var deltaY = ballY - (paddleLY+PADDLE_HEIGHT/2);
     ballSpeedY = (deltaY * 0.35);
    }
    else {player2+=1;ballReset();}
  }
  if(ballY > canvas.height){
    ballSpeedY *= -1;
  }
  if(ballY < 0){
    ballSpeedY *= -1;
  }
}

function drawNet(){
  for(var i=0;i<canvas.height;i+=40){
    colorRect(canvas.width/2 - 1, i, 2, 30,'white');
  }
}

function drawEverything() {
  /***CAMPO DE JUEGO***/
  colorRect(0,0,canvas.width,canvas.height,'black');
  drawNet();
  /***BOLA***/
  colorRect(ballX,ballY,10,10,'yellow');
  colorCircle(ballX,ballY,10,'red');
  /***PALETAS***/
  /*Left Palet*/colorRect(0,paddleLY,10,PADDLE_HEIGHT,'white');
  /*Right Palet*/colorRect(canvas.width-10,paddleRY,10,PADDLE_HEIGHT,'white');
  /***SCORE***/
  canvasContext.fillText(player1,100,100);
  canvasContext.fillText(player2,canvas.width-100,100);
}

function colorCircle(centerX, centerY, radius, drawColor){
  //.arc(centerX[float],centerY[float],radio[float],angulo_de_inicio[float],angulo_de_fin[float],recorrer_horario_or_antihorario[bool])
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
  canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY,width,height);
}
