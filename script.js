import { Game } from './src/tetris.js';
import { attachInput } from './src/input.js';

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const game = new Game(10, 20);
attachInput(game);

const ghostImg = new Image();
ghostImg.src = 'assets/ghost.svg';

// --- Start gate / overlay wiring ---
let gameStarted = false;
const overlay = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');

function showOverlay(label = 'Start'){
  if (startBtn) startBtn.textContent = label;
  overlay?.classList.add('visible');
}
function hideOverlay(){
  overlay?.classList.remove('visible');
}

startBtn?.addEventListener('click', () => {
  if (!gameStarted) {
    gameStarted = true;
    resetGame();
    hideOverlay();
    startGameLoop();
  } else {
    resetGame();
    hideOverlay();
    startGameLoop();
  }
});

// Call once on load to show start screen
showOverlay('Start');

// --- Game loop ---
let lastTime = 0;
let rafId = null;
const dropInterval = 500;
let dropCounter = 0;

function startGameLoop(){
  cancelAnimationFrame(rafId);
  lastTime = 0;
  dropCounter = 0;
  rafId = requestAnimationFrame(update);
}

function update(time = 0){
  if (!gameStarted) return; // guard

  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  if (dropCounter > dropInterval){
    game.tick();
    dropCounter = 0;
  }

  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawMatrix(game.arena, {x:0,y:0});
  if (game.active) drawMatrix(game.active.matrix, game.active.pos);

  if (game.gameOver){
    handleGameOver();
    return;
  }
  rafId = requestAnimationFrame(update);
}

function drawMatrix(matrix, offset){
  const cell = 24;
  matrix.forEach((row,y)=>{
    row.forEach((v,x)=>{
      if(!v) return;
      ctx.fillStyle = v;
      ctx.fillRect((x+offset.x)*cell, (y+offset.y)*cell, cell-1, cell-1);
      ctx.drawImage(ghostImg, (x+offset.x)*cell, (y+offset.y)*cell, cell, cell);
    });
  });
}

function handleGameOver(){
  cancelAnimationFrame(rafId);
  gameStarted = false;
  showOverlay('Play again');
}

function resetGame(){
  game.reset();
}
