(()=>{"use strict";var e,t={3800:(e,t,a)=>{var s=a(7416),n=a(1128),o=a(2024),r=a(822),i=a(4910),c=a(4526);const l={class:"vn-contribute"},u={key:0,class:"notice"},p=(0,r.Lk)("div",{class:"title"},"Help us make some avocado toast!",-1),g={class:"desc"},d={class:"desc-text"},m={class:"ext-name"},f=(0,r.Lk)("p",null,"\n          You can support our goals and make a difference by sharing some\n          avocados with us! Every ounce will help add new features and keep\n          things afloat.\n        ",-1),v={class:"image-container"},h=["srcset"],b=["src"],w={key:0,class:"goals-wrap"},k=(0,r.Lk)("div",{class:"cta"},"Support our current goals",-1),y={class:"goals"},x={class:"goal"},L={class:"progress-details"},W={class:"progress-value"},I=["src"],T={class:"progress-value"},O=["src"],S={class:"progress-value"},_=["src"],A={class:"cta-buttons"},E={class:"image-container"},C=["srcset"],N=["src"],$={class:"image-container"},F=["srcset"],q=["src"],D={class:"cta-coin"},R={name:"vn-contribute",components:{[i.$n.name]:i.$n,[i.In.name]:i.In,[i.hZ.name]:i.hZ},props:{extName:{type:String,required:!0},extSlug:{type:String,required:!0},notice:{type:String,default:""}},emits:["open"],data:function(){return{goals:null,apiHost:"contribute.vapps.dev"}},methods:{setup:async function(){const e=await fetch(`https://${this.apiHost}/api/v1/goals/${this.extSlug}`),t=await e.json(),a=t.progress.currency.exchangeRate;t.progress.value=Math.trunc(t.progress.value/a),t.progress.goal=Math.trunc(t.progress.goal/a),this.goals=t},contribute:function(e){const t=`https://${this.apiHost}/go/${e}?pr=${this.extSlug}&src=app`;this.$emit("open",{url:t})}},mounted:function(){this.setup()}};var j=a(1535);const M=(0,j.A)(R,[["render",function(e,t,a,n,o,i){const R=(0,r.g2)("vn-icon"),j=(0,r.g2)("vn-linear-progress"),M=(0,r.g2)("vn-button");return(0,r.uX)(),(0,r.CE)("div",l,[a.notice?((0,r.uX)(),(0,r.CE)("div",u,(0,c.v_)(a.notice),1)):(0,r.Q3)("",!0),(0,r.eW)(),p,(0,r.eW)(),(0,r.Lk)("div",g,[(0,r.Lk)("div",d,[(0,r.Lk)("p",null,[(0,r.Lk)("span",m,(0,c.v_)(a.extName),1),(0,r.eW)(" is a project fueled by\n          love and crunchy toast, created for everyone to freely use and\n          improve.\n        ")]),(0,r.eW)(),f]),(0,r.eW)(),(0,r.Lk)("picture",v,[(0,r.Lk)("source",{srcset:"./assets/illustration.webp",type:"image/webp"},null,8,h),(0,r.eW)(),(0,r.Lk)("img",{class:"desc-image",src:`https://${e.apiHost}/static/images/illustration.png`,alt:"avocado and toast"},null,8,b)])]),(0,r.eW)(),(0,r.bF)(s.eB,{name:"goals"},{default:(0,r.k6)((()=>[e.goals?((0,r.uX)(),(0,r.CE)("div",w,[k,(0,r.eW)(),(0,r.Lk)("div",y,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(e.goals.items,(e=>((0,r.uX)(),(0,r.CE)("div",x,[(0,r.bF)(R,{class:"goal-bullet",src:"./assets/circle.svg"},null,8,["src"]),(0,r.eW)(" "+(0,c.v_)(e),1)])))),256))]),(0,r.eW)(),(0,r.bF)(j,{class:"progress","model-value":e.goals.progress.value/e.goals.progress.goal},null,8,["model-value"]),(0,r.eW)(),(0,r.Lk)("div",L,[(0,r.Lk)("div",null,[(0,r.eW)("\n            Raised\n            "),(0,r.Lk)("span",W,(0,c.v_)(e.goals.progress.value),1),(0,r.eW)(),(0,r.Lk)("img",{class:"progress-token",src:"./assets/avocado.svg"},null,8,I),(0,r.eW)("\n            of\n            "),(0,r.Lk)("span",T,(0,c.v_)(e.goals.progress.goal),1),(0,r.eW)(),(0,r.Lk)("img",{class:"progress-token",src:"./assets/avocado.svg"},null,8,O),(0,r.eW)("\n            goal\n          ")]),(0,r.eW)(),(0,r.Lk)("div",S,[(0,r.eW)("\n            1\n            "),(0,r.Lk)("img",{class:"progress-token",src:"./assets/avocado.svg"},null,8,_),(0,r.eW)("\n            =\n            "+(0,c.v_)(e.goals.progress.currency.symbol)+(0,c.v_)(e.goals.progress.currency.exchangeRate),1)])])])):(0,r.Q3)("",!0)])),_:1}),(0,r.eW)(),(0,r.Lk)("div",A,[(0,r.bF)(M,{onClick:t[0]||(t[0]=e=>i.contribute("patreon")),variant:"elevated"},{default:(0,r.k6)((()=>[(0,r.Lk)("picture",E,[(0,r.Lk)("source",{srcset:"./assets/patreon.webp",type:"image/webp"},null,8,C),(0,r.eW)(),(0,r.Lk)("img",{src:`https://${e.apiHost}/static/images/patreon.png`},null,8,N)])])),_:1}),(0,r.eW)(),(0,r.bF)(M,{onClick:t[1]||(t[1]=e=>i.contribute("paypal")),variant:"elevated"},{default:(0,r.k6)((()=>[(0,r.Lk)("picture",$,[(0,r.Lk)("source",{srcset:"./assets/paypal.webp",type:"image/webp"},null,8,F),(0,r.eW)(),(0,r.Lk)("img",{src:`https://${e.apiHost}/static/images/paypal.png`},null,8,q)])])),_:1})]),(0,r.eW)(),(0,r.Lk)("div",D,[(0,r.bF)(M,{onClick:t[2]||(t[2]=e=>i.contribute("coinbase")),variant:"tonal"},{default:(0,r.k6)((()=>[(0,r.eW)("\n        Coinbase\n      ")])),_:1})])])}]]);var P=a(8618);const H={components:{[i.qw.name]:i.qw,[M.name]:M},data:function(){return{extName:(0,P.q4)("extensionName"),extSlug:"buster",notice:""}},methods:{setup:function(){"auto"===new URL(window.location.href).searchParams.get("action")&&(this.notice="This page is shown once a year while using the extension.")},contribute:async function({url:e}={}){await(0,n.Rh)({url:e})}},created:function(){document.title=(0,P.q4)("pageTitle",[(0,P.q4)("pageTitle_contribute"),this.extName]),this.setup()}},X=(0,j.A)(H,[["render",function(e,t,a,s,n,o){const i=(0,r.g2)("vn-contribute"),c=(0,r.g2)("vn-app");return(0,r.uX)(),(0,r.Wv)(c,null,{default:(0,r.k6)((()=>[(0,r.bF)(i,{extName:e.extName,extSlug:e.extSlug,notice:e.notice,onOpen:o.contribute},null,8,["extName","extSlug","notice","onOpen"])])),_:1})}]]);!async function(){await(0,n.rn)(["400 14px Roboto","500 14px Roboto","700 14px Roboto"]);const e=(0,s.Ef)(X);await(0,n.K7)(e),await(0,o.H)(e),e.mount("body")}()},1128:(e,t,a)=>{a.d(t,{K7:()=>i,Rh:()=>u,rL:()=>l,rn:()=>r,xB:()=>c});var s=a(786),n=a(8618),o=(a(3655),a(4729),a(7272));async function r(e){await Promise.allSettled(e.map((e=>document.fonts.load(e))))}async function i(e){const t=await(0,n.uo)(),a=[t.targetEnv,t.os];document.documentElement.classList.add(...a),e&&(e.config.globalProperties.$env=t)}async function c(e){return e||({appTheme:e}=await s.Ay.get("appTheme")),"auto"===e&&(e=(0,n.T6)().matches?"dark":"light"),e}function l(e){!function(e){(0,n.T6)().addEventListener("change",(function(){e()}))}(e),function(e){o.storage.onChanged.addListener((function(t,a){"local"===a&&t.appTheme&&e()}))}(e)}async function u({url:e="",setOpenerTab:t=!0,getTab:a=!1,activeTab:s=null}={}){s||(s=await(0,n.e6)());const r={url:e,index:s.index+1,active:!0,getTab:a};return t&&(r.openerTabId=await async function({tab:e,tabId:t=null}={}){return e||null===t||(e=await o.tabs.get(t).catch((e=>null))),await(0,n.kL)({tab:e})&&!(await(0,n.uo)()).isMobile?e.id:null}({tab:s})),(0,n.aI)(r)}},8618:(e,t,a)=>{a.d(t,{T6:()=>g,aI:()=>i,e6:()=>c,kL:()=>l,q4:()=>r,uo:()=>p}),a(9362),a(9033),a(4665);var s=a(786),n=a(4729),o=a(7272);function r(e,t){return o.i18n.getMessage(e,t)}async function i({url:e="",index:t=null,active:a=!0,openerTabId:s=null,getTab:r=!1}={}){const i={url:e,active:a};null!==t&&(i.index=t),null!==s&&(i.openerTabId=s);let c=await o.tabs.create(i);if(r){if("samsung"===n.Dm){let t=1;for(;t<=500&&(!c||c.url!==e);)[c]=await o.tabs.query({lastFocusedWindow:!0,url:e}),await d(20),t+=1}return c}}async function c(){const[e]=await o.tabs.query({lastFocusedWindow:!0,active:!0});return e}async function l({tab:e,tabId:t=null}={}){if(e||null===t||(e=await o.tabs.get(t).catch((e=>null))),e&&e.id!==o.tabs.TAB_ID_NONE)return!0}let u;async function p(){if(!function(){const e=n.tn?o.runtime.getURL("/src/background/script.js"):o.runtime.getURL("/src/background/index.html");return self.location.href===e}())return o.runtime.sendMessage({id:"getPlatform"});let{os:e,arch:t}=await async function(){if(u)return u;if(n.tn)({platformInfo:u}=await s.Ay.get("platformInfo",{area:"session"}));else try{u=JSON.parse(window.sessionStorage.getItem("platformInfo"))}catch(e){}if(!u){let e,t;if("samsung"===n.Dm?(e="android",t=""):"safari"===n.Dm?({os:e,arch:t}=await o.runtime.sendNativeMessage("application.id",{id:"getPlatformInfo"})):({os:e,arch:t}=await o.runtime.getPlatformInfo()),u={os:e,arch:t},n.tn)await s.Ay.set({platformInfo:u},{area:"session"});else try{window.sessionStorage.setItem("platformInfo",JSON.stringify(u))}catch(e){}}return u}();"win"===e?e="windows":"mac"===e&&(e="macos"),["x86-32","i386"].includes(t)?t="386":["x86-64","x86_64"].includes(t)?t="amd64":t.startsWith("arm")&&(t="arm");const a="windows"===e,r="macos"===e,i="linux"===e,c="android"===e,l="ios"===e,p="ipados"===e,g=["android","ios","ipados"].includes(e),d="chrome"===n.Dm,m=["chrome","edge"].includes(n.Dm)&&/\sedg(?:e|a|ios)?\//i.test(navigator.userAgent),f="firefox"===n.Dm,v=["chrome","opera"].includes(n.Dm)&&/\sopr\//i.test(navigator.userAgent),h="safari"===n.Dm,b="samsung"===n.Dm;return{os:e,arch:t,targetEnv:n.Dm,isWindows:a,isMacos:r,isLinux:i,isAndroid:c,isIos:l,isIpados:p,isMobile:g,isChrome:d,isEdge:m,isFirefox:f,isOpera:v,isSafari:h,isSamsung:b}}function g(){return window.matchMedia("(prefers-color-scheme: dark)")}function d(e){return new Promise((t=>self.setTimeout(t,e)))}},4910:(e,t,a)=>{a.d(t,{$n:()=>n.A,In:()=>o.A,K0:()=>r.A,hZ:()=>i.A,qw:()=>s.A});var s=a(4953),n=a(658),o=(a(9608),a(9737),a(4322),a(7546),a(8982),a(9945),a(5937),a(113)),r=a(5189),i=a(8733);a(6173),a(4703),a(3068),a(382),a(5806),a(2471),a(3652),a(7626)}},a={};function s(e){var n=a[e];if(void 0!==n)return n.exports;var o=a[e]={exports:{}};return t[e].call(o.exports,o,o.exports,s),o.exports}s.m=t,e=[],s.O=(t,a,n,o)=>{if(!a){var r=1/0;for(u=0;u<e.length;u++){for(var[a,n,o]=e[u],i=!0,c=0;c<a.length;c++)(!1&o||r>=o)&&Object.keys(s.O).every((e=>s.O[e](a[c])))?a.splice(c--,1):(i=!1,o<r&&(r=o));if(i){e.splice(u--,1);var l=n();void 0!==l&&(t=l)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[a,n,o]},s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var a in t)s.o(t,a)&&!s.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.j=246,(()=>{var e={246:0};s.O.j=t=>0===e[t];var t=(t,a)=>{var n,o,[r,i,c]=a,l=0;if(r.some((t=>0!==e[t]))){for(n in i)s.o(i,n)&&(s.m[n]=i[n]);if(c)var u=c(s)}for(t&&t(a);l<r.length;l++)o=r[l],s.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return s.O(u)},a=globalThis.webpackChunkbuster=globalThis.webpackChunkbuster||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var n=s.O(void 0,[830],(()=>s(3800)));n=s.O(n)})();