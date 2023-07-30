import{g as G,r as S,k as H,m as l,n as D,w as s,x as t,C as Q,p as e,q as v,b5 as N,Q as $,t as q,v as _,K as L,V as P,z as O,B as z,a7 as V,a6 as E,D as x,l as M,a4 as U,_ as J,I as T,b8 as j,b7 as A,G as p,M as I,L as R,O as K,aO as m,au as W,bJ as Y}from"./index-335a3f30.js";import{u as X}from"./action-89c2ba95.js";import{Q as Z}from"./QSelect-cb947bc6.js";import{Q as ee}from"./QSpace-9f51e299.js";import{_ as oe}from"./ErrorStates.vue_vue_type_script_setup_true_lang-5ab403e4.js";import{u as te}from"./ui-c2eb328b.js";const ne=()=>!0;function ae(i){const n={};return i.forEach(r=>{n[r]=ne}),n}function b(){const{emit:i,proxy:n}=G(),r=S(null);function f(){r.value.show()}function u(){r.value.hide()}function o(h){i("ok",h),u()}function a(){i("hide")}return Object.assign(n,{show:f,hide:u}),{dialogRef:r,onDialogHide:a,onDialogOK:o,onDialogCancel:u}}const F=["ok","hide"];b.emits=F;b.emitsObject=ae(F);const se={class:"text-h6"},le=H({__name:"ConfirmationDialog",props:{title:{},message:{},icon:{},color:{}},emits:[...b.emits],setup(i){const n=i,{dialogRef:r,onDialogHide:f,onDialogOK:u,onDialogCancel:o}=b();return(a,h)=>(l(),D(Q,{ref_key:"dialogRef",ref:r,onHide:t(f)},{default:s(()=>[e(z,{class:"q-dialog-plugin"},{default:s(()=>[e(v,{class:N(`bg-${n.color} text-white q-py-sm`)},{default:s(()=>[e($,{name:a.icon,size:"sm",class:"q-pb-sm q-mr-md"},null,8,["name"]),q("span",se,_(a.title),1)]),_:1},8,["class"]),e(v,{class:"q-mt-md"},{default:s(()=>[L(_(a.message),1)]),_:1}),e(P,{align:"right"},{default:s(()=>[e(O,{flat:"",label:"Cancel",onClick:t(o)},null,8,["onClick"]),e(O,{flat:"",label:"Confirm",color:a.color,onClick:t(u)},null,8,["color","onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}}),ie={class:"text-h6"},re=H({__name:"DismissalDialog",props:{title:{},message:{},icon:{},color:{}},emits:[...b.emits],setup(i){const n=i,{dialogRef:r,onDialogHide:f,onDialogOK:u}=b();return(o,a)=>(l(),D(Q,{ref_key:"dialogRef",ref:r,onHide:t(f)},{default:s(()=>[e(z,{class:"q-dialog-plugin"},{default:s(()=>[e(v,{class:N(`bg-${n.color} text-white q-py-sm`)},{default:s(()=>[e($,{name:o.icon,size:"sm",class:"q-pb-sm q-mr-md"},null,8,["name"]),q("span",ie,_(o.title),1)]),_:1},8,["class"]),e(v,{class:"q-mt-md"},{default:s(()=>[L(_(o.message),1)]),_:1}),e(P,{align:"right"},{default:s(()=>[e(O,{flat:"",label:"Dismiss",onClick:t(u)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}}),ce={class:"text-h5"},ue={key:0},de={class:"text-weight-bold text-body1"},me={key:0},pe={key:1},fe={key:2},ge=H({__name:"InspectionDialog",props:{record:{},table:{}},emits:[...b.emits],setup(i){const n=i,{dialogRef:r,onDialogHide:f,onDialogOK:u}=b(),o=X(),a=n.table===V.LOGS?E.getInspectionItems():x.getInspectionItems(n.table),h=n.table===V.LOGS?E.getLabel("singular"):x.getLabel(n.table,"singular");return M(async()=>{U(!0,o.record,n.record)}),J(()=>{o.$reset()}),(k,y)=>(l(),D(Q,{ref_key:"dialogRef",ref:r,"transition-show":"slide-up","transition-hide":"slide-down",maximized:"",onHide:t(f)},{default:s(()=>[e(A,{class:"bg-info text-white",style:{"max-height":"50px"}},{default:s(()=>[e($,{name:t(T).INSPECT,size:"sm",class:"q-mx-sm"},null,8,["name"]),e(j,null,{default:s(()=>[L("Inspect")]),_:1}),e(O,{flat:"",round:"",icon:t(T).CLOSE,onClick:t(u)},null,8,["icon","onClick"])]),_:1}),e(z,{class:"q-dialog-plugin"},{default:s(()=>[e(v,null,{default:s(()=>[q("p",ce,_(t(h)),1),(l(!0),p(R,null,I(t(a),(d,c)=>(l(),p("div",{key:c,class:"q-mb-md"},[t(o).record[d.field]!==void 0?(l(),p("div",ue,[q("div",de,_(d.label),1),d.output==="single"?(l(),p("div",me,_(d.format(t(o).record[d.field])),1)):d.output==="list"?(l(),p("div",pe,[(l(!0),p(R,null,I(t(o).record[d.field],(C,g)=>(l(),p("li",{key:g,class:"q-ml-sm"},_(d.format(C)),1))),128))])):d.output==="key-values"?(l(),p("div",fe,[(l(!0),p(R,null,I(t(o).record[d.field],(C,g)=>(l(),p("li",{key:g,class:"q-ml-sm"},_(g)+": "+_(C),1))),128))])):K("",!0)])):K("",!0)]))),128))]),_:1})]),_:1})]),_:1},8,["onHide"]))}}),_e={class:"text-h5"},he=q("p",null,"Select how far back you want the charts to display.",-1),be=H({__name:"ChartingDialog",props:{id:{},parentTable:{}},emits:[...b.emits],setup(i){const n=i,{dialogRef:r,onDialogHide:f,onDialogOK:u}=b(),o=te(),a=S(null),h=S([m[m["One Week"]],m[m["One Month"]],m[m["Three Months"]],m[m["Six Months"]],m[m["One Year"]],m[m["All Time"]]]),k=x.getChartComponents(n.parentTable),y=S("");M(async()=>{const c=await x.getRecord(n.parentTable,n.id);c&&(c!=null&&c.name)?y.value=c.name:y.value=x.getLabel(n.parentTable,"singular")});function d(c){return c!=null&&c!==""}return(c,C)=>(l(),D(Q,{ref_key:"dialogRef",ref:r,"transition-show":"slide-up","transition-hide":"slide-down",maximized:"",onHide:t(f)},{default:s(()=>[e(A,{class:"bg-info text-white",style:{"max-height":"50px"}},{default:s(()=>[e($,{name:t(T).CHARTS,size:"sm",class:"q-mx-sm"},null,8,["name"]),e(j,null,{default:s(()=>[L("Charts")]),_:1}),e(O,{flat:"",round:"",icon:t(T).CLOSE,onClick:t(u)},null,8,["icon","onClick"])]),_:1}),e(z,{class:"q-dialog-plugin"},{default:s(()=>[t(k).length>0?(l(),D(v,{key:0},{default:s(()=>[q("p",_e,_(y.value),1),he,e(Z,{modelValue:t(o).chartTime,"onUpdate:modelValue":C[0]||(C[0]=g=>t(o).chartTime=g),ref_key:"inputRef",ref:a,label:"Chart Time",options:h.value,rules:[g=>d(g)||"Required"],"emit-value":"","map-options":"","options-dense":"",dense:"",outlined:"",color:"primary",onBlur:C[1]||(C[1]=g=>{var w,B;return!!((B=(w=a.value)==null?void 0:w.value)!=null&&B.validate())})},null,8,["modelValue","options","rules"]),(l(!0),p(R,null,I(t(k),(g,w)=>(l(),p("div",{key:w},[(l(),D(W(g),{id:c.id,parentTable:c.parentTable},null,8,["id","parentTable"]))]))),128)),e(ee,{class:"q-mb-xl"})]),_:1})):(l(),D(oe,{key:1,error:"no-data"}))]),_:1})]),_:1},8,["onHide"]))}});function xe(){const i=Y();function n(o,a,h,k,y){i.dialog({component:le,componentProps:{title:o,message:a,icon:h,color:k}}).onOk(()=>{y()})}function r(o,a,h=T.INFO,k="info"){i.dialog({component:re,componentProps:{title:o,message:a,icon:h,color:k}})}function f(o,a){i.dialog({component:ge,componentProps:{record:o,table:a}})}function u(o,a){i.dialog({component:be,componentProps:{id:o,parentTable:a}})}return{confirmDialog:n,dismissDialog:r,inspectDialog:f,chartsDialog:u}}export{xe as u};
