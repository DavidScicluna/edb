import{a7 as I,a8 as $,a9 as B,af as z,b7 as L,E as e,ef as H,eh as O,ei as A,N as C,M as S,L as y,ah as D,c5 as v,c6 as x,al as k,aQ as w,ai as M,ae as T,ax as j,bI as W,J as F,V as R,aF as G,aD as Q,aE as U,b6 as V,aO as _,aG as J,cx as N}from"./useUserTheme-cad0e91d.js";import{g as q,a as K}from"./index-e6812797.js";import"./index-789eed9b.js";import"./index-f91c493c.js";import"./index-8754a0a6.js";import"./index-da6fdb45.js";import"./dimensions-1922ff5f.js";import"./index-490c57f0.js";import"./index-fac269b5.js";import"./index-86281d15.js";import"./index-65752566.js";import"./index-6c03e0d3.js";import"./index-566ac3e3.js";import"./index-059dc8bd.js";import"./index-67fb8a4b.js";import"./index-278c1566.js";import"./index-5e29d59e.js";import"./tabs-1769093c.js";import"./index-c7b185ee.js";import"./index-a6d2ef26.js";import"./index-6b3e9b0b.js";import"./tabs-8cea7072.js";import"./index-6fc29f67.js";const{getColor:E}=T,P=({list:f,isOpen:r=!1,onEdit:i,onDelete:c,onClose:h})=>{const a=I(),{color:m,colorMode:o}=$(),[n]=B(`(max-width: ${a.breakpoints.sm})`),{spacing:s}=z(),[b,g]=L(),[t,d]=L();return e(H,{placement:"bottom",isOpen:r,onClose:h,size:"md",children:e(O,{width:"auto",maxWidth:"none",alignItems:"center",justifyContent:"center",boxShadow:"none",background:"transparent",children:e(A,{width:"fit-content",p:s,children:C(S,{background:E({theme:a,colorMode:o,type:o==="light"?"dark":"light"}),borderRadius:"full",boxShadow:"lg",px:s,py:s/2,children:[C(y,{alignItems:"center",justifyContent:"space-between",spacing:s,children:[e(D,{align:"left",color:E({theme:a,colorMode:o,type:o==="dark"?"darkest":"lightest"}),fontSize:n?"md":"lg",fontWeight:"medium",whiteSpace:"nowrap",children:`Selected "${f.label}" list`}),C(y,{spacing:s/2,children:[n?e(v,{"aria-label":"Edit selected list (tooltip)",colorMode:o,isOpen:b,placement:"top",label:"Edit",children:e(x,{"aria-label":"Edit selected list",color:m,colorMode:o,onClick:()=>i(),onMouseEnter:()=>g.on(),onMouseLeave:()=>g.off(),children:e(k,{icon:"edit",category:"outlined"})})}):e(w,{color:m,colorMode:o,renderLeft:({color:p,colorMode:u,height:l})=>e(M,{width:`${l}px`,height:`${l}px`,fontSize:`${l}px`,colorMode:u,icon:"edit",category:"outlined",skeletonColor:p}),onClick:()=>i(),children:"Edit"}),n?e(v,{"aria-label":"Delete selected list (tooltip)",colorMode:o,isOpen:t,placement:"top",label:"Delete",children:e(x,{"aria-label":"Delete selected list",color:"red",colorMode:o,onClick:()=>c(),onMouseEnter:()=>d.on(),onMouseLeave:()=>d.off(),children:e(k,{icon:"delete_outline",category:"outlined"})})}):e(w,{color:"red",colorMode:o,renderLeft:({color:p,colorMode:u,height:l})=>e(M,{width:`${l}px`,height:`${l}px`,fontSize:`${l}px`,colorMode:u,icon:"delete_outline",category:"outlined",skeletonColor:p}),onClick:()=>c(),children:"Delete"})]})]}),e(S,{ml:s/2,children:e(x,{"aria-label":"Close",colorMode:o,onClick:()=>h(),variant:"icon",children:e(k,{icon:"close",category:"outlined"})})})]})})})})},{getColor:X}=T,Y=f=>{const r=I(),{color:i,colorMode:c}=$(),[h,{width:a}]=j(),{list:m,isDisabled:o=!1,isSelected:n=!1,onSelectList:s,onListClick:b}=f,{id:g,label:t,mediaItems:{movie:d=[],tv:p=[]}}=m,[u,l]=L();return e(W,{ref:h,color:n?i:"gray",isClickable:!o,isFullWidth:!0,isFixed:!o&&u,isLight:!n,onClick:!o&&!u?()=>b():void 0,children:e(F,{children:C(R,{position:"relative",width:"100%",height:`${a}px`,alignItems:"center",justifyContent:"center",spacing:.5,children:[g!=="ds-edb-user-lists-watchlist"&&e(S,{position:"absolute",top:r.space[1],left:r.space[1],onMouseEnter:()=>l.on(),onMouseLeave:()=>l.off(),children:e(G,{"aria-label":"Select list",color:i,colorMode:c,id:t,name:t,isChecked:n,onChange:()=>s(),size:"xs",variant:"transparent"})}),e(D,{align:"center",color:n?void 0:X({theme:r,colorMode:c,type:"text.primary"}),fontSize:"xl",fontWeight:"semibold",lineHeight:"shorter",noOfLines:1,children:t}),(d.length>0||p.length>0)&&e(Q,{color:i,colorMode:c,size:"xs",children:e(U,{children:`${d.length+p.length} ${d.length+p.length===1?"Bookmark":"Bookmarks"}`})})]})})})},Se=f=>{const r=V(t=>t.users.data.activeUser.data.lists||[]),{selectedList:i,isListActionsOpen:c,onTabChange:h,onSetSelectedList:a,onEditList:m,onDeleteList:o,onListActionsOpen:n,onListActionsClose:s}=f,b=t=>{t.id!==(i==null?void 0:i.id)?(a(t),setTimeout(()=>n(),250)):a(void 0)},g=()=>{s(),a(void 0)};return C(_,{children:[e(J,{width:"100%",columns:[1,2,4,4,5,6],spacing:2,children:N(r).desc(({updatedAt:t})=>t).map(t=>e(Y,{list:t,isDisabled:q(t)===0,isSelected:t.id===(i==null?void 0:i.id),onSelectList:()=>b(t),onListClick:()=>h({index:K({lists:r,list:t})})},t.id))}),i&&e(P,{list:i,isOpen:c,onEdit:()=>m(),onDelete:()=>o(),onClose:g})]})};export{Se as default};
