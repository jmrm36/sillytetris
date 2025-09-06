const SHAPES = {
  I:[[1,1,1,1]],
  J:[[2,0,0],[2,2,2]],
  L:[[0,0,3],[3,3,3]],
  O:[[4,4],[4,4]],
  S:[[0,5,5],[5,5,0]],
  T:[[0,6,0],[6,6,6]],
  Z:[[7,7,0],[0,7,7]],
}
const COLORS = {
  1:'#30c0ff',2:'#4a6fff',3:'#ff9f1a',4:'#ffd429',5:'#44d19e',6:'#c86bff',7:'#ff5a5f'
}

function clone(m){ return m.map(r=>r.slice()) }
function rotate(matrix, dir){
  const m = clone(matrix)
  for(let y=0;y<m.length;y++)
    for(let x=0;x<y;x++)
      [m[x][y],m[y][x]]=[m[y][x],m[x][y]]
  if(dir>0) m.forEach(r=>r.reverse())
  else m.reverse()
  return m
}

export class Game{
  constructor(cols, rows){
    this.cols=cols; this.rows=rows
    this.arena = [...Array(rows)].map(()=>Array(cols).fill(0))
    this.active = null
    this.spawn()
  }
  randPiece(){
    const keys = Object.keys(SHAPES)
    const k = keys[(Math.random()*keys.length)|0]
    const shape = SHAPES[k].map(r=>r.map(v=>v?COLORS[v]:0))
    return { matrix:shape, pos:{x:(this.cols/2|0)-1, y:0}, color:true }
  }
  collide(mat, pos){
    for(let y=0;y<mat.length;y++){
      for(let x=0;x<mat[y].length;x++){
        if(!mat[y][x]) continue
        const ny = y+pos.y, nx = x+pos.x
        if(nx<0||nx>=this.cols||ny>=this.rows) return true
        if(ny>=0 && this.arena[ny][nx]) return true
      }
    }
    return false
  }
  merge(){
    const {matrix,pos}=this.active
    matrix.forEach((row,y)=>{
      row.forEach((v,x)=>{
        if(v && pos.y+y>=0) this.arena[pos.y+y][pos.x+x]=v
      })
    })
  }
  clearLines(){
    outer: for(let y=this.rows-1; y>=0; y--){
      if(this.arena[y].every(v=>v)){
        this.arena.splice(y,1)
        this.arena.unshift(Array(this.cols).fill(0))
        y++
      }
    }
  }
  spawn(){
    this.active = this.randPiece()
    if(this.collide(this.active.matrix, this.active.pos)){
      alert("You lost!")
      this.arena.forEach(r=>r.fill(0))
    }
  }
  rotate(dir){
    const rot = rotate(this.active.matrix, dir)
    const old = this.active.matrix
    this.active.matrix = rot
    if(this.collide(this.active.matrix, this.active.pos)){
      // simple wall kicks
      this.active.pos.x += (this.active.pos.x>this.cols/2 ? -1 : 1)
      if(this.collide(this.active.matrix, this.active.pos)){
        this.active.matrix = old
      }
    }
  }
  move(dir){
    this.active.pos.x += dir
    if(this.collide(this.active.matrix, this.active.pos)){
      this.active.pos.x -= dir
    }
  }
  softDrop(){
    this.active.pos.y++
    if(this.collide(this.active.matrix, this.active.pos)){
      this.active.pos.y--
      this.merge()
      this.clearLines()
      this.spawn()
    }
  }
  hardDrop(){
    while(!this.collide(this.active.matrix, {x:this.active.pos.x, y:this.active.pos.y+1})){
      this.active.pos.y++
    }
    this.softDrop()
  }
  tick(){ this.softDrop() }
}
