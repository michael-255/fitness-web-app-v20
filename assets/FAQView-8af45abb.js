import{c as U,ac as V,h as o,aP as oe,aQ as ie,aR as D,aS as le,a4 as se,aT as ue,g as re,a5 as de,r as j,an as $,aU as ce,e as b,a6 as B,am as p,H as ge,J as he,a2 as fe,Q as P,s as me,k as ve,W as be,A as Y,m as _e,n as xe,w as l,p as a,B as k,q as Q,t as S,v as ye,x as F,I as Se}from"./index-e487f782.js";import{Q as Ie,a as H}from"./QItem-30dce3fe.js";import{Q as R}from"./QItemLabel-5481c733.js";import{Q as we}from"./QList-d10005b9.js";import{_ as Te}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-8bc31765.js";const pe=U({name:"QSlideTransition",props:{appear:Boolean,duration:{type:Number,default:300}},emits:["show","hide"],setup(e,{slots:I,emit:w}){let d=!1,_,i,s=null,c=null,g,T;function x(){_&&_(),_=null,d=!1,s!==null&&(clearTimeout(s),s=null),c!==null&&(clearTimeout(c),c=null),i!==void 0&&i.removeEventListener("transitionend",g),g=null}function u(n,r,f){r!==void 0&&(n.style.height=`${r}px`),n.style.transition=`height ${e.duration}ms cubic-bezier(.25, .8, .50, 1)`,d=!0,_=f}function h(n,r){n.style.overflowY=null,n.style.height=null,n.style.transition=null,x(),r!==T&&w(r)}function A(n,r){let f=0;i=n,d===!0?(x(),f=n.offsetHeight===n.scrollHeight?0:void 0):(T="hide",n.style.overflowY="hidden"),u(n,f,r),s=setTimeout(()=>{s=null,n.style.height=`${n.scrollHeight}px`,g=m=>{c=null,(Object(m)!==m||m.target===n)&&h(n,"show")},n.addEventListener("transitionend",g),c=setTimeout(g,e.duration*1.1)},100)}function C(n,r){let f;i=n,d===!0?x():(T="show",n.style.overflowY="hidden",f=n.scrollHeight),u(n,f,r),s=setTimeout(()=>{s=null,n.style.height=0,g=m=>{c=null,(Object(m)!==m||m.target===n)&&h(n,"hide")},n.addEventListener("transitionend",g),c=setTimeout(g,e.duration*1.1)},100)}return V(()=>{d===!0&&x()}),()=>o(oe,{css:!1,appear:e.appear,onEnter:A,onLeave:C},I.default)}}),y=ie({}),Le=Object.keys(D),q=U({name:"QExpansionItem",props:{...D,...le,...se,icon:String,label:String,labelLines:[Number,String],caption:String,captionLines:[Number,String],dense:Boolean,toggleAriaLabel:String,expandIcon:String,expandedIcon:String,expandIconClass:[Array,String,Object],duration:Number,headerInsetLevel:Number,contentInsetLevel:Number,expandSeparator:Boolean,defaultOpened:Boolean,hideExpandIcon:Boolean,expandIconToggle:Boolean,switchToggleSide:Boolean,denseToggle:Boolean,group:String,popup:Boolean,headerStyle:[Array,String,Object],headerClass:[Array,String,Object]},emits:[...ue,"click","afterShow","afterHide"],setup(e,{slots:I,emit:w}){const{proxy:{$q:d}}=re(),_=de(e,d),i=j(e.modelValue!==null?e.modelValue:e.defaultOpened),s=j(null),c=$(),{show:g,hide:T,toggle:x}=ce({showing:i});let u,h;const A=b(()=>`q-expansion-item q-item-type q-expansion-item--${i.value===!0?"expanded":"collapsed"} q-expansion-item--${e.popup===!0?"popup":"standard"}`),C=b(()=>e.contentInsetLevel===void 0?null:{["padding"+(d.lang.rtl===!0?"Right":"Left")]:e.contentInsetLevel*56+"px"}),n=b(()=>e.disable!==!0&&(e.href!==void 0||e.to!==void 0&&e.to!==null&&e.to!=="")),r=b(()=>{const t={};return Le.forEach(v=>{t[v]=e[v]}),t}),f=b(()=>n.value===!0||e.expandIconToggle!==!0),m=b(()=>e.expandedIcon!==void 0&&i.value===!0?e.expandedIcon:e.expandIcon||d.iconSet.expansionItem[e.denseToggle===!0?"denseIcon":"icon"]),M=b(()=>e.disable!==!0&&(n.value===!0||e.expandIconToggle===!0)),G=b(()=>({expanded:i.value===!0,detailsId:e.targetUid,toggle:x,show:g,hide:T})),E=b(()=>{const t=e.toggleAriaLabel!==void 0?e.toggleAriaLabel:d.lang.label[i.value===!0?"collapse":"expand"](e.label);return{role:"button","aria-expanded":i.value===!0?"true":"false","aria-controls":c,"aria-label":t}});B(()=>e.group,t=>{h!==void 0&&h(),t!==void 0&&N()});function K(t){n.value!==!0&&x(t),w("click",t)}function W(t){t.keyCode===13&&O(t,!0)}function O(t,v){v!==!0&&s.value!==null&&s.value.focus(),x(t),me(t)}function z(){w("afterShow")}function J(){w("afterHide")}function N(){u===void 0&&(u=$()),i.value===!0&&(y[e.group]=u);const t=B(i,L=>{L===!0?y[e.group]=u:y[e.group]===u&&delete y[e.group]}),v=B(()=>y[e.group],(L,ae)=>{ae===u&&L!==void 0&&L!==u&&T()});h=()=>{t(),v(),y[e.group]===u&&delete y[e.group],h=void 0}}function X(){const t={class:[`q-focusable relative-position cursor-pointer${e.denseToggle===!0&&e.switchToggleSide===!0?" items-end":""}`,e.expandIconClass],side:e.switchToggleSide!==!0,avatar:e.switchToggleSide},v=[o(P,{class:"q-expansion-item__toggle-icon"+(e.expandedIcon===void 0&&i.value===!0?" q-expansion-item__toggle-icon--rotated":""),name:m.value})];return M.value===!0&&(Object.assign(t,{tabindex:0,...E.value,onClick:O,onKeyup:W}),v.unshift(o("div",{ref:s,class:"q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",tabindex:-1}))),o(H,t,()=>v)}function Z(){let t;return I.header!==void 0?t=[].concat(I.header(G.value)):(t=[o(H,()=>[o(R,{lines:e.labelLines},()=>e.label||""),e.caption?o(R,{lines:e.captionLines,caption:!0},()=>e.caption):null])],e.icon&&t[e.switchToggleSide===!0?"push":"unshift"](o(H,{side:e.switchToggleSide===!0,avatar:e.switchToggleSide!==!0},()=>o(P,{name:e.icon})))),e.disable!==!0&&e.hideExpandIcon!==!0&&t[e.switchToggleSide===!0?"unshift":"push"](X()),t}function ee(){const t={ref:"item",style:e.headerStyle,class:e.headerClass,dark:_.value,disable:e.disable,dense:e.dense,insetLevel:e.headerInsetLevel};return f.value===!0&&(t.clickable=!0,t.onClick=K,Object.assign(t,n.value===!0?r.value:E.value)),o(Ie,t,Z)}function te(){return ge(o("div",{key:"e-content",class:"q-expansion-item__content relative-position",style:C.value,id:c},fe(I.default)),[[he,i.value]])}function ne(){const t=[ee(),o(pe,{duration:e.duration,onShow:z,onHide:J},te)];return e.expandSeparator===!0&&t.push(o(p,{class:"q-expansion-item__border q-expansion-item__border--top absolute-top",dark:_.value}),o(p,{class:"q-expansion-item__border q-expansion-item__border--bottom absolute-bottom",dark:_.value})),t}return e.group!==void 0&&N(),V(()=>{h!==void 0&&h()}),()=>o("div",{class:A.value},[o("div",{class:"q-expansion-item__container relative-position"},ne())])}}),ke=S("p",null," It is available for free to use and modify under the MIT license. You can learn more by going to the About page. ",-1),Qe=S("p",null," All of your data is being stored locally on the device and web browser you are using this application on. This means you retain control of your data at all times. ",-1),qe=S("p",null," However, this also means you are responsible for making backups of your data by using the export feature in Settings to download it. ",-1),Ae=S("p",null," Use the export feature in Settings to download your data. You can email the exported data file to yourself so you can access it on your other device. ",-1),Ce=S("p",null," Use the import feature in Settings once you are on your other device. This feature allows you to select and load your exported data to this device. ",-1),Be=S("p",null," Your best bet is to go to the Settings page and access the Logs. You can view most errors and other events that occur in the application from there. ",-1),$e=ve({__name:"FAQView",setup(e){return be({title:`${Y} - FAQ`}),(I,w)=>(_e(),xe(Te,{bannerIcon:F(Se).FAQ,bannerTitle:"FAQ"},{default:l(()=>[a(we,{bordered:"",class:"rounded-borders"},{default:l(()=>[a(q,{label:"What is this application?","header-class":"text-weight-bold"},{default:l(()=>[a(k,null,{default:l(()=>[a(Q,null,{default:l(()=>[S("p",null,"This application is called "+ye(F(Y))+". It is a Vue 3 Typescript project.",1),ke]),_:1})]),_:1})]),_:1}),a(p),a(q,{label:"Where is my data stored?","header-class":"text-weight-bold"},{default:l(()=>[a(k,null,{default:l(()=>[a(Q,null,{default:l(()=>[Qe,qe]),_:1})]),_:1})]),_:1}),a(p),a(q,{label:"How do I move my data to another device?","header-class":"text-weight-bold"},{default:l(()=>[a(k,null,{default:l(()=>[a(Q,null,{default:l(()=>[Ae,Ce]),_:1})]),_:1})]),_:1}),a(p),a(q,{label:"How do I troubleshoot application issues?","header-class":"text-weight-bold"},{default:l(()=>[a(k,null,{default:l(()=>[a(Q,null,{default:l(()=>[Be]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["bannerIcon"]))}});export{$e as default};
