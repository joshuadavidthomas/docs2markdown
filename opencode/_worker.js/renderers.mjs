globalThis.process ??= {}; globalThis.process.env ??= {};
import { f as renderJSX, d as createVNode, g as AstroJSX, A as AstroUserError } from './chunks/astro/server_BfFDGVc7.mjs';

const ERROR = Symbol("error");
function castError(err) {
  if (err instanceof Error) return err;
  return new Error(typeof err === "string" ? err : "Unknown error", {
    cause: err
  });
}
function handleError(err, owner = Owner) {
  const fns = owner && owner.context && owner.context[ERROR];
  const error = castError(err);
  if (!fns) throw error;
  try {
    for (const f of fns) f(error);
  } catch (e) {
    handleError(e, owner && owner.owner || null);
  }
}
const UNOWNED = {
  context: null,
  owner: null,
  owned: null,
  cleanups: null
};
let Owner = null;
function createOwner() {
  const o = {
    owner: Owner,
    context: Owner ? Owner.context : null,
    owned: null,
    cleanups: null
  };
  if (Owner) {
    if (!Owner.owned) Owner.owned = [o];else Owner.owned.push(o);
  }
  return o;
}
function createRoot(fn, detachedOwner) {
  const owner = Owner,
    current = owner ,
    root = fn.length === 0 ? UNOWNED : {
      context: current ? current.context : null,
      owner: current,
      owned: null,
      cleanups: null
    };
  Owner = root;
  let result;
  try {
    result = fn(fn.length === 0 ? () => {} : () => cleanNode(root));
  } catch (err) {
    handleError(err);
  } finally {
    Owner = owner;
  }
  return result;
}
function createMemo(fn, value) {
  Owner = createOwner();
  let v;
  try {
    v = fn(value);
  } catch (err) {
    handleError(err);
  } finally {
    Owner = Owner.owner;
  }
  return () => v;
}
function cleanNode(node) {
  if (node.owned) {
    for (let i = 0; i < node.owned.length; i++) cleanNode(node.owned[i]);
    node.owned = null;
  }
  if (node.cleanups) {
    for (let i = 0; i < node.cleanups.length; i++) node.cleanups[i]();
    node.cleanups = null;
  }
}
function catchError(fn, handler) {
  const owner = createOwner();
  owner.context = {
    ...owner.context,
    [ERROR]: [handler]
  };
  Owner = owner;
  try {
    return fn();
  } catch (err) {
    handleError(err);
  } finally {
    Owner = Owner.owner;
  }
}
function createContext(defaultValue) {
  const id = Symbol("context");
  return {
    id,
    Provider: createProvider(id),
    defaultValue
  };
}
function children(fn) {
  const memo = createMemo(() => resolveChildren(fn()));
  memo.toArray = () => {
    const c = memo();
    return Array.isArray(c) ? c : c != null ? [c] : [];
  };
  return memo;
}
function runWithOwner(o, fn) {
  const prev = Owner;
  Owner = o;
  try {
    return fn();
  } catch (err) {
    handleError(err);
  } finally {
    Owner = prev;
  }
}
function resolveChildren(children) {
  if (typeof children === "function" && !children.length) return resolveChildren(children());
  if (Array.isArray(children)) {
    const results = [];
    for (let i = 0; i < children.length; i++) {
      const result = resolveChildren(children[i]);
      Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results;
  }
  return children;
}
function createProvider(id) {
  return function provider(props) {
    return createMemo(() => {
      Owner.context = {
        ...Owner.context,
        [id]: props.value
      };
      return children(() => props.children);
    });
  };
}

function escape$1(s, attr) {
  const t = typeof s;
  if (t !== "string") {
    if (t === "function") return escape$1(s());
    if (Array.isArray(s)) {
      for (let i = 0; i < s.length; i++) s[i] = escape$1(s[i]);
      return s;
    }
    return s;
  }
  const delim = "<";
  const escDelim = "&lt;";
  let iDelim = s.indexOf(delim);
  let iAmp = s.indexOf("&");
  if (iDelim < 0 && iAmp < 0) return s;
  let left = 0,
    out = "";
  while (iDelim >= 0 && iAmp >= 0) {
    if (iDelim < iAmp) {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } else {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }
  if (iDelim >= 0) {
    do {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } while (iDelim >= 0);
  } else while (iAmp >= 0) {
    if (left < iAmp) out += s.substring(left, iAmp);
    out += "&amp;";
    left = iAmp + 1;
    iAmp = s.indexOf("&", left);
  }
  return left < s.length ? out + s.substring(left) : out;
}
function resolveSSRNode$1(node) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let prev = {};
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) {
      if (typeof prev !== "object" && typeof node[i] !== "object") mapped += `<!--!$-->`;
      mapped += resolveSSRNode$1(prev = node[i]);
    }
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode$1(node());
  return String(node);
}
const sharedConfig = {
  context: undefined,
  getContextId() {
    if (!this.context) throw new Error(`getContextId cannot be used under non-hydrating context`);
    return getContextId(this.context.count);
  },
  getNextContextId() {
    if (!this.context) throw new Error(`getNextContextId cannot be used under non-hydrating context`);
    return getContextId(this.context.count++);
  }
};
function getContextId(count) {
  const num = String(count),
    len = num.length - 1;
  return sharedConfig.context.id + (len ? String.fromCharCode(96 + len) : "") + num;
}
function setHydrateContext(context) {
  sharedConfig.context = context;
}
function nextHydrateContext() {
  return sharedConfig.context ? {
    ...sharedConfig.context,
    id: sharedConfig.getNextContextId(),
    count: 0
  } : undefined;
}
function createComponent(Comp, props) {
  if (sharedConfig.context && !sharedConfig.context.noHydrate) {
    const c = sharedConfig.context;
    setHydrateContext(nextHydrateContext());
    const r = Comp(props || {});
    setHydrateContext(c);
    return r;
  }
  return Comp(props || {});
}
const SuspenseContext = createContext();
function suspenseComplete(c) {
  for (const r of c.resources.values()) {
    if (r.loading) return false;
  }
  return true;
}
function Suspense(props) {
  let done;
  const ctx = sharedConfig.context;
  const id = sharedConfig.getContextId();
  const o = createOwner();
  const value = ctx.suspense[id] || (ctx.suspense[id] = {
    resources: new Map(),
    completed: () => {
      const res = runSuspense();
      if (suspenseComplete(value)) {
        done(resolveSSRNode$1(escape$1(res)));
      }
    }
  });
  function suspenseError(err) {
    if (!done || !done(undefined, err)) {
      runWithOwner(o.owner, () => {
        throw err;
      });
    }
  }
  function runSuspense() {
    setHydrateContext({
      ...ctx,
      count: 0
    });
    cleanNode(o);
    return runWithOwner(o, () => createComponent(SuspenseContext.Provider, {
      value,
      get children() {
        return catchError(() => props.children, suspenseError);
      }
    }));
  }
  const res = runSuspense();
  if (suspenseComplete(value)) {
    delete ctx.suspense[id];
    return res;
  }
  done = ctx.async ? ctx.registerFragment(id) : undefined;
  return catchError(() => {
    if (ctx.async) {
      setHydrateContext({
        ...ctx,
        count: 0,
        id: ctx.id + "0F",
        noHydrate: true
      });
      const res = {
        t: `<template id="pl-${id}"></template>${resolveSSRNode$1(escape$1(props.fallback))}<!--pl-${id}-->`
      };
      setHydrateContext(ctx);
      return res;
    }
    setHydrateContext({
      ...ctx,
      count: 0,
      id: ctx.id + "0F"
    });
    ctx.serialize(id, "$$f");
    return props.fallback;
  }, suspenseError);
}

