import{a7 as m,a8 as w,a9 as V,af as S,b6 as T,x,ap as f,E as e,bS as g,bT as E,N as l,bV as v,bW as Q,bX as C,bY as L,ao as d,V as M,cx as k,eD as D,b$ as j,M as B,ae as P}from"./useUserTheme-cad0e91d.js";import{L as R}from"./index-67fb8a4b.js";import{V as U}from"./index-566ac3e3.js";const{getColor:W}=P,c=20,H=()=>{const r=m(),{color:n,colorMode:i}=w(),[p]=V(`(max-width: ${r.breakpoints.sm})`),{spacing:u}=S(),a=T(s=>s.users.data.activeUser.data.recentlyViewed.tv),[y,h]=x.useState(c),o=f(y,"slow");return a.length===0?e(g,{color:n,colorMode:i,borderWidth:"2px",borderStyle:"dashed",borderColor:W({theme:r,colorMode:i,type:"divider"}),borderRadius:"lg",children:e(E,{children:l(v,{children:[e(Q,{}),e(C,{children:L({type:"empty",label:d({type:"multiple",mediaType:"tv"})})})]})})}):l(M,{width:"100%",spacing:u,children:[e(U,{children:({displayMode:s})=>k(a).desc(({addedAt:t})=>t).filter((t,b)=>b<o).map(({mediaItem:t})=>s==="list"?e(D,{show:t},t.id):e(j,{show:t},t.id))}),e(B,{width:p?"100%":"auto",children:e(R,{amount:o,total:a.length,label:d({type:"multiple",mediaType:"tv"}),isLoading:!1,isButtonVisible:o<=a.length,onClick:()=>h(s=>s+c)})})]})};export{H as default};
