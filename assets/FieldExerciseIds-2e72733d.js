import{Q as n}from"./QSelect-849a2434.js";import{k as l,F as d,r as u,l as m,D as p,m as x,G as f,p as _,x as o,bm as h,L as I,t as a}from"./index-170dd336.js";import{u as g}from"./action-99601140.js";import"./QItem-211902f6.js";import"./QItemLabel-4aba8a18.js";import"./QMenu-520beef8.js";import"./selection-79118853.js";const E=a("div",{class:"text-weight-bold text-body1"},"Exercises",-1),w=a("p",null,"Exercises associated with this workout.",-1),D=l({__name:"FieldExerciseIds",setup(y){const{log:c}=d(),e=g(),r=u([]);return m(async()=>{try{e.record.exerciseIds=e.record.exerciseIds??[],r.value=await p.getExerciseIdOptions()}catch(t){c.error("Error with exercise ids field",t)}}),(t,i)=>(x(),f(I,null,[E,w,_(n,{modelValue:o(e).record.exerciseIds,"onUpdate:modelValue":i[0]||(i[0]=s=>o(e).record.exerciseIds=s),rules:[s=>o(h).safeParse(s).success||"Required"],options:r.value,"lazy-rules":"",multiple:"",counter:"","emit-value":"","map-options":"","options-dense":"",dense:"",outlined:"",color:"primary"},null,8,["modelValue","rules","options"])],64))}});export{D as default};