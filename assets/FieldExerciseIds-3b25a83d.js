import{Q as n}from"./QSelect-645fbe4a.js";import{k as l,F as d,r as u,l as m,D as p,m as x,G as f,p as _,x as o,bm as h,L as I,t as a}from"./index-ff52cf3d.js";import{u as g}from"./action-45ab2598.js";import"./QItem-786afa1b.js";import"./QItemLabel-12aca26d.js";import"./QMenu-900fcdd3.js";import"./selection-84b0a129.js";const E=a("div",{class:"text-weight-bold text-body1"},"Exercises",-1),w=a("p",null,"Exercises associated with this workout.",-1),D=l({__name:"FieldExerciseIds",setup(y){const{log:c}=d(),e=g(),r=u([]);return m(async()=>{try{e.record.exerciseIds=e.record.exerciseIds??[],r.value=await p.getExerciseIdOptions()}catch(t){c.error("Error with exercise ids field",t)}}),(t,i)=>(x(),f(I,null,[E,w,_(n,{modelValue:o(e).record.exerciseIds,"onUpdate:modelValue":i[0]||(i[0]=s=>o(e).record.exerciseIds=s),rules:[s=>o(h).safeParse(s).success||"Required"],options:r.value,"lazy-rules":"",multiple:"",counter:"","emit-value":"","map-options":"","options-dense":"",dense:"",outlined:"",color:"primary"},null,8,["modelValue","rules","options"])],64))}});export{D as default};