var R$1=(a=>(a[a.AggregateError=1]="AggregateError",a[a.ArrowFunction=2]="ArrowFunction",a[a.ErrorPrototypeStack=4]="ErrorPrototypeStack",a[a.ObjectAssign=8]="ObjectAssign",a[a.BigIntTypedArray=16]="BigIntTypedArray",a))(R$1||{});function Nr(o){switch(o){case '"':return '\\"';case "\\":return "\\\\";case `
`:return "\\n";case "\r":return "\\r";case "\b":return "\\b";case "	":return "\\t";case "\f":return "\\f";case "<":return "\\x3C";case "\u2028":return "\\u2028";case "\u2029":return "\\u2029";default:return}}function d(o){let e="",r=0,t;for(let n=0,a=o.length;n<a;n++)t=Nr(o[n]),t&&(e+=o.slice(r,n)+t,r=n+1);return r===0?e=o:e+=o.slice(r),e}var O="__SEROVAL_REFS__",Q="$R",ae=`self.${Q}`;function xr(o){return o==null?`${ae}=${ae}||[]`:`(${ae}=${ae}||{})["${d(o)}"]=[]`}function f$1(o,e){if(!o)throw e}var Be=new Map,C$1=new Map;function je(o){return Be.has(o)}function Ke(o){return f$1(je(o),new ie$1(o)),Be.get(o)}typeof globalThis!="undefined"?Object.defineProperty(globalThis,O,{value:C$1,configurable:true,writable:false,enumerable:false}):typeof window!="undefined"?Object.defineProperty(window,O,{value:C$1,configurable:true,writable:false,enumerable:false}):typeof self!="undefined"?Object.defineProperty(self,O,{value:C$1,configurable:true,writable:false,enumerable:false}):typeof global!="undefined"&&Object.defineProperty(global,O,{value:C$1,configurable:true,writable:false,enumerable:false});function Hr(o){return o}function Ye(o,e){for(let r=0,t=e.length;r<t;r++){let n=e[r];o.has(n)||(o.add(n),n.extends&&Ye(o,n.extends));}}function m$1(o){if(o){let e=new Set;return Ye(e,o),[...e]}}var $e={0:"Symbol.asyncIterator",1:"Symbol.hasInstance",2:"Symbol.isConcatSpreadable",3:"Symbol.iterator",4:"Symbol.match",5:"Symbol.matchAll",6:"Symbol.replace",7:"Symbol.search",8:"Symbol.species",9:"Symbol.split",10:"Symbol.toPrimitive",11:"Symbol.toStringTag",12:"Symbol.unscopables"},ce={[Symbol.asyncIterator]:0,[Symbol.hasInstance]:1,[Symbol.isConcatSpreadable]:2,[Symbol.iterator]:3,[Symbol.match]:4,[Symbol.matchAll]:5,[Symbol.replace]:6,[Symbol.search]:7,[Symbol.species]:8,[Symbol.split]:9,[Symbol.toPrimitive]:10,[Symbol.toStringTag]:11,[Symbol.unscopables]:12},qe={2:"!0",3:"!1",1:"void 0",0:"null",4:"-0",5:"1/0",6:"-1/0",7:"0/0"};var ue$1={0:"Error",1:"EvalError",2:"RangeError",3:"ReferenceError",4:"SyntaxError",5:"TypeError",6:"URIError"},s$1=void 0;function u$1(o,e,r,t,n,a,i,l,c,p,h,X){return {t:o,i:e,s:r,l:t,c:n,m:a,p:i,e:l,a:c,f:p,b:h,o:X}}function x(o){return u$1(2,s$1,o,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1)}var I$1=x(2),A$1=x(3),pe$1=x(1),de=x(0),Xe=x(4),Qe=x(5),er=x(6),rr=x(7);function me$1(o){return o instanceof EvalError?1:o instanceof RangeError?2:o instanceof ReferenceError?3:o instanceof SyntaxError?4:o instanceof TypeError?5:o instanceof URIError?6:0}function wr(o){let e=ue$1[me$1(o)];return o.name!==e?{name:o.name}:o.constructor.name!==e?{name:o.constructor.name}:{}}function j$1(o,e){let r=wr(o),t=Object.getOwnPropertyNames(o);for(let n=0,a=t.length,i;n<a;n++)i=t[n],i!=="name"&&i!=="message"&&(i==="stack"?e&4&&(r=r||{},r[i]=o[i]):(r=r||{},r[i]=o[i]));return r}function fe$1(o){return Object.isFrozen(o)?3:Object.isSealed(o)?2:Object.isExtensible(o)?0:1}function ge(o){switch(o){case Number.POSITIVE_INFINITY:return Qe;case Number.NEGATIVE_INFINITY:return er}return o!==o?rr:Object.is(o,-0)?Xe:u$1(0,s$1,o,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1)}function w(o){return u$1(1,s$1,d(o),s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1)}function Se(o){return u$1(3,s$1,""+o,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1)}function sr(o){return u$1(4,o,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1)}function he(o,e){let r=e.valueOf();return u$1(5,o,r!==r?"":e.toISOString(),s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1)}function ye(o,e){return u$1(6,o,s$1,s$1,d(e.source),e.flags,s$1,s$1,s$1,s$1,s$1,s$1)}function ve(o,e){let r=new Uint8Array(e),t=r.length,n=new Array(t);for(let a=0;a<t;a++)n[a]=r[a];return u$1(19,o,n,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1)}function or(o,e){return u$1(17,o,ce[e],s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1)}function nr(o,e){return u$1(18,o,d(Ke(e)),s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1)}function _$1(o,e,r){return u$1(25,o,r,s$1,d(e),s$1,s$1,s$1,s$1,s$1,s$1,s$1)}function Ne(o,e,r){return u$1(9,o,s$1,e.length,s$1,s$1,s$1,s$1,r,s$1,s$1,fe$1(e))}function be(o,e){return u$1(21,o,s$1,s$1,s$1,s$1,s$1,s$1,s$1,e,s$1,s$1)}function xe(o,e,r){return u$1(15,o,s$1,e.length,e.constructor.name,s$1,s$1,s$1,s$1,r,e.byteOffset,s$1)}function Ie(o,e,r){return u$1(16,o,s$1,e.length,e.constructor.name,s$1,s$1,s$1,s$1,r,e.byteOffset,s$1)}function Ae(o,e,r){return u$1(20,o,s$1,e.byteLength,s$1,s$1,s$1,s$1,s$1,r,e.byteOffset,s$1)}function we(o,e,r){return u$1(13,o,me$1(e),s$1,s$1,d(e.message),r,s$1,s$1,s$1,s$1,s$1)}function Ee(o,e,r){return u$1(14,o,me$1(e),s$1,s$1,d(e.message),r,s$1,s$1,s$1,s$1,s$1)}function Pe(o,e,r){return u$1(7,o,s$1,e,s$1,s$1,s$1,s$1,r,s$1,s$1,s$1)}function M(o,e){return u$1(28,s$1,s$1,s$1,s$1,s$1,s$1,s$1,[o,e],s$1,s$1,s$1)}function U(o,e){return u$1(30,s$1,s$1,s$1,s$1,s$1,s$1,s$1,[o,e],s$1,s$1,s$1)}function L(o,e,r){return u$1(31,o,s$1,s$1,s$1,s$1,s$1,s$1,r,e,s$1,s$1)}function Re(o,e){return u$1(32,o,s$1,s$1,s$1,s$1,s$1,s$1,s$1,e,s$1,s$1)}function Oe(o,e){return u$1(33,o,s$1,s$1,s$1,s$1,s$1,s$1,s$1,e,s$1,s$1)}function Ce(o,e){return u$1(34,o,s$1,s$1,s$1,s$1,s$1,s$1,s$1,e,s$1,s$1)}var{toString:_e}=Object.prototype;function Er(o,e){return e instanceof Error?`Seroval caught an error during the ${o} process.
  
${e.name}
${e.message}

- For more information, please check the "cause" property of this error.
- If you believe this is an error in Seroval, please submit an issue at https://github.com/lxsmnsyc/seroval/issues/new`:`Seroval caught an error during the ${o} process.

"${_e.call(e)}"

For more information, please check the "cause" property of this error.`}var ee$1=class ee extends Error{constructor(r,t){super(Er(r,t));this.cause=t;}},E$1=class E extends ee$1{constructor(e){super("parsing",e);}},Te=class extends ee$1{constructor(e){super("serialization",e);}},g$1=class g extends Error{constructor(r){super(`The value ${_e.call(r)} of type "${typeof r}" cannot be parsed/serialized.
      
There are few workarounds for this problem:
- Transform the value in a way that it can be serialized.
- If the reference is present on multiple runtimes (isomorphic), you can use the Reference API to map the references.`);this.value=r;}},y$1=class y extends Error{constructor(e){super('Unsupported node type "'+e.t+'".');}},W$1=class W extends Error{constructor(e){super('Missing plugin for tag "'+e+'".');}},ie$1=class ie extends Error{constructor(r){super('Missing reference for the value "'+_e.call(r)+'" of type "'+typeof r+'"');this.value=r;}};var T$1=class T{constructor(e,r){this.value=e;this.replacement=r;}};function z$1(o,e,r){return o&2?(e.length===1?e[0]:"("+e.join(",")+")")+"=>"+(r.startsWith("{")?"("+r+")":r):"function("+e.join(",")+"){return "+r+"}"}function S(o,e,r){return o&2?(e.length===1?e[0]:"("+e.join(",")+")")+"=>{"+r+"}":"function("+e.join(",")+"){"+r+"}"}var ar={},ir={};var lr={0:{},1:{},2:{},3:{},4:{}};function Pr(o){return z$1(o,["r"],"(r.p=new Promise("+S(o,["s","f"],"r.s=s,r.f=f")+"))")}function Rr(o){return S(o,["r","d"],"r.s(d),r.p.s=1,r.p.v=d")}function Or(o){return S(o,["r","d"],"r.f(d),r.p.s=2,r.p.v=d")}function Cr(o){return z$1(o,["b","a","s","l","p","f","e","n"],"(b=[],a=!0,s=!1,l=[],p=0,f="+S(o,["v","m","x"],"for(x=0;x<p;x++)l[x]&&l[x][m](v)")+",n="+S(o,["o","x","z","c"],'for(x=0,z=b.length;x<z;x++)(c=b[x],(!a&&x===z-1)?o[s?"return":"throw"](c):o.next(c))')+",e="+z$1(o,["o","t"],"(a&&(l[t=p++]=o),n(o),"+S(o,[],"a&&(l[t]=void 0)")+")")+",{__SEROVAL_STREAM__:!0,on:"+z$1(o,["o"],"e(o)")+",next:"+S(o,["v"],'a&&(b.push(v),f(v,"next"))')+",throw:"+S(o,["v"],'a&&(b.push(v),f(v,"throw"),a=s=!1,l.length=0)')+",return:"+S(o,["v"],'a&&(b.push(v),f(v,"return"),a=!1,s=!0,l.length=0)')+"})")}function cr(o,e){switch(e){case 0:return "[]";case 1:return Pr(o);case 2:return Rr(o);case 3:return Or(o);case 4:return Cr(o);default:return ""}}function Fe(o){return "__SEROVAL_STREAM__"in o}function K$1(){let o=new Set,e=[],r=true,t=true;function n(l){for(let c of o.keys())c.next(l);}function a(l){for(let c of o.keys())c.throw(l);}function i(l){for(let c of o.keys())c.return(l);}return {__SEROVAL_STREAM__:true,on(l){r&&o.add(l);for(let c=0,p=e.length;c<p;c++){let h=e[c];c===p-1&&!r?t?l.return(h):l.throw(h):l.next(h);}return ()=>{r&&o.delete(l);}},next(l){r&&(e.push(l),n(l));},throw(l){r&&(e.push(l),a(l),r=false,t=false,o.clear());},return(l){r&&(e.push(l),i(l),r=false,t=true,o.clear());}}}function Ve(o){let e=K$1(),r=o[Symbol.asyncIterator]();async function t(){try{let n=await r.next();n.done?e.return(n.value):(e.next(n.value),await t());}catch(n){e.throw(n);}}return t().catch(()=>{}),e}function J$1(o){let e=[],r=-1,t=-1,n=o[Symbol.iterator]();for(;;)try{let a=n.next();if(e.push(a.value),a.done){t=e.length-1;break}}catch(a){r=e.length,e.push(a);}return {v:e,t:r,d:t}}var Y$1=class Y{constructor(e){this.marked=new Set;this.plugins=e.plugins,this.features=31^(e.disabledFeatures||0),this.refs=e.refs||new Map;}markRef(e){this.marked.add(e);}isMarked(e){return this.marked.has(e)}createIndex(e){let r=this.refs.size;return this.refs.set(e,r),r}getIndexedValue(e){let r=this.refs.get(e);return r!=null?(this.markRef(r),{type:1,value:sr(r)}):{type:0,value:this.createIndex(e)}}getReference(e){let r=this.getIndexedValue(e);return r.type===1?r:je(e)?{type:2,value:nr(r.value,e)}:r}parseWellKnownSymbol(e){let r=this.getReference(e);return r.type!==0?r.value:(f$1(e in ce,new g$1(e)),or(r.value,e))}parseSpecialReference(e){let r=this.getIndexedValue(lr[e]);return r.type===1?r.value:u$1(26,r.value,e,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1,s$1)}parseIteratorFactory(){let e=this.getIndexedValue(ar);return e.type===1?e.value:u$1(27,e.value,s$1,s$1,s$1,s$1,s$1,s$1,s$1,this.parseWellKnownSymbol(Symbol.iterator),s$1,s$1)}parseAsyncIteratorFactory(){let e=this.getIndexedValue(ir);return e.type===1?e.value:u$1(29,e.value,s$1,s$1,s$1,s$1,s$1,s$1,[this.parseSpecialReference(1),this.parseWellKnownSymbol(Symbol.asyncIterator)],s$1,s$1,s$1)}createObjectNode(e,r,t,n){return u$1(t?11:10,e,s$1,s$1,s$1,s$1,n,s$1,s$1,s$1,s$1,fe$1(r))}createMapNode(e,r,t,n){return u$1(8,e,s$1,s$1,s$1,s$1,s$1,{k:r,v:t,s:n},s$1,this.parseSpecialReference(0),s$1,s$1)}createPromiseConstructorNode(e,r){return u$1(22,e,r,s$1,s$1,s$1,s$1,s$1,s$1,this.parseSpecialReference(1),s$1,s$1)}};var kr=/^[$A-Z_][0-9A-Z_$]*$/i;function Le(o){let e=o[0];return (e==="$"||e==="_"||e>="A"&&e<="Z"||e>="a"&&e<="z")&&kr.test(o)}function se$1(o){switch(o.t){case 0:return o.s+"="+o.v;case 2:return o.s+".set("+o.k+","+o.v+")";case 1:return o.s+".add("+o.v+")";case 3:return o.s+".delete("+o.k+")"}}function Fr(o){let e=[],r=o[0];for(let t=1,n=o.length,a,i=r;t<n;t++)a=o[t],a.t===0&&a.v===i.v?r={t:0,s:a.s,k:s$1,v:se$1(r)}:a.t===2&&a.s===i.s?r={t:2,s:se$1(r),k:a.k,v:a.v}:a.t===1&&a.s===i.s?r={t:1,s:se$1(r),k:s$1,v:a.v}:a.t===3&&a.s===i.s?r={t:3,s:se$1(r),k:a.k,v:s$1}:(e.push(r),r=a),i=a;return e.push(r),e}function fr(o){if(o.length){let e="",r=Fr(o);for(let t=0,n=r.length;t<n;t++)e+=se$1(r[t])+",";return e}return s$1}var Vr="Object.create(null)",Dr="new Set",Br="new Map",jr="Promise.resolve",_r="Promise.reject",Mr={3:"Object.freeze",2:"Object.seal",1:"Object.preventExtensions",0:s$1},V=class{constructor(e){this.stack=[];this.flags=[];this.assignments=[];this.plugins=e.plugins,this.features=e.features,this.marked=new Set(e.markedRefs);}createFunction(e,r){return z$1(this.features,e,r)}createEffectfulFunction(e,r){return S(this.features,e,r)}markRef(e){this.marked.add(e);}isMarked(e){return this.marked.has(e)}pushObjectFlag(e,r){e!==0&&(this.markRef(r),this.flags.push({type:e,value:this.getRefParam(r)}));}resolveFlags(){let e="";for(let r=0,t=this.flags,n=t.length;r<n;r++){let a=t[r];e+=Mr[a.type]+"("+a.value+"),";}return e}resolvePatches(){let e=fr(this.assignments),r=this.resolveFlags();return e?r?e+r:e:r}createAssignment(e,r){this.assignments.push({t:0,s:e,k:s$1,v:r});}createAddAssignment(e,r){this.assignments.push({t:1,s:this.getRefParam(e),k:s$1,v:r});}createSetAssignment(e,r,t){this.assignments.push({t:2,s:this.getRefParam(e),k:r,v:t});}createDeleteAssignment(e,r){this.assignments.push({t:3,s:this.getRefParam(e),k:r,v:s$1});}createArrayAssign(e,r,t){this.createAssignment(this.getRefParam(e)+"["+r+"]",t);}createObjectAssign(e,r,t){this.createAssignment(this.getRefParam(e)+"."+r,t);}isIndexedValueInStack(e){return e.t===4&&this.stack.includes(e.i)}serializeReference(e){return this.assignIndexedValue(e.i,O+'.get("'+e.s+'")')}serializeArrayItem(e,r,t){return r?this.isIndexedValueInStack(r)?(this.markRef(e),this.createArrayAssign(e,t,this.getRefParam(r.i)),""):this.serialize(r):""}serializeArray(e){let r=e.i;if(e.l){this.stack.push(r);let t=e.a,n=this.serializeArrayItem(r,t[0],0),a=n==="";for(let i=1,l=e.l,c;i<l;i++)c=this.serializeArrayItem(r,t[i],i),n+=","+c,a=c==="";return this.stack.pop(),this.pushObjectFlag(e.o,e.i),this.assignIndexedValue(r,"["+n+(a?",]":"]"))}return this.assignIndexedValue(r,"[]")}serializeProperty(e,r,t){if(typeof r=="string"){let n=Number(r),a=n>=0&&n.toString()===r||Le(r);if(this.isIndexedValueInStack(t)){let i=this.getRefParam(t.i);return this.markRef(e.i),a&&n!==n?this.createObjectAssign(e.i,r,i):this.createArrayAssign(e.i,a?r:'"'+r+'"',i),""}return (a?r:'"'+r+'"')+":"+this.serialize(t)}return "["+this.serialize(r)+"]:"+this.serialize(t)}serializeProperties(e,r){let t=r.s;if(t){let n=r.k,a=r.v;this.stack.push(e.i);let i=this.serializeProperty(e,n[0],a[0]);for(let l=1,c=i;l<t;l++)c=this.serializeProperty(e,n[l],a[l]),i+=(c&&i&&",")+c;return this.stack.pop(),"{"+i+"}"}return "{}"}serializeObject(e){return this.pushObjectFlag(e.o,e.i),this.assignIndexedValue(e.i,this.serializeProperties(e,e.p))}serializeWithObjectAssign(e,r,t){let n=this.serializeProperties(e,r);return n!=="{}"?"Object.assign("+t+","+n+")":t}serializeStringKeyAssignment(e,r,t,n){let a=this.serialize(n),i=Number(t),l=i>=0&&i.toString()===t||Le(t);if(this.isIndexedValueInStack(n))l&&i!==i?this.createObjectAssign(e.i,t,a):this.createArrayAssign(e.i,l?t:'"'+t+'"',a);else {let c=this.assignments;this.assignments=r,l&&i!==i?this.createObjectAssign(e.i,t,a):this.createArrayAssign(e.i,l?t:'"'+t+'"',a),this.assignments=c;}}serializeAssignment(e,r,t,n){if(typeof t=="string")this.serializeStringKeyAssignment(e,r,t,n);else {let a=this.stack;this.stack=[];let i=this.serialize(n);this.stack=a;let l=this.assignments;this.assignments=r,this.createArrayAssign(e.i,this.serialize(t),i),this.assignments=l;}}serializeAssignments(e,r){let t=r.s;if(t){let n=[],a=r.k,i=r.v;this.stack.push(e.i);for(let l=0;l<t;l++)this.serializeAssignment(e,n,a[l],i[l]);return this.stack.pop(),fr(n)}return s$1}serializeDictionary(e,r){if(e.p)if(this.features&8)r=this.serializeWithObjectAssign(e,e.p,r);else {this.markRef(e.i);let t=this.serializeAssignments(e,e.p);if(t)return "("+this.assignIndexedValue(e.i,r)+","+t+this.getRefParam(e.i)+")"}return this.assignIndexedValue(e.i,r)}serializeNullConstructor(e){return this.pushObjectFlag(e.o,e.i),this.serializeDictionary(e,Vr)}serializeDate(e){return this.assignIndexedValue(e.i,'new Date("'+e.s+'")')}serializeRegExp(e){return this.assignIndexedValue(e.i,"/"+e.c+"/"+e.m)}serializeSetItem(e,r){return this.isIndexedValueInStack(r)?(this.markRef(e),this.createAddAssignment(e,this.getRefParam(r.i)),""):this.serialize(r)}serializeSet(e){let r=Dr,t=e.l,n=e.i;if(t){let a=e.a;this.stack.push(n);let i=this.serializeSetItem(n,a[0]);for(let l=1,c=i;l<t;l++)c=this.serializeSetItem(n,a[l]),i+=(c&&i&&",")+c;this.stack.pop(),i&&(r+="(["+i+"])");}return this.assignIndexedValue(n,r)}serializeMapEntry(e,r,t,n){if(this.isIndexedValueInStack(r)){let a=this.getRefParam(r.i);if(this.markRef(e),this.isIndexedValueInStack(t)){let l=this.getRefParam(t.i);return this.createSetAssignment(e,a,l),""}if(t.t!==4&&t.i!=null&&this.isMarked(t.i)){let l="("+this.serialize(t)+",["+n+","+n+"])";return this.createSetAssignment(e,a,this.getRefParam(t.i)),this.createDeleteAssignment(e,n),l}let i=this.stack;return this.stack=[],this.createSetAssignment(e,a,this.serialize(t)),this.stack=i,""}if(this.isIndexedValueInStack(t)){let a=this.getRefParam(t.i);if(this.markRef(e),r.t!==4&&r.i!=null&&this.isMarked(r.i)){let l="("+this.serialize(r)+",["+n+","+n+"])";return this.createSetAssignment(e,this.getRefParam(r.i),a),this.createDeleteAssignment(e,n),l}let i=this.stack;return this.stack=[],this.createSetAssignment(e,this.serialize(r),a),this.stack=i,""}return "["+this.serialize(r)+","+this.serialize(t)+"]"}serializeMap(e){let r=Br,t=e.e.s,n=e.i,a=e.f,i=this.getRefParam(a.i);if(t){let l=e.e.k,c=e.e.v;this.stack.push(n);let p=this.serializeMapEntry(n,l[0],c[0],i);for(let h=1,X=p;h<t;h++)X=this.serializeMapEntry(n,l[h],c[h],i),p+=(X&&p&&",")+X;this.stack.pop(),p&&(r+="(["+p+"])");}return a.t===26&&(this.markRef(a.i),r="("+this.serialize(a)+","+r+")"),this.assignIndexedValue(n,r)}serializeArrayBuffer(e){let r="new Uint8Array(",t=e.s,n=t.length;if(n){r+="["+t[0];for(let a=1;a<n;a++)r+=","+t[a];r+="]";}return this.assignIndexedValue(e.i,r+").buffer")}serializeTypedArray(e){return this.assignIndexedValue(e.i,"new "+e.c+"("+this.serialize(e.f)+","+e.b+","+e.l+")")}serializeDataView(e){return this.assignIndexedValue(e.i,"new DataView("+this.serialize(e.f)+","+e.b+","+e.l+")")}serializeAggregateError(e){let r=e.i;this.stack.push(r);let t=this.serializeDictionary(e,'new AggregateError([],"'+e.m+'")');return this.stack.pop(),t}serializeError(e){return this.serializeDictionary(e,"new "+ue$1[e.s]+'("'+e.m+'")')}serializePromise(e){let r,t=e.f,n=e.i,a=e.s?jr:_r;if(this.isIndexedValueInStack(t)){let i=this.getRefParam(t.i);r=a+(e.s?"().then("+this.createFunction([],i)+")":"().catch("+this.createEffectfulFunction([],"throw "+i)+")");}else {this.stack.push(n);let i=this.serialize(t);this.stack.pop(),r=a+"("+i+")";}return this.assignIndexedValue(n,r)}serializeWellKnownSymbol(e){return this.assignIndexedValue(e.i,$e[e.s])}serializeBoxed(e){return this.assignIndexedValue(e.i,"Object("+this.serialize(e.f)+")")}serializePlugin(e){let r=this.plugins;if(r)for(let t=0,n=r.length;t<n;t++){let a=r[t];if(a.tag===e.c)return this.assignIndexedValue(e.i,a.serialize(e.s,this,{id:e.i}))}throw new W$1(e.c)}getConstructor(e){let r=this.serialize(e);return r===this.getRefParam(e.i)?r:"("+r+")"}serializePromiseConstructor(e){let r=this.assignIndexedValue(e.s,"{p:0,s:0,f:0}");return this.assignIndexedValue(e.i,this.getConstructor(e.f)+"("+r+")")}serializePromiseResolve(e){return this.getConstructor(e.a[0])+"("+this.getRefParam(e.i)+","+this.serialize(e.a[1])+")"}serializePromiseReject(e){return this.getConstructor(e.a[0])+"("+this.getRefParam(e.i)+","+this.serialize(e.a[1])+")"}serializeSpecialReference(e){return this.assignIndexedValue(e.i,cr(this.features,e.s))}serializeIteratorFactory(e){let r="",t=false;return e.f.t!==4&&(this.markRef(e.f.i),r="("+this.serialize(e.f)+",",t=true),r+=this.assignIndexedValue(e.i,this.createFunction(["s"],this.createFunction(["i","c","d","t"],"(i=0,t={["+this.getRefParam(e.f.i)+"]:"+this.createFunction([],"t")+",next:"+this.createEffectfulFunction([],"if(i>s.d)return{done:!0,value:void 0};if(d=s.v[c=i++],c===s.t)throw d;return{done:c===s.d,value:d}")+"})"))),t&&(r+=")"),r}serializeIteratorFactoryInstance(e){return this.getConstructor(e.a[0])+"("+this.serialize(e.a[1])+")"}serializeAsyncIteratorFactory(e){let r=e.a[0],t=e.a[1],n="";r.t!==4&&(this.markRef(r.i),n+="("+this.serialize(r)),t.t!==4&&(this.markRef(t.i),n+=(n?",":"(")+this.serialize(t)),n&&(n+=",");let a=this.assignIndexedValue(e.i,this.createFunction(["s"],this.createFunction(["b","c","p","d","e","t","f"],"(b=[],c=0,p=[],d=-1,e=!1,f="+this.createEffectfulFunction(["i","l"],"for(i=0,l=p.length;i<l;i++)p[i].s({done:!0,value:void 0})")+",s.on({next:"+this.createEffectfulFunction(["v","t"],"if(t=p.shift())t.s({done:!1,value:v});b.push(v)")+",throw:"+this.createEffectfulFunction(["v","t"],"if(t=p.shift())t.f(v);f(),d=b.length,e=!0,b.push(v)")+",return:"+this.createEffectfulFunction(["v","t"],"if(t=p.shift())t.s({done:!0,value:v});f(),d=b.length,b.push(v)")+"}),t={["+this.getRefParam(t.i)+"]:"+this.createFunction([],"t.p")+",next:"+this.createEffectfulFunction(["i","t","v"],"if(d===-1){return((i=c++)>=b.length)?("+this.getRefParam(r.i)+"(t={p:0,s:0,f:0}),p.push(t),t.p):{done:!1,value:b[i]}}if(c>d)return{done:!0,value:void 0};if(v=b[i=c++],i!==d)return{done:!1,value:v};if(e)throw v;return{done:!0,value:v}")+"})")));return n?n+a+")":a}serializeAsyncIteratorFactoryInstance(e){return this.getConstructor(e.a[0])+"("+this.serialize(e.a[1])+")"}serializeStreamConstructor(e){let r=this.assignIndexedValue(e.i,this.getConstructor(e.f)+"()"),t=e.a.length;if(t){let n=this.serialize(e.a[0]);for(let a=1;a<t;a++)n+=","+this.serialize(e.a[a]);return "("+r+","+n+","+this.getRefParam(e.i)+")"}return r}serializeStreamNext(e){return this.getRefParam(e.i)+".next("+this.serialize(e.f)+")"}serializeStreamThrow(e){return this.getRefParam(e.i)+".throw("+this.serialize(e.f)+")"}serializeStreamReturn(e){return this.getRefParam(e.i)+".return("+this.serialize(e.f)+")"}serialize(e){try{switch(e.t){case 2:return qe[e.s];case 0:return ""+e.s;case 1:return '"'+e.s+'"';case 3:return e.s+"n";case 4:return this.getRefParam(e.i);case 18:return this.serializeReference(e);case 9:return this.serializeArray(e);case 10:return this.serializeObject(e);case 11:return this.serializeNullConstructor(e);case 5:return this.serializeDate(e);case 6:return this.serializeRegExp(e);case 7:return this.serializeSet(e);case 8:return this.serializeMap(e);case 19:return this.serializeArrayBuffer(e);case 16:case 15:return this.serializeTypedArray(e);case 20:return this.serializeDataView(e);case 14:return this.serializeAggregateError(e);case 13:return this.serializeError(e);case 12:return this.serializePromise(e);case 17:return this.serializeWellKnownSymbol(e);case 21:return this.serializeBoxed(e);case 22:return this.serializePromiseConstructor(e);case 23:return this.serializePromiseResolve(e);case 24:return this.serializePromiseReject(e);case 25:return this.serializePlugin(e);case 26:return this.serializeSpecialReference(e);case 27:return this.serializeIteratorFactory(e);case 28:return this.serializeIteratorFactoryInstance(e);case 29:return this.serializeAsyncIteratorFactory(e);case 30:return this.serializeAsyncIteratorFactoryInstance(e);case 31:return this.serializeStreamConstructor(e);case 32:return this.serializeStreamNext(e);case 33:return this.serializeStreamThrow(e);case 34:return this.serializeStreamReturn(e);default:throw new y$1(e)}}catch(r){throw new Te(r)}}};var D$1=class D extends V{constructor(r){super(r);this.mode="cross";this.scopeId=r.scopeId;}getRefParam(r){return Q+"["+r+"]"}assignIndexedValue(r,t){return this.getRefParam(r)+"="+t}serializeTop(r){let t=this.serialize(r),n=r.i;if(n==null)return t;let a=this.resolvePatches(),i=this.getRefParam(n),l=this.scopeId==null?"":Q,c=a?"("+t+","+a+i+")":t;if(l==="")return r.t===10&&!a?"("+c+")":c;let p=this.scopeId==null?"()":"("+Q+'["'+d(this.scopeId)+'"])';return "("+this.createFunction([l],c)+")"+p}};var v=class extends Y$1{parseItems(e){let r=[];for(let t=0,n=e.length;t<n;t++)t in e&&(r[t]=this.parse(e[t]));return r}parseArray(e,r){return Ne(e,r,this.parseItems(r))}parseProperties(e){let r=Object.entries(e),t=[],n=[];for(let i=0,l=r.length;i<l;i++)t.push(d(r[i][0])),n.push(this.parse(r[i][1]));let a=Symbol.iterator;return a in e&&(t.push(this.parseWellKnownSymbol(a)),n.push(M(this.parseIteratorFactory(),this.parse(J$1(e))))),a=Symbol.asyncIterator,a in e&&(t.push(this.parseWellKnownSymbol(a)),n.push(U(this.parseAsyncIteratorFactory(),this.parse(K$1())))),a=Symbol.toStringTag,a in e&&(t.push(this.parseWellKnownSymbol(a)),n.push(w(e[a]))),a=Symbol.isConcatSpreadable,a in e&&(t.push(this.parseWellKnownSymbol(a)),n.push(e[a]?I$1:A$1)),{k:t,v:n,s:t.length}}parsePlainObject(e,r,t){return this.createObjectNode(e,r,t,this.parseProperties(r))}parseBoxed(e,r){return be(e,this.parse(r.valueOf()))}parseTypedArray(e,r){return xe(e,r,this.parse(r.buffer))}parseBigIntTypedArray(e,r){return Ie(e,r,this.parse(r.buffer))}parseDataView(e,r){return Ae(e,r,this.parse(r.buffer))}parseError(e,r){let t=j$1(r,this.features);return we(e,r,t?this.parseProperties(t):s$1)}parseAggregateError(e,r){let t=j$1(r,this.features);return Ee(e,r,t?this.parseProperties(t):s$1)}parseMap(e,r){let t=[],n=[];for(let[a,i]of r.entries())t.push(this.parse(a)),n.push(this.parse(i));return this.createMapNode(e,t,n,r.size)}parseSet(e,r){let t=[];for(let n of r.keys())t.push(this.parse(n));return Pe(e,r.size,t)}parsePlugin(e,r){let t=this.plugins;if(t)for(let n=0,a=t.length;n<a;n++){let i=t[n];if(i.parse.sync&&i.test(r))return _$1(e,i.tag,i.parse.sync(r,this,{id:e}))}}parseStream(e,r){return L(e,this.parseSpecialReference(4),[])}parsePromise(e,r){return this.createPromiseConstructorNode(e,this.createIndex({}))}parseObject(e,r){if(Array.isArray(r))return this.parseArray(e,r);if(Fe(r))return this.parseStream(e,r);let t=r.constructor;if(t===T$1)return this.parse(r.replacement);let n=this.parsePlugin(e,r);if(n)return n;switch(t){case Object:return this.parsePlainObject(e,r,false);case void 0:return this.parsePlainObject(e,r,true);case Date:return he(e,r);case RegExp:return ye(e,r);case Error:case EvalError:case RangeError:case ReferenceError:case SyntaxError:case TypeError:case URIError:return this.parseError(e,r);case Number:case Boolean:case String:case BigInt:return this.parseBoxed(e,r);case ArrayBuffer:return ve(e,r);case Int8Array:case Int16Array:case Int32Array:case Uint8Array:case Uint16Array:case Uint32Array:case Uint8ClampedArray:case Float32Array:case Float64Array:return this.parseTypedArray(e,r);case DataView:return this.parseDataView(e,r);case Map:return this.parseMap(e,r);case Set:return this.parseSet(e,r);}if(t===Promise||r instanceof Promise)return this.parsePromise(e,r);let a=this.features;if(a&16)switch(t){case BigInt64Array:case BigUint64Array:return this.parseBigIntTypedArray(e,r);}if(a&1&&typeof AggregateError!="undefined"&&(t===AggregateError||r instanceof AggregateError))return this.parseAggregateError(e,r);if(r instanceof Error)return this.parseError(e,r);if(Symbol.iterator in r||Symbol.asyncIterator in r)return this.parsePlainObject(e,r,!!t);throw new g$1(r)}parseFunction(e){let r=this.getReference(e);if(r.type!==0)return r.value;let t=this.parsePlugin(r.value,e);if(t)return t;throw new g$1(e)}parse(e){switch(typeof e){case "boolean":return e?I$1:A$1;case "undefined":return pe$1;case "string":return w(e);case "number":return ge(e);case "bigint":return Se(e);case "object":{if(e){let r=this.getReference(e);return r.type===0?this.parseObject(r.value,e):r.value}return de}case "symbol":return this.parseWellKnownSymbol(e);case "function":return this.parseFunction(e);default:throw new g$1(e)}}parseTop(e){try{return this.parse(e)}catch(r){throw r instanceof E$1?r:new E$1(r)}}};var oe=class extends v{constructor(r){super(r);this.alive=true;this.pending=0;this.initial=true;this.buffer=[];this.onParseCallback=r.onParse,this.onErrorCallback=r.onError,this.onDoneCallback=r.onDone;}onParseInternal(r,t){try{this.onParseCallback(r,t);}catch(n){this.onError(n);}}flush(){for(let r=0,t=this.buffer.length;r<t;r++)this.onParseInternal(this.buffer[r],false);}onParse(r){this.initial?this.buffer.push(r):this.onParseInternal(r,false);}onError(r){if(this.onErrorCallback)this.onErrorCallback(r);else throw r}onDone(){this.onDoneCallback&&this.onDoneCallback();}pushPendingState(){this.pending++;}popPendingState(){--this.pending<=0&&this.onDone();}parseProperties(r){let t=Object.entries(r),n=[],a=[];for(let l=0,c=t.length;l<c;l++)n.push(d(t[l][0])),a.push(this.parse(t[l][1]));let i=Symbol.iterator;return i in r&&(n.push(this.parseWellKnownSymbol(i)),a.push(M(this.parseIteratorFactory(),this.parse(J$1(r))))),i=Symbol.asyncIterator,i in r&&(n.push(this.parseWellKnownSymbol(i)),a.push(U(this.parseAsyncIteratorFactory(),this.parse(Ve(r))))),i=Symbol.toStringTag,i in r&&(n.push(this.parseWellKnownSymbol(i)),a.push(w(r[i]))),i=Symbol.isConcatSpreadable,i in r&&(n.push(this.parseWellKnownSymbol(i)),a.push(r[i]?I$1:A$1)),{k:n,v:a,s:n.length}}handlePromiseSuccess(r,t){let n=this.parseWithError(t);n&&this.onParse(u$1(23,r,s$1,s$1,s$1,s$1,s$1,s$1,[this.parseSpecialReference(2),n],s$1,s$1,s$1)),this.popPendingState();}handlePromiseFailure(r,t){if(this.alive){let n=this.parseWithError(t);n&&this.onParse(u$1(24,r,s$1,s$1,s$1,s$1,s$1,s$1,[this.parseSpecialReference(3),n],s$1,s$1,s$1));}this.popPendingState();}parsePromise(r,t){let n=this.createIndex({});return t.then(this.handlePromiseSuccess.bind(this,n),this.handlePromiseFailure.bind(this,n)),this.pushPendingState(),this.createPromiseConstructorNode(r,n)}parsePlugin(r,t){let n=this.plugins;if(n)for(let a=0,i=n.length;a<i;a++){let l=n[a];if(l.parse.stream&&l.test(t))return _$1(r,l.tag,l.parse.stream(t,this,{id:r}))}return s$1}parseStream(r,t){let n=L(r,this.parseSpecialReference(4),[]);return this.pushPendingState(),t.on({next:a=>{if(this.alive){let i=this.parseWithError(a);i&&this.onParse(Re(r,i));}},throw:a=>{if(this.alive){let i=this.parseWithError(a);i&&this.onParse(Oe(r,i));}this.popPendingState();},return:a=>{if(this.alive){let i=this.parseWithError(a);i&&this.onParse(Ce(r,i));}this.popPendingState();}}),n}parseWithError(r){try{return this.parse(r)}catch(t){return this.onError(t),s$1}}start(r){let t=this.parseWithError(r);t&&(this.onParseInternal(t,true),this.initial=false,this.flush(),this.pending<=0&&this.destroy());}destroy(){this.alive&&(this.onDone(),this.alive=false);}isAlive(){return this.alive}};var G$1=class G extends oe{constructor(){super(...arguments);this.mode="cross";}};function gr(o,e){let r=m$1(e.plugins),t=new G$1({plugins:r,refs:e.refs,disabledFeatures:e.disabledFeatures,onParse(n,a){let i=new D$1({plugins:r,features:t.features,scopeId:e.scopeId,markedRefs:t.marked}),l;try{l=i.serializeTop(n);}catch(c){e.onError&&e.onError(c);return}e.onSerialize(l,a);},onError:e.onError,onDone:e.onDone});return t.start(o),t.destroy.bind(t)}var De=class{constructor(e){this.options=e;this.alive=true;this.flushed=false;this.done=false;this.pending=0;this.cleanups=[];this.refs=new Map;this.keys=new Set;this.ids=0;this.plugins=m$1(e.plugins);}write(e,r){this.alive&&!this.flushed&&(this.pending++,this.keys.add(e),this.cleanups.push(gr(r,{plugins:this.plugins,scopeId:this.options.scopeId,refs:this.refs,disabledFeatures:this.options.disabledFeatures,onError:this.options.onError,onSerialize:(t,n)=>{this.alive&&this.options.onData(n?this.options.globalIdentifier+'["'+d(e)+'"]='+t:t);},onDone:()=>{this.alive&&(this.pending--,this.pending<=0&&this.flushed&&!this.done&&this.options.onDone&&(this.options.onDone(),this.done=true));}})));}getNextID(){for(;this.keys.has(""+this.ids);)this.ids++;return ""+this.ids}push(e){let r=this.getNextID();return this.write(r,e),r}flush(){this.alive&&(this.flushed=true,this.pending<=0&&!this.done&&this.options.onDone&&(this.options.onDone(),this.done=true));}close(){if(this.alive){for(let e=0,r=this.cleanups.length;e<r;e++)this.cleanups[e]();!this.done&&this.options.onDone&&(this.options.onDone(),this.done=true),this.alive=false;}}};

