import{k as d,r as i,aO as l,R as c,m as v,G as p,t as f,v as h,x as r,p as _,c5 as b,a0 as y,O as I}from"./index-b13a5788.js";import{u as N}from"./action-823aca0e.js";import{u as C}from"./useParentIdWatcher-3c31ac76.js";import{u as V}from"./useRouting-3262c112.js";const E={key:0},S={class:"text-weight-bold text-body1"},M=d({__name:"FieldInches",setup(g){const{route:a}=V(),s=N(),n=i(!1),t=i({});C(e=>{t.value=e.previousChild,(e==null?void 0:e.measurementInput)===l.INCHES?(a.name===c.CREATE&&(delete s.record.bodyWeight,delete s.record.percent,s.record.inches=void 0,delete s.record.number),n.value=!0):n.value=!1});function m(){var e,o;return a.name===c.EDIT?(e=t.value)!=null&&e.inches?`Currently ${t.value.inches} in`:"No previous value":(o=t.value)!=null&&o.inches?`Previously ${t.value.inches} in`:"No previous value"}return(e,o)=>n.value?(v(),p("div",E,[f("div",S,h(r(l).INCHES),1),_(y,{modelValue:r(s).record.inches,"onUpdate:modelValue":o[0]||(o[0]=u=>r(s).record.inches=u),modelModifiers:{number:!0},rules:[u=>r(b).safeParse(u).success||"Must be between 1 and 500"],type:"number","lazy-rules":"",dense:"",outlined:"",color:"primary",hint:m()},null,8,["modelValue","rules","hint"])])):I("",!0)}});export{M as default};