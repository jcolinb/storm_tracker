import {init,acts,put,edit_prop,pipe} from './beatnik.js'

const button = (txt) => {
  const el = document.createElement('button')
  el.textContent = txt;
  return el
}

const tracker = (z,id,img) => {
  const container = document.createElement('div')
  const token = document.createElement('div')
  const count = document.createElement('div')

  const state = init(z,edit_prop('textContent')(count))
  const inc = pipe(state.get,(x)=>x+1,state.set) 
  const dec = pipe(state.get,(x)=>(x===0)?0:x-1,state.set) 
  const zero = () => state.set(0)
  const actions = acts({inc,dec,zero})
  
  const up = button('+')
  const down = button('-')
  const reset = button('fizzle')

  up.addEventListener('click',actions.pub('inc'))
  down.addEventListener('click',actions.pub('dec'))
  reset.addEventListener('click',actions.pub('zero'))
  token.style.backgroundImage = `url(${img})`;
  count.style.color = `${id}`;
  count.style.fontSize = '3em';

  edit_prop('id')(container)(id)
  edit_prop('className')(container)('tracker')

  return pipe(put(token),put(up),put(count),(id==='storm')?(x)=>x:put(down))(container)
}

export {tracker}
