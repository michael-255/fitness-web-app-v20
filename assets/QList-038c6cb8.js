import{c as o,a2 as n,g as d,a3 as l,e as i,h as u,a0 as c}from"./index-505869b6.js";const q=o({name:"QList",props:{...n,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:a}){const t=d(),s=l(e,t.proxy.$q),r=i(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(s.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>u(e.tag,{class:r.value},c(a.default))}});export{q as Q};
