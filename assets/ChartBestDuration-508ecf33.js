import{Q as x}from"./QBadge-0e554717.js";import{k as S,F as k,r as i,l as L,D as c,$ as w,aO as E,bn as M,m as l,G as p,t as h,v as f,p as g,w as R,x as _,n as N,O}from"./index-170dd336.js";import{C as V,p as Y,a as P,b as Q,B as U,c as $,L as q,P as A,d as F,u as G,e as I,f as W}from"./useCharting-68c7fcf7.js";import{_ as j}from"./ErrorStates.vue_vue_type_script_setup_true_lang-418685a4.js";import{u as z}from"./ui-9729b3cb.js";const H={key:0},J={key:0},K={class:"text-caption"},X="Best Duration (minutes)",re=S({__name:"ChartBestDuration",props:{id:{},parentTable:{}},setup(C){const a=C;V.register(Y,P,Q,U,$,q,A,F);const{log:D}=k(),{getSingleChartOptions:b,getSingleChartDataset:y}=W(),v=z(),d=i(!1),s=i(0),u=i({labels:[],datasets:[]});L(async()=>{await m()}),G(m);async function m(){try{const{exerciseInputs:e}=await c.getRecord(a.parentTable,a.id);if((e==null?void 0:e.length)===0||!(e!=null&&e.includes(w.DURATION)))return;const r=await c.getSortedChildren(c.getChildTable(a.parentTable),a.id);if(r.length===0)return;const n=r.filter(t=>new Date().getTime()-t.createdTimestamp<=E[v.chartTime]);s.value=n.length;const B=n.map(t=>M.formatDate(t.createdTimestamp,"YYYY MMM D")),T=n.map(t=>{const o=Math.max(...t.durationMinutes)/6e4;return o<.1?0:o});u.value={labels:B,datasets:[y(T,"accent","accent")]},d.value=!0}catch(e){D.error("Error loading exercise best duration chart",e)}}return(e,r)=>d.value?(l(),p("section",H,[s.value>0?(l(),p("div",J,[h("div",{class:"text-h6"},f(X)),g(x,{rounded:"",color:"secondary",class:"q-py-none"},{default:R(()=>[h("span",K,f(s.value)+" records in time frame",1)]),_:1}),g(_(I),{options:_(b)(),data:u.value,style:{"max-height":"500px"}},null,8,["options","data"])])):(l(),N(j,{key:1,error:"no-data"}))])):O("",!0)}});export{re as default};