var wp=Object.defineProperty;var uu=(n,t)=>{for(var e in t)wp(n,e,{get:t[e],enumerable:!0})};var bn=typeof window<"u",Mo=bn?window:null,bi=bn?document:null,fe={OBJECT:0,ATTRIBUTE:1,CSS:2,TRANSFORM:3,CSS_VAR:4},Zt={NUMBER:0,UNIT:1,COLOR:2,COMPLEX:3},Ve={NONE:0,AUTO:1,FORCE:2},Ae={replace:0,none:1,blend:2},tc=Symbol(),Yn=Symbol(),bo=Symbol(),Ti=Symbol(),du=Symbol(),ne=1e-11,or=1e12,Zn=1e3,ar=240,Tn="",fu="var(",lr=[],To=(()=>{let n=new Map;return n.set("x","translateX"),n.set("y","translateY"),n.set("z","translateZ"),n})(),vs=["perspective","translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY"],pu=vs.reduce((n,t)=>({...n,[t]:t+"("}),{}),Re=()=>{},mu=n=>n,gu=/\)\s*[-.\d]/,_u=/(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i,xu=/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,vu=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,yu=/hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i,Su=/hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,ec=/[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi,Ao=/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i,Mu=/([a-z])([A-Z])/g,bu=/(\*=|\+=|-=)/,Tu=/var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\s*\)/;var ys={id:null,keyframes:null,playbackEase:null,playbackRate:1,frameRate:ar,loop:0,reversed:!1,alternate:!1,autoplay:!0,persist:!1,duration:Zn,delay:0,loopDelay:0,ease:"out(2)",composition:Ae.replace,modifier:mu,onBegin:Re,onBeforeUpdate:Re,onUpdate:Re,onLoop:Re,onPause:Re,onComplete:Re,onRender:Re},cr={current:null,root:bi},ue={defaults:ys,precision:4,timeScale:1,tickThreshold:200,editor:null},nc={version:"4.5.0",engine:null};bn&&(Mo.AnimeJS||(Mo.AnimeJS=[]),Mo.AnimeJS.push(nc));var sc=n=>n.replace(Mu,"$1-$2").toLowerCase(),pn=(n,t)=>n.indexOf(t)===0,ai=Date.now,mn=Array.isArray,Eo=n=>n&&n.constructor===Object,An=n=>typeof n=="number"&&!isNaN(n),En=n=>typeof n=="string",nn=n=>typeof n=="function",Vt=n=>typeof n>"u",Jn=n=>Vt(n)||n===null,wo=n=>bn&&n instanceof SVGElement,rc=n=>_u.test(n),oc=n=>pn(n,"rgb"),ac=n=>pn(n,"hsl"),Au=n=>rc(n)||(oc(n)||ac(n))&&(n[n.length-1]===")"||!gu.test(n)),hr=n=>!ue.defaults.hasOwnProperty(n),Cp=["opacity","rotate","overflow","color"],Eu=(n,t)=>{if(Cp.includes(t))return!1;if(n.getAttribute(t)||t in n){if(t==="scale"){let e=n.parentNode;return e&&e.tagName==="filter"}return!0}},Co=n=>En(n)?parseFloat(n):n,Ki=Math.pow,ur=Math.sqrt,wu=Math.sin,Cu=Math.cos,$i=Math.abs;var Qi=Math.floor,Ru=Math.asin;var dr=Math.PI,ic=Math.round,We=(n,t,e)=>n<t?t:n>e?e:n,re=(n,t)=>{if(t<0)return n;if(!t)return ic(n);let e=10**t;return ic(n*e)/e},Iu=(n,t)=>mn(t)?t.reduce((e,i)=>$i(i-n)<$i(e-n)?i:e):t?ic(n/t)*t:n,li=(n,t,e)=>e===1?t:e===0?n:n+(t-n)*e,fr=n=>n===1/0?or:n===-1/0?-or:n,ji=n=>n<=ne?ne:fr(re(n,11)),Ie=n=>mn(n)?[...n]:n,Pu=(n,t)=>{let e={...n};for(let i in t){let s=n[i];e[i]=Vt(s)?t[i]:s}return e},_e=(n,t,e,i="_prev",s="_next")=>{let r=n._head,o=s;for(e&&(r=n._tail,o=i);r;){let a=r[o];t(r),r=a}},gn=(n,t,e="_prev",i="_next")=>{let s=t[e],r=t[i];s?s[i]=r:n._head=r,r?r[e]=s:n._tail=s,t[e]=null,t[i]=null},wn=(n,t,e,i="_prev",s="_next")=>{let r=n._tail;for(;r&&e&&e(r,t);)r=r[i];let o=r?r[s]:n._head;r?r[s]=t:n._head=t,o?o[i]=t:n._tail=t,t[i]=r,t[s]=o};var Lu=(n,t,e)=>{let i=n.style.transform;if(i){let s=n[Ti],r=0,o=i.length,a;for(;r<o;){for(;r<o&&i.charCodeAt(r)===32;)r++;if(r>=o)break;let c=r;for(;r<o&&i.charCodeAt(r)!==40;)r++;if(r>=o)break;let u=i.substring(c,r),d=1,h=r+1,f=-1,_=-1;for(r++;r<o&&d>0;){let g=i.charCodeAt(r);g===40?d++:g===41?d--:g===44&&d===1&&(f===-1?f=r:_===-1&&(_=r)),r++}let S=r-1;u==="translate"||u==="translate3d"?(f===-1?s.translateX=i.substring(h,S).trim():(s.translateX=i.substring(h,f).trim(),_===-1?s.translateY=i.substring(f+1,S).trim():(s.translateY=i.substring(f+1,_).trim(),s.translateZ=i.substring(_+1,S).trim())),a=i.substring(h,S)):u==="scale"||u==="scale3d"?f===-1?s.scale=i.substring(h,S).trim():(s.scaleX=i.substring(h,f).trim(),_===-1?s.scaleY=i.substring(f+1,S).trim():(s.scaleY=i.substring(f+1,_).trim(),s.scaleZ=i.substring(_+1,S).trim())):s[u]=i.substring(h,S)}if(t==="translate3d"&&a)return e&&(e[t]=a),a;let l=s[t];if(!Vt(l))return e&&(e[t]=l),l}return t==="translate3d"?"0px, 0px, 0px":t==="rotate3d"?"0, 0, 0, 0deg":pn(t,"scale")?"1":pn(t,"rotate")||pn(t,"skew")?"0deg":"0px"},Ro=n=>{let t=Tn;for(let e=0,i=vs.length;e<i;e++){let s=vs[e],r=n[s];if(r!==void 0){if(s==="translateX"){let o=n.translateY;if(o!==void 0){let a=n.translateZ;a!==void 0?(t+=`translate3d(${r},${o},${a}) `,e+=2):(t+=`translate(${r},${o}) `,e+=1);continue}}if(s==="scaleX"&&n.scale===void 0){let o=n.scaleY;if(o!==void 0){let a=n.scaleZ;a!==void 0?(t+=`scale3d(${r},${o},${a}) `,e+=2):(t+=`scale(${r},${o}) `,e+=1);continue}}t+=`${pu[s]}${r}) `}s==="rotateZ"&&n.rotate3d!==void 0&&(t+=`rotate3d(${n.rotate3d}) `)}return n.matrix!==void 0&&(t+=`matrix(${n.matrix}) `),n.matrix3d!==void 0&&(t+=`matrix3d(${n.matrix3d}) `),t};var Rp=()=>!0,lc=class{constructor(t){this.detect=t,this.props={}}registerProperty(t,e,i,s){this.props[t]={get:e,set:i,gate:s||Rp}}},cc=class{constructor(t){this.detect=t||null,this.targetAdapters=[],this.propertyResolvers=[]}registerTargetAdapter(t){let e=new lc(t);return this.targetAdapters.push(e),e}registerPropertyResolver(t){this.propertyResolvers.indexOf(t)===-1&&this.propertyResolvers.push(t)}},Io=[];function Du(n){let t=new cc(n);return Io.push(t),t}function Po(n,t){if(!n)return null;let e=Io.length;t:for(let i=0;i<e;i++){let s=Io[i];if(s.detect&&!s.detect(n))continue;let r=s.targetAdapters;for(let o=0,a=r.length;o<a;o++){let l=r[o];if(l.detect(n)){let c=l.props[t];if(c&&(!c.gate||c.gate(n)))return c;break t}}}for(let i=0;i<e;i++){let s=Io[i];if(s.detect&&!s.detect(n))continue;let r=s.propertyResolvers;for(let o=0,a=r.length;o<a;o++){let l=r[o](n,t);if(l)return l}}return null}var Ip=n=>{let t=xu.exec(n)||vu.exec(n),e=Vt(t[4])?1:+t[4];return[+t[1],+t[2],+t[3],e]},Pp=n=>{let t=n.length,e=t===4||t===5;return[+("0x"+n[1]+n[e?1:2]),+("0x"+n[e?2:3]+n[e?2:4]),+("0x"+n[e?3:5]+n[e?3:6]),t===5||t===9?+(+("0x"+n[e?4:7]+n[e?4:8])/255).toFixed(3):1]},hc=(n,t,e)=>(e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*(2/3-e)*6:n),Lp=n=>{let t=yu.exec(n)||Su.exec(n),e=+t[1]/360,i=+t[2]/100,s=+t[3]/100,r=Vt(t[4])?1:+t[4],o,a,l;if(i===0)o=a=l=s;else{let c=s<.5?s*(1+i):s+i-s*i,u=2*s-c;o=re(hc(u,c,e+1/3)*255,0),a=re(hc(u,c,e)*255,0),l=re(hc(u,c,e-1/3)*255,0)}return[o,a,l,r]},Nu=n=>oc(n)?Ip(n):rc(n)?Pp(n):ac(n)?Lp(n):[0,0,0,1];var we=(n,t)=>Vt(n)?t:n,Uu=(n,t)=>{let e=n.match(Tu),i=t[Yn]?t:document.documentElement,s=getComputedStyle(i)?.getPropertyValue(e[1]);return(!s||s.trim()===Tn)&&e[2]&&(s=e[2].trim()),s||0},$n=(n,t,e,i,s,r)=>{if(nn(n)){if(!s){let a=n(t,e,i,r);return isNaN(+a)?a||0:+a}let o=()=>{let a=n(t,e,i,r);return isNaN(+a)?a||0:+a};return s.func=o,o()}if(En(n)&&pn(n,fu)){if(!s)return Uu(n,t);let o=()=>Uu(n,t);return s.func=o,o()}return n},pr=(n,t)=>n[Yn]?n[bo]&&Eu(n,t)?fe.ATTRIBUTE:vs.includes(t)||To.get(t)?fe.TRANSFORM:pn(t,"--")?fe.CSS_VAR:t in n.style?fe.CSS:t in n?fe.OBJECT:fe.ATTRIBUTE:fe.OBJECT,Fu=(n,t,e)=>{let i=n.style[t];i&&e&&(e[t]=i);let s=i||getComputedStyle(n[du]||n).getPropertyValue(t);return s==="auto"?"0":s},Kn=(n,t,e,i)=>{let s=Vt(e)?pr(n,t):e,r=Po(n,t);if(r){let o=r.get(n);return o&&i&&(i[t]=o),o??0}if(s===fe.OBJECT){let o=n[t];return o&&i&&(i[t]=o),o||0}if(s===fe.ATTRIBUTE){let o=n.getAttribute(t);return o&&i&&(i[t]=o),o}return s===fe.TRANSFORM?Lu(n,t,i):s===fe.CSS_VAR?Fu(n,t,i).trimStart():Fu(n,t,i)},Ss=(n,t,e)=>e==="-"?n-t:e==="+"?n+t:n*t,Lo=()=>({t:Zt.NUMBER,n:0,u:null,o:null,d:null,s:null}),Xe=(n,t)=>{if(t.t=Zt.NUMBER,t.n=0,t.u=null,t.o=null,t.d=null,t.s=null,!n)return t;let e=+n;if(!isNaN(e))return t.n=e,t;let i=n;i[1]==="="&&(t.o=i[0],i=i.slice(2));let s=i.includes(" ")?!1:Ao.exec(i);if(s)return t.t=Zt.UNIT,t.n=+s[1],t.u=s[2],t;if(t.o)return t.n=+i,t;if(Au(i))return t.t=Zt.COLOR,t.d=Nu(i),t;{let r=i.match(ec);return t.t=Zt.COMPLEX,t.d=r?r.map(Number):[],t.s=i.split(ec)||[],t}},uc=(n,t)=>(t.t=n._valueType,t.n=n._toNumber,t.u=n._unit,t.o=null,t.d=Ie(n._toNumbers),t.s=Ie(n._strings),t),Le=Lo(),Do=(n,t,e)=>{let i=n._modifier,s=n._fromNumbers,r=n._toNumbers,o=n._strings,a=o[0];for(let l=0,c=r.length;l<c;l++){let u=i(re(li(s[l],r[l],t),e)),d=o[l+1];a+=`${d?u+d:u}`,n._numbers[l]=u}return a};var mr=(n,t,e,i,s)=>{let r=n.parent,o=n.duration,a=n.completed,l=n.iterationDuration,c=n.iterationCount,u=n._currentIteration,d=n._loopDelay,h=n._reversed,f=n._alternate,_=n._hasChildren,S=n._delay,g=n._currentTime,p=S+l,A=t-S,R=We(g,-S,o),y=We(A,-S,o),T=A-g,M=y>0,w=y>=o,x=o<=ne,E=s===Ve.FORCE,D=0,F=A,z=0;if(c>1){let J=l+(w?0:d),et=~~(y/J);n._currentIteration=We(et,0,c),w&&n._currentIteration--,D=n._currentIteration%2,F=y-et*J||0}let H=h^(f&&D),N=n._ease,B=w?H?0:o:H?l-F:F;N&&(B=l*N(B/l)||0);let q=(r?r.backwards:A<g)?!H:!!H;if(n._currentTime=A,n._iterationTime=B,n.backwards=q,M&&!n.began?(n.began=!0,!e&&!(r&&(q||!r.began))&&n.onBegin(n)):A<=0&&(n.began=!1),!e&&!_&&M&&n._currentIteration!==u&&n.onLoop(n),E||s===Ve.AUTO&&(t>=(r&&S>0?0:S)&&t<=p||t<=S&&R>S||t>=p&&R!==o)||B>=p&&R!==o||B<=S&&R>0&&!w||t<=R&&R===o&&a||w&&!a&&x){if(M&&(n.computeDeltaTime(R),e||n.onBeforeUpdate(n)),!_){let J=E||(q?T*-1:T)>=ue.tickThreshold,et=re(n._offset+(r?r._offset:0)+S+B,12),L=n._head,X,Q,xt,St,ie=0;for(;L;){let Bt=L._composition,Mt=L._currentTime,Y=L._changeDuration,K=L._absoluteStartTime+L._changeDuration,it=L._nextRep,Et=L._prevRep,ot=Bt!==Ae.none,ut=Et?Et._absoluteStartTime+Et._changeDuration:0,zt=Et&&Et.parent!==L.parent,Dt=!it||it._isOverridden?K:it.parent===L.parent?K+it._delay:it._absoluteStartTime<it._absoluteUpdateStartTime?it._absoluteStartTime:it._absoluteUpdateStartTime;if((J||(Mt!==Y||et<=Dt||Et&&!zt&&(!it||it.parent!==L.parent))&&(Mt!==0||et>=L._absoluteStartTime||zt&&!L._hasFromValue&&!Et._isOverridden&&et>=ut||it&&!it._isOverridden&&it.parent===L.parent&&it._currentTime!==0&&B<it._startTime))&&(!Et||zt||B>=L._startTime)&&(!ot||!L._isOverridden&&(!L._isOverlapped||et<=K)&&(!it||it._isOverridden||et<=Dt)&&(!Et||Et._isOverridden||(zt?et>=L._absoluteStartTime||!L._hasFromValue&&et>=ut:et>=ut+L._delay)))){let Ot=L._currentTime=We(B-L._startTime,0,Y),Nt=L._ease(Ot/L._updateDuration),Rt=L._modifier,Yt=L._valueType,ee=L._tweenType,ge=ee===fe.OBJECT,Xt=Yt===Zt.NUMBER,Qt=Xt&&ge||Nt===0||Nt===1?-1:ue.precision,C,$t;if(Xt)C=$t=Rt(re(li(L._fromNumber,L._toNumber,Nt),Qt));else if(Yt===Zt.UNIT)$t=Rt(re(li(L._fromNumber,L._toNumber,Nt),Qt)),C=`${$t}${L._unit}`;else if(Yt===Zt.COLOR){let wt=L._numbers,b=L._fromNumbers,m=L._toNumbers,U=1-Nt,O=b[0],Z=b[1],st=b[2],rt=m[0],$=m[1],j=m[2];wt[0]=Rt(Math.sqrt(O*O*U+rt*rt*Nt)),wt[1]=Rt(Math.sqrt(Z*Z*U+$*$*Nt)),wt[2]=Rt(Math.sqrt(st*st*U+j*j*Nt)),wt[3]=Rt(li(b[3],m[3],Nt)),(!L._setter||i)&&(C=`rgba(${re(wt[0],0)},${re(wt[1],0)},${re(wt[2],0)},${wt[3]})`)}else Yt===Zt.COMPLEX&&(C=Do(L,Nt,Qt));if(ot&&(L._number=$t),!i&&Bt!==Ae.blend){let wt=L.property;X=L.target,L._setter?L._setter(X,$t,L):ge?X[wt]=C:ee===fe.ATTRIBUTE?X.setAttribute(wt,C):(Q=X.style,ee===fe.TRANSFORM?(X!==xt&&(xt=X,St=X[Ti]),St[wt]=C,ie=1):ee===fe.CSS?Q[wt]=C:ee===fe.CSS_VAR&&Q.setProperty(wt,C)),M&&(z=1)}else L._value=C}else Mt&&Et&&!zt&&B<L._startTime&&(L._currentTime=0);ie&&L._renderTransforms&&(Q.transform=Ro(St),ie=0),L=L._next}!e&&z&&n.onRender(n)}!e&&M&&n.onUpdate(n)}return r&&x?!e&&(r.began&&!q&&A>0&&!a||q&&A<=ne&&a)&&(n.onComplete(n),n.completed=!q):M&&w?c===1/0?n._startTime+=n.duration:n._currentIteration>=c-1&&(n.paused=!0,!a&&!_&&(n.completed=!0,!e&&!(r&&(q||!r.began))&&(n.onComplete(n),n._resolve(n)))):n.completed=!1,z},Ai=(n,t,e,i,s)=>{let r=n._currentIteration;if(mr(n,t,e,i,s),n._hasChildren){let o=n,a=o.backwards,l=i?t:o._iterationTime,c=ai(),u=0,d=!0;if(!i&&o._currentIteration!==r){let h=o.iterationDuration;_e(o,f=>{if(!a)!f.completed&&!f.backwards&&f._currentTime<f.iterationDuration&&mr(f,h,e,1,Ve.FORCE),f.began=!1,f.completed=!1;else{let _=f.duration,S=f._offset+f._delay,g=S+_;!e&&_<=ne&&(!S||g===h)&&f.onComplete(f)}}),e||o.onLoop(o)}_e(o,h=>{let f=re((l-h._offset)*h._speed,12);if(a&&f>h._delay+h.duration)return;let _=h._fps<o._fps?h.requestTick(c):s;u+=mr(h,f,e,i,_),!h.completed&&d&&(d=!1)},a),!e&&u&&o.onRender(o),(d||a)&&o._currentTime>=o.duration&&(o.paused=!0,o.completed||(o.completed=!0,e||(o.onComplete(o),o._resolve(o))))}};var Ou={},Ms=(n,t,e)=>{if(e===fe.TRANSFORM){let i=To.get(n);return i||n}else if(e===fe.CSS||e===fe.ATTRIBUTE&&wo(t)&&n in t.style){let i=Ou[n];if(i)return i;{let s=n&&sc(n);return Ou[n]=s,s}}else return n},No=(n,t=!1)=>{if(n._hasChildren)_e(n,e=>No(e,t),!0);else{let e=n;e.pause(),_e(e,i=>{let s=i.property,r=i.target,o=i._tweenType,a=i._inlineValue,l=Jn(a)||a===Tn;if(i._setter){if(!t&&!l){if(Xe(a,Le),Le.d){let c=Le.d,u=i._numbers;for(let d=0,h=c.length;d<h;d++)u[d]=c[d]}else i._number=Le.n;i._setter(i.target,i._number,i)}}else if(o===fe.OBJECT)!t&&!l&&(r[s]=a);else if(r[Yn])if(o===fe.ATTRIBUTE)t||(l?r.removeAttribute(s):r.setAttribute(s,a));else{let c=r.style;if(o===fe.TRANSFORM){let u=r[Ti];l?delete u[s]:u[s]=a,i._renderTransforms&&(Object.keys(u).length?c.transform=Ro(u):c.removeProperty("transform"))}else l?c.removeProperty(sc(s)):c[s]=a}r[Yn]&&e._tail===i&&e.targets.forEach(c=>{c.getAttribute&&c.getAttribute("style")===Tn&&c.removeAttribute("style")})})}return n},Bu=n=>No(n,!0);var bs=class{constructor(t=0){this.deltaTime=0,this._currentTime=t,this._lastTickTime=t,this._startTime=t,this._lastTime=t,this._frameDuration=Zn/ar,this._fps=ar,this._speed=1,this._hasChildren=!1,this._head=null,this._tail=null}get fps(){return this._fps}set fps(t){let e=+t,i=e<ne?ne:e,s=Zn/i;i>ys.frameRate&&(ys.frameRate=i),this._fps=i,this._frameDuration=s}get speed(){return this._speed}set speed(t){let e=+t;this._speed=e<ne?ne:e}requestTick(t){let e=this._frameDuration,i=t-this._lastTickTime,s=e*.25,r=s<4?s:4;return i+r<e?Ve.NONE:(this._lastTickTime=i>=e?t-i%e:t,Ve.AUTO)}computeDeltaTime(t){let e=t-this._lastTime;return this.deltaTime=e,this._lastTime=t,e}};var ci={animation:null,update:Re},zu=n=>{let t=ci.animation;return t||(t={duration:ne,computeDeltaTime:Re,_offset:0,_delay:0,_head:null,_tail:null},ci.animation=t,ci.update=()=>{n.forEach(e=>{for(let i in e){let s=e[i],r=s._head;if(r){let o=r._valueType,a=o===Zt.COMPLEX||o===Zt.COLOR?Ie(r._fromNumbers):null,l=r._fromNumber,c=s._tail;for(;c&&c!==r;){if(a)for(let u=0,d=c._numbers.length;u<d;u++)a[u]+=c._numbers[u];else l+=c._number;c=c._prevAdd}r._toNumber=l,r._toNumbers=a}}}),mr(t,1,1,0,Ve.FORCE)}),t};var Vu=bn?requestAnimationFrame:setImmediate,Dp=bn?cancelAnimationFrame:clearImmediate,dc=class extends bs{constructor(t){super(t),this.useDefaultMainLoop=!0,this.pauseOnDocumentHidden=!0,this.defaults=ys,this.paused=!0,this.reqId=0}update(){let t=this._currentTime=ai();if(this.requestTick(t)){this.computeDeltaTime(t);let e=this._speed,i=this._fps,s=this._head;for(;s;){let r=s._next;s.paused?(gn(this,s),this._hasChildren=!!this._tail,s._running=!1,s.completed&&!s._cancelled&&s.cancel()):Ai(s,(t-s._startTime)*s._speed*e,0,0,s._fps<i?s.requestTick(t):Ve.AUTO),s=r}ci.update()}}wake(){return this.useDefaultMainLoop&&!this.reqId&&(this.requestTick(ai()),this.reqId=Vu(ku)),this}pause(){if(this.reqId)return this.paused=!0,Np()}resume(){if(this.paused)return this.paused=!1,_e(this,t=>t.resetTime()),this.wake()}get speed(){return this._speed*(ue.timeScale===1?1:Zn)}set speed(t){let e=t*ue.timeScale;this._speed!==e&&(this._speed=e,_e(this,i=>i.speed=i._speed))}get timeUnit(){return ue.timeScale===1?"ms":"s"}set timeUnit(t){let i=t==="s",s=i?.001:1;if(ue.timeScale!==s){ue.timeScale=s,ue.tickThreshold=200*s;let r=i?.001:Zn;this.defaults.duration*=r,this._speed*=r}}get precision(){return ue.precision}set precision(t){ue.precision=t}},De=(()=>{let n=new dc(ai());return bn&&(nc.engine=n,bi.addEventListener("visibilitychange",()=>{n.pauseOnDocumentHidden&&(bi.hidden?n.pause():n.resume())})),n})(),ku=()=>{De._head?(De.reqId=Vu(ku),De.update()):De.reqId=0},Np=()=>(Dp(De.reqId),De.reqId=0,De);var Uo={_rep:new WeakMap,_add:new Map},_r=(n,t,e="_rep")=>{let i=Uo[e],s=i.get(n);return s||(s={},i.set(n,s)),s[t]?s[t]:s[t]={_head:null,_tail:null}},Up=(n,t)=>n._isOverridden||n._absoluteStartTime>t._absoluteStartTime,gr=n=>{n._isOverlapped=1,n._isOverridden=1,n._changeDuration=ne,n._currentTime=ne},Fo=(n,t)=>{let e=n._composition;if(e===Ae.replace){let i=n._absoluteStartTime;wn(t,n,Up,"_prevRep","_nextRep");let s=n._prevRep;if(s){let r=s.parent,o=s._absoluteEndTime;if(n.parent.id!==r.id&&r.iterationCount>1&&o+(r.duration-r.iterationDuration)>i){gr(s);let c=s._prevRep;for(;c&&c.parent.id===r.id;)gr(c),c=c._prevRep}let a=n._absoluteUpdateStartTime;if(o>a){let c=s._startTime,u=o-(c+s._updateDuration),d=re(a-u-c,12);s._changeDuration=d,s._currentTime=d,s._isOverlapped=1,d<ne&&gr(s)}let l=n.parent.parent;if(!l||l!==r.parent){let c=!0;if(_e(r,u=>{u._isOverlapped||(c=!1)}),c){let u=r.parent;if(u){let d=!0;_e(u,h=>{h!==r&&_e(h,f=>{f._isOverlapped||(d=!1)})}),d&&u.cancel()}else r.cancel()}}}}else if(e===Ae.blend){let i=_r(n.target,n.property,"_add"),s=zu(Uo._add),r=i._head;r||(r={...n},r._composition=Ae.replace,r._updateDuration=ne,r._startTime=0,r._numbers=Ie(n._fromNumbers),r._number=0,r._next=null,r._prev=null,wn(i,r),wn(s,r));let o=n._toNumber;if(n._fromNumber=r._fromNumber-o,n._toNumber=0,n._numbers=Ie(n._fromNumbers),n._number=0,r._fromNumber=o,n._toNumbers.length){let a=Ie(n._toNumbers);a.forEach((l,c)=>{n._fromNumbers[c]=r._fromNumbers[c]-l,n._toNumbers[c]=0}),r._fromNumbers=a}wn(i,n,null,"_prevAdd","_nextAdd")}return n},fc=n=>{let t=n._composition;if(t!==Ae.none){let e=n.target,i=n.property,o=Uo._rep.get(e)[i];if(gn(o,n,"_prevRep","_nextRep"),t===Ae.blend){let a=Uo._add,l=a.get(e);if(!l)return;let c=l[i],u=ci.animation;gn(c,n,"_prevAdd","_nextAdd");let d=c._head;if(d&&d===c._tail){gn(c,d,"_prevAdd","_nextAdd"),gn(u,d);let h=!0;for(let f in l)if(l[f]._head){h=!1;break}h&&a.delete(e)}}}return n},Gu=(n,t,e)=>{let i=!1;return _e(t,s=>{let r=s.target;if(n.includes(r)){let o=s.property,a=s._tweenType,l=Ms(e,r,a);(!l||l&&l===o)&&(s.parent._tail===s&&s._tweenType===fe.TRANSFORM&&s._prev&&s._prev._tweenType===fe.TRANSFORM&&(s._prev._renderTransforms=1),gn(t,s),fc(s),i=!0)}},!0),i},pc=(n,t,e)=>{let i=t||De,s;if(i._hasChildren){let r=0;_e(i,o=>{if(!o._hasChildren)if(s=Gu(n,o,e),s&&!o._head)o.cancel(),gn(i,o);else{let l=o._offset+o._delay+o.duration;l>r&&(r=l)}o._head?pc(n,o,e):o._hasChildren=!1},!0),Vt(i.iterationDuration)||(i.iterationDuration=r)}else s=Gu(n,i,e);s&&!i._head&&(i._hasChildren=!1,i.cancel&&i.cancel())};var Hu=n=>(n.paused=!0,n.began=!1,n.completed=!1,n),mc=n=>(n._cancelled&&(n._hasChildren?_e(n,mc):_e(n,t=>{t._composition!==Ae.none&&Fo(t,_r(t.target,t.property))}),n._cancelled=0),n),Wu=0,Fp=(n,t)=>n._priority>t._priority,Ei=class extends bs{constructor(t={},e=null,i=0){super(0),++Wu;let{id:s,delay:r,duration:o,reversed:a,alternate:l,loop:c,loopDelay:u,autoplay:d,frameRate:h,playbackRate:f,priority:_,onComplete:S,onLoop:g,onPause:p,onBegin:A,onBeforeUpdate:R,onUpdate:y}=t;cr.current&&cr.current.register(this);let T=e?0:De._lastTickTime,M=e?e.defaults:ue.defaults,w=nn(r)||Vt(r)?M.delay:+r,x=nn(o)||Vt(o)?1/0:+o,E=we(c,M.loop),D=we(u,M.loopDelay),F=E===!0||E===1/0||E<0?1/0:E+1,z=0;e?z=i:(De.reqId||De.requestTick(ai()),z=(De._lastTickTime-De._startTime)*ue.timeScale),this.id=Vt(s)?Wu:s,this.parent=e,this.duration=fr((x+D)*F-D)||ne,this.backwards=!1,this.paused=!0,this.began=!1,this.completed=!1,this.onBegin=A||M.onBegin,this.onBeforeUpdate=R||M.onBeforeUpdate,this.onUpdate=y||M.onUpdate,this.onLoop=g||M.onLoop,this.onPause=p||M.onPause,this.onComplete=S||M.onComplete,this.iterationDuration=x,this.iterationCount=F,this._autoplay=e?!1:we(d,M.autoplay),this._offset=z,this._delay=w,this._loopDelay=D,this._iterationTime=0,this._currentIteration=0,this._resolve=Re,this._running=!1,this._reversed=+we(a,M.reversed),this._reverse=this._reversed,this._cancelled=0,this._alternate=we(l,M.alternate),this._prev=null,this._next=null,this._lastTickTime=T,this._startTime=T,this._lastTime=T,this._fps=we(h,M.frameRate),this._speed=we(f,M.playbackRate),this._priority=+we(_,1)}get cancelled(){return!!this._cancelled}set cancelled(t){t?this.cancel():this.reset(!0).play()}get currentTime(){return We(re(this._currentTime,ue.precision),-this._delay,this.duration)}set currentTime(t){let e=this.paused;this.pause().seek(+t),e||this.resume()}get iterationCurrentTime(){return We(re(this._iterationTime,ue.precision),0,this.iterationDuration)}set iterationCurrentTime(t){this.currentTime=this.iterationDuration*this._currentIteration+t}get progress(){return We(re(this._currentTime/this.duration,10),0,1)}set progress(t){this.currentTime=this.duration*t}get iterationProgress(){return We(re(this._iterationTime/this.iterationDuration,10),0,1)}set iterationProgress(t){let e=this.iterationDuration;this.currentTime=e*this._currentIteration+e*t}get currentIteration(){return this._currentIteration}set currentIteration(t){this.currentTime=this.iterationDuration*We(+t,0,this.iterationCount-1)}get reversed(){return!!this._reversed}set reversed(t){t?this.reverse():this.play()}get speed(){return super.speed}set speed(t){super.speed=t,this.resetTime()}reset(t=!1){return mc(this),this._reversed&&!this._reverse&&(this.reversed=!1),this._iterationTime=this.iterationDuration,Ai(this,0,1,~~t,Ve.FORCE),Hu(this),this._hasChildren&&_e(this,Hu),this}init(t=!1){this.fps=this._fps,this.speed=this._speed,!t&&this._hasChildren&&Ai(this,this.duration,1,~~t,Ve.FORCE),this.reset(t);let e=this._autoplay;return e===!0?this.resume():e&&!Vt(e.linked)&&e.link(this),this}resetTime(){let t=1/(this._speed*De._speed);return this._startTime=ai()-(this._currentTime+this._delay)*t,this}pause(){return this.paused?this:(this.paused=!0,this.onPause(this),this)}resume(){return this.paused?(this.paused=!1,this.duration<=ne&&!this._hasChildren?Ai(this,ne,0,0,Ve.FORCE):(this._running||(wn(De,this,Fp),De._hasChildren=!0,this._running=!0),this.resetTime(),this._startTime-=12,De.wake()),this):this}restart(){return this.reset().resume()}seek(t,e=0,i=0){mc(this),this.completed=!1;let s=this.paused;return this.paused=!0,Ai(this,t+this._delay,~~e,~~i,Ve.AUTO),s?this:this.resume()}alternate(){let t=this._reversed,e=this.iterationCount,i=this.iterationDuration,s=e===1/0?Qi(or/i):e;return this._reversed=+(this._alternate&&!(s%2)?t:!t),e===1/0?this.iterationProgress=this._reversed?1-this.iterationProgress:this.iterationProgress:this.seek(i*s-this._currentTime),this.resetTime(),this}play(){return this._reversed&&this.alternate(),this.resume()}reverse(){return this._reversed||this.alternate(),this.resume()}cancel(){return this._hasChildren?_e(this,t=>t.cancel(),!0):_e(this,fc),this._cancelled=1,this.pause()}stretch(t){let e=this.duration,i=ji(t);if(e===i)return this;let s=t/e,r=t<=ne;return this.duration=r?ne:i,this.iterationDuration=r?ne:ji(this.iterationDuration*s),this._offset*=s,this._delay*=s,this._loopDelay*=s,this}revert(){Ai(this,0,1,0,Ve.AUTO);let t=this._autoplay;return t&&t.linked&&t.linked===this&&t.revert(),this.cancel()}complete(t=0){return this.seek(this.duration,t).cancel()}then(t=Re){let e=this.then,i=()=>{this.then=null,t(this),this.then=e,this._resolve=Re};return new Promise(s=>(this._resolve=()=>s(i()),this.completed&&this._resolve(),this))}},gc=n=>new Ei(n,null,0).init();function Xu(n){let t=En(n)?cr.root.querySelectorAll(n):n;if(t instanceof NodeList||t instanceof HTMLCollection)return t}function _c(n){if(Jn(n))return[];if(!bn)return mn(n)&&n.flat(1/0)||[n];if(mn(n)){let e=n.flat(1/0),i=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];if(!Jn(o)){let a=Xu(o);if(a)for(let l=0,c=a.length;l<c;l++){let u=a[l];if(!Jn(u)){let d=!1;for(let h=0,f=i.length;h<f;h++)if(i[h]===u){d=!0;break}d||i.push(u)}}else{let l=!1;for(let c=0,u=i.length;c<u;c++)if(i[c]===o){l=!0;break}l||i.push(o)}}}return i}let t=Xu(n);return t?Array.from(t):[n]}function wi(n){let t=_c(n),e=t.length;for(let i=0;i<e;i++){let s=t[i];if(!s[tc]){s[tc]=!0;let r=wo(s);(s.nodeType||r)&&(s[Yn]=!0,s[bo]=r,s[Ti]={})}}return t}var xc={deg:1,rad:180/dr,turn:360},qu={},xr=(n,t,e,i=!1)=>{let s=t.u,r=t.n;if(t.t===Zt.UNIT&&s===e)return t;let o=r+s+e,a=qu[o];if(!Vt(a)&&!i)t.n=a;else{let l;if(s in xc)l=r*xc[s]/xc[e];else{let u=n.cloneNode(),d=n.parentNode,h=d&&d!==bi?d:bi.body;h.appendChild(u);let f=u.style;f.width=100+s;let _=u.offsetWidth||100;f.width=100+e;let S=u.offsetWidth||100,g=_/S;h.removeChild(u),l=g*r}t.n=l,qu[o]=l}return t.t,Zt.UNIT,t.u=e,t};var hi=n=>n;var vr=(n=1.68)=>t=>Ki(t,+n),yc={in:n=>t=>n(t),out:n=>t=>1-n(1-t),inOut:n=>t=>t<.5?n(t*2)/2:1-n(t*-2+2)/2,outIn:n=>t=>t<.5?(1-n(1-t*2))/2:(n(t*2-1)+1)/2},Op=dr/2,Yu=dr*2,Zu={[Tn]:vr,Quad:vr(2),Cubic:vr(3),Quart:vr(4),Quint:vr(5),Sine:n=>1-Cu(n*Op),Circ:n=>1-ur(1-n*n),Expo:n=>n?Ki(2,10*n-10):0,Bounce:n=>{let t,e=4;for(;n<((t=Ki(2,--e))-1)/11;);return 1/Ki(4,3-e)-7.5625*Ki((t*3-2)/22-n,2)},Back:(n=1.7)=>t=>(+n+1)*t*t*t-+n*t*t,Elastic:(n=1,t=.3)=>{let e=We(+n,1,10),i=We(+t,ne,2),s=i/Yu*Ru(1/e),r=Yu/i;return o=>o===0||o===1?o:-e*Ki(2,-10*(1-o))*wu((1-o-s)*r)}},vc=(()=>{let n={linear:hi,none:hi};for(let t in yc)for(let e in Zu){let i=Zu[e],s=yc[t];n[t+e]=e===Tn||e==="Back"||e==="Elastic"?(r,o)=>s(i(r,o)):s(i)}return n})(),Oo={linear:hi,none:hi},Bp=n=>{if(Oo[n])return Oo[n];if(n.indexOf("(")<=-1){let e=yc[n]||n.includes("Back")||n.includes("Elastic")?vc[n]():vc[n];return e?Oo[n]=e:hi}else{let t=n.slice(0,-1).split("("),e=vc[t[0]];return e?Oo[n]=e(...t[1].split(",")):hi}},Ju=["steps(","irregular(","linear(","cubicBezier("],yr=n=>{if(En(n)){for(let e=0,i=Ju.length;e<i;e++)if(pn(n,Ju[e]))return console.warn(`String syntax for \`ease: "${n}"\` has been removed from the core and replaced by importing and passing the easing function directly: \`ease: ${n}\``),hi}return nn(n)?n:En(n)?Bp(n):hi};var Ht=Lo(),Kt=Lo(),Ts={},Bo={func:null},zo={func:null},Vo=[null],As=[null,null],ko={to:null},zp=0,$u=0,Ci,Qn,Vp=(n,t)=>{let e={};if(mn(n)){let i=[].concat(...n.map(s=>Object.keys(s))).filter(hr);for(let s=0,r=i.length;s<r;s++){let o=i[s],a=n.map(l=>{let c={};for(let u in l){let d=l[u];hr(u)?u===o&&(c.to=d):c[u]=d}return c});e[o]=a}}else{let i=we(t.duration,ue.defaults.duration);Object.keys(n).map(r=>({o:parseFloat(r)/100,p:n[r]})).sort((r,o)=>r.o-o.o).forEach(r=>{let o=r.o,a=r.p;for(let l in a)if(hr(l)){let c=e[l];c||(c=e[l]=[]);let u=o*i,d=c.length,h=c[d-1],f={to:a[l]},_=0;for(let S=0;S<d;S++)_+=c[S].duration;d===1&&(f.from=h.to),a.ease&&(f.ease=a.ease),f.duration=u-(d?_:0),c.push(f)}return r});for(let r in e){let o=e[r],a;for(let l=0,c=o.length;l<c;l++){let u=o[l],d=u.ease;u.ease=a||void 0,a=d}o[0].duration||o.shift()}}return e},Es=class extends Ei{constructor(t,e,i,s,r=!1,o=0,a){super(e,i,s),this._head,this._tail,++$u;let l=wi(t),c=l.length,u=e.keyframes,d=u?Pu(Vp(u,e),e):e,{id:h,delay:f,duration:_,ease:S,playbackEase:g,modifier:p,composition:A,onRender:R}=d,y=i?i.defaults:ue.defaults,T=we(S,y.ease),M=we(g,y.playbackEase),w=M?yr(M):null,x=!Vt(T.ease),E=x?T.ease:we(S,w?"linear":y.ease),D=x?T.settlingDuration:we(_,y.duration),F=we(f,y.delay),z=p||y.modifier,H=Vt(A)&&c>=Zn?Ae.none:Vt(A)?y.composition:A,N=this._offset+(i?i._offset:0);x&&(T.parent=this);let B=NaN,q=NaN,J=0,et=0;for(let L=0;L<c;L++){let X=l[L],Q=o||L,xt=a||l,St=NaN,ie=NaN;for(let Bt in d)if(hr(Bt)){let Mt=pr(X,Bt),Y=Po(X,Bt),K=Ms(Bt,X,Mt),it=d[Bt],Et=mn(it);if(r&&!Et&&(As[0]=it,As[1]=it,it=As),Et){let Nt=it.length,Rt=!Eo(it[0]);Nt===2&&Rt?(ko.to=it,Vo[0]=ko,Ci=Vo):Nt>2&&Rt?(Ci=[],it.forEach((Yt,ee)=>{ee?ee===1?(As[1]=Yt,Ci.push(As)):Ci.push(Yt):As[0]=Yt})):Ci=it}else Vo[0]=it,Ci=Vo;let ot=null,ut=null,zt=NaN,Dt=0,Ot=0;for(let Nt=Ci.length;Ot<Nt;Ot++){let Rt=Ci[Ot];Eo(Rt)?Qn=Rt:(ko.to=Rt,Qn=ko),Bo.func=null,zo.func=null;let Yt=$n(we(Qn.composition,H),X,Q,xt,null,null),ee=An(Yt)?Yt:Ae[Yt];!ot&&ee!==Ae.none&&(ot=_r(X,K));let ge=ot?ot._tail:null,Xt=i&&ge&&ge.parent.parent===i?ge:ut,Qt=$n(Qn.to,X,Q,xt,Bo,Xt),C;Eo(Qt)&&!Vt(Qt.to)?(Qn=Qt,C=Qt.to):C=Qt;let $t=$n(Qn.from,X,Q,xt,zo,Xt),wt=Qn.ease||E,b=$n(wt,X,Q,xt,null,Xt),m=nn(b)||En(b)?b:wt,U=!Vt(m)&&!Vt(m.ease),O=U?m.ease:m,Z=U?m.settlingDuration:$n(we(Qn.duration,Nt>1?$n(D,X,Q,xt,null,Xt)/Nt:D),X,Q,xt,null,Xt),st=$n(we(Qn.delay,Ot?0:F),X,Q,xt,null,Xt),rt=Qn.modifier||z,$=!Vt($t),j=!Vt(C),at=mn(C),Pt=at||$&&j,dt=ut?Dt:0,ct=ut?Dt+st:st,Ct=re(N+ct,12),Ft=re(N+dt,12);!et&&($||at)&&(et=1);let Ut=ut;if(ee!==Ae.none){let It=ot._head;for(;It&&It._absoluteStartTime<=Ct;)if(It._isOverridden||(Ut=It),It=It._nextRep,It&&It._absoluteStartTime>=Ct)for(;It;)gr(It),It=It._nextRep}if(Pt){Xe(at?$n(C[0],X,Q,xt,zo,Xt):$t,Ht),Xe(at?$n(C[1],X,Q,xt,Bo,Xt):C,Kt);let It=Kn(X,K,Mt,Ts);Ht.t===Zt.NUMBER&&(Ut?Ut._valueType===Zt.UNIT&&(Ht.t=Zt.UNIT,Ht.u=Ut._unit):(Xe(It,Le),Le.t===Zt.UNIT&&(Ht.t=Zt.UNIT,Ht.u=Le.u)))}else j?Xe(C,Kt):ut?uc(ut,Kt):Xe(i&&Ut&&Ut.parent.parent===i?Ut._value:Kn(X,K,Mt,Ts),Kt),$?Xe($t,Ht):ut?uc(ut,Ht):Xe(i&&Ut&&Ut.parent.parent===i?Ut._value:Kn(X,K,Mt,Ts),Ht);if(Ht.o&&(Ht.n=Ss(Ut?Ut._toNumber:Xe(Kn(X,K,Mt,Ts),Le).n,Ht.n,Ht.o)),Kt.o&&(Kt.n=Ss(Ht.n,Kt.n,Kt.o)),Ht.t!==Kt.t){if(Ht.t===Zt.COMPLEX||Kt.t===Zt.COMPLEX){let It=Ht.t===Zt.COMPLEX?Ht:Kt,Wt=Ht.t===Zt.COMPLEX?Kt:Ht;Wt.t=Zt.COMPLEX,Wt.s=Ie(It.s),Wt.d=It.d.map(()=>Wt.n)}else if(Ht.t===Zt.UNIT||Kt.t===Zt.UNIT){let It=Ht.t===Zt.UNIT?Ht:Kt,Wt=Ht.t===Zt.UNIT?Kt:Ht;Wt.t=Zt.UNIT,Wt.u=It.u}else if(Ht.t===Zt.COLOR||Kt.t===Zt.COLOR){let It=Ht.t===Zt.COLOR?Ht:Kt,Wt=Ht.t===Zt.COLOR?Kt:Ht;Wt.t=Zt.COLOR,Wt.d=It.d.map(()=>0)}}if(Ht.u!==Kt.u){let It=Kt.u?Ht:Kt;It=xr(X,It,Kt.u?Kt.u:Ht.u,!1)}if(Kt.d&&Ht.d&&Kt.d.length!==Ht.d.length){let It=Ht.d.length>Kt.d.length?Ht:Kt,Wt=It===Ht?Kt:Ht;Wt.d=It.d.map((Sn,fn)=>Vt(Wt.d[fn])?0:Wt.d[fn]),Wt.s=Ie(It.s)}let P=re(+Z||ne,12),ht=Ts[K];Jn(ht)||(Ts[K]=null);let tt=Y?Y.set:null;Dt=re(ct+P,12);let lt=Ht.d,pt=Kt.d,nt=Kt.s,_t={parent:this,id:zp++,property:K,target:X,_value:null,_toFunc:Bo.func,_fromFunc:zo.func,_ease:yr(O),_fromNumbers:lt?Ie(lt):lr,_toNumbers:pt?Ie(pt):lr,_strings:nt?Ie(nt):lr,_fromNumber:Ht.n,_toNumber:Kt.n,_numbers:lt?Ie(lt):lr,_number:Ht.n,_unit:Kt.u,_modifier:rt,_currentTime:0,_startTime:ct,_delay:+st,_updateDuration:P,_changeDuration:P,_absoluteStartTime:Ct,_absoluteUpdateStartTime:Ft,_absoluteEndTime:re(N+Dt,12),_hasFromValue:$||at?1:0,_tweenType:Mt,_setter:tt,_valueType:Kt.t,_composition:ee,_isOverlapped:0,_isOverridden:0,_renderTransforms:0,_inlineValue:ht,_prevRep:null,_nextRep:null,_prevAdd:null,_nextAdd:null,_prev:null,_next:null};ee!==Ae.none&&Fo(_t,ot);let bt=_t._valueType;if(bt===Zt.COMPLEX)_t._value=Do(_t,1,-1);else if(bt===Zt.UNIT)_t._value=`${rt(_t._toNumber)}${_t._unit}`;else if(bt===Zt.COLOR){let It=Kt.d;_t._value=`rgba(${re(It[0],0)},${re(It[1],0)},${re(It[2],0)},${It[3]})`}else _t._value=rt(_t._toNumber);isNaN(zt)&&(zt=_t._startTime),ut=_t,J++,wn(this,_t)}(isNaN(q)||zt<q)&&(q=zt),(isNaN(B)||Dt>B)&&(B=Dt),Mt===fe.TRANSFORM&&(St=J-Ot,ie=J)}if(!isNaN(St)){let Bt=0;_e(this,Mt=>{Bt>=St&&Bt<ie&&(Mt._renderTransforms=1,Mt._composition===Ae.blend&&_e(ci.animation,Y=>{Y.id===Mt.id&&(Y._renderTransforms=1)})),Bt++})}}c||console.warn("No target found. Make sure the element you're trying to animate is accessible before creating your animation."),q?(_e(this,L=>{L._startTime-L._delay||(L._delay-=q),L._startTime-=q}),B-=q):q=0,B||(B=ne,this.iterationCount=0),this.targets=l,this.id=Vt(h)?$u:h,this.duration=B===ne?ne:fr((B+this._loopDelay)*this.iterationCount-this._loopDelay)||ne,this.onRender=R||y.onRender,this._ease=w,this._delay=q,this.iterationDuration=B,!this._autoplay&&et&&this.onRender(this)}stretch(t){let e=this.duration;if(e===ji(t))return this;let i=t/e;return _e(this,s=>{s._updateDuration=ji(s._updateDuration*i),s._changeDuration=ji(s._changeDuration*i),s._currentTime*=i,s._delay*=i,s._startTime*=i,s._absoluteStartTime*=i,s._absoluteUpdateStartTime*=i,s._absoluteEndTime*=i}),super.stretch(t)}refresh(){return _e(this,t=>{let e=t._toFunc,i=t._fromFunc;(e||i)&&(i?(Xe(i(),Ht),Ht.u!==t._unit&&t.target[Yn]&&xr(t.target,Ht,t._unit,!0),t._fromNumbers=Ie(Ht.d),t._fromNumber=Ht.n):e&&(Xe(Kn(t.target,t.property,t._tweenType),Le),t._fromNumbers=Ie(Le.d),t._fromNumber=Le.n),e&&(Xe(e(),Kt),t._toNumbers=Ie(Kt.d),t._strings=Ie(Kt.s),t._toNumber=Kt.o?Ss(t._fromNumber,Kt.n,Kt.o):Kt.n))}),this.duration===ne&&this.restart(),this}revert(){return super.revert(),No(this)}then(t){return super.then(t)}},Go=(n,t)=>ue.editor?ue.editor.addAnimation(n,t):new Es(n,t,null,0,!1).init();var kp=(n,t)=>{if(pn(t,"<")){let e=t[1]==="<",i=n._tail,s=i?i._offset+i._delay:0;return e?s:s+i.duration}},Ku=(n,t)=>{let e=n.iterationDuration;if(e===ne&&(e=0),Vt(t))return e;if(An(+t))return+t;let i=t,s=n?n.labels:null,r=!Jn(s),o=kp(n,i),a=!Vt(o),l=bu.exec(i);if(l){let c=l[0],u=i.split(c),d=r&&u[0]?s[u[0]]:e,h=a?o:r?d:e,f=+u[1];return Ss(h,f,c[0])}else return a?o:r?Vt(s[i])?e:s[i]:e};var Sc={};uu(Sc,{clamp:()=>We,damp:()=>Yp,degToRad:()=>qe,lerp:()=>li,mapRange:()=>qp,padEnd:()=>Wp,padStart:()=>Hp,radToDeg:()=>Cn,round:()=>re,roundPad:()=>Gp,snap:()=>Iu,wrap:()=>Xp});var Gp=(n,t)=>(+n).toFixed(t),Hp=(n,t,e)=>`${n}`.padStart(t,e),Wp=(n,t,e)=>`${n}`.padEnd(t,e),Xp=(n,t,e)=>((n-t)%(e-t)+(e-t))%(e-t)+t,qp=(n,t,e,i,s)=>i+(n-t)/(e-t)*(s-i),qe=n=>n*Math.PI/180,Cn=n=>n*180/Math.PI,Yp=(n,t,e,i)=>i?i===1?t:li(n,t,1-Math.exp(-i*e*.1)):n;var Qu={_head:null,_tail:null},ju=(n,t,e)=>{let i=Qu._head,s;for(;i;){let r=i._next,o=i.$el===n,a=!t||i.property===t,l=!e||i.parent===e;if(o&&a&&l){s=i.animation;try{s.commitStyles()}catch{}s.cancel(),gn(Qu,i);let c=i.parent;c&&(c._completed++,c.animations.length===c._completed&&(c.completed=!0,c.paused=!0,c.muteCallbacks||(c.onComplete(c),c._resolve(c))))}i=r}return s};function td(n,t,e){let i=wi(n);if(!i.length)return;let[s]=i,r=pr(s,t),o=Ms(t,s,r),a=Kn(s,o);if(Vt(e))return a;if(Xe(a,Le),Le.t===Zt.NUMBER||Le.t===Zt.UNIT){if(e===!1)return Le.n;{let l=xr(s,Le,e,!1);return`${re(l.n,ue.precision)}${l.u}`}}}var ed=(n,t)=>{if(!Vt(t))return ue.editor&&ue.editor.addSet?ue.editor.addSet(n,t):(t.duration=ne,t.composition=we(t.composition,Ae.none),new Es(n,t,null,0,!0).resume())},nd=(n,t,e)=>{let i=_c(n);for(let s=0,r=i.length;s<r;s++)ju(i[s],e,t&&t.controlAnimation&&t);return pc(i,t,e),i};var id=(n=Re)=>new Ei({duration:1*ue.timeScale,onComplete:n},null,0).resume(),sd=n=>{let t;return((...e)=>{let i,s,r,o,a;t&&(i=t.currentIteration,s=t.iterationProgress,r=t.reversed,o=t._alternate,a=t._startTime,t.revert());let l=n(...e);return l&&!nn(l)&&l.revert&&(t=l),Vt(s)||(t.currentIteration=i,t.iterationProgress=(o&&i%2?!r:r)?1-s:s,t._startTime=a),l||Re})};var qo={};uu(qo,{$:()=>wi,addChild:()=>wn,clamp:()=>pd,cleanInlineStyles:()=>Bu,createSeededRandom:()=>Wo,damp:()=>_d,degToRad:()=>ud,forEachChildren:()=>_e,get:()=>td,keepTime:()=>sd,lerp:()=>gd,mapRange:()=>hd,padEnd:()=>ld,padStart:()=>ad,radToDeg:()=>dd,random:()=>ws,randomPick:()=>xd,remove:()=>nd,removeChild:()=>gn,round:()=>md,roundPad:()=>od,set:()=>ed,shuffle:()=>Xo,snap:()=>fd,stagger:()=>vd,sync:()=>id,wrap:()=>cd});var Rn=Sc,Ho={},Zp=(n,t=0)=>(...e)=>t?i=>n(...e,i):i=>n(i,...e),rd=n=>(...t)=>{let e=n(...t);return new Proxy(Re,{apply:(i,s,[r])=>e(r),get:(i,s)=>{if(Ho[s])return rd((...r)=>{let o=Ho[s](...r);return a=>o(e(a))})}})},In=(n,t,e=0)=>{let i=(...s)=>(s.length<t.length?rd(Zp(t,e)):t)(...s);return Ho[n]||(Ho[n]=i),i},od=In("roundPad",Rn.roundPad),ad=In("padStart",Rn.padStart),ld=In("padEnd",Rn.padEnd),cd=In("wrap",Rn.wrap),hd=In("mapRange",Rn.mapRange),ud=In("degToRad",Rn.degToRad),dd=In("radToDeg",Rn.radToDeg),fd=In("snap",Rn.snap),pd=In("clamp",Rn.clamp),md=In("round",Rn.round),gd=In("lerp",Rn.lerp,1),_d=In("damp",Rn.damp,1);var ws=(n=0,t=1,e=0)=>{let i=10**e;return Math.floor((Math.random()*(t-n+1/i)+n)*i)/i},Jp=0,Wo=(n,t=0,e=1,i=0)=>{let s=n===void 0?Jp++:n;return(r=t,o=e,a=i)=>{s+=1831565813,s=Math.imul(s^s>>>15,s|1),s^=s+Math.imul(s^s>>>7,s|61);let l=10**a;return Math.floor((((s^s>>>14)>>>0)/4294967296*(o-r+1/l)+r)*l)/l}},xd=n=>n[ws(0,n.length-1)],Xo=(n,t=ws)=>{let e=n.length,i,s;for(;e;)s=t(0,--e),i=n[e],n[e]=n[s],n[s]=i;return n};var vd=(n,t={})=>{let e=[],i=0,s,r=null,o=t.from,a=t.reversed,l=t.ease,c=!Vt(l),d=c&&!Vt(l.ease)?l.ease:c?yr(l):null,h=t.grid,f=h===!0,_=t.axis,S=t.total,g=Vt(o)||o===0||o==="first",p=o==="center",A=o==="last",R=o==="random",y=mn(o),T=mn(n),M=t.use,w=T?Co(n[0]):Co(n),x=T?Co(n[1]):0,E=Ao.exec((T?n[1]:n)+Tn),D=t.start||0+(T?w:0),F=t.seed,H=!Vt(F)&&F!==!1?Wo(F===!0?0:F):ws,N=t.jitter,B=!Vt(N),q=mn(N),J=q?N[0]:N||0,et=q?N[1]:N||0,L=g?0:An(o)?o:0;return(X,Q,xt,St,ie)=>{let[Bt]=wi(X),Mt=Vt(S)?xt.length:S,Y=Vt(M)?!1:nn(M)?M(Bt,Q,Mt):Kn(Bt,M),K=An(Y)||En(Y)&&An(+Y)?+Y:Q,it=K>=0&&K<Mt?K:Q;if(p&&(L=(Mt-1)/2),A&&(L=Mt-1),!e.length){if(f){let ut=!0,zt=!1,Dt=1/0,Ot=1/0,Nt=1/0,Rt=-1/0,Yt=-1/0,ee=-1/0,ge=[],Xt=[],Qt=[];for(let C=0;C<Mt;C++){let $t=xt[C],wt=0,b=0,m=0,U=!1;if($t&&nn($t.getBoundingClientRect)){let O=$t.getBoundingClientRect();wt=O.left+O.width/2,b=O.top+O.height/2,U=!0}else{let O=$t;O&&An(O.x)&&An(O.y)&&(wt=O.x,b=O.y,An(O.z)&&(m=O.z,zt=!0),U=!0)}if(!U){ut=!1;break}ge.push(wt),Xt.push(b),Qt.push(m),wt<Dt&&(Dt=wt),b<Ot&&(Ot=b),m<Nt&&(Nt=m),wt>Rt&&(Rt=wt),b>Yt&&(Yt=b),m>ee&&(ee=m)}if(ut){let C=ge[0],$t=Xt[0],wt=Qt[0];y?(C=Dt+o[0]*(Rt-Dt),$t=Ot+o[1]*(Yt-Ot),wt=zt?Nt+(o.length>=3?o[2]:.5)*(ee-Nt):0):p?(C=(Dt+Rt)/2,$t=(Ot+Yt)/2,wt=(Nt+ee)/2):A?(C=ge[Mt-1],$t=Xt[Mt-1],wt=Qt[Mt-1]):An(o)&&(C=ge[o],$t=Xt[o],wt=Qt[o]);for(let m=0;m<Mt;m++){let U=C-ge[m],O=$t-Xt[m],Z=wt-Qt[m],st=ur(U*U+O*O+(zt?Z*Z:0));_==="x"&&(st=-U),_==="y"&&(st=-O),_==="z"&&(st=-Z),e.push(st)}let b=1/0;for(let m=0;m<Mt;m++){let U=$i(e[m]);U>0&&U<b&&(b=U)}if(b>0&&b<1/0)for(let m=0;m<Mt;m++)e[m]=e[m]/b}else for(let C=0;C<Mt;C++)e.push($i(L-C))}else for(let ut=0;ut<Mt;ut++)if(!h)e.push($i(L-ut));else{let zt=h.length,Dt=h[0]*h[1],Ot,Nt,Rt;y?(Ot=o[0]*(h[0]-1),Nt=o[1]*(h[1]-1),Rt=zt===3?(o.length>=3?o[2]:.5)*(h[2]-1):0):p?(Ot=(h[0]-1)/2,Nt=(h[1]-1)/2,Rt=zt===3?(h[2]-1)/2:0):(Ot=L%h[0],Nt=Qi(L/h[0])%h[1],Rt=zt===3?Qi(L/Dt):0);let Yt=ut%h[0],ee=Qi(ut/h[0])%h[1],ge=zt===3?Qi(ut/Dt):0,Xt=Ot-Yt,Qt=Nt-ee,C=Rt-ge,$t=ur(Xt*Xt+Qt*Qt+(zt===3?C*C:0));_==="x"&&($t=-Xt),_==="y"&&($t=-Qt),_==="z"&&($t=-C),e.push($t)}i=e[0];for(let ut=1;ut<Mt;ut++)e[ut]>i&&(i=e[ut]);if(d||a)for(let ut=0;ut<Mt;ut++){let zt=e[ut];d&&(zt=d(zt/i)*i),a&&(zt=_?-zt:$i(i-zt)),e[ut]=zt}if(B){r=new Array(Mt);for(let ut=0;ut<Mt;ut++)r[ut]=H(-1,1,4)}R&&(e=Xo(e,H))}let Et=T?(x-w)/i:w;Vt(s)&&(s=ie?Ku(ie,Vt(t.start)?ie.iterationDuration:D):D);let ot=s+(Et*re(e[it],2)||0);if(B){let ut=i?e[it]/i:0,zt=J+(et-J)*ut;ot=ot+r[it]*zt}return t.modifier&&(ot=t.modifier(ot)),E&&(ot=`${ot}${E[2]}`),ot}};var $p=n=>!!(n&&!n.nodeType&&(n.isObject3D||n.isMaterial||n.isTexture||n.isFog||n.isFogExp2||n.isUniformNode||n.isColor||n.isVector2||n.isVector3||n.isVector4||n.isAnimejsInstanceProxy)),Pn=Du($p);var Xd=0,eh=1,qd=2;var Kr=1,Yd=2,Zs=3,Hi=0,tn=1,ii=2,si=0,Js=1,nh=2,ih=3,sh=4,Zd=5;var ls=100,Jd=101,$d=102,Kd=103,Qd=104,jd=200,tf=201,ef=202,nf=203,rh=204,oh=205,sf=206,rf=207,of=208,af=209,lf=210,cf=211,hf=212,uf=213,df=214,_a=0,xa=1,va=2,Hs=3,ya=4,Sa=5,Ma=6,ba=7,Ka=0,ff=1,pf=2,Wn=0,ah=1,lh=2,ch=3,hh=4,uh=5,dh=6,fh=7;var ph=300,Wi=301,cs=302,Qa=303,ja=304,Qr=306,Ta=1e3,ti=1001,Aa=1002,Be=1003,mf=1004;var jr=1005;var ke=1006,tl=1007;var Xi=1008;var dn=1009,mh=1010,gh=1011,$s=1012,el=1013,Bn=1014,ln=1015,Xn=1016,nl=1017,il=1018,Ks=1020,_h=35902,xh=35899,vh=1021,yh=1022,cn=1023,ei=1026,qi=1027,sl=1028,to=1029,Yi=1030,rl=1031;var ol=1033,eo=33776,no=33777,io=33778,so=33779,al=35840,ll=35841,cl=35842,hl=35843,ul=36196,dl=37492,fl=37496,pl=37488,ml=37489,ro=37490,gl=37491,_l=37808,xl=37809,vl=37810,yl=37811,Sl=37812,Ml=37813,bl=37814,Tl=37815,Al=37816,El=37817,wl=37818,Cl=37819,Rl=37820,Il=37821,Pl=36492,Ll=36494,Dl=36495,Nl=36283,Ul=36284,oo=36285,Fl=36286;var Rr=2300,Ea=2301,ma=2302,Yc=2303,Zc=2400,Jc=2401,$c=2402;var gf=3200;var Ol=0,_f=1,xi="",Te="srgb",Ir="srgb-linear",Pr="linear",pe="srgb";var ga=7680;var xf=519,vf=512,yf=513,Sf=514,Bl=515,Mf=516,bf=517,zl=518,Tf=519,Af=35044;var Sh="300 es",Dn=2e3,Ws=2001;function Kp(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Qp(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Lr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ef(){let n=Lr("canvas");return n.style.display="block",n}var yd={},Xs=null;function Mh(...n){let t="THREE."+n.shift();Xs?Xs("log",t,...n):console.log(t,...n)}function wf(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function kt(...n){n=wf(n);let t="THREE."+n.shift();if(Xs)Xs("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Gt(...n){n=wf(n);let t="THREE."+n.shift();if(Xs)Xs("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function as(...n){let t=n.join(" ");t in yd||(yd[t]=!0,kt(...n))}function Cf(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var Rf={[_a]:xa,[va]:Ma,[ya]:ba,[Hs]:Sa,[xa]:_a,[Ma]:va,[ba]:ya,[Sa]:Hs},ni=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ye=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Mc=Math.PI/180,wa=180/Math.PI;function ao(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ye[n&255]+Ye[n>>8&255]+Ye[n>>16&255]+Ye[n>>24&255]+"-"+Ye[t&255]+Ye[t>>8&255]+"-"+Ye[t>>16&15|64]+Ye[t>>24&255]+"-"+Ye[e&63|128]+Ye[e>>8&255]+"-"+Ye[e>>16&255]+Ye[e>>24&255]+Ye[i&255]+Ye[i>>8&255]+Ye[i>>16&255]+Ye[i>>24&255]).toLowerCase()}function ae(n,t,e){return Math.max(t,Math.min(e,n))}function jp(n,t){return(n%t+t)%t}function bc(n,t,e){return(1-e)*n+e*t}function Sr(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function sn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var wh=class wh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ae(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ae(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};wh.prototype.isVector2=!0;var le=wh,Fn=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],h=r[o+0],f=r[o+1],_=r[o+2],S=r[o+3];if(d!==S||l!==h||c!==f||u!==_){let g=l*h+c*f+u*_+d*S;g<0&&(h=-h,f=-f,_=-_,S=-S,g=-g);let p=1-a;if(g<.9995){let A=Math.acos(g),R=Math.sin(A);p=Math.sin(p*A)/R,a=Math.sin(a*A)/R,l=l*p+h*a,c=c*p+f*a,u=u*p+_*a,d=d*p+S*a}else{l=l*p+h*a,c=c*p+f*a,u=u*p+_*a,d=d*p+S*a;let A=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=A,c*=A,u*=A,d*=A}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,r,o){let a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[o],h=r[o+1],f=r[o+2],_=r[o+3];return t[e]=a*_+u*d+l*f-c*h,t[e+1]=l*_+u*h+c*d-a*f,t[e+2]=c*_+u*f+a*h-l*d,t[e+3]=u*_-a*d-l*h-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),d=a(r/2),h=l(i/2),f=l(s/2),_=l(r/2);switch(o){case"XYZ":this._x=h*u*d+c*f*_,this._y=c*f*d-h*u*_,this._z=c*u*_+h*f*d,this._w=c*u*d-h*f*_;break;case"YXZ":this._x=h*u*d+c*f*_,this._y=c*f*d-h*u*_,this._z=c*u*_-h*f*d,this._w=c*u*d+h*f*_;break;case"ZXY":this._x=h*u*d-c*f*_,this._y=c*f*d+h*u*_,this._z=c*u*_+h*f*d,this._w=c*u*d-h*f*_;break;case"ZYX":this._x=h*u*d-c*f*_,this._y=c*f*d+h*u*_,this._z=c*u*_-h*f*d,this._w=c*u*d+h*f*_;break;case"YZX":this._x=h*u*d+c*f*_,this._y=c*f*d+h*u*_,this._z=c*u*_-h*f*d,this._w=c*u*d-h*f*_;break;case"XZY":this._x=h*u*d-c*f*_,this._y=c*f*d-h*u*_,this._z=c*u*_+h*f*d,this._w=c*u*d+h*f*_;break;default:kt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],d=e[10],h=i+a+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(i>a&&i>d){let f=2*Math.sqrt(1+i-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-i-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-i-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ae(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Ch=class Ch{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Sd.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Sd.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),d=2*(r*i-o*e);return this.x=e+l*c+o*d-a*u,this.y=i+l*u+a*c-r*d,this.z=s+l*d+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this.z=ae(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this.z=ae(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ae(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Tc.copy(this).projectOnVector(t),this.sub(Tc)}reflect(t){return this.sub(Tc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ae(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ch.prototype.isVector3=!0;var G=Ch,Tc=new G,Sd=new Fn,Rh=class Rh{constructor(t,e,i,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){let u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],f=i[5],_=i[8],S=s[0],g=s[3],p=s[6],A=s[1],R=s[4],y=s[7],T=s[2],M=s[5],w=s[8];return r[0]=o*S+a*A+l*T,r[3]=o*g+a*R+l*M,r[6]=o*p+a*y+l*w,r[1]=c*S+u*A+d*T,r[4]=c*g+u*R+d*M,r[7]=c*p+u*y+d*w,r[2]=h*S+f*A+_*T,r[5]=h*g+f*R+_*M,r[8]=h*p+f*y+_*w,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=u*o-a*c,h=a*l-u*r,f=c*r-o*l,_=e*d+i*h+s*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let S=1/_;return t[0]=d*S,t[1]=(s*c-u*i)*S,t[2]=(a*i-s*o)*S,t[3]=h*S,t[4]=(u*e-s*l)*S,t[5]=(s*r-a*e)*S,t[6]=f*S,t[7]=(i*l-c*e)*S,t[8]=(o*e-i*r)*S,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return as("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ac.makeScale(t,e)),this}rotate(t){return as("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ac.makeRotation(-t)),this}translate(t,e){return as("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ac.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Rh.prototype.isMatrix3=!0;var qt=Rh,Ac=new qt,Md=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bd=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tm(){let n={enabled:!0,workingColorSpace:Ir,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===pe&&(s.r=gi(s.r),s.g=gi(s.g),s.b=gi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===pe&&(s.r=Gs(s.r),s.g=Gs(s.g),s.b=Gs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===xi?Pr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return as("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return as("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ir]:{primaries:t,whitePoint:i,transfer:Pr,toXYZ:Md,fromXYZ:bd,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Te},outputColorSpaceConfig:{drawingBufferColorSpace:Te}},[Te]:{primaries:t,whitePoint:i,transfer:pe,toXYZ:Md,fromXYZ:bd,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Te}}}),n}var oe=tm();function gi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Gs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Cs,Ca=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Cs===void 0&&(Cs=Lr("canvas")),Cs.width=t.width,Cs.height=t.height;let s=Cs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Cs}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Lr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=gi(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(gi(e[i]/255)*255):e[i]=gi(e[i]);return{data:e,width:t.width,height:t.height}}else return kt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},em=0,qs=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:em++}),this.uuid=ao(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ec(s[o].image)):r.push(Ec(s[o]))}else r=Ec(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Ec(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ca.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(kt("Texture: Unable to serialize Texture."),{})}var nm=0,wc=new G,hn=class n extends ni{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=ti,s=ti,r=ke,o=Xi,a=cn,l=dn,c=n.DEFAULT_ANISOTROPY,u=xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:nm++}),this.uuid=ao(),this.name="",this.source=new qs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(wc).x}get height(){return this.source.getSize(wc).y}get depth(){return this.source.getSize(wc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){kt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){kt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ph)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ta:t.x=t.x-Math.floor(t.x);break;case ti:t.x=t.x<0?0:1;break;case Aa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ta:t.y=t.y-Math.floor(t.y);break;case ti:t.y=t.y<0?0:1;break;case Aa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=ph;hn.DEFAULT_ANISOTROPY=1;var Ih=class Ih{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],_=l[9],S=l[2],g=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-S)<.01&&Math.abs(_-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+S)<.1&&Math.abs(_+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let R=(c+1)/2,y=(f+1)/2,T=(p+1)/2,M=(u+h)/4,w=(d+S)/4,x=(_+g)/4;return R>y&&R>T?R<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(R),s=M/i,r=w/i):y>T?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=M/s,r=x/s):T<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),i=w/r,s=x/r),this.set(i,s,r,e),this}let A=Math.sqrt((g-_)*(g-_)+(d-S)*(d-S)+(h-u)*(h-u));return Math.abs(A)<.001&&(A=1),this.x=(g-_)/A,this.y=(d-S)/A,this.z=(h-u)/A,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this.z=ae(this.z,t.z,e.z),this.w=ae(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this.z=ae(this.z,t,e),this.w=ae(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ae(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ih.prototype.isVector4=!0;var be=Ih,Ra=class extends ni{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ke,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:i.depth},r=new hn(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:ke,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new qs(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},un=class extends Ra{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Dr=class extends hn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Be,this.minFilter=Be,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ia=class extends hn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Be,this.minFilter=Be,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var $a=class $a{constructor(t,e,i,s,r,o,a,l,c,u,d,h,f,_,S,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,d,h,f,_,S,g)}set(t,e,i,s,r,o,a,l,c,u,d,h,f,_,S,g){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=_,p[11]=S,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $a().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,s=1/Rs.setFromMatrixColumn(t,0).length(),r=1/Rs.setFromMatrixColumn(t,1).length(),o=1/Rs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let h=o*u,f=o*d,_=a*u,S=a*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=f+_*c,e[5]=h-S*c,e[9]=-a*l,e[2]=S-h*c,e[6]=_+f*c,e[10]=o*l}else if(t.order==="YXZ"){let h=l*u,f=l*d,_=c*u,S=c*d;e[0]=h+S*a,e[4]=_*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*u,e[9]=-a,e[2]=f*a-_,e[6]=S+h*a,e[10]=o*l}else if(t.order==="ZXY"){let h=l*u,f=l*d,_=c*u,S=c*d;e[0]=h-S*a,e[4]=-o*d,e[8]=_+f*a,e[1]=f+_*a,e[5]=o*u,e[9]=S-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let h=o*u,f=o*d,_=a*u,S=a*d;e[0]=l*u,e[4]=_*c-f,e[8]=h*c+S,e[1]=l*d,e[5]=S*c+h,e[9]=f*c-_,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let h=o*l,f=o*c,_=a*l,S=a*c;e[0]=l*u,e[4]=S-h*d,e[8]=_*d+f,e[1]=d,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=f*d+_,e[10]=h-S*d}else if(t.order==="XZY"){let h=o*l,f=o*c,_=a*l,S=a*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=h*d+S,e[5]=o*u,e[9]=f*d-_,e[2]=_*d-f,e[6]=a*u,e[10]=S*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(im,t,sm)}lookAt(t,e,i){let s=this.elements;return _n.subVectors(t,e),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),Ri.crossVectors(i,_n),Ri.lengthSq()===0&&(Math.abs(i.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),Ri.crossVectors(i,_n)),Ri.normalize(),Yo.crossVectors(_n,Ri),s[0]=Ri.x,s[4]=Yo.x,s[8]=_n.x,s[1]=Ri.y,s[5]=Yo.y,s[9]=_n.y,s[2]=Ri.z,s[6]=Yo.z,s[10]=_n.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],f=i[13],_=i[2],S=i[6],g=i[10],p=i[14],A=i[3],R=i[7],y=i[11],T=i[15],M=s[0],w=s[4],x=s[8],E=s[12],D=s[1],F=s[5],z=s[9],H=s[13],N=s[2],B=s[6],q=s[10],J=s[14],et=s[3],L=s[7],X=s[11],Q=s[15];return r[0]=o*M+a*D+l*N+c*et,r[4]=o*w+a*F+l*B+c*L,r[8]=o*x+a*z+l*q+c*X,r[12]=o*E+a*H+l*J+c*Q,r[1]=u*M+d*D+h*N+f*et,r[5]=u*w+d*F+h*B+f*L,r[9]=u*x+d*z+h*q+f*X,r[13]=u*E+d*H+h*J+f*Q,r[2]=_*M+S*D+g*N+p*et,r[6]=_*w+S*F+g*B+p*L,r[10]=_*x+S*z+g*q+p*X,r[14]=_*E+S*H+g*J+p*Q,r[3]=A*M+R*D+y*N+T*et,r[7]=A*w+R*F+y*B+T*L,r[11]=A*x+R*z+y*q+T*X,r[15]=A*E+R*H+y*J+T*Q,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],d=t[6],h=t[10],f=t[14],_=t[3],S=t[7],g=t[11],p=t[15],A=l*f-c*h,R=a*f-c*d,y=a*h-l*d,T=o*f-c*u,M=o*h-l*u,w=o*d-a*u;return e*(S*A-g*R+p*y)-i*(_*A-g*T+p*M)+s*(_*R-S*T+p*w)-r*(_*y-S*M+g*w)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],u=t[10];return e*(o*u-a*c)-i*(r*u-a*l)+s*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=t[9],h=t[10],f=t[11],_=t[12],S=t[13],g=t[14],p=t[15],A=e*a-i*o,R=e*l-s*o,y=e*c-r*o,T=i*l-s*a,M=i*c-r*a,w=s*c-r*l,x=u*S-d*_,E=u*g-h*_,D=u*p-f*_,F=d*g-h*S,z=d*p-f*S,H=h*p-f*g,N=A*H-R*z+y*F+T*D-M*E+w*x;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/N;return t[0]=(a*H-l*z+c*F)*B,t[1]=(s*z-i*H-r*F)*B,t[2]=(S*w-g*M+p*T)*B,t[3]=(h*M-d*w-f*T)*B,t[4]=(l*D-o*H-c*E)*B,t[5]=(e*H-s*D+r*E)*B,t[6]=(g*y-_*w-p*R)*B,t[7]=(u*w-h*y+f*R)*B,t[8]=(o*z-a*D+c*x)*B,t[9]=(i*D-e*z-r*x)*B,t[10]=(_*M-S*y+p*A)*B,t[11]=(d*y-u*M-f*A)*B,t[12]=(a*E-o*F-l*x)*B,t[13]=(e*F-i*E+s*x)*B,t[14]=(S*R-_*T-g*A)*B,t[15]=(u*T-d*R+h*A)*B,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,d=a+a,h=r*c,f=r*u,_=r*d,S=o*u,g=o*d,p=a*d,A=l*c,R=l*u,y=l*d,T=i.x,M=i.y,w=i.z;return s[0]=(1-(S+p))*T,s[1]=(f+y)*T,s[2]=(_-R)*T,s[3]=0,s[4]=(f-y)*M,s[5]=(1-(h+p))*M,s[6]=(g+A)*M,s[7]=0,s[8]=(_+R)*w,s[9]=(g-A)*w,s[10]=(1-(h+S))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let o=Rs.set(s[0],s[1],s[2]).length(),a=Rs.set(s[4],s[5],s[6]).length(),l=Rs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),zn.copy(this);let c=1/o,u=1/a,d=1/l;return zn.elements[0]*=c,zn.elements[1]*=c,zn.elements[2]*=c,zn.elements[4]*=u,zn.elements[5]*=u,zn.elements[6]*=u,zn.elements[8]*=d,zn.elements[9]*=d,zn.elements[10]*=d,e.setFromRotationMatrix(zn),i.x=o,i.y=a,i.z=l,this}makePerspective(t,e,i,s,r,o,a=Dn,l=!1){let c=this.elements,u=2*r/(e-t),d=2*r/(i-s),h=(e+t)/(e-t),f=(i+s)/(i-s),_,S;if(l)_=r/(o-r),S=o*r/(o-r);else if(a===Dn)_=-(o+r)/(o-r),S=-2*o*r/(o-r);else if(a===Ws)_=-o/(o-r),S=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Dn,l=!1){let c=this.elements,u=2/(e-t),d=2/(i-s),h=-(e+t)/(e-t),f=-(i+s)/(i-s),_,S;if(l)_=1/(o-r),S=o/(o-r);else if(a===Dn)_=-2/(o-r),S=-(o+r)/(o-r);else if(a===Ws)_=-1/(o-r),S=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=_,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};$a.prototype.isMatrix4=!0;var me=$a,Rs=new G,zn=new me,im=new G(0,0,0),sm=new G(1,1,1),Ri=new G,Yo=new G,_n=new G,Td=new me,Ad=new Fn,Hn=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ae(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ae(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ae(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ae(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ae(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ae(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:kt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Td.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Td,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ad.setFromEuler(this),this.setFromQuaternion(Ad,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Hn.DEFAULT_ORDER="XYZ";var Nr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},rm=0,Ed=new G,Is=new Fn,ui=new me,Zo=new G,Mr=new G,om=new G,am=new Fn,wd=new G(1,0,0),Cd=new G(0,1,0),Rd=new G(0,0,1),Id={type:"added"},lm={type:"removed"},Ps={type:"childadded",child:null},Cc={type:"childremoved",child:null},Ge=class n extends ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rm++}),this.uuid=ao(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new G,e=new Hn,i=new Fn,s=new G(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new me},normalMatrix:{value:new qt}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Nr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Is.setFromAxisAngle(t,e),this.quaternion.multiply(Is),this}rotateOnWorldAxis(t,e){return Is.setFromAxisAngle(t,e),this.quaternion.premultiply(Is),this}rotateX(t){return this.rotateOnAxis(wd,t)}rotateY(t){return this.rotateOnAxis(Cd,t)}rotateZ(t){return this.rotateOnAxis(Rd,t)}translateOnAxis(t,e){return Ed.copy(t).applyQuaternion(this.quaternion),this.position.add(Ed.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(wd,t)}translateY(t){return this.translateOnAxis(Cd,t)}translateZ(t){return this.translateOnAxis(Rd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ui.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Zo.copy(t):Zo.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ui.lookAt(Mr,Zo,this.up):ui.lookAt(Zo,Mr,this.up),this.quaternion.setFromRotationMatrix(ui),s&&(ui.extractRotation(s.matrixWorld),Is.setFromRotationMatrix(ui),this.quaternion.premultiply(Is.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Gt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Id),Ps.child=t,this.dispatchEvent(Ps),Ps.child=null):Gt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(lm),Cc.child=t,this.dispatchEvent(Cc),Cc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ui.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ui.multiply(t.parent.matrixWorld)),t.applyMatrix4(ui),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Id),Ps.child=t,this.dispatchEvent(Ps),Ps.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,t,om),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,am,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),d=o(t.shapes),h=o(t.skeletons),f=o(t.animations),_=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),_.length>0&&(i.nodes=_)}return i.object=s,i;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ge.DEFAULT_UP=new G(0,1,0);Ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var os=class extends Ge{constructor(){super(),this.isGroup=!0,this.type="Group"}},cm={type:"move"},Ys=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new os,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new os,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new os,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let S of t.hand.values()){let g=e.getJointPose(S,i),p=this._getHandJoint(c,S);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,_=.005;c.inputState.pinching&&h>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(cm)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new os;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},If={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ii={h:0,s:0,l:0},Jo={h:0,s:0,l:0};function Rc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Jt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Te){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=oe.workingColorSpace){return this.r=t,this.g=e,this.b=i,oe.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=oe.workingColorSpace){if(t=jp(t,1),e=ae(e,0,1),i=ae(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Rc(o,r,t+1/3),this.g=Rc(o,r,t),this.b=Rc(o,r,t-1/3)}return oe.colorSpaceToWorking(this,s),this}setStyle(t,e=Te){function i(r){r!==void 0&&parseFloat(r)<1&&kt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:kt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);kt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Te){let i=If[t.toLowerCase()];return i!==void 0?this.setHex(i,e):kt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=gi(t.r),this.g=gi(t.g),this.b=gi(t.b),this}copyLinearToSRGB(t){return this.r=Gs(t.r),this.g=Gs(t.g),this.b=Gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Te){return oe.workingToColorSpace(Ze.copy(this),t),Math.round(ae(Ze.r*255,0,255))*65536+Math.round(ae(Ze.g*255,0,255))*256+Math.round(ae(Ze.b*255,0,255))}getHexString(t=Te){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.workingToColorSpace(Ze.copy(this),e);let i=Ze.r,s=Ze.g,r=Ze.b,o=Math.max(i,s,r),a=Math.min(i,s,r),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=oe.workingColorSpace){return oe.workingToColorSpace(Ze.copy(this),e),t.r=Ze.r,t.g=Ze.g,t.b=Ze.b,t}getStyle(t=Te){oe.workingToColorSpace(Ze.copy(this),t);let e=Ze.r,i=Ze.g,s=Ze.b;return t!==Te?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ii),this.setHSL(Ii.h+t,Ii.s+e,Ii.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ii),t.getHSL(Jo);let i=bc(Ii.h,Jo.h,e),s=bc(Ii.s,Jo.s,e),r=bc(Ii.l,Jo.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ze=new Jt;Jt.NAMES=If;var Ur=class extends Ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hn,this.environmentIntensity=1,this.environmentRotation=new Hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Vn=new G,di=new G,Ic=new G,fi=new G,Ls=new G,Ds=new G,Pd=new G,Pc=new G,Lc=new G,Dc=new G,Nc=new be,Uc=new be,Fc=new be,Ni=class n{constructor(t=new G,e=new G,i=new G){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Vn.subVectors(t,e),s.cross(Vn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Vn.subVectors(s,e),di.subVectors(i,e),Ic.subVectors(t,e);let o=Vn.dot(Vn),a=Vn.dot(di),l=Vn.dot(Ic),c=di.dot(di),u=di.dot(Ic),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let h=1/d,f=(c*l-a*u)*h,_=(o*u-a*l)*h;return r.set(1-f-_,_,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,fi)===null?!1:fi.x>=0&&fi.y>=0&&fi.x+fi.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,fi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,fi.x),l.addScaledVector(o,fi.y),l.addScaledVector(a,fi.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return Nc.setScalar(0),Uc.setScalar(0),Fc.setScalar(0),Nc.fromBufferAttribute(t,e),Uc.fromBufferAttribute(t,i),Fc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Nc,r.x),o.addScaledVector(Uc,r.y),o.addScaledVector(Fc,r.z),o}static isFrontFacing(t,e,i,s){return Vn.subVectors(i,e),di.subVectors(t,e),Vn.cross(di).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Vn.subVectors(this.c,this.b),di.subVectors(this.a,this.b),Vn.cross(di).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,o,a;Ls.subVectors(s,i),Ds.subVectors(r,i),Pc.subVectors(t,i);let l=Ls.dot(Pc),c=Ds.dot(Pc);if(l<=0&&c<=0)return e.copy(i);Lc.subVectors(t,s);let u=Ls.dot(Lc),d=Ds.dot(Lc);if(u>=0&&d<=u)return e.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(Ls,o);Dc.subVectors(t,r);let f=Ls.dot(Dc),_=Ds.dot(Dc);if(_>=0&&f<=_)return e.copy(r);let S=f*c-l*_;if(S<=0&&c>=0&&_<=0)return a=c/(c-_),e.copy(i).addScaledVector(Ds,a);let g=u*_-f*d;if(g<=0&&d-u>=0&&f-_>=0)return Pd.subVectors(r,s),a=(d-u)/(d-u+(f-_)),e.copy(s).addScaledVector(Pd,a);let p=1/(g+S+h);return o=S*p,a=h*p,e.copy(i).addScaledVector(Ls,o).addScaledVector(Ds,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},an=class{constructor(t=new G(1/0,1/0,1/0),e=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(kn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(kn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=kn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,kn):kn.fromBufferAttribute(r,o),kn.applyMatrix4(t.matrixWorld),this.expandByPoint(kn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),$o.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),$o.copy(i.boundingBox)),$o.applyMatrix4(t.matrixWorld),this.union($o)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,kn),kn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(br),Ko.subVectors(this.max,br),Ns.subVectors(t.a,br),Us.subVectors(t.b,br),Fs.subVectors(t.c,br),Pi.subVectors(Us,Ns),Li.subVectors(Fs,Us),ts.subVectors(Ns,Fs);let e=[0,-Pi.z,Pi.y,0,-Li.z,Li.y,0,-ts.z,ts.y,Pi.z,0,-Pi.x,Li.z,0,-Li.x,ts.z,0,-ts.x,-Pi.y,Pi.x,0,-Li.y,Li.x,0,-ts.y,ts.x,0];return!Oc(e,Ns,Us,Fs,Ko)||(e=[1,0,0,0,1,0,0,0,1],!Oc(e,Ns,Us,Fs,Ko))?!1:(Qo.crossVectors(Pi,Li),e=[Qo.x,Qo.y,Qo.z],Oc(e,Ns,Us,Fs,Ko))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,kn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(kn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(pi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},pi=[new G,new G,new G,new G,new G,new G,new G,new G],kn=new G,$o=new an,Ns=new G,Us=new G,Fs=new G,Pi=new G,Li=new G,ts=new G,br=new G,Ko=new G,Qo=new G,es=new G;function Oc(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){es.fromArray(n,r);let a=s.x*Math.abs(es.x)+s.y*Math.abs(es.y)+s.z*Math.abs(es.z),l=t.dot(es),c=e.dot(es),u=i.dot(es);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var Pe=new G,jo=new le,hm=0,je=class extends ni{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hm++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Af,this.updateRanges=[],this.gpuType=ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)jo.fromBufferAttribute(this,e),jo.applyMatrix3(t),this.setXY(e,jo.x,jo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix3(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix4(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyNormalMatrix(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.transformDirection(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Sr(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=sn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Sr(e,this.array)),e}setX(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Sr(e,this.array)),e}setY(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Sr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Sr(e,this.array)),e}setW(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=sn(e,this.array),i=sn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=sn(e,this.array),i=sn(i,this.array),s=sn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=sn(e,this.array),i=sn(i,this.array),s=sn(s,this.array),r=sn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Fr=class extends je{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Or=class extends je{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Nn=class extends je{constructor(t,e,i){super(new Float32Array(t),e,i)}},um=new an,Tr=new G,Bc=new G,Un=class{constructor(t=new G,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):um.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Tr.subVectors(t,this.center);let e=Tr.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Tr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Bc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Tr.copy(t.center).add(Bc)),this.expandByPoint(Tr.copy(t.center).sub(Bc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},dm=0,Ln=new me,zc=new Ge,Os=new G,xn=new an,Ar=new an,Oe=new G,On=class n extends ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dm++}),this.uuid=ao(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Kp(t)?Or:Fr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new qt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ln.makeRotationFromQuaternion(t),this.applyMatrix4(Ln),this}rotateX(t){return Ln.makeRotationX(t),this.applyMatrix4(Ln),this}rotateY(t){return Ln.makeRotationY(t),this.applyMatrix4(Ln),this}rotateZ(t){return Ln.makeRotationZ(t),this.applyMatrix4(Ln),this}translate(t,e,i){return Ln.makeTranslation(t,e,i),this.applyMatrix4(Ln),this}scale(t,e,i){return Ln.makeScale(t,e,i),this.applyMatrix4(Ln),this}lookAt(t){return zc.lookAt(t),zc.updateMatrix(),this.applyMatrix4(zc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Os).negate(),this.translate(Os.x,Os.y,Os.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Nn(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&kt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new an);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Gt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];xn.setFromBufferAttribute(r),this.morphTargetsRelative?(Oe.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(Oe),Oe.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(Oe)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Gt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Un);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Gt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(t){let i=this.boundingSphere.center;if(xn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Ar.setFromBufferAttribute(a),this.morphTargetsRelative?(Oe.addVectors(xn.min,Ar.min),xn.expandByPoint(Oe),Oe.addVectors(xn.max,Ar.max),xn.expandByPoint(Oe)):(xn.expandByPoint(Ar.min),xn.expandByPoint(Ar.max))}xn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Oe.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Oe));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Oe.fromBufferAttribute(a,c),l&&(Os.fromBufferAttribute(t,c),Oe.add(Os)),s=Math.max(s,i.distanceToSquared(Oe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Gt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Gt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new je(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let x=0;x<i.count;x++)a[x]=new G,l[x]=new G;let c=new G,u=new G,d=new G,h=new le,f=new le,_=new le,S=new G,g=new G;function p(x,E,D){c.fromBufferAttribute(i,x),u.fromBufferAttribute(i,E),d.fromBufferAttribute(i,D),h.fromBufferAttribute(r,x),f.fromBufferAttribute(r,E),_.fromBufferAttribute(r,D),u.sub(c),d.sub(c),f.sub(h),_.sub(h);let F=1/(f.x*_.y-_.x*f.y);isFinite(F)&&(S.copy(u).multiplyScalar(_.y).addScaledVector(d,-f.y).multiplyScalar(F),g.copy(d).multiplyScalar(f.x).addScaledVector(u,-_.x).multiplyScalar(F),a[x].add(S),a[E].add(S),a[D].add(S),l[x].add(g),l[E].add(g),l[D].add(g))}let A=this.groups;A.length===0&&(A=[{start:0,count:t.count}]);for(let x=0,E=A.length;x<E;++x){let D=A[x],F=D.start,z=D.count;for(let H=F,N=F+z;H<N;H+=3)p(t.getX(H+0),t.getX(H+1),t.getX(H+2))}let R=new G,y=new G,T=new G,M=new G;function w(x){T.fromBufferAttribute(s,x),M.copy(T);let E=a[x];R.copy(E),R.sub(T.multiplyScalar(T.dot(E))).normalize(),y.crossVectors(M,E);let F=y.dot(l[x])<0?-1:1;o.setXYZW(x,R.x,R.y,R.z,F)}for(let x=0,E=A.length;x<E;++x){let D=A[x],F=D.start,z=D.count;for(let H=F,N=F+z;H<N;H+=3)w(t.getX(H+0)),w(t.getX(H+1)),w(t.getX(H+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new je(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);let s=new G,r=new G,o=new G,a=new G,l=new G,c=new G,u=new G,d=new G;if(t)for(let h=0,f=t.count;h<f;h+=3){let _=t.getX(h+0),S=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,S),o.fromBufferAttribute(e,g),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,f=e.count;h<f;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Oe.fromBufferAttribute(t,e),Oe.normalize(),t.setXYZ(e,Oe.x,Oe.y,Oe.z)}toNonIndexed(){function t(a,l){let c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u),f=0,_=0;for(let S=0,g=l.length;S<g;S++){a.isInterleavedBufferAttribute?f=l[S]*a.data.stride+a.offset:f=l[S]*u;for(let p=0;p<u;p++)h[_++]=c[f++]}return new je(h,u,d)}if(this.index===null)return kt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,i);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let u=0,d=c.length;u<d;u++){let h=c[u],f=t(h,i);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let f=c[d];u.push(f.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(e))}let r=t.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,u=o.length;c<u;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Vc=new G,fm=new G,pm=new qt,Gn=class{constructor(t=new G(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=Vc.subVectors(i,e).cross(fm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let s=t.delta(Vc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||pm.getNormalMatrix(t),s=this.coplanarPoint(Vc).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},mm=0,Fi=class extends ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=ao(),this.name="",this.type="Material",this.blending=Js,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rh,this.blendDst=oh,this.blendEquation=ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Jt(0,0,0),this.blendAlpha=0,this.depthFunc=Hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ga,this.stencilZFail=ga,this.stencilZPass=ga,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){kt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){kt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Jt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Gn().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new le().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new le().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var mi=new G,kc=new G,ta=new G,ea=new G,Pa=class{constructor(t=new G,e=new G(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,mi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=mi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(mi.copy(this.origin).addScaledVector(this.direction,e),mi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){kc.copy(t).add(e).multiplyScalar(.5),ta.copy(e).sub(t).normalize(),ea.copy(this.origin).sub(kc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(ta),a=ea.dot(this.direction),l=-ea.dot(ta),c=ea.lengthSq(),u=Math.abs(1-o*o),d,h,f,_;if(u>0)if(d=o*l-a,h=o*a-l,_=r*u,d>=0)if(h>=-_)if(h<=_){let S=1/u;d*=S,h*=S,f=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h<=-_?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c):h<=_?(d=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(kc).addScaledVector(ta,h),f}intersectSphere(t,e){if(t.radius<0)return null;mi.subVectors(t.center,this.origin);let i=mi.dot(this.direction),s=mi.dot(mi)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(a=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,mi)!==null}intersectTriangle(t,e,i,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,u=a.z,d=t.x-o.x,h=t.y-o.y,f=t.z-o.z,_=e.x-o.x,S=e.y-o.y,g=e.z-o.z,p=i.x-o.x,A=i.y-o.y,R=i.z-o.z,y=Math.abs(l),T=Math.abs(c),M=Math.abs(u),w,x,E,D,F,z,H,N,B,q,J,et;if(y>=T&&y>=M?(E=l,z=d,B=_,et=p,l>=0?(w=c,x=u,D=h,F=f,H=S,N=g,q=A,J=R):(w=u,x=c,D=f,F=h,H=g,N=S,q=R,J=A)):T>=M?(E=c,z=h,B=S,et=A,c>=0?(w=u,x=l,D=f,F=d,H=g,N=_,q=R,J=p):(w=l,x=u,D=d,F=f,H=_,N=g,q=p,J=R)):(E=u,z=f,B=g,et=R,u>=0?(w=l,x=c,D=d,F=h,H=_,N=S,q=p,J=A):(w=c,x=l,D=h,F=d,H=S,N=_,q=A,J=p)),E===0)return null;let L=w/E,X=x/E,Q=1/E,xt=D-L*z,St=F-X*z,ie=H-L*B,Bt=N-X*B,Mt=q-L*et,Y=J-X*et,K=Mt*Bt-Y*ie,it=xt*Y-St*Mt,Et=ie*St-Bt*xt;if(s){if(K<0||it<0||Et<0)return null}else if((K<0||it<0||Et<0)&&(K>0||it>0||Et>0))return null;let ot=K+it+Et;if(ot===0)return null;let ut=Q*(K*z+it*B+Et*et);return(ot>0?ut<0:ut>0)?null:this.at(ut/ot,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Br=class extends Fi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=Ka,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Ld=new me,ns=new Pa,na=new Un,Dd=new G,ia=new G,sa=new G,ra=new G,Gc=new G,oa=new G,Nd=new G,aa=new G,$e=class extends Ge{constructor(t=new On,e=new Br){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){oa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=a[l],d=r[l];u!==0&&(Gc.fromBufferAttribute(d,t),o?oa.addScaledVector(Gc,u):oa.addScaledVector(Gc.sub(e),u))}e.add(oa)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),na.copy(i.boundingSphere),na.applyMatrix4(r),ns.copy(t.ray).recast(t.near),!(na.containsPoint(ns.origin)===!1&&(ns.intersectSphere(na,Dd)===null||ns.origin.distanceToSquared(Dd)>(t.far-t.near)**2))&&(Ld.copy(r).invert(),ns.copy(t.ray).applyMatrix4(Ld),!(i.boundingBox!==null&&ns.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ns)))}_computeIntersections(t,e,i){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,S=h.length;_<S;_++){let g=h[_],p=o[g.materialIndex],A=Math.max(g.start,f.start),R=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=A,T=R;y<T;y+=3){let M=a.getX(y),w=a.getX(y+1),x=a.getX(y+2);s=la(this,p,t,i,c,u,d,M,w,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let _=Math.max(0,f.start),S=Math.min(a.count,f.start+f.count);for(let g=_,p=S;g<p;g+=3){let A=a.getX(g),R=a.getX(g+1),y=a.getX(g+2);s=la(this,o,t,i,c,u,d,A,R,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,S=h.length;_<S;_++){let g=h[_],p=o[g.materialIndex],A=Math.max(g.start,f.start),R=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=A,T=R;y<T;y+=3){let M=y,w=y+1,x=y+2;s=la(this,p,t,i,c,u,d,M,w,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let _=Math.max(0,f.start),S=Math.min(l.count,f.start+f.count);for(let g=_,p=S;g<p;g+=3){let A=g,R=g+1,y=g+2;s=la(this,o,t,i,c,u,d,A,R,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function gm(n,t,e,i,s,r,o,a){let l;if(t.side===tn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Hi,a),l===null)return null;aa.copy(a),aa.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(aa);return c<e.near||c>e.far?null:{distance:c,point:aa.clone(),object:n}}function la(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,ia),n.getVertexPosition(l,sa),n.getVertexPosition(c,ra);let u=gm(n,t,e,i,ia,sa,ra,Nd);if(u){let d=new G;Ni.getBarycoord(Nd,ia,sa,ra,d),s&&(u.uv=Ni.getInterpolatedAttribute(s,a,l,c,d,new le)),r&&(u.uv1=Ni.getInterpolatedAttribute(r,a,l,c,d,new le)),o&&(u.normal=Ni.getInterpolatedAttribute(o,a,l,c,d,new G),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:l,c,normal:new G,materialIndex:0};Ni.getNormal(ia,sa,ra,h.normal),u.face=h,u.barycoord=d}return u}var Ui=class extends hn{constructor(t=null,e=1,i=1,s,r,o,a,l,c=Be,u=Be,d,h){super(null,o,a,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var zr=class extends je{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Bs=new me,Ud=new me,ca=[],Fd=new an,_m=new me,Er=new $e,wr=new Un,Vr=class extends $e{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new zr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,_m)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new an),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Bs),Fd.copy(t.boundingBox).applyMatrix4(Bs),this.boundingBox.union(Fd)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Un),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Bs),wr.copy(t.boundingSphere).applyMatrix4(Bs),this.boundingSphere.union(wr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){let i=this.matrixWorld,s=this.count;if(Er.geometry=this.geometry,Er.material=this.material,Er.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wr.copy(this.boundingSphere),wr.applyMatrix4(i),t.ray.intersectsSphere(wr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Bs),Ud.multiplyMatrices(i,Bs),Er.matrixWorld=Ud,Er.raycast(t,ca);for(let o=0,a=ca.length;o<a;o++){let l=ca[o];l.instanceId=r,l.object=this,e.push(l)}ca.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new zr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Ui(new Float32Array(s*this.count),s,this.count,sl,ln));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<i.length;c++)o+=i[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;return r[l]=a,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},is=new Un,xm=new le(.5,.5),ha=new G,_i=class{constructor(t=new Gn,e=new Gn,i=new Gn,s=new Gn,r=new Gn,o=new Gn){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Dn,i=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],f=r[7],_=r[8],S=r[9],g=r[10],p=r[11],A=r[12],R=r[13],y=r[14],T=r[15];if(s[0].setComponents(c-o,f-u,p-_,T-A).normalize(),s[1].setComponents(c+o,f+u,p+_,T+A).normalize(),s[2].setComponents(c+a,f+d,p+S,T+R).normalize(),s[3].setComponents(c-a,f-d,p-S,T-R).normalize(),i)s[4].setComponents(l,h,g,y).normalize(),s[5].setComponents(c-l,f-h,p-g,T-y).normalize();else if(s[4].setComponents(c-l,f-h,p-g,T-y).normalize(),e===Dn)s[5].setComponents(c+l,f+h,p+g,T+y).normalize();else if(e===Ws)s[5].setComponents(l,h,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),is.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),is.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(is)}intersectsSprite(t){is.center.set(0,0,0);let e=xm.distanceTo(t.center);return is.radius=.7071067811865476+e,is.applyMatrix4(t.matrixWorld),this.intersectsSphere(is)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(ha.x=s.normal.x>0?t.max.x:t.min.x,ha.y=s.normal.y>0?t.max.y:t.min.y,ha.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ha)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Od=new me,La=class n{constructor(){this.coordinateSystem=Dn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,i=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];Od.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[s]===void 0&&(i[s]=new _i),i[s].setFromProjectionMatrix(Od,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}intersectsObject(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,i=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new _i),e[s].copy(i[s]);return this._count=t._count,this}clone(){return new n().copy(this)}};function Hc(n,t){return n-t}function vm(n,t){return n.z-t.z}function ym(n,t){return t.z-n.z}var Kc=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(t,e,i,s){let r=this.pool,o=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});let a=r[this.index];o.push(a),this.index++,a.start=t,a.count=e,a.z=i,a.index=s}reset(){this.list.length=0,this.index=0}},rn=new me,Sm=new Jt(1,1,1),Mm=new _i,bm=new La,ua=new an,ss=new Un,Cr=new G,Bd=new G,Tm=new G,Wc=new Kc,Je=new $e,da=[];function Am(n,t,e=0){let i=t.itemSize;if(n.isInterleavedBufferAttribute||n.array.constructor!==t.array.constructor){let s=n.count;for(let r=0;r<s;r++)for(let o=0;o<i;o++)t.setComponent(r+e,o,n.getComponent(r,o))}else t.array.set(n.array,e*i);t.needsUpdate=!0}function rs(n,t){if(n.constructor!==t.constructor){let e=Math.min(n.length,t.length);for(let i=0;i<e;i++)t[i]=n[i]}else{let e=Math.min(n.length,t.length);t.set(new n.constructor(n.buffer,0,e))}}var kr=class extends $e{constructor(t,e,i=e*2,s){super(new On,s),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=t,this._maxVertexCount=e,this._maxIndexCount=i,this._multiDrawCounts=new Int32Array(t),this._multiDrawStarts=new Int32Array(t),this._multiDrawCount=0,this._multiDrawBytesPerElement=1,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let t=Math.sqrt(this._maxInstanceCount*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4),i=new Ui(e,t,t,cn,ln);this._matricesTexture=i}_initIndirectTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);let e=new Uint32Array(t*t),i=new Ui(e,t,t,to,Bn);this._indirectTexture=i}_initColorsTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);let e=new Float32Array(t*t*4).fill(1),i=new Ui(e,t,t,cn,ln);i.colorSpace=oe.workingColorSpace,this._colorsTexture=i}_initializeGeometry(t){let e=this.geometry,i=this._maxVertexCount,s=this._maxIndexCount;if(this._geometryInitialized===!1){for(let r in t.attributes){let o=t.getAttribute(r),{array:a,itemSize:l,normalized:c}=o,u=new a.constructor(i*l),d=new je(u,l,c);e.setAttribute(r,d)}if(t.getIndex()!==null){let r=i>65535?new Uint32Array(s):new Uint16Array(s);e.setIndex(new je(r,1))}this._geometryInitialized=!0}}_validateGeometry(t){let e=this.geometry;if(!!t.getIndex()!=!!e.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(let i in e.attributes){if(!t.hasAttribute(i))throw new Error(`THREE.BatchedMesh: Added geometry missing "${i}". All geometries must have consistent attributes.`);let s=t.getAttribute(i),r=e.getAttribute(i);if(s.itemSize!==r.itemSize||s.normalized!==r.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(t){let e=this._instanceInfo;if(t<0||t>=e.length||e[t].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${t}. Instance is either out of range or has been deleted.`)}validateGeometryId(t){let e=this._geometryInfo;if(t<0||t>=e.length||e[t].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${t}. Geometry is either out of range or has been deleted.`)}setCustomSort(t){return this.customSort=t,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new an);let t=this.boundingBox,e=this._instanceInfo;t.makeEmpty();for(let i=0,s=e.length;i<s;i++){if(e[i].active===!1)continue;let r=e[i].geometryIndex;this.getMatrixAt(i,rn),this.getBoundingBoxAt(r,ua).applyMatrix4(rn),t.union(ua)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Un);let t=this.boundingSphere,e=this._instanceInfo;t.makeEmpty();for(let i=0,s=e.length;i<s;i++){if(e[i].active===!1)continue;let r=e[i].geometryIndex;this.getMatrixAt(i,rn),this.getBoundingSphereAt(r,ss).applyMatrix4(rn),t.union(ss)}}addInstance(t){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");let i={visible:!0,active:!0,geometryIndex:t},s=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Hc),s=this._availableInstanceIds.shift(),this._instanceInfo[s]=i):(s=this._instanceInfo.length,this._instanceInfo.push(i));let r=this._matricesTexture;rn.identity().toArray(r.image.data,s*16),r.needsUpdate=!0;let o=this._colorsTexture;return o&&(Sm.toArray(o.image.data,s*4),o.needsUpdate=!0),this._visibilityChanged=!0,s}addGeometry(t,e=-1,i=-1){this._initializeGeometry(t),this._validateGeometry(t);let s={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;s.vertexStart=this._nextVertexStart,s.reservedVertexCount=e===-1?t.getAttribute("position").count:e;let o=t.getIndex();if(o!==null&&(s.indexStart=this._nextIndexStart,s.reservedIndexCount=i===-1?o.count:i),s.indexStart!==-1&&s.indexStart+s.reservedIndexCount>this._maxIndexCount||s.vertexStart+s.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Hc),l=this._availableGeometryIds.shift(),r[l]=s):(l=this._geometryCount,this._geometryCount++,r.push(s)),this.setGeometryAt(l,t),this._nextIndexStart=s.indexStart+s.reservedIndexCount,this._nextVertexStart=s.vertexStart+s.reservedVertexCount,l}setGeometryAt(t,e){if(t>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(e);let i=this.geometry,s=i.getIndex()!==null,r=i.getIndex(),o=e.getIndex(),a=this._geometryInfo[t];if(s&&o.count>a.reservedIndexCount||e.attributes.position.count>a.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");let l=a.vertexStart,c=a.reservedVertexCount;a.vertexCount=e.getAttribute("position").count;for(let u in i.attributes){let d=e.getAttribute(u),h=i.getAttribute(u);Am(d,h,l);let f=d.itemSize;for(let _=d.count,S=c;_<S;_++){let g=l+_;for(let p=0;p<f;p++)h.setComponent(g,p,0)}h.needsUpdate=!0,h.addUpdateRange(l*f,c*f)}if(s){let u=a.indexStart,d=a.reservedIndexCount;a.indexCount=e.getIndex().count;for(let h=0;h<o.count;h++)r.setX(u+h,l+o.getX(h));for(let h=o.count,f=d;h<f;h++)r.setX(u+h,l);r.needsUpdate=!0,r.addUpdateRange(u,a.reservedIndexCount)}return a.start=s?a.indexStart:a.vertexStart,a.count=s?a.indexCount:a.vertexCount,a.boundingBox=null,e.boundingBox!==null&&(a.boundingBox=e.boundingBox.clone()),a.boundingSphere=null,e.boundingSphere!==null&&(a.boundingSphere=e.boundingSphere.clone()),this._visibilityChanged=!0,t}deleteGeometry(t){let e=this._geometryInfo;if(t>=e.length||e[t].active===!1)return this;let i=this._instanceInfo;for(let s=0,r=i.length;s<r;s++)i[s].active&&i[s].geometryIndex===t&&this.deleteInstance(s);return e[t].active=!1,this._availableGeometryIds.push(t),this._visibilityChanged=!0,this}deleteInstance(t){return this.validateInstanceId(t),this._instanceInfo[t].active=!1,this._availableInstanceIds.push(t),this._visibilityChanged=!0,this}optimize(){let t=0,e=0,i=this._geometryInfo,s=i.map((o,a)=>a).sort((o,a)=>i[o].vertexStart-i[a].vertexStart),r=this.geometry;for(let o=0,a=i.length;o<a;o++){let l=s[o],c=i[l];if(c.active!==!1){if(r.index!==null){if(c.indexStart!==e){let{indexStart:u,vertexStart:d,reservedIndexCount:h}=c,f=r.index,_=f.array,S=t-d;for(let g=u;g<u+h;g++)_[g]=_[g]+S;f.array.copyWithin(e,u,u+h),f.addUpdateRange(e,h),f.needsUpdate=!0,c.indexStart=e}e+=c.reservedIndexCount}if(c.vertexStart!==t){let{vertexStart:u,reservedVertexCount:d}=c,h=r.attributes;for(let f in h){let _=h[f],{array:S,itemSize:g}=_;S.copyWithin(t*g,u*g,(u+d)*g),_.addUpdateRange(t*g,d*g),_.needsUpdate=!0}c.vertexStart=t}t+=c.reservedVertexCount,c.start=r.index?c.indexStart:c.vertexStart}}return this._nextIndexStart=e,this._nextVertexStart=t,this._visibilityChanged=!0,this}getBoundingBoxAt(t,e){if(t>=this._geometryCount)return null;let i=this.geometry,s=this._geometryInfo[t];if(s.boundingBox===null){let r=new an,o=i.index,a=i.attributes.position;for(let l=s.start,c=s.start+s.count;l<c;l++){let u=l;o&&(u=o.getX(u)),r.expandByPoint(Cr.fromBufferAttribute(a,u))}s.boundingBox=r}return e.copy(s.boundingBox),e}getBoundingSphereAt(t,e){if(t>=this._geometryCount)return null;let i=this.geometry,s=this._geometryInfo[t];if(s.boundingSphere===null){let r=new Un;this.getBoundingBoxAt(t,ua),ua.getCenter(r.center);let o=i.index,a=i.attributes.position,l=0;for(let c=s.start,u=s.start+s.count;c<u;c++){let d=c;o&&(d=o.getX(d)),Cr.fromBufferAttribute(a,d),l=Math.max(l,r.center.distanceToSquared(Cr))}r.radius=Math.sqrt(l),s.boundingSphere=r}return e.copy(s.boundingSphere),e}setMatrixAt(t,e){this.validateInstanceId(t);let i=this._matricesTexture,s=this._matricesTexture.image.data;return e.toArray(s,t*16),i.needsUpdate=!0,this}getMatrixAt(t,e){return this.validateInstanceId(t),e.fromArray(this._matricesTexture.image.data,t*16)}setColorAt(t,e){return this.validateInstanceId(t),this._colorsTexture===null&&this._initColorsTexture(),e.toArray(this._colorsTexture.image.data,t*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(t,e){return this.validateInstanceId(t),this._colorsTexture===null?e.isVector4?e.set(1,1,1,1):e.setRGB(1,1,1):e.fromArray(this._colorsTexture.image.data,t*4)}setVisibleAt(t,e){return this.validateInstanceId(t),this._instanceInfo[t].visible===e?this:(this._instanceInfo[t].visible=e,this._visibilityChanged=!0,this)}getVisibleAt(t){return this.validateInstanceId(t),this._instanceInfo[t].visible}setGeometryIdAt(t,e){return this.validateInstanceId(t),this.validateGeometryId(e),this._instanceInfo[t].geometryIndex=e,this._visibilityChanged=!0,this}getGeometryIdAt(t){return this.validateInstanceId(t),this._instanceInfo[t].geometryIndex}getGeometryRangeAt(t,e={}){this.validateGeometryId(t);let i=this._geometryInfo[t];return e.vertexStart=i.vertexStart,e.vertexCount=i.vertexCount,e.reservedVertexCount=i.reservedVertexCount,e.indexStart=i.indexStart,e.indexCount=i.indexCount,e.reservedIndexCount=i.reservedIndexCount,e.start=i.start,e.count=i.count,e}setInstanceCount(t){let e=this._availableInstanceIds,i=this._instanceInfo;for(e.sort(Hc);e[e.length-1]===i.length-1;)i.pop(),e.pop();if(t<i.length)throw new Error(`THREE.BatchedMesh: Instance ids outside the range ${t} are being used. Cannot shrink instance count.`);let s=new Int32Array(t),r=new Int32Array(t);rs(this._multiDrawCounts,s),rs(this._multiDrawStarts,r),this._multiDrawCounts=s,this._multiDrawStarts=r,this._maxInstanceCount=t;let o=this._indirectTexture,a=this._matricesTexture,l=this._colorsTexture;o.dispose(),this._initIndirectTexture(),rs(o.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),rs(a.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),rs(l.image.data,this._colorsTexture.image.data))}setGeometrySize(t,e){let i=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...i.map(a=>a.vertexStart+a.reservedVertexCount))>t)throw new Error(`THREE.BatchedMesh: Geometry vertex values are being used outside the range ${e}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...i.map(l=>l.indexStart+l.reservedIndexCount))>e)throw new Error(`THREE.BatchedMesh: Geometry index values are being used outside the range ${e}. Cannot shrink further.`);let r=this.geometry;r.dispose(),this._maxVertexCount=t,this._maxIndexCount=e,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new On,this._initializeGeometry(r));let o=this.geometry;r.index&&rs(r.index.array,o.index.array);for(let a in r.attributes)rs(r.attributes[a].array,o.attributes[a].array)}raycast(t,e){let i=this._instanceInfo,s=this._geometryInfo,r=this.matrixWorld,o=this.geometry;Je.material=this.material,Je.geometry.index=o.index,Je.geometry.attributes=o.attributes,Je.geometry.boundingBox===null&&(Je.geometry.boundingBox=new an),Je.geometry.boundingSphere===null&&(Je.geometry.boundingSphere=new Un);for(let a=0,l=i.length;a<l;a++){if(!i[a].visible||!i[a].active)continue;let c=i[a].geometryIndex,u=s[c];Je.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(a,Je.matrixWorld).premultiply(r),this.getBoundingBoxAt(c,Je.geometry.boundingBox),this.getBoundingSphereAt(c,Je.geometry.boundingSphere),Je.raycast(t,da);for(let d=0,h=da.length;d<h;d++){let f=da[d];f.object=this,f.batchId=a,e.push(f)}da.length=0}Je.material=null,Je.geometry.index=null,Je.geometry.attributes={},Je.geometry.setDrawRange(0,1/0)}copy(t){return super.copy(t),this.geometry=t.geometry.clone(),this.perObjectFrustumCulled=t.perObjectFrustumCulled,this.sortObjects=t.sortObjects,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this._geometryInfo=t._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox!==null?e.boundingBox.clone():null,boundingSphere:e.boundingSphere!==null?e.boundingSphere.clone():null})),this._instanceInfo=t._instanceInfo.map(e=>({...e})),this._availableInstanceIds=t._availableInstanceIds.slice(),this._availableGeometryIds=t._availableGeometryIds.slice(),this._nextIndexStart=t._nextIndexStart,this._nextVertexStart=t._nextVertexStart,this._geometryCount=t._geometryCount,this._maxInstanceCount=t._maxInstanceCount,this._maxVertexCount=t._maxVertexCount,this._maxIndexCount=t._maxIndexCount,this._geometryInitialized=t._geometryInitialized,this._multiDrawCounts=t._multiDrawCounts.slice(),this._multiDrawStarts=t._multiDrawStarts.slice(),this._multiDrawBytesPerElement=t._multiDrawBytesPerElement,this._indirectTexture=t._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=t._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=t._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){super.dispose(),this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(t,e,i,s,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let o=s.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,l=1;r.wireframe&&(l=2,a=s.attributes.position.count>65535?4:2);let c=this._instanceInfo,u=this._multiDrawStarts,d=this._multiDrawCounts,h=this._geometryInfo,f=this.perObjectFrustumCulled,_=this._indirectTexture,S=_.image.data,g=i.isArrayCamera?bm:Mm;f&&(i.isArrayCamera?g.setFromArrayCamera(i):(rn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse).multiply(this.matrixWorld),g.setFromProjectionMatrix(rn,i.coordinateSystem,i.reversedDepth)));let p=0;if(this.sortObjects){rn.copy(this.matrixWorld).invert(),Cr.setFromMatrixPosition(i.matrixWorld).applyMatrix4(rn),Bd.set(0,0,-1).transformDirection(i.matrixWorld).transformDirection(rn);for(let y=0,T=c.length;y<T;y++)if(c[y].visible&&c[y].active){let M=c[y].geometryIndex;this.getMatrixAt(y,rn),this.getBoundingSphereAt(M,ss).applyMatrix4(rn);let w=!1;if(f&&(w=!g.intersectsSphere(ss)),!w){let x=h[M],E=Tm.subVectors(ss.center,Cr).dot(Bd);Wc.push(x.start,x.count,E,y)}}let A=Wc.list,R=this.customSort;R===null?A.sort(r.transparent?ym:vm):R.call(this,A,i);for(let y=0,T=A.length;y<T;y++){let M=A[y];u[p]=M.start*a*l,d[p]=M.count*l,S[p]=M.index,p++}Wc.reset()}else for(let A=0,R=c.length;A<R;A++)if(c[A].visible&&c[A].active){let y=c[A].geometryIndex,T=!1;if(f&&(this.getMatrixAt(A,rn),this.getBoundingSphereAt(y,ss).applyMatrix4(rn),T=!g.intersectsSphere(ss)),!T){let M=h[y];u[p]=M.start*a*l,d[p]=M.count*l,S[p]=A,p++}}_.needsUpdate=!0,this._multiDrawCount=p,this._multiDrawBytesPerElement=a,this._visibilityChanged=!1}onBeforeShadow(t,e,i,s,r,o){this.onBeforeRender(t,null,s,r,o)}};var Gr=class extends hn{constructor(t=[],e=Wi,i,s,r,o,a,l,c,u){super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Oi=class extends hn{constructor(t,e,i=Bn,s,r,o,a=Be,l=Be,c,u=ei,d=1){if(u!==ei&&u!==qi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:d};super(h,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new qs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Da=class extends Oi{constructor(t,e=Bn,i=Wi,s,r,o=Be,a=Be,l,c=ei){let u={width:t,height:t,depth:1},d=[u,u,u,u,u,u];super(t,t,e,i,s,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Hr=class extends hn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Bi=class n extends On{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],u=[],d=[],h=0,f=0;_("z","y","x",-1,-1,i,e,t,o,r,0),_("z","y","x",1,-1,i,e,-t,o,r,1),_("x","z","y",1,1,t,i,e,s,o,2),_("x","z","y",1,-1,t,i,-e,s,o,3),_("x","y","z",1,-1,t,e,i,s,r,4),_("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Nn(c,3)),this.setAttribute("normal",new Nn(u,3)),this.setAttribute("uv",new Nn(d,2));function _(S,g,p,A,R,y,T,M,w,x,E){let D=y/w,F=T/x,z=y/2,H=T/2,N=M/2,B=w+1,q=x+1,J=0,et=0,L=new G;for(let X=0;X<q;X++){let Q=X*F-H;for(let xt=0;xt<B;xt++){let St=xt*D-z;L[S]=St*A,L[g]=Q*R,L[p]=N,c.push(L.x,L.y,L.z),L[S]=0,L[g]=0,L[p]=M>0?1:-1,u.push(L.x,L.y,L.z),d.push(xt/w),d.push(1-X/x),J+=1}}for(let X=0;X<x;X++)for(let Q=0;Q<w;Q++){let xt=h+Q+B*X,St=h+Q+B*(X+1),ie=h+(Q+1)+B*(X+1),Bt=h+(Q+1)+B*X;l.push(xt,St,Bt),l.push(St,ie,Bt),et+=6}a.addGroup(f,et,E),f+=et,h+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Wr=class n extends On{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,d=t/a,h=e/l,f=[],_=[],S=[],g=[];for(let p=0;p<u;p++){let A=p*h-o;for(let R=0;R<c;R++){let y=R*d-r;_.push(y,-A,0),S.push(0,0,1),g.push(R/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let A=0;A<a;A++){let R=A+c*p,y=A+c*(p+1),T=A+1+c*(p+1),M=A+1+c*p;f.push(R,y,M),f.push(y,T,M)}this.setIndex(f),this.setAttribute("position",new Nn(_,3)),this.setAttribute("normal",new Nn(S,3)),this.setAttribute("uv",new Nn(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};function hs(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];if(zd(s))s.isRenderTargetTexture?(kt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(zd(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function Ke(n){let t={};for(let e=0;e<n.length;e++){let i=hs(n[e]);for(let s in i)t[s]=i[s]}return t}function zd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Em(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function bh(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}var Pf={clone:hs,merge:Ke},wm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,vn=class extends Fi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wm,this.fragmentShader=Cm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=hs(t.uniforms),this.uniformsGroups=Em(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new Jt().setHex(s.value);break;case"v2":this.uniforms[i].value=new le().fromArray(s.value);break;case"v3":this.uniforms[i].value=new G().fromArray(s.value);break;case"v4":this.uniforms[i].value=new be().fromArray(s.value);break;case"m3":this.uniforms[i].value=new qt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new me().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Na=class extends vn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Xr=class extends Fi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ol,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=Ka,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ua=class extends Fi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Fa=class extends Fi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function zs(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Xc(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var zi=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];t:{e:{let o;n:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break e}o=e.length;break n}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break e}o=i,i=0;break n}break t}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Oa=class extends zi{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Zc,endingEnd:Zc}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Jc:r=t,a=2*e-i;break;case $c:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Jc:o=t,l=2*i-e;break;case $c:o=1,l=i+s[1]-s[0];break;default:o=t-1,l=e}let c=(i-e)*.5,u=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,_=(i-e)/(s-e),S=_*_,g=S*_,p=-h*g+2*h*S-h*_,A=(1+h)*g+(-1.5-2*h)*S+(-.5+h)*_+1,R=(-1-f)*g+(1.5+f)*S+.5*_,y=f*g-f*S;for(let T=0;T!==a;++T)r[T]=p*o[u+T]+A*o[c+T]+R*o[l+T]+y*o[d+T];return r}},Ba=class extends zi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,u=(i-e)/(s-e),d=1-u;for(let h=0;h!==a;++h)r[h]=o[c+h]*d+o[l+h]*u;return r}},za=class extends zi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Va=class extends zi{interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,u=this.inTangents,d=this.outTangents;if(!u||!d){let _=(i-e)/(s-e),S=1-_;for(let g=0;g!==a;++g)r[g]=o[c+g]*S+o[l+g]*_;return r}let h=a*2,f=t-1;for(let _=0;_!==a;++_){let S=o[c+_],g=o[l+_],p=f*h+_*2,A=d[p],R=d[p+1],y=t*h+_*2,T=u[y],M=u[y+1],w=Im(i,e,A,T,s);r[_]=Lf(w,S,R,M,g)}return r}};function Lf(n,t,e,i,s){let r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function Rm(n,t,e,i,s){let r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function Im(n,t,e,i,s){let r=(n-t)/(s-t);for(let o=0;o<8;o++){let a=Lf(r,t,e,i,s)-n;if(Math.abs(a)<1e-10)break;let l=Rm(r,t,e,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var yn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=zs(e,this.TimeBufferType),this.values=zs(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:zs(t.times,Array),values:zs(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),Xc(t.settings)&&(i.settings={inTangents:zs(t.settings.inTangents,Array),outTangents:zs(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new za(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ba(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Oa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Va(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Rr:e=this.InterpolantFactoryMethodDiscrete;break;case Ea:e=this.InterpolantFactoryMethodLinear;break;case ma:e=this.InterpolantFactoryMethodSmooth;break;case Yc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return kt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Rr;case this.InterpolantFactoryMethodLinear:return Ea;case this.InterpolantFactoryMethodSmooth:return ma;case this.InterpolantFactoryMethodBezier:return Yc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;Xc(this.settings)&&(Vd(this.settings.inTangents,t),Vd(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Gt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Gt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){Gt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){Gt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Qp(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){Gt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===ma,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],u=t[a+1];if(c!==u&&(a!==1||c!==t[0]))if(s)l=!0;else{let d=a*i,h=d-i,f=d+i;for(let _=0;_!==i;++_){let S=e[d+_];if(S!==e[h+_]||S!==e[f+_]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let d=a*i,h=o*i;for(let f=0;f!==i;++f)e[h+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,Xc(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Vd(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}yn.prototype.ValueTypeName="";yn.prototype.TimeBufferType=Float32Array;yn.prototype.ValueBufferType=Float32Array;yn.prototype.DefaultInterpolation=Ea;var Vi=class extends yn{constructor(t,e,i){super(t,e,i)}};Vi.prototype.ValueTypeName="bool";Vi.prototype.ValueBufferType=Array;Vi.prototype.DefaultInterpolation=Rr;Vi.prototype.InterpolantFactoryMethodLinear=void 0;Vi.prototype.InterpolantFactoryMethodSmooth=void 0;var ka=class extends yn{constructor(t,e,i,s){super(t,e,i,s)}};ka.prototype.ValueTypeName="color";var Ga=class extends yn{constructor(t,e,i,s){super(t,e,i,s)}};Ga.prototype.ValueTypeName="number";var Ha=class extends zi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(s-e),c=t*a;for(let u=c+a;c!==u;c+=4)Fn.slerpFlat(r,0,o,c-a,o,c,l);return r}},qr=class extends yn{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new Ha(this.times,this.values,this.getValueSize(),t)}};qr.prototype.ValueTypeName="quaternion";qr.prototype.InterpolantFactoryMethodSmooth=void 0;var ki=class extends yn{constructor(t,e,i){super(t,e,i)}};ki.prototype.ValueTypeName="string";ki.prototype.ValueBufferType=Array;ki.prototype.DefaultInterpolation=Rr;ki.prototype.InterpolantFactoryMethodLinear=void 0;ki.prototype.InterpolantFactoryMethodSmooth=void 0;var Wa=class extends yn{constructor(t,e,i,s){super(t,e,i,s)}};Wa.prototype.ValueTypeName="vector";var Xa=class{constructor(t,e,i){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let f=c[d],_=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Df=new Xa,qa=class{constructor(t){this.manager=t!==void 0?t:Df,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};qa.DEFAULT_MATERIAL_NAME="__DEFAULT";var Yr=class extends Ge{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Jt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var qc=new me,kd=new G,Gd=new G,Ya=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.mapType=dn,this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _i,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;kd.setFromMatrixPosition(t.matrixWorld),e.position.copy(kd),Gd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Gd),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){qc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(qc,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Ws||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(qc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},fa=new G,pa=new Fn,jn=new G,Zr=class extends Ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=Dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(fa,pa,jn),jn.x===1&&jn.y===1&&jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fa,pa,jn.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(fa,pa,jn),jn.x===1&&jn.y===1&&jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fa,pa,jn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Di=new G,Hd=new le,Wd=new le,on=class extends Zr{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=wa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Mc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return wa*2*Math.atan(Math.tan(Mc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Di.x,Di.y).multiplyScalar(-t/Di.z),Di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Di.x,Di.y).multiplyScalar(-t/Di.z)}getViewSize(t,e){return this.getViewBounds(t,Hd,Wd),e.subVectors(Wd,Hd)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Mc*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Gi=class extends Zr{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Qc=class extends Ya{constructor(){super(new Gi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Jr=class extends Yr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ge.DEFAULT_UP),this.updateMatrix(),this.target=new Ge,this.shadow=new Qc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},$r=class extends Yr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Vs=-90,ks=1,Za=class extends Ge{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new on(Vs,ks,t,e);s.layers=this.layers,this.add(s);let r=new on(Vs,ks,t,e);r.layers=this.layers,this.add(r);let o=new on(Vs,ks,t,e);o.layers=this.layers,this.add(o);let a=new on(Vs,ks,t,e);a.layers=this.layers,this.add(a);let l=new on(Vs,ks,t,e);l.layers=this.layers,this.add(l);let c=new on(Vs,ks,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Dn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ws)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=S,t.setRenderTarget(i,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(d,h,f),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}},Ja=class extends on{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Th="\\[\\]\\.:\\/",Pm=new RegExp("["+Th+"]","g"),Ah="[^"+Th+"]",Lm="[^"+Th.replace("\\.","")+"]",Dm=/((?:WC+[\/:])*)/.source.replace("WC",Ah),Nm=/(WCOD+)?/.source.replace("WCOD",Lm),Um=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ah),Fm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ah),Om=new RegExp("^"+Dm+Nm+Um+Fm+"$"),Bm=["material","materials","bones","map"],jc=class{constructor(t,e,i){let s=i||Me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Me=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Pm,"")}static parseTrackName(t){let e=Om.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Bm.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){kt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Gt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Gt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Gt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Gt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Gt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Gt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Gt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;Gt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Gt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Gt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Me.Composite=jc;Me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Me.prototype.GetterByBindingType=[Me.prototype._getValue_direct,Me.prototype._getValue_array,Me.prototype._getValue_arrayElement,Me.prototype._getValue_toArray];Me.prototype.SetterByBindingTypeAndVersioning=[[Me.prototype._setValue_direct,Me.prototype._setValue_direct_setNeedsUpdate,Me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_array,Me.prototype._setValue_array_setNeedsUpdate,Me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_arrayElement,Me.prototype._setValue_arrayElement_setNeedsUpdate,Me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_fromArray,Me.prototype._setValue_fromArray_setNeedsUpdate,Me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var pM=new Float32Array(1);var Ph=class Ph{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};Ph.prototype.isMatrix2=!0;var th=Ph;function Eh(n,t,e,i){let s=zm(i);switch(e){case vh:return n*t;case sl:return n*t/s.components*s.byteLength;case to:return n*t/s.components*s.byteLength;case Yi:return n*t*2/s.components*s.byteLength;case rl:return n*t*2/s.components*s.byteLength;case yh:return n*t*3/s.components*s.byteLength;case cn:return n*t*4/s.components*s.byteLength;case ol:return n*t*4/s.components*s.byteLength;case eo:case no:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case io:case so:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ll:case hl:return Math.max(n,16)*Math.max(t,8)/4;case al:case cl:return Math.max(n,8)*Math.max(t,8)/2;case ul:case dl:case pl:case ml:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case fl:case ro:case gl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case _l:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case xl:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case vl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case yl:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Sl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Ml:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case bl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Tl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Al:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case El:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case wl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Cl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Rl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Il:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Pl:case Ll:case Dl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Nl:case Ul:return Math.ceil(n/4)*Math.ceil(t/4)*8;case oo:case Fl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function zm(n){switch(n){case dn:case mh:return{byteLength:1,components:1};case $s:case gh:case Xn:return{byteLength:2,components:1};case nl:case il:return{byteLength:2,components:4};case Bn:case el:case ln:return{byteLength:4,components:1};case _h:case xh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?kt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function ep(){let n=null,t=!1,e=null,i=null;function s(r,o){i=n.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function km(n){let t=new WeakMap;function e(a,l){let c=a.array,u=a.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){let u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((f,_)=>f.start-_.start);let h=0;for(let f=1;f<d.length;f++){let _=d[h],S=d[f];S.start<=_.start+_.count+1?_.count=Math.max(_.count,S.start+S.count-_.start):(++h,d[h]=S)}d.length=h+1;for(let f=0,_=d.length;f<_;f++){let S=d[f];n.bufferSubData(c,S.start*u.BYTES_PER_ELEMENT,u,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Gm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Wm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Xm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ym=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Jm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$m=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Km=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,eg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ng=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ig=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,sg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,og=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ag=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,lg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,cg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,hg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,ug=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,dg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,fg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,pg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_g=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xg="gl_FragColor = linearToOutputTexel( gl_FragColor );",vg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Sg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Mg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,bg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Tg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ag=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Eg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Cg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ig=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Ng=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Ug=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Og=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Bg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Vg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,kg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Gg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Hg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wg=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Xg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,qg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$g=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Qg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,t_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,e_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,n_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,i_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,s_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,r_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,o_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,a_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,l_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,c_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,h_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,u_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,d_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,f_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,p_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,m_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,g_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,__=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,x_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,v_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,y_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,S_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,M_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,b_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,T_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,A_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,E_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,w_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,C_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,R_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,I_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,P_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,L_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,D_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,N_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,U_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,F_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,O_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,B_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,z_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,V_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,k_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,G_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,H_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,X_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,q_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Y_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Z_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,J_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,$_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,K_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Q_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,j_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,e0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,n0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,i0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,r0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,o0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,a0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,c0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,h0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,u0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,f0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,p0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,m0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,_0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,x0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,v0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,y0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,S0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,te={alphahash_fragment:Gm,alphahash_pars_fragment:Hm,alphamap_fragment:Wm,alphamap_pars_fragment:Xm,alphatest_fragment:qm,alphatest_pars_fragment:Ym,aomap_fragment:Zm,aomap_pars_fragment:Jm,batching_pars_vertex:$m,batching_vertex:Km,begin_vertex:Qm,beginnormal_vertex:jm,bsdfs:tg,iridescence_fragment:eg,bumpmap_pars_fragment:ng,clipping_planes_fragment:ig,clipping_planes_pars_fragment:sg,clipping_planes_pars_vertex:rg,clipping_planes_vertex:og,color_fragment:ag,color_pars_fragment:lg,color_pars_vertex:cg,color_vertex:hg,common:ug,cube_uv_reflection_fragment:dg,defaultnormal_vertex:fg,displacementmap_pars_vertex:pg,displacementmap_vertex:mg,emissivemap_fragment:gg,emissivemap_pars_fragment:_g,colorspace_fragment:xg,colorspace_pars_fragment:vg,envmap_fragment:yg,envmap_common_pars_fragment:Sg,envmap_pars_fragment:Mg,envmap_pars_vertex:bg,envmap_physical_pars_fragment:Ng,envmap_vertex:Tg,fog_vertex:Ag,fog_pars_vertex:Eg,fog_fragment:wg,fog_pars_fragment:Cg,gradientmap_pars_fragment:Rg,lightmap_pars_fragment:Ig,lights_lambert_fragment:Pg,lights_lambert_pars_fragment:Lg,lights_pars_begin:Dg,lights_toon_fragment:Ug,lights_toon_pars_fragment:Fg,lights_phong_fragment:Og,lights_phong_pars_fragment:Bg,lights_physical_fragment:zg,lights_physical_pars_fragment:Vg,lights_fragment_begin:kg,lights_fragment_maps:Gg,lights_fragment_end:Hg,lightprobes_pars_fragment:Wg,logdepthbuf_fragment:Xg,logdepthbuf_pars_fragment:qg,logdepthbuf_pars_vertex:Yg,logdepthbuf_vertex:Zg,map_fragment:Jg,map_pars_fragment:$g,map_particle_fragment:Kg,map_particle_pars_fragment:Qg,metalnessmap_fragment:jg,metalnessmap_pars_fragment:t_,morphinstance_vertex:e_,morphcolor_vertex:n_,morphnormal_vertex:i_,morphtarget_pars_vertex:s_,morphtarget_vertex:r_,normal_fragment_begin:o_,normal_fragment_maps:a_,normal_pars_fragment:l_,normal_pars_vertex:c_,normal_vertex:h_,normalmap_pars_fragment:u_,clearcoat_normal_fragment_begin:d_,clearcoat_normal_fragment_maps:f_,clearcoat_pars_fragment:p_,iridescence_pars_fragment:m_,opaque_fragment:g_,packing:__,premultiplied_alpha_fragment:x_,project_vertex:v_,dithering_fragment:y_,dithering_pars_fragment:S_,roughnessmap_fragment:M_,roughnessmap_pars_fragment:b_,shadowmap_pars_fragment:T_,shadowmap_pars_vertex:A_,shadowmap_vertex:E_,shadowmask_pars_fragment:w_,skinbase_vertex:C_,skinning_pars_vertex:R_,skinning_vertex:I_,skinnormal_vertex:P_,specularmap_fragment:L_,specularmap_pars_fragment:D_,tonemapping_fragment:N_,tonemapping_pars_fragment:U_,transmission_fragment:F_,transmission_pars_fragment:O_,uv_pars_fragment:B_,uv_pars_vertex:z_,uv_vertex:V_,worldpos_vertex:k_,background_vert:G_,background_frag:H_,backgroundCube_vert:W_,backgroundCube_frag:X_,cube_vert:q_,cube_frag:Y_,depth_vert:Z_,depth_frag:J_,distance_vert:$_,distance_frag:K_,equirect_vert:Q_,equirect_frag:j_,linedashed_vert:t0,linedashed_frag:e0,meshbasic_vert:n0,meshbasic_frag:i0,meshlambert_vert:s0,meshlambert_frag:r0,meshmatcap_vert:o0,meshmatcap_frag:a0,meshnormal_vert:l0,meshnormal_frag:c0,meshphong_vert:h0,meshphong_frag:u0,meshphysical_vert:d0,meshphysical_frag:f0,meshtoon_vert:p0,meshtoon_frag:m0,points_vert:g0,points_frag:_0,shadow_vert:x0,shadow_frag:v0,sprite_vert:y0,sprite_frag:S0},ft={common:{diffuse:{value:new Jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new G},probesMax:{value:new G},probesResolution:{value:new G}},points:{diffuse:{value:new Jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new Jt(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},oi={basic:{uniforms:Ke([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:Ke([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Jt(0)},envMapIntensity:{value:1}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:Ke([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Jt(0)},specular:{value:new Jt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:Ke([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new Jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:Ke([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new Jt(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:Ke([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:Ke([ft.points,ft.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:Ke([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:Ke([ft.common,ft.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:Ke([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:Ke([ft.sprite,ft.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distance:{uniforms:Ke([ft.common,ft.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distance_vert,fragmentShader:te.distance_frag},shadow:{uniforms:Ke([ft.lights,ft.fog,{color:{value:new Jt(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};oi.physical={uniforms:Ke([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new Jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new Jt(0)},specularColor:{value:new Jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};var Vl={r:0,b:0,g:0},M0=new me,np=new qt;np.set(-1,0,0,0,1,0,0,0,1);function b0(n,t,e,i,s,r){let o=new Jt(0),a=s===!0?0:1,l,c,u=null,d=0,h=null;function f(A){let R=A.isScene===!0?A.background:null;if(R&&R.isTexture){let y=A.backgroundBlurriness>0;R=t.get(R,y)}return R}function _(A){let R=!1,y=f(A);y===null?g(o,a):y&&y.isColor&&(g(y,1),R=!0);let T=n.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||R)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function S(A,R){let y=f(R);y&&(y.isCubeTexture||y.mapping===Qr)?(c===void 0&&(c=new $e(new Bi(1,1,1),new vn({name:"BackgroundCubeMaterial",uniforms:hs(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,M,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(M0.makeRotationFromEuler(R.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(np),c.material.toneMapped=oe.getTransfer(y.colorSpace)!==pe,(u!==y||d!==y.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,h=n.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new $e(new Wr(2,2),new vn({name:"BackgroundMaterial",uniforms:hs(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.toneMapped=oe.getTransfer(y.colorSpace)!==pe,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,h=n.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function g(A,R){A.getRGB(Vl,bh(n)),e.buffers.color.setClear(Vl.r,Vl.g,Vl.b,R,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(A,R=1){o.set(A),a=R,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(A){a=A,g(o,a)},render:_,addToRenderList:S,dispose:p}}function T0(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null),r=s,o=!1;function a(F,z,H,N,B){let q=!1,J=d(F,N,H,z);r!==J&&(r=J,c(r.object)),q=f(F,N,H,B),q&&_(F,N,H,B),B!==null&&t.update(B,n.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,y(F,z,H,N),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function l(){return n.createVertexArray()}function c(F){return n.bindVertexArray(F)}function u(F){return n.deleteVertexArray(F)}function d(F,z,H,N){let B=N.wireframe===!0,q=i[z.id];q===void 0&&(q={},i[z.id]=q);let J=F.isInstancedMesh===!0?F.id:0,et=q[J];et===void 0&&(et={},q[J]=et);let L=et[H.id];L===void 0&&(L={},et[H.id]=L);let X=L[B];return X===void 0&&(X=h(l()),L[B]=X),X}function h(F){let z=[],H=[],N=[];for(let B=0;B<e;B++)z[B]=0,H[B]=0,N[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:H,attributeDivisors:N,object:F,attributes:{},index:null}}function f(F,z,H,N){let B=r.attributes,q=z.attributes,J=0,et=H.getAttributes();for(let L in et)if(et[L].location>=0){let Q=B[L],xt=q[L];if(xt===void 0&&(L==="instanceMatrix"&&F.instanceMatrix&&(xt=F.instanceMatrix),L==="instanceColor"&&F.instanceColor&&(xt=F.instanceColor)),Q===void 0||Q.attribute!==xt||xt&&Q.data!==xt.data)return!0;J++}return r.attributesNum!==J||r.index!==N}function _(F,z,H,N){let B={},q=z.attributes,J=0,et=H.getAttributes();for(let L in et)if(et[L].location>=0){let Q=q[L];Q===void 0&&(L==="instanceMatrix"&&F.instanceMatrix&&(Q=F.instanceMatrix),L==="instanceColor"&&F.instanceColor&&(Q=F.instanceColor));let xt={};xt.attribute=Q,Q&&Q.data&&(xt.data=Q.data),B[L]=xt,J++}r.attributes=B,r.attributesNum=J,r.index=N}function S(){let F=r.newAttributes;for(let z=0,H=F.length;z<H;z++)F[z]=0}function g(F){p(F,0)}function p(F,z){let H=r.newAttributes,N=r.enabledAttributes,B=r.attributeDivisors;H[F]=1,N[F]===0&&(n.enableVertexAttribArray(F),N[F]=1),B[F]!==z&&(n.vertexAttribDivisor(F,z),B[F]=z)}function A(){let F=r.newAttributes,z=r.enabledAttributes;for(let H=0,N=z.length;H<N;H++)z[H]!==F[H]&&(n.disableVertexAttribArray(H),z[H]=0)}function R(F,z,H,N,B,q,J){J===!0?n.vertexAttribIPointer(F,z,H,B,q):n.vertexAttribPointer(F,z,H,N,B,q)}function y(F,z,H,N){S();let B=N.attributes,q=H.getAttributes(),J=z.defaultAttributeValues;for(let et in q){let L=q[et];if(L.location>=0){let X=B[et];if(X===void 0&&(et==="instanceMatrix"&&F.instanceMatrix&&(X=F.instanceMatrix),et==="instanceColor"&&F.instanceColor&&(X=F.instanceColor)),X!==void 0){let Q=X.normalized,xt=X.itemSize,St=t.get(X);if(St===void 0)continue;let ie=St.buffer,Bt=St.type,Mt=St.bytesPerElement,Y=Bt===n.INT||Bt===n.UNSIGNED_INT||X.gpuType===el;if(X.isInterleavedBufferAttribute){let K=X.data,it=K.stride,Et=X.offset;if(K.isInstancedInterleavedBuffer){for(let ot=0;ot<L.locationSize;ot++)p(L.location+ot,K.meshPerAttribute);F.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ot=0;ot<L.locationSize;ot++)g(L.location+ot);n.bindBuffer(n.ARRAY_BUFFER,ie);for(let ot=0;ot<L.locationSize;ot++)R(L.location+ot,xt/L.locationSize,Bt,Q,it*Mt,(Et+xt/L.locationSize*ot)*Mt,Y)}else{if(X.isInstancedBufferAttribute){for(let K=0;K<L.locationSize;K++)p(L.location+K,X.meshPerAttribute);F.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let K=0;K<L.locationSize;K++)g(L.location+K);n.bindBuffer(n.ARRAY_BUFFER,ie);for(let K=0;K<L.locationSize;K++)R(L.location+K,xt/L.locationSize,Bt,Q,xt*Mt,xt/L.locationSize*K*Mt,Y)}}else if(J!==void 0){let Q=J[et];if(Q!==void 0)switch(Q.length){case 2:n.vertexAttrib2fv(L.location,Q);break;case 3:n.vertexAttrib3fv(L.location,Q);break;case 4:n.vertexAttrib4fv(L.location,Q);break;default:n.vertexAttrib1fv(L.location,Q)}}}}A()}function T(){E();for(let F in i){let z=i[F];for(let H in z){let N=z[H];for(let B in N){let q=N[B];for(let J in q)u(q[J].object),delete q[J];delete N[B]}}delete i[F]}}function M(F){if(i[F.id]===void 0)return;let z=i[F.id];for(let H in z){let N=z[H];for(let B in N){let q=N[B];for(let J in q)u(q[J].object),delete q[J];delete N[B]}}delete i[F.id]}function w(F){for(let z in i){let H=i[z];for(let N in H){let B=H[N];if(B[F.id]===void 0)continue;let q=B[F.id];for(let J in q)u(q[J].object),delete q[J];delete B[F.id]}}}function x(F){for(let z in i){let H=i[z],N=F.isInstancedMesh===!0?F.id:0,B=H[N];if(B!==void 0){for(let q in B){let J=B[q];for(let et in J)u(J[et].object),delete J[et];delete B[q]}delete H[N],Object.keys(H).length===0&&delete i[z]}}}function E(){D(),o=!0,r!==s&&(r=s,c(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:D,dispose:T,releaseStatesOfGeometry:M,releaseStatesOfObject:x,releaseStatesOfProgram:w,initAttributes:S,enableAttribute:g,disableUnusedAttributes:A}}function A0(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function o(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),e.update(c,i,u))}function a(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let f=0;f<u;f++)h+=c[f];e.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function E0(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==cn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){let x=w===Xn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==dn&&w!==ln&&!x&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",u=l(c);u!==c&&(kt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&kt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),R=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),M=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:A,maxVaryings:R,maxFragmentUniforms:y,maxSamples:T,samples:M}}function w0(n){let t=this,e=null,i=0,s=!1,r=!1,o=new Gn,a=new qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||i!==0||s;return s=h,i=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,f){let _=d.clippingPlanes,S=d.clipIntersection,g=d.clipShadows,p=n.get(d);if(!s||_===null||_.length===0||r&&!g)r?u(null):c();else{let A=r?0:i,R=A*4,y=p.clippingState||null;l.value=y,y=u(_,h,R,f);for(let T=0;T!==R;++T)y[T]=e[T];p.clippingState=y,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,h,f,_){let S=d!==null?d.length:0,g=null;if(S!==0){if(g=l.value,_!==!0||g===null){let p=f+S*4,A=h.matrixWorldInverse;a.getNormalMatrix(A),(g===null||g.length<p)&&(g=new Float32Array(p));for(let R=0,y=f;R!==S;++R,y+=4)o.copy(d[R]).applyMatrix4(A,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,g}}var js=4,C0=6,R0=20,I0=256,lo=new Gi,Nf=new Jt,Lh=null,Dh=0,Nh=0,Uh=!1,P0=new G,us=new G,Gl=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){let{size:o=256,position:a=P0}=r;Lh=this._renderer.getRenderTarget(),Dh=this._renderer.getActiveCubeFace(),Nh=this._renderer.getActiveMipmapLevel(),Uh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Of(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ff(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Lh,Dh,Nh),this._renderer.xr.enabled=Uh,t.scissorTest=!1,Qs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Wi||t.mapping===cs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Lh=this._renderer.getRenderTarget(),Dh=this._renderer.getActiveCubeFace(),Nh=this._renderer.getActiveMipmapLevel(),Uh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ke,minFilter:ke,generateMipmaps:!1,type:Xn,format:cn,colorSpace:Ir,depthBuffer:!1},s=Uf(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Uf(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=L0(r)),this._blurMaterial=N0(r,t,e),this._ggxMaterial=D0(r,t,e)}return s}_compileMaterial(t){let e=new $e(new On,t);this._renderer.compile(e,lo)}_sceneToCubeUV(t,e,i,s,r){let l=new on(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Nf),d.toneMapping=Wn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new $e(new Bi,new Br({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1})));let S=this._backgroundBox,g=S.material,p=!1,A=t.background;A?A.isColor&&(g.color.copy(A),t.background=null,p=!0):(g.color.copy(Nf),p=!0);for(let R=0;R<6;R++){let y=R%3;y===0?(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[R],r.y,r.z)):y===1?(l.up.set(0,0,c[R]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[R],r.z)):(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[R]));let T=this._cubeSize;Qs(s,y*T,R>2?T:0,T,T),d.setRenderTarget(s),p&&d.render(S,l),d.render(t,l)}d.toneMapping=f,d.autoClear=h,t.background=A}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===Wi||t.mapping===cs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Of()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ff());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Qs(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,lo)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let l=o.uniforms,c=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=c*1.25,f=d*h,{_lodMax:_}=this,S=this._sizeLods[i],g=3*S*(i>_-js?i-_+js:0),p=4*(this._cubeSize-S);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=_-e,Qs(r,g,p,3*S,2*S),s.setRenderTarget(r),s.render(a,lo),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=_-i,Qs(t,g,p,3*S,2*S),s.setRenderTarget(t),s.render(a,lo)}_blur(t,e,i,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,o),this._blurPass(r,t,i,i,o)}_blurPass(t,e,i,s,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[s];l.material=a;let c=a.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let u=this._sizeLods[s],d=3*u*(s>this._lodMax-js?s-this._lodMax+js:0),h=4*(this._cubeSize-u);Qs(e,d,h,3*u,2*u),o.setRenderTarget(e),o.render(l,lo)}};function L0(n){let t=[],e=[],i=n,s=n-js+1+C0;for(let r=0;r<s;r++){let o=Math.pow(2,i);t.push(o);let a=1/(o-2),l=-a,c=1+a,u=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,h=6,f=3,_=new Float32Array(f*h*d),S=new Float32Array(f*h*d);for(let p=0;p<d;p++){let A=p%3*2/3-1,R=p>2?0:-1,y=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];_.set(y,f*h*p);for(let T=0;T<h;T++){let M=u[T*2]*2-1,w=u[T*2+1]*2-1;p===0?us.set(1,w,M):p===1?us.set(-M,1,-w):p===2?us.set(-M,w,1):p===3?us.set(-1,w,-M):p===4?us.set(-M,-1,w):us.set(M,w,-1),us.toArray(S,(p*h+T)*f)}}let g=new On;g.setAttribute("position",new je(_,f)),g.setAttribute("outputDirection",new je(S,f)),e.push(new $e(g,null)),i>js&&i--}return{lodMeshes:e,sizeLods:t}}function Uf(n,t,e){let i=new un(n,t,e);return i.texture.mapping=Qr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Qs(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function D0(n,t,e){return new vn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:I0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Xl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function N0(n,t,e){return new vn({name:"SphericalGaussianBlur",defines:{SAMPLES:R0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Xl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function Ff(){return new vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function Of(){return new vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function Xl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Hl=class extends un{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Gr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Bi(5,5,5),r=new vn({name:"CubemapFromEquirect",uniforms:hs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:tn,blending:si});r.uniforms.tEquirect.value=e;let o=new $e(s,r),a=e.minFilter;return e.minFilter===Xi&&(e.minFilter=ke),new Za(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}};function U0(n){let t=new WeakMap,e=new WeakMap,i=null;function s(h,f=!1){return h==null?null:f?o(h):r(h)}function r(h){if(h&&h.isTexture){let f=h.mapping;if(f===Qa||f===ja)if(t.has(h)){let _=t.get(h).texture;return a(_,h.mapping)}else{let _=h.image;if(_&&_.height>0){let S=new Hl(_.height);return S.fromEquirectangularTexture(n,h),t.set(h,S),h.addEventListener("dispose",c),a(S.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){let f=h.mapping,_=f===Qa||f===ja,S=f===Wi||f===cs;if(_||S){let g=e.get(h),p=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return i===null&&(i=new Gl(n)),g=_?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),g.texture;if(g!==void 0)return g.texture;{let A=h.image;return _&&A&&A.height>0||S&&A&&l(A)?(i===null&&(i=new Gl(n)),g=_?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function a(h,f){return f===Qa?h.mapping=Wi:f===ja&&(h.mapping=cs),h}function l(h){let f=0,_=6;for(let S=0;S<_;S++)h[S]!==void 0&&f++;return f===_}function c(h){let f=h.target;f.removeEventListener("dispose",c);let _=t.get(f);_!==void 0&&(t.delete(f),_.dispose())}function u(h){let f=h.target;f.removeEventListener("dispose",u);let _=e.get(f);_!==void 0&&(e.delete(f),_.dispose())}function d(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function F0(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&as("WebGLRenderer: "+i+" extension not supported."),s}}}function O0(n,t,e,i){let s={},r=new WeakMap;function o(d){let h=d.target;h.index!==null&&t.remove(h.index);for(let _ in h.attributes)t.remove(h.attributes[_]);h.removeEventListener("dispose",o),delete s[h.id];let f=r.get(h);f&&(t.remove(f),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function l(d){let h=d.attributes;for(let f in h)t.update(h[f],n.ARRAY_BUFFER)}function c(d){let h=[],f=d.index,_=d.attributes.position,S=0;if(_===void 0)return;if(f!==null){let A=f.array;S=f.version;for(let R=0,y=A.length;R<y;R+=3){let T=A[R+0],M=A[R+1],w=A[R+2];h.push(T,M,M,w,w,T)}}else{let A=_.array;S=_.version;for(let R=0,y=A.length/3-1;R<y;R+=3){let T=R+0,M=R+1,w=R+2;h.push(T,M,M,w,w,T)}}let g=new(_.count>=65535?Or:Fr)(h,1);g.version=S;let p=r.get(d);p&&t.remove(p),r.set(d,g)}function u(d){let h=r.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function B0(n,t,e){let i;function s(d){i=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,h){n.drawElements(i,h,r,d*o),e.update(h,i,1)}function c(d,h,f){f!==0&&(n.drawElementsInstanced(i,h,r,d*o,f),e.update(h,i,f))}function u(d,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,d,0,f);let S=0;for(let g=0;g<f;g++)S+=h[g];e.update(S,i,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function z0(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:Gt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function V0(n,t,e){let i=new WeakMap,s=new be;function r(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,h=i.get(a);if(h===void 0||h.count!==d){let E=function(){w.dispose(),i.delete(a),a.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();let f=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,S=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],A=a.morphAttributes.color||[],R=0;f===!0&&(R=1),_===!0&&(R=2),S===!0&&(R=3);let y=a.attributes.position.count*R,T=1;y>t.maxTextureSize&&(T=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let M=new Float32Array(y*T*4*d),w=new Dr(M,y,T,d);w.type=ln,w.needsUpdate=!0;let x=R*4;for(let D=0;D<d;D++){let F=g[D],z=p[D],H=A[D],N=y*T*4*D;for(let B=0;B<F.count;B++){let q=B*x;f===!0&&(s.fromBufferAttribute(F,B),M[N+q+0]=s.x,M[N+q+1]=s.y,M[N+q+2]=s.z,M[N+q+3]=0),_===!0&&(s.fromBufferAttribute(z,B),M[N+q+4]=s.x,M[N+q+5]=s.y,M[N+q+6]=s.z,M[N+q+7]=0),S===!0&&(s.fromBufferAttribute(H,B),M[N+q+8]=s.x,M[N+q+9]=s.y,M[N+q+10]=s.z,M[N+q+11]=H.itemSize===4?s.w:1)}}h={count:d,texture:w,size:new le(y,T)},i.set(a,h),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let f=0;for(let S=0;S<c.length;S++)f+=c[S];let _=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function k0(n,t,e,i,s){let r=new WeakMap;function o(c){let u=s.render.frame,d=c.geometry,h=t.get(c,d);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return h}function a(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}var G0={[ah]:"LINEAR_TONE_MAPPING",[lh]:"REINHARD_TONE_MAPPING",[ch]:"CINEON_TONE_MAPPING",[hh]:"ACES_FILMIC_TONE_MAPPING",[dh]:"AGX_TONE_MAPPING",[fh]:"NEUTRAL_TONE_MAPPING",[uh]:"CUSTOM_TONE_MAPPING"};function H0(n,t,e,i,s,r){let o=new un(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new On;c.setAttribute("position",new Nn([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Nn([0,2,0,0,2,0],2));let u=new Na({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new $e(c,u),h=new Gi(-1,1,1,-1,0,1),f=null,_=null,S=!1,g,p=null,A=[],R=!1;this.setSize=function(y,T){o.setSize(y,T),a!==null&&a.setSize(y,T),l!==null&&l.setSize(y,T);for(let M=0;M<A.length;M++){let w=A[M];w.setSize&&w.setSize(y,T)}},this.setEffects=function(y){A=y,R=A.length>0&&A[0].isRenderPass===!0;let T=o.width,M=o.height;A.length>0&&a===null&&(a=new un(T,M,{type:Xn,depthBuffer:!1,stencilBuffer:!1}),l=new un(T,M,{type:Xn,depthBuffer:!1,stencilBuffer:!1}));for(let w=0;w<A.length;w++){let x=A[w];x.setSize&&x.setSize(T,M)}},this.begin=function(y,T){if(S||y.toneMapping===Wn&&A.length===0)return!1;if(p=T,T!==null){let M=T.width,w=T.height;(o.width!==M||o.height!==w)&&this.setSize(M,w)}return R===!1&&y.setRenderTarget(o),g=y.toneMapping,y.toneMapping=Wn,!0},this.hasRenderPass=function(){return R},this.end=function(y,T){y.toneMapping=g,S=!0;let M=o,w=a;for(let x=0;x<A.length;x++){let E=A[x];E.enabled!==!1&&(E.render(y,w,M,T),E.needsSwap!==!1&&(M=w,w=w===a?l:a))}if(f!==y.outputColorSpace||_!==y.toneMapping){f=y.outputColorSpace,_=y.toneMapping,u.defines={},oe.getTransfer(f)===pe&&(u.defines.SRGB_TRANSFER="");let x=G0[_];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=M.texture,y.setRenderTarget(p),y.render(d,h),p=null,S=!1},this.isCompositing=function(){return S},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var ip=new hn,Bh=new Oi(1,1),sp=new Dr,rp=new Ia,op=new Gr,Bf=[],zf=[],Vf=new Float32Array(16),kf=new Float32Array(9),Gf=new Float32Array(4);function er(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Bf[s];if(r===void 0&&(r=new Float32Array(s),Bf[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ne(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ue(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function ql(n,t){let e=zf[t];e===void 0&&(e=new Int32Array(t),zf[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function W0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function X0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;n.uniform2fv(this.addr,t),Ue(e,t)}}function q0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ne(e,t))return;n.uniform3fv(this.addr,t),Ue(e,t)}}function Y0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;n.uniform4fv(this.addr,t),Ue(e,t)}}function Z0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ne(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,i))return;Gf.set(i),n.uniformMatrix2fv(this.addr,!1,Gf),Ue(e,i)}}function J0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ne(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,i))return;kf.set(i),n.uniformMatrix3fv(this.addr,!1,kf),Ue(e,i)}}function $0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ne(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,i))return;Vf.set(i),n.uniformMatrix4fv(this.addr,!1,Vf),Ue(e,i)}}function K0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Q0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;n.uniform2iv(this.addr,t),Ue(e,t)}}function j0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;n.uniform3iv(this.addr,t),Ue(e,t)}}function tx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;n.uniform4iv(this.addr,t),Ue(e,t)}}function ex(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function nx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;n.uniform2uiv(this.addr,t),Ue(e,t)}}function ix(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;n.uniform3uiv(this.addr,t),Ue(e,t)}}function sx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;n.uniform4uiv(this.addr,t),Ue(e,t)}}function rx(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Bh.compareFunction=e.isReversedDepthBuffer()?zl:Bl,r=Bh):r=ip,e.setTexture2D(t||r,s)}function ox(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||rp,s)}function ax(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||op,s)}function lx(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||sp,s)}function cx(n){switch(n){case 5126:return W0;case 35664:return X0;case 35665:return q0;case 35666:return Y0;case 35674:return Z0;case 35675:return J0;case 35676:return $0;case 5124:case 35670:return K0;case 35667:case 35671:return Q0;case 35668:case 35672:return j0;case 35669:case 35673:return tx;case 5125:return ex;case 36294:return nx;case 36295:return ix;case 36296:return sx;case 35678:case 36198:case 36298:case 36306:case 35682:return rx;case 35679:case 36299:case 36307:return ox;case 35680:case 36300:case 36308:case 36293:return ax;case 36289:case 36303:case 36311:case 36292:return lx}}function hx(n,t){n.uniform1fv(this.addr,t)}function ux(n,t){let e=er(t,this.size,2);n.uniform2fv(this.addr,e)}function dx(n,t){let e=er(t,this.size,3);n.uniform3fv(this.addr,e)}function fx(n,t){let e=er(t,this.size,4);n.uniform4fv(this.addr,e)}function px(n,t){let e=er(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function mx(n,t){let e=er(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function gx(n,t){let e=er(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function _x(n,t){n.uniform1iv(this.addr,t)}function xx(n,t){n.uniform2iv(this.addr,t)}function vx(n,t){n.uniform3iv(this.addr,t)}function yx(n,t){n.uniform4iv(this.addr,t)}function Sx(n,t){n.uniform1uiv(this.addr,t)}function Mx(n,t){n.uniform2uiv(this.addr,t)}function bx(n,t){n.uniform3uiv(this.addr,t)}function Tx(n,t){n.uniform4uiv(this.addr,t)}function Ax(n,t,e){let i=this.cache,s=t.length,r=ql(e,s);Ne(i,r)||(n.uniform1iv(this.addr,r),Ue(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Bh:o=ip;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function Ex(n,t,e){let i=this.cache,s=t.length,r=ql(e,s);Ne(i,r)||(n.uniform1iv(this.addr,r),Ue(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||rp,r[o])}function wx(n,t,e){let i=this.cache,s=t.length,r=ql(e,s);Ne(i,r)||(n.uniform1iv(this.addr,r),Ue(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||op,r[o])}function Cx(n,t,e){let i=this.cache,s=t.length,r=ql(e,s);Ne(i,r)||(n.uniform1iv(this.addr,r),Ue(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||sp,r[o])}function Rx(n){switch(n){case 5126:return hx;case 35664:return ux;case 35665:return dx;case 35666:return fx;case 35674:return px;case 35675:return mx;case 35676:return gx;case 5124:case 35670:return _x;case 35667:case 35671:return xx;case 35668:case 35672:return vx;case 35669:case 35673:return yx;case 5125:return Sx;case 36294:return Mx;case 36295:return bx;case 36296:return Tx;case 35678:case 36198:case 36298:case 36306:case 35682:return Ax;case 35679:case 36299:case 36307:return Ex;case 35680:case 36300:case 36308:case 36293:return wx;case 36289:case 36303:case 36311:case 36292:return Cx}}var zh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=cx(e.type)}},Vh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Rx(e.type)}},kh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],i)}}},Fh=/(\w+)(\])?(\[|\.)?/g;function Hf(n,t){n.seq.push(t),n.map[t.id]=t}function Ix(n,t,e){let i=n.name,s=i.length;for(Fh.lastIndex=0;;){let r=Fh.exec(i),o=Fh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Hf(e,c===void 0?new zh(a,n,t):new Vh(a,n,t));break}else{let d=e.map[a];d===void 0&&(d=new kh(a),Hf(e,d)),e=d}}}var tr=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);Ix(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&i.push(o)}return i}};function Wf(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var Px=37297,Lx=0;function Dx(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var Xf=new qt;function Nx(n){oe._getMatrix(Xf,oe.workingColorSpace,n);let t=`mat3( ${Xf.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(n)){case Pr:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return kt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function qf(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Dx(n.getShaderSource(t),a)}else return r}function Ux(n,t){let e=Nx(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Fx={[ah]:"Linear",[lh]:"Reinhard",[ch]:"Cineon",[hh]:"ACESFilmic",[dh]:"AgX",[fh]:"Neutral",[uh]:"Custom"};function Ox(n,t){let e=Fx[t];return e===void 0?(kt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var kl=new G;function Bx(){oe.getLuminanceCoefficients(kl);let n=kl.x.toFixed(4),t=kl.y.toFixed(4),e=kl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function zx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ho).join(`
`)}function Vx(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function kx(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function ho(n){return n!==""}function Yf(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Zf(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Gx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gh(n){return n.replace(Gx,Wx)}var Hx=new Map;function Wx(n,t){let e=te[t];if(e===void 0){let i=Hx.get(t);if(i!==void 0)e=te[i],kt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Gh(e)}var Xx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jf(n){return n.replace(Xx,qx)}function qx(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function $f(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Yx={[Kr]:"SHADOWMAP_TYPE_PCF",[Zs]:"SHADOWMAP_TYPE_VSM"};function Zx(n){return Yx[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Jx={[Wi]:"ENVMAP_TYPE_CUBE",[cs]:"ENVMAP_TYPE_CUBE",[Qr]:"ENVMAP_TYPE_CUBE_UV"};function $x(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Jx[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var Kx={[cs]:"ENVMAP_MODE_REFRACTION"};function Qx(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Kx[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var jx={[Ka]:"ENVMAP_BLENDING_MULTIPLY",[ff]:"ENVMAP_BLENDING_MIX",[pf]:"ENVMAP_BLENDING_ADD"};function tv(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":jx[n.combine]||"ENVMAP_BLENDING_NONE"}function ev(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function nv(n,t,e,i){let s=n.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Zx(e),c=$x(e),u=Qx(e),d=tv(e),h=ev(e),f=zx(e),_=Vx(r),S=s.createProgram(),g,p,A=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ho).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ho).join(`
`),p.length>0&&(p+=`
`)):(g=[$f(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ho).join(`
`),p=[$f(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Wn?"#define TONE_MAPPING":"",e.toneMapping!==Wn?te.tonemapping_pars_fragment:"",e.toneMapping!==Wn?Ox("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,Ux("linearToOutputTexel",e.outputColorSpace),Bx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ho).join(`
`)),o=Gh(o),o=Yf(o,e),o=Zf(o,e),a=Gh(a),a=Yf(a,e),a=Zf(a,e),o=Jf(o),a=Jf(a),e.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Sh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Sh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let R=A+g+o,y=A+p+a,T=Wf(s,s.VERTEX_SHADER,R),M=Wf(s,s.FRAGMENT_SHADER,y);s.attachShader(S,T),s.attachShader(S,M),e.index0AttributeName!==void 0?s.bindAttribLocation(S,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function w(F){if(n.debug.checkShaderErrors){let z=s.getProgramInfoLog(S)||"",H=s.getShaderInfoLog(T)||"",N=s.getShaderInfoLog(M)||"",B=z.trim(),q=H.trim(),J=N.trim(),et=!0,L=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(et=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,S,T,M);else{let X=qf(s,T,"vertex"),Q=qf(s,M,"fragment");Gt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+B+`
`+X+`
`+Q)}else B!==""?kt("WebGLProgram: Program Info Log:",B):(q===""||J==="")&&(L=!1);L&&(F.diagnostics={runnable:et,programLog:B,vertexShader:{log:q,prefix:g},fragmentShader:{log:J,prefix:p}})}s.deleteShader(T),s.deleteShader(M),x=new tr(s,S),E=kx(s,S)}let x;this.getUniforms=function(){return x===void 0&&w(this),x};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let D=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(S,Px)),D},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Lx++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=T,this.fragmentShader=M,this}var iv=0,Hh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Wh(t),e.set(t,i)),i}},Wh=class{constructor(t){this.id=iv++,this.code=t,this.usedTimes=0}};function sv(n){return n===Yi||n===ro||n===oo}function rv(n,t,e,i,s,r){let o=new Nr,a=new Hh,l=new Set,c=[],u=new Map,d=i.logarithmicDepthBuffer,h=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return l.add(x),x===0?"uv":`uv${x}`}function S(x,E,D,F,z,H){let N=F.fog,B=z.geometry,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?F.environment:null,J=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,et=t.get(x.envMap||q,J),L=et&&et.mapping===Qr?et.image.height:null,X=f[x.type];x.precision!==null&&(h=i.getMaxPrecision(x.precision),h!==x.precision&&kt("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));let Q=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,xt=Q!==void 0?Q.length:0,St=0;B.morphAttributes.position!==void 0&&(St=1),B.morphAttributes.normal!==void 0&&(St=2),B.morphAttributes.color!==void 0&&(St=3);let ie,Bt,Mt,Y;if(X){let It=oi[X];ie=It.vertexShader,Bt=It.fragmentShader}else{ie=x.vertexShader,Bt=x.fragmentShader;let It=a.getVertexShaderStage(x),Wt=a.getFragmentShaderStage(x);a.update(x,It,Wt),Mt=It.id,Y=Wt.id}let K=n.getRenderTarget(),it=n.state.buffers.depth.getReversed(),Et=z.isInstancedMesh===!0,ot=z.isBatchedMesh===!0,ut=!!x.map,zt=!!x.matcap,Dt=!!et,Ot=!!x.aoMap,Nt=!!x.lightMap,Rt=!!x.bumpMap&&x.wireframe===!1,Yt=!!x.normalMap,ee=!!x.displacementMap,ge=!!x.emissiveMap,Xt=!!x.metalnessMap,Qt=!!x.roughnessMap,C=x.anisotropy>0,$t=x.clearcoat>0,wt=x.dispersion>0,b=x.retroreflectivity>0,m=x.iridescence>0,U=x.sheen>0,O=x.transmission>0,Z=C&&!!x.anisotropyMap,st=$t&&!!x.clearcoatMap,rt=$t&&!!x.clearcoatNormalMap,$=$t&&!!x.clearcoatRoughnessMap,j=m&&!!x.iridescenceMap,at=m&&!!x.iridescenceThicknessMap,Pt=U&&!!x.sheenColorMap,dt=U&&!!x.sheenRoughnessMap,ct=!!x.specularMap,Ct=!!x.specularColorMap,Ft=!!x.specularIntensityMap,Ut=O&&!!x.transmissionMap,P=O&&!!x.thicknessMap,ht=!!x.gradientMap,tt=!!x.alphaMap,lt=x.alphaTest>0,pt=!!x.alphaHash,nt=!!x.extensions,_t=Wn;x.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(_t=n.toneMapping);let bt={shaderID:X,shaderType:x.type,shaderName:x.name,vertexShader:ie,fragmentShader:Bt,defines:x.defines,customVertexShaderID:Mt,customFragmentShaderID:Y,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:ot,batchingColor:ot&&z._colorsTexture!==null,instancing:Et,instancingColor:Et&&z.instanceColor!==null,instancingMorph:Et&&z.morphTexture!==null,outputColorSpace:K===null?n.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:oe.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ut,matcap:zt,envMap:Dt,envMapMode:Dt&&et.mapping,envMapCubeUVHeight:L,aoMap:Ot,lightMap:Nt,bumpMap:Rt,normalMap:Yt,displacementMap:ee,emissiveMap:ge,normalMapObjectSpace:Yt&&x.normalMapType===_f,normalMapTangentSpace:Yt&&x.normalMapType===Ol,packedNormalMap:Yt&&x.normalMapType===Ol&&sv(x.normalMap.format),metalnessMap:Xt,roughnessMap:Qt,anisotropy:C,anisotropyMap:Z,clearcoat:$t,clearcoatMap:st,clearcoatNormalMap:rt,clearcoatRoughnessMap:$,dispersion:wt,retroreflection:b,iridescence:m,iridescenceMap:j,iridescenceThicknessMap:at,sheen:U,sheenColorMap:Pt,sheenRoughnessMap:dt,specularMap:ct,specularColorMap:Ct,specularIntensityMap:Ft,transmission:O,transmissionMap:Ut,thicknessMap:P,gradientMap:ht,opaque:x.transparent===!1&&x.blending===Js&&x.alphaToCoverage===!1,alphaMap:tt,alphaTest:lt,alphaHash:pt,combine:x.combine,mapUv:ut&&_(x.map.channel),aoMapUv:Ot&&_(x.aoMap.channel),lightMapUv:Nt&&_(x.lightMap.channel),bumpMapUv:Rt&&_(x.bumpMap.channel),normalMapUv:Yt&&_(x.normalMap.channel),displacementMapUv:ee&&_(x.displacementMap.channel),emissiveMapUv:ge&&_(x.emissiveMap.channel),metalnessMapUv:Xt&&_(x.metalnessMap.channel),roughnessMapUv:Qt&&_(x.roughnessMap.channel),anisotropyMapUv:Z&&_(x.anisotropyMap.channel),clearcoatMapUv:st&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:rt&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:at&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:dt&&_(x.sheenRoughnessMap.channel),specularMapUv:ct&&_(x.specularMap.channel),specularColorMapUv:Ct&&_(x.specularColorMap.channel),specularIntensityMapUv:Ft&&_(x.specularIntensityMap.channel),transmissionMapUv:Ut&&_(x.transmissionMap.channel),thicknessMapUv:P&&_(x.thicknessMap.channel),alphaMapUv:tt&&_(x.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Yt||C),vertexNormals:!!B.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!B.attributes.uv&&(ut||tt),fog:!!N,useFog:x.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||B.attributes.normal===void 0&&Yt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:it,skinning:z.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:xt,morphTextureStride:St,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:_t,decodeVideoTexture:ut&&x.map.isVideoTexture===!0&&oe.getTransfer(x.map.colorSpace)===pe,decodeVideoTextureEmissive:ge&&x.emissiveMap.isVideoTexture===!0&&oe.getTransfer(x.emissiveMap.colorSpace)===pe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===ii,flipSided:x.side===tn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:nt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(nt&&x.extensions.multiDraw===!0||ot)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return bt.vertexUv1s=l.has(1),bt.vertexUv2s=l.has(2),bt.vertexUv3s=l.has(3),l.clear(),bt}function g(x){let E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(let D in x.defines)E.push(D),E.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(p(E,x),A(E,x),E.push(n.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function p(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numSunLights),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numSunLightShadows),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function A(x,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.retroreflection&&o.enable(24),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function R(x){let E=f[x.type],D;if(E){let F=oi[E];D=Pf.clone(F.uniforms)}else D=x.uniforms;return D}function y(x,E){let D=u.get(E);return D!==void 0?++D.usedTimes:(D=new nv(n,E,x,s),c.push(D),u.set(E,D)),D}function T(x){if(--x.usedTimes===0){let E=c.indexOf(x);c[E]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function M(x){a.remove(x)}function w(){a.dispose()}return{getParameters:S,getProgramCacheKey:g,getUniforms:R,acquireProgram:y,releaseProgram:T,releaseShaderCache:M,programs:c,dispose:w}}function ov(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function av(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Kf(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Qf(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function a(h,f,_,S,g,p){let A=n[t];return A===void 0?(A={id:h.id,object:h,geometry:f,material:_,materialVariant:o(h),groupOrder:S,renderOrder:h.renderOrder,z:g,group:p},n[t]=A):(A.id=h.id,A.object=h,A.geometry=f,A.material=_,A.materialVariant=o(h),A.groupOrder=S,A.renderOrder=h.renderOrder,A.z=g,A.group=p),t++,A}function l(h,f,_,S,g,p,A){A.reversedDepth===!0&&(g=-g);let R=a(h,f,_,S,g,p);_.transmission>0?i.push(R):_.transparent===!0?s.push(R):e.push(R)}function c(h,f,_,S,g,p){let A=a(h,f,_,S,g,p);_.transmission>0?i.unshift(A):_.transparent===!0?s.unshift(A):e.unshift(A)}function u(h,f){e.length>1&&e.sort(h||av),i.length>1&&i.sort(f||Kf),s.length>1&&s.sort(f||Kf)}function d(){for(let h=t,f=n.length;h<f;h++){let _=n[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:d,sort:u}}function lv(){let n=new WeakMap;function t(i,s){let r=n.get(i),o;return r===void 0?(o=new Qf,n.set(i,[o])):s>=r.length?(o=new Qf,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function cv(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new G,color:new Jt};break;case"SpotLight":e={position:new G,direction:new G,color:new Jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new G,color:new Jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new G,skyColor:new Jt,groundColor:new Jt};break;case"RectAreaLight":e={color:new Jt,position:new G,halfWidth:new G,halfHeight:new G};break}return n[t.id]=e,e}}}function hv(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var uv=0;function dv(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function fv(n){let t=new cv,e=hv(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new G);let s=new G,r=new me,o=new me;function a(c){let u=0,d=0,h=0;for(let z=0;z<9;z++)i.probe[z].set(0,0,0);let f=0,_=0,S=0,g=0,p=0,A=0,R=0,y=0,T=0,M=0,w=0,x=0,E=0,D=0;c.sort(dv);for(let z=0,H=c.length;z<H;z++){let N=c[z],B=N.color,q=N.intensity,J=N.distance,et=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Yi?et=N.shadow.map.texture:et=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=B.r*q,d+=B.g*q,h+=B.b*q;else if(N.isLightProbe){for(let L=0;L<9;L++)i.probe[L].addScaledVector(N.sh.coefficients[L],q);D++}else if(N.isSunLight){let L=t.get(N);if(L.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let X=N.shadow,Q=e.get(N);Q.shadowIntensity=X.intensity,Q.shadowBias=X.bias,Q.shadowNormalBias=X.normalBias,Q.shadowRadius=X.radius,Q.shadowMapSize.copy(X.mapSize).multiply(X.getFrameExtents()),i.sunShadow[_]=Q,i.sunShadowMap[_]=et;let xt=X.getViewportCount();for(let St=0;St<xt;St++)i.sunShadowMatrix[S+St]=X.getMatrix(St),i.sunShadowCascade[S+St]=X._cascadeData[St];S+=xt,_++}i.sun[f]=L,f++}else if(N.isDirectionalLight){let L=t.get(N);if(L.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let X=N.shadow,Q=e.get(N);Q.shadowIntensity=X.intensity,Q.shadowBias=X.bias,Q.shadowNormalBias=X.normalBias,Q.shadowRadius=X.radius,Q.shadowMapSize=X.mapSize,i.directionalShadow[g]=Q,i.directionalShadowMap[g]=et,i.directionalShadowMatrix[g]=N.shadow.matrix,T++}i.directional[g]=L,g++}else if(N.isSpotLight){let L=t.get(N);L.position.setFromMatrixPosition(N.matrixWorld),L.color.copy(B).multiplyScalar(q),L.distance=J,L.coneCos=Math.cos(N.angle),L.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),L.decay=N.decay,i.spot[A]=L;let X=N.shadow;if(N.map&&(i.spotLightMap[x]=N.map,x++,X.updateMatrices(N),N.castShadow&&E++),i.spotLightMatrix[A]=X.matrix,N.castShadow){let Q=e.get(N);Q.shadowIntensity=X.intensity,Q.shadowBias=X.bias,Q.shadowNormalBias=X.normalBias,Q.shadowRadius=X.radius,Q.shadowMapSize=X.mapSize,i.spotShadow[A]=Q,i.spotShadowMap[A]=et,w++}A++}else if(N.isRectAreaLight){let L=t.get(N);L.color.copy(B).multiplyScalar(q),L.halfWidth.set(N.width*.5,0,0),L.halfHeight.set(0,N.height*.5,0),i.rectArea[R]=L,R++}else if(N.isPointLight){let L=t.get(N);if(L.color.copy(N.color).multiplyScalar(N.intensity),L.distance=N.distance,L.decay=N.decay,N.castShadow){let X=N.shadow,Q=e.get(N);Q.shadowIntensity=X.intensity,Q.shadowBias=X.bias,Q.shadowNormalBias=X.normalBias,Q.shadowRadius=X.radius,Q.shadowMapSize=X.mapSize,Q.shadowCameraNear=X.camera.near,Q.shadowCameraFar=X.camera.far,i.pointShadow[p]=Q,i.pointShadowMap[p]=et,i.pointShadowMatrix[p]=N.shadow.matrix,M++}i.point[p]=L,p++}else if(N.isHemisphereLight){let L=t.get(N);L.skyColor.copy(N.color).multiplyScalar(q),L.groundColor.copy(N.groundColor).multiplyScalar(q),i.hemi[y]=L,y++}}R>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ft.LTC_FLOAT_1,i.rectAreaLTC2=ft.LTC_FLOAT_2):(i.rectAreaLTC1=ft.LTC_HALF_1,i.rectAreaLTC2=ft.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;let F=i.hash;(F.sunLength!==f||F.directionalLength!==g||F.pointLength!==p||F.spotLength!==A||F.rectAreaLength!==R||F.hemiLength!==y||F.numSunShadows!==_||F.numDirectionalShadows!==T||F.numPointShadows!==M||F.numSpotShadows!==w||F.numSpotMaps!==x||F.numLightProbes!==D)&&(i.sun.length=f,i.directional.length=g,i.spot.length=A,i.rectArea.length=R,i.point.length=p,i.hemi.length=y,i.sunShadow.length=_,i.sunShadowMap.length=_,i.sunShadowMatrix.length=S,i.sunShadowCascade.length=S,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=M,i.pointShadowMap.length=M,i.pointShadowMatrix.length=M,i.spotShadow.length=w,i.spotShadowMap.length=w,i.spotLightMatrix.length=w+x-E,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=D,F.sunLength=f,F.directionalLength=g,F.pointLength=p,F.spotLength=A,F.rectAreaLength=R,F.hemiLength=y,F.numSunShadows=_,F.numDirectionalShadows=T,F.numPointShadows=M,F.numSpotShadows=w,F.numSpotMaps=x,F.numLightProbes=D,i.version=uv++)}function l(c,u){let d=0,h=0,f=0,_=0,S=0,g=0,p=u.matrixWorldInverse;for(let A=0,R=c.length;A<R;A++){let y=c[A];if(y.isSunLight){let T=i.sun[d];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(p),d++}else if(y.isDirectionalLight){let T=i.directional[h];T.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),h++}else if(y.isSpotLight){let T=i.spot[_];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(p),T.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),_++}else if(y.isRectAreaLight){let T=i.rectArea[S];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(p),o.identity(),r.copy(y.matrixWorld),r.premultiply(p),o.extractRotation(r),T.halfWidth.set(y.width*.5,0,0),T.halfHeight.set(0,y.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),S++}else if(y.isPointLight){let T=i.point[f];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){let T=i.hemi[g];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(p),g++}}}return{setup:a,setupView:l,state:i}}function jf(n){let t=new fv(n),e=[],i=[],s=[];function r(h){d.camera=h,e.length=0,i.length=0,s.length=0}function o(h){e.push(h)}function a(h){i.push(h)}function l(h){s.push(h)}function c(){t.setup(e)}function u(h){t.setupView(e,h)}let d={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function pv(n){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new jf(n),t.set(s,[a])):r>=o.length?(a=new jf(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var mv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,_v=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],xv=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],tp=new me,co=new G,Oh=new G;function vv(n,t,e){let i=new _i,s=new le,r=new le,o=new be,a=new Ua,l=new Fa,c={},u=e.maxTextureSize,d={[Hi]:tn,[tn]:Hi,[ii]:ii},h=new vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:mv,fragmentShader:gv}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let _=new On;_.setAttribute("position",new je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let S=new $e(_,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kr;let p=this.type;this.render=function(M,w,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||M.length===0)return;this.type===Yd&&(kt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Kr);let E=n.getRenderTarget(),D=n.getActiveCubeFace(),F=n.getActiveMipmapLevel(),z=n.state;z.setBlending(si),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let H=p!==this.type;H&&w.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(B=>B.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,B=M.length;N<B;N++){let q=M[N],J=q.shadow;if(J===void 0){kt("WebGLShadowMap:",q,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;s.copy(J.mapSize);let et=J.getFrameExtents();s.multiply(et),r.copy(J.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/et.x),s.x=r.x*et.x,J.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/et.y),s.y=r.y*et.y,J.mapSize.y=r.y));let L=n.state.buffers.depth.getReversed();if(J.camera._reversedDepth=L,J.map===null||H===!0){if(J.map!==null&&(J.map.depthTexture!==null&&(J.map.depthTexture.dispose(),J.map.depthTexture=null),J.map.dispose()),this.type===Zs){if(q.isPointLight){kt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}J.map=new un(s.x,s.y,{format:Yi,type:Xn,minFilter:ke,magFilter:ke,generateMipmaps:!1}),J.map.texture.name=q.name+".shadowMap",J.map.depthTexture=new Oi(s.x,s.y,ln),J.map.depthTexture.name=q.name+".shadowMapDepth",J.map.depthTexture.format=ei,J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=Be,J.map.depthTexture.magFilter=Be}else q.isPointLight?(J.map=new Hl(s.x),J.map.depthTexture=new Da(s.x,Bn)):(J.map=new un(s.x,s.y),J.map.depthTexture=new Oi(s.x,s.y,Bn)),J.map.depthTexture.name=q.name+".shadowMap",J.map.depthTexture.format=ei,this.type===Kr?(J.map.depthTexture.compareFunction=L?zl:Bl,J.map.depthTexture.minFilter=ke,J.map.depthTexture.magFilter=ke):(J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=Be,J.map.depthTexture.magFilter=Be);J.camera.updateProjectionMatrix()}J.map.isWebGLCubeRenderTarget!==!0&&(J.map.width!==s.x||J.map.height!==s.y)&&J.map.setSize(s.x,s.y);let X=J.map.isWebGLCubeRenderTarget?6:J.getViewportCount();q.isPointLight!==!0&&J.updateMatrices(q,x);for(let Q=0;Q<X;Q++){let xt=J.getCamera(Q);if(q.isPointLight){let St=J.camera,ie=J.matrix,Bt=q.distance||St.far;Bt!==St.far&&(St.far=Bt,St.updateProjectionMatrix()),co.setFromMatrixPosition(q.matrixWorld),St.position.copy(co),Oh.copy(St.position),Oh.add(_v[Q]),St.up.copy(xv[Q]),St.lookAt(Oh),St.updateMatrixWorld(),ie.makeTranslation(-co.x,-co.y,-co.z),tp.multiplyMatrices(St.projectionMatrix,St.matrixWorldInverse),J._frustum.setFromProjectionMatrix(tp,St.coordinateSystem,St.reversedDepth)}if(J.map.isWebGLCubeRenderTarget)n.setRenderTarget(J.map,Q),n.clear();else{Q===0&&(n.setRenderTarget(J.map),n.clear());let St=J.getViewport(Q);o.set(r.x*St.x,r.y*St.y,r.x*St.z,r.y*St.w),z.viewport(o)}i=J.getFrustum(Q),y(w,x,xt,q,this.type)}J.isPointLightShadow!==!0&&this.type===Zs&&A(J,x),J.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(E,D,F)};function A(M,w){let x=t.update(S);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null?M.mapPass=new un(s.x,s.y,{format:Yi,type:Xn}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),h.uniforms.shadow_pass.value=M.map.depthTexture,h.uniforms.resolution.value.set(M.map.width,M.map.height),h.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(w,null,x,h,S,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value.set(M.map.width,M.map.height),f.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(w,null,x,f,S,null)}function R(M,w,x,E){let D=null,F=x.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(F!==void 0)D=F;else if(D=x.isPointLight===!0?l:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let z=D.uuid,H=w.uuid,N=c[z];N===void 0&&(N={},c[z]=N);let B=N[H];B===void 0&&(B=D.clone(),N[H]=B,w.addEventListener("dispose",T)),D=B}if(D.visible=w.visible,D.wireframe=w.wireframe,E===Zs?D.side=w.shadowSide!==null?w.shadowSide:w.side:D.side=w.shadowSide!==null?w.shadowSide:d[w.side],D.alphaMap=w.alphaMap,D.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,D.map=w.map,D.clipShadows=w.clipShadows,D.clippingPlanes=w.clippingPlanes,D.clipIntersection=w.clipIntersection,D.displacementMap=w.displacementMap,D.displacementScale=w.displacementScale,D.displacementBias=w.displacementBias,D.wireframeLinewidth=w.wireframeLinewidth,D.linewidth=w.linewidth,x.isPointLight===!0&&D.isMeshDistanceMaterial===!0){let z=n.properties.get(D);z.light=x}return D}function y(M,w,x,E,D){if(M.visible===!1)return;if(M.layers.test(w.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&D===Zs)&&(!M.frustumCulled||M.intersectsFrustum(i))){M.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,M.matrixWorld);let H=t.update(M),N=M.material;if(Array.isArray(N)){let B=H.groups;for(let q=0,J=B.length;q<J;q++){let et=B[q],L=N[et.materialIndex];if(L&&L.visible){let X=R(M,L,E,D);M.onBeforeShadow(n,M,w,x,H,X,et),n.renderBufferDirect(x,null,H,X,M,et),M.onAfterShadow(n,M,w,x,H,X,et)}}}else if(N.visible){let B=R(M,N,E,D);M.onBeforeShadow(n,M,w,x,H,B,null),n.renderBufferDirect(x,null,H,B,M,null),M.onAfterShadow(n,M,w,x,H,B,null)}}let z=M.children;for(let H=0,N=z.length;H<N;H++)y(z[H],w,x,E,D)}function T(M){M.target.removeEventListener("dispose",T);for(let x in c){let E=c[x],D=M.target.uuid;D in E&&(E[D].dispose(),delete E[D])}}}function yv(n,t){function e(){let P=!1,ht=new be,tt=null,lt=new be(0,0,0,0);return{setMask:function(pt){tt!==pt&&!P&&(n.colorMask(pt,pt,pt,pt),tt=pt)},setLocked:function(pt){P=pt},setClear:function(pt,nt,_t,bt,It){It===!0&&(pt*=bt,nt*=bt,_t*=bt),ht.set(pt,nt,_t,bt),lt.equals(ht)===!1&&(n.clearColor(pt,nt,_t,bt),lt.copy(ht))},reset:function(){P=!1,tt=null,lt.set(-1,0,0,0)}}}function i(){let P=!1,ht=!1,tt=null,lt=null,pt=null;return{setReversed:function(nt){if(ht!==nt){let _t=t.get("EXT_clip_control");nt?_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.ZERO_TO_ONE_EXT):_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.NEGATIVE_ONE_TO_ONE_EXT),ht=nt;let bt=pt;pt=null,this.setClear(bt)}},getReversed:function(){return ht},setTest:function(nt){nt?K(n.DEPTH_TEST):it(n.DEPTH_TEST)},setMask:function(nt){tt!==nt&&!P&&(n.depthMask(nt),tt=nt)},setFunc:function(nt){if(ht&&(nt=Rf[nt]),lt!==nt){switch(nt){case _a:n.depthFunc(n.NEVER);break;case xa:n.depthFunc(n.ALWAYS);break;case va:n.depthFunc(n.LESS);break;case Hs:n.depthFunc(n.LEQUAL);break;case ya:n.depthFunc(n.EQUAL);break;case Sa:n.depthFunc(n.GEQUAL);break;case Ma:n.depthFunc(n.GREATER);break;case ba:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}lt=nt}},setLocked:function(nt){P=nt},setClear:function(nt){pt!==nt&&(pt=nt,ht&&(nt=1-nt),n.clearDepth(nt))},reset:function(){P=!1,tt=null,lt=null,pt=null,ht=!1}}}function s(){let P=!1,ht=null,tt=null,lt=null,pt=null,nt=null,_t=null,bt=null,It=null;return{setTest:function(Wt){P||(Wt?K(n.STENCIL_TEST):it(n.STENCIL_TEST))},setMask:function(Wt){ht!==Wt&&!P&&(n.stencilMask(Wt),ht=Wt)},setFunc:function(Wt,Sn,fn){(tt!==Wt||lt!==Sn||pt!==fn)&&(n.stencilFunc(Wt,Sn,fn),tt=Wt,lt=Sn,pt=fn)},setOp:function(Wt,Sn,fn){(nt!==Wt||_t!==Sn||bt!==fn)&&(n.stencilOp(Wt,Sn,fn),nt=Wt,_t=Sn,bt=fn)},setLocked:function(Wt){P=Wt},setClear:function(Wt){It!==Wt&&(n.clearStencil(Wt),It=Wt)},reset:function(){P=!1,ht=null,tt=null,lt=null,pt=null,nt=null,_t=null,bt=null,It=null}}}let r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap,u={},d={},h={},f=new WeakMap,_=[],S=null,g=!1,p=null,A=null,R=null,y=null,T=null,M=null,w=null,x=new Jt(0,0,0),E=0,D=!1,F=null,z=null,H=null,N=null,B=null,q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,et=0,L=n.getParameter(n.VERSION);L.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(L)[1]),J=et>=1):L.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(L)[1]),J=et>=2);let X=null,Q={},xt=n.getParameter(n.SCISSOR_BOX),St=n.getParameter(n.VIEWPORT),ie=new be().fromArray(xt),Bt=new be().fromArray(St);function Mt(P,ht,tt,lt){let pt=new Uint8Array(4),nt=n.createTexture();n.bindTexture(P,nt),n.texParameteri(P,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(P,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let _t=0;_t<tt;_t++)P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY?n.texImage3D(ht,0,n.RGBA,1,1,lt,0,n.RGBA,n.UNSIGNED_BYTE,pt):n.texImage2D(ht+_t,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,pt);return nt}let Y={};Y[n.TEXTURE_2D]=Mt(n.TEXTURE_2D,n.TEXTURE_2D,1),Y[n.TEXTURE_CUBE_MAP]=Mt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[n.TEXTURE_2D_ARRAY]=Mt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Y[n.TEXTURE_3D]=Mt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),K(n.DEPTH_TEST),o.setFunc(Hs),Rt(!1),Yt(eh),K(n.CULL_FACE),Ot(si);function K(P){u[P]!==!0&&(n.enable(P),u[P]=!0)}function it(P){u[P]!==!1&&(n.disable(P),u[P]=!1)}function Et(P,ht){return h[P]!==ht?(n.bindFramebuffer(P,ht),h[P]=ht,P===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=ht),P===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=ht),!0):!1}function ot(P,ht){let tt=_,lt=!1;if(P){tt=f.get(ht),tt===void 0&&(tt=[],f.set(ht,tt));let pt=P.textures;if(tt.length!==pt.length||tt[0]!==n.COLOR_ATTACHMENT0){for(let nt=0,_t=pt.length;nt<_t;nt++)tt[nt]=n.COLOR_ATTACHMENT0+nt;tt.length=pt.length,lt=!0}}else tt[0]!==n.BACK&&(tt[0]=n.BACK,lt=!0);lt&&n.drawBuffers(tt)}function ut(P){return S!==P?(n.useProgram(P),S=P,!0):!1}let zt={[ls]:n.FUNC_ADD,[Jd]:n.FUNC_SUBTRACT,[$d]:n.FUNC_REVERSE_SUBTRACT};zt[Kd]=n.MIN,zt[Qd]=n.MAX;let Dt={[jd]:n.ZERO,[tf]:n.ONE,[ef]:n.SRC_COLOR,[rh]:n.SRC_ALPHA,[lf]:n.SRC_ALPHA_SATURATE,[of]:n.DST_COLOR,[sf]:n.DST_ALPHA,[nf]:n.ONE_MINUS_SRC_COLOR,[oh]:n.ONE_MINUS_SRC_ALPHA,[af]:n.ONE_MINUS_DST_COLOR,[rf]:n.ONE_MINUS_DST_ALPHA,[cf]:n.CONSTANT_COLOR,[hf]:n.ONE_MINUS_CONSTANT_COLOR,[uf]:n.CONSTANT_ALPHA,[df]:n.ONE_MINUS_CONSTANT_ALPHA};function Ot(P,ht,tt,lt,pt,nt,_t,bt,It,Wt){if(P===si){g===!0&&(it(n.BLEND),g=!1);return}if(g===!1&&(K(n.BLEND),g=!0),P!==Zd){if(P!==p||Wt!==D){if((A!==ls||T!==ls)&&(n.blendEquation(n.FUNC_ADD),A=ls,T=ls),Wt)switch(P){case Js:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case nh:n.blendFunc(n.ONE,n.ONE);break;case ih:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case sh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Gt("WebGLState: Invalid blending: ",P);break}else switch(P){case Js:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case nh:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ih:Gt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case sh:Gt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Gt("WebGLState: Invalid blending: ",P);break}R=null,y=null,M=null,w=null,x.set(0,0,0),E=0,p=P,D=Wt}return}pt=pt||ht,nt=nt||tt,_t=_t||lt,(ht!==A||pt!==T)&&(n.blendEquationSeparate(zt[ht],zt[pt]),A=ht,T=pt),(tt!==R||lt!==y||nt!==M||_t!==w)&&(n.blendFuncSeparate(Dt[tt],Dt[lt],Dt[nt],Dt[_t]),R=tt,y=lt,M=nt,w=_t),(bt.equals(x)===!1||It!==E)&&(n.blendColor(bt.r,bt.g,bt.b,It),x.copy(bt),E=It),p=P,D=!1}function Nt(P,ht){P.side===ii?it(n.CULL_FACE):K(n.CULL_FACE);let tt=P.side===tn;ht&&(tt=!tt),Rt(tt),P.blending===Js&&P.transparent===!1?Ot(si):Ot(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),o.setFunc(P.depthFunc),o.setTest(P.depthTest),o.setMask(P.depthWrite),r.setMask(P.colorWrite);let lt=P.stencilWrite;a.setTest(lt),lt&&(a.setMask(P.stencilWriteMask),a.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),a.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),ge(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?K(n.SAMPLE_ALPHA_TO_COVERAGE):it(n.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(P){F!==P&&(P?n.frontFace(n.CW):n.frontFace(n.CCW),F=P)}function Yt(P){P!==Xd?(K(n.CULL_FACE),P!==z&&(P===eh?n.cullFace(n.BACK):P===qd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):it(n.CULL_FACE),z=P}function ee(P){P!==H&&(J&&n.lineWidth(P),H=P)}function ge(P,ht,tt){P?(K(n.POLYGON_OFFSET_FILL),(N!==ht||B!==tt)&&(N=ht,B=tt,o.getReversed()&&(ht=-ht),n.polygonOffset(ht,tt))):it(n.POLYGON_OFFSET_FILL)}function Xt(P){P?K(n.SCISSOR_TEST):it(n.SCISSOR_TEST)}function Qt(P){P===void 0&&(P=n.TEXTURE0+q-1),X!==P&&(n.activeTexture(P),X=P)}function C(P,ht,tt){tt===void 0&&(X===null?tt=n.TEXTURE0+q-1:tt=X);let lt=Q[tt];lt===void 0&&(lt={type:void 0,texture:void 0},Q[tt]=lt),(lt.type!==P||lt.texture!==ht)&&(X!==tt&&(n.activeTexture(tt),X=tt),n.bindTexture(P,ht||Y[P]),lt.type=P,lt.texture=ht)}function $t(){let P=Q[X];P!==void 0&&P.type!==void 0&&(n.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function wt(){try{n.compressedTexImage2D(...arguments)}catch(P){Gt("WebGLState:",P)}}function b(){try{n.compressedTexImage3D(...arguments)}catch(P){Gt("WebGLState:",P)}}function m(){try{n.texSubImage2D(...arguments)}catch(P){Gt("WebGLState:",P)}}function U(){try{n.texSubImage3D(...arguments)}catch(P){Gt("WebGLState:",P)}}function O(){try{n.compressedTexSubImage2D(...arguments)}catch(P){Gt("WebGLState:",P)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(P){Gt("WebGLState:",P)}}function st(){try{n.texStorage2D(...arguments)}catch(P){Gt("WebGLState:",P)}}function rt(){try{n.texStorage3D(...arguments)}catch(P){Gt("WebGLState:",P)}}function $(){try{n.texImage2D(...arguments)}catch(P){Gt("WebGLState:",P)}}function j(){try{n.texImage3D(...arguments)}catch(P){Gt("WebGLState:",P)}}function at(P){return d[P]!==void 0?d[P]:n.getParameter(P)}function Pt(P,ht){d[P]!==ht&&(n.pixelStorei(P,ht),d[P]=ht)}function dt(P){ie.equals(P)===!1&&(n.scissor(P.x,P.y,P.z,P.w),ie.copy(P))}function ct(P){Bt.equals(P)===!1&&(n.viewport(P.x,P.y,P.z,P.w),Bt.copy(P))}function Ct(P,ht){let tt=c.get(ht);tt===void 0&&(tt=new WeakMap,c.set(ht,tt));let lt=tt.get(P);lt===void 0&&(lt=n.getUniformBlockIndex(ht,P.name),tt.set(P,lt))}function Ft(P,ht){let lt=c.get(ht).get(P);l.get(ht)!==lt&&(n.uniformBlockBinding(ht,lt,P.__bindingPointIndex),l.set(ht,lt))}function Ut(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},X=null,Q={},h={},f=new WeakMap,_=[],S=null,g=!1,p=null,A=null,R=null,y=null,T=null,M=null,w=null,x=new Jt(0,0,0),E=0,D=!1,F=null,z=null,H=null,N=null,B=null,ie.set(0,0,n.canvas.width,n.canvas.height),Bt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:K,disable:it,bindFramebuffer:Et,drawBuffers:ot,useProgram:ut,setBlending:Ot,setMaterial:Nt,setFlipSided:Rt,setCullFace:Yt,setLineWidth:ee,setPolygonOffset:ge,setScissorTest:Xt,activeTexture:Qt,bindTexture:C,unbindTexture:$t,compressedTexImage2D:wt,compressedTexImage3D:b,texImage2D:$,texImage3D:j,pixelStorei:Pt,getParameter:at,updateUBOMapping:Ct,uniformBlockBinding:Ft,texStorage2D:st,texStorage3D:rt,texSubImage2D:m,texSubImage3D:U,compressedTexSubImage2D:O,compressedTexSubImage3D:Z,scissor:dt,viewport:ct,reset:Ut}}function Sv(n,t,e,i,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new le,u=new WeakMap,d=new Set,h,f=new WeakMap,_=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(b,m){return _?new OffscreenCanvas(b,m):Lr("canvas")}function g(b,m,U){let O=1,Z=wt(b);if((Z.width>U||Z.height>U)&&(O=U/Math.max(Z.width,Z.height)),O<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let st=Math.floor(O*Z.width),rt=Math.floor(O*Z.height);h===void 0&&(h=S(st,rt));let $=m?S(st,rt):h;return $.width=st,$.height=rt,$.getContext("2d").drawImage(b,0,0,st,rt),kt("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+st+"x"+rt+")."),$}else return"data"in b&&kt("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),b;return b}function p(b){return b.generateMipmaps}function A(b){n.generateMipmap(b)}function R(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(b,m,U,O,Z,st=!1){if(b!==null){if(n[b]!==void 0)return n[b];kt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let rt;O&&(rt=t.get("EXT_texture_norm16"),rt||kt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=m;if(m===n.RED&&(U===n.FLOAT&&($=n.R32F),U===n.HALF_FLOAT&&($=n.R16F),U===n.UNSIGNED_BYTE&&($=n.R8),U===n.UNSIGNED_SHORT&&rt&&($=rt.R16_EXT),U===n.SHORT&&rt&&($=rt.R16_SNORM_EXT)),m===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&($=n.R8UI),U===n.UNSIGNED_SHORT&&($=n.R16UI),U===n.UNSIGNED_INT&&($=n.R32UI),U===n.BYTE&&($=n.R8I),U===n.SHORT&&($=n.R16I),U===n.INT&&($=n.R32I)),m===n.RG&&(U===n.FLOAT&&($=n.RG32F),U===n.HALF_FLOAT&&($=n.RG16F),U===n.UNSIGNED_BYTE&&($=n.RG8),U===n.UNSIGNED_SHORT&&rt&&($=rt.RG16_EXT),U===n.SHORT&&rt&&($=rt.RG16_SNORM_EXT)),m===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&($=n.RG8UI),U===n.UNSIGNED_SHORT&&($=n.RG16UI),U===n.UNSIGNED_INT&&($=n.RG32UI),U===n.BYTE&&($=n.RG8I),U===n.SHORT&&($=n.RG16I),U===n.INT&&($=n.RG32I)),m===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&($=n.RGB8UI),U===n.UNSIGNED_SHORT&&($=n.RGB16UI),U===n.UNSIGNED_INT&&($=n.RGB32UI),U===n.BYTE&&($=n.RGB8I),U===n.SHORT&&($=n.RGB16I),U===n.INT&&($=n.RGB32I)),m===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&($=n.RGBA8UI),U===n.UNSIGNED_SHORT&&($=n.RGBA16UI),U===n.UNSIGNED_INT&&($=n.RGBA32UI),U===n.BYTE&&($=n.RGBA8I),U===n.SHORT&&($=n.RGBA16I),U===n.INT&&($=n.RGBA32I)),m===n.RGB&&(U===n.UNSIGNED_SHORT&&rt&&($=rt.RGB16_EXT),U===n.SHORT&&rt&&($=rt.RGB16_SNORM_EXT),U===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),m===n.RGBA){let j=st?Pr:oe.getTransfer(Z);U===n.FLOAT&&($=n.RGBA32F),U===n.HALF_FLOAT&&($=n.RGBA16F),U===n.UNSIGNED_BYTE&&($=j===pe?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT&&rt&&($=rt.RGBA16_EXT),U===n.SHORT&&rt&&($=rt.RGBA16_SNORM_EXT),U===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function T(b,m){let U;return b?m===null||m===Bn||m===Ks?U=n.DEPTH24_STENCIL8:m===ln?U=n.DEPTH32F_STENCIL8:m===$s&&(U=n.DEPTH24_STENCIL8,kt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):m===null||m===Bn||m===Ks?U=n.DEPTH_COMPONENT24:m===ln?U=n.DEPTH_COMPONENT32F:m===$s&&(U=n.DEPTH_COMPONENT16),U}function M(b,m){return p(b)===!0||b.isFramebufferTexture&&b.minFilter!==Be&&b.minFilter!==ke?Math.log2(Math.max(m.width,m.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?m.mipmaps.length:1}function w(b){let m=b.target;m.removeEventListener("dispose",w),E(m),m.isVideoTexture&&u.delete(m),m.isHTMLTexture&&d.delete(m)}function x(b){let m=b.target;m.removeEventListener("dispose",x),F(m)}function E(b){let m=i.get(b);if(m.__webglInit===void 0)return;let U=b.source,O=f.get(U);if(O){let Z=O[m.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&D(b),Object.keys(O).length===0&&f.delete(U)}i.remove(b)}function D(b){let m=i.get(b);n.deleteTexture(m.__webglTexture);let U=b.source,O=f.get(U);delete O[m.__cacheKey],o.memory.textures--}function F(b){let m=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let O=0;O<6;O++){if(Array.isArray(m.__webglFramebuffer[O]))for(let Z=0;Z<m.__webglFramebuffer[O].length;Z++)n.deleteFramebuffer(m.__webglFramebuffer[O][Z]);else n.deleteFramebuffer(m.__webglFramebuffer[O]);m.__webglDepthbuffer&&n.deleteRenderbuffer(m.__webglDepthbuffer[O])}else{if(Array.isArray(m.__webglFramebuffer))for(let O=0;O<m.__webglFramebuffer.length;O++)n.deleteFramebuffer(m.__webglFramebuffer[O]);else n.deleteFramebuffer(m.__webglFramebuffer);if(m.__webglDepthbuffer&&n.deleteRenderbuffer(m.__webglDepthbuffer),m.__webglMultisampledFramebuffer&&n.deleteFramebuffer(m.__webglMultisampledFramebuffer),m.__webglColorRenderbuffer)for(let O=0;O<m.__webglColorRenderbuffer.length;O++)m.__webglColorRenderbuffer[O]&&n.deleteRenderbuffer(m.__webglColorRenderbuffer[O]);m.__webglDepthRenderbuffer&&n.deleteRenderbuffer(m.__webglDepthRenderbuffer)}let U=b.textures;for(let O=0,Z=U.length;O<Z;O++){let st=i.get(U[O]);st.__webglTexture&&(n.deleteTexture(st.__webglTexture),o.memory.textures--),i.remove(U[O])}i.remove(b)}let z=0;function H(){z=0}function N(){return z}function B(b){z=b}function q(){let b=z;return b>=s.maxTextures&&kt("WebGLTextures: Trying to use "+(b+1)+" texture units while this GPU supports only "+s.maxTextures),z+=1,b}function J(b){let m=[];return m.push(b.wrapS),m.push(b.wrapT),m.push(b.wrapR||0),m.push(b.magFilter),m.push(b.minFilter),m.push(b.anisotropy),m.push(b.internalFormat),m.push(b.format),m.push(b.type),m.push(b.generateMipmaps),m.push(b.premultiplyAlpha),m.push(b.flipY),m.push(b.unpackAlignment),m.push(b.colorSpace),m.join()}function et(b,m){let U=i.get(b);if(b.isVideoTexture&&C(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&U.__version!==b.version){let O=b.image;if(O===null)kt("WebGLRenderer: Texture marked for update but no image data found.");else if(O.complete===!1)kt("WebGLRenderer: Texture marked for update but image is incomplete");else{it(U,b,m);return}}else b.isExternalTexture&&(U.__webglTexture=b.sourceTexture?b.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+m)}function L(b,m){let U=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){it(U,b,m);return}else b.isExternalTexture&&(U.__webglTexture=b.sourceTexture?b.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+m)}function X(b,m){let U=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){it(U,b,m);return}e.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+m)}function Q(b,m){let U=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&U.__version!==b.version){Et(U,b,m);return}e.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+m)}let xt={[Ta]:n.REPEAT,[ti]:n.CLAMP_TO_EDGE,[Aa]:n.MIRRORED_REPEAT},St={[Be]:n.NEAREST,[mf]:n.NEAREST_MIPMAP_NEAREST,[jr]:n.NEAREST_MIPMAP_LINEAR,[ke]:n.LINEAR,[tl]:n.LINEAR_MIPMAP_NEAREST,[Xi]:n.LINEAR_MIPMAP_LINEAR},ie={[vf]:n.NEVER,[Tf]:n.ALWAYS,[yf]:n.LESS,[Bl]:n.LEQUAL,[Sf]:n.EQUAL,[zl]:n.GEQUAL,[Mf]:n.GREATER,[bf]:n.NOTEQUAL};function Bt(b,m){if(m.type===ln&&t.has("OES_texture_float_linear")===!1&&(m.magFilter===ke||m.magFilter===tl||m.magFilter===jr||m.magFilter===Xi||m.minFilter===ke||m.minFilter===tl||m.minFilter===jr||m.minFilter===Xi)&&kt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,xt[m.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,xt[m.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,xt[m.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,St[m.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,St[m.minFilter]),m.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,ie[m.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(m.magFilter===Be||m.minFilter!==jr&&m.minFilter!==Xi||m.type===ln&&t.has("OES_texture_float_linear")===!1)return;if(m.anisotropy>1||i.get(m).__currentAnisotropy){let U=t.get("EXT_texture_filter_anisotropic");n.texParameterf(b,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(m.anisotropy,s.getMaxAnisotropy())),i.get(m).__currentAnisotropy=m.anisotropy}}}function Mt(b,m){let U=!1;b.__webglInit===void 0&&(b.__webglInit=!0,m.addEventListener("dispose",w));let O=m.source,Z=f.get(O);Z===void 0&&(Z={},f.set(O,Z));let st=J(m);if(st!==b.__cacheKey){Z[st]===void 0&&(Z[st]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,U=!0),Z[st].usedTimes++;let rt=Z[b.__cacheKey];rt!==void 0&&(Z[b.__cacheKey].usedTimes--,rt.usedTimes===0&&D(m)),b.__cacheKey=st,b.__webglTexture=Z[st].texture}return U}function Y(b,m,U){return Math.floor(Math.floor(b/U)/m)}function K(b,m,U,O){let st=b.updateRanges;if(st.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,m.width,m.height,U,O,m.data);else{st.sort((Pt,dt)=>Pt.start-dt.start);let rt=0;for(let Pt=1;Pt<st.length;Pt++){let dt=st[rt],ct=st[Pt],Ct=dt.start+dt.count,Ft=Y(ct.start,m.width,4),Ut=Y(dt.start,m.width,4);ct.start<=Ct+1&&Ft===Ut&&Y(ct.start+ct.count-1,m.width,4)===Ft?dt.count=Math.max(dt.count,ct.start+ct.count-dt.start):(++rt,st[rt]=ct)}st.length=rt+1;let $=e.getParameter(n.UNPACK_ROW_LENGTH),j=e.getParameter(n.UNPACK_SKIP_PIXELS),at=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,m.width);for(let Pt=0,dt=st.length;Pt<dt;Pt++){let ct=st[Pt],Ct=Math.floor(ct.start/4),Ft=Math.ceil(ct.count/4),Ut=Ct%m.width,P=Math.floor(Ct/m.width),ht=Ft,tt=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Ut),e.pixelStorei(n.UNPACK_SKIP_ROWS,P),e.texSubImage2D(n.TEXTURE_2D,0,Ut,P,ht,tt,U,O,m.data)}b.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,$),e.pixelStorei(n.UNPACK_SKIP_PIXELS,j),e.pixelStorei(n.UNPACK_SKIP_ROWS,at)}}function it(b,m,U){let O=n.TEXTURE_2D;(m.isDataArrayTexture||m.isCompressedArrayTexture)&&(O=n.TEXTURE_2D_ARRAY),m.isData3DTexture&&(O=n.TEXTURE_3D);let Z=Mt(b,m),st=m.source;e.bindTexture(O,b.__webglTexture,n.TEXTURE0+U);let rt=i.get(st);if(st.version!==rt.__version||Z===!0){if(e.activeTexture(n.TEXTURE0+U),(typeof ImageBitmap<"u"&&m.image instanceof ImageBitmap)===!1){let tt=oe.getPrimaries(oe.workingColorSpace),lt=m.colorSpace===xi?null:oe.getPrimaries(m.colorSpace),pt=m.colorSpace===xi||tt===lt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,m.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,m.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt)}e.pixelStorei(n.UNPACK_ALIGNMENT,m.unpackAlignment);let j=g(m.image,!1,s.maxTextureSize);j=$t(m,j);let at=r.convert(m.format,m.colorSpace),Pt=r.convert(m.type),dt=y(m.internalFormat,at,Pt,m.normalized,m.colorSpace,m.isVideoTexture);Bt(O,m);let ct,Ct=m.mipmaps,Ft=m.isVideoTexture!==!0,Ut=rt.__version===void 0||Z===!0,P=st.dataReady,ht=M(m,j);if(m.isDepthTexture)dt=T(m.format===qi,m.type),Ut&&(Ft?e.texStorage2D(n.TEXTURE_2D,1,dt,j.width,j.height):e.texImage2D(n.TEXTURE_2D,0,dt,j.width,j.height,0,at,Pt,null));else if(m.isDataTexture)if(Ct.length>0){Ft&&Ut&&e.texStorage2D(n.TEXTURE_2D,ht,dt,Ct[0].width,Ct[0].height);for(let tt=0,lt=Ct.length;tt<lt;tt++)ct=Ct[tt],Ft?P&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,ct.width,ct.height,at,Pt,ct.data):e.texImage2D(n.TEXTURE_2D,tt,dt,ct.width,ct.height,0,at,Pt,ct.data);m.generateMipmaps=!1}else Ft?(Ut&&e.texStorage2D(n.TEXTURE_2D,ht,dt,j.width,j.height),P&&K(m,j,at,Pt)):e.texImage2D(n.TEXTURE_2D,0,dt,j.width,j.height,0,at,Pt,j.data);else if(m.isCompressedTexture)if(m.isCompressedArrayTexture){Ft&&Ut&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ht,dt,Ct[0].width,Ct[0].height,j.depth);for(let tt=0,lt=Ct.length;tt<lt;tt++)if(ct=Ct[tt],m.format!==cn)if(at!==null)if(Ft){if(P)if(m.layerUpdates.size>0){let pt=Eh(ct.width,ct.height,m.format,m.type);for(let nt of m.layerUpdates){let _t=ct.data.subarray(nt*pt/ct.data.BYTES_PER_ELEMENT,(nt+1)*pt/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,nt,ct.width,ct.height,1,at,_t)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,ct.width,ct.height,j.depth,at,ct.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,tt,dt,ct.width,ct.height,j.depth,0,ct.data,0,0);else kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?P&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,ct.width,ct.height,j.depth,at,Pt,ct.data):e.texImage3D(n.TEXTURE_2D_ARRAY,tt,dt,ct.width,ct.height,j.depth,0,at,Pt,ct.data);m.layerUpdates.size>0&&m.clearLayerUpdates()}else{Ft&&Ut&&e.texStorage2D(n.TEXTURE_2D,ht,dt,Ct[0].width,Ct[0].height);for(let tt=0,lt=Ct.length;tt<lt;tt++)ct=Ct[tt],m.format!==cn?at!==null?Ft?P&&e.compressedTexSubImage2D(n.TEXTURE_2D,tt,0,0,ct.width,ct.height,at,ct.data):e.compressedTexImage2D(n.TEXTURE_2D,tt,dt,ct.width,ct.height,0,ct.data):kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?P&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,ct.width,ct.height,at,Pt,ct.data):e.texImage2D(n.TEXTURE_2D,tt,dt,ct.width,ct.height,0,at,Pt,ct.data)}else if(m.isDataArrayTexture)if(Ft){if(Ut&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ht,dt,j.width,j.height,j.depth),P)if(m.layerUpdates.size>0){let tt=Eh(j.width,j.height,m.format,m.type);for(let lt of m.layerUpdates){let pt=j.data.subarray(lt*tt/j.data.BYTES_PER_ELEMENT,(lt+1)*tt/j.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,lt,j.width,j.height,1,at,Pt,pt)}m.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,at,Pt,j.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,dt,j.width,j.height,j.depth,0,at,Pt,j.data);else if(m.isData3DTexture)Ft?(Ut&&e.texStorage3D(n.TEXTURE_3D,ht,dt,j.width,j.height,j.depth),P&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,at,Pt,j.data)):e.texImage3D(n.TEXTURE_3D,0,dt,j.width,j.height,j.depth,0,at,Pt,j.data);else if(m.isFramebufferTexture){if(Ut)if(Ft)e.texStorage2D(n.TEXTURE_2D,ht,dt,j.width,j.height);else{let tt=j.width,lt=j.height;for(let pt=0;pt<ht;pt++)e.texImage2D(n.TEXTURE_2D,pt,dt,tt,lt,0,at,Pt,null),tt>>=1,lt>>=1}}else if(m.isHTMLTexture){if("texElementImage2D"in n){let tt=n.canvas;if(tt.hasAttribute("layoutsubtree")||tt.setAttribute("layoutsubtree","true"),j.parentNode!==tt){tt.appendChild(j),d.add(m),tt.onpaint=lt=>{let pt=lt.changedElements;for(let nt of d)pt.includes(nt.image)&&(nt.needsUpdate=!0)},tt.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,j);else{let pt=n.RGBA,nt=n.RGBA,_t=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,pt,nt,_t,j)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ct.length>0){if(Ft&&Ut){let tt=wt(Ct[0]);e.texStorage2D(n.TEXTURE_2D,ht,dt,tt.width,tt.height)}for(let tt=0,lt=Ct.length;tt<lt;tt++)ct=Ct[tt],Ft?P&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,at,Pt,ct):e.texImage2D(n.TEXTURE_2D,tt,dt,at,Pt,ct);m.generateMipmaps=!1}else if(Ft){if(Ut){let tt=wt(j);e.texStorage2D(n.TEXTURE_2D,ht,dt,tt.width,tt.height)}P&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,at,Pt,j)}else e.texImage2D(n.TEXTURE_2D,0,dt,at,Pt,j);p(m)&&A(O),rt.__version=st.version,m.onUpdate&&m.onUpdate(m)}b.__version=m.version}function Et(b,m,U){if(m.image.length!==6)return;let O=Mt(b,m),Z=m.source;e.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+U);let st=i.get(Z);if(Z.version!==st.__version||O===!0){e.activeTexture(n.TEXTURE0+U);let rt=oe.getPrimaries(oe.workingColorSpace),$=m.colorSpace===xi?null:oe.getPrimaries(m.colorSpace),j=m.colorSpace===xi||rt===$?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,m.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,m.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,m.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);let at=m.isCompressedTexture||m.image[0].isCompressedTexture,Pt=m.image[0]&&m.image[0].isDataTexture,dt=[];for(let nt=0;nt<6;nt++)!at&&!Pt?dt[nt]=g(m.image[nt],!0,s.maxCubemapSize):dt[nt]=Pt?m.image[nt].image:m.image[nt],dt[nt]=$t(m,dt[nt]);let ct=dt[0],Ct=r.convert(m.format,m.colorSpace),Ft=r.convert(m.type),Ut=y(m.internalFormat,Ct,Ft,m.normalized,m.colorSpace),P=m.isVideoTexture!==!0,ht=st.__version===void 0||O===!0,tt=Z.dataReady,lt=M(m,ct);Bt(n.TEXTURE_CUBE_MAP,m);let pt;if(at){P&&ht&&e.texStorage2D(n.TEXTURE_CUBE_MAP,lt,Ut,ct.width,ct.height);for(let nt=0;nt<6;nt++){pt=dt[nt].mipmaps;for(let _t=0;_t<pt.length;_t++){let bt=pt[_t];m.format!==cn?Ct!==null?P?tt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,_t,0,0,bt.width,bt.height,Ct,bt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,_t,Ut,bt.width,bt.height,0,bt.data):kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,_t,0,0,bt.width,bt.height,Ct,Ft,bt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,_t,Ut,bt.width,bt.height,0,Ct,Ft,bt.data)}}}else{if(pt=m.mipmaps,P&&ht){pt.length>0&&lt++;let nt=wt(dt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,lt,Ut,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(Pt){P?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,dt[nt].width,dt[nt].height,Ct,Ft,dt[nt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Ut,dt[nt].width,dt[nt].height,0,Ct,Ft,dt[nt].data);for(let _t=0;_t<pt.length;_t++){let It=pt[_t].image[nt].image;P?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,_t+1,0,0,It.width,It.height,Ct,Ft,It.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,_t+1,Ut,It.width,It.height,0,Ct,Ft,It.data)}}else{P?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Ct,Ft,dt[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Ut,Ct,Ft,dt[nt]);for(let _t=0;_t<pt.length;_t++){let bt=pt[_t];P?tt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,_t+1,0,0,Ct,Ft,bt.image[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,_t+1,Ut,Ct,Ft,bt.image[nt])}}}p(m)&&A(n.TEXTURE_CUBE_MAP),st.__version=Z.version,m.onUpdate&&m.onUpdate(m)}b.__version=m.version}function ot(b,m,U,O,Z,st){let rt=r.convert(U.format,U.colorSpace),$=r.convert(U.type),j=y(U.internalFormat,rt,$,U.normalized,U.colorSpace),at=i.get(m),Pt=i.get(U);if(Pt.__renderTarget=m,!at.__hasExternalTextures){let dt=Math.max(1,m.width>>st),ct=Math.max(1,m.height>>st);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?e.texImage3D(Z,st,j,dt,ct,m.depth,0,rt,$,null):e.texImage2D(Z,st,j,dt,ct,0,rt,$,null)}e.bindFramebuffer(n.FRAMEBUFFER,b),Qt(m)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,O,Z,Pt.__webglTexture,0,Xt(m)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,O,Z,Pt.__webglTexture,st),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ut(b,m,U){if(n.bindRenderbuffer(n.RENDERBUFFER,b),m.depthBuffer){let O=m.depthTexture,Z=O&&O.isDepthTexture?O.type:null,st=T(m.stencilBuffer,Z),rt=m.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Qt(m)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xt(m),st,m.width,m.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xt(m),st,m.width,m.height):n.renderbufferStorage(n.RENDERBUFFER,st,m.width,m.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,b)}else{let O=m.textures;for(let Z=0;Z<O.length;Z++){let st=O[Z],rt=r.convert(st.format,st.colorSpace),$=r.convert(st.type),j=y(st.internalFormat,rt,$,st.normalized,st.colorSpace);Qt(m)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xt(m),j,m.width,m.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xt(m),j,m.width,m.height):n.renderbufferStorage(n.RENDERBUFFER,j,m.width,m.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function zt(b,m,U){let O=m.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,b),!(m.depthTexture&&m.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Z=i.get(m.depthTexture);if(Z.__renderTarget=m,(!Z.__webglTexture||m.depthTexture.image.width!==m.width||m.depthTexture.image.height!==m.height)&&(m.depthTexture.image.width=m.width,m.depthTexture.image.height=m.height,m.depthTexture.needsUpdate=!0),O){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,m.depthTexture.addEventListener("dispose",w)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Bt(n.TEXTURE_CUBE_MAP,m.depthTexture);let at=r.convert(m.depthTexture.format),Pt=r.convert(m.depthTexture.type),dt;m.depthTexture.format===ei?dt=n.DEPTH_COMPONENT24:m.depthTexture.format===qi&&(dt=n.DEPTH24_STENCIL8);for(let ct=0;ct<6;ct++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,dt,m.width,m.height,0,at,Pt,null)}}else et(m.depthTexture,0);let st=Z.__webglTexture,rt=Xt(m),$=O?n.TEXTURE_CUBE_MAP_POSITIVE_X+U:n.TEXTURE_2D,j=m.depthTexture.format===qi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(m.depthTexture.format===ei)Qt(m)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,$,st,0,rt):n.framebufferTexture2D(n.FRAMEBUFFER,j,$,st,0);else if(m.depthTexture.format===qi)Qt(m)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,$,st,0,rt):n.framebufferTexture2D(n.FRAMEBUFFER,j,$,st,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Dt(b){let m=i.get(b),U=b.isWebGLCubeRenderTarget===!0;if(m.__boundDepthTexture!==b.depthTexture){let O=b.depthTexture;if(m.__depthDisposeCallback&&m.__depthDisposeCallback(),O){let Z=()=>{delete m.__boundDepthTexture,delete m.__depthDisposeCallback,O.removeEventListener("dispose",Z)};O.addEventListener("dispose",Z),m.__depthDisposeCallback=Z}m.__boundDepthTexture=O}if(b.depthTexture&&!m.__autoAllocateDepthBuffer)if(U)for(let O=0;O<6;O++)zt(m.__webglFramebuffer[O],b,O);else{let O=b.texture.mipmaps;O&&O.length>0?zt(m.__webglFramebuffer[0],b,0):zt(m.__webglFramebuffer,b,0)}else if(U){m.__webglDepthbuffer=[];for(let O=0;O<6;O++)if(e.bindFramebuffer(n.FRAMEBUFFER,m.__webglFramebuffer[O]),m.__webglDepthbuffer[O]===void 0)m.__webglDepthbuffer[O]=n.createRenderbuffer(),ut(m.__webglDepthbuffer[O],b,!1);else{let Z=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=m.__webglDepthbuffer[O];n.bindRenderbuffer(n.RENDERBUFFER,st),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,st)}}else{let O=b.texture.mipmaps;if(O&&O.length>0?e.bindFramebuffer(n.FRAMEBUFFER,m.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,m.__webglFramebuffer),m.__webglDepthbuffer===void 0)m.__webglDepthbuffer=n.createRenderbuffer(),ut(m.__webglDepthbuffer,b,!1);else{let Z=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=m.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,st),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,st)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ot(b,m,U){let O=i.get(b);m!==void 0&&ot(O.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&Dt(b)}function Nt(b){let m=b.texture,U=i.get(b),O=i.get(m);b.addEventListener("dispose",x);let Z=b.textures,st=b.isWebGLCubeRenderTarget===!0,rt=Z.length>1;if(rt||(O.__webglTexture===void 0&&(O.__webglTexture=n.createTexture()),O.__version=m.version,o.memory.textures++),st){U.__webglFramebuffer=[];for(let $=0;$<6;$++)if(m.mipmaps&&m.mipmaps.length>0){U.__webglFramebuffer[$]=[];for(let j=0;j<m.mipmaps.length;j++)U.__webglFramebuffer[$][j]=n.createFramebuffer()}else U.__webglFramebuffer[$]=n.createFramebuffer()}else{if(m.mipmaps&&m.mipmaps.length>0){U.__webglFramebuffer=[];for(let $=0;$<m.mipmaps.length;$++)U.__webglFramebuffer[$]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(rt)for(let $=0,j=Z.length;$<j;$++){let at=i.get(Z[$]);at.__webglTexture===void 0&&(at.__webglTexture=n.createTexture(),o.memory.textures++)}if(b.samples>0&&Qt(b)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let $=0;$<Z.length;$++){let j=Z[$];U.__webglColorRenderbuffer[$]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[$]);let at=r.convert(j.format,j.colorSpace),Pt=r.convert(j.type),dt=y(j.internalFormat,at,Pt,j.normalized,j.colorSpace,b.isXRRenderTarget===!0),ct=Xt(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,ct,dt,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+$,n.RENDERBUFFER,U.__webglColorRenderbuffer[$])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),ut(U.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(st){e.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture),Bt(n.TEXTURE_CUBE_MAP,m);for(let $=0;$<6;$++)if(m.mipmaps&&m.mipmaps.length>0)for(let j=0;j<m.mipmaps.length;j++)ot(U.__webglFramebuffer[$][j],b,m,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,j);else ot(U.__webglFramebuffer[$],b,m,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);p(m)&&A(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(rt){for(let $=0,j=Z.length;$<j;$++){let at=Z[$],Pt=i.get(at),dt=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(dt=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(dt,Pt.__webglTexture),Bt(dt,at),ot(U.__webglFramebuffer,b,at,n.COLOR_ATTACHMENT0+$,dt,0),p(at)&&A(dt)}e.unbindTexture()}else{let $=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&($=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture($,O.__webglTexture),Bt($,m),m.mipmaps&&m.mipmaps.length>0)for(let j=0;j<m.mipmaps.length;j++)ot(U.__webglFramebuffer[j],b,m,n.COLOR_ATTACHMENT0,$,j);else ot(U.__webglFramebuffer,b,m,n.COLOR_ATTACHMENT0,$,0);p(m)&&A($),e.unbindTexture()}b.depthBuffer&&Dt(b)}function Rt(b){let m=b.textures;for(let U=0,O=m.length;U<O;U++){let Z=m[U];if(p(Z)){let st=R(b),rt=i.get(Z).__webglTexture;e.bindTexture(st,rt),A(st),e.unbindTexture()}}}let Yt=[],ee=[];function ge(b){if(b.samples>0){if(Qt(b)===!1){let m=b.textures,U=b.width,O=b.height,Z=n.COLOR_BUFFER_BIT,st=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,rt=i.get(b),$=m.length>1;if($)for(let at=0;at<m.length;at++)e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,rt.__webglMultisampledFramebuffer);let j=b.texture.mipmaps;j&&j.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglFramebuffer);for(let at=0;at<m.length;at++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),$){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,rt.__webglColorRenderbuffer[at]);let Pt=i.get(m[at]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Pt,0)}n.blitFramebuffer(0,0,U,O,0,0,U,O,Z,n.NEAREST),l===!0&&(Yt.length=0,ee.length=0,Yt.push(n.COLOR_ATTACHMENT0+at),b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&(Yt.push(st),ee.push(st),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ee)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Yt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),$)for(let at=0;at<m.length;at++){e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.RENDERBUFFER,rt.__webglColorRenderbuffer[at]);let Pt=i.get(m[at]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.TEXTURE_2D,Pt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&l){let m=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[m])}}}function Xt(b){return Math.min(s.maxSamples,b.samples)}function Qt(b){let m=i.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&m.__useRenderToTexture!==!1}function C(b){let m=o.render.frame;u.get(b)!==m&&(u.set(b,m),b.update())}function $t(b,m){let U=b.colorSpace,O=b.format,Z=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||U!==Ir&&U!==xi&&(oe.getTransfer(U)===pe?(O!==cn||Z!==dn)&&kt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Gt("WebGLTextures: Unsupported texture color space:",U)),m}function wt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=H,this.getTextureUnits=N,this.setTextureUnits=B,this.setTexture2D=et,this.setTexture2DArray=L,this.setTexture3D=X,this.setTextureCube=Q,this.rebindTextures=Ot,this.setupRenderTarget=Nt,this.updateRenderTargetMipmap=Rt,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=Dt,this.setupFrameBufferTexture=ot,this.useMultisampledRTT=Qt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Mv(n,t){function e(i,s=xi){let r,o=oe.getTransfer(s);if(i===dn)return n.UNSIGNED_BYTE;if(i===nl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===il)return n.UNSIGNED_SHORT_5_5_5_1;if(i===_h)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===xh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===mh)return n.BYTE;if(i===gh)return n.SHORT;if(i===$s)return n.UNSIGNED_SHORT;if(i===el)return n.INT;if(i===Bn)return n.UNSIGNED_INT;if(i===ln)return n.FLOAT;if(i===Xn)return n.HALF_FLOAT;if(i===vh)return n.ALPHA;if(i===yh)return n.RGB;if(i===cn)return n.RGBA;if(i===ei)return n.DEPTH_COMPONENT;if(i===qi)return n.DEPTH_STENCIL;if(i===sl)return n.RED;if(i===to)return n.RED_INTEGER;if(i===Yi)return n.RG;if(i===rl)return n.RG_INTEGER;if(i===ol)return n.RGBA_INTEGER;if(i===eo||i===no||i===io||i===so)if(o===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===eo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===no)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===io)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===so)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===eo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===no)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===io)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===so)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===al||i===ll||i===cl||i===hl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===al)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ll)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===cl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===hl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ul||i===dl||i===fl||i===pl||i===ml||i===ro||i===gl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ul||i===dl)return o===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===fl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===pl)return r.COMPRESSED_R11_EAC;if(i===ml)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ro)return r.COMPRESSED_RG11_EAC;if(i===gl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===_l||i===xl||i===vl||i===yl||i===Sl||i===Ml||i===bl||i===Tl||i===Al||i===El||i===wl||i===Cl||i===Rl||i===Il)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===_l)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===xl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===vl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===yl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Sl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ml)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===bl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Tl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Al)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===El)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===wl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Cl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Rl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Il)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Pl||i===Ll||i===Dl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Pl)return o===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ll)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Dl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Nl||i===Ul||i===oo||i===Fl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Nl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ul)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===oo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Fl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ks?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var bv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Tv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Xh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new Hr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new vn({vertexShader:bv,fragmentShader:Tv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new $e(new Wr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},qh=class extends ni{constructor(t,e){super();let i=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,_=null,S=typeof XRWebGLBinding<"u",g=new Xh,p={},A=e.getContextAttributes(),R=null,y=null,T=[],M=[],w=new le,x=null,E=null,D=new on;D.viewport=new be;let F=new on;F.viewport=new be;let z=[D,F],H=new Ja,N=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let K=T[Y];return K===void 0&&(K=new Ys,T[Y]=K),K.getTargetRaySpace()},this.getControllerGrip=function(Y){let K=T[Y];return K===void 0&&(K=new Ys,T[Y]=K),K.getGripSpace()},this.getHand=function(Y){let K=T[Y];return K===void 0&&(K=new Ys,T[Y]=K),K.getHandSpace()};function q(Y){let K=M.indexOf(Y.inputSource);if(K===-1)return;let it=T[K];it!==void 0&&(it.update(Y.inputSource,Y.frame,c||o),it.dispatchEvent({type:Y.type,data:Y.inputSource}))}function J(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",et);for(let Y=0;Y<T.length;Y++){let K=M[Y];K!==null&&(M[Y]=null,T[Y].disconnect(K))}N=null,B=null,g.reset();for(let Y in p)delete p[Y];if(t.setRenderTarget(R),f=null,h=null,d=null,s=null,y=null,Mt.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(w.width,w.height,!1),E!==null){let Y=E.camera;Y.fov=E.fov,Y.zoom=E.zoom,Y.updateProjectionMatrix(),E=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&kt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&kt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&S&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(R=t.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",J),s.addEventListener("inputsourceschange",et),A.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(w),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let it=null,Et=null,ot=null;A.depth&&(ot=A.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=A.stencil?qi:ei,Et=A.stencil?Ks:Bn);let ut={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(ut),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),y=new un(h.textureWidth,h.textureHeight,{format:cn,type:dn,depthTexture:new Oi(h.textureWidth,h.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:A.stencil,colorSpace:t.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let it={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,it),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new un(f.framebufferWidth,f.framebufferHeight,{format:cn,type:dn,colorSpace:t.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Mt.setContext(s),Mt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function et(Y){for(let K=0;K<Y.removed.length;K++){let it=Y.removed[K],Et=M.indexOf(it);Et>=0&&(M[Et]=null,T[Et].disconnect(it))}for(let K=0;K<Y.added.length;K++){let it=Y.added[K],Et=M.indexOf(it);if(Et===-1){for(let ut=0;ut<T.length;ut++)if(ut>=M.length){M.push(it),Et=ut;break}else if(M[ut]===null){M[ut]=it,Et=ut;break}if(Et===-1)break}let ot=T[Et];ot&&ot.connect(it)}}let L=new G,X=new G;function Q(Y,K,it){L.setFromMatrixPosition(K.matrixWorld),X.setFromMatrixPosition(it.matrixWorld);let Et=L.distanceTo(X),ot=K.projectionMatrix.elements,ut=it.projectionMatrix.elements,zt=ot[14]/(ot[10]-1),Dt=ot[14]/(ot[10]+1),Ot=(ot[9]+1)/ot[5],Nt=(ot[9]-1)/ot[5],Rt=(ot[8]-1)/ot[0],Yt=(ut[8]+1)/ut[0],ee=zt*Rt,ge=zt*Yt,Xt=Et/(-Rt+Yt),Qt=Xt*-Rt;if(K.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Qt),Y.translateZ(Xt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),ot[10]===-1)Y.projectionMatrix.copy(K.projectionMatrix),Y.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{let C=zt+Xt,$t=Dt+Xt,wt=ee-Qt,b=ge+(Et-Qt),m=Ot*Dt/$t*C,U=Nt*Dt/$t*C;Y.projectionMatrix.makePerspective(wt,b,m,U,C,$t),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function xt(Y,K){K===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(K.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let K=Y.near,it=Y.far;g.texture!==null&&(g.depthNear>0&&(K=g.depthNear),g.depthFar>0&&(it=g.depthFar)),H.near=F.near=D.near=K,H.far=F.far=D.far=it,(N!==H.near||B!==H.far)&&(s.updateRenderState({depthNear:H.near,depthFar:H.far}),N=H.near,B=H.far),H.layers.mask=Y.layers.mask|6,D.layers.mask=H.layers.mask&-5,F.layers.mask=H.layers.mask&-3;let Et=Y.parent,ot=H.cameras;xt(H,Et);for(let ut=0;ut<ot.length;ut++)xt(ot[ut],Et);ot.length===2?Q(H,D,F):H.projectionMatrix.copy(D.projectionMatrix),E===null&&Y.isPerspectiveCamera&&(E={camera:Y,fov:Y.fov,zoom:Y.zoom}),St(Y,H,Et)};function St(Y,K,it){it===null?Y.matrix.copy(K.matrixWorld):(Y.matrix.copy(it.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(K.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(K.projectionMatrix),Y.projectionMatrixInverse.copy(K.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=wa*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(H)},this.getCameraTexture=function(Y){return p[Y]};let ie=null;function Bt(Y,K){if(u=K.getViewerPose(c||o),_=K,u!==null){let it=u.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let Et=!1;it.length!==H.cameras.length&&(H.cameras.length=0,Et=!0);for(let Dt=0;Dt<it.length;Dt++){let Ot=it[Dt],Nt=null;if(f!==null)Nt=f.getViewport(Ot);else{let Yt=d.getViewSubImage(h,Ot);Nt=Yt.viewport,Dt===0&&(t.setRenderTargetTextures(y,Yt.colorTexture,Yt.depthStencilTexture),t.setRenderTarget(y))}let Rt=z[Dt];Rt===void 0&&(Rt=new on,Rt.layers.enable(Dt),Rt.viewport=new be,z[Dt]=Rt),Rt.matrix.fromArray(Ot.transform.matrix),Rt.matrix.decompose(Rt.position,Rt.quaternion,Rt.scale),Rt.projectionMatrix.fromArray(Ot.projectionMatrix),Rt.projectionMatrixInverse.copy(Rt.projectionMatrix).invert(),Rt.viewport.set(Nt.x,Nt.y,Nt.width,Nt.height),Dt===0&&(H.matrix.copy(Rt.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Et===!0&&H.cameras.push(Rt)}let ot=s.enabledFeatures;if(ot&&ot.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){d=i.getBinding();let Dt=d.getDepthInformation(it[0]);Dt&&Dt.isValid&&Dt.texture&&g.init(Dt,s.renderState)}if(ot&&ot.includes("camera-access")&&S){t.state.unbindTexture(),d=i.getBinding();for(let Dt=0;Dt<it.length;Dt++){let Ot=it[Dt].camera;if(Ot){let Nt=p[Ot];Nt||(Nt=new Hr,p[Ot]=Nt);let Rt=d.getCameraImage(Ot);Nt.sourceTexture=Rt}}}}for(let it=0;it<T.length;it++){let Et=M[it],ot=T[it];Et!==null&&ot!==void 0&&ot.update(Et,K,c||o)}ie&&ie(Y,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),_=null}let Mt=new ep;Mt.setAnimationLoop(Bt),this.setAnimationLoop=function(Y){ie=Y},this.dispose=function(){}}},Av=new me,ap=new qt;ap.set(-1,0,0,0,1,0,0,0,1);function Ev(n,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,bh(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,A,R,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),h(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(r(g,p),_(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),S(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,A,R):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===tn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===tn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let A=t.get(p),R=A.envMap,y=A.envMapRotation;R&&(g.envMap.value=R,g.envMapRotation.value.setFromMatrix4(Av.makeRotationFromEuler(y)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(ap),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,A,R){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*A,g.scale.value=R*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,A){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=A.texture,g.transmissionSamplerSize.value.set(A.width,A.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,p){p.matcap&&(g.matcap.value=p.matcap)}function S(g,p){let A=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(A.matrixWorld),g.nearDistance.value=A.shadow.camera.near,g.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function wv(n,t,e,i){let s={},r={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,T){let M=T.program;i.uniformBlockBinding(y,M)}function c(y,T){let M=s[y.id];M===void 0&&(g(y),M=u(y),s[y.id]=M,y.addEventListener("dispose",A));let w=T.program;i.updateUBOMapping(y,w);let x=t.render.frame;r[y.id]!==x&&(h(y),r[y.id]=x)}function u(y){let T=d();y.__bindingPointIndex=T;let M=n.createBuffer(),w=y.__size,x=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,w,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,M),M}function d(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return Gt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){let T=s[y.id],M=y.uniforms,w=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let x=0,E=M.length;x<E;x++){let D=M[x];if(Array.isArray(D))for(let F=0,z=D.length;F<z;F++)f(D[F],x,F,w);else f(D,x,0,w)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(y,T,M,w){if(S(y,T,M,w)===!0){let x=y.__offset,E=y.value;if(Array.isArray(E)){let D=0;for(let F=0;F<E.length;F++){let z=E[F],H=p(z);_(z,y.__data,D),typeof z!="number"&&typeof z!="boolean"&&!z.isMatrix3&&!ArrayBuffer.isView(z)&&(D+=H.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(E,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,y.__data)}}function _(y,T,M){typeof y=="number"||typeof y=="boolean"?T[0]=y:y.isMatrix3?(T[0]=y.elements[0],T[1]=y.elements[1],T[2]=y.elements[2],T[3]=0,T[4]=y.elements[3],T[5]=y.elements[4],T[6]=y.elements[5],T[7]=0,T[8]=y.elements[6],T[9]=y.elements[7],T[10]=y.elements[8],T[11]=0):ArrayBuffer.isView(y)?T.set(new y.constructor(y.buffer,y.byteOffset,T.length)):y.toArray(T,M)}function S(y,T,M,w){let x=y.value,E=T+"_"+M;if(w[E]===void 0)return typeof x=="number"||typeof x=="boolean"?w[E]=x:ArrayBuffer.isView(x)?w[E]=x.slice():w[E]=x.clone(),!0;{let D=w[E];if(typeof x=="number"||typeof x=="boolean"){if(D!==x)return w[E]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(D.equals(x)===!1)return D.copy(x),!0}}return!1}function g(y){let T=y.uniforms,M=0,w=16;for(let E=0,D=T.length;E<D;E++){let F=Array.isArray(T[E])?T[E]:[T[E]];for(let z=0,H=F.length;z<H;z++){let N=F[z],B=Array.isArray(N.value)?N.value:[N.value];for(let q=0,J=B.length;q<J;q++){let et=B[q],L=p(et),X=M%w,Q=X%L.boundary,xt=X+Q;M+=Q,xt!==0&&w-xt<L.storage&&(M+=w-xt),N.__data=new Float32Array(L.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=M,M+=L.storage}}}let x=M%w;return x>0&&(M+=w-x),y.__size=M,y.__cache={},this}function p(y){let T={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(T.boundary=4,T.storage=4):y.isVector2?(T.boundary=8,T.storage=8):y.isVector3||y.isColor?(T.boundary=16,T.storage=12):y.isVector4?(T.boundary=16,T.storage=16):y.isMatrix3?(T.boundary=48,T.storage=48):y.isMatrix4?(T.boundary=64,T.storage=64):y.isTexture?kt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(T.boundary=16,T.storage=y.byteLength):kt("WebGLRenderer: Unsupported uniform value type.",y),T}function A(y){let T=y.target;T.removeEventListener("dispose",A);let M=o.indexOf(T.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function R(){for(let y in s)n.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:l,update:c,dispose:R}}var Cv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ri=null;function Rv(){return ri===null&&(ri=new Ui(Cv,16,16,Yi,Xn),ri.name="DFG_LUT",ri.minFilter=ke,ri.magFilter=ke,ri.wrapS=ti,ri.wrapT=ti,ri.generateMipmaps=!1,ri.needsUpdate=!0),ri}var Wl=class{constructor(t={}){let{canvas:e=Ef(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=dn}=t;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=o;let S=f,g=new Set([ol,rl,to]),p=new Set([dn,Bn,$s,Ks,nl,il]),A=new Uint32Array(4),R=new Int32Array(4),y=new G,T=null,M=null,w=[],x=[],E=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,F=!1,z=null,H=null,N=null,B=null;this._outputColorSpace=Te;let q=0,J=0,et=null,L=-1,X=null,Q=new be,xt=new be,St=null,ie=new Jt(0),Bt=0,Mt=e.width,Y=e.height,K=1,it=null,Et=null,ot=new be(0,0,Mt,Y),ut=new be(0,0,Mt,Y),zt=!1,Dt=new _i,Ot=!1,Nt=!1,Rt=new me,Yt=new G,ee=new be,ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Xt=!1;function Qt(){return et===null?K:1}let C=i;function $t(v,I){return e.getContext(v,I)}let wt,b,m,U,O,Z,st,rt,$,j,at,Pt,dt,ct,Ct,Ft,Ut,P,ht,tt,lt,pt,nt;try{let v={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",It,!1),e.addEventListener("webglcontextrestored",Wt,!1),e.addEventListener("webglcontextcreationerror",Sn,!1),C===null){let I="webgl2";if(C=$t(I,v),C===null)throw $t(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}_t()}catch(v){throw e.removeEventListener("webglcontextlost",It,!1),e.removeEventListener("webglcontextrestored",Wt,!1),e.removeEventListener("webglcontextcreationerror",Sn,!1),Gt("WebGLRenderer: "+v.message),v}function _t(){wt=new F0(C),wt.init(),lt=new Mv(C,wt),b=new E0(C,wt,t,lt),m=new yv(C,wt),b.reversedDepthBuffer&&h&&m.buffers.depth.setReversed(!0),H=C.createFramebuffer(),N=C.createFramebuffer(),B=C.createFramebuffer(),U=new z0(C),O=new ov,Z=new Sv(C,wt,m,O,b,lt,U),st=new U0(D),rt=new km(C),pt=new T0(C,rt),$=new O0(C,rt,U,pt),j=new k0(C,$,rt,pt,U),P=new V0(C,b,Z),Ct=new w0(O),at=new rv(D,st,wt,b,pt,Ct),Pt=new Ev(D,O),dt=new lv,ct=new pv(wt),Ut=new b0(D,st,m,j,_,l),Ft=new vv(D,j,b),nt=new wv(C,U,b,m),ht=new A0(C,wt,U),tt=new B0(C,wt,U),U.programs=at.programs,D.capabilities=b,D.extensions=wt,D.properties=O,D.renderLists=dt,D.shadowMap=Ft,D.state=m,D.info=U}S!==dn&&(E=new H0(S,e.width,e.height,a,s,r));let bt=new qh(D,C);this.xr=bt,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let v=wt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=wt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(v){v!==void 0&&(K=v,this.setSize(Mt,Y,!1))},this.getSize=function(v){return v.set(Mt,Y)},this.setSize=function(v,I,W=!0){if(bt.isPresenting){kt("WebGLRenderer: Can't change size while VR device is presenting.");return}Mt=v,Y=I,e.width=Math.floor(v*K),e.height=Math.floor(I*K),W===!0&&(e.style.width=v+"px",e.style.height=I+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,v,I)},this.getDrawingBufferSize=function(v){return v.set(Mt*K,Y*K).floor()},this.setDrawingBufferSize=function(v,I,W){Mt=v,Y=I,K=W,e.width=Math.floor(v*W),e.height=Math.floor(I*W),this.setViewport(0,0,v,I)},this.setEffects=function(v){if(S===dn){Gt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let I=0;I<v.length;I++)if(v[I].isOutputPass===!0){kt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(Q)},this.getViewport=function(v){return v.copy(ot)},this.setViewport=function(v,I,W,V){v.isVector4?ot.set(v.x,v.y,v.z,v.w):ot.set(v,I,W,V),m.viewport(Q.copy(ot).multiplyScalar(K).round())},this.getScissor=function(v){return v.copy(ut)},this.setScissor=function(v,I,W,V){v.isVector4?ut.set(v.x,v.y,v.z,v.w):ut.set(v,I,W,V),m.scissor(xt.copy(ut).multiplyScalar(K).round())},this.getScissorTest=function(){return zt},this.setScissorTest=function(v){m.setScissorTest(zt=v)},this.setOpaqueSort=function(v){it=v},this.setTransparentSort=function(v){Et=v},this.getClearColor=function(v){return v.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor(...arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha(...arguments)},this.clear=function(v=!0,I=!0,W=!0){let V=0;if(v){let k=!1;if(et!==null){let gt=et.texture.format;k=g.has(gt)}if(k){let gt=et.texture.type,yt=p.has(gt),mt=Ut.getClearColor(),Tt=Ut.getClearAlpha(),Lt=mt.r,jt=mt.g,se=mt.b;yt?(A[0]=Lt,A[1]=jt,A[2]=se,A[3]=Tt,C.clearBufferuiv(C.COLOR,0,A)):(R[0]=Lt,R[1]=jt,R[2]=se,R[3]=Tt,C.clearBufferiv(C.COLOR,0,R))}else V|=C.COLOR_BUFFER_BIT}I&&(V|=C.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(V|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&C.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),z=v},this.dispose=function(){e.removeEventListener("webglcontextlost",It,!1),e.removeEventListener("webglcontextrestored",Wt,!1),e.removeEventListener("webglcontextcreationerror",Sn,!1),Ut.dispose(),dt.dispose(),ct.dispose(),O.dispose(),st.dispose(),j.dispose(),pt.dispose(),nt.dispose(),at.dispose(),bt.dispose(),bt.removeEventListener("sessionstart",nu),bt.removeEventListener("sessionend",iu),Ji.stop()};function It(v){v.preventDefault(),Mh("WebGLRenderer: Context Lost."),F=!0}function Wt(){Mh("WebGLRenderer: Context Restored."),F=!1;let v=U.autoReset,I=Ft.enabled,W=Ft.autoUpdate,V=Ft.needsUpdate,k=Ft.type;_t(),U.autoReset=v,Ft.enabled=I,Ft.autoUpdate=W,Ft.needsUpdate=V,Ft.type=k}function Sn(v){Gt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function fn(v){let I=v.target;I.removeEventListener("dispose",fn),yp(I)}function yp(v){Sp(v),O.remove(v)}function Sp(v){let I=O.get(v).programs;I!==void 0&&(I.forEach(function(W){at.releaseProgram(W)}),v.isShaderMaterial&&at.releaseShaderCache(v))}this.renderBufferDirect=function(v,I,W,V,k,gt){I===null&&(I=ge);let yt=k.isMesh&&k.matrixWorld.determinantAffine()<0,mt=Tp(v,I,W,V,k);m.setMaterial(V,yt);let Tt=W.index,Lt=1;if(V.wireframe===!0){if(Tt=$.getWireframeAttribute(W),Tt===void 0)return;Lt=2}let jt=W.drawRange,se=W.attributes.position,At=jt.start*Lt,de=(jt.start+jt.count)*Lt;gt!==null&&(At=Math.max(At,gt.start*Lt),de=Math.min(de,(gt.start+gt.count)*Lt)),Tt!==null?(At=Math.max(At,0),de=Math.min(de,Tt.count)):se!=null&&(At=Math.max(At,0),de=Math.min(de,se.count));let Ce=de-At;if(Ce<0||Ce===1/0)return;pt.setup(k,V,mt,W,Tt);let Se,ve=ht;if(Tt!==null&&(Se=rt.get(Tt),ve=tt,ve.setIndex(Se)),k.isMesh)V.wireframe===!0?(m.setLineWidth(V.wireframeLinewidth*Qt()),ve.setMode(C.LINES)):ve.setMode(C.TRIANGLES);else if(k.isLine){let He=V.linewidth;He===void 0&&(He=1),m.setLineWidth(He*Qt()),k.isLineSegments?ve.setMode(C.LINES):k.isLineLoop?ve.setMode(C.LINE_LOOP):ve.setMode(C.LINE_STRIP)}else k.isPoints?ve.setMode(C.POINTS):k.isSprite&&ve.setMode(C.TRIANGLES);if(k.isBatchedMesh)if(wt.get("WEBGL_multi_draw"))ve.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let He=k._multiDrawStarts,vt=k._multiDrawCounts,Qe=k._multiDrawCount,ce=Tt?rt.get(Tt).bytesPerElement:1,Mn=O.get(V).currentProgram.getUniforms();for(let qn=0;qn<Qe;qn++)Mn.setValue(C,"_gl_DrawID",qn),ve.render(He[qn]/ce,vt[qn])}else if(k.isInstancedMesh)ve.renderInstances(At,Ce,k.count);else if(W.isInstancedBufferGeometry){let He=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,vt=Math.min(W.instanceCount,He);ve.renderInstances(At,Ce,vt)}else ve.render(At,Ce)};function eu(v,I,W,V){z!==null&&v.isNodeMaterial&&z.setObject(V,v),Ot===!0&&Ct.setState(v,W,!1),v.transparent===!0&&v.side===ii&&v.forceSinglePass===!1?(v.side=tn,v.needsUpdate=!0,So(v,I,V),v.side=Hi,v.needsUpdate=!0,So(v,I,V),v.side=ii):So(v,I,V)}this.compile=function(v,I,W=null){W===null&&(W=v),z!==null&&z.renderStart(v,I,W),M=ct.get(W),M.init(I),x.push(M),W.traverseVisible(function(k){k.isLight&&k.layers.test(I.layers)&&(M.pushLight(k),k.castShadow&&M.pushShadow(k))}),v!==W&&v.traverseVisible(function(k){k.isLight&&k.layers.test(I.layers)&&(M.pushLight(k),k.castShadow&&M.pushShadow(k))}),M.setupLights(),z!==null&&z.updateLights(M.state.lightsArray),Nt=this.localClippingEnabled,Ot=Ct.init(this.clippingPlanes,Nt),Ot===!0&&Ct.setGlobalState(this.clippingPlanes,I),z!==null&&Ft.render(M.state.shadowsArray,W,I);let V=new Set;return v.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let gt=k.material;if(gt)if(Array.isArray(gt))for(let yt=0;yt<gt.length;yt++){let mt=gt[yt];eu(mt,W,I,k),V.add(mt)}else eu(gt,W,I,k),V.add(gt)}),M=x.pop(),z!==null&&z.renderEnd(),V},this.compileAsync=function(v,I,W=null){let V=this.compile(v,I,W);return new Promise(k=>{function gt(){if(V.forEach(function(yt){let Tt=O.get(yt).currentProgram;(Tt===void 0||Tt.isReady())&&V.delete(yt)}),V.size===0){k(v);return}setTimeout(gt,10)}wt.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let Ql=null;function Mp(v){Ql&&Ql(v)}function nu(){Ji.stop()}function iu(){Ji.start()}let Ji=new ep;Ji.setAnimationLoop(Mp),typeof self<"u"&&Ji.setContext(self),this.setAnimationLoop=function(v){Ql=v,bt.setAnimationLoop(v),v===null?Ji.stop():Ji.start()},bt.addEventListener("sessionstart",nu),bt.addEventListener("sessionend",iu),this.render=function(v,I){if(I!==void 0&&I.isCamera!==!0){Gt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;z!==null&&z.renderStart(v,I);let W=bt.enabled===!0&&bt.isPresenting===!0,V=E!==null&&(et===null||W)&&E.begin(D,et);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),bt.enabled===!0&&bt.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(bt.cameraAutoUpdate===!0&&bt.updateCamera(I),I=bt.getCamera()),v.isScene===!0&&v.onBeforeRender(D,v,I,et),M=ct.get(v,x.length),M.init(I),M.state.textureUnits=Z.getTextureUnits(),x.push(M),Rt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Dt.setFromProjectionMatrix(Rt,Dn,I.reversedDepth),Nt=this.localClippingEnabled,Ot=Ct.init(this.clippingPlanes,Nt),T=dt.get(v,w.length),T.init(),w.push(T),bt.enabled===!0&&bt.isPresenting===!0){let yt=D.xr.getDepthSensingMesh();yt!==null&&jl(yt,I,-1/0,D.sortObjects)}jl(v,I,0,D.sortObjects),T.finish(),z!==null&&z.updateLights(M.state.lightsArray),D.sortObjects===!0&&T.sort(it,Et),Xt=bt.enabled===!1||bt.isPresenting===!1||bt.hasDepthSensing()===!1,Xt&&Ut.addToRenderList(T,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ot===!0&&Ct.beginShadows();let k=M.state.shadowsArray;if(Ft.render(k,v,I),Ot===!0&&Ct.endShadows(),(V&&E.hasRenderPass())===!1){let yt=T.opaque,mt=T.transmissive;if(M.setupLights(),I.isArrayCamera){let Tt=I.cameras;if(mt.length>0)for(let Lt=0,jt=Tt.length;Lt<jt;Lt++){let se=Tt[Lt];ru(yt,mt,v,se)}Xt&&Ut.render(v);for(let Lt=0,jt=Tt.length;Lt<jt;Lt++){let se=Tt[Lt];su(T,v,se,se.viewport)}}else mt.length>0&&ru(yt,mt,v,I),Xt&&Ut.render(v),su(T,v,I)}et!==null&&J===0&&(Z.updateMultisampleRenderTarget(et),Z.updateRenderTargetMipmap(et)),V&&E.end(D),v.isScene===!0&&v.onAfterRender(D,v,I),pt.resetDefaultState(),L=-1,X=null,x.pop(),x.length>0?(M=x[x.length-1],Z.setTextureUnits(M.state.textureUnits),Ot===!0&&Ct.setGlobalState(D.clippingPlanes,M.state.camera)):M=null,w.pop(),w.length>0?T=w[w.length-1]:T=null,z!==null&&z.renderEnd()};function jl(v,I,W,V){if(v.visible===!1)return;if(v.layers.test(I.layers)){if(v.isGroup)W=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(I);else if(v.isLightProbeGrid)M.pushLightProbeGrid(v);else if(v.isLight)M.pushLight(v),v.castShadow&&M.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(Dt)){V&&ee.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Rt);let yt=j.update(v),mt=v.material;mt.visible&&T.push(v,yt,mt,W,ee.z,null,I)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(Dt))){let yt=j.update(v),mt=v.material;if(V&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),ee.copy(v.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),ee.copy(yt.boundingSphere.center)),ee.applyMatrix4(v.matrixWorld).applyMatrix4(Rt)),Array.isArray(mt)){let Tt=yt.groups;for(let Lt=0,jt=Tt.length;Lt<jt;Lt++){let se=Tt[Lt],At=mt[se.materialIndex];At&&At.visible&&T.push(v,yt,At,W,ee.z,se,I)}}else mt.visible&&T.push(v,yt,mt,W,ee.z,null,I)}}let gt=v.children;for(let yt=0,mt=gt.length;yt<mt;yt++)jl(gt[yt],I,W,V)}function su(v,I,W,V){let{opaque:k,transmissive:gt,transparent:yt}=v;M.setupLightsView(W),Ot===!0&&Ct.setGlobalState(D.clippingPlanes,W),V&&m.viewport(Q.copy(V)),k.length>0&&yo(k,I,W),gt.length>0&&yo(gt,I,W),yt.length>0&&yo(yt,I,W),m.buffers.depth.setTest(!0),m.buffers.depth.setMask(!0),m.buffers.color.setMask(!0),m.setPolygonOffset(!1)}function ru(v,I,W,V){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[V.id]===void 0){let At=wt.has("EXT_color_buffer_half_float")||wt.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[V.id]=new un(1,1,{generateMipmaps:!0,type:At?Xn:dn,minFilter:Xi,samples:Math.max(4,b.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:oe.workingColorSpace})}let gt=M.state.transmissionRenderTarget[V.id],yt=V.viewport||Q;gt.setSize(yt.z*D.transmissionResolutionScale,yt.w*D.transmissionResolutionScale);let mt=D.getRenderTarget(),Tt=D.getActiveCubeFace(),Lt=D.getActiveMipmapLevel();D.setRenderTarget(gt),D.getClearColor(ie),Bt=D.getClearAlpha(),Bt<1&&D.setClearColor(16777215,.5),D.clear(),Xt&&Ut.render(W);let jt=D.toneMapping;D.toneMapping=Wn;let se=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),M.setupLightsView(V),Ot===!0&&Ct.setGlobalState(D.clippingPlanes,V),yo(v,W,V),Z.updateMultisampleRenderTarget(gt),Z.updateRenderTargetMipmap(gt),wt.has("WEBGL_multisampled_render_to_texture")===!1){let At=!1;for(let de=0,Ce=I.length;de<Ce;de++){let Se=I[de],{object:ve,geometry:He,material:vt,group:Qe}=Se;if(vt.side===ii&&ve.layers.test(V.layers)){let ce=vt.side;vt.side=tn,vt.needsUpdate=!0,ou(ve,W,V,He,vt,Qe),vt.side=ce,vt.needsUpdate=!0,At=!0}}At===!0&&(Z.updateMultisampleRenderTarget(gt),Z.updateRenderTargetMipmap(gt))}D.setRenderTarget(mt,Tt,Lt),D.setClearColor(ie,Bt),se!==void 0&&(V.viewport=se),D.toneMapping=jt}function yo(v,I,W){let V=I.isScene===!0?I.overrideMaterial:null;for(let k=0,gt=v.length;k<gt;k++){let yt=v[k],{object:mt,geometry:Tt,group:Lt}=yt,jt=yt.material;jt.allowOverride===!0&&V!==null&&(jt=V),mt.layers.test(W.layers)&&ou(mt,I,W,Tt,jt,Lt)}}function ou(v,I,W,V,k,gt){z!==null&&k.isNodeMaterial&&z.setObject(v,k),v.onBeforeRender(D,I,W,V,k,gt),v.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),k.onBeforeRender(D,I,W,V,v,gt),k.transparent===!0&&k.side===ii&&k.forceSinglePass===!1?(k.side=tn,k.needsUpdate=!0,D.renderBufferDirect(W,I,V,k,v,gt),k.side=Hi,k.needsUpdate=!0,D.renderBufferDirect(W,I,V,k,v,gt),k.side=ii):D.renderBufferDirect(W,I,V,k,v,gt),v.onAfterRender(D,I,W,V,k,gt)}function So(v,I,W){I.isScene!==!0&&(I=ge);let V=O.get(v),k=M.state.lights,gt=M.state.shadowsArray,yt=k.state.version,mt=at.getParameters(v,k.state,gt,I,W,M.state.lightProbeGridArray),Tt=at.getProgramCacheKey(mt),Lt=V.programs;V.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?I.environment:null,V.fog=I.fog;let jt=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;V.envMap=st.get(v.envMap||V.environment,jt),V.envMapRotation=V.environment!==null&&v.envMap===null?I.environmentRotation:v.envMapRotation,Lt===void 0&&(v.addEventListener("dispose",fn),Lt=new Map,V.programs=Lt);let se=Lt.get(Tt);if(se!==void 0){if(V.currentProgram===se&&V.lightsStateVersion===yt)return lu(v,mt),se}else mt.uniforms=at.getUniforms(v),z!==null&&v.isNodeMaterial&&z.build(v,W,mt),v.onBeforeCompile(mt,D),se=at.acquireProgram(mt,Tt),Lt.set(Tt,se),V.uniforms=mt.uniforms;let At=V.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(At.clippingPlanes=Ct.uniform),lu(v,mt),V.needsLights=Ep(v),V.lightsStateVersion=yt,V.needsLights&&(At.ambientLightColor.value=k.state.ambient,At.lightProbe.value=k.state.probe,At.sunLights.value=k.state.sun,At.sunLightShadows.value=k.state.sunShadow,At.directionalLights.value=k.state.directional,At.directionalLightShadows.value=k.state.directionalShadow,At.spotLights.value=k.state.spot,At.spotLightShadows.value=k.state.spotShadow,At.rectAreaLights.value=k.state.rectArea,At.ltc_1.value=k.state.rectAreaLTC1,At.ltc_2.value=k.state.rectAreaLTC2,At.pointLights.value=k.state.point,At.pointLightShadows.value=k.state.pointShadow,At.hemisphereLights.value=k.state.hemi,At.sunShadowMatrix.value=k.state.sunShadowMatrix,At.sunShadowCascade.value=k.state.sunShadowCascade,At.directionalShadowMatrix.value=k.state.directionalShadowMatrix,At.spotLightMatrix.value=k.state.spotLightMatrix,At.spotLightMap.value=k.state.spotLightMap,At.pointShadowMatrix.value=k.state.pointShadowMatrix),V.lightProbeGrid=M.state.lightProbeGridArray.length>0,V.currentProgram=se,V.uniformsList=null,se}function au(v){if(v.uniformsList===null){let I=v.currentProgram.getUniforms();v.uniformsList=tr.seqWithValue(I.seq,v.uniforms)}return v.uniformsList}function lu(v,I){let W=O.get(v);W.outputColorSpace=I.outputColorSpace,W.batching=I.batching,W.batchingColor=I.batchingColor,W.instancing=I.instancing,W.instancingColor=I.instancingColor,W.instancingMorph=I.instancingMorph,W.skinning=I.skinning,W.morphTargets=I.morphTargets,W.morphNormals=I.morphNormals,W.morphColors=I.morphColors,W.morphTargetsCount=I.morphTargetsCount,W.numClippingPlanes=I.numClippingPlanes,W.numIntersection=I.numClipIntersection,W.vertexAlphas=I.vertexAlphas,W.vertexTangents=I.vertexTangents,W.toneMapping=I.toneMapping}function bp(v,I){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;y.setFromMatrixPosition(I.matrixWorld);for(let W=0,V=v.length;W<V;W++){let k=v[W];if(k.texture!==null&&k.boundingBox.containsPoint(y))return k}return null}function Tp(v,I,W,V,k){I.isScene!==!0&&(I=ge),Z.resetTextureUnits();let gt=I.fog,yt=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?I.environment:null,mt=et===null?D.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:oe.workingColorSpace,Tt=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Lt=st.get(V.envMap||yt,Tt),jt=V.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,se=!!W.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),At=!!W.morphAttributes.position,de=!!W.morphAttributes.normal,Ce=!!W.morphAttributes.color,Se=Wn;V.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Se=D.toneMapping);let ve=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,He=ve!==void 0?ve.length:0,vt=O.get(V),Qe=M.state.lights;if(Ot===!0&&(Nt===!0||v!==X)){let ye=v===X&&V.id===L;Ct.setState(V,v,ye)}let ce=!1;V.version===vt.__version?(vt.needsLights&&vt.lightsStateVersion!==Qe.state.version||vt.outputColorSpace!==mt||k.isBatchedMesh&&vt.batching===!1||!k.isBatchedMesh&&vt.batching===!0||k.isBatchedMesh&&vt.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&vt.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&vt.instancing===!1||!k.isInstancedMesh&&vt.instancing===!0||k.isSkinnedMesh&&vt.skinning===!1||!k.isSkinnedMesh&&vt.skinning===!0||k.isInstancedMesh&&vt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&vt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&vt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&vt.instancingMorph===!1&&k.morphTexture!==null||vt.envMap!==Lt||V.fog===!0&&vt.fog!==gt||vt.numClippingPlanes!==void 0&&(vt.numClippingPlanes!==Ct.numPlanes||vt.numIntersection!==Ct.numIntersection)||vt.vertexAlphas!==jt||vt.vertexTangents!==se||vt.morphTargets!==At||vt.morphNormals!==de||vt.morphColors!==Ce||vt.toneMapping!==Se||vt.morphTargetsCount!==He||!!vt.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(ce=!0):(ce=!0,vt.__version=V.version);let Mn=vt.currentProgram;ce===!0&&(Mn=So(V,I,k),z&&V.isNodeMaterial&&z.onUpdateProgram(V,Mn,vt));let qn=!1,yi=!1,_s=!1,xe=Mn.getUniforms(),Ee=vt.uniforms;if(m.useProgram(Mn.program)&&(qn=!0,yi=!0,_s=!0),V.id!==L&&(L=V.id,yi=!0),vt.needsLights){let ye=bp(M.state.lightProbeGridArray,k);vt.lightProbeGrid!==ye&&(vt.lightProbeGrid=ye,yi=!0)}if(qn||X!==v){m.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),xe.setValue(C,"projectionMatrix",v.projectionMatrix),xe.setValue(C,"viewMatrix",v.matrixWorldInverse);let Mi=xe.map.cameraPosition;Mi!==void 0&&Mi.setValue(C,Yt.setFromMatrixPosition(v.matrixWorld)),b.logarithmicDepthBuffer&&xe.setValue(C,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&xe.setValue(C,"isOrthographic",v.isOrthographicCamera===!0),X!==v&&(X=v,yi=!0,_s=!0)}if(vt.needsLights&&(Qe.state.sunShadowMap.length>0&&xe.setValue(C,"sunShadowMap",Qe.state.sunShadowMap,Z),Qe.state.directionalShadowMap.length>0&&xe.setValue(C,"directionalShadowMap",Qe.state.directionalShadowMap,Z),Qe.state.spotShadowMap.length>0&&xe.setValue(C,"spotShadowMap",Qe.state.spotShadowMap,Z),Qe.state.pointShadowMap.length>0&&xe.setValue(C,"pointShadowMap",Qe.state.pointShadowMap,Z)),k.isSkinnedMesh){xe.setOptional(C,k,"bindMatrix"),xe.setOptional(C,k,"bindMatrixInverse");let ye=k.skeleton;ye&&(ye.boneTexture===null&&ye.computeBoneTexture(),xe.setValue(C,"boneTexture",ye.boneTexture,Z))}k.isBatchedMesh&&(xe.setOptional(C,k,"batchingTexture"),xe.setValue(C,"batchingTexture",k._matricesTexture,Z),xe.setOptional(C,k,"batchingIdTexture"),xe.setValue(C,"batchingIdTexture",k._indirectTexture,Z),xe.setOptional(C,k,"batchingColorTexture"),k._colorsTexture!==null&&xe.setValue(C,"batchingColorTexture",k._colorsTexture,Z));let Si=W.morphAttributes;if((Si.position!==void 0||Si.normal!==void 0||Si.color!==void 0)&&P.update(k,W,Mn),(yi||vt.receiveShadow!==k.receiveShadow)&&(vt.receiveShadow=k.receiveShadow,xe.setValue(C,"receiveShadow",k.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&I.environment!==null&&(Ee.envMapIntensity.value=I.environmentIntensity),Ee.dfgLUT!==void 0&&(Ee.dfgLUT.value=Rv()),yi){if(xe.setValue(C,"toneMappingExposure",D.toneMappingExposure),vt.needsLights&&Ap(Ee,_s),gt&&V.fog===!0&&Pt.refreshFogUniforms(Ee,gt),Pt.refreshMaterialUniforms(Ee,V,K,Y,M.state.transmissionRenderTarget[v.id]),vt.needsLights&&vt.lightProbeGrid){let ye=vt.lightProbeGrid;Ee.probesSH.value=ye.texture,Ee.probesMin.value.copy(ye.boundingBox.min),Ee.probesMax.value.copy(ye.boundingBox.max),Ee.probesResolution.value.copy(ye.resolution)}tr.upload(C,au(vt),Ee,Z)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(tr.upload(C,au(vt),Ee,Z),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&xe.setValue(C,"center",k.center),xe.setValue(C,"modelViewMatrix",k.modelViewMatrix),xe.setValue(C,"normalMatrix",k.normalMatrix),xe.setValue(C,"modelMatrix",k.matrixWorld),V.uniformsGroups!==void 0){let ye=V.uniformsGroups;for(let Mi=0,xs=ye.length;Mi<xs;Mi++){let hu=ye[Mi];nt.update(hu,Mn),nt.bind(hu,Mn)}}return Mn}function Ap(v,I){v.ambientLightColor.needsUpdate=I,v.lightProbe.needsUpdate=I,v.sunLights.needsUpdate=I,v.sunLightShadows.needsUpdate=I,v.directionalLights.needsUpdate=I,v.directionalLightShadows.needsUpdate=I,v.pointLights.needsUpdate=I,v.pointLightShadows.needsUpdate=I,v.spotLights.needsUpdate=I,v.spotLightShadows.needsUpdate=I,v.rectAreaLights.needsUpdate=I,v.hemisphereLights.needsUpdate=I}function Ep(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return J},this.getRenderTarget=function(){return et},this.setRenderTargetTextures=function(v,I,W){let V=O.get(v);V.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),O.get(v.texture).__webglTexture=I,O.get(v.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:W,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,I){let W=O.get(v);W.__webglFramebuffer=I,W.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(v,I=0,W=0){et=v,q=I,J=W;let V=null,k=!1,gt=!1;if(v){let mt=O.get(v);if(mt.__useDefaultFramebuffer!==void 0){m.bindFramebuffer(C.FRAMEBUFFER,mt.__webglFramebuffer),Q.copy(v.viewport),xt.copy(v.scissor),St=v.scissorTest,m.viewport(Q),m.scissor(xt),m.setScissorTest(St),L=-1;return}else if(mt.__webglFramebuffer===void 0)Z.setupRenderTarget(v);else if(mt.__hasExternalTextures)Z.rebindTextures(v,O.get(v.texture).__webglTexture,O.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let jt=v.depthTexture;if(mt.__boundDepthTexture!==jt){if(jt!==null&&O.has(jt)&&(v.width!==jt.image.width||v.height!==jt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(v)}}let Tt=v.texture;(Tt.isData3DTexture||Tt.isDataArrayTexture||Tt.isCompressedArrayTexture)&&(gt=!0);let Lt=O.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Lt[I])?V=Lt[I][W]:V=Lt[I],k=!0):v.samples>0&&Z.useMultisampledRTT(v)===!1?V=O.get(v).__webglMultisampledFramebuffer:Array.isArray(Lt)?V=Lt[W]:V=Lt,Q.copy(v.viewport),xt.copy(v.scissor),St=v.scissorTest}else Q.copy(ot).multiplyScalar(K).floor(),xt.copy(ut).multiplyScalar(K).floor(),St=zt;if(W!==0&&(V=H),m.bindFramebuffer(C.FRAMEBUFFER,V)&&m.drawBuffers(v,V),m.viewport(Q),m.scissor(xt),m.setScissorTest(St),k){let mt=O.get(v.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+I,mt.__webglTexture,W)}else if(gt){let mt=I;for(let Tt=0;Tt<v.textures.length;Tt++){let Lt=O.get(v.textures[Tt]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Tt,Lt.__webglTexture,W,mt)}}else if(v!==null&&W!==0){let mt=O.get(v.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,mt.__webglTexture,W)}L=-1};function cu(v){let I=O.get(v);return(I.__readFormat!==v.format||I.__readType!==v.type)&&(I.__readFormat=v.format,I.__readType=v.type,I.__formatReadable=b.textureFormatReadable(v.format),I.__typeReadable=b.textureTypeReadable(v.type)),I}this.readRenderTargetPixels=function(v,I,W,V,k,gt,yt,mt=0){if(!(v&&v.isWebGLRenderTarget)){Gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=O.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&yt!==void 0&&(Tt=Tt[yt]),Tt){m.bindFramebuffer(C.FRAMEBUFFER,Tt);try{let Lt=v.textures[mt],jt=Lt.format,se=Lt.type;v.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+mt);let At=cu(Lt);if(At.__formatReadable===!1){Gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(At.__typeReadable===!1){Gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=v.width-V&&W>=0&&W<=v.height-k&&C.readPixels(I,W,V,k,lt.convert(jt),lt.convert(se),gt)}finally{let Lt=et!==null?O.get(et).__webglFramebuffer:null;m.bindFramebuffer(C.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(v,I,W,V,k,gt,yt,mt=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=O.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&yt!==void 0&&(Tt=Tt[yt]),Tt)if(I>=0&&I<=v.width-V&&W>=0&&W<=v.height-k){m.bindFramebuffer(C.FRAMEBUFFER,Tt);let Lt=v.textures[mt],jt=Lt.format,se=Lt.type;v.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+mt);let At=cu(Lt);if(At.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(At.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let de=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,de),C.bufferData(C.PIXEL_PACK_BUFFER,gt.byteLength,C.STREAM_READ),C.readPixels(I,W,V,k,lt.convert(jt),lt.convert(se),0),C.bindBuffer(C.PIXEL_PACK_BUFFER,null);let Ce=et!==null?O.get(et).__webglFramebuffer:null;m.bindFramebuffer(C.FRAMEBUFFER,Ce);let Se=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Cf(C,Se,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,de),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,gt),C.bindBuffer(C.PIXEL_PACK_BUFFER,null),C.deleteBuffer(de),C.deleteSync(Se),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,I=null,W=0){let V=Math.pow(2,-W),k=Math.floor(v.image.width*V),gt=Math.floor(v.image.height*V),yt=I!==null?I.x:0,mt=I!==null?I.y:0;Z.setTexture2D(v,0),C.copyTexSubImage2D(C.TEXTURE_2D,W,0,0,yt,mt,k,gt),m.unbindTexture()},this.copyTextureToTexture=function(v,I,W=null,V=null,k=0,gt=0){let yt,mt,Tt,Lt,jt,se,At,de,Ce,Se=v.isCompressedTexture?v.mipmaps[gt]:v.image;if(W!==null)yt=W.max.x-W.min.x,mt=W.max.y-W.min.y,Tt=W.isBox3?W.max.z-W.min.z:1,Lt=W.min.x,jt=W.min.y,se=W.isBox3?W.min.z:0;else{let Ee=Math.pow(2,-k);yt=Math.floor(Se.width*Ee),mt=Math.floor(Se.height*Ee),v.isDataArrayTexture?Tt=Se.depth:v.isData3DTexture?Tt=Math.floor(Se.depth*Ee):Tt=1,Lt=0,jt=0,se=0}V!==null?(At=V.x,de=V.y,Ce=V.z):(At=0,de=0,Ce=0);let ve=lt.convert(I.format),He=lt.convert(I.type),vt;I.isData3DTexture?(Z.setTexture3D(I,0),vt=C.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(Z.setTexture2DArray(I,0),vt=C.TEXTURE_2D_ARRAY):(Z.setTexture2D(I,0),vt=C.TEXTURE_2D),m.activeTexture(C.TEXTURE0),m.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,I.flipY),m.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),m.pixelStorei(C.UNPACK_ALIGNMENT,I.unpackAlignment);let Qe=m.getParameter(C.UNPACK_ROW_LENGTH),ce=m.getParameter(C.UNPACK_IMAGE_HEIGHT),Mn=m.getParameter(C.UNPACK_SKIP_PIXELS),qn=m.getParameter(C.UNPACK_SKIP_ROWS),yi=m.getParameter(C.UNPACK_SKIP_IMAGES);m.pixelStorei(C.UNPACK_ROW_LENGTH,Se.width),m.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Se.height),m.pixelStorei(C.UNPACK_SKIP_PIXELS,Lt),m.pixelStorei(C.UNPACK_SKIP_ROWS,jt),m.pixelStorei(C.UNPACK_SKIP_IMAGES,se);let _s=v.isDataArrayTexture||v.isData3DTexture,xe=I.isDataArrayTexture||I.isData3DTexture;if(v.isDepthTexture){let Ee=O.get(v),Si=O.get(I),ye=O.get(Ee.__renderTarget),Mi=O.get(Si.__renderTarget);m.bindFramebuffer(C.READ_FRAMEBUFFER,ye.__webglFramebuffer),m.bindFramebuffer(C.DRAW_FRAMEBUFFER,Mi.__webglFramebuffer);for(let xs=0;xs<Tt;xs++)_s&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,O.get(v).__webglTexture,k,se+xs),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,O.get(I).__webglTexture,gt,Ce+xs)),C.blitFramebuffer(Lt,jt,yt,mt,At,de,yt,mt,C.DEPTH_BUFFER_BIT,C.NEAREST);m.bindFramebuffer(C.READ_FRAMEBUFFER,null),m.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(k!==0||v.isRenderTargetTexture||O.has(v)){let Ee=O.get(v),Si=O.get(I);m.bindFramebuffer(C.READ_FRAMEBUFFER,N),m.bindFramebuffer(C.DRAW_FRAMEBUFFER,B);for(let ye=0;ye<Tt;ye++)_s?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ee.__webglTexture,k,se+ye):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Ee.__webglTexture,k),xe?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Si.__webglTexture,gt,Ce+ye):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Si.__webglTexture,gt),k!==0?C.blitFramebuffer(Lt,jt,yt,mt,At,de,yt,mt,C.COLOR_BUFFER_BIT,C.NEAREST):xe?C.copyTexSubImage3D(vt,gt,At,de,Ce+ye,Lt,jt,yt,mt):C.copyTexSubImage2D(vt,gt,At,de,Lt,jt,yt,mt);m.bindFramebuffer(C.READ_FRAMEBUFFER,null),m.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else xe?v.isDataTexture||v.isData3DTexture?C.texSubImage3D(vt,gt,At,de,Ce,yt,mt,Tt,ve,He,Se.data):I.isCompressedArrayTexture?C.compressedTexSubImage3D(vt,gt,At,de,Ce,yt,mt,Tt,ve,Se.data):C.texSubImage3D(vt,gt,At,de,Ce,yt,mt,Tt,ve,He,Se):v.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,gt,At,de,yt,mt,ve,He,Se.data):v.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,gt,At,de,Se.width,Se.height,ve,Se.data):C.texSubImage2D(C.TEXTURE_2D,gt,At,de,yt,mt,ve,He,Se);m.pixelStorei(C.UNPACK_ROW_LENGTH,Qe),m.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ce),m.pixelStorei(C.UNPACK_SKIP_PIXELS,Mn),m.pixelStorei(C.UNPACK_SKIP_ROWS,qn),m.pixelStorei(C.UNPACK_SKIP_IMAGES,yi),gt===0&&I.generateMipmaps&&C.generateMipmap(vt),m.unbindTexture()},this.initRenderTarget=function(v){O.get(v).__webglFramebuffer===void 0&&Z.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Z.setTextureCube(v,0):v.isData3DTexture?Z.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Z.setTexture2DArray(v,0):Z.setTexture2D(v,0),m.unbindTexture()},this.resetState=function(){q=0,J=0,et=null,m.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}};var en=1/255,Jh={X:"x",Y:"y",Z:"z",W:"w"},ze=0,uo=1,Yh=2,fo=0,nr=1,Zh=2,he={kind:0,path:0,base:"",axis:"x"};function Yl(n,t,e,i,s,r,o){if(t!==0){let a=Math.tan(qe(t));n[4]+=n[0]*a,n[5]+=n[1]*a,n[6]+=n[2]*a}if(e!==0){let a=Math.tan(qe(e));n[0]+=n[4]*a,n[1]+=n[5]*a,n[2]+=n[6]*a}if(i!==0){let a=Math.tan(qe(i));n[0]+=n[8]*a,n[1]+=n[9]*a,n[2]+=n[10]*a}(s!==0||r!==0||o!==0)&&(n[12]+=s-(n[0]*s+n[4]*r+n[8]*o),n[13]+=r-(n[1]*s+n[5]*r+n[9]*o),n[14]+=o-(n[2]*s+n[6]*r+n[10]*o))}function fs(n){return n?`#${n.getHexString(Te)}`:null}function Zi(n,t){return n?t==="x"||t==="y"?!!(n.isVector2||n.isVector3||n.isVector4):t==="z"?!!(n.isVector3||n.isVector4):!!n.isVector4:!1}function $h(n,t){let e=n[t];if(e!==void 0){if(e&&e.isColor)return he.kind=fo,he.path=ze,he;if(e&&e.isUniformNode){let o=e.value;return o&&o.isColor?(he.kind=fo,he.path=Yh,he):typeof o=="number"||typeof o=="boolean"?(he.kind=nr,he.path=Yh,he):null}return typeof e=="number"||typeof e=="boolean"?(he.kind=nr,he.path=ze,he):null}let i=n.uniforms,s=i&&i[t];if(s){let o=s.value;if(o&&o.isColor)return he.kind=fo,he.path=uo,he;if(typeof o=="number")return he.kind=nr,he.path=uo,he}let r=Jh[t[t.length-1]];if(r){let o=t.slice(0,-1);if(Zi(n[o],r))return he.kind=Zh,he.path=ze,he.base=o,he.axis=r,he;let a=n[o];if(a&&a.isUniformNode&&Zi(a.value,r))return he.kind=Zh,he.path=Yh,he.base=o,he.axis=r,he;let l=i&&i[o];if(l&&Zi(l.value,r))return he.kind=Zh,he.path=uo,he.base=o,he.axis=r,he}return null}function ds(n,t,e){if(e===ze)return n[t];if(e===uo){let s=n.uniforms,r=s&&s[t];return r?r.value:null}let i=n[t];return i?i.value:null}function lp(n,t,e,i){if(i===ze){n[t]=e;return}if(i===uo){let r=n.uniforms,o=r&&r[t];o&&(o.value=e);return}let s=n[t];s&&(s.value=e)}function ps(n,t,e,i){if(i===void 0&&(i=0),!n)return i;let s=Array.isArray(n)?n[0]:n;if(!s)return i;let r=ds(s,t,e);return r??i}function ir(n,t,e,i){if(n)if(Array.isArray(n))for(let s=0,r=n.length;s<r;s++)lp(n[s],t,e,i);else lp(n,t,e,i)}function po(n,t,e){if(!n)return null;let i=Array.isArray(n)?n[0]:n;return fs(i?ds(i,t,e):null)}function mo(n,t,e,i){if(!n)return;let s=e[0]*en,r=e[1]*en,o=e[2]*en;if(Array.isArray(n))for(let a=0,l=n.length;a<l;a++){let c=ds(n[a],t,i);c&&c.setRGB(s,r,o,Te)}else{let a=ds(n,t,i);a&&a.setRGB(s,r,o,Te)}}function cp(n,t,e,i){if(!n)return 0;let s=Array.isArray(n)?n[0]:n,r=s?ds(s,t,i):null;return r?r[e]:0}function hp(n,t,e,i,s){if(n)if(Array.isArray(n))for(let r=0,o=n.length;r<o;r++){let a=ds(n[r],t,s);a&&(a[e]=i)}else{let r=ds(n,t,s);r&&(r[e]=i)}}var Iv=n=>n,Pv=n=>n.material,Lv=[{},{},{}],Dv=[{},{},{}],Nv=[{},{},{}],Uv=[{},{},{}],Fv=[{},{},{}],Ov=[{},{},{}],fp=(n,t,e,i,s,r)=>{let o=t.path;if(t.kind===fo){let u=i[o];return u[n]||(u[n]={get:d=>po(e(d),n,o),set:(d,h,f)=>mo(e(d),n,f._numbers,o)})}if(t.kind===nr){let u=s[o];return u[n]||(u[n]={get:d=>ps(e(d),n,o),set:(d,h)=>ir(e(d),n,h,o)})}let a=t.base,l=t.axis,c=r[o];return c[n]||(c[n]={get:u=>cp(e(u),a,l,o),set:(u,d)=>hp(e(u),a,l,d,o)})};Pn.registerPropertyResolver((n,t)=>{let e=$h(n,t);return!e||e.kind===nr&&e.path===ze?null:fp(t,e,Iv,Lv,Dv,Nv)});Pn.registerPropertyResolver((n,t)=>{if(n[t]!==void 0)return null;let e=n.material;if(!e)return null;let i=Array.isArray(e)?e[0]:e;if(!i)return null;let s=$h(i,t);return s?fp(t,s,Pv,Uv,Fv,Ov):null});var pp={rotation:1,angle:1},up={};Pn.registerPropertyResolver((n,t)=>!pp[t]||typeof n[t]!="number"?null:up[t]||(up[t]={get:e=>Cn(e[t]),set:(e,i)=>{e[t]=qe(i)}}));var dp={};Pn.registerPropertyResolver((n,t)=>{let e=Jh[t[t.length-1]];if(!e)return null;let i=t.slice(0,-1);if(!pp[i])return null;let s=n[i];return!s||!s.isEuler?null:dp[t]||(dp[t]={get:r=>Cn(r[i][e]),set:(r,o)=>{r[i][e]=qe(o)}})});var go=Pn.registerTargetAdapter(n=>!!(n&&n.isUniformNode));go.registerProperty("color",n=>fs(n.value),(n,t,e)=>{let i=e._numbers;n.value.setRGB(i[0]*en,i[1]*en,i[2]*en,Te)},n=>!!(n.value&&n.value.isColor));go.registerProperty("x",n=>n.value.x,(n,t)=>{n.value.x=t},n=>Zi(n.value,"x"));go.registerProperty("y",n=>n.value.y,(n,t)=>{n.value.y=t},n=>Zi(n.value,"y"));go.registerProperty("z",n=>n.value.z,(n,t)=>{n.value.z=t},n=>Zi(n.value,"z"));go.registerProperty("w",n=>n.value.w,(n,t)=>{n.value.w=t},n=>Zi(n.value,"w"));var mp=n=>n.isLight?n:n.material,_o=Symbol("animejs.skewOrigin"),Kh=Symbol("animejs.opacity");function xo(n,t){if(t===void 0)if(n.material)t=ps(n.material,"opacity",ze,1);else{let i=n[Kh];t=i===void 0?1:i}let e=n.scale;n.visible=!!(t&&e.x&&e.y&&e.z)}function gp(n){let t=n[_o];if(t)return t;t=n[_o]={skewX:0,skewY:0,skewZ:0,originX:0,originY:0,originZ:0};let e=n.updateMatrix;return n.updateMatrix=function(){e.call(this);let i=this[_o];(i.skewX!==0||i.skewY!==0||i.skewZ!==0||i.originX!==0||i.originY!==0||i.originZ!==0)&&Yl(this.matrix.elements,i.skewX,i.skewY,i.skewZ,i.originX,i.originY,i.originZ)},t}var Fe=Pn.registerTargetAdapter(n=>n instanceof Ge);Fe.registerProperty("x",n=>n.position.x,(n,t)=>{n.position.x=t});Fe.registerProperty("y",n=>n.position.y,(n,t)=>{n.position.y=t});Fe.registerProperty("z",n=>n.position.z,(n,t)=>{n.position.z=t});Fe.registerProperty("rotateX",n=>Cn(n.rotation.x),(n,t)=>{n.rotation.x=qe(t)});Fe.registerProperty("rotateY",n=>Cn(n.rotation.y),(n,t)=>{n.rotation.y=qe(t)});Fe.registerProperty("rotateZ",n=>Cn(n.rotation.z),(n,t)=>{n.rotation.z=qe(t)});Fe.registerProperty("scaleX",n=>n.scale.x,(n,t)=>{n.scale.x=t,xo(n)});Fe.registerProperty("scaleY",n=>n.scale.y,(n,t)=>{n.scale.y=t,xo(n)});Fe.registerProperty("scaleZ",n=>n.scale.z,(n,t)=>{n.scale.z=t,xo(n)});Fe.registerProperty("scale",n=>n.scale.x,(n,t)=>{n.scale.x=t,n.scale.y=t,n.scale.z=t,xo(n)});Fe.registerProperty("visible",n=>n.visible,(n,t)=>{n.visible=!!t});Fe.registerProperty("opacity",n=>{if(n.material)return ps(n.material,"opacity",ze,1);let t=n[Kh];return t===void 0?1:t},(n,t)=>{n.material?ir(n.material,"opacity",t,ze):n[Kh]=t,xo(n,t)},n=>!n.isLight);Fe.registerProperty("color",n=>po(mp(n),"color",ze),(n,t,e)=>mo(mp(n),"color",e._numbers,ze));Fe.registerProperty("groundColor",n=>po(n,"groundColor",ze),(n,t,e)=>mo(n,"groundColor",e._numbers,ze),n=>!!n.groundColor);Fe.registerProperty("background",n=>{let t=n.background;return t&&t.isColor?fs(t):"#000000"},(n,t,e)=>{let i=n,s=i.background;(!s||!s.isColor)&&(s=new Jt,i.background=s);let r=e._numbers;s.setRGB(r[0]*en,r[1]*en,r[2]*en,Te)},n=>!!n.isScene);var vo=(n,t,e,i)=>{Fe.registerProperty(n,s=>s[t](),(s,r)=>{s[e](r)},s=>!!s[i])};vo("volume","getVolume","setVolume","setVolume");vo("refDistance","getRefDistance","setRefDistance","setRefDistance");vo("rolloffFactor","getRolloffFactor","setRolloffFactor","setRefDistance");vo("maxDistance","getMaxDistance","setMaxDistance","setRefDistance");vo("focalLength","getFocalLength","setFocalLength","setFocalLength");var vi=(n,t)=>{Fe.registerProperty(n,e=>e[n],(e,i)=>{e[n]=i,e.updateProjectionMatrix()},t)},_p=n=>!!n.isPerspectiveCamera,Zl=n=>!!n.isOrthographicCamera;vi("fov",_p);vi("aspect",_p);vi("left",Zl);vi("right",Zl);vi("top",Zl);vi("bottom",Zl);var sr=(n,t)=>{Fe.registerProperty(n,e=>{let i=e[_o];return i?i[t]:0},(e,i)=>{gp(e)[t]=i})};sr("skewX","skewX");sr("skewY","skewY");sr("skewZ","skewZ");sr("transformOriginX","originX");sr("transformOriginY","originY");sr("transformOriginZ","originZ");Fe.registerProperty("transformOrigin",n=>{let t=n[_o];return t?`${t.originX} ${t.originY} ${t.originZ}`:"0 0 0"},(n,t,e)=>{let i=gp(n),s=e._numbers;i.originX=s[0],i.originY=s[1],i.originZ=s[2]});var Qh=n=>!!n.isPerspectiveCamera||!!n.isOrthographicCamera;vi("near",Qh);vi("far",Qh);vi("zoom",Qh);var ms=n=>!!(n._skewX||n._skewY||n._skewZ||n._originX||n._originY||n._originZ),Jl=1,$l=2,Kl=4,gs=8,xp=new WeakMap,jh=class{constructor(t){this.mesh=t,this.hasInstanceMatrix="instanceMatrix"in t,this.instances=[],this.dirtyList=[],this.userOnBeforeRender=t.onBeforeRender||null,this.chainedHandler=Bv(this),Object.defineProperty(t,"onBeforeRender",{configurable:!0,get:()=>this.chainedHandler,set:e=>{this.userOnBeforeRender=e}})}flush(){let t=this.dirtyList;if(t.length!==0){for(let e=0,i=t.length;e<i;e++)t[e]._flush();this.hasInstanceMatrix&&(this.mesh.instanceMatrix.needsUpdate=!0),t.length=0}}};function Bv(n){return function(t,e,i,s,r,o){n.flush();let a=n.userOnBeforeRender;a&&a.call(n.mesh,t,e,i,s,r,o)}}var rr=class{constructor(t,e){this.isAnimejsInstanceProxy=!0,this.parent=t.mesh,this.id=e,this._position=new G,this._rotation=new Hn(0,0,0,"XYZ"),this._scale=new G(1,1,1),this._matrix=new me,this._quat=new Fn,this._color=new Jt,this._dirty=0,this._skewX=0,this._skewY=0,this._skewZ=0,this._originX=0,this._originY=0,this._originZ=0,this._hasSkewOrigin=!1,this._dirtyList=t.dirtyList;let i=t.mesh;this._hasSetColor="setColorAt"in i,this._hasSetVisible="setVisibleAt"in i,this._hasGetVisible="getVisibleAt"in i,i.getMatrixAt(e,this._matrix),this._matrix.elements[15]===0&&this._matrix.identity(),this._matrix.decompose(this._position,this._quat,this._scale),this._rotation.setFromQuaternion(this._quat,"XYZ"),"getColorAt"in i&&"instanceColor"in i&&i.instanceColor&&i.getColorAt(e,this._color)}_markDirty(t){this._dirty===0&&this._dirtyList.push(this),this._dirty|=t}_flush(){let t=this._dirty;if(!t)return;let e=this._matrix,i=this._position;if(t===Jl&&!this._hasSkewOrigin){let s=e.elements;s[12]=i.x,s[13]=i.y,s[14]=i.z}else{let s=this._quat;t&$l&&s.setFromEuler(this._rotation),e.compose(i,s,this._scale),this._hasSkewOrigin&&Yl(e.elements,this._skewX,this._skewY,this._skewZ,this._originX,this._originY,this._originZ)}this.parent.setMatrixAt(this.id,e),this._dirty=0}get x(){return this._position.x}set x(t){this._position.x=t,this._markDirty(Jl)}get y(){return this._position.y}set y(t){this._position.y=t,this._markDirty(Jl)}get z(){return this._position.z}set z(t){this._position.z=t,this._markDirty(Jl)}get rotateX(){return Cn(this._rotation.x)}set rotateX(t){this._rotation.x=qe(t),this._markDirty($l)}get rotateY(){return Cn(this._rotation.y)}set rotateY(t){this._rotation.y=qe(t),this._markDirty($l)}get rotateZ(){return Cn(this._rotation.z)}set rotateZ(t){this._rotation.z=qe(t),this._markDirty($l)}get scaleX(){return this._scale.x}set scaleX(t){this._scale.x=t,this._markDirty(Kl)}get scaleY(){return this._scale.y}set scaleY(t){this._scale.y=t,this._markDirty(Kl)}get scaleZ(){return this._scale.z}set scaleZ(t){this._scale.z=t,this._markDirty(Kl)}get scale(){return this._scale.x}set scale(t){let e=this._scale;e.x=t,e.y=t,e.z=t,this._markDirty(Kl)}get skewX(){return this._skewX}set skewX(t){this._skewX=t,this._hasSkewOrigin=ms(this),this._markDirty(gs)}get skewY(){return this._skewY}set skewY(t){this._skewY=t,this._hasSkewOrigin=ms(this),this._markDirty(gs)}get skewZ(){return this._skewZ}set skewZ(t){this._skewZ=t,this._hasSkewOrigin=ms(this),this._markDirty(gs)}get transformOriginX(){return this._originX}set transformOriginX(t){this._originX=t,this._hasSkewOrigin=ms(this),this._markDirty(gs)}get transformOriginY(){return this._originY}set transformOriginY(t){this._originY=t,this._hasSkewOrigin=ms(this),this._markDirty(gs)}get transformOriginZ(){return this._originZ}set transformOriginZ(t){this._originZ=t,this._hasSkewOrigin=ms(this),this._markDirty(gs)}get opacity(){return ps(this.parent.material,"opacity",ze,1)}set opacity(t){ir(this.parent.material,"opacity",t,ze)}get visible(){return this._hasGetVisible?this.parent.getVisibleAt(this.id):!0}set visible(t){this._hasSetVisible&&this.parent.setVisibleAt(this.id,t)}};function tu(n){let t=xp.get(n);return t||(t=new jh(n),xp.set(n,t)),n instanceof kr?Vv(t):zv(t)}function zv(n){let e=n.mesh.count,i=n.instances;if(i.length===0&&e>0){i.length=e;for(let s=0;s<e;s++)i[s]=new rr(n,s);return i}if(i.length<e)for(let s=i.length;s<e;s++)i.push(new rr(n,s));else i.length>e&&(i.length=e);return i}function Vv(n){let t=n.mesh,e=n.instances,i=t._instanceInfo??[],s=i.length;e.length<s&&(e.length=s);for(let r=0;r<s;r++){let o=i[r];o&&o.active===!1?e[r]=null:e[r]||(e[r]=new rr(n,r))}return e.length>s&&(e.length=s),e}var vp=Pn.registerTargetAdapter(n=>n instanceof rr);vp.registerProperty("color",n=>fs(n._color),(n,t,e)=>{if(!n._hasSetColor)return;let i=e._numbers;n._color.setRGB(i[0]*en,i[1]*en,i[2]*en,Te);let s=n.parent;s.setColorAt(n.id,n._color),s.instanceColor&&(s.instanceColor.needsUpdate=!0)});vp.registerProperty("transformOrigin",n=>`${n._originX} ${n._originY} ${n._originZ}`,(n,t,e)=>{let i=e._numbers;n._originX=i[0],n._originY=i[1],n._originZ=i[2],n._hasSkewOrigin=ms(n),n._markDirty(gs)});var kv="#475569",Gv="#0f172a";function AE(n,{cells:t,size:e,pixels:i,onDone:s}){let r=new Wl({alpha:!0,antialias:!0});r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),r.setSize(i,i),r.setClearColor(16777215,0),r.domElement.className="pay-qr-3d",r.domElement.setAttribute("aria-hidden","true"),n.appendChild(r.domElement);let o=e/2,a=new Gi(-o,o,o,-o,.1,200);a.position.set(0,0,100);let l=new Ur;l.add(new $r(16777215,1.1));let c=new Jr(16777215,2.4);c.position.set(-15,25,40),l.add(c);let u=new Bi(1,1,1),d=new Xr({color:16777215}),h=new Vr(u,d,t.length),f=new Jt(kv);t.forEach((M,w)=>h.setColorAt(w,f)),l.add(h);let _=t.map(([,M])=>M-o+.5),S=t.map(([M])=>o-M-.5),g=t.map((M,w)=>Math.hypot(_[w],S[w])/(o*Math.SQRT2)),p=tu(h);qo.set(p,{x:(M,w)=>_[w],y:(M,w)=>S[w],z:14,scale:0,rotateX:-90});let A=gc({onUpdate:()=>r.render(l,a)}),R=!1,y=Go(h,{rotateX:[50,0],rotateY:[-24,0],rotateZ:[-6,0],delay:150,duration:2e3,ease:"inOut(3)"}),T=Go(p,{z:{to:0,ease:"out(3)"},rotateX:{to:0,ease:"out(3)"},scale:{to:1,ease:"outBack(1.6)"},color:Gv,delay:(M,w)=>g[w]*1100+Math.random()*90,duration:650});return Promise.all([y,T]).then(()=>{R||(r.render(l,a),A.pause(),s?.())}),{stop(){R||(R=!0,T.pause(),y.pause(),A.pause(),u.dispose(),d.dispose(),h.dispose(),r.dispose(),r.domElement.remove())}}}export{AE as formQr};
/*! Bundled license information:

animejs/dist/modules/core/consts.js:
animejs/dist/modules/core/globals.js:
animejs/dist/modules/core/helpers.js:
animejs/dist/modules/core/transforms.js:
animejs/dist/modules/core/colors.js:
animejs/dist/modules/core/values.js:
animejs/dist/modules/core/render.js:
animejs/dist/modules/core/styles.js:
animejs/dist/modules/core/clock.js:
animejs/dist/modules/core/targets.js:
animejs/dist/modules/core/units.js:
  (**
   * Anime.js - core - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/adapters/registry.js:
animejs/dist/modules/adapters/three/adapter.js:
animejs/dist/modules/adapters/three/helpers.js:
animejs/dist/modules/adapters/three/resolvers.js:
animejs/dist/modules/adapters/three/uniform.js:
animejs/dist/modules/adapters/three/object3d.js:
animejs/dist/modules/adapters/three/instance.js:
animejs/dist/modules/adapters/three/index.js:
  (**
   * Anime.js - adapters - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/animation/additive.js:
animejs/dist/modules/animation/composition.js:
animejs/dist/modules/animation/animation.js:
  (**
   * Anime.js - animation - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/engine/engine.js:
  (**
   * Anime.js - engine - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/timer/timer.js:
  (**
   * Anime.js - timer - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/easings/none.js:
animejs/dist/modules/easings/eases/parser.js:
  (**
   * Anime.js - easings - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/timeline/position.js:
  (**
   * Anime.js - timeline - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/utils/number.js:
animejs/dist/modules/utils/target.js:
animejs/dist/modules/utils/time.js:
animejs/dist/modules/utils/chainable.js:
animejs/dist/modules/utils/random.js:
animejs/dist/modules/utils/stagger.js:
animejs/dist/modules/utils/index.js:
  (**
   * Anime.js - utils - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/waapi/composition.js:
  (**
   * Anime.js - waapi - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/index.js:
  (**
   * Anime.js - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
