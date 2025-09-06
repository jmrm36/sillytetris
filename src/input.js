export function attachInput(game){
  document.addEventListener('keydown', e=>{
    if(e.repeat) return
    if(e.key === 'ArrowLeft') game.move(-1)
    if(e.key === 'ArrowRight') game.move(1)
    if(e.key === 'ArrowUp') game.rotate(1)
    if(e.key === 'ArrowDown') game.softDrop()
    if(e.code === 'Space') game.hardDrop()
  })

  const touch = document.getElementById('touch')
  if (touch){
    touch.addEventListener('click', (e)=>{
      const act = e.target?.dataset?.act
      if(!act) return
      if(act==='left') game.move(-1)
      if(act==='right') game.move(1)
      if(act==='rotate') game.rotate(1)
      if(act==='drop') game.softDrop()
      if(act==='hard') game.hardDrop()
    })
  }
}
