import{Q as k}from"./QBadge-17edac61.js";import{k as x,F as B,r as o,l as S,D as d,aO as L,bn as w,m as n,G as u,t as p,v as h,p as f,w as E,x as g,n as M,O as V}from"./index-c45c6fd4.js";import{C as Y,p as N,a as O,b as R,B as W,c as I,L as P,P as Q,d as q,u as F,e as G,f as U}from"./useCharting-87212237.js";import{_ as $}from"./ErrorStates.vue_vue_type_script_setup_true_lang-b93d4517.js";import{u as j}from"./ui-6f0c53c1.js";const z={key:0},A={key:0},H={class:"text-caption"},J="Workout Duration (minutes)",ae=x({__name:"ChartWorkoutDuration",props:{id:{},parentTable:{}},setup(_){const i=_;Y.register(N,O,R,W,I,P,Q,q);const{log:C}=B(),{getSingleChartOptions:y,getSingleChartDataset:D}=U(),v=j(),c=o(!1),s=o(0),l=o({labels:[],datasets:[]});S(async()=>{await m()}),F(m);async function m(){try{const t=await d.getSortedChildren(d.getChildTable(i.parentTable),i.id);if(t.length===0)return;const a=t.filter(e=>new Date().getTime()-e.createdTimestamp<=L[v.chartTime]);s.value=a.length;const T=a.map(e=>w.formatDate(e.createdTimestamp,"YYYY MMM D")),b=a.map(e=>{if(e.createdTimestamp!==void 0&&e.finishedTimestamp!==void 0){const r=(e.finishedTimestamp-e.createdTimestamp)/6e4;return r<.1?0:r}else return 0});l.value={labels:T,datasets:[D(b,"primary","primary")]},c.value=!0}catch(t){C.error("Error loading workout duration chart",t)}}return(t,a)=>c.value?(n(),u("section",z,[s.value>0?(n(),u("div",A,[p("div",{class:"text-h6"},h(J)),f(k,{rounded:"",color:"secondary",class:"q-py-none"},{default:E(()=>[p("span",H,h(s.value)+" records in time frame",1)]),_:1}),f(g(G),{options:g(y)(),data:l.value,style:{"max-height":"500px"}},null,8,["options","data"])])):(n(),M($,{key:1,error:"no-data"}))])):V("",!0)}});export{ae as default};
