import {pipe,acts,append,edit_prop,put,grab,empty} from './beatnik.js'
import {tracker} from './views.js'

const button = document.createElement('button')
button.textContent = 'fizzle';

const init = () => pipe(
  put(button),
  put(tracker(0,'storm','assets/storm.svg')),
  put(tracker(0,'black','assets/black.svg')),
  put(tracker(0,'red','assets/red.svg')),
  put(tracker(0,'blue','assets/blue.svg')),
  put(tracker(0,'green','assets/green.svg')),
  put(tracker(0,'white','assets/white.svg')),
)

button.addEventListener('click',()=>empty(grab('container'))&&init()(grab('container')))

init()(grab('container'))