function R(e){e(this.reason);}function A(e){this.addEventListener("abort",R.bind(this,e),{once:true});}function E(e){return new Promise(A.bind(e))}var o=class{constructor(){this.controller=new AbortController;}},F=Hr({tag:"seroval-plugins/web/AbortSignalController",test(e){return e instanceof o},parse:{stream(){}},serialize(e){return "new AbortController"},deserialize(e){return new o}}),s=class{constructor(r,a){this.controller=r;this.reason=a;}},D=Hr({extends:[F],tag:"seroval-plugins/web/AbortSignalAbort",test(e){return e instanceof s},parse:{stream(e,r){return {controller:r.parse(e.controller),reason:r.parse(e.reason)}}},serialize(e,r){return r.serialize(e.controller)+".abort("+r.serialize(e.reason)+")"},deserialize(e,r){let a=r.deserialize(e.controller),t=r.deserialize(e.reason);return a.controller.abort(t),new s(a,t)}});var I=Hr({tag:"seroval-plugins/web/AbortSignal",extends:[D],test(e){return typeof AbortSignal=="undefined"?false:e instanceof AbortSignal},parse:{sync(e,r){return e.aborted?{type:1,reason:r.parse(e.reason)}:{type:0}},async async(e,r){if(e.aborted)return {type:1,reason:await r.parse(e.reason)};let a=await E(e);return {type:1,reason:await r.parse(a)}},stream(e,r){if(e.aborted)return {type:1,reason:r.parse(e.reason)};let a=new o;return r.pushPendingState(),e.addEventListener("abort",()=>{let t=r.parseWithError(new s(a,e.reason));t&&r.onParse(t),r.popPendingState();},{once:true}),{type:2,controller:r.parse(a)}}},serialize(e,r){return e.type===0?"(new AbortController).signal":e.type===1?"AbortSignal.abort("+r.serialize(e.reason)+")":"("+r.serialize(e.controller)+").signal"},deserialize(e,r){return e.type===0?new AbortController().signal:e.type===1?AbortSignal.abort(r.deserialize(e.reason)):r.deserialize(e.controller).controller.signal}}),C=I;function f(e){return {detail:e.detail,bubbles:e.bubbles,cancelable:e.cancelable,composed:e.composed}}var q=Hr({tag:"seroval-plugins/web/CustomEvent",test(e){return typeof CustomEvent=="undefined"?false:e instanceof CustomEvent},parse:{sync(e,r){return {type:r.parse(e.type),options:r.parse(f(e))}},async async(e,r){return {type:await r.parse(e.type),options:await r.parse(f(e))}},stream(e,r){return {type:r.parse(e.type),options:r.parse(f(e))}}},serialize(e,r){return "new CustomEvent("+r.serialize(e.type)+","+r.serialize(e.options)+")"},deserialize(e,r){return new CustomEvent(r.deserialize(e.type),r.deserialize(e.options))}}),H=q;var T=Hr({tag:"seroval-plugins/web/DOMException",test(e){return typeof DOMException=="undefined"?false:e instanceof DOMException},parse:{sync(e,r){return {name:r.parse(e.name),message:r.parse(e.message)}},async async(e,r){return {name:await r.parse(e.name),message:await r.parse(e.message)}},stream(e,r){return {name:r.parse(e.name),message:r.parse(e.message)}}},serialize(e,r){return "new DOMException("+r.serialize(e.message)+","+r.serialize(e.name)+")"},deserialize(e,r){return new DOMException(r.deserialize(e.message),r.deserialize(e.name))}}),_=T;function m(e){return {bubbles:e.bubbles,cancelable:e.cancelable,composed:e.composed}}var j=Hr({tag:"seroval-plugins/web/Event",test(e){return typeof Event=="undefined"?false:e instanceof Event},parse:{sync(e,r){return {type:r.parse(e.type),options:r.parse(m(e))}},async async(e,r){return {type:await r.parse(e.type),options:await r.parse(m(e))}},stream(e,r){return {type:r.parse(e.type),options:r.parse(m(e))}}},serialize(e,r){return "new Event("+r.serialize(e.type)+","+r.serialize(e.options)+")"},deserialize(e,r){return new Event(r.deserialize(e.type),r.deserialize(e.options))}}),Y=j;var W=Hr({tag:"seroval-plugins/web/File",test(e){return typeof File=="undefined"?false:e instanceof File},parse:{async async(e,r){return {name:await r.parse(e.name),options:await r.parse({type:e.type,lastModified:e.lastModified}),buffer:await r.parse(await e.arrayBuffer())}}},serialize(e,r){return "new File(["+r.serialize(e.buffer)+"],"+r.serialize(e.name)+","+r.serialize(e.options)+")"},deserialize(e,r){return new File([r.deserialize(e.buffer)],r.deserialize(e.name),r.deserialize(e.options))}}),c=W;function g(e){let r=[];return e.forEach((a,t)=>{r.push([t,a]);}),r}var i={},G=Hr({tag:"seroval-plugins/web/FormDataFactory",test(e){return e===i},parse:{sync(){},async async(){return await Promise.resolve(void 0)},stream(){}},serialize(e,r){return r.createEffectfulFunction(["e","f","i","s","t"],"f=new FormData;for(i=0,s=e.length;i<s;i++)f.append((t=e[i])[0],t[1]);return f")},deserialize(){return i}}),J=Hr({tag:"seroval-plugins/web/FormData",extends:[c,G],test(e){return typeof FormData=="undefined"?false:e instanceof FormData},parse:{sync(e,r){return {factory:r.parse(i),entries:r.parse(g(e))}},async async(e,r){return {factory:await r.parse(i),entries:await r.parse(g(e))}},stream(e,r){return {factory:r.parse(i),entries:r.parse(g(e))}}},serialize(e,r){return "("+r.serialize(e.factory)+")("+r.serialize(e.entries)+")"},deserialize(e,r){let a=new FormData,t=r.deserialize(e.entries);for(let n=0,b=t.length;n<b;n++){let S=t[n];a.append(S[0],S[1]);}return a}}),K=J;function y(e){let r=[];return e.forEach((a,t)=>{r.push([t,a]);}),r}var X=Hr({tag:"seroval-plugins/web/Headers",test(e){return typeof Headers=="undefined"?false:e instanceof Headers},parse:{sync(e,r){return r.parse(y(e))},async async(e,r){return await r.parse(y(e))},stream(e,r){return r.parse(y(e))}},serialize(e,r){return "new Headers("+r.serialize(e)+")"},deserialize(e,r){return new Headers(r.deserialize(e))}}),l=X;var p={},ee=Hr({tag:"seroval-plugins/web/ReadableStreamFactory",test(e){return e===p},parse:{sync(){},async async(){return await Promise.resolve(void 0)},stream(){}},serialize(e,r){return r.createFunction(["d"],"new ReadableStream({start:"+r.createEffectfulFunction(["c"],"d.on({next:"+r.createEffectfulFunction(["v"],"try{c.enqueue(v)}catch{}")+",throw:"+r.createEffectfulFunction(["v"],"c.error(v)")+",return:"+r.createEffectfulFunction([],"try{c.close()}catch{}")+"})")+"})")},deserialize(){return p}});function z(e){let r=K$1(),a=e.getReader();async function t(){try{let n=await a.read();n.done?r.return(n.value):(r.next(n.value),await t());}catch(n){r.throw(n);}}return t().catch(()=>{}),r}var re=Hr({tag:"seroval/plugins/web/ReadableStream",extends:[ee],test(e){return typeof ReadableStream=="undefined"?false:e instanceof ReadableStream},parse:{sync(e,r){return {factory:r.parse(p),stream:r.parse(K$1())}},async async(e,r){return {factory:await r.parse(p),stream:await r.parse(z(e))}},stream(e,r){return {factory:r.parse(p),stream:r.parse(z(e))}}},serialize(e,r){return "("+r.serialize(e.factory)+")("+r.serialize(e.stream)+")"},deserialize(e,r){let a=r.deserialize(e.stream);return new ReadableStream({start(t){a.on({next(n){try{t.enqueue(n);}catch(b){}},throw(n){t.error(n);},return(){try{t.close();}catch(n){}}});}})}}),u=re;function h(e,r){return {body:r,cache:e.cache,credentials:e.credentials,headers:e.headers,integrity:e.integrity,keepalive:e.keepalive,method:e.method,mode:e.mode,redirect:e.redirect,referrer:e.referrer,referrerPolicy:e.referrerPolicy}}var te=Hr({tag:"seroval-plugins/web/Request",extends:[u,l],test(e){return typeof Request=="undefined"?false:e instanceof Request},parse:{async async(e,r){return {url:await r.parse(e.url),options:await r.parse(h(e,e.body?await e.clone().arrayBuffer():null))}},stream(e,r){return {url:r.parse(e.url),options:r.parse(h(e,e.clone().body))}}},serialize(e,r){return "new Request("+r.serialize(e.url)+","+r.serialize(e.options)+")"},deserialize(e,r){return new Request(r.deserialize(e.url),r.deserialize(e.options))}}),ne=te;function N(e){return {headers:e.headers,status:e.status,statusText:e.statusText}}var se=Hr({tag:"seroval-plugins/web/Response",extends:[u,l],test(e){return typeof Response=="undefined"?false:e instanceof Response},parse:{async async(e,r){return {body:await r.parse(e.body?await e.clone().arrayBuffer():null),options:await r.parse(N(e))}},stream(e,r){return {body:r.parse(e.clone().body),options:r.parse(N(e))}}},serialize(e,r){return "new Response("+r.serialize(e.body)+","+r.serialize(e.options)+")"},deserialize(e,r){return new Response(r.deserialize(e.body),r.deserialize(e.options))}}),ie=se;var pe=Hr({tag:"seroval-plugins/web/URL",test(e){return typeof URL=="undefined"?false:e instanceof URL},parse:{sync(e,r){return r.parse(e.href)},async async(e,r){return await r.parse(e.href)},stream(e,r){return r.parse(e.href)}},serialize(e,r){return "new URL("+r.serialize(e)+")"},deserialize(e,r){return new URL(r.deserialize(e))}}),ue=pe;var fe=Hr({tag:"seroval-plugins/web/URLSearchParams",test(e){return typeof URLSearchParams=="undefined"?false:e instanceof URLSearchParams},parse:{sync(e,r){return r.parse(e.toString())},async async(e,r){return await r.parse(e.toString())},stream(e,r){return r.parse(e.toString())}},serialize(e,r){return "new URLSearchParams("+r.serialize(e)+")"},deserialize(e,r){return new URLSearchParams(r.deserialize(e))}}),me=fe;

