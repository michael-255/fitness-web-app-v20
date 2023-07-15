import{Q as E,a as _,b as x,c as F}from"./QTable-149f9231.js";import{k as M,U as P,A as j,F as H,r as m,D as p,Z as K,m as c,n as f,w as a,p as s,G as S,M as V,L as Q,K as g,x as o,V as y,z as u,I as i,O as z,t as b,v as h,Q as q,$ as G,N as J,H as W,J as X}from"./index-8596875a.js";import{Q as Z}from"./QSelect-579acf59.js";import{u as Y}from"./useRouting-297cfe85.js";import{u as ee}from"./useDialogs-f3ccf2ed.js";import"./QList-f93f9ba6.js";import"./QItem-c77875af.js";import"./QItemLabel-4eb89e39.js";import"./QMenu-91bbc20f.js";import"./selection-5a997704.js";import"./action-5374d455.js";import"./ui-e95edf17.js";const oe={class:"row justify-start full-width q-mb-md"},le={class:"col-10 text-h6 text-bold ellipsis"},te={class:"row justify-start full-width"},ae={class:"col-12"},he=M({__name:"DataRecordsView",setup(se){P({title:`${j} - Records Data Table`});const{log:v}=H(),{routeTable:r,goToEdit:I,goToCreate:R,goBack:N}=Y(),{confirmDialog:B,inspectDialog:$,chartsDialog:L}=ee(),C=m(""),d=m([]),T=m(p.getTableColumns(r)),k=m(T.value.filter(l=>!l.required)),D=m(k.value.map(l=>l.name)),w=p.liveDataTable(r).subscribe({next:l=>d.value=l,error:l=>v.error("Error fetching live records data",l)});K(()=>{w==null||w.unsubscribe()});async function O(l,t){B("Delete","Permanently delete this record? Please note that all child records are deleted when you delete a parent record.",i.DELETE,"negative",async()=>{try{await p.deleteRecord(l,t),v.info("Successfully deleted record",{table:l,id:t})}catch(e){v.error("Delete failed",e)}})}async function A(l,t){const e=await p.getRecord(l,t);e?$(e,l):v.error("Failed to find record",{table:l,id:t})}async function U(l,t){L(t,l)}return(l,t)=>(c(),f(F,{rows:d.value,columns:T.value,"visible-columns":D.value,"rows-per-page-options":[0],filter:C.value,"virtual-scroll":"",fullscreen:"","row-key":"id"},{header:a(e=>[s(_,{props:e},{default:a(()=>[(c(!0),S(Q,null,V(e.cols,n=>W((c(),f(E,{key:n.name,props:e},{default:a(()=>[g(h(n.label),1)]),_:2},1032,["props"])),[[X,n.name!=="hiddenId"]])),128)),s(E,{"auto-width":"",class:"text-left"},{default:a(()=>[g("Actions")]),_:1})]),_:2},1032,["props"])]),body:a(e=>[s(_,{props:e},{default:a(()=>[(c(!0),S(Q,null,V(e.cols,n=>(c(),f(x,{key:n.name,props:e},{default:a(()=>[g(h(n.value),1)]),_:2},1032,["props"]))),128)),s(x,{"auto-width":""},{default:a(()=>[[o(y).WORKOUTS,o(y).EXERCISES,o(y).MEASUREMENTS].includes(o(r))?(c(),f(u,{key:0,flat:"",round:"",dense:"",class:"q-ml-xs",color:"accent",icon:o(i).CHARTS,onClick:n=>U(o(r),e.cols[0].value)},null,8,["icon","onClick"])):z("",!0),s(u,{flat:"",round:"",dense:"",class:"q-ml-xs",color:"primary",icon:o(i).INSPECT,onClick:n=>A(o(r),e.cols[0].value)},null,8,["icon","onClick"]),s(u,{flat:"",round:"",dense:"",class:"q-ml-xs",color:"orange-9",icon:o(i).EDIT,onClick:n=>o(I)(o(r),e.cols[0].value)},null,8,["icon","onClick"]),s(u,{flat:"",round:"",dense:"",class:"q-ml-xs",color:"negative",onClick:n=>O(o(r),e.cols[0].value),icon:o(i).DELETE},null,8,["onClick","icon"])]),_:2},1024)]),_:2},1032,["props"])]),top:a(()=>[b("div",oe,[b("div",le,h(o(p).getLabel(o(r),"plural")),1),s(u,{round:"",flat:"",class:"absolute-top-right q-mr-sm q-mt-sm",icon:o(i).CLOSE,onClick:t[0]||(t[0]=e=>o(N)())},null,8,["icon"])]),b("div",te,[b("div",ae,[s(G,{disable:!d.value.length,outlined:"",dense:"",clearable:"",debounce:"300",modelValue:C.value,"onUpdate:modelValue":t[3]||(t[3]=e=>C.value=e),placeholder:"Search"},{before:a(()=>[s(u,{color:"positive",class:"q-px-sm q-mr-xs",icon:o(i).ADD,onClick:t[1]||(t[1]=e=>o(R)(o(r)))},null,8,["icon"]),s(Z,{modelValue:D.value,"onUpdate:modelValue":t[2]||(t[2]=e=>D.value=e),options:k.value,disable:!d.value.length,"bg-color":"primary",standout:"",multiple:"",dense:"","options-dense":"","emit-value":"","map-options":"","option-value":"name","display-value":""},{prepend:a(()=>[s(q,{color:"white",name:o(i).OPTIONS},null,8,["name"])]),_:1},8,["modelValue","options","disable"])]),append:a(()=>[s(q,{name:"search"})]),_:1},8,["disable","modelValue"])])])]),bottom:a(()=>[g(h(o(J)(d.value)),1)]),_:1},8,["rows","columns","visible-columns","filter"]))}});export{he as default};
