import{bK as R,bL as I,F as S,bp as p,bM as L,R as t}from"./index-4aa06bf7.js";function k(){const e=R(),a=I(),{log:o}=S(),n=Array.isArray(e.params.id)?e.params.id[0]:e.params.id,u=Array.isArray(e.params.parentId)?e.params.parentId[0]:e.params.parentId,i=Array.isArray(e.params.table)?e.params.table[0]:e.params.table,d=p.safeParse(n).success?n:void 0,m=p.safeParse(u).success?u:void 0,g=L.safeParse(i).success?i:void 0;function h(){try{a.push({name:t.DASHBOARD})}catch(r){o.error("Error accessing dashboard route",r)}}function b(){try{a.push({name:t.ACTIVE})}catch(r){o.error("Error accessing active route",r)}}function A(){try{a.push({name:t.LIST})}catch(r){o.error("Error accessing list route",r)}}function y(){try{a.push({name:t.DATA_LOGS})}catch(r){o.error("Error accessing logs data route",r)}}function f(r){try{a.push({name:t.DATA_RECORDS,params:{table:r}})}catch(s){o.error("Error accessing records data route",s)}}function E(r,s){try{a.push({name:t.CREATE,params:{table:r,parentId:s}})}catch(c){o.error("Error accessing create route",c)}}function T(r,s){try{a.push({name:t.EDIT,params:{table:r,id:s}})}catch(c){o.error("Error accessing edit route",c)}}function l(){var r,s,c;try{(c=(s=(r=a==null?void 0:a.options)==null?void 0:r.history)==null?void 0:s.state)!=null&&c.back?a.back():a.push({name:t.DASHBOARD})}catch(D){o.error("Error accessing go back route",D)}}return{route:e,router:a,routeId:d,routeParentId:m,routeTable:g,goToDashboard:h,goToActive:b,goToList:A,goToLogsData:y,goToRecordsData:f,goToCreate:E,goToEdit:T,goBack:l}}export{k as u};
