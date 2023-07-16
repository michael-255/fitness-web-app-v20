import{Q as L,a as y,b as k,c as B}from"./QTable-637efae8.js";import{k as q,W as O,A,F as E,r,$ as F,D as Q,_ as $,m as i,n as f,w as o,p as a,G as x,M as C,L as T,K as c,z as V,x as u,I as b,t as d,Q as D,a0 as U,v as g,N as j,a1 as G,H as M,J as P}from"./index-e487f782.js";import{Q as R}from"./QSelect-5fe6ec05.js";import{u as z}from"./useRouting-a8cfee2d.js";import{u as H}from"./useDialogs-e0b9ebb9.js";import"./QList-d10005b9.js";import"./QItem-30dce3fe.js";import"./QItemLabel-5481c733.js";import"./QMenu-4706090f.js";import"./selection-76f37adf.js";import"./action-8e9e98ae.js";import"./ui-dd9c7f61.js";const J={class:"row justify-start full-width q-mb-md"},K=d("div",{class:"col-10 text-h6 text-bold ellipsis"},"Logs",-1),W={class:"row justify-start full-width"},X={class:"col-12"},de=q({__name:"DataLogsView",setup(Y){O({title:`${A} - Logs Data Table`});const{log:_}=E(),{goBack:I}=z(),{inspectDialog:N}=H(),m=r(""),n=r([]),h=r(F.getTableColumns()),w=r(h.value.filter(s=>!s.required)),p=r(w.value.map(s=>s.name)),v=Q.liveLogs().subscribe({next:s=>n.value=s,error:s=>_.error("Error fetching live Logs",s)});$(()=>{v==null||v.unsubscribe()});async function S(s){const t=await Q.getLog(Number(s));t?N(t,G.LOGS):_.error("Failed to find Log",{autoId:s})}return(s,t)=>(i(),f(B,{rows:n.value,columns:h.value,"visible-columns":p.value,"rows-per-page-options":[0],filter:m.value,"virtual-scroll":"",fullscreen:"","row-key":"id"},{header:o(e=>[a(y,{props:e},{default:o(()=>[(i(!0),x(T,null,C(e.cols,l=>M((i(),f(L,{key:l.name,props:e},{default:o(()=>[c(g(l.label),1)]),_:2},1032,["props"])),[[P,l.name!=="hiddenAutoId"]])),128)),a(L,{"auto-width":"",class:"text-left"},{default:o(()=>[c("Actions")]),_:1})]),_:2},1032,["props"])]),body:o(e=>[a(y,{props:e},{default:o(()=>[(i(!0),x(T,null,C(e.cols,l=>(i(),f(k,{key:l.name,props:e},{default:o(()=>[c(g(l.value),1)]),_:2},1032,["props"]))),128)),a(k,{"auto-width":""},{default:o(()=>[a(V,{flat:"",round:"",dense:"",class:"q-ml-xs",color:"primary",icon:u(b).INSPECT,onClick:l=>S(e.cols[0].value)},null,8,["icon","onClick"])]),_:2},1024)]),_:2},1032,["props"])]),top:o(()=>[d("div",J,[K,a(V,{round:"",flat:"",class:"absolute-top-right q-mr-sm q-mt-sm",icon:u(b).CLOSE,onClick:t[0]||(t[0]=e=>u(I)())},null,8,["icon"])]),d("div",W,[d("div",X,[a(U,{disable:!n.value.length,outlined:"",dense:"",clearable:"",debounce:"300",modelValue:m.value,"onUpdate:modelValue":t[2]||(t[2]=e=>m.value=e),placeholder:"Search"},{before:o(()=>[a(R,{modelValue:p.value,"onUpdate:modelValue":t[1]||(t[1]=e=>p.value=e),options:w.value,disable:!n.value.length,"bg-color":"primary",standout:"",multiple:"",dense:"","options-dense":"","emit-value":"","map-options":"","option-value":"name","display-value":""},{prepend:o(()=>[a(D,{color:"white",name:u(b).OPTIONS},null,8,["name"])]),_:1},8,["modelValue","options","disable"])]),append:o(()=>[a(D,{name:"search"})]),_:1},8,["disable","modelValue"])])])]),bottom:o(()=>[c(g(u(j)(n.value)),1)]),_:1},8,["rows","columns","visible-columns","filter"]))}});export{de as default};
