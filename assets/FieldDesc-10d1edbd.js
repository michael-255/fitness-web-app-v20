import{k as c,m as a,G as d,p as l,w as m,x as e,n as u,Q as i,I as p,O as x,bl as A,aN as n,$ as _,L as f,t as k}from"./index-41950ac7.js";import{u as C}from"./action-0d1cdd0a.js";const E=k("div",{class:"text-weight-bold text-body1"},"Description",-1),N=c({__name:"FieldDesc",setup(V){const t=C();return(g,r)=>(a(),d(f,null,[E,l(_,{modelValue:e(t).record.desc,"onUpdate:modelValue":r[1]||(r[1]=o=>e(t).record.desc=o),rules:[o=>e(A).safeParse(o).success||`Description cannot exceed ${e(n).MAX_TEXT_AREA} characters`],maxlength:e(n).MAX_TEXT_AREA,type:"textarea","lazy-rules":"",autogrow:"",counter:"",dense:"",outlined:"",color:"primary",onBlur:r[2]||(r[2]=o=>{var s;return e(t).record.desc=(s=e(t).record.desc)==null?void 0:s.trim()})},{append:m(()=>[e(t).record.desc!==""?(a(),u(i,{key:0,name:e(p).CANCEL,onClick:r[0]||(r[0]=o=>e(t).record.desc=""),class:"cursor-pointer"},null,8,["name"])):x("",!0)]),_:1},8,["modelValue","rules","maxlength"])],64))}});export{N as default};
