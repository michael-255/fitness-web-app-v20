import{Q as c}from"./QSelect-645fbe4a.js";import{k as n,F as d,r as u,l as p,D as m,m as x,G as f,p as _,x as t,bq as I,L as R,t as a}from"./index-ff52cf3d.js";import{u as h}from"./action-45ab2598.js";import"./QItem-786afa1b.js";import"./QItemLabel-12aca26d.js";import"./QMenu-900fcdd3.js";import"./selection-84b0a129.js";const g=a("div",{class:"text-weight-bold text-body1"},"Exercise Results",-1),v=a("p",null,"Ids of all completed exercises associated with this workout.",-1),F=n({__name:"FieldExerciseResultIds",setup(w){const{log:i}=d(),e=h(),o=u([]);return p(async()=>{try{e.record.exerciseResultIds=e.record.exerciseResultIds??[],o.value=await m.getExerciseResultIdOptions()}catch(r){i.error("Error with exercise result ids field",r)}}),(r,l)=>(x(),f(R,null,[g,v,_(c,{modelValue:t(e).record.exerciseResultIds,"onUpdate:modelValue":l[0]||(l[0]=s=>t(e).record.exerciseResultIds=s),rules:[s=>t(I).safeParse(s).success||"Invalid"],options:o.value,"lazy-rules":"",multiple:"",counter:"","emit-value":"","map-options":"","options-dense":"",dense:"",outlined:"",color:"primary"},null,8,["modelValue","rules","options"])],64))}});export{F as default};
