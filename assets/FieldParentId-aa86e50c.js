import{k as f,F as I,r as h,l as _,D as c,m as b,G as g,p as l,bo as v,x as e,R as p,w,Q as T,I as x,bp as P,L as y,t as u}from"./index-17f30dc2.js";import{Q as R}from"./QSelect-f8043bb9.js";import{u as S}from"./action-fb43e072.js";import{u as V}from"./useRouting-e60e4946.js";import"./QItem-515895cf.js";import"./QItemLabel-70744e04.js";import"./QMenu-e3c2b1fa.js";import"./selection-0534035c.js";const k=u("div",{class:"text-weight-bold text-body1"},"Parent Record",-1),B=u("p",null," The parent record that this child record is associated with. This cannot be updated once set during record creation. ",-1),q=f({__name:"FieldParentId",setup(D){const{route:s,routeTable:d,routeParentId:i}=V(),{log:m}=I(),t=S(),a=h([]);return _(async()=>{try{if(d){const r=c.getParentTable(d);a.value=await c.getParentIdOptions(r),i&&(t.record.parentId=i),a.value.some(o=>o.value===t.record.parentId)||(t.record.parentId=void 0)}}catch(r){m.error("Error with parent id field",r)}}),(r,n)=>(b(),g(y,null,[k,B,l(R,{disable:e(s).name===e(p).EDIT,modelValue:e(t).record.parentId,"onUpdate:modelValue":n[0]||(n[0]=o=>e(t).record.parentId=o),rules:[o=>e(P).safeParse(o).success||"Required"],options:a.value,"emit-value":"","map-options":"","options-dense":"",dense:"",outlined:"",color:"primary"},v({_:2},[e(s).name===e(p).EDIT?{name:"prepend",fn:w(()=>[l(T,{color:"warning",name:e(x).LOCK},null,8,["name"])]),key:"0"}:void 0]),1032,["disable","modelValue","rules","options"])],64))}});export{q as default};