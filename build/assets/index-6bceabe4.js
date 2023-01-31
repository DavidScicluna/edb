import{a7 as $,a8 as v,a9 as V,N as g,eo as x,E as t,ah as k,aQ as C,ao as r,bP as n,cx as d,b_ as w,c0 as L,b$ as D,ep as P,eG as F,af as z,V as H,aV as p}from"./useUserTheme-cad0e91d.js";import{A as B,y as G,z as M,J as _,K as A}from"./index-789eed9b.js";import{H as j,a as Q,b as W,c as E}from"./index-3c387dce.js";import{d as c}from"./dimensions-1922ff5f.js";import"./index-f91c493c.js";import"./index-8754a0a6.js";import"./index-da6fdb45.js";import"./index-490c57f0.js";import"./index-fac269b5.js";import"./index-86281d15.js";import"./index-65752566.js";import"./index-6c03e0d3.js";import"./index-566ac3e3.js";import"./index-059dc8bd.js";import"./index-67fb8a4b.js";import"./index-278c1566.js";import"./index-5e29d59e.js";import"./tabs-1769093c.js";import"./index-c7b185ee.js";import"./index-a6d2ef26.js";import"./index-6b3e9b0b.js";import"./tabs-8cea7072.js";import"./index-c20f4d73.js";const u=a=>{const i=$(),{color:o,colorMode:e}=v(),[l]=V(`(max-width: ${i.breakpoints.sm})`),{children:s,title:y,subtitle:m,footerLabel:h,isDisabled:T,onFooterClick:b}=a;return g(x,{colorMode:e,isDisabled:T,isFullWidth:!0,spacing:2,p:2,children:[t(j,{renderTitle:f=>t(k,{...f,children:y}),renderSubtitle:m?f=>t(k,{...f,children:m}):void 0,arrowProps:{variant:"icon"},spacing:0}),t(Q,{children:t(W,{children:s})}),b&&t(E,{children:t(C,{color:o,colorMode:e,isFullWidth:!0,onClick:b,size:l?"xs":"sm",variant:"text",children:h})})]})},J=20,K=({type:a,movies:i,onSetActiveTab:o})=>{const e=i.length;return t(u,{title:r({type:"multiple",mediaType:"movie"}),subtitle:`${a==="liked"?"Liked":"Bookmarked"} a total of ${n(e).format({average:!0})} ${r({type:e===1?"single":"multiple",mediaType:"movie"})}`,footerLabel:`View all ${n(e).format({average:!0})} ${r({type:e===1?"single":"multiple",mediaType:"movie"})}`,isDisabled:e===0,onFooterClick:o?()=>o({mediaType:"movie"}):void 0,children:d(i).desc(({addedAt:l})=>l).filter((l,s)=>s<=J).map(({mediaItem:l})=>t(w,{movie:l,sx:c},l.id))})},N=20,U=({type:a,people:i,onSetActiveTab:o})=>{const e=i.length;return t(u,{title:r({type:"multiple",mediaType:"person"}),subtitle:`${a==="liked"?"Liked":"Bookmarked"} a total of ${n(e).format({average:!0})} ${r({type:e===1?"single":"multiple",mediaType:"person"})}`,footerLabel:`View all ${n(e).format({average:!0})} ${r({type:e===1?"single":"multiple",mediaType:"person"})}`,isDisabled:e===0,onFooterClick:o?()=>o({mediaType:"person"}):void 0,children:d(i).desc(({addedAt:l})=>l).filter((l,s)=>s<=N).map(({mediaItem:l})=>t(L,{person:l,sx:c},l.id))})},q=20,O=({type:a,shows:i,onSetActiveTab:o})=>{const e=i.length;return t(u,{title:r({type:"multiple",mediaType:"tv"}),subtitle:`${a==="liked"?"Liked":"Bookmarked"} a total of ${n(e).format({average:!0})} ${r({type:e===1?"single":"multiple",mediaType:"tv"})}`,footerLabel:`View all ${n(e).format({average:!0})} ${r({type:e===1?"single":"multiple",mediaType:"tv"})}`,isDisabled:e===0,onFooterClick:o?()=>o({mediaType:"tv"}):void 0,children:d(i).desc(({addedAt:l})=>l).filter((l,s)=>s<=q).map(({mediaItem:l})=>t(D,{show:l,sx:c},l.id))})},R=20,X=({type:a,collections:i,onSetActiveTab:o})=>{const e=i.length;return t(u,{title:r({type:"multiple",mediaType:"collection"}),subtitle:`${a==="liked"?"Liked":"Bookmarked"} a total of ${n(e).format({average:!0})} ${r({type:e===1?"single":"multiple",mediaType:"collection"})}`,footerLabel:`View all ${n(e).format({average:!0})} ${r({type:e===1?"single":"multiple",mediaType:"collection"})}`,isDisabled:e===0,onFooterClick:o?()=>o({mediaType:"collection"}):void 0,children:d(i).desc(({addedAt:l})=>l).filter((l,s)=>s<=R).map(({mediaItem:l})=>t(P,{collection:l,sx:c},l.id))})},Y=20,Z=({type:a,companies:i,onSetActiveTab:o})=>{const e=i.length;return t(u,{title:r({type:"multiple",mediaType:"company"}),subtitle:`${a==="liked"?"Liked":"Bookmarked"} a total of ${n(e).format({average:!0})} ${r({type:e===1?"single":"multiple",mediaType:"company"})}`,footerLabel:`View all ${n(e).format({average:!0})} ${r({type:e===1?"single":"multiple",mediaType:"company"})}`,isDisabled:e===0,onFooterClick:o?()=>o({mediaType:"company"}):void 0,children:d(i).desc(({addedAt:l})=>l).filter((l,s)=>s<=Y).map(({mediaItem:l})=>t(F,{company:l,sx:c},l.id))})},$e=({type:a,mediaItems:i,onSetActiveTab:o})=>{const{movie:e=[],tv:l=[],person:s=[],collection:y=[],company:m=[]}=i,{spacing:h}=z();return g(H,{width:"100%",spacing:h,children:[e.length>0&&t(p,{fallback:t(B,{}),children:t(K,{type:a,movies:e,onSetActiveTab:o})}),l.length>0&&t(p,{fallback:t(G,{}),children:t(O,{type:a,shows:l,onSetActiveTab:o})}),s.length>0&&t(p,{fallback:t(M,{}),children:t(U,{type:a,people:s,onSetActiveTab:o})}),y.length>0&&t(p,{fallback:t(_,{}),children:t(X,{type:a,collections:y,onSetActiveTab:o})}),m.length>0&&t(p,{fallback:t(A,{}),children:t(Z,{type:a,companies:m,onSetActiveTab:o})})]})};export{$e as default};
