import{Q as c}from"./QSelect-4607d717.js";import{k as n,F as d,r as u,l as p,D as m,m as x,G as f,p as _,x as o,bo as I,L as R,t as a}from"./index-26174ac4.js";import{u as h}from"./action-c3948de2.js";import"./QItem-9936e606.js";import"./QItemLabel-c08b08fa.js";import"./QMenu-f6a9d5ab.js";import"./selection-0290b496.js";const g=a("div",{class:"text-weight-bold text-body1"},"Exercise Results",-1),v=a("p",null,"Ids of all completed exercises associated with this workout.",-1),F=n({__name:"FieldExerciseResultIds",setup(w){const{log:i}=d(),e=h(),t=u([]);return p(async()=>{try{e.record.exerciseResultIds=e.record.exerciseResultIds??[],t.value=await m.getExerciseResultIdOptions()}catch(r){i.error("Error with exercise result ids field",r)}}),(r,l)=>(x(),f(R,null,[g,v,_(c,{modelValue:o(e).record.exerciseResultIds,"onUpdate:modelValue":l[0]||(l[0]=s=>o(e).record.exerciseResultIds=s),rules:[s=>o(I).safeParse(s).success||"Invalid"],options:t.value,"lazy-rules":"",multiple:"",counter:"","emit-value":"","map-options":"","options-dense":"",dense:"",outlined:"",color:"primary"},null,8,["modelValue","rules","options"])],64))}});export{F as default};