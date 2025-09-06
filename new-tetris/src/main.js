// Simple Tetris implementation using canvas
// Handles drawing, piece movement, rotation, line clearing and scoring

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const scale = 20; // size of one block in pixels
const rows = 20;
const cols = 10;

// Game board filled with 0s
const board = Array.from({ length: rows }, () => Array(cols).fill(0));

// Tetromino shapes
const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 0, 0], [1, 1, 1]], // J
  [[0, 0, 1], [1, 1, 1]], // L
  [[1, 1], [1, 1]], // O
  [[0, 1, 1], [1, 1, 0]], // S
  [[0, 1, 0], [1, 1, 1]], // T
  [[1, 1, 0], [0, 1, 1]], // Z
];

const COLORS = ['cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'];

let current = null; // current piece matrix
let pos = { x: 0, y: 0 }; // current piece position
let score = 0;
let dropCounter = 0;
let dropInterval = 1000; // ms
let lastTime = 0;

function newPiece() {
  const index = Math.floor(Math.random() * SHAPES.length);
  current = SHAPES[index];
  current.color = COLORS[index];
  pos.y = 0;
  pos.x = Math.floor(cols / 2) - Math.floor(current[0].length / 2);
  if (collide(board, current, pos)) {
    // Game over
    alert('Game over!');
    board.forEach(row => row.fill(0));
    score = 0;
    updateScore();
  }
}

function rotate(matrix) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
}

function collide(board, piece, offset) {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x] &&
        (board[y + offset.y] && board[y + offset.y][x + offset.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function merge(board, piece, offset) {
  piece.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        board[y + offset.y][x + offset.x] = piece.color;
      }
    });
  });
}

function clearLines() {
  outer: for (let y = board.length - 1; y >= 0; y--) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 0) {
        continue outer;
      }
    }
    const row = board.splice(y, 1)[0].fill(0);
    board.unshift(row);
    y++;
    score += 10;
    updateScore();
  }
}

function updateScore() {
  document.getElementById('score').innerText = `Score: ${score}`;
}

function drawCell(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * scale, y * scale, scale, scale);
  ctx.strokeStyle = '#333';
  ctx.strokeRect(x * scale, y * scale, scale, scale);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) drawCell(x, y, value);
    });
  });
  current.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) drawCell(x + pos.x, y + pos.y, current.color);
    });
  });
}

function drop() {
  pos.y++;
  if (collide(board, current, pos)) {
    pos.y--;
    merge(board, current, pos);
    clearLines();
    newPiece();
  }
  dropCounter = 0;
}

function update(time = 0) {
  const delta = time - lastTime;
  lastTime = time;
  dropCounter += delta;
  if (dropCounter > dropInterval) {
    drop();
  }
  draw();
  requestAnimationFrame(update);
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {
    pos.x--;
    if (collide(board, current, pos)) pos.x++;
  } else if (e.key === 'ArrowRight') {
    pos.x++;
    if (collide(board, current, pos)) pos.x--;
  } else if (e.key === 'ArrowDown') {
    drop();
  } else if (e.key === 'ArrowUp') {
    const rotated = rotate(current);
    if (!collide(board, rotated, pos)) {
      current = rotated;
    }
  }
});

newPiece();
updateScore();
update();
