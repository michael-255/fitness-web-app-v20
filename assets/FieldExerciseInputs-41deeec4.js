import{k as p,F as d,r as m,l as x,aN as f,m as I,G as _,p as i,bm as b,x as e,R as c,w as h,Q as y,I as g,bF as v,L as w,t as u}from"./index-e487f782.js";import{Q as E}from"./QSelect-5fe6ec05.js";import{u as S}from"./action-8e9e98ae.js";import{u as V}from"./useRouting-a8cfee2d.js";import"./QItem-30dce3fe.js";import"./QItemLabel-5481c733.js";import"./QMenu-4706090f.js";import"./selection-76f37adf.js";const k=u("div",{class:"text-weight-bold text-body1"},"Exercise Inputs",-1),F=u("p",null," Select inputs that represents the type of data you want to record. Select no inputs if you want the exercise to be purely instructional. This cannot be updated once set during record creation. ",-1),j=p({__name:"FieldExerciseInputs",setup(N){const{log:l}=d(),{route:r}=V(),o=S(),n=m([]);return x(async()=>{try{o.record.exerciseInputs=o.record.exerciseInputs??[],n.value=Object.values(f).map(t=>({value:t,label:t}))}catch(t){l.error("Error with exercise inputs field",t)}}),(t,a)=>(I(),_(w,null,[k,F,i(E,{disable:e(r).name===e(c).EDIT,modelValue:e(o).record.exerciseInputs,"onUpdate:modelValue":a[0]||(a[0]=s=>e(o).record.exerciseInputs=s),rules:[s=>e(v).safeParse(s).success||"Required"],options:n.value,"lazy-rules":"",multiple:"",counter:"","emit-value":"","map-options":"","options-dense":"",dense:"",outlined:"",color:"primary"},b({_:2},[e(r).name===e(c).EDIT?{name:"prepend",fn:h(()=>[i(y,{color:"warning",name:e(g).LOCK},null,8,["name"])]),key:"0"}:void 0]),1032,["disable","modelValue","rules","options"])],64))}});export{j as default};
