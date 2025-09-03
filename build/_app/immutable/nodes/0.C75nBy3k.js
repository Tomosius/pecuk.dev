import"../chunks/DsnmJJEf.js";import"../chunks/Ci_-RSxb.js";import{k as j,l as R,aV as U,f as y,d as I,s as m,n as X,t as $,aW as Y,a as x,p as N,e as M,h as V,c as v,r as d,g as n,m as Z,I as h,i as C,b as K}from"../chunks/B7knsZ90.js";import{t as ee,s as L}from"../chunks/Bt-qeMyq.js";import{i as q}from"../chunks/bW3SGYoM.js";import{p as z,s as te,a as re}from"../chunks/BWjRsQxc.js";import{s as _,e as P}from"../chunks/Dd2Sg62T.js";import{w as ae,g as W}from"../chunks/BxZbtUUY.js";import{i as oe}from"../chunks/y5SO2xhQ.js";import{s as ie}from"../chunks/DGWgfG6E.js";import{b as D}from"../chunks/Bi-dsBaK.js";function ne(e,o,s,c,r){j&&R();var t=o.$$slots?.[s],l=!1;t===!0&&(t=o.children,l=!0),t===void 0||t(e,l?()=>c:c)}function se(e,o,s,c){var r=e.__style;if(j||r!==o){var t=ee(o);(!j||t!==e.getAttribute("style"))&&(t==null?e.removeAttribute("style"):e.style.cssText=t),e.__style=o}return c}const ce=!0,Be=Object.freeze(Object.defineProperty({__proto__:null,prerender:ce},Symbol.toStringTag,{value:"Module"}));var de=y('<meta name="description"/> <meta property="og:title"/> <meta property="og:description"/> <meta property="og:type" content="website"/> <meta name="twitter:card" content="summary_large_image"/>',1);function le(e,o){let s=z(o,"title",8,"My Site"),c=z(o,"description",8,"Default site description");U(r=>{var t=de(),l=I(t),b=m(l,2),u=m(b,2);X(4),$(()=>{Y.title=s(),_(l,"content",c()),_(b,"content",s()),_(u,"content",c())}),x(r,t)})}const A={bgTop:"#2c2c54",bgMid:"#1f1f3d",bgBottom:"#1a1a33",glowTop:"rgba(139,92,246,0.18)",glowSide:"rgba(79,70,229,0.12)",accent:"#8b5cf6",accentSoft:"#a78bfa"},be={bgTop:"#0e2433",bgMid:"#0a1b28",bgBottom:"#07121c",glowTop:"rgba(56,189,248,0.18)",glowSide:"rgba(56,189,248,0.10)",accent:"#38bdf8",accentSoft:"#67e8f9"},B=ae(A),pe=()=>{const e=ie;return{page:{subscribe:e.page.subscribe},navigating:{subscribe:e.navigating.subscribe},updated:e.updated}},ge={subscribe(e){return pe().page.subscribe(e)}};var ve=y("<a> </a>"),me=y("<a> </a>"),ue=y('<div class="mt-2 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset] p-2 md:hidden"></div>'),fe=y('<div class="sticky top-4 z-50"><div class="mx-auto max-w-6xl px-4"><div class="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset] px-3 py-2 md:px-4"><a class="shrink-0 flex items-center rounded-xl px-3 py-1.5 bg-white/10 border border-white/15"><img alt="pecuk.dev logo" class="h-8 w-auto"/></a> <nav class="hidden md:flex items-center gap-1 ml-1"></nav> <div class="ml-auto flex items-center gap-2"><button class="px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition" title="Toggle theme">Theme</button> <button class="md:hidden px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition" aria-label="Toggle menu">☰</button></div></div> <!></div></div>');function he(e,o){N(o,!1);const s=(i="")=>`${D}${i}`;let c=z(o,"links",24,()=>[{href:s("/"),label:"Home"},{href:s("/projects"),label:"Projects"},{href:s("/about"),label:"About"},{href:s("/contact"),label:"Contact"}]),r=Z(!1);function t(i){const a=W(ge).url.pathname;return a===i||a.startsWith(i+"/")}function l(){const i=W(B);B.set(i===A?be:A)}q();var b=fe(),u=v(b),k=v(u),w=v(k),E=v(w);d(w);var T=m(w,2);P(T,7,c,(i,a)=>i.href+"-"+a,(i,a)=>{var p=ve(),g=v(p,!0);d(p),$((f,S)=>{_(p,"href",(n(a),h(()=>n(a).href))),L(p,1,`px-3 py-1.5 rounded-xl border transition ${f??""}`),_(p,"aria-current",S),K(g,(n(a),h(()=>n(a).label)))},[()=>(n(a),h(()=>t(n(a).href)?"bg-white/15 border-white/25":"hover:bg-white/10 border-transparent")),()=>(n(a),h(()=>t(n(a).href)?"page":void 0))]),x(i,p)}),d(T);var H=m(T,2),O=v(H),F=m(O,2);d(H),d(k);var G=m(k,2);{var J=i=>{var a=ue();P(a,7,c,(p,g)=>p.href+"-"+g,(p,g)=>{var f=me(),S=v(f,!0);d(f),$(Q=>{_(f,"href",(n(g),h(()=>n(g).href))),L(f,1,`block px-3 py-2 rounded-xl transition ${Q??""}`),K(S,(n(g),h(()=>n(g).label)))},[()=>(n(g),h(()=>t(n(g).href)?"bg-white/15":"hover:bg-white/10"))]),M("click",f,()=>C(r,!1)),x(p,f)}),d(a),x(i,a)};oe(G,i=>{n(r)&&i(J)})}d(u),d(b),$(i=>{_(w,"href",i),_(E,"src",`${D}/brand/logo.png`)},[()=>h(()=>s("/"))]),M("click",O,l),M("click",F,()=>C(r,!n(r))),x(e,b),V()}var _e=y(`<!> <div class="relative min-h-screen text-white overflow-x-hidden"><div class="pointer-events-none absolute inset-0 -z-10" style="
      background-image:
        /* top dome (wider, fades earlier; blended in OKLCH) */
        radial-gradient(1200px 700px at 50% 0%,
          color-mix(in oklch, var(--glow-top) 35%, transparent),
          transparent 78%),
        /* left glow */
        radial-gradient(640px 640px at 0% 45%,
          color-mix(in oklch, var(--glow-side) 30%, transparent),
          transparent 72%),
        /* right glow */
        radial-gradient(640px 640px at 100% 45%,
          color-mix(in oklch, var(--glow-side) 30%, transparent),
          transparent 72%),
        /* vertical base (weighted midpoint to keep it dark) */
        linear-gradient(
          to bottom,
          var(--bg-top) 0%,
          color-mix(in oklch, var(--bg-top) 70%, var(--bg-mid) 30%) 50%,
          var(--bg-bottom) 100%
        );
      background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
      background-size: cover, cover, cover, cover;
      background-position: center, center, center, center;
    "></div> <div class="pt-6 md:pt-8"><!></div> <!></div>`,1);function He(e,o){N(o,!1);const[s,c]=te(),r=()=>re(B,"$themeStore",s);q();var t=_e(),l=I(t);le(l,{title:"pecuk.dev",description:"My website built with SvelteKit + Tailwind"});var b=m(l,2),u=m(v(b),2),k=v(u);he(k,{logo:"Logo"}),d(u);var w=m(u,2);ne(w,o,"default",{}),d(b),$(()=>se(b,`
    --bg-top: ${r().bgTop??""};
    --bg-mid: ${r().bgMid??""};
    --bg-bottom: ${r().bgBottom??""};
    --glow-top: ${r().glowTop??""};
    --glow-side: ${r().glowSide??""};
    --accent: ${r().accent??""};
    --accent-soft: ${r().accentSoft??""};
  `)),x(e,t),V(),c()}export{He as component,Be as universal};
