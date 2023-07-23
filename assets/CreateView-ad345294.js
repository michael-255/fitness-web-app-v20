import{k as A,W as x,A as E,F as R,D as i,r as $,l as h,_ as B,m as r,n as c,w as v,x as e,G as l,M as D,L as V,p as f,I as a,z as g,H as S,J as F,t as y,Q as I,at as L,a4 as Q,au as T}from"./index-170dd336.js";import{Q as q}from"./QForm-26a44a0f.js";import{_ as N}from"./ErrorStates.vue_vue_type_script_setup_true_lang-418685a4.js";import{_ as j}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-82087cdf.js";import{u as M}from"./action-99601140.js";import{u as W}from"./useDialogs-6c345aa6.js";import{u as z}from"./useRouting-4a9b1b1e.js";import"./QSelect-849a2434.js";import"./QItem-211902f6.js";import"./QItemLabel-4aba8a18.js";import"./QMenu-520beef8.js";import"./selection-79118853.js";import"./QSpace-e07f5388.js";import"./ui-9729b3cb.js";const G={key:0,class:"row justify-center q-my-sm"},H={key:1,class:"row justify-center q-my-sm"},J={class:"row justify-center"},K=y("span",{class:"text-caption q-ml-xs text-warning"}," Correct invalid entries and try again ",-1),le=A({__name:"CreateView",setup(O){x({title:`${E} - Create Record`});const{routeTable:o,goBack:C}=z(),{log:d}=R(),{confirmDialog:b}=W(),t=M(),m=i.getLabel(o,"singular"),_=i.getFieldComponents(o),u=$(!0);h(async()=>{try{t.table=o,t.record=i.getDefaultActionRecord(o)}catch(n){d.error("Error loading create view",n)}}),B(()=>{t.$reset()});async function w(){b("Create",`Create ${m} record?`,a.CREATE,"positive",async()=>{try{t.record.id=L(),t.record.activated=!1,await i.addRecord(o,Q(!0,{},t.record)),d.info("Record created",{table:o,id:t.record.id}),C()}catch(n){d.error("Create failed",n)}})}return(n,s)=>(r(),c(j,{bannerIcon:e(a).CREATE,bannerTitle:`Create ${e(m)}`},{default:v(()=>[e(m)&&e(_).length>0?(r(),c(q,{key:0,onSubmit:w,onValidationError:s[0]||(s[0]=p=>u.value=!1),onValidationSuccess:s[1]||(s[1]=p=>u.value=!0)},{default:v(()=>[(r(!0),l(V,null,D(e(_),(p,k)=>(r(),l("div",{key:k,class:"q-mb-md"},[(r(),c(T(p)))]))),128)),e(t).record.activated?(r(),l("div",H,[f(g,{disable:"",label:"Active",color:"warning",icon:e(a).LOCK},null,8,["icon"])])):(r(),l("div",G,[f(g,{label:"Create",type:"submit",color:"positive",icon:e(a).SAVE},null,8,["icon"])])),S(y("div",J,[f(I,{name:e(a).WARN,color:"warning"},null,8,["name"]),K],512),[[F,!u.value]])]),_:1})):(r(),c(N,{key:1,error:"unknown"}))]),_:1},8,["bannerIcon","bannerTitle"]))}});export{le as default};