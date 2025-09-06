export function attachInput(game){
  document.addEventListener('keydown', e=>{
    if(e.repeat) return
    if(e.key === 'ArrowLeft') game.move(-1)
    if(e.key === 'ArrowRight') game.move(1)
    if(e.key === 'ArrowUp') game.rotate(1)
    if(e.key === 'ArrowDown') game.softDrop()
    if(e.code === 'Space') game.hardDrop()
  })
}
