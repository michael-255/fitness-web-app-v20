import{k as c,r as l,aR as n,R as d,m as b,G as p,t as v,v as f,x as r,p as h,cb as y,a1 as g,O as W}from"./index-3c86ed7e.js";import{u as _}from"./action-8f1b4305.js";import{u as I}from"./useParentIdWatcher-1fc83d7d.js";import{u as V}from"./useRouting-14381c6d.js";const B={key:0},E={class:"text-weight-bold text-body1"},S=c({__name:"FieldBodyWeight",setup(N){const{route:i}=V(),t=_(),u=l(!1),o=l({});I(e=>{o.value=e.previousChild,(e==null?void 0:e.measurementInput)===n.BODY_WEIGHT?(i.name===d.CREATE&&(t.record.bodyWeight=void 0,delete t.record.percent,delete t.record.inches,delete t.record.number),u.value=!0):u.value=!1});function m(){var e,s;return i.name===d.EDIT?(e=o.value)!=null&&e.bodyWeight?`Currently ${o.value.bodyWeight} lbs`:"No previous value":(s=o.value)!=null&&s.bodyWeight?`Previously ${o.value.bodyWeight} lbs`:"No previous value"}return(e,s)=>u.value?(b(),p("div",B,[v("div",E,f(r(n).BODY_WEIGHT),1),h(g,{modelValue:r(t).record.bodyWeight,"onUpdate:modelValue":s[0]||(s[0]=a=>r(t).record.bodyWeight=a),modelModifiers:{number:!0},rules:[a=>r(y).safeParse(a).success||"Must be between 1 and 1000"],type:"number",step:"0.01","lazy-rules":"",dense:"",outlined:"",color:"primary",hint:m()},null,8,["modelValue","rules","hint"])])):W("",!0)}});export{S as default};