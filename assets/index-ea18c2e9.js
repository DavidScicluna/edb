import{a7 as w,a9 as D,E as t,aQ as C,cl as J,x as b,aR as K,cm as k,bN as X,a8 as Y,af as Z,c9 as ee,ap as V,cn as $,co as te,c1 as c,a6 as a,ar as oe,aq as ae,N as F,ah as j,ao as N,L as ie,V as se,as as re,cp as ne,aV as le,cq as ce}from"./useUserTheme-cad0e91d.js";import{P as me,a as de,b as pe}from"./index-f91c493c.js";import{D as ue}from"./index-7571088f.js";import{d as ge}from"./formats-993363c7.js";import{V as he}from"./index-789eed9b.js";import{S as ye,F as ve,D as fe}from"./index-2f3ca69c.js";import{T as _e}from"./index-6fc29f67.js";import"./index-8754a0a6.js";import"./index-da6fdb45.js";import"./dimensions-1922ff5f.js";import"./index-490c57f0.js";import"./index-fac269b5.js";import"./index-86281d15.js";import"./index-65752566.js";import"./index-6c03e0d3.js";import"./index-566ac3e3.js";import"./index-059dc8bd.js";import"./index-67fb8a4b.js";import"./index-278c1566.js";import"./index-5e29d59e.js";import"./tabs-1769093c.js";import"./index-c7b185ee.js";import"./index-a6d2ef26.js";import"./index-6b3e9b0b.js";import"./tabs-8cea7072.js";import"./index-f93cc2e8.js";import"./SpinnerCircularFixed-2623c82b.js";const Te=({isDisabled:s=!1,onSort:l})=>{const r=w(),[i]=D(`(max-width: ${r.breakpoints.lg})`);return t(ye,{mediaType:"movie",renderButton:m=>t(C,{...m,isFullWidth:i,isDisabled:s,variant:"outlined",children:"Sort By"}),onSort:l})},Fe=({total:s,isDisabled:l=!1,onFilter:r})=>{const i=w(),[m]=D(`(max-width: ${i.breakpoints.lg})`);return t(ve,{mediaType:"movie",renderButton:d=>t(C,{...d,renderRight:s>0?({color:h,colorMode:v})=>t(_e,{color:h,colorMode:v,total:s}):void 0,isFullWidth:m,isDisabled:l,variant:"outlined",children:"Filter"}),onFilter:r})},Se=({total:s,onTagDelete:l,onClear:r})=>t(J,{in:s>0,style:{width:"100%"},children:t(fe,{mediaType:"movie",onTagDelete:l,onClear:r})}),be=b.lazy(()=>K(()=>import("./index-80fd72c6.js"),["assets/index-80fd72c6.js","assets/useUserTheme-cad0e91d.js","assets/useUserTheme-5f2d009e.css","assets/index-67fb8a4b.js","assets/index-566ac3e3.js"])),q=500,U={page:1},Q={sort_by:`${k.sortBy.value}.${k.direction}`},S={language:"en-US",ott_region:"US",certification_country:"US","primary_release_date.lte":X(new Date).format(ge)},Xe=()=>{const s=w(),{colorMode:l}=Y(),[r]=D(`(max-width: ${s.breakpoints.lg})`),{spacing:i}=Z(),m=ee(),[d,h]=b.useState(),v=V(d,"slow"),[I,O]=b.useState($({location,mediaType:"movie"})||0),f=V(I),B=te({props:{mediaType:"movie"},config:{params:{...c.parse(location.search)}},options:{enabled:!1,onSuccess:e=>{let o=[];e.pages.forEach(n=>{o=[...o,...(n==null?void 0:n.results)||[]]}),h({page:e.pages[e.pages.length-1].page||1,results:a.uniqBy([...o],"id"),total_pages:e.pages[e.pages.length-1].total_pages,total_results:e.pages[e.pages.length-1].total_results})}}}),{isFetchingNextPage:x,isFetching:M,isLoading:P,isError:E,refetch:R,fetchNextPage:A}=B,_=e=>{h(void 0),m({pathname:".",search:c.stringify({...e})}),setTimeout(R,q)},H=()=>{const e=a.omit({...c.parse(location.search)},"page"),o=a.merge({...e,page:((d==null?void 0:d.page)||1)+1});m({pathname:".",search:c.stringify({...o})}),setTimeout(()=>A(),q)},W=({sortBy:e,direction:o})=>{const n=a.omit({...c.parse(location.search)},"sort_by"),y={sort_by:`${e.value}.${o}`};_(a.merge({...n,...y}))},T=e=>{const{certifications:o,dates:n,genres:y,keywords:L,rating:p,count:u,runtime:g}=e,z=a.pick({...c.parse(location.search)},"sort_by"),G=a.omitBy(a.merge({...S,certification:o.length>0?o.join("|"):void 0,"primary_release_date.gte":n.gte||void 0,"primary_release_date.lte":n.lte||void 0,without_genres:y.length>0?ce({mediaType:"movie",genres:y}).join(","):void 0,with_keywords:L.length>0?L.join(","):void 0,"vote_average.gte":p.length>0&&p[0]?p[0]:void 0,"vote_average.lte":p.length>0&&p[1]?p[1]:void 0,"vote_count.gte":u.length>0&&u[0]?u[0]:void 0,"vote_count.lte":u.length>0&&u[1]?u[1]:void 0,"with_runtime.gte":g.length>0&&g[0]?g[0]:void 0,"with_runtime.lte":g.length>0&&g[1]?g[1]:void 0}),a.isNil||a.isEmpty);_(a.merge({...z,...G}))};return oe(()=>O($({location,mediaType:"movie"})||0),[location.search]),ae(()=>{const e=c.parse(location.search),o=location.search.length>0?{...U,...Q,...S,...e}:{...U,...Q,...S};_(a.merge({...o}))}),F(me,{children:[t(de,{renderTitle:e=>t(j,{...e,children:N({type:"multiple",mediaType:"movie"})}),renderSubtitle:e=>t(j,{...e,children:`A list containing all the ${N({type:"multiple",mediaType:"movie"})} that have been released or will be in the coming months.`}),actions:F(ie,{width:r?"100%":"auto",spacing:2,children:[t(Te,{isDisabled:x||M||P||E,onSort:W}),t(Fe,{total:f,isDisabled:x||M||P||E,onFilter:T}),t(ue,{})]}),direction:r?"column":"row",spacing:i,px:i,py:i*2}),t(pe,{p:i,children:F(se,{width:"100%",divider:f>0?t(re,{colorMode:l}):void 0,spacing:i,children:[t(Se,{total:f,onTagDelete:({filter:e,form:o})=>T({...o,[e]:ne[e]}),onClear:e=>T({...e})}),t(le,{fallback:t(he,{}),children:t(be,{query:B,movies:v,onLoadMore:H})})]})})]})};export{Xe as default};
