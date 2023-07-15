import{bI as D,bJ as R,F as I,bH as p,bK as S,R as t}from"./index-505869b6.js";function k(){const e=D(),a=R(),{log:s}=I(),n=Array.isArray(e.params.id)?e.params.id[0]:e.params.id,u=Array.isArray(e.params.parentId)?e.params.parentId[0]:e.params.parentId,i=Array.isArray(e.params.table)?e.params.table[0]:e.params.table,d=p.safeParse(n).success?n:void 0,m=p.safeParse(u).success?u:void 0,g=S.safeParse(i).success?i:void 0;function h(){try{a.push({name:t.DASHBOARD})}catch(r){s.error("Error accessing dashboard route",r)}}function b(){try{a.push({name:t.ACTIVE})}catch(r){s.error("Error accessing active route",r)}}function A(){try{a.push({name:t.DATA_LOGS})}catch(r){s.error("Error accessing logs data route",r)}}function y(r){try{a.push({name:t.DATA_RECORDS,params:{table:r}})}catch(o){s.error("Error accessing records data route",o)}}function f(r,o){try{a.push({name:t.CREATE,params:{table:r,parentId:o}})}catch(c){s.error("Error accessing create route",c)}}function E(r,o){try{a.push({name:t.EDIT,params:{table:r,id:o}})}catch(c){s.error("Error accessing edit route",c)}}function l(){var r,o,c;try{(c=(o=(r=a==null?void 0:a.options)==null?void 0:r.history)==null?void 0:o.state)!=null&&c.back?a.back():a.push({name:t.DASHBOARD})}catch(T){s.error("Error accessing go back route",T)}}return{route:e,router:a,routeId:d,routeParentId:m,routeTable:g,goToDashboard:h,goToActive:b,goToLogsData:A,goToRecordsData:y,goToCreate:f,goToEdit:E,goBack:l}}export{k as u};
