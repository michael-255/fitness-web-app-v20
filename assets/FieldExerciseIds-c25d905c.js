import{Q as n}from"./QSelect-5fe6ec05.js";import{k as l,F as d,r as u,l as p,D as m,m as x,G as f,p as _,x as o,bk as h,L as I,t as a}from"./index-e487f782.js";import{u as g}from"./action-8e9e98ae.js";import"./QItem-30dce3fe.js";import"./QItemLabel-5481c733.js";import"./QMenu-4706090f.js";import"./selection-76f37adf.js";const E=a("div",{class:"text-weight-bold text-body1"},"Exercises",-1),k=a("p",null,"Exercises associated with this workout.",-1),D=l({__name:"FieldExerciseIds",setup(w){const{log:c}=d(),e=g(),r=u([]);return p(async()=>{try{e.record.exerciseIds=e.record.exerciseIds??[],r.value=await m.getExerciseIdOptions()}catch(t){c.error("Error with exercise ids field",t)}}),(t,i)=>(x(),f(I,null,[E,k,_(n,{modelValue:o(e).record.exerciseIds,"onUpdate:modelValue":i[0]||(i[0]=s=>o(e).record.exerciseIds=s),rules:[s=>o(h).safeParse(s).success||"Required"],options:r.value,"lazy-rules":"",multiple:"",counter:"","emit-value":"","map-options":"","options-dense":"",dense:"",outlined:"",color:"primary"},null,8,["modelValue","rules","options"])],64))}});export{D as default};
