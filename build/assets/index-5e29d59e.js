import{a7 as c,a8 as a,N as s,L as d,E as e,ai as h,V as f,ag as r,ah as i,ae as g,ay as y,az as w,a9 as x,a6 as S,M as z,an as b}from"./useUserTheme-cad0e91d.js";import{c as V,d as H,e as D,f as v,g as I}from"./index-f91c493c.js";import{b as m}from"./index-da6fdb45.js";const{getColor:n}=g,k=()=>{const t=c(),{colorMode:o}=a();return s(d,{borderWidth:"2px",borderStyle:"solid",borderColor:n({theme:t,colorMode:o,type:"divider"}),borderRadius:"base",spacing:.5,p:1,children:[e(h,{width:t.fontSizes["4xl"],height:t.fontSizes["4xl"],fontSize:t.fontSizes["4xl"],color:n({theme:t,colorMode:o,color:"yellow",type:"color"}),colorMode:o,icon:"star",category:"outlined",skeletonColor:"yellow"}),s(f,{alignItems:"flex-start",justifyContent:"center",flex:1,spacing:.5,children:[s(d,{spacing:.5,children:[e(r,{colorMode:o,isLoaded:!1,variant:"text",children:e(i,{align:"left",fontSize:"xl",fontWeight:"semibold",lineHeight:"normal",whiteSpace:"nowrap",children:"##"})}),e(i,{align:"left",color:n({theme:t,colorMode:o,type:"text.secondary"}),fontSize:"xl",lineHeight:"normal",textTransform:"uppercase",whiteSpace:"nowrap",children:"/"}),e(i,{align:"left",color:n({theme:t,colorMode:o,type:"text.secondary"}),fontSize:"xl",lineHeight:"normal",textTransform:"uppercase",whiteSpace:"nowrap",children:"10"})]}),e(r,{colorMode:o,isLoaded:!1,variant:"text",children:e(i,{align:"left",fontSize:"md",lineHeight:"normal",textTransform:"uppercase",whiteSpace:"nowrap",children:"##"})})]})]})},L=()=>{const{colorMode:t}=a();return e(y,{width:"100%",height:"100%",overflow:"hidden",borderRadius:"lg",ratio:w({orientation:"square"}),children:e(r,{colorMode:t,width:"inherit",height:"inherit",isLoaded:!1,variant:"rectangle"})})},T=[225,255,285,315,345],W=()=>{const t=c(),{color:o,colorMode:l}=a(),[u]=x(`(max-width: ${t.breakpoints.sm})`);return s(V,{colorMode:l,isFullWidth:!0,spacing:2,p:2,children:[e(H,{hasTitle:!0,hasSubtitle:!0,dummyArrowProps:{variant:"icon"},spacing:0}),e(D,{children:e(v,{children:S.range(5).map((M,p)=>e(z,{width:T,children:e(L,{})},p))})}),e(I,{children:e(b,{color:o,colorMode:l,isFullWidth:!0,size:u?"xs":"sm",variant:"text",children:"View all ## videos"})})]})},j=()=>{const{colorMode:t}=a();return e(m,{renderLabel:o=>e(r,{colorMode:t,isLoaded:!1,variant:"text",children:e(i,{...o,children:"####"})})})},F=()=>{const{colorMode:t}=a();return e(m,{renderIcon:o=>e(h,{...o,icon:"hourglass_empty",category:"outlined"}),renderLabel:o=>e(r,{colorMode:t,isLoaded:!1,variant:"text",children:e(i,{...o,children:"##"})})})};export{W as D,k as V,j as a,F as b,L as c,T as w};
