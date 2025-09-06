export function attachInput(game){
  document.addEventListener('keydown', e=>{
    if(e.repeat) return
    if(e.key === 'ArrowLeft') game.move(-1)
    if(e.key === 'ArrowRight') game.move(1)
    if(e.key === 'ArrowUp') game.rotate(1)
    if(e.key === 'ArrowDown') game.softDrop()
    if(e.code === 'Space' || e.key === ' ') game.hardDrop()
  })

  function triggerKey(key) {
    const ev = new KeyboardEvent('keydown', { key })
    document.dispatchEvent(ev)
    window.dispatchEvent(ev)
  }

  document.querySelectorAll('.controls button').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key')
      triggerKey(key)
    }, { passive: true })
  })
}
