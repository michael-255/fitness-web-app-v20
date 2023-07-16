import{Q as x}from"./QBadge-43d1038a.js";import{C as B,p as Y,a as L,b as M,B as R,c as S,L as E,P as W,d as N,u as O,e as P,f as V}from"./useChartTimeWatcher-d24f242a.js";import{k as F,F as G,r as d,aR as Q,l as q,D as m,aO as H,bn as p,m as n,G as u,t as h,K,v as f,x as g,p as _,w as U,n as $,L as j}from"./index-ff52cf3d.js";import{_ as z}from"./ErrorStates.vue_vue_type_script_setup_true_lang-73a5f6dd.js";import{u as A}from"./ui-a8e57791.js";const I={class:"text-h6"},J={class:"text-caption"},X={key:0},oe=F({__name:"ChartBodyWeight",props:{id:{},parentTable:{}},setup(b){const i=b;B.register(Y,L,M,R,S,E,W,N);const y=A(),{getPaletteColor:r}=V,{log:C}=G();O(l);const s=d(0),D=Q.BODY_WEIGHT,T={reactive:!0,responsive:!0,aspectRatio:1,radius:2,plugins:{legend:{display:!1},tooltip:{callbacks:{title:e=>{var a;return p.formatDate((a=e==null?void 0:e[0])==null?void 0:a.label,"ddd, YYYY MMM D, h:mm a")}}}},interaction:{intersect:!1},scales:{x:{ticks:{autoSkip:!0,maxRotation:70,minRotation:70}}}},c=d({labels:[],datasets:[]});q(async()=>{await l()});function k(e,a){return e.p0.parsed.y>e.p1.parsed.y?a:void 0}async function l(){try{const e=m.getChildTable(i.parentTable),a=await m.getSortedChildren(e,i.id);if(a.length>0){const o=a.filter(t=>new Date().getTime()-t.createdTimestamp<=H[y.chartTime]);s.value=o.length;const v=o.map(t=>p.formatDate(t.createdTimestamp,"YYYY MMM D")),w=o.map(t=>t.bodyWeight);c.value={labels:v,datasets:[{label:"",backgroundColor:r("white"),borderColor:r("white"),segment:{borderColor:t=>k(t,r("info"))||r("primary")},data:w}]}}}catch(e){C.error("Error loading body weight chart",e)}}return(e,a)=>(n(),u(j,null,[h("p",I,[K(f(g(D))+" ",1),_(x,{rounded:"",color:"secondary",class:"q-py-none"},{default:U(()=>[h("span",J,f(s.value)+" records in time frame",1)]),_:1})]),s.value>0?(n(),u("div",X,[_(g(P),{options:T,data:c.value,style:{"max-height":"500px"}},null,8,["data"])])):(n(),$(z,{key:1,error:"no-data"}))],64))}});export{oe as default};
