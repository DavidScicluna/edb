import{a7 as B,a8 as D,a9 as N,af as F,E as e,bS as f,N as r,bT as x,bU as I,ai as _,bV as E,bW as w,bX as $,bY as Q,ao as l,bZ as V,aQ as C,V as L,eF as j,eG as G,M as P,a6 as H,au as U,at as W}from"./useUserTheme-cad0e91d.js";import{L as z}from"./index-67fb8a4b.js";import{V as q}from"./index-566ac3e3.js";import{u as X}from"./useSearchContext-11e6a931.js";import"./index-caa2c1f1.js";import"./index-f91c493c.js";import"./index-6c03e0d3.js";import"./index-fac269b5.js";import"./index-86281d15.js";import"./dimensions-1922ff5f.js";import"./SpinnerCircularFixed-2623c82b.js";const re=({query:A,data:M})=>{const o=B(),{color:y,colorMode:d}=D(),[h]=N(`(max-width: ${o.breakpoints.sm})`),{spacing:g}=F(),{query:n}=X(),{isFetchingNextPage:m,isFetching:c,isLoading:p,isError:u,isSuccess:b,hasNextPage:S,fetchNextPage:k}=A,{results:i=[],total_results:a=0}=M||{};return!(m||c||p)&&u?e(f,{color:y,colorMode:d,children:r(x,{children:[e(I,{renderIcon:t=>e(_,{...t,width:o.fontSizes["6xl"],height:o.fontSizes["6xl"],fontSize:o.fontSizes["6xl"],icon:"error_outline"}),p:2}),r(E,{children:[e(w,{}),e($,{children:Q({type:"error",label:`${l({type:a===1?"single":"multiple",mediaType:"company"})} with query "${n}"`})})]}),e(V,{renderActions:t=>e(C,{...t,children:"Try Again"})})]})}):!(m||c||p)&&b&&i&&i.length===0?e(f,{color:y,colorMode:d,children:r(x,{children:[r(E,{children:[e(w,{}),e($,{children:Q({type:"empty",label:`${l({type:a===1?"single":"multiple",mediaType:"company"})} with query "${n}"`})})]}),e(V,{renderActions:t=>e(C,{...t,children:"Try Again"})})]})}):!(m||c||p)&&b&&i&&i.length>0?r(L,{width:"100%",spacing:g,children:[e(q,{children:({displayMode:t})=>i.map(s=>t==="list"?e(j,{company:s},s.id):e(G,{company:s},s.id))}),e(P,{width:h?"100%":"auto",children:e(z,{amount:i.length,total:a,label:`${l({type:a===1?"single":"multiple",mediaType:"company"})} with query "${n}"`,isLoading:!1,isButtonVisible:S&&!u,onClick:k})})]}):r(L,{width:"100%",spacing:g,children:[e(q,{children:({displayMode:t})=>H.range(20).map((s,T)=>t==="list"?e(U,{mediaType:"company",hasSubtitle:!0,hasDescription:!0},T):e(W,{mediaType:"company",hasSubtitle:!0},T))}),e(P,{width:h?"100%":"auto",children:e(z,{amount:i.length,total:a,label:`${l({type:a===1?"single":"multiple",mediaType:"company"})} with query "${n}"`,isDisabled:!0,isLoading:!0,isButtonVisible:S&&!u})})]})};export{re as default};
