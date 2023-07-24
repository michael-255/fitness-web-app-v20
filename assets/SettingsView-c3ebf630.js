import{g as oe,r as P,e as n,az as Xe,s as fe,aA as Ze,h as _,c as Te,aB as et,a as $e,aC as tt,aD as at,aE as lt,aF as nt,ar as ot,aG as st,aH as Ce,aI as it,aJ as rt,ab as ut,al as ct,an as de,ai as dt,aa as mt,j as te,aK as vt,aL as ft,i as pt,d as bt,ac as gt,k as ht,W as yt,A as me,F as St,aM as kt,aN as Ct,aO as H,D as I,S as z,_ as xt,m as xe,n as _e,w as ve,t as i,p as L,x as S,a1 as _t,z as Y,aP as ae,Q as wt,I as J,aQ as Dt,O as Lt,a0 as Tt,a7 as we,U as $t}from"./index-17f30dc2.js";import{b as Et}from"./QSelect-f8043bb9.js";import{T as Ft}from"./TouchPan-0d6ccc37.js";import{u as It}from"./useDialogs-24f50ae9.js";import{u as Rt}from"./useDefaults-9decd45d.js";import{_ as At}from"./ResponsivePage.vue_vue_type_script_setup_true_lang-5f4fe2e0.js";import{u as Mt}from"./useRouting-e60e4946.js";import"./QItem-515895cf.js";import"./QItemLabel-70744e04.js";import"./QMenu-e3c2b1fa.js";import"./selection-0534035c.js";import"./action-fb43e072.js";import"./QSpace-0654e6fa.js";import"./ErrorStates.vue_vue_type_script_setup_true_lang-18075fca.js";import"./ui-196be826.js";function ee(a,u,N,c){const e=[];return a.forEach(g=>{c(g)===!0?e.push(g):u.push({failedPropValidation:N,file:g})}),e}function ne(a){a&&a.dataTransfer&&(a.dataTransfer.dropEffect="copy"),fe(a)}const Nt={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},qt=["rejected"];function Ot({editable:a,dnd:u,getFileInput:N,addFilesToQueue:c}){const{props:e,emit:g,proxy:$}=oe(),h=P(null),K=n(()=>e.accept!==void 0?e.accept.split(",").map(s=>(s=s.trim(),s==="*"?"*/":(s.endsWith("/*")&&(s=s.slice(0,s.length-1)),s.toUpperCase()))):null),w=n(()=>parseInt(e.maxFiles,10)),R=n(()=>parseInt(e.maxTotalSize,10));function j(s){if(a.value)if(s!==Object(s)&&(s={target:null}),s.target!==null&&s.target.matches('input[type="file"]')===!0)s.clientX===0&&s.clientY===0&&Xe(s);else{const f=N();f&&f!==s.target&&f.click(s)}}function E(s){a.value&&s&&c(null,s)}function q(s,f,O,B){let p=Array.from(f||s.target.files);const F=[],Q=()=>{F.length!==0&&g("rejected",F)};if(e.accept!==void 0&&K.value.indexOf("*/")===-1&&(p=ee(p,F,"accept",b=>K.value.some(C=>b.type.toUpperCase().startsWith(C)||b.name.toUpperCase().endsWith(C))),p.length===0))return Q();if(e.maxFileSize!==void 0){const b=parseInt(e.maxFileSize,10);if(p=ee(p,F,"max-file-size",C=>C.size<=b),p.length===0)return Q()}if(e.multiple!==!0&&p.length!==0&&(p=[p[0]]),p.forEach(b=>{b.__key=b.webkitRelativePath+b.lastModified+b.name+b.size}),B===!0){const b=O.map(C=>C.__key);p=ee(p,F,"duplicate",C=>b.includes(C.__key)===!1)}if(p.length===0)return Q();if(e.maxTotalSize!==void 0){let b=B===!0?O.reduce((C,W)=>C+W.size,0):0;if(p=ee(p,F,"max-total-size",C=>(b+=C.size,b<=R.value)),p.length===0)return Q()}if(typeof e.filter=="function"){const b=e.filter(p);p=ee(p,F,"filter",C=>b.includes(C))}if(e.maxFiles!==void 0){let b=B===!0?O.length:0;if(p=ee(p,F,"max-files",()=>(b++,b<=w.value)),p.length===0)return Q()}if(Q(),p.length!==0)return p}function T(s){ne(s),u.value!==!0&&(u.value=!0)}function d(s){fe(s),(s.relatedTarget!==null||Ze.is.safari!==!0?s.relatedTarget!==h.value:document.elementsFromPoint(s.clientX,s.clientY).includes(h.value)===!1)===!0&&(u.value=!1)}function A(s){ne(s);const f=s.dataTransfer.files;f.length!==0&&c(null,f),u.value=!1}function U(s){if(u.value===!0)return _("div",{ref:h,class:`q-${s}__dnd absolute-full`,onDragenter:ne,onDragover:ne,onDragleave:d,onDrop:A})}return Object.assign($,{pickFiles:j,addFiles:E}),{pickFiles:j,addFiles:E,onDragover:T,onDragleave:d,processFiles:q,getDndNode:U,maxFilesNumber:w,maxTotalSizeNumber:R}}const Vt=Te({name:"QFile",inheritAttrs:!1,props:{...et,...$e,...Nt,modelValue:[File,FileList,Array],append:Boolean,useChips:Boolean,displayValue:[String,Number],tabindex:{type:[String,Number],default:0},counterLabel:Function,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...tt,...qt],setup(a,{slots:u,emit:N,attrs:c}){const{proxy:e}=oe(),g=at(),$=P(null),h=P(!1),K=lt(a),{pickFiles:w,onDragover:R,onDragleave:j,processFiles:E,getDndNode:q}=Ot({editable:g.editable,dnd:h,getFileInput:Z,addFilesToQueue:m}),T=nt(a),d=n(()=>Object(a.modelValue)===a.modelValue?"length"in a.modelValue?Array.from(a.modelValue):[a.modelValue]:[]),A=n(()=>Ce(d.value)),U=n(()=>d.value.map(r=>r.name).join(", ")),s=n(()=>it(d.value.reduce((r,D)=>r+D.size,0))),f=n(()=>({totalSize:s.value,filesNumber:d.value.length,maxFiles:a.maxFiles})),O=n(()=>({tabindex:-1,type:"file",title:"",accept:a.accept,capture:a.capture,name:K.value,...c,id:g.targetUid.value,disabled:g.editable.value!==!0})),B=n(()=>"q-file q-field--auto-height"+(h.value===!0?" q-file--dnd":"")),p=n(()=>a.multiple===!0&&a.append===!0);function F(r){const D=d.value.slice();D.splice(r,1),b(D)}function Q(r){const D=d.value.indexOf(r);D>-1&&F(D)}function b(r){N("update:modelValue",a.multiple===!0?r:r[0])}function C(r){r.keyCode===13&&rt(r)}function W(r){(r.keyCode===13||r.keyCode===32)&&w(r)}function Z(){return $.value}function m(r,D){const x=E(r,D,d.value,p.value),M=Z();M!=null&&(M.value=""),x!==void 0&&((a.multiple===!0?a.modelValue&&x.every(le=>d.value.includes(le)):a.modelValue===x[0])||b(p.value===!0?d.value.concat(x):x))}function l(){return[_("input",{class:[a.inputClass,"q-file__filler"],style:a.inputStyle})]}function o(){if(u.file!==void 0)return d.value.length===0?l():d.value.map((D,x)=>u.file({index:x,file:D,ref:this}));if(u.selected!==void 0)return d.value.length===0?l():u.selected({files:d.value,ref:this});if(a.useChips===!0)return d.value.length===0?l():d.value.map((D,x)=>_(Et,{key:"file-"+x,removable:g.editable.value,dense:!0,textColor:a.color,tabindex:a.tabindex,onRemove:()=>{F(x)}},()=>_("span",{class:"ellipsis",textContent:D.name})));const r=a.displayValue!==void 0?a.displayValue:U.value;return r.length!==0?[_("div",{class:a.inputClass,style:a.inputStyle,textContent:r})]:l()}function G(){const r={ref:$,...O.value,...T.value,class:"q-field__input fit absolute-full cursor-pointer",onChange:m};return a.multiple===!0&&(r.multiple=!0),_("input",r)}return Object.assign(g,{fieldClass:B,emitValue:b,hasValue:A,inputRef:$,innerValue:d,floatingLabel:n(()=>A.value===!0||Ce(a.displayValue)),computedCounter:n(()=>{if(a.counterLabel!==void 0)return a.counterLabel(f.value);const r=a.maxFiles;return`${d.value.length}${r!==void 0?" / "+r:""} (${s.value})`}),getControlChild:()=>q("file"),getControl:()=>{const r={ref:g.targetRef,class:"q-field__native row items-center cursor-pointer",tabindex:a.tabindex};return g.editable.value===!0&&Object.assign(r,{onDragover:R,onDragleave:j,onKeydown:C,onKeyup:W}),_("div",r,[G()].concat(o()))}}),Object.assign(e,{removeAtIndex:F,removeFile:Q,getNativeElement:()=>$.value}),ot(e,"nativeEl",()=>$.value),st(g)}}),De="q-slider__marker-labels",Bt=a=>({value:a}),zt=({marker:a})=>_("div",{key:a.value,style:a.style,class:a.classes},a.label),Ee=[34,37,40,33,39,38],Pt={...mt,...$e,min:{type:Number,default:0},max:{type:Number,default:100},innerMin:Number,innerMax:Number,step:{type:Number,default:1,validator:a=>a>=0},snap:Boolean,vertical:Boolean,reverse:Boolean,hideSelection:Boolean,color:String,markerLabelsClass:String,label:Boolean,labelColor:String,labelTextColor:String,labelAlways:Boolean,switchLabelSide:Boolean,markers:[Boolean,Number],markerLabels:[Boolean,Array,Object,Function],switchMarkerLabelsSide:Boolean,trackImg:String,trackColor:String,innerTrackImg:String,innerTrackColor:String,selectionColor:String,selectionImg:String,thumbSize:{type:String,default:"20px"},trackSize:{type:String,default:"4px"},disable:Boolean,readonly:Boolean,dense:Boolean,tabindex:[String,Number],thumbColor:String,thumbPath:{type:String,default:"M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0"}},jt=["pan","update:modelValue","change"];function Ut({updateValue:a,updatePosition:u,getDragging:N,formAttrs:c}){const{props:e,emit:g,slots:$,proxy:{$q:h}}=oe(),K=ut(e,h),w=pt(c),R=P(!1),j=P(!1),E=P(!1),q=P(!1),T=n(()=>e.vertical===!0?"--v":"--h"),d=n(()=>"-"+(e.switchLabelSide===!0?"switched":"standard")),A=n(()=>e.vertical===!0?e.reverse===!0:e.reverse!==(h.lang.rtl===!0)),U=n(()=>isNaN(e.innerMin)===!0||e.innerMin<e.min?e.min:e.innerMin),s=n(()=>isNaN(e.innerMax)===!0||e.innerMax>e.max?e.max:e.innerMax),f=n(()=>e.disable!==!0&&e.readonly!==!0&&U.value<s.value),O=n(()=>(String(e.step).trim().split(".")[1]||"").length),B=n(()=>e.step===0?1:e.step),p=n(()=>f.value===!0?e.tabindex||0:-1),F=n(()=>e.max-e.min),Q=n(()=>s.value-U.value),b=n(()=>se(U.value)),C=n(()=>se(s.value)),W=n(()=>e.vertical===!0?A.value===!0?"bottom":"top":A.value===!0?"right":"left"),Z=n(()=>e.vertical===!0?"height":"width"),m=n(()=>e.vertical===!0?"width":"height"),l=n(()=>e.vertical===!0?"vertical":"horizontal"),o=n(()=>{const t={role:"slider","aria-valuemin":U.value,"aria-valuemax":s.value,"aria-orientation":l.value,"data-step":e.step};return e.disable===!0?t["aria-disabled"]="true":e.readonly===!0&&(t["aria-readonly"]="true"),t}),G=n(()=>`q-slider q-slider${T.value} q-slider--${R.value===!0?"":"in"}active inline no-wrap `+(e.vertical===!0?"row":"column")+(e.disable===!0?" disabled":" q-slider--enabled"+(f.value===!0?" q-slider--editable":""))+(E.value==="both"?" q-slider--focus":"")+(e.label||e.labelAlways===!0?" q-slider--label":"")+(e.labelAlways===!0?" q-slider--label-always":"")+(K.value===!0?" q-slider--dark":"")+(e.dense===!0?" q-slider--dense q-slider--dense"+T.value:""));function r(t){const v="q-slider__"+t;return`${v} ${v}${T.value} ${v}${T.value}${d.value}`}function D(t){const v="q-slider__"+t;return`${v} ${v}${T.value}`}const x=n(()=>{const t=e.selectionColor||e.color;return"q-slider__selection absolute"+(t!==void 0?` text-${t}`:"")}),M=n(()=>D("markers")+" absolute overflow-hidden"),le=n(()=>D("track-container")),Fe=n(()=>r("pin")),Ie=n(()=>r("label")),Re=n(()=>r("text-container")),Ae=n(()=>r("marker-labels-container")+(e.markerLabelsClass!==void 0?` ${e.markerLabelsClass}`:"")),Me=n(()=>"q-slider__track relative-position no-outline"+(e.trackColor!==void 0?` bg-${e.trackColor}`:"")),Ne=n(()=>{const t={[m.value]:e.trackSize};return e.trackImg!==void 0&&(t.backgroundImage=`url(${e.trackImg}) !important`),t}),qe=n(()=>"q-slider__inner absolute"+(e.innerTrackColor!==void 0?` bg-${e.innerTrackColor}`:"")),pe=n(()=>{const t={[W.value]:`${100*b.value}%`,[Z.value]:`${100*(C.value-b.value)}%`};return e.innerTrackImg!==void 0&&(t.backgroundImage=`url(${e.innerTrackImg}) !important`),t});function Oe(t){const{min:v,max:y,step:k}=e;let V=v+t*(y-v);if(k>0){const X=(V-v)%k;V+=(Math.abs(X)>=k/2?(X<0?-1:1)*k:0)-X}return O.value>0&&(V=parseFloat(V.toFixed(O.value))),te(V,U.value,s.value)}function se(t){return F.value===0?0:(t-e.min)/F.value}function Ve(t,v){const y=vt(t),k=e.vertical===!0?te((y.top-v.top)/v.height,0,1):te((y.left-v.left)/v.width,0,1);return te(A.value===!0?1-k:k,b.value,C.value)}const be=n(()=>ct(e.markers)===!0?e.markers:B.value),ge=n(()=>{const t=[],v=be.value,y=e.max;let k=e.min;do t.push(k),k+=v;while(k<y);return t.push(y),t}),he=n(()=>{const t=` ${De}${T.value}-`;return De+`${t}${e.switchMarkerLabelsSide===!0?"switched":"standard"}${t}${A.value===!0?"rtl":"ltr"}`}),ie=n(()=>e.markerLabels===!1?null:ze(e.markerLabels).map((t,v)=>({index:v,value:t.value,label:t.label||t.value,classes:he.value+(t.classes!==void 0?" "+t.classes:""),style:{...Se(t.value),...t.style||{}}}))),ye=n(()=>({markerList:ie.value,markerMap:Pe.value,classes:he.value,getStyle:Se})),Be=n(()=>{if(Q.value!==0){const t=100*be.value/Q.value;return{...pe.value,backgroundSize:e.vertical===!0?`2px ${t}%`:`${t}% 2px`}}return null});function ze(t){if(t===!1)return null;if(t===!0)return ge.value.map(Bt);if(typeof t=="function")return ge.value.map(y=>{const k=t(y);return de(k)===!0?{...k,value:y}:{value:y,label:k}});const v=({value:y})=>y>=e.min&&y<=e.max;return Array.isArray(t)===!0?t.map(y=>de(y)===!0?y:{value:y}).filter(v):Object.keys(t).map(y=>{const k=t[y],V=Number(y);return de(k)===!0?{...k,value:V}:{value:V,label:k}}).filter(v)}function Se(t){return{[W.value]:`${100*(t-e.min)/F.value}%`}}const Pe=n(()=>{if(e.markerLabels===!1)return null;const t={};return ie.value.forEach(v=>{t[v.value]=v}),t});function je(){if($["marker-label-group"]!==void 0)return $["marker-label-group"](ye.value);const t=$["marker-label"]||zt;return ie.value.map(v=>t({marker:v,...ye.value}))}const Ue=n(()=>[[Ft,We,void 0,{[l.value]:!0,prevent:!0,stop:!0,mouse:!0,mouseAllDir:!0}]]);function We(t){t.isFinal===!0?(q.value!==void 0&&(u(t.evt),t.touch===!0&&a(!0),q.value=void 0,g("pan","end")),R.value=!1,E.value=!1):t.isFirst===!0?(q.value=N(t.evt),u(t.evt),a(),R.value=!0,g("pan","start")):(u(t.evt),a())}function ke(){E.value=!1}function Ge(t){u(t,N(t)),a(),j.value=!0,R.value=!0,document.addEventListener("mouseup",re,!0)}function re(){j.value=!1,R.value=!1,a(!0),ke(),document.removeEventListener("mouseup",re,!0)}function He(t){u(t,N(t)),a(!0)}function Ke(t){Ee.includes(t.keyCode)&&a(!0)}function Qe(t){if(e.vertical===!0)return null;const v=h.lang.rtl!==e.reverse?1-t:t;return{transform:`translateX(calc(${2*v-1} * ${e.thumbSize} / 2 + ${50-100*v}%))`}}function Ye(t){const v=n(()=>j.value===!1&&(E.value===t.focusValue||E.value==="both")?" q-slider--focus":""),y=n(()=>`q-slider__thumb q-slider__thumb${T.value} q-slider__thumb${T.value}-${A.value===!0?"rtl":"ltr"} absolute non-selectable`+v.value+(t.thumbColor.value!==void 0?` text-${t.thumbColor.value}`:"")),k=n(()=>({width:e.thumbSize,height:e.thumbSize,[W.value]:`${100*t.ratio.value}%`,zIndex:E.value===t.focusValue?2:void 0})),V=n(()=>t.labelColor.value!==void 0?` text-${t.labelColor.value}`:""),X=n(()=>Qe(t.ratio.value)),ue=n(()=>"q-slider__text"+(t.labelTextColor.value!==void 0?` text-${t.labelTextColor.value}`:""));return()=>{const ce=[_("svg",{class:"q-slider__thumb-shape absolute-full",viewBox:"0 0 20 20","aria-hidden":"true"},[_("path",{d:e.thumbPath})]),_("div",{class:"q-slider__focus-ring fit"})];return(e.label===!0||e.labelAlways===!0)&&(ce.push(_("div",{class:Fe.value+" absolute fit no-pointer-events"+V.value},[_("div",{class:Ie.value,style:{minWidth:e.thumbSize}},[_("div",{class:Re.value,style:X.value},[_("span",{class:ue.value},t.label.value)])])])),e.name!==void 0&&e.disable!==!0&&w(ce,"push")),_("div",{class:y.value,style:k.value,...t.getNodeData()},ce)}}function Je(t,v,y,k){const V=[];e.innerTrackColor!=="transparent"&&V.push(_("div",{key:"inner",class:qe.value,style:pe.value})),e.selectionColor!=="transparent"&&V.push(_("div",{key:"selection",class:x.value,style:t.value})),e.markers!==!1&&V.push(_("div",{key:"marker",class:M.value,style:Be.value})),k(V);const X=[ft("div",{key:"trackC",class:le.value,tabindex:v.value,...y.value},[_("div",{class:Me.value,style:Ne.value},V)],"slide",f.value,()=>Ue.value)];if(e.markerLabels!==!1){const ue=e.switchMarkerLabelsSide===!0?"unshift":"push";X[ue](_("div",{key:"markerL",class:Ae.value},je()))}return X}return dt(()=>{document.removeEventListener("mouseup",re,!0)}),{state:{active:R,focus:E,preventFocus:j,dragging:q,editable:f,classes:G,tabindex:p,attributes:o,step:B,decimals:O,trackLen:F,innerMin:U,innerMinRatio:b,innerMax:s,innerMaxRatio:C,positionProp:W,sizeProp:Z,isReversed:A},methods:{onActivate:Ge,onMobileClick:He,onBlur:ke,onKeyup:Ke,getContent:Je,getThumbRenderFn:Ye,convertRatioToModel:Oe,convertModelToRatio:se,getDraggingRatio:Ve}}}const Wt=()=>({}),Gt=Te({name:"QSlider",props:{...Pt,modelValue:{required:!0,default:null,validator:a=>typeof a=="number"||a===null},labelValue:[String,Number]},emits:jt,setup(a,{emit:u}){const{proxy:{$q:N}}=oe(),{state:c,methods:e}=Ut({updateValue:T,updatePosition:A,getDragging:d,formAttrs:bt(a)}),g=P(null),$=P(0),h=P(0);function K(){h.value=a.modelValue===null?c.innerMin.value:te(a.modelValue,c.innerMin.value,c.innerMax.value)}gt(()=>`${a.modelValue}|${c.innerMin.value}|${c.innerMax.value}`,K),K();const w=n(()=>e.convertModelToRatio(h.value)),R=n(()=>c.active.value===!0?$.value:w.value),j=n(()=>{const f={[c.positionProp.value]:`${100*c.innerMinRatio.value}%`,[c.sizeProp.value]:`${100*(R.value-c.innerMinRatio.value)}%`};return a.selectionImg!==void 0&&(f.backgroundImage=`url(${a.selectionImg}) !important`),f}),E=e.getThumbRenderFn({focusValue:!0,getNodeData:Wt,ratio:R,label:n(()=>a.labelValue!==void 0?a.labelValue:h.value),thumbColor:n(()=>a.thumbColor||a.color),labelColor:n(()=>a.labelColor),labelTextColor:n(()=>a.labelTextColor)}),q=n(()=>c.editable.value!==!0?{}:N.platform.is.mobile===!0?{onClick:e.onMobileClick}:{onMousedown:e.onActivate,onFocus:U,onBlur:e.onBlur,onKeydown:s,onKeyup:e.onKeyup});function T(f){h.value!==a.modelValue&&u("update:modelValue",h.value),f===!0&&u("change",h.value)}function d(){return g.value.getBoundingClientRect()}function A(f,O=c.dragging.value){const B=e.getDraggingRatio(f,O);h.value=e.convertRatioToModel(B),$.value=a.snap!==!0||a.step===0?B:e.convertModelToRatio(h.value)}function U(){c.focus.value=!0}function s(f){if(!Ee.includes(f.keyCode))return;fe(f);const O=([34,33].includes(f.keyCode)?10:1)*c.step.value,B=([34,37,40].includes(f.keyCode)?-1:1)*(c.isReversed.value===!0?-1:1)*(a.vertical===!0?-1:1)*O;h.value=te(parseFloat((h.value+B).toFixed(c.decimals.value)),c.innerMin.value,c.innerMax.value),T()}return()=>{const f=e.getContent(j,c.tabindex,q,O=>{O.push(E())});return _("div",{ref:g,class:c.classes.value+(a.modelValue===null?" q-slider--no-value":""),...c.attributes.value,"aria-valuenow":a.modelValue},f)}}});function Le(a){setTimeout(()=>{window.URL.revokeObjectURL(a.href)},1e4),a.remove()}function Ht(a,u,N={}){const{mimeType:c,byteOrderMark:e,encoding:g}=typeof N=="string"?{mimeType:N}:N,$=g!==void 0?new TextEncoder(g).encode([u]):u,h=e!==void 0?[e,$]:[$],K=new Blob(h,{type:c||"application/octet-stream"}),w=document.createElement("a");w.href=window.URL.createObjectURL(K),w.setAttribute("download",a),typeof w.download>"u"&&w.setAttribute("target","_blank"),w.classList.add("hidden"),w.style.position="fixed",document.body.appendChild(w);try{return w.click(),Le(w),!0}catch(R){return Le(w),R}}const Kt={class:"q-mb-xl"},Qt=i("div",{class:"text-h6 q-mb-md"},"User Information",-1),Yt=i("p",null,` Your height is used for the BMI calculation when updating your body weight fi you provide it. For reference, a height of 5'10" is equal to 70 inches. `,-1),Jt=i("p",{class:"text-h6"},"Height",-1),Xt={class:"q-mb-xl"},Zt=i("p",{class:"text-h6"},"Options",-1),ea={class:"q-mb-md"},ta=i("p",null,"Reset your app Settings to the defaults without impacting any of your data.",-1),aa={class:"q-mb-md"},la=i("p",null," Welcome overlay provides helpful instructions on basic app usage on the Dashboard page. ",-1),na={class:"q-mb-md"},oa=i("p",null,"Show descriptions for records displayed on the Dashboard page.",-1),sa=i("p",null,"Dark mode allows you to switch between a light or dark theme for the app.",-1),ia={class:"q-mb-xl"},ra=i("p",{class:"text-h6"},"Defaults",-1),ua=i("p",null,"Load default records into the database to get started using the app.",-1),ca={class:"q-mb-md"},da={class:"q-mb-md"},ma={class:"q-mb-md"},va={class:"q-mb-md"},fa={class:"q-mb-xl"},pa=i("p",{class:"text-h6"},"Data Management",-1),ba={class:"q-mb-md"},ga=i("p",null," Import data into the database from a JSON file. The app expects the data in the file to be structured the same as the exported version. Logs are ignored during imports. ",-1),ha={class:"q-mb-md"},ya=i("p",null," Export your data as a JSON file. Do this on a regularly basis so you have a backup of your data. ",-1),Sa={class:"q-mb-xl"},ka=i("p",{class:"text-h6"},"Logging",-1),Ca={class:"q-mb-md"},xa=i("p",null,"View the app logs to troubleshoot issues.",-1),_a={class:"q-mb-md"},wa=i("p",null," Validate that the logging settings below are working as expected by generating some test logs. ",-1),Da={class:"q-mb-md"},La=i("p",null,"Show Console Logs will display all log messages in the browser console.",-1),Ta={class:"q-mb-md"},$a=i("p",null,"Show Info Messages will display info level notifications.",-1),Ea={class:"q-mb-md"},Fa=i("p",null," Change log retention duration below. Logs older than the selected time will be deleted. This functions retroactivley. Expired log processing occurs every time the app is loaded. ",-1),Ia={class:"q-mx-lg"},Ra={class:"q-mb-xl"},Aa=i("p",{class:"text-h6 text-negative"},"DANGER ZONE",-1),Ma=i("p",null," The following operations cannot be undone. Consider exporting your data before proceeding. ",-1),Na={class:"q-mb-md"},qa=i("p",null,"Delete the app logs from the database.",-1),Oa={class:"q-mb-md"},Va=i("p",null,"Permanently delete all data from the database.",-1),Ba={class:"q-mb-md"},za=i("p",null,"Delete the underlining database and all of its data (requires website reload).",-1),ll=ht({__name:"SettingsView",setup(a){yt({title:`${me} - Settings`});const{log:u}=St(),{notify:N}=kt(),{confirmDialog:c}=It(),{onAddBarbellStrengthWorkouts:e,onAddStretchRoutine:g,onAddCarpalTunnelRoutine:$,onAddDeepBreathingRoutine:h,onAddStandardMeasurements:K}=Rt(),{goToLogsData:w}=Mt(),R=Ct.number().positive().min(1).max(120).optional(),j=P([]),E=P(null),q=P(void 0),T=P(0),d=P(null),A=[H[H["One Week"]],H[H["One Month"]],H[H["Three Months"]],H[H["Six Months"]],H[H["One Year"]],H[H.Forever]],U=I.liveSettings().subscribe({next:m=>{var o,G;j.value=m;const l=(o=m.find(r=>r.key===z.LOG_RETENTION_DURATION))==null?void 0:o.value;T.value=A.findIndex(r=>r===H[l]),q.value=(G=m.find(r=>r.key===z.USER_HEIGHT_INCHES))==null?void 0:G.value},error:m=>{u.error("Error fetching live Settings",m)}});xt(()=>{U.unsubscribe()});function s(){u.debug("This is a Debug Log",{name:"Debug"}),u.info("This is an Info Log",{name:"Info"}),u.warn("This is a Warning Log",{name:"Warning"}),u.error("This is an Error Log",{name:"Error"})}function f(m){var o,G;const l=((G=(o=m[0])==null?void 0:o.importFile)==null?void 0:G.name)||void 0;u.warn(`Cannot import"${l}`,m)}async function O(){var r,D;const m=await I.isActiveWorkout(),l=m?`You have an active workout. Importing data will discard it. Import backup data from ${(r=d==null?void 0:d.value)==null?void 0:r.name} and attempt to load records into the database from it?`:`Import backup data from ${(D=d==null?void 0:d.value)==null?void 0:D.name} and attempt to load records into the database from it?`,o=m?J.WARN:J.INFO;c("Import",l,o,m?"warning":"info",async()=>{try{await I.discardWorkout();const x=JSON.parse(await d.value.text());if(u.silentDebug("backupData:",x),x.appName!==me)throw new Error(`Cannot import data from the app ${x.appName}`);x[we.SETTINGS].length>0&&await Promise.all(x[we.SETTINGS].filter(M=>Object.values(z).includes(M.key)).map(async M=>await I.setSetting(M.key,M.value))),await Promise.all([Object.values($t).map(async M=>await I.importRecords(M,x[M]))]),d.value=null,u.info("Successfully imported available data")}catch(x){u.error("Error during import",x)}})}async function B(){const m=me.toLowerCase().split(" ").join("-"),l=new Date().toISOString().split("T")[0],o=`export-${m}-${l}.json`,G=await I.isActiveWorkout(),r=G?`You have an active workout. Exporting data will discard it. Export all data into the file "${o}" as a backup?`:`Export all data into the file "${o}" as a backup?`,D=G?J.WARN:J.INFO;c("Export",r,D,G?"warning":"info",async()=>{try{await I.discardWorkout();const M=await I.getBackupData();if(u.silentDebug("backupData:",M),Ht(o,JSON.stringify(M),{encoding:"UTF-8",mimeType:"application/json"})===!0)u.info("File downloaded successfully",{filename:o});else throw new Error("Browser denied file download")}catch(M){u.error("Export failed",M)}})}async function p(m){try{const l=A[m],o=H[l];await I.setSetting(z.LOG_RETENTION_DURATION,o),u.info("Updated log retention duration",{logDurationKey:l,logDuration:o,index:m})}catch(l){u.error("Log retention duration update failed",l)}}function F(){c("Reset Settings","Would you like to reset your app Settings to the defaults? This does not impact your data.",J.REFRESH,"primary",async()=>{try{await I.clearSettings(),u.info("Successfully reset settings")}catch(m){u.error("Error reseting settings",m)}})}function Q(){c("Delete Logs","Permanetly delete all Logs from the database?",J.CLEAR,"negative",async()=>{try{await I.clearLogs(),u.info("Successfully deleted logs data")}catch(m){u.error("Error deleting Logs",m)}})}function b(){c("Delete All","Permanetly delete all data from the database?",J.CLEAR,"negative",async()=>{try{await I.clearAll(),u.info("All data successfully deleted")}catch(m){u.error("Error deleting all data",m)}})}function C(){c("Delete Database","Delete the underlining database? All data will be lost. You must reload the website after this action to reinitialize the database.",J.CLEAR,"negative",async()=>{try{await I.deleteDatabase(),N("Reload the website now",J.WARN,"warning")}catch(m){u.error("Database deletion failed",m)}})}function W(m){var l;return(l=j.value.find(o=>o.key===m))==null?void 0:l.value}async function Z(){var m;q.value||(q.value=void 0),(m=E==null?void 0:E.value)!=null&&m.validate()&&await I.setSetting(z.USER_HEIGHT_INCHES,q.value)}return(m,l)=>(xe(),_e(At,{bannerIcon:S(J).SETTINGS,bannerTitle:"Settings"},{default:ve(()=>[i("section",Kt,[Qt,Yt,Jt,L(_t,{modelValue:q.value,"onUpdate:modelValue":[l[0]||(l[0]=o=>q.value=o),l[1]||(l[1]=o=>Z())],modelModifiers:{number:!0},ref_key:"heightInputRef",ref:E,rules:[o=>S(R).safeParse(o).success||"Must be 1-120 or empty"],hint:"Auto Saved",type:"number",placeholder:"Total Inches",dense:"",outlined:"",color:"primary"},null,8,["modelValue","rules"])]),i("section",Xt,[Zt,i("div",ea,[ta,L(Y,{label:"Reset Settings",color:"primary",onClick:l[2]||(l[2]=o=>F())})]),i("div",aa,[la,L(ae,{label:"Show Welcome Overlay","model-value":W(S(z).WELCOME_OVERLAY),"onUpdate:modelValue":l[3]||(l[3]=o=>S(I).setSetting(S(z).WELCOME_OVERLAY,o))},null,8,["model-value"])]),i("div",na,[oa,L(ae,{label:"Show Dashboard Descriptions","model-value":W(S(z).DASHBOARD_DESCRIPTIONS),"onUpdate:modelValue":l[4]||(l[4]=o=>S(I).setSetting(S(z).DASHBOARD_DESCRIPTIONS,o))},null,8,["model-value"])]),i("div",null,[sa,L(ae,{label:"Dark Mode","model-value":W(S(z).DARK_MODE),"onUpdate:modelValue":l[5]||(l[5]=o=>S(I).setSetting(S(z).DARK_MODE,o))},null,8,["model-value"])])]),i("section",ia,[ra,i("div",null,[ua,i("div",ca,[L(Y,{label:"Barbell Strength Workouts",color:"primary",onClick:l[6]||(l[6]=o=>S(e)())})]),i("div",da,[L(Y,{label:"Stretch Routine",color:"primary",onClick:l[7]||(l[7]=o=>S(g)())})]),i("div",ma,[L(Y,{label:"Carpel Tunnel Routine",color:"primary",onClick:l[8]||(l[8]=o=>S($)())})]),i("div",va,[L(Y,{label:"Deep Breathing Routine",color:"primary",onClick:l[9]||(l[9]=o=>S(h)())})]),i("div",null,[L(Y,{label:"Standard Measurements",color:"primary",onClick:l[10]||(l[10]=o=>S(K)())})])])]),i("section",fa,[pa,i("div",ba,[ga,L(Vt,{modelValue:d.value,"onUpdate:modelValue":l[13]||(l[13]=o=>d.value=o),dense:"",outlined:"",counter:"","bottom-slots":"",label:"File Select","max-file-size":S(Tt).MAX_FILE_SIZE,accept:"application/json",onRejected:f},{before:ve(()=>[L(Y,{disable:!d.value,label:"Import",color:"primary",onClick:l[11]||(l[11]=o=>O())},null,8,["disable"])]),append:ve(()=>[d.value?(xe(),_e(wt,{key:0,name:S(J).CLOSE,class:"cursor-pointer",onClick:l[12]||(l[12]=Dt(o=>d.value=null,["stop"]))},null,8,["name"])):Lt("",!0)]),_:1},8,["modelValue","max-file-size"])]),i("div",ha,[ya,L(Y,{label:"Export",color:"primary",onClick:l[14]||(l[14]=o=>B())})])]),i("section",Sa,[ka,i("div",Ca,[xa,L(Y,{label:"Access Logs",color:"primary",onClick:l[15]||(l[15]=o=>S(w)())})]),i("div",_a,[wa,L(Y,{label:"Test Logger",color:"primary",onClick:l[16]||(l[16]=o=>s())})]),i("div",Da,[La,L(ae,{label:"Show Console Logs","model-value":W(S(z).CONSOLE_LOGS),"onUpdate:modelValue":l[17]||(l[17]=o=>S(I).setSetting(S(z).CONSOLE_LOGS,o))},null,8,["model-value"])]),i("div",Ta,[$a,L(ae,{label:"Show Info Messages","model-value":W(S(z).INFO_MESSAGES),"onUpdate:modelValue":l[18]||(l[18]=o=>S(I).setSetting(S(z).INFO_MESSAGES,o))},null,8,["model-value"])]),i("div",Ea,[Fa,i("div",Ia,[L(Gt,{modelValue:T.value,"onUpdate:modelValue":l[19]||(l[19]=o=>T.value=o),"label-value":A[T.value],color:"primary",markers:"","label-always":"","switch-label-side":"",min:0,max:A.length-1,onChange:l[20]||(l[20]=o=>p(o))},null,8,["modelValue","label-value","max"])])])]),i("section",Ra,[Aa,Ma,i("div",Na,[qa,L(Y,{label:"Delete Logs",color:"negative",onClick:l[21]||(l[21]=o=>Q())})]),i("div",Oa,[Va,L(Y,{label:"Delete All Data",color:"negative",onClick:l[22]||(l[22]=o=>b())})]),i("div",Ba,[za,L(Y,{label:"Delete Database",color:"negative",onClick:l[23]||(l[23]=o=>C())})])])]),_:1},8,["bannerIcon"]))}});export{ll as default};
