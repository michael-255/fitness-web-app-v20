import{Q as w}from"./QBadge-43d1038a.js";import{C as B,p as L,a as M,b as S,B as Y,c as R,L as E,P as N,d as P,u as V,e as F,f as O}from"./useChartTimeWatcher-d24f242a.js";import{k as Q,F as q,r as d,aR as G,l as H,D as m,aO as I,bn as u,m as n,G as p,t as h,K,v as f,x as g,p as _,w as U,n as W,L as $}from"./index-ff52cf3d.js";import{_ as j}from"./ErrorStates.vue_vue_type_script_setup_true_lang-73a5f6dd.js";import{u as z}from"./ui-a8e57791.js";const A={class:"text-h6"},J={class:"text-caption"},X={key:0},oe=Q({__name:"ChartInches",props:{id:{},parentTable:{}},setup(b){const c=b;B.register(L,M,S,Y,R,E,N,P);const C=z(),{getPaletteColor:r}=O,{log:y}=q();V(l);const s=d(0),D=G.INCHES,T={reactive:!0,responsive:!0,aspectRatio:1,radius:2,plugins:{legend:{display:!1},tooltip:{callbacks:{title:e=>{var a;return u.formatDate((a=e==null?void 0:e[0])==null?void 0:a.label,"ddd, YYYY MMM D, h:mm a")}}}},interaction:{intersect:!1},scales:{x:{ticks:{autoSkip:!0,maxRotation:70,minRotation:70}}}},i=d({labels:[],datasets:[]});H(async()=>{await l()});function k(e,a){return e.p0.parsed.y>e.p1.parsed.y?a:void 0}async function l(){try{const e=m.getChildTable(c.parentTable),a=await m.getSortedChildren(e,c.id);if(a.length>0){const o=a.filter(t=>new Date().getTime()-t.createdTimestamp<=I[C.chartTime]);s.value=o.length;const v=o.map(t=>u.formatDate(t.createdTimestamp,"YYYY MMM D")),x=o.map(t=>t.inches);i.value={labels:v,datasets:[{label:"",backgroundColor:r("white"),borderColor:r("white"),segment:{borderColor:t=>k(t,r("info"))||r("primary")},data:x}]}}}catch(e){y.error("Error loading number chart",e)}}return(e,a)=>(n(),p($,null,[h("p",A,[K(f(g(D))+" ",1),_(w,{rounded:"",color:"secondary",class:"q-py-none"},{default:U(()=>[h("span",J,f(s.value)+" records in time frame",1)]),_:1})]),s.value>0?(n(),p("div",X,[_(g(F),{options:T,data:i.value,style:{"max-height":"500px"}},null,8,["data"])])):(n(),W(j,{key:1,error:"no-data"}))],64))}});export{oe as default};