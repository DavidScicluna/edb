import{a7 as B,a8 as D,a9 as N,af as I,E as e,bS as f,N as s,bT as x,bU as _,ai as j,bV as E,bW as w,bX as $,bY as Q,ao as n,bZ as V,aQ as C,V as L,eE as F,ep as H,M as P,a6 as U,au as G,at as W}from"./useUserTheme-cad0e91d.js";import{L as z}from"./index-67fb8a4b.js";import{V as q}from"./index-566ac3e3.js";import{u as X}from"./useSearchContext-11e6a931.js";import"./index-caa2c1f1.js";import"./index-f91c493c.js";import"./index-6c03e0d3.js";import"./index-fac269b5.js";import"./index-86281d15.js";import"./dimensions-1922ff5f.js";import"./SpinnerCircularFixed-2623c82b.js";const se=({query:A,data:M})=>{const o=B(),{color:d,colorMode:h}=D(),[y]=N(`(max-width: ${o.breakpoints.sm})`),{spacing:g}=I(),{query:l}=X(),{isFetchingNextPage:c,isFetching:m,isLoading:u,isError:p,isSuccess:b,hasNextPage:S,fetchNextPage:k}=A,{results:i=[],total_results:r=0}=M||{};return!(c||m||u)&&p?e(f,{color:d,colorMode:h,children:s(x,{children:[e(_,{renderIcon:t=>e(j,{...t,width:o.fontSizes["6xl"],height:o.fontSizes["6xl"],fontSize:o.fontSizes["6xl"],icon:"error_outline"}),p:2}),s(E,{children:[e(w,{}),e($,{children:Q({type:"error",label:`${n({type:r===1?"single":"multiple",mediaType:"collection"})} with query "${l}"`})})]}),e(V,{renderActions:t=>e(C,{...t,children:"Try Again"})})]})}):!(c||m||u)&&b&&i&&i.length===0?e(f,{color:d,colorMode:h,children:s(x,{children:[s(E,{children:[e(w,{}),e($,{children:Q({type:"empty",label:`${n({type:r===1?"single":"multiple",mediaType:"collection"})} with query "${l}"`})})]}),e(V,{renderActions:t=>e(C,{...t,children:"Try Again"})})]})}):!(c||m||u)&&b&&i&&i.length>0?s(L,{width:"100%",spacing:g,children:[e(q,{children:({displayMode:t})=>i.map(a=>t==="list"?e(F,{collection:a},a.id):e(H,{collection:a},a.id))}),e(P,{width:y?"100%":"auto",children:e(z,{amount:i.length,total:r,label:`${n({type:r===1?"single":"multiple",mediaType:"collection"})} with query "${l}"`,isLoading:!1,isButtonVisible:S&&!p,onClick:k})})]}):s(L,{width:"100%",spacing:g,children:[e(q,{children:({displayMode:t})=>U.range(20).map((a,T)=>t==="list"?e(G,{mediaType:"collection",hasSubtitle:!0,hasDescription:!0},T):e(W,{mediaType:"collection",hasSubtitle:!0},T))}),e(P,{width:y?"100%":"auto",children:e(z,{amount:i.length,total:r,label:`${n({type:r===1?"single":"multiple",mediaType:"collection"})} with query "${l}"`,isDisabled:!0,isLoading:!0,isButtonVisible:S&&!p})})]})};export{se as default};
