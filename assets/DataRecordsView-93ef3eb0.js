import{Q as E,a as _,b as x,c as F}from"./QTable-637efae8.js";import{k as M,W as P,A as j,F as H,r as m,D as p,_ as K,m as c,n as f,w as t,p as s,G as S,M as Q,L as V,K as g,x as o,U as y,z as u,I as i,O as W,t as b,v as h,Q as q,a0 as z,N as G,H as J,J as X}from"./index-e487f782.js";import{Q as Y}from"./QSelect-5fe6ec05.js";import{u as Z}from"./useRouting-a8cfee2d.js";import{u as ee}from"./useDialogs-e0b9ebb9.js";import"./QList-d10005b9.js";import"./QItem-30dce3fe.js";import"./QItemLabel-5481c733.js";import"./QMenu-4706090f.js";import"./selection-76f37adf.js";import"./action-8e9e98ae.js";import"./ui-dd9c7f61.js";const oe={class:"row justify-start full-width q-mb-md"},le={class:"col-10 text-h6 text-bold ellipsis"},ae={class:"row justify-start full-width"},te={class:"col-12"},he=M({__name:"DataRecordsView",setup(se){P({title:`${j} - Records Data Table`});const{log:v}=H(),{routeTable:r,goToEdit:I,goToCreate:R,goBack:N}=Z(),{confirmDialog:B,inspectDialog:L,chartsDialog:O}=ee(),C=m(""),d=m([]),T=m(p.getTableColumns(r)),k=m(T.value.filter(l=>!l.required)),D=m(k.value.map(l=>l.name)),w=p.liveDataTable(r).subscribe({next:l=>d.value=l,error:l=>v.error("Error fetching live records data",l)});K(()=>{w==null||w.unsubscribe()});async function $(l,a){B("Delete","Permanently delete this record? Please note that all child records are deleted when you delete a parent record.",i.DELETE,"negative",async()=>{try{await p.deleteRecord(l,a),v.info("Successfully deleted record",{table:l,id:a})}catch(e){v.error("Delete failed",e)}})}async function A(l,a){const e=await p.getRecord(l,a);e?L(e,l):v.error("Failed to find record",{table:l,id:a})}async function U(l,a){O(a,l)}return(l,a)=>(c(),f(F,{rows:d.value,columns:T.value,"visible-columns":D.value,"rows-per-page-options":[0],filter:C.value,"virtual-scroll":"",fullscreen:"","row-key":"id"},{header:t(e=>[s(_,{props:e},{default:t(()=>[(c(!0),S(V,null,Q(e.cols,n=>J((c(),f(E,{key:n.name,props:e},{default:t(()=>[g(h(n.label),1)]),_:2},1032,["props"])),[[X,n.name!=="hiddenId"]])),128)),s(E,{"auto-width":"",class:"text-left"},{default:t(()=>[g("Actions")]),_:1})]),_:2},1032,["props"])]),body:t(e=>[s(_,{props:e},{default:t(()=>[(c(!0),S(V,null,Q(e.cols,n=>(c(),f(x,{key:n.name,props:e},{default:t(()=>[g(h(n.value),1)]),_:2},1032,["props"]))),128)),s(x,{"auto-width":""},{default:t(()=>[[o(y).WORKOUTS,o(y).EXERCISES,o(y).MEASUREMENTS].includes(o(r))?(c(),f(u,{key:0,flat:"",round:"",dense:"",class:"q-ml-xs",color:"accent",icon:o(i).CHARTS,onClick:n=>U(o(r),e.cols[0].value)},null,8,["icon","onClick"])):W("",!0),s(u,{flat:"",round:"",dense:"",class:"q-ml-xs",color:"primary",icon:o(i).INSPECT,onClick:n=>A(o(r),e.cols[0].value)},null,8,["icon","onClick"]),s(u,{flat:"",round:"",dense:"",class:"q-ml-xs",color:"orange-9",icon:o(i).EDIT,onClick:n=>o(I)(o(r),e.cols[0].value)},null,8,["icon","onClick"]),s(u,{flat:"",round:"",dense:"",class:"q-ml-xs",color:"negative",onClick:n=>$(o(r),e.cols[0].value),icon:o(i).DELETE},null,8,["onClick","icon"])]),_:2},1024)]),_:2},1032,["props"])]),top:t(()=>[b("div",oe,[b("div",le,h(o(p).getLabel(o(r),"plural")),1),s(u,{round:"",flat:"",class:"absolute-top-right q-mr-sm q-mt-sm",icon:o(i).CLOSE,onClick:a[0]||(a[0]=e=>o(N)())},null,8,["icon"])]),b("div",ae,[b("div",te,[s(z,{disable:!d.value.length,outlined:"",dense:"",clearable:"",debounce:"300",modelValue:C.value,"onUpdate:modelValue":a[3]||(a[3]=e=>C.value=e),placeholder:"Search"},{before:t(()=>[s(u,{color:"positive",class:"q-px-sm q-mr-xs",icon:o(i).ADD,onClick:a[1]||(a[1]=e=>o(R)(o(r)))},null,8,["icon"]),s(Y,{modelValue:D.value,"onUpdate:modelValue":a[2]||(a[2]=e=>D.value=e),options:k.value,disable:!d.value.length,"bg-color":"primary",standout:"",multiple:"",dense:"","options-dense":"","emit-value":"","map-options":"","option-value":"name","display-value":""},{prepend:t(()=>[s(q,{color:"white",name:o(i).OPTIONS},null,8,["name"])]),_:1},8,["modelValue","options","disable"])]),append:t(()=>[s(q,{name:"search"})]),_:1},8,["disable","modelValue"])])])]),bottom:t(()=>[g(h(o(G)(d.value)),1)]),_:1},8,["rows","columns","visible-columns","filter"]))}});export{he as default};
