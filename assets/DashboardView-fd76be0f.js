import{c as xe,u as De,a as $e,g as Re,b as Ie,d as Oe,r as W,e as P,o as Me,h as G,f as Le,Q as x,i as Fe,j as Ne,s as J,k as X,l as be,D as O,S as ae,m as h,n as U,w as T,p as o,q as ge,t as m,v as A,x as n,A as oe,y as qe,I as s,z as I,R as Ue,B as Se,C as We,E as Ve,F as ie,G as C,H as K,J as Y,K as Z,L as Ee,M as Ce,N as Pe,O as k,P as Be,T as He,U as $,V as ee,W as je,X as Qe,Y as Ke,Z as Ye,_ as ze}from"./index-b13a5788.js";import{_ as Xe}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-07b03610.js";import{u as Ae}from"./ui-39a87d56.js";import{Q as he}from"./QBadge-165a1ab6.js";import{t as ve,u as Ge,a as Je,i as Ze}from"./index-422de3d1.js";import{Q as te,a as H}from"./QItem-b108e7f8.js";import{Q as et}from"./QList-bd452429.js";import{Q as tt}from"./QMenu-06157e07.js";import{u as le}from"./useDialogs-13e2612a.js";import{u as we}from"./useRouting-3262c112.js";import{u as nt}from"./useDefaults-2a596e05.js";import"./selection-6ea0221a.js";import"./action-823aca0e.js";import"./QSelect-33b37988.js";import"./QItemLabel-39c6e951.js";const at=xe({name:"QRating",props:{...De,...$e,modelValue:{type:Number,required:!0},max:{type:[String,Number],default:5},icon:[String,Array],iconHalf:[String,Array],iconSelected:[String,Array],iconAriaLabel:[String,Array],color:[String,Array],colorHalf:[String,Array],colorSelected:[String,Array],noReset:Boolean,noDimming:Boolean,readonly:Boolean,disable:Boolean},emits:["update:modelValue"],setup(e,{slots:a,emit:l}){const{proxy:{$q:d}}=Re(),g=Ie(e),y=Oe(e),w=Fe(y),c=W(0);let S={};const t=P(()=>e.readonly!==!0&&e.disable!==!0),E=P(()=>`q-rating row inline items-center q-rating--${t.value===!0?"":"non-"}editable`+(e.noDimming===!0?" q-rating--no-dimming":"")+(e.disable===!0?" disabled":"")+(e.color!==void 0&&Array.isArray(e.color)===!1?` text-${e.color}`:"")),R=P(()=>{const r=Array.isArray(e.icon)===!0?e.icon.length:0,i=Array.isArray(e.iconSelected)===!0?e.iconSelected.length:0,D=Array.isArray(e.iconHalf)===!0?e.iconHalf.length:0,F=Array.isArray(e.color)===!0?e.color.length:0,N=Array.isArray(e.colorSelected)===!0?e.colorSelected.length:0,u=Array.isArray(e.colorHalf)===!0?e.colorHalf.length:0;return{iconLen:r,icon:r>0?e.icon[r-1]:e.icon,selIconLen:i,selIcon:i>0?e.iconSelected[i-1]:e.iconSelected,halfIconLen:D,halfIcon:D>0?e.iconHalf[i-1]:e.iconHalf,colorLen:F,color:F>0?e.color[F-1]:e.color,selColorLen:N,selColor:N>0?e.colorSelected[N-1]:e.colorSelected,halfColorLen:u,halfColor:u>0?e.colorHalf[u-1]:e.colorHalf}}),M=P(()=>{if(typeof e.iconAriaLabel=="string"){const r=e.iconAriaLabel.length!==0?`${e.iconAriaLabel} `:"";return i=>`${r}${i}`}if(Array.isArray(e.iconAriaLabel)===!0){const r=e.iconAriaLabel.length;if(r>0)return i=>e.iconAriaLabel[Math.min(i,r)-1]}return(r,i)=>`${i} ${r}`}),L=P(()=>{const r=[],i=R.value,D=Math.ceil(e.modelValue),F=t.value===!0?0:null,N=e.iconHalf===void 0||D===e.modelValue?-1:D;for(let u=1;u<=e.max;u++){const q=c.value===0&&e.modelValue>=u||c.value>0&&c.value>=u,V=N===u&&c.value<u,B=c.value>0&&(V===!0?D:e.modelValue)>=u&&c.value<u,j=V===!0?u<=i.halfColorLen?e.colorHalf[u-1]:i.halfColor:i.selColor!==void 0&&q===!0?u<=i.selColorLen?e.colorSelected[u-1]:i.selColor:u<=i.colorLen?e.color[u-1]:i.color,Q=(V===!0?u<=i.halfIconLen?e.iconHalf[u-1]:i.halfIcon:i.selIcon!==void 0&&(q===!0||B===!0)?u<=i.selIconLen?e.iconSelected[u-1]:i.selIcon:u<=i.iconLen?e.icon[u-1]:i.icon)||d.iconSet.rating.icon;r.push({name:(V===!0?u<=i.halfIconLen?e.iconHalf[u-1]:i.halfIcon:i.selIcon!==void 0&&(q===!0||B===!0)?u<=i.selIconLen?e.iconSelected[u-1]:i.selIcon:u<=i.iconLen?e.icon[u-1]:i.icon)||d.iconSet.rating.icon,attrs:{tabindex:F,role:"radio","aria-checked":e.modelValue===u?"true":"false","aria-label":M.value(u,Q)},iconClass:"q-rating__icon"+(q===!0||V===!0?" q-rating__icon--active":"")+(B===!0?" q-rating__icon--exselected":"")+(c.value===u?" q-rating__icon--hovered":"")+(j!==void 0?` text-${j}`:"")})}return r}),f=P(()=>{const r={role:"radiogroup"};return e.disable===!0&&(r["aria-disabled"]="true"),e.readonly===!0&&(r["aria-readonly"]="true"),r});function v(r){if(t.value===!0){const i=Ne(parseInt(r,10),1,parseInt(e.max,10)),D=e.noReset!==!0&&e.modelValue===i?0:i;D!==e.modelValue&&l("update:modelValue",D),c.value=0}}function b(r){t.value===!0&&(c.value=r)}function _(r,i){switch(r.keyCode){case 13:case 32:return v(i),J(r);case 37:case 40:return S[`rt${i-1}`]&&S[`rt${i-1}`].focus(),J(r);case 39:case 38:return S[`rt${i+1}`]&&S[`rt${i+1}`].focus(),J(r)}}function p(){c.value=0}return Me(()=>{S={}}),()=>{const r=[];return L.value.forEach(({iconClass:i,name:D,attrs:F},N)=>{const u=N+1;r.push(G("div",{key:u,ref:q=>{S[`rt${u}`]=q},class:"q-rating__icon-container flex flex-center",...F,onClick(){v(u)},onMouseover(){b(u)},onMouseout:p,onFocus(){b(u)},onBlur:p,onKeyup(q){_(q,u)}},Le(a[`tip-${u}`],[G(x,{class:i,name:D})])))}),e.name!==void 0&&e.disable!==!0&&w(r,"push"),G("div",{class:E.value,style:g.value,...f.value},r)}}}),ot={class:"text-h6"},it=m("p",null,' Continue reading to learn more, or scroll to the bottom and click the "Start Using App" button to jump right in. ',-1),lt={class:"q-mb-md"},st=m("p",null," You are currently on the Dashboard page. This page gives you quick access to the primary data you work with in the app. You can favorite items on the Dashboard by clicking the star icon in the top right corner of the item. This prioritizes the item to the top of the list. ",-1),rt={class:"q-mb-md"},ut=m("p",null," You can navigate through the app using the menu in the top left corner of the page. An example of the menu button is below. The menu gives you access to the primary data tables, Frequently Asked Questions (FAQ), Settings, and more. More advanced operations for the app are available on the Settings page. ",-1),ct={class:"q-mb-md"},dt=m("p",null," You can access the data tables for the current Dashboard selection by clicking the buttons in the top right corner of the page. The left button is for the parent records. The right button is for the child records. ",-1),mt={class:"q-mb-md"},ft=m("p",null,"Click the button below when you are ready to get started.",-1),ht=X({__name:"WelcomeOverlay",setup(e){const a=W(0),l=W(!1);be(async()=>{l.value=!!await O.getSettingValue(ae.WELCOME_OVERLAY)});async function d(){await O.setSetting(ae.WELCOME_OVERLAY,!1),l.value=!1}return(g,y)=>(h(),U(We,{modelValue:l.value,"onUpdate:modelValue":y[2]||(y[2]=w=>l.value=w),persistent:""},{default:T(()=>[o(Se,{flat:"",square:""},{default:T(()=>[o(ge,null,{default:T(()=>[m("p",ot,"Welcome to "+A(n(oe)),1),m("p",null,A(n(qe)),1),it,m("div",lt,[st,o(at,{modelValue:a.value,"onUpdate:modelValue":y[0]||(y[0]=w=>a.value=w),max:1,icon:n(s).FAVORITE_OFF,"icon-selected":n(s).FAVORITE_ON,color:"warning",size:"md"},null,8,["modelValue","icon","icon-selected"])]),m("div",rt,[ut,o(I,{disable:"",color:"primary",class:"q-px-sm",icon:n(s).MENU},null,8,["icon"])]),m("div",ct,[dt,o(I,{disable:"",color:"info",class:"q-px-sm q-mr-sm",icon:n(s).PARENTS},null,8,["icon"]),o(I,{disable:"",color:"info",class:"q-px-sm",icon:n(s).CHILDREN},null,8,["icon"])]),m("div",mt,[m("p",null," Hope you find "+A(n(oe))+" useful. Please consider donating to help me continue to create and maintain apps like this. Thank you! ",1),o(I,{color:"warning",label:"Donate",to:{name:n(Ue).DONATE},icon:n(s).DONATE},null,8,["to","icon"])]),m("div",null,[ft,o(I,{"no-caps":"",label:"Start Using App",class:"full-width",size:"lg",color:"positive",icon:n(s).READY,onClick:y[1]||(y[1]=w=>d())},null,8,["icon"])])]),_:1})]),_:1})]),_:1},8,["modelValue"]))}}),vt=Ze?window:void 0;function pt(e,a={}){const{immediate:l=!0,window:d=vt}=a,g=W(!1);let y=0,w=null;function c(E){if(!g.value||!d)return;const R=E-(y||E);e({delta:R,timestamp:E}),y=E,w=d.requestAnimationFrame(c)}function S(){!g.value&&d&&(g.value=!0,w=d.requestAnimationFrame(c))}function t(){g.value=!1,w!=null&&d&&(d.cancelAnimationFrame(w),w=null)}return l&&S(),Je(t),{isActive:Ve(g),pause:t,resume:S}}var _t=Object.defineProperty,pe=Object.getOwnPropertySymbols,yt=Object.prototype.hasOwnProperty,bt=Object.prototype.propertyIsEnumerable,_e=(e,a,l)=>a in e?_t(e,a,{enumerable:!0,configurable:!0,writable:!0,value:l}):e[a]=l,gt=(e,a)=>{for(var l in a||(a={}))yt.call(a,l)&&_e(e,l,a[l]);if(pe)for(var l of pe(a))bt.call(a,l)&&_e(e,l,a[l]);return e};function St(e={}){const{controls:a=!1,interval:l="requestAnimationFrame"}=e,d=W(new Date),g=()=>d.value=new Date,y=l==="requestAnimationFrame"?pt(g,{immediate:!0}):Ge(g,l,{immediate:!0});return a?gt({now:d},y):d}var Et=Object.defineProperty,z=Object.getOwnPropertySymbols,Te=Object.prototype.hasOwnProperty,ke=Object.prototype.propertyIsEnumerable,ye=(e,a,l)=>a in e?Et(e,a,{enumerable:!0,configurable:!0,writable:!0,value:l}):e[a]=l,Ct=(e,a)=>{for(var l in a||(a={}))Te.call(a,l)&&ye(e,l,a[l]);if(z)for(var l of z(a))ke.call(a,l)&&ye(e,l,a[l]);return e},At=(e,a)=>{var l={};for(var d in e)Te.call(e,d)&&a.indexOf(d)<0&&(l[d]=e[d]);if(e!=null&&z)for(var d of z(e))a.indexOf(d)<0&&ke.call(e,d)&&(l[d]=e[d]);return l};const wt=[{max:6e4,value:1e3,name:"second"},{max:276e4,value:6e4,name:"minute"},{max:72e6,value:36e5,name:"hour"},{max:5184e5,value:864e5,name:"day"},{max:24192e5,value:6048e5,name:"week"},{max:28512e6,value:2592e6,name:"month"},{max:1/0,value:31536e6,name:"year"}],Tt={justNow:"just now",past:e=>e.match(/\d/)?`${e} ago`:e,future:e=>e.match(/\d/)?`in ${e}`:e,month:(e,a)=>e===1?a?"last month":"next month":`${e} month${e>1?"s":""}`,year:(e,a)=>e===1?a?"last year":"next year":`${e} year${e>1?"s":""}`,day:(e,a)=>e===1?a?"yesterday":"tomorrow":`${e} day${e>1?"s":""}`,week:(e,a)=>e===1?a?"last week":"next week":`${e} week${e>1?"s":""}`,hour:e=>`${e} hour${e>1?"s":""}`,minute:e=>`${e} minute${e>1?"s":""}`,second:e=>`${e} second${e>1?"s":""}`,invalid:""};function kt(e){return e.toISOString().slice(0,10)}function xt(e,a={}){const{controls:l=!1,updateInterval:d=3e4}=a,g=St({interval:d,controls:!0}),{now:y}=g,w=At(g,["now"]),c=P(()=>Dt(new Date(ve(e)),a,ve(y)));return l?Ct({timeAgo:c},w):c}function Dt(e,a={},l=Date.now()){var d;const{max:g,messages:y=Tt,fullDateFormatter:w=kt,units:c=wt,showSecond:S=!1,rounding:t="round"}=a,E=typeof t=="number"?b=>+b.toFixed(t):Math[t],R=+l-+e,M=Math.abs(R);function L(b,_){return E(Math.abs(b)/_.value)}function f(b,_){const p=L(b,_),r=b>0,i=v(_.name,p,r);return v(r?"past":"future",i,r)}function v(b,_,p){const r=y[b];return typeof r=="function"?r(_,p):r.replace("{0}",_.toString())}if(M<6e4&&!S)return y.justNow;if(typeof g=="number"&&M>g)return w(new Date(e));if(typeof g=="string"){const b=(d=c.find(_=>_.name===g))==null?void 0:d.max;if(b&&M>b)return w(new Date(e))}for(const[b,_]of c.entries()){if(L(R,_)<=0&&c[b-1])return f(R,c[b-1]);if(M<_.max)return f(R,_)}return y.invalid}const $t={class:"absolute-top-right q-ma-xs"},Rt=X({__name:"DashboardRecordCardMenu",props:{parentTable:{},record:{}},setup(e){const a=e,l=Ae(),{log:d}=ie(),{goToEdit:g}=we(),{confirmDialog:y,dismissDialog:w,inspectDialog:c,chartsDialog:S}=le();async function t(f){w("Previous Note",f,s.NOTE)}async function E(f,v,b){const _=b?"Unfavorite":"Favorite",p=`Do you want to ${_.toLocaleLowerCase()} ${v}?`,r=b?s.FAVORITE_OFF:s.FAVORITE_ON;y(_,p,r,"info",async()=>{try{await O.toggleFavorite(a.parentTable,f),d.info(`${v} unfavorited`,{id:f,name:v})}catch(i){d.error("Unfavorite update failed",i)}})}async function R(f){const v=await O.getRecord(a.parentTable,f);v?c(v,a.parentTable):d.error("Failed to find record",{id:f})}async function M(f,v){S(v,f)}function L(){y("Discard Workout","Would you like to discard the current active workout? You will lose any progress saved so far, but regain access to locked records.",s.CANCEL,"warning",async()=>{try{await O.discardWorkout(),d.info("Discarded active workout")}catch(f){d.error("Failed to discard active workout",f)}})}return(f,v)=>{var b;return h(),C("div",$t,[K(o(I,{dense:"",round:"",flat:"",color:"primary",icon:n(s).NOTE,onClick:v[0]||(v[0]=_=>{var p,r;return t(((r=(p=f.record)==null?void 0:p.previousChild)==null?void 0:r.note)||"")})},null,8,["icon"]),[[Y,(b=f.record.previousChild)==null?void 0:b.note]]),f.record.activated?(h(),U(I,{key:0,dense:"",round:"",flat:"",color:"warning",icon:n(s).CANCEL,onClick:v[1]||(v[1]=_=>L())},null,8,["icon"])):(h(),U(I,{key:1,dense:"",round:"",flat:"",color:f.record.favorited?"warning":"grey",icon:f.record.favorited?n(s).FAVORITE_ON:n(s).FAVORITE_OFF,onClick:v[2]||(v[2]=_=>E(f.record.id,f.record.name,f.record.favorited))},null,8,["color","icon"])),o(I,{round:"",flat:"",icon:n(s).MENU_VERTICAL},{default:T(()=>[o(tt,{"auto-close":"",anchor:"top right","transition-show":"flip-right","transition-hide":"flip-left"},{default:T(()=>[o(et,null,{default:T(()=>[o(te,{clickable:"",onClick:v[3]||(v[3]=_=>M(f.parentTable,f.record.id))},{default:T(()=>[o(H,{avatar:""},{default:T(()=>[o(x,{color:"accent",name:n(s).CHARTS},null,8,["name"])]),_:1}),o(H,null,{default:T(()=>[Z("Charts")]),_:1})]),_:1}),o(te,{clickable:"",onClick:v[4]||(v[4]=_=>R(f.record.id))},{default:T(()=>[o(H,{avatar:""},{default:T(()=>[o(x,{color:"primary",name:n(s).INSPECT},null,8,["name"])]),_:1}),o(H,null,{default:T(()=>[Z("Inspect")]),_:1})]),_:1}),o(te,{disable:f.record.activated,clickable:"",onClick:v[5]||(v[5]=_=>n(g)(n(l).dashboardSelection,f.record.id))},{default:T(()=>[o(H,{avatar:""},{default:T(()=>[o(x,{color:"warning",name:n(s).EDIT},null,8,["name"])]),_:1}),o(H,null,{default:T(()=>[Z("Edit")]),_:1})]),_:1},8,["disable"])]),_:1})]),_:1})]),_:1},8,["icon"])])}}}),It={class:"row justify-center q-gutter-md"},Ot=m("span",{class:"text-caption q-ml-xs"},"Active",-1),Mt={class:"text-h6"},Lt={key:1},Ft={class:"text-caption q-ml-xs"},Nt={key:2},qt={class:"text-caption q-ml-xs"},Ut={key:3},Wt={class:"text-caption q-ml-xs"},Vt={key:4},Pt={class:"text-caption q-ml-xs"},Bt={key:5},Ht={class:"text-caption q-ml-xs"},jt={key:6},Qt={class:"text-caption q-ml-xs"},Kt={key:7},Yt={class:"text-caption q-ml-xs"},zt={key:8},Xt={class:"text-caption q-ml-xs"},Gt={key:9},Jt={class:"text-caption q-ml-xs"},Zt={key:10},en={class:"text-caption q-ml-xs"},tn={key:11},nn={class:"text-caption q-ml-xs"},an={key:12},on={class:"text-caption q-ml-xs"},ln={key:13},sn={class:"text-caption q-ml-xs"},rn={key:14},un={class:"text-caption q-ml-xs"},cn={key:15},dn={class:"text-caption q-ml-xs"},mn={key:16},fn={class:"text-caption q-ml-xs"},hn={key:17},vn={class:"text-caption q-ml-xs"},pn={key:0,class:"text-center full-width"},_n={class:"col-12 text-grey text-center text-body1"},yn={key:0,class:"col-12 text-center"},bn={class:"col-12 text-center"},ne=X({__name:"DashboardRecordCardList",props:{parentTable:{},records:{},showDescriptions:{type:Boolean},defaultsFunc:{type:Function}},setup(e){const a=e,{log:l}=ie(),{confirmDialog:d}=le(),{goToCreate:g,goToActive:y}=we();async function w(c,S){await O.isActiveWorkout()?d("Replace Active Workout",`You already have an active workout. Do you want to replace it with ${S}?`,s.WARN,"warning",async()=>{try{await O.discardWorkout(),await O.beginWorkout(c),y(),l.info("Replaced active workout",{replacedById:c,replacedByName:S})}catch(E){l.error("Failed to replace active workout",E)}}):(await O.beginWorkout(c),y())}return(c,S)=>(h(),C("div",It,[(h(!0),C(Ee,null,Ce(c.records,t=>(h(),C("div",{key:t.id,class:"col-xs-12 col-sm-12 col-md-12 col-lg-5"},[o(Se,{class:"column full-height"},{default:T(()=>[o(ge,{class:"col"},{default:T(()=>{var E,R,M,L,f,v,b,_,p,r,i,D,F,N,u,q,V,B,j,Q,se,re,ue,ce,de,me;return[o(Rt,{parentTable:c.parentTable,record:t},null,8,["parentTable","record"]),t.activated?(h(),U(he,{key:0,rounded:"",color:"warning",class:"absolute-top-left q-py-none",style:{left:"-4px",top:"-6px"}},{default:T(()=>[o(x,{name:n(s).LOCK},null,8,["name"]),Ot]),_:1})):k("",!0),m("p",Mt,A(t.name),1),c.showDescriptions?(h(),C("p",Lt,A(t.desc),1)):k("",!0),o(he,{rounded:"",color:"secondary",class:"q-py-none"},{default:T(()=>{var fe;return[o(x,{name:n(s).PREVIOUS},null,8,["name"]),m("span",Ft,A(n(xt)(((fe=t.previousChild)==null?void 0:fe.createdTimestamp)||"").value||"No previous records"),1)]}),_:2},1024),(E=t.previousChild)!=null&&E.createdTimestamp?(h(),C("div",Nt,[o(x,{name:n(s).CALENDAR_CHECK},null,8,["name"]),m("span",qt,A(n(Be)(t.previousChild.createdTimestamp)),1)])):k("",!0),(R=t.previousChild)!=null&&R.createdTimestamp&&((M=t==null?void 0:t.previousChild)!=null&&M.finishedTimestamp)?(h(),C("div",Ut,[o(x,{name:n(s).STOPWATCH},null,8,["name"]),m("span",Wt,A(n(He)(t.previousChild.finishedTimestamp-t.previousChild.createdTimestamp)),1)])):k("",!0),(L=t==null?void 0:t.previousChild)!=null&&L.bodyWeight?(h(),C("div",Vt,[o(x,{name:n(s).MEASUREMENTS},null,8,["name"]),m("span",Pt,A(t.previousChild.bodyWeight)+" lbs ",1)])):k("",!0),(f=t==null?void 0:t.previousChild)!=null&&f.bodyWeight?(h(),C("div",Bt,[o(x,{name:n(s).MEASUREMENTS},null,8,["name"]),m("span",Ht,A(t.previousChild.bodyWeight)+" lbs ",1)])):k("",!0),(v=t==null?void 0:t.previousChild)!=null&&v.percent?(h(),C("div",jt,[o(x,{name:n(s).MEASUREMENTS},null,8,["name"]),m("span",Qt,A(t.previousChild.percent)+"% ",1)])):k("",!0),(b=t==null?void 0:t.previousChild)!=null&&b.inches?(h(),C("div",Kt,[o(x,{name:n(s).MEASUREMENTS},null,8,["name"]),m("span",Yt,A(t.previousChild.inches)+" inches ",1)])):k("",!0),(_=t==null?void 0:t.previousChild)!=null&&_.number?(h(),C("div",zt,[o(x,{name:n(s).MEASUREMENTS},null,8,["name"]),m("span",Xt,A(t.previousChild.number),1)])):k("",!0),(r=(p=t==null?void 0:t.previousChild)==null?void 0:p.reps)!=null&&r[0]?(h(),C("div",Gt,[o(x,{name:n(s).REPS},null,8,["name"]),m("span",Jt,A(t.previousChild.reps.join(", "))+" reps ",1)])):k("",!0),(D=(i=t==null?void 0:t.previousChild)==null?void 0:i.weightLbs)!=null&&D[0]?(h(),C("div",Zt,[o(x,{name:n(s).WEIGHT},null,8,["name"]),m("span",en,A(t.previousChild.weightLbs.join(", "))+" lbs ",1)])):k("",!0),(N=(F=t==null?void 0:t.previousChild)==null?void 0:F.distanceMiles)!=null&&N[0]?(h(),C("div",tn,[o(x,{name:n(s).DISTANCE},null,8,["name"]),m("span",nn,A(t.previousChild.distanceMiles.join(", "))+" mi ",1)])):k("",!0),(q=(u=t==null?void 0:t.previousChild)==null?void 0:u.durationMinutes)!=null&&q[0]?(h(),C("div",an,[o(x,{name:n(s).DURATION},null,8,["name"]),m("span",on,A(t.previousChild.durationMinutes.join(", "))+" minutes ",1)])):k("",!0),(B=(V=t==null?void 0:t.previousChild)==null?void 0:V.watts)!=null&&B[0]?(h(),C("div",ln,[o(x,{name:n(s).WATTS},null,8,["name"]),m("span",sn,A(t.previousChild.watts.join(", "))+" watts ",1)])):k("",!0),(Q=(j=t==null?void 0:t.previousChild)==null?void 0:j.speedMph)!=null&&Q[0]?(h(),C("div",rn,[o(x,{name:n(s).SPEED},null,8,["name"]),m("span",un,A(t.previousChild.speedMph.join(", "))+" mph ",1)])):k("",!0),(re=(se=t==null?void 0:t.previousChild)==null?void 0:se.resistance)!=null&&re[0]?(h(),C("div",cn,[o(x,{name:n(s).RESISTANCE},null,8,["name"]),m("span",dn,A(t.previousChild.resistance.join(", "))+" resistance ",1)])):k("",!0),(ce=(ue=t==null?void 0:t.previousChild)==null?void 0:ue.incline)!=null&&ce[0]?(h(),C("div",mn,[o(x,{name:n(s).INCLINE},null,8,["name"]),m("span",fn,A(t.previousChild.incline.join(", "))+" incline ",1)])):k("",!0),(me=(de=t==null?void 0:t.previousChild)==null?void 0:de.calories)!=null&&me[0]?(h(),C("div",hn,[o(x,{name:n(s).CALORIES},null,8,["name"]),m("span",vn,A(t.previousChild.calories.join(", "))+" calories ",1)])):k("",!0)]}),_:2},1024),c.parentTable===n($).WORKOUTS?(h(),U(ee,{key:0,class:"col-auto"},{default:T(()=>[t!=null&&t.activated?(h(),U(I,{key:0,label:"Resume Workout",color:"positive",class:"full-width",icon:n(s).WORKOUT_RESUME,onClick:S[0]||(S[0]=E=>n(y)())},null,8,["icon"])):(h(),U(I,{key:1,label:"Begin Workout",color:"primary",icon:n(s).WORKOUT_BEGIN,class:"full-width",onClick:E=>w(t.id,t.name)},null,8,["icon","onClick"]))]),_:2},1024)):k("",!0),c.parentTable===n($).EXERCISES?(h(),U(ee,{key:1,class:"col-auto"},{default:T(()=>[t!=null&&t.activated?(h(),C("div",pn," Access limited while active ")):(h(),U(I,{key:1,label:"Add Exercise Entry",color:"primary",class:"full-width",icon:n(s).ATTACH,onClick:E=>n(g)(n($).EXERCISE_RESULTS,t.id)},null,8,["icon","onClick"]))]),_:2},1024)):k("",!0),c.parentTable===n($).MEASUREMENTS?(h(),U(ee,{key:2,class:"col-auto"},{default:T(()=>[o(I,{label:"Take Measurement",color:"primary",class:"full-width",icon:n(s).MEASUREMENTS,onClick:E=>n(g)(n($).MEASUREMENT_RESULTS,t.id)},null,8,["icon","onClick"])]),_:2},1024)):k("",!0)]),_:2},1024)]))),128)),m("div",_n,A(n(Pe)(c.records)),1),c.records.length===0&&c.defaultsFunc?(h(),C("div",yn,[o(I,{class:"col-12 text-center",color:"primary",icon:n(s).DEFAULTS,label:`Add ${n(O).getLabel(a.parentTable,"singular")} Defaults`,onClick:S[1]||(S[1]=t=>c.defaultsFunc())},null,8,["icon","label"])])):k("",!0),m("div",bn,[o(I,{class:"col-12 text-center",color:"positive",icon:n(s).CREATE,label:`Create ${n(O).getLabel(c.parentTable,"singular")}`,onClick:S[2]||(S[2]=t=>n(g)(c.parentTable))},null,8,["icon","label"])])]))}}),gn={class:"q-mb-md"},Sn={class:"text-center text-body1"},En={class:"row justify-center"},qn=X({__name:"DashboardView",setup(e){je({title:`${oe} - Dashboard`});const a=Ae(),{log:l}=ie(),{confirmDialog:d}=le(),{onAddBarbellStrengthWorkouts:g,onAddStretchRoutine:y,onAddCarpalTunnelRoutine:w,onAddDeepBreathingRoutine:c,onAddStandardMeasurements:S}=nt(),t=[{value:$.WORKOUTS,label:Qe.getLabel("plural"),icon:s.WORKOUTS},{value:$.EXERCISES,label:Ke.getLabel("plural"),icon:s.EXERCISES},{value:$.MEASUREMENTS,label:Ye.getLabel("plural"),icon:s.MEASUREMENTS}],E=W(!1),R=W([]),M=W([]),L=W([]),f=O.liveDashboardData($.WORKOUTS).subscribe({next:p=>R.value=p,error:p=>l.error("Error fetching live Workouts",p)}),v=O.liveDashboardData($.EXERCISES).subscribe({next:p=>M.value=p,error:p=>l.error("Error fetching live Exercises",p)}),b=O.liveDashboardData($.MEASUREMENTS).subscribe({next:p=>L.value=p,error:p=>l.error("Error fetching live Measurements",p)});be(async()=>{E.value=!!await O.getSettingValue(ae.DASHBOARD_DESCRIPTIONS)}),ze(()=>{f.unsubscribe(),v.unsubscribe(),b.unsubscribe()});function _(){d("Load Default Workouts","Cycle through, and confirm each default workout you would like to load into the database.",s.DEFAULTS,"info",async()=>{try{await g(),await y(),await w(),await c()}catch(p){l.error("Defaults failed",p)}})}return(p,r)=>(h(),U(Xe,{bannerIcon:n(s).DASHBOARD,bannerTitle:"Dashboard"},{default:T(()=>{var i;return[o(ht),m("section",gn,[m("p",Sn,A((i=t.find(D=>D.value===n(a).dashboardSelection))==null?void 0:i.label),1),m("div",En,[(h(),C(Ee,null,Ce(t,(D,F)=>o(I,{key:F,round:"",size:"lg",class:"q-mb-xs q-mx-xs",icon:D.icon,color:n(a).dashboardSelection===D.value?"info":"grey",onClick:N=>n(a).dashboardSelection=D.value},null,8,["icon","color","onClick"])),64))])]),m("section",null,[K(o(ne,{parentTable:n($).WORKOUTS,records:R.value,showDescriptions:E.value,defaultsFunc:_},null,8,["parentTable","records","showDescriptions"]),[[Y,n(a).dashboardSelection===n($).WORKOUTS]]),K(o(ne,{parentTable:n($).EXERCISES,records:M.value,showDescriptions:E.value,defaultsFunc:void 0},null,8,["parentTable","records","showDescriptions"]),[[Y,n(a).dashboardSelection===n($).EXERCISES]]),K(o(ne,{parentTable:n($).MEASUREMENTS,records:L.value,showDescriptions:E.value,defaultsFunc:n(S)},null,8,["parentTable","records","showDescriptions","defaultsFunc"]),[[Y,n(a).dashboardSelection===n($).MEASUREMENTS]])])]}),_:1},8,["bannerIcon"]))}});export{qn as default};