const ES2017FLAG = R$1.AggregateError
| R$1.BigIntTypedArray;
const GLOBAL_IDENTIFIER = '_$HY.r';
function createSerializer({
  onData,
  onDone,
  scopeId,
  onError
}) {
  return new De({
    scopeId,
    plugins: [C,
    H, _, Y,
    K, l, u, ne, ie, me, ue],
    globalIdentifier: GLOBAL_IDENTIFIER,
    disabledFeatures: ES2017FLAG,
    onData,
    onDone,
    onError
  });
}
function getLocalHeaderScript(id) {
  return xr(id) + ';';
}
const REPLACE_SCRIPT = `function $df(e,n,o,t){if(n=document.getElementById(e),o=document.getElementById("pl-"+e)){for(;o&&8!==o.nodeType&&o.nodeValue!=="pl-"+e;)t=o.nextSibling,o.remove(),o=t;_$HY.done?o.remove():o.replaceWith(n.content)}n.remove(),_$HY.fe(e)}`;
function renderToString(code, options = {}) {
  const {
    renderId
  } = options;
  let scripts = "";
  const serializer = createSerializer({
    scopeId: renderId,
    onData(script) {
      if (!scripts) {
        scripts = getLocalHeaderScript(renderId);
      }
      scripts += script + ";";
    },
    onError: options.onError
  });
  sharedConfig.context = {
    id: renderId || "",
    count: 0,
    suspense: {},
    lazy: {},
    assets: [],
    nonce: options.nonce,
    serialize(id, p) {
      !sharedConfig.context.noHydrate && serializer.write(id, p);
    },
    roots: 0,
    nextRoot() {
      return this.renderId + "i-" + this.roots++;
    }
  };
  let html = createRoot(d => {
    setTimeout(d);
    return resolveSSRNode(escape(code()));
  });
  sharedConfig.context.noHydrate = true;
  serializer.close();
  html = injectAssets(sharedConfig.context.assets, html);
  if (scripts.length) html = injectScripts(html, scripts, options.nonce);
  return html;
}
function renderToStringAsync(code, options = {}) {
  const {
    timeoutMs = 30000
  } = options;
  let timeoutHandle;
  const timeout = new Promise((_, reject) => {
    timeoutHandle = setTimeout(() => reject("renderToString timed out"), timeoutMs);
  });
  return Promise.race([renderToStream(code, options), timeout]).then(html => {
    clearTimeout(timeoutHandle);
    return html;
  });
}
function renderToStream(code, options = {}) {
  let {
    nonce,
    onCompleteShell,
    onCompleteAll,
    renderId,
    noScripts
  } = options;
  let dispose;
  const blockingPromises = [];
  const pushTask = task => {
    if (noScripts) return;
    if (!tasks && !firstFlushed) {
      tasks = getLocalHeaderScript(renderId);
    }
    tasks += task + ";";
    if (!timer && firstFlushed) {
      timer = setTimeout(writeTasks);
    }
  };
  const onDone = () => {
    writeTasks();
    doShell();
    onCompleteAll && onCompleteAll({
      write(v) {
        !completed && buffer.write(v);
      }
    });
    writable && writable.end();
    completed = true;
    if (firstFlushed) dispose();
  };
  const serializer = createSerializer({
    scopeId: options.renderId,
    onData: pushTask,
    onDone,
    onError: options.onError
  });
  const flushEnd = () => {
    if (!registry.size) {
      queue(() => queue(() => serializer.flush()));
    }
  };
  const registry = new Map();
  const writeTasks = () => {
    if (tasks.length && !completed && firstFlushed) {
      buffer.write(`<script${nonce ? ` nonce="${nonce}"` : ""}>${tasks}</script>`);
      tasks = "";
    }
    timer && clearTimeout(timer);
    timer = null;
  };
  let context;
  let writable;
  let tmp = "";
  let tasks = "";
  let firstFlushed = false;
  let completed = false;
  let shellCompleted = false;
  let scriptFlushed = false;
  let timer = null;
  let buffer = {
    write(payload) {
      tmp += payload;
    }
  };
  sharedConfig.context = context = {
    id: renderId || "",
    count: 0,
    async: true,
    resources: {},
    lazy: {},
    suspense: {},
    assets: [],
    nonce,
    block(p) {
      if (!firstFlushed) blockingPromises.push(p);
    },
    replace(id, payloadFn) {
      if (firstFlushed) return;
      const placeholder = `<!--!$${id}-->`;
      const first = html.indexOf(placeholder);
      if (first === -1) return;
      const last = html.indexOf(`<!--!$/${id}-->`, first + placeholder.length);
      html = html.slice(0, first) + resolveSSRNode(escape(payloadFn())) + html.slice(last + placeholder.length + 1);
    },
    serialize(id, p, wait) {
      const serverOnly = sharedConfig.context.noHydrate;
      if (!firstFlushed && wait && typeof p === "object" && "then" in p) {
        blockingPromises.push(p);
        !serverOnly && p.then(d => {
          serializer.write(id, d);
        }).catch(e => {
          serializer.write(id, e);
        });
      } else if (!serverOnly) serializer.write(id, p);
    },
    roots: 0,
    nextRoot() {
      return this.renderId + "i-" + this.roots++;
    },
    registerFragment(key) {
      if (!registry.has(key)) {
        let resolve, reject;
        const p = new Promise((r, rej) => (resolve = r, reject = rej));
        registry.set(key, err => queue(() => queue(() => {
          err ? reject(err) : resolve(true);
          queue(flushEnd);
        })));
        serializer.write(key, p);
      }
      return (value, error) => {
        if (registry.has(key)) {
          const resolve = registry.get(key);
          registry.delete(key);
          if (waitForFragments(registry, key)) {
            resolve();
            return;
          }
          if (!completed) {
            if (!firstFlushed) {
              queue(() => html = replacePlaceholder(html, key, value !== undefined ? value : ""));
              resolve(error);
            } else {
              buffer.write(`<template id="${key}">${value !== undefined ? value : " "}</template>`);
              pushTask(`$df("${key}")${!scriptFlushed ? ";" + REPLACE_SCRIPT : ""}`);
              resolve(error);
              scriptFlushed = true;
            }
          }
        }
        return firstFlushed;
      };
    }
  };
  let html = createRoot(d => {
    dispose = d;
    return resolveSSRNode(escape(code()));
  });
  function doShell() {
    if (shellCompleted) return;
    sharedConfig.context = context;
    context.noHydrate = true;
    html = injectAssets(context.assets, html);
    if (tasks.length) html = injectScripts(html, tasks, nonce);
    buffer.write(html);
    tasks = "";
    onCompleteShell && onCompleteShell({
      write(v) {
        !completed && buffer.write(v);
      }
    });
    shellCompleted = true;
  }
  return {
    then(fn) {
      function complete() {
        dispose();
        fn(tmp);
      }
      if (onCompleteAll) {
        let ogComplete = onCompleteAll;
        onCompleteAll = options => {
          ogComplete(options);
          complete();
        };
      } else onCompleteAll = complete;
      queue(flushEnd);
    },
    pipe(w) {
      allSettled(blockingPromises).then(() => {
        setTimeout(() => {
          doShell();
          buffer = writable = w;
          buffer.write(tmp);
          firstFlushed = true;
          if (completed) {
            dispose();
            writable.end();
          } else flushEnd();
        });
      });
    },
    pipeTo(w) {
      return allSettled(blockingPromises).then(() => {
        let resolve;
        const p = new Promise(r => resolve = r);
        setTimeout(() => {
          doShell();
          const encoder = new TextEncoder();
          const writer = w.getWriter();
          writable = {
            end() {
              writer.releaseLock();
              w.close();
              resolve();
            }
          };
          buffer = {
            write(payload) {
              writer.write(encoder.encode(payload));
            }
          };
          buffer.write(tmp);
          firstFlushed = true;
          if (completed) {
            dispose();
            writable.end();
          } else flushEnd();
        });
        return p;
      });
    }
  };
}
function ssr(t, ...nodes) {
  if (nodes.length) {
    let result = "";
    for (let i = 0; i < nodes.length; i++) {
      result += t[i];
      const node = nodes[i];
      if (node !== undefined) result += resolveSSRNode(node);
    }
    t = result + t[nodes.length];
  }
  return {
    t
  };
}
function escape(s, attr) {
  const t = typeof s;
  if (t !== "string") {
    if (t === "function") return escape(s());
    if (Array.isArray(s)) {
      s = s.slice();
      for (let i = 0; i < s.length; i++) s[i] = escape(s[i]);
      return s;
    }
    return s;
  }
  const delim = "<";
  const escDelim = "&lt;";
  let iDelim = s.indexOf(delim);
  let iAmp = s.indexOf("&");
  if (iDelim < 0 && iAmp < 0) return s;
  let left = 0,
    out = "";
  while (iDelim >= 0 && iAmp >= 0) {
    if (iDelim < iAmp) {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } else {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }
  if (iDelim >= 0) {
    do {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } while (iDelim >= 0);
  } else while (iAmp >= 0) {
    if (left < iAmp) out += s.substring(left, iAmp);
    out += "&amp;";
    left = iAmp + 1;
    iAmp = s.indexOf("&", left);
  }
  return left < s.length ? out + s.substring(left) : out;
}
function resolveSSRNode(node, top) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let prev = {};
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) {
      if (typeof prev !== "object" && typeof node[i] !== "object") mapped += `<!--!$-->`;
      mapped += resolveSSRNode(prev = node[i]);
    }
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode(node());
  return String(node);
}
function generateHydrationScript({
  eventNames = ["click", "input"],
  nonce
} = {}) {
  return `<script${nonce ? ` nonce="${nonce}"` : ""}>window._$HY||(e=>{let t=e=>e&&e.hasAttribute&&(e.hasAttribute("data-hk")?e:t(e.host&&e.host.nodeType?e.host:e.parentNode));["${eventNames.join('", "')}"].forEach((o=>document.addEventListener(o,(o=>{if(!e.events)return;let s=t(o.composedPath&&o.composedPath()[0]||o.target);s&&!e.completed.has(s)&&e.events.push([s,o])}))))})(_$HY={events:[],completed:new WeakSet,r:{},fe(){}});</script><!--xs-->`;
}
function NoHydration(props) {
  if (sharedConfig.context) sharedConfig.context.noHydrate = true;
  return props.children;
}
function queue(fn) {
  return Promise.resolve().then(fn);
}
function allSettled(promises) {
  let length = promises.length;
  return Promise.allSettled(promises).then(() => {
    if (promises.length !== length) return allSettled(promises);
    return;
  });
}
function injectAssets(assets, html) {
  if (!assets || !assets.length) return html;
  let out = "";
  for (let i = 0, len = assets.length; i < len; i++) out += assets[i]();
  const index = html.indexOf("</head>");
  if (index === -1) return html;
  return html.slice(0, index) + out + html.slice(index);
}
function injectScripts(html, scripts, nonce) {
  const tag = `<script${nonce ? ` nonce="${nonce}"` : ""}>${scripts}</script>`;
  const index = html.indexOf("<!--xs-->");
  if (index > -1) {
    return html.slice(0, index) + tag + html.slice(index);
  }
  return html + tag;
}
function waitForFragments(registry, key) {
  for (const k of [...registry.keys()].reverse()) {
    if (key.startsWith(k)) return true;
  }
  return false;
}
function replacePlaceholder(html, key, value) {
  const marker = `<template id="pl-${key}">`;
  const close = `<!--pl-${key}-->`;
  const first = html.indexOf(marker);
  if (first === -1) return html;
  const last = html.indexOf(close, first + marker.length);
  return html.slice(0, first) + value + html.slice(last + close.length);
}

