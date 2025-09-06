import { Game } from './tetris.js'
import { attachInput } from './input.js'

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
const game = new Game(10, 20) // cols, rows
attachInput(game)

const cell = 24
function drawMatrix(matrix, offset, colorize=true){
  matrix.forEach((row,y)=>{
    row.forEach((v,x)=>{
      if(!v) return
      ctx.fillStyle = colorize ? v : '#444'
      ctx.fillRect((x+offset.x)*cell, (y+offset.y)*cell, cell-1, cell-1)
    })
  })
}

function loop(ts){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  drawMatrix(game.arena, {x:0,y:0})
  if (game.active) drawMatrix(game.active.matrix, game.active.pos, game.active.color)
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)

setInterval(()=>game.tick(), 500)
