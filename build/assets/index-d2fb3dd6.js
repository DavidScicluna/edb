import{a6 as T,x as b,ap as x,aL as V,E as o,ao as y,af as E,N as Q,V as $}from"./useUserTheme-cad0e91d.js";import{P as k}from"./index-f93cc2e8.js";import{D as M}from"./index-da6fdb45.js";import{u as F}from"./usePersonContext-c044aaaa.js";import{o as D,p as I,c as K,d as _,e as O}from"./index-8754a0a6.js";import{V as j}from"./index-6a4e7d59.js";import{V as z}from"./index-6409f3e0.js";import"./index-f91c493c.js";import"./index-9acd05c5.js";import"./index-6fc29f67.js";import"./index-cc453732.js";import"./index-65752566.js";import"./user-1d41ba74.js";import"./index-490c57f0.js";import"./index-d96d68db.js";import"./dimensions-1922ff5f.js";import"./index-fac269b5.js";import"./index-86281d15.js";import"./index-3c387dce.js";import"./index-c20f4d73.js";const P=T.memoize(i=>{switch(i){case"credits":return K;case"photos":return I;case"overview":default:return D}}),A=()=>{const{personQuery:i,imagesQuery:d,onSetActiveTab:m}=F(),{data:p}=i||{},{name:s,gender:e}=p||{},{data:h,isFetching:g,isLoading:n,isError:u,isSuccess:l}=d||{},{profiles:t=[]}=h||{},[a,w]=b.useState([]),c=x(a,"slow"),C=V(T.range(10).map(()=>({orientation:"portrait"})));return b.useEffect(()=>{c.length===0&&t.length>0&&w(T.shuffle(t.filter((v,f)=>f<10).map(v=>({image:v,orientation:"portrait"}))))},[t]),o(j,{mediaType:"person",photos:[...c],dummyPhotos:[...C],title:"Photos",subtitle:`This list is showcasing some of the photos that ${s||`the ${y({type:"single",mediaType:"person"})}`} has taken throughout ${e===1?"her":e===2?"his":"their"} career`,emptyLabel:s?`${s} photos`:"Photos",total:t.length,isLoading:g||n,isError:u,isSuccess:l,onFooterClick:()=>m({index:P("photos")})})},B=()=>{const{personQuery:i,movieCreditsQuery:d,tvShowCreditsQuery:m,onSetActiveTab:p}=F(),{data:s}=i||{},{name:e}=s||{},{data:h,isFetching:g,isLoading:n,isError:u,isSuccess:l}=d||{},{cast:t=[],crew:a=[]}=h||{},{data:w,isFetching:c,isLoading:C,isError:v,isSuccess:f}=m||{},{cast:S=[],crew:L=[]}=w||{};return o(z,{credits:{cast:[...t.map(r=>({...r,media_type:"movie"})),...S.map(r=>({...r,media_type:"tv"}))],crew:[...a.map(r=>({...r,media_type:"movie"})),...L.map(r=>({...r,media_type:"tv"}))]},title:"Known For",subtitle:`This list is showcasing all the ${y({type:"multiple",mediaType:"movie"})} & ${y({type:"multiple",mediaType:"tv"})} that ${e||`the ${y({type:"single",mediaType:"person"})}`} is most known for`,emptyLabel:e?`${e} known for credits`:"Known for credits",total:t.length+a.length+S.length+L.length,isFetching:g||c,isLoading:n||C,isError:u&&v,isSuccess:l&&f,onFooterClick:()=>p({index:P("credits")})})},de=()=>{const{spacing:i}=E(),{personQuery:d,movieCreditsQuery:m,tvShowCreditsQuery:p,imagesQuery:s}=F(),{data:e,isFetching:h,isLoading:g}=d||{},{biography:n}=e||{},{isFetching:u,isLoading:l}=m||{},{isFetching:t,isLoading:a}=p||{},{isFetching:w,isLoading:c}=s||{};return Q($,{width:"100%",spacing:i,children:[h||g?o(M,{}):n?o(k,{title:"Biography",keepFooter:!0,children:n}):null,u||l||t||a?o(_,{}):o(B,{}),w||c?o(O,{}):o(A,{})]})};export{de as default};
