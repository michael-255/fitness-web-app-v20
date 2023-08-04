import{k as K,F as J,r as k,l as Y,D as u,$ as Q,m as a,n as E,w as v,p as f,q as P,t as i,v as q,G as R,z as F,x as o,a0 as S,I as c,O as h,L as U,M as j,K as oe,a1 as z,a2 as re,a3 as Z,Q as N,B as H,U as ee,a4 as te,a5 as ne,W as le,A as ae,_ as ue,H as ie,J as ce}from"./index-3c86ed7e.js";import{Q as de}from"./QForm-8c46c45d.js";import{_ as ve}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-5e435e8f.js";import{Q as me}from"./QBadge-a5afed2a.js";import{u as se}from"./useDialogs-e947ab5c.js";import{u as pe}from"./useRouting-14381c6d.js";import"./action-8f1b4305.js";import"./QSelect-858652ff.js";import"./QItem-cf5e025b.js";import"./QItemLabel-5b29e1cc.js";import"./QMenu-3e968ab3.js";import"./selection-ab68a012.js";import"./QSpace-2d58ec78.js";import"./ErrorStates.vue_vue_type_script_setup_true_lang-be687cf5.js";import"./ui-2236d8db.js";const fe={class:"text-h6"},xe={class:"row q-mb-sm"},Ee={class:"col"},ge={key:0,class:"column reverse"},ke={class:"absolute-top-right q-ma-xs"},_e={key:0},be={class:"col"},ye={class:"row q-mt-xs"},he=K({__name:"ActiveExerciseCard",props:{parentExercise:{},exerciseResult:{}},setup(G){const _=G,{log:I}=J(),{confirmDialog:O,dismissDialog:W}=se(),d=k(_.parentExercise),n=k(_.exerciseResult),b=k([]),x=k([]);Y(async()=>{b.value=await u.getPreviousExerciseResults(_.parentExercise.id),(_.parentExercise.exerciseInputs||[]).forEach(e=>{var s;Object.values(Q).includes(e)&&m((s=n.value)==null?void 0:s[u.getFieldForInput(e)])})});function m(t){x.value=new Array((t==null?void 0:t.length)||0).fill(null)}function C(){x.value.length>0&&x.value.length<S.MAX_SETS&&((_.parentExercise.exerciseInputs||[]).forEach(e=>{var s,r;Object.values(Q).includes(e)&&((s=n.value)==null||s[u.getFieldForInput(e)].push(null),m((r=n.value)==null?void 0:r[u.getFieldForInput(e)]))}),$())}function B(){O("Remove Last Set","Are you sure you want to remove the last set?",c.REMOVE_SET,"warning",async()=>{try{x.value.length>1&&((_.parentExercise.exerciseInputs||[]).forEach(e=>{var s,r;Object.values(Q).includes(e)&&((s=n.value)==null||s[u.getFieldForInput(e)].pop(),m((r=n.value)==null?void 0:r[u.getFieldForInput(e)]))}),$())}catch(t){I.error("Failed to remove last set",t)}})}async function $(){return await u.putActiveRecord(ee.EXERCISE_RESULTS,te(!0,{},n.value))}async function D(){var t;return n.value.note=(t=n.value.note)==null?void 0:t.trim(),await $()}function M(t,e){var s,r;if(t===ne.WEIGHT)return L(e);{const g=(s=d.value)==null?void 0:s.previousChild;return(r=g==null?void 0:g[t])!=null&&r[e]?`${g[t][e]}`:"No previous value"}}function L(t){var g,p,w,T;const e=b.value;let s="No previous value",r="";for(let y=0;y<6;y++){const A=((p=(g=e[y])==null?void 0:g.weightLbs)==null?void 0:p[t])??0;if(A!==void 0)if(y===0)s=`${A}`;else{const X=((T=(w=e[y-1])==null?void 0:w.weightLbs)==null?void 0:T[t])??0;r+=`${X-A}`,y<6-1&&(r+=", ")}}return r.endsWith(", ")&&(r=r.slice(0,-2)),r?`${s} ← ${r}`:s}function l(t){W("Previous Exercise Note",t,c.NOTE)}return(t,e)=>(a(),E(H,null,{default:v(()=>[f(P,null,{default:v(()=>{var s,r,g;return[i("p",fe,q(d.value.name),1),i("div",xe,[i("div",Ee,q(d.value.desc),1),(s=d.value)!=null&&s.multipleSets?(a(),R("div",ge,[i("div",null,[f(F,{disable:x.value.length>=o(S).MAX_SETS,color:"positive",class:"q-ml-sm",round:"",icon:o(c).ADD,onClick:e[0]||(e[0]=p=>C())},null,8,["disable","icon"]),f(F,{disable:x.value.length<=1,color:"negative",class:"q-ml-sm",round:"",icon:o(c).REMOVE,onClick:e[1]||(e[1]=p=>B())},null,8,["disable","icon"])])])):h("",!0),i("div",ke,[(g=(r=d.value)==null?void 0:r.previousChild)!=null&&g.note?(a(),E(F,{key:0,flat:"",round:"",icon:o(c).NOTE,color:"info",onClick:e[2]||(e[2]=p=>l(d.value.previousChild.note))},null,8,["icon"])):h("",!0)])]),x.value.length>0?(a(),R("div",_e,[(a(!0),R(U,null,j(x.value,(p,w)=>{var T,y;return a(),R("div",{key:w,class:"row q-mb-md"},[(T=d.value)!=null&&T.multipleSets?(a(),E(me,{key:0,size:"lg",color:"secondary",class:"text-bold text-body1 q-mr-sm"},{default:v(()=>[oe(q(w+1),1)]),_:2},1024)):h("",!0),i("div",be,[i("div",ye,[(a(!0),R(U,null,j((y=d.value)==null?void 0:y.exerciseInputs,(A,X)=>(a(),E(z,{key:X,"stack-label":"",class:"col-6 q-mb-xs",type:"number",step:"0.01",filled:"",square:"",dense:"",modelValue:n.value[o(u).getFieldForInput(A)][w],"onUpdate:modelValue":V=>n.value[o(u).getFieldForInput(A)][w]=V,modelModifiers:{number:!0},rules:[V=>o(re).safeParse(V).success||"Required"],label:A,hint:M(o(u).getFieldForInput(A),w),onBlur:e[3]||(e[3]=V=>$())},null,8,["modelValue","onUpdate:modelValue","rules","label","hint"]))),128))])])])}),128))])):h("",!0),f(z,{label:`${d.value.name} notes`,modelValue:n.value.note,"onUpdate:modelValue":e[5]||(e[5]=p=>n.value.note=p),rules:[p=>o(Z).safeParse(p).success||`Note cannot exceed ${o(S).MAX_TEXT_AREA} characters`],maxlength:o(S).MAX_TEXT_AREA,type:"textarea","lazy-rules":"",autogrow:"",counter:"",dense:"",outlined:"",color:"primary",onBlur:e[6]||(e[6]=p=>D())},{prepend:v(()=>[f(N,{name:o(c).NOTE},null,8,["name"])]),append:v(()=>[n.value.note!==""?(a(),E(N,{key:0,name:o(c).CANCEL,onClick:e[4]||(e[4]=p=>n.value.note=""),class:"cursor-pointer"},null,8,["name"])):h("",!0)]),_:1},8,["label","modelValue","rules","maxlength"])]}),_:1})]),_:1}))}}),we=i("p",{class:"text-h6"},"Workout Description",-1),Ae={class:"absolute-top-right q-ma-xs"},$e=i("p",{class:"text-h6"},"Workout Notes",-1),Re={class:"row justify-center q-my-sm"},Se={class:"row justify-center"},Te=i("span",{class:"text-caption q-ml-xs text-warning"}," Correct invalid entries and try again ",-1),Ue=K({__name:"ActiveView",setup(G){le({title:`${ae} - Active Workout`});const{log:_}=J(),{confirmDialog:I,dismissDialog:O}=se(),{goToDashboard:W}=pe(),d=k(!1),n=k(!0),b=k({}),x=k([]),m=k({}),C=k([]),B=u.liveActiveWorkout().subscribe({next:l=>{b.value=l.parentWorkout,x.value=l.parentExercises,m.value=l.workoutResult,C.value=l.exerciseResults},error:l=>_.error("Error fetching live Active Workout",l)});Y(async()=>{d.value=await u.isActiveWorkout(),d.value||W()}),ue(()=>{B.unsubscribe()});async function $(){I("Finish Workout","Are you ready to finish and save this workout?",c.SAVE,"positive",async()=>{try{await u.finishWorkout(),W()}catch(l){_.error("Failed to save active workout",l)}})}function D(l){return x.value.find(t=>t.id===l)||{}}function M(l){O("Previous Workout Note",l,c.NOTE)}async function L(){var l;return m.value.note=(l=m.value.note)==null?void 0:l.trim(),await u.putActiveRecord(ee.WORKOUT_RESULTS,te(!0,{},m.value))}return(l,t)=>(a(),E(ve,null,{default:v(()=>[d.value?(a(),E(de,{key:0,onSubmit:$,onValidationError:t[4]||(t[4]=e=>n.value=!1),onValidationSuccess:t[5]||(t[5]=e=>n.value=!0)},{default:v(()=>[b.value.desc?(a(),E(H,{key:0,class:"q-mt-sm q-mb-md"},{default:v(()=>[f(P,null,{default:v(()=>{var e,s;return[we,i("div",null,q(b.value.desc),1),i("div",Ae,[(s=(e=b.value)==null?void 0:e.previousChild)!=null&&s.note?(a(),E(F,{key:0,flat:"",round:"",icon:o(c).NOTE,color:"info",onClick:t[0]||(t[0]=r=>M(b.value.previousChild.note))},null,8,["icon"])):h("",!0)])]}),_:1})]),_:1})):h("",!0),(a(!0),R(U,null,j(C.value,e=>(a(),E(he,{key:e.id,parentExercise:D(e.parentId),exerciseResult:e,class:"q-mb-md"},null,8,["parentExercise","exerciseResult"]))),128)),f(H,{class:"q-mt-sm q-mb-md"},{default:v(()=>[f(P,null,{default:v(()=>[$e,f(z,{label:`${b.value.name} notes`,modelValue:m.value.note,"onUpdate:modelValue":t[2]||(t[2]=e=>m.value.note=e),rules:[e=>o(Z).safeParse(e).success||`Note cannot exceed ${o(S).MAX_TEXT_AREA} characters`],maxlength:o(S).MAX_TEXT_AREA,type:"textarea","lazy-rules":"",autogrow:"",counter:"",dense:"",outlined:"",color:"primary",onBlur:t[3]||(t[3]=e=>L())},{prepend:v(()=>[f(N,{name:o(c).NOTE},null,8,["name"])]),append:v(()=>[m.value.note!==""?(a(),E(N,{key:0,name:o(c).CANCEL,onClick:t[1]||(t[1]=e=>m.value.note=""),class:"cursor-pointer"},null,8,["name"])):h("",!0)]),_:1},8,["label","modelValue","rules","maxlength"])]),_:1})]),_:1}),i("div",Re,[f(F,{label:"Finish Workout",type:"submit",color:"positive",icon:o(c).SAVE},null,8,["icon"])]),ie(i("div",Se,[f(N,{name:o(c).WARN,color:"warning"},null,8,["name"]),Te],512),[[ce,!n.value]])]),_:1})):h("",!0)]),_:1}))}});export{Ue as default};