const contexts = /* @__PURE__ */ new WeakMap();
function getContext(result) {
  if (contexts.has(result)) {
    return contexts.get(result);
  }
  let ctx = {
    c: 0,
    get id() {
      return "s" + this.c.toString();
    }
  };
  contexts.set(result, ctx);
  return ctx;
}
function incrementId(ctx) {
  let id = ctx.id;
  ctx.c++;
  return id;
}

const slotName$1 = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check$1(Component, props, children) {
  if (typeof Component !== "function") return false;
  if (Component.name === "QwikComponent") return false;
  if (Component.toString().includes("$$payload")) return false;
  let html;
  try {
    const result = await renderToStaticMarkup$1.call(this, Component, props, children, {
      // The purpose of check() is just to validate that this is a Solid component and not
      // React, etc. We should render in sync mode which should skip Suspense boundaries
      // or loading resources like external API calls.
      renderStrategy: "sync"
    });
    html = result.html;
  } catch {
  }
  return typeof html === "string";
}
async function renderToStaticMarkup$1(Component, props, { default: children, ...slotted }, metadata) {
  const ctx = getContext(this.result);
  const renderId = metadata?.hydrate ? incrementId(ctx) : "";
  const needsHydrate = metadata?.astroStaticSlot ? !!metadata.hydrate : true;
  const tagName = needsHydrate ? "astro-slot" : "astro-static-slot";
  const renderStrategy = metadata?.renderStrategy ?? "async";
  const renderFn = () => {
    const slots = {};
    for (const [key, value] of Object.entries(slotted)) {
      const name = slotName$1(key);
      slots[name] = ssr(`<${tagName} name="${name}">${value}</${tagName}>`);
    }
    const newProps = {
      ...props,
      ...slots,
      // In Solid SSR mode, `ssr` creates the expected structure for `children`.
      children: children != null ? ssr(`<${tagName}>${children}</${tagName}>`) : children
    };
    if (renderStrategy === "sync") {
      return createComponent(Component, newProps);
    } else {
      if (needsHydrate) {
        return createComponent(Suspense, {
          get children() {
            return createComponent(Component, newProps);
          }
        });
      } else {
        return createComponent(NoHydration, {
          get children() {
            return createComponent(Suspense, {
              get children() {
                return createComponent(Component, newProps);
              }
            });
          }
        });
      }
    }
  };
  const componentHtml = renderStrategy === "async" ? await renderToStringAsync(renderFn, {
    renderId,
    // New setting since Solid 1.8.4 that fixes an errant hydration event appearing in
    // server only components. Not available in TypeScript types yet.
    // https://github.com/solidjs/solid/issues/1931
    // https://github.com/ryansolid/dom-expressions/commit/e09e255ac725fd59195aa0f3918065d4bd974e6b
    ...{ noScripts: !needsHydrate }
  }) : renderToString(renderFn, { renderId });
  return {
    attrs: {
      "data-solid-render-id": renderId
    },
    html: componentHtml
  };
}
const renderer$1 = {
  name: "@astrojs/solid",
  check: check$1,
  renderToStaticMarkup: renderToStaticMarkup$1,
  supportsAstroStaticSlot: true,
  renderHydrationScript: () => generateHydrationScript()
};
var server_default$1 = renderer$1;

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function") return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
    throwEnhancedErrorIfMdxComponent(e, Component);
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  try {
    const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
    return { html };
  } catch (e) {
    throwEnhancedErrorIfMdxComponent(e, Component);
    throw e;
  }
}
function throwEnhancedErrorIfMdxComponent(error, Component) {
  if (Component[Symbol.for("mdx-component")]) {
    if (AstroUserError.is(error)) return;
    error.title = error.name;
    error.hint = `This issue often occurs when your MDX component encounters runtime errors.`;
    throw error;
  }
}
const renderer = {
  name: "astro:jsx",
  check,
  renderToStaticMarkup
};
var server_default = renderer;

const renderers = [Object.assign({"name":"@astrojs/solid-js","clientEntrypoint":"@astrojs/solid-js/client.js","serverEntrypoint":"@astrojs/solid-js/server.js"}, { ssr: server_default$1 }),Object.assign({"name":"astro:jsx","serverEntrypoint":"file:///home/josh/projects/sst/opencode/node_modules/@astrojs/mdx/dist/server.js"}, { ssr: server_default }),];

export { renderers };
