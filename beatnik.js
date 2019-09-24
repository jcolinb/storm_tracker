const init = (init,cb=null)=>(cb && cb(init)||true)&&({get:()=>init,set:(next)=>(cb)?cb(init=next):init=next})

const acts = (obj={}) => {
  const acts = init({...obj})

  return ({
    sub:(act,fn)=>acts.set(Object.assign({},acts.get(),{[act]:fn})),
    pub:(act)=>acts.get()[act]
  })
}

const pipe = (...fns) => (x) => fns.reduce((a,c)=>c(a),x)

const share = (...fns) => (x) => fns.map((fn)=>fn(x))

// impure I/O

const grab = (id) => document.getElementById(id)

const log = (v) => console.log(v) || v

const edit_prop = (prop) => (comp) => (v) => (comp[prop]=v) && comp

const append = (host) => (component) => host.append(component) || host

const put = (component) => (host) => host.append(component) || host

const empty = (host) => (!host.firstChild)
      ? host
      : host.removeChild(host.firstChild) && empty(host)

const net = (url) => (cb) => fetch(url).then(cb)

export {init,acts,pipe,share,append,put,empty,edit_prop,grab,net,log}

