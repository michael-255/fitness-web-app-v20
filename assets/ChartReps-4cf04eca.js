import{Q as k}from"./QBadge-6513a4e9.js";import{k as x,F as L,r as n,$ as u,l as R,D as i,aO as w,bn as M,m as c,G as h,t as f,v as g,x as l,p as _,w as P,n as V,O as Y}from"./index-ffd0294f.js";import{C as N,p as O,a as Q,b as $,B as q,c as F,L as G,P as U,d as W,u as j,e as z,f as A}from"./useCharting-a986e035.js";import{_ as H}from"./ErrorStates.vue_vue_type_script_setup_true_lang-ff855ea3.js";import{u as I}from"./ui-c377fbe5.js";const J={key:0},K={key:0},X={class:"text-h6"},Z={class:"text-caption"},ne=x({__name:"ChartReps",props:{id:{},parentTable:{}},setup(C){const a=C;N.register(O,Q,$,q,F,G,U,W);const{log:y}=L(),{getChartOptions:D,getChartData:b,getChartDataset:v}=A(),T=I(),d=n(!1),s=n(0),B=u.REPS,m=n({labels:[],datasets:[]});R(async()=>{await p()}),j(p);async function p(){try{const{exerciseInputs:e}=await i.getRecord(a.parentTable,a.id);if((e==null?void 0:e.length)===0)return;e!=null&&e.includes(u.REPS)&&(d.value=!0);const r=await i.getSortedChildren(i.getChildTable(a.parentTable),a.id);if(r.length===0)return;const o=r.filter(t=>new Date().getTime()-t.createdTimestamp<=w[T.chartTime]);s.value=o.length;const E=o.map(t=>M.formatDate(t.createdTimestamp,"YYYY MMM D")),S=o.map(t=>t.reps);m.value=b(E,v(S,"primary","info"))}catch(e){y.error("Error loading exercise reps chart",e)}}return(e,r)=>d.value?(c(),h("section",J,[s.value>0?(c(),h("div",K,[f("div",X,g(l(B)),1),_(k,{rounded:"",color:"secondary",class:"q-py-none"},{default:P(()=>[f("span",Z,g(s.value)+" records in time frame",1)]),_:1}),_(l(z),{options:l(D)(),data:m.value,style:{"max-height":"500px"}},null,8,["options","data"])])):(c(),V(H,{key:1,error:"no-data"}))])):Y("",!0)}});export{ne as default};
