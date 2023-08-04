import{Q as D}from"./QBadge-a5afed2a.js";import{k as Y,F as O,r as s,aR as S,l as V,D as c,S as W,aO as G,bn as N,m as l,G as h,t as r,v as d,x as o,p as u,w as T,O as I,n as q}from"./index-3c86ed7e.js";import{C as F,p as P,a as Q,b as U,B as K,c as $,L as j,P as z,d as A,u as J,e as E,f as X}from"./useCharting-828179ed.js";import{_ as Z}from"./ErrorStates.vue_vue_type_script_setup_true_lang-be687cf5.js";import{u as ee}from"./ui-2236d8db.js";const te={key:0},ae={key:0},se={class:"text-h6"},oe={class:"text-caption"},re={key:0},ne=r("div",{class:"text-h6"},"Body Mass Index (BMI)",-1),ie={class:"text-caption"},pe=Y({__name:"ChartBodyWeight",props:{id:{},parentTable:{}},setup(k){const n=k;F.register(P,Q,U,K,$,j,z,A);const{log:w}=O(),{getSingleChartOptions:g,getSingleChartDataset:L,getBmiChartDataset:M}=X(),H=ee(),_=s(!1),t=s(void 0),i=s(0),R=S.BODY_WEIGHT,f=s({labels:[],datasets:[]}),y=s({labels:[],datasets:[]});V(async()=>{t.value=await c.getSettingValue(W.USER_HEIGHT_INCHES),await v()}),J(v);async function v(){try{const{measurementInput:a}=await c.getRecord(n.parentTable,n.id);if(!a||a!==S.BODY_WEIGHT)return;const m=await c.getSortedChildren(c.getChildTable(n.parentTable),n.id);if(m.length===0)return;const p=m.filter(e=>new Date().getTime()-e.createdTimestamp<=G[H.chartTime]);i.value=p.length;const b=p.map(e=>N.formatDate(e.createdTimestamp,"YYYY MMM D")),C=p.map(e=>e.bodyWeight);if(f.value={labels:b,datasets:[L(C,"primary","primary")]},typeof t.value=="number"){const e=C.map(x=>{const B=t.value;return(x/(B*B)*703).toFixed(2)});y.value={labels:b,datasets:[M(e)]}}_.value=!0}catch(a){w.error("Error loading measurement body weight chart",a)}}return(a,m)=>_.value?(l(),h("section",te,[i.value>0?(l(),h("div",ae,[r("div",se,d(o(R)),1),u(D,{rounded:"",color:"secondary",class:"q-py-none"},{default:T(()=>[r("span",oe,d(i.value)+" records in time frame",1)]),_:1}),u(o(E),{options:o(g)(),data:f.value,style:{"max-height":"500px"},class:"q-mb-xl"},null,8,["options","data"]),t.value?(l(),h("div",re,[ne,r("div",null,"Based on height of "+d(t.value)+" inches.",1),u(D,{rounded:"",color:"secondary",class:"q-py-none"},{default:T(()=>[r("span",ie,d(i.value)+" records in time frame",1)]),_:1}),u(o(E),{options:o(g)(),data:y.value,style:{"max-height":"500px"}},null,8,["options","data"])])):I("",!0)])):(l(),q(Z,{key:1,error:"no-data"}))])):I("",!0)}});export{pe as default};