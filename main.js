function  init (init,cb=null){
  return (cb && cb(init)||true)&&({get:()=>init,set:(next)=>(cb)?cb(init=next):init=next});
}

function  acts (obj={}) {
  const acts = init({...obj})

  return ({
    sub:(act,fn)=>acts.set(Object.assign({},acts.get(),{[act]:fn})),
    pub:(act)=>acts.get()[act]
  });
}

function  pipe (...fns) {
  return (x) => fns.reduce((a,c)=>c(a),x);
}

function  grab (id) { return document.getElementById(id);}

function  edit_prop (prop) {
  return function (comp) {
    return function (v) { 
      return(comp[prop]=v) && comp;
    };
  };
}

function  put (component) {
  return function (host) {
    return host.append(component) || host;
  };
}

function empty (host) {
  return (!host.firstChild)
    ? host
    : host.removeChild(host.firstChild) && empty(host);
}

function button (txt) {
  const el = document.createElement('div');
  el.textContent = txt;
  el.className = 'button';
  return el;
}

const fizzle = button('fizzle');

function tracker (z,id,img) {
  const cont = document.createElement('div');
  const token = document.createElement('div');
  const count = document.createElement('div');
  const count_cont = document.createElement('div');

  const state = init(z,edit_prop('textContent')(count));
  const inc = pipe(state.get,(x)=>x+1,state.set);
  const dec = pipe(state.get,(x)=>(x===0)?0:x-1,state.set); 

  const actions = acts({inc,dec});
  
  const up = button('+');
  const down = button('-');

  up.addEventListener('click',actions.pub('inc'));
  down.addEventListener('click',actions.pub('dec'));

  token.style.backgroundImage = `url(${img})`;
  count.style.color = `${id}`;
  count.style.fontSize = '3em';
  count.style.width = '30%';
  count_cont.style.border = '1px solid white';

  edit_prop('id')(cont)(id);
  edit_prop('className')(cont)('tracker');

  pipe(put(up),put(count),(id==='storm')?put(fizzle):put(down))(count_cont)

  return pipe(put(token),put(count_cont))(cont);
}



function build (host) {
  return pipe(
    put(tracker(0,'storm','assets/storm.svg')),
    put(tracker(0,'black','assets/black.svg')),
    put(tracker(0,'red','assets/red.svg')),
    put(tracker(0,'blue','assets/blue.svg')),
    put(tracker(0,'green','assets/green.svg')),
    put(tracker(0,'white','assets/white.svg')),
  )(host);
}

fizzle.addEventListener('click',()=>empty(grab('container'))&&build(grab('container')));

build(grab('container'));

