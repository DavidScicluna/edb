import{af as Re,b6 as se,E as e,cY as oo,N,V as oe,as as ze,aC as so,ah as ne,M as to,L as Ne,aP as ao,aQ as ce,H as q,I as L,cW as C,cX as I,a6 as V,a7 as we,a9 as ro,aL as H,bI as He,J as qe,aj as j,ai as io,aG as no,cB as Z,aI as lo,b7 as W,d5 as co,d6 as Le,d7 as J,d8 as $e,aY as mo,ae as Ge,d9 as uo,x as Y,aa as ho,c9 as bo,U as po,c7 as fo,ap as wo,cV as K,aq as Ue,ar as xe,da as Co,T as Po,aH as go,K as vo,aV as X,db as Ie,ch as _,ci as B,dc as de,dd as So,b9 as Ve,de as Ee}from"./useUserTheme-cad0e91d.js";import{u as Ae,f as yo,l as Mo,P as me,s as ke}from"./index-5536e45c.js";import{t as M,E as Fo,P as Do,j as To,k as No,l as $o}from"./index-789eed9b.js";import{u as Uo}from"./usePrompt-5bc04cbc.js";import{P as xo,a as Io,b as Vo}from"./index-f91c493c.js";import{U as Eo,a as Ao}from"./index-163d9a30.js";import{T as ko}from"./index-86281d15.js";import"./index-8754a0a6.js";import"./index-da6fdb45.js";import"./dimensions-1922ff5f.js";import"./index-490c57f0.js";import"./index-fac269b5.js";import"./index-65752566.js";import"./index-6c03e0d3.js";import"./index-566ac3e3.js";import"./index-059dc8bd.js";import"./index-67fb8a4b.js";import"./index-278c1566.js";import"./index-5e29d59e.js";import"./tabs-1769093c.js";import"./index-c7b185ee.js";import"./index-a6d2ef26.js";import"./index-6b3e9b0b.js";import"./tabs-8cea7072.js";const te=P=>{const{spacing:c}=Re(),{id:d}=se(o=>o.users.data.activeUser.data),{children:i,color:h=q,colorMode:a=L,title:m,subtitle:l,isSubmitDisabled:n=!0,onReset:g,onSubmit:r}=P;return e(oo,{width:"100%",onSubmit:r,children:N(oe,{width:"100%",divider:e(ze,{colorMode:a}),spacing:c,children:[e(so,{width:"100%",renderTitle:o=>e(ne,{...o,fontSize:["3xl","3xl","4xl","4xl","5xl","5xl"],children:m}),renderSubtitle:o=>e(ne,{...o,children:l}),py:c}),e(to,{width:"100%",children:i}),N(Ne,{width:"100%",justifyContent:"space-between",spacing:0,children:[e(ao,{to:"/profile",children:e(ce,{colorMode:a,variant:"outlined",children:"Cancel"})}),N(Ne,{spacing:2,children:[g&&e(ce,{color:h,colorMode:a,onClick:()=>g(),variant:"text",children:"Reset"}),e(ce,{color:h,colorMode:a,isDisabled:!d||n,type:"submit",children:"Update"})]})]})]})})},Ro=P=>{const{info:{prefers:c}}=se($=>$.users.data.activeUser.data),{form:d,color:i=q,colorMode:h=L,onSubmit:a}=P,{control:m,reset:l,handleSubmit:n}=d,g=C({control:m,name:"movie"}),r=C({control:m,name:"tv"}),{isDirty:o}=I({control:m}),w=()=>{l({...c})};return e(te,{color:i,colorMode:h,title:"Favored Genres",subtitle:"Select your most favorite Movie & TV Show genres.",isSubmitDisabled:!o,onReset:!V.isEqual(g,c.movie)||!V.isEqual(r,c.tv)?w:void 0,onSubmit:n(a),children:e(Eo,{form:d,color:i,colorMode:h})})},zo=P=>{const c=we(),[d]=ro(`(min-width: ${c.breakpoints.sm})`),{info:{name:i,bio:h},credentials:{username:a}}=se(p=>p.users.data.activeUser.data),{form:m,color:l=q,colorMode:n=L,onSubmit:g}=P,{control:r,reset:o,handleSubmit:w}=m,$=C({control:r,name:"firstName"}),U=C({control:r,name:"lastName"}),R=C({control:r,name:"bio"}),{isDirty:G}=I({control:r}),v=H(V.sample(V.range(Ae.length))),E=H(v?Ae[v]:"johnsmith"),A=H(v?yo[v]:"John"),z=H(v?Mo[v]:"Smith"),D=i.split(" "),T=D&&D[0]?D[0]:"",F=D&&D[1]?D[1]:"";return e(te,{color:l,colorMode:n,title:"Details",subtitle:"Edit your basic information.",isSubmitDisabled:!G,onReset:T!==$||F!==U||h!==R?()=>{o({firstName:T,lastName:F,bio:h})}:void 0,onSubmit:w(g),children:e(He,{colorMode:n,isFullWidth:!0,variant:"outlined",p:2,children:e(qe,{children:N(oe,{width:"100%",spacing:2,children:[e(j,{color:l,colorMode:n,autoComplete:"off",label:"Username",placeholder:E,isFullWidth:!0,isRequired:!0,isReadOnly:!0,renderLeftPanel:({color:p,...u})=>e(io,{...u,icon:"alternate_email",category:"outlined",skeletonColor:p}),value:a}),N(no,{width:"100%",columns:d?2:1,spacing:2,children:[e(Z,{control:r,name:"firstName",render:({field:{onChange:p,onBlur:u,value:S,name:f},fieldState:{error:y}})=>e(j,{color:l,colorMode:n,autoComplete:"off",label:"First name",name:f,helper:y?y.message:void 0,placeholder:A,onBlur:u,onChange:p,isError:!!y,isFullWidth:!0,isRequired:!0,value:S})}),e(Z,{control:r,name:"lastName",render:({field:{onChange:p,onBlur:u,value:S,name:f},fieldState:{error:y}})=>e(j,{color:l,colorMode:n,autoComplete:"off",label:"Last name",name:f,helper:y?y.message:void 0,placeholder:z,onBlur:u,onChange:p,isError:!!y,isFullWidth:!0,isRequired:!0,value:S})})]}),e(Z,{control:r,name:"bio",render:({field:{onChange:p,onBlur:u,value:S,name:f},fieldState:{error:y}})=>e(lo,{color:l,colorMode:n,label:"Biography",name:f,helper:y?y.message:void 0,placeholder:`My name is ${A} ${z} ...`,onBlur:u,onChange:p,isError:!!y,isFullWidth:!0,value:S,sx:{textarea:{height:c.space[12.5]}}})})]})})})})},ue=2,Ho=P=>{const{form:c,color:d=q,colorMode:i=L,onSubmit:h}=P,{control:a,handleSubmit:m}=c,l=C({control:a,name:"password"}),n=C({control:a,name:"newPassword"}),g=C({control:a,name:"confirmNewPassword"}),[r,o]=W(),[w,$]=W(),[U,R]=W(),[G,v]=W(),[E,A]=W(),[z,D]=W();return e(te,{color:d,colorMode:i,title:"Password",subtitle:"Update your password",isSubmitDisabled:!l||!n||!g,onSubmit:m(h),children:e(He,{colorMode:i,isFullWidth:!0,variant:"outlined",p:ue,children:e(qe,{children:N(oe,{width:"100%",divider:e(ze,{colorMode:i}),spacing:ue*2,children:[e(Z,{control:a,name:"password",render:({field:{onChange:T,onBlur:F,value:x,name:p},fieldState:{error:u}})=>e(j,{color:d,colorMode:i,autoComplete:"off",label:"Current Password",name:p,helper:u?u.message:void 0,placeholder:r?"password":"••••••••",onBlur:F,onChange:T,isError:!!u,isFullWidth:!0,isRequired:!0,renderRightPanel:({color:S,...f})=>e(me,{...f,label:"Current Password",isVisible:r,isHovering:w,setIsVisible:o,setIsHovering:$,iconProps:{...f,skeletonColor:S}}),type:r?"text":"password",value:x})}),N(oe,{width:"100%",spacing:ue,children:[e(Z,{control:a,name:"newPassword",render:({field:{onChange:T,onBlur:F,value:x,name:p},fieldState:{error:u}})=>e(j,{color:d,colorMode:i,autoComplete:"off",label:"New Password",name:p,helper:u?u.message:void 0,placeholder:U?"password":"••••••••",onBlur:F,onChange:T,isDisabled:!l,isError:!!u,isFullWidth:!0,isRequired:!0,renderRightPanel:({color:S,...f})=>e(me,{...f,label:"New Password",isVisible:U,isHovering:G,setIsVisible:R,setIsHovering:v,iconProps:{...f,skeletonColor:S}}),type:U?"text":"password",value:x})}),e(Z,{control:a,name:"confirmNewPassword",render:({field:{onChange:T,onBlur:F,value:x,name:p},fieldState:{error:u}})=>e(j,{color:d,colorMode:i,autoComplete:"off",label:"Confirm Password",name:p,helper:u?u.message:void 0,placeholder:E?"password":"••••••••",onBlur:F,onChange:T,isDisabled:!l,isError:!!u,isFullWidth:!0,isRequired:!0,renderRightPanel:({color:S,...f})=>e(me,{...f,label:"Confirm Password",isVisible:E,isHovering:z,setIsVisible:A,setIsHovering:D,iconProps:{...f,skeletonColor:S}}),type:E?"text":"password",value:x})})]})]})})})})},qo=P=>{const{defaultUserTheme:c,form:d,color:i=q,colorMode:h=L,onSubmit:a}=P,{control:m,reset:l,handleSubmit:n}=d,g=C({control:m,name:"color"}),r=C({control:m,name:"colorMode"}),{isDirty:o}=I({control:m}),w=()=>{l({...c})};return e(te,{color:i,colorMode:h,title:"Customization",subtitle:"Pick your favorite color and mode.",isSubmitDisabled:!o,onReset:c.color!==g||c.colorMode!==r?w:void 0,onSubmit:n(a),children:e(co,{form:d,color:i,colorMode:h})})},Lo=P=>{const{info:{avatar_path:c,background_path:d},credentials:{username:i}}=se(v=>v.users.data.activeUser.data),{color:h=q,colorMode:a=L,form:m,firstName:l,lastName:n,onSubmit:g}=P,{control:r,reset:o,handleSubmit:w}=m,$=C({control:r,name:"avatar_path"}),U=C({control:r,name:"background_path"}),{isDirty:R}=I({control:r});return e(te,{color:h,colorMode:a,title:"Avatar & Background",subtitle:"Upload an avatar & background of your choice!",isSubmitDisabled:!R,onReset:c!==$||d!==U?()=>{o({avatar_path:c,background_path:d})}:void 0,onSubmit:w(g),children:e(Ao,{color:h,colorMode:a,form:m,firstName:l,lastName:n,username:i})})},Go={firstName:"",lastName:"",bio:""},Oo={password:"",newPassword:"",confirmNewPassword:""},Wo={movie:[],tv:[]},_o={color:q,colorMode:L},Bo={avatar_path:"",background_path:""},jo=Le().shape({firstName:J().required().max(30,"The first name cannot exceed 30 characters!").label("First name"),lastName:J().required().max(30,"The last name cannot exceed 30 characters!").label("Last name"),bio:J().label("Biography")}),Zo=Le().shape({password:J().required().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!").max(30,"Cannot exceed 30 chars!").label("Password"),newPassword:J().required().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!").max(30,"Cannot exceed 30 chars!").notOneOf([$e("password")],"New password must not be equal to Password!").label("Password"),confirmNewPassword:J().oneOf([$e("newPassword")],"Confirm Password must be equal to New Password!").label("Password")}),{getTransitionConfig:Jo,getTransitionDelay:Qo}=Ge,Yo=P=>{const c=we(),d=H(Qo({theme:c})),i=H({...Jo({theme:c}),delay:d});return e(mo,{in:!0,transition:{enter:{...i},exit:{...i}},children:e(ko,{...P,color:"red",icon:"error_outline",category:"outlined"})})},{getColorMode:ee}=Ge,he="ds-edb-edit-user-details-form-toast",re="ds-edb-edit-user-password-form-success-toast",ie="ds-edb-edit-user-password-form-error-toast",be="ds-edb-edit-user-genres-form-toast",pe="ds-edb-edit-user-customization-form-toast",fe="ds-edb-edit-user-assets-form-toast",Ss=()=>{const P=we(),{setColorMode:c}=uo(),d=Y.useRef(),i=ho(),h=bo(),{spacing:a}=Re(),m=po(),{data:{id:l,info:n,credentials:g},ui:{theme:r}}=se(t=>t.users.data.activeUser),o=fo(),[w,$]=Y.useState(r.colorMode==="system"?ee():r.colorMode),[U,R]=Y.useState(0),G=wo(U),v=H({...r}),E=K({defaultValues:Go,resolver:Ie(jo)}),{control:A,reset:z}=E,D=C({control:A,name:"firstName"}),T=C({control:A,name:"lastName"}),{isDirty:F}=I({control:A}),x=K({defaultValues:Oo,resolver:Ie(Zo)}),{control:p,reset:u}=x,{isDirty:S}=I({control:p}),f=K({defaultValues:Wo}),{control:y,reset:Ce}=f,{isDirty:Pe}=I({control:y}),ge=K({defaultValues:_o}),{control:le,reset:ve}=ge,k=C({control:le,name:"color"}),Se=C({control:le,name:"colorMode"}),{isDirty:ae}=I({control:le}),ye=K({defaultValues:{...Bo}}),{control:Oe,reset:Me}=ye,{isDirty:Fe}=I({control:Oe});Uo({title:"Unsubmitted Changes!",subtitle:"Are you sure you want to cancel editing? Once you close the page you will not be able to retrieve the changed data!",when:F||S||Pe||ae||Fe});const We=({index:t})=>{const s=M.find((b,Q)=>t===Q);s&&s.path&&h({pathname:".",...s.path},{relative:"route"})},_e=t=>{const{firstName:s,lastName:b,bio:Q}=t;o.isActive(he)||o({id:he,duration:_({duration:15}),position:"bottom-left",render:()=>e(B,{duration:15,description:`Successfully updated ${s} ${b}'s ${V.lowerCase(M[0].label)}!`,status:"success",onClose:()=>o.close(he)})}),m(de({id:l,data:{...n,name:`${s} ${b}`,bio:Q}})),z({...t})},Be=t=>{const{password:s,newPassword:b}=t;ke(s).toString()===g.password?(o.isActive(re)||(o.close(ie),o({id:re,duration:_({duration:15}),position:"bottom-left",render:()=>e(B,{duration:15,description:`Successfully updated ${n.name}'s ${V.lowerCase(M[1].label)}!`,status:"success",onClose:()=>o.close(re)})})),m(So({id:l,data:{...g,password:ke(b).toString()}})),u({...t})):o.isActive(ie)||(o.close(re),o({id:ie,duration:_({duration:15}),position:"bottom-left",render:()=>e(B,{duration:15,description:"Incorrect username or password! Please try again.",status:"error",onClose:()=>o.close(ie)})}))},je=t=>{const{movie:s,tv:b}=t;o.isActive(be)||o({id:be,duration:_({duration:15}),position:"bottom-left",render:()=>e(B,{duration:15,description:`Successfully updated ${n.name}'s ${V.lowerCase(M[2].label)}!`,status:"success",onClose:()=>o.close(be)})}),m(de({id:l,data:{...n,prefers:{movie:s,tv:b}}})),Ce({...t})},Ze=t=>{const{color:s,colorMode:b}=t;o.isActive(pe)||o({id:pe,duration:_({duration:15}),position:"bottom-left",render:()=>e(B,{duration:15,description:`Successfully updated ${n.name}'s ${V.lowerCase(M[3].label)}!`,status:"success",onClose:()=>o.close(pe)})}),Ve({color:s,colorMode:b==="system"?ee():b}),m(Ee({id:l,data:{...P,...t}})),ve({...t})},Je=t=>{o.isActive(fe)||o({id:fe,duration:_({duration:15}),position:"bottom-left",render:()=>e(B,{duration:15,description:`Successfully updated ${n.name}'s ${V.lowerCase(M[4].label)}!`,status:"success",onClose:()=>o.close(fe)})}),m(de({id:l,data:{...n,...t}})),Me({...t})},Qe=()=>{const{name:t,bio:s,prefers:b,avatar_path:Q,background_path:Ke}=n,O=t.split(" "),Xe=O&&O[0]?O[0]:"",eo=O&&O[1]?O[1]:"";z({firstName:Xe,lastName:eo,bio:s}),Ce({...b}),ve({...r}),Me({avatar_path:Q,background_path:Ke})},De=()=>{const t=i.hash.replaceAll("#",""),s=M.findIndex(b=>b.path.hash===t);R(s>=0?s:0)},Te=({color:t,colorMode:s})=>{m(Ee({id:l,data:{color:t,colorMode:s}})),Ve({color:t,colorMode:s==="system"?ee():s}),c(s==="system"?ee():s),$(s==="system"?ee():s)},Ye=Y.useCallback(()=>{d.current&&Te({...v})},[d,v]);return Y.useEffect(()=>{d.current=ae},[ae]),Ue(()=>Qe()),Ue(()=>i.hash.length>0?De():void 0),xe(()=>De(),[i.hash]),xe(()=>{Te({color:k,colorMode:Se})},[k,Se]),Co(()=>Ye()),N(xo,{children:[e(Io,{renderTitle:t=>e(ne,{...t,children:"Edit Profile"}),renderSubtitle:t=>e(ne,{...t,children:`Edit your ${M.filter((s,b)=>b<M.length-1).map(s=>s.label).join(", ")} & ${M[M.length-1].label}`}),direction:"row",spacing:a,px:a,py:a*2}),e(Vo,{px:a,pb:a,children:e(Po,{width:"100%",color:k,colorMode:w,activeTab:G,onChange:We,size:"xl",children:N(oe,{width:"100%",spacing:a,children:[e(go,{tabs:M.map(({label:t},s)=>({label:t,renderLeft:s===0&&F||s===1&&S||s===2&&Pe||s===3&&ae||s===4&&Fe?b=>e(Yo,{...b}):void 0}))}),N(vo,{children:[e(X,{fallback:e(Fo,{}),children:e(zo,{form:E,color:k,colorMode:w,onSubmit:_e})}),e(X,{fallback:e(Do,{}),children:e(Ho,{form:x,color:k,colorMode:w,onSubmit:Be})}),e(X,{fallback:e(To,{}),children:e(Ro,{form:f,color:k,colorMode:w,onSubmit:je})}),e(X,{fallback:e(No,{}),children:e(qo,{defaultUserTheme:v,form:ge,color:k,colorMode:w,onSubmit:Ze})}),e(X,{fallback:e($o,{}),children:e(Lo,{form:ye,color:k,colorMode:w,firstName:D,lastName:T,onSubmit:Je})})]})]})})})]})};export{Ss as default};
