const init = (init,cb=null)=>(cb && cb(init)||true)&&({get:()=>init,set:(next)=>(cb)?cb(init=next):init=next});

const acts = (obj={}) => {
  const acts = init({...obj})

  return ({
    sub:(act,fn)=>acts.set(Object.assign({},acts.get(),{[act]:fn})),
    pub:(act)=>acts.get()[act]
  });
};

const pipe = (...fns) => (x) => fns.reduce((a,c)=>c(a),x);

const grab = (id) => document.getElementById(id);

const edit_prop = (prop) => (comp) => (v) => (comp[prop]=v) && comp;

const put = (component) => (host) => host.append(component) || host;

const empty = (host) => (!host.firstChild)
      ? host
      : host.removeChild(host.firstChild) && empty(host);

const button = (txt) => {
  const el = document.createElement('button');
  el.textContent = txt;
  return el;
};

const tracker = (z,id,img) => {
  const container = document.createElement('div');
  const token = document.createElement('div');
  const count = document.createElement('div');

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

  edit_prop('id')(container)(id);
  edit_prop('className')(container)('tracker');

  return pipe(put(token),put(up),put(count),(id==='storm')?(x)=>x:put(down))(container);
}

const fizzle = button('fizzle');

const build = (host) => pipe(
  put(fizzle),
  put(tracker(0,'storm','assets/storm.svg')),
  put(tracker(0,'black','assets/black.svg')),
  put(tracker(0,'red','assets/red.svg')),
  put(tracker(0,'blue','assets/blue.svg')),
  put(tracker(0,'green','assets/green.svg')),
  put(tracker(0,'white','assets/white.svg')),
)(host);

fizzle.addEventListener('click',()=>empty(grab('container'))&&build(grab('container')));

build(grab('container'));

