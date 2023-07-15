import{k as x,U as E,A as R,F as $,D as i,r as h,l as B,Y as D,m as t,n as c,w as v,x as e,G as l,M as I,L as V,p as f,I as a,z as y,H as S,J as F,t as C,Q as L,al as Q,am as T,an as q}from"./index-505869b6.js";import{Q as N}from"./QForm-bdc8ac6c.js";import{_ as j}from"./ErrorStates.vue_vue_type_script_setup_true_lang-54eab274.js";import{_ as M}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-546c6620.js";import{u as U}from"./action-c55216f5.js";import{u as z}from"./useDialogs-e9d42dd8.js";import{u as G}from"./useRouting-d6b8128f.js";import"./QSelect-ddac23b4.js";import"./QItem-df2a3384.js";import"./QItemLabel-86187c1c.js";import"./QMenu-d6393f3d.js";import"./selection-41a8b4ed.js";import"./ui-eeb8f693.js";const H={key:0,class:"row justify-center q-my-sm"},J={key:1,class:"row justify-center q-my-sm"},K={class:"row justify-center"},O=C("span",{class:"text-caption q-ml-xs text-warning"}," Correct invalid entries and try again ",-1),le=x({__name:"CreateView",setup(P){E({title:`${R} - Create Record`});const{routeTable:o,routeParentId:_,goBack:b}=G(),{log:d}=$(),{confirmDialog:w}=z(),r=U(),m=i.getLabel(o,"singular"),g=i.getFieldComponents(o),u=h(!0);B(async()=>{try{r.record=i.getDefaultActionRecord(o),_&&(r.record.parentId=_)}catch(n){d.error("Error loading create view",n)}}),D(()=>{r.$reset()});async function k(){w("Create",`Create ${m} record?`,a.CREATE,"positive",async()=>{try{r.record.id=Q(),r.record.activated=!1,await i.addRecord(o,T(!0,{},r.record)),d.info("Record created",{table:o,id:r.record.id}),b()}catch(n){d.error("Create failed",n)}})}return(n,s)=>(t(),c(M,{bannerIcon:e(a).CREATE,bannerTitle:`Create ${e(m)}`},{default:v(()=>[e(m)&&e(g).length>0?(t(),c(N,{key:0,onSubmit:k,onValidationError:s[0]||(s[0]=p=>u.value=!1),onValidationSuccess:s[1]||(s[1]=p=>u.value=!0)},{default:v(()=>[(t(!0),l(V,null,I(e(g),(p,A)=>(t(),l("div",{key:A,class:"q-mb-md"},[(t(),c(q(p),{inspecting:!1}))]))),128)),e(r).record.activated?(t(),l("div",J,[f(y,{disable:"",label:"Active",color:"warning",icon:e(a).LOCK},null,8,["icon"])])):(t(),l("div",H,[f(y,{label:"Create",type:"submit",color:"positive",icon:e(a).SAVE},null,8,["icon"])])),S(C("div",K,[f(L,{name:e(a).WARN,color:"warning"},null,8,["name"]),O],512),[[F,!u.value]])]),_:1})):(t(),c(j,{key:1,error:"unknown"}))]),_:1},8,["bannerIcon","bannerTitle"]))}});export{le as default};
