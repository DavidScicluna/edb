import{a8 as T,af as g,N as v,V as x,E as e,as as b,aC as L,ao as r,ah as m}from"./useUserTheme-cad0e91d.js";import{u as M}from"./useMovieContext-b3bd3057.js";import{D as S}from"./index-7571088f.js";import{T as E}from"./index-6fc29f67.js";import{V}from"./index-233a8912.js";import"./index-f7f2345e.js";import"./index-da6fdb45.js";import"./index-f91c493c.js";import"./index-65752566.js";import"./index-cc453732.js";import"./index-21c2c4e5.js";import"./index-5e29d59e.js";import"./index-43080e55.js";import"./formats-993363c7.js";import"./tabs-8cea7072.js";import"./index-c7b185ee.js";import"./dimensions-1922ff5f.js";import"./index-566ac3e3.js";import"./index-6c03e0d3.js";import"./index-67fb8a4b.js";import"./index-490c57f0.js";import"./index-278c1566.js";import"./user-1d41ba74.js";import"./index-d96d68db.js";const Z=()=>{const{color:p,colorMode:s}=T(),{spacing:o}=g(),{movieQuery:n,creditsQuery:d}=M(),{data:c}=n||{},{title:t}=c||{},{data:l,isFetching:h,isLoading:f,isError:u,isSuccess:y,refetch:C}=d||{},{cast:a=[]}=l||{};return v(x,{width:"100%",divider:e(b,{colorMode:s}),spacing:o,children:[e(L,{width:"100%",renderCaption:()=>e(E,{color:p,colorMode:s,prefix:`${t||r({type:"single",mediaType:"movie"})} has a total of`,suffix:"Cast Members",total:a.length}),renderTitle:i=>e(m,{...i,children:"Cast"}),renderSubtitle:i=>e(m,{...i,children:`This Tab contains all the ${r({type:"multiple",mediaType:"person"})} that made an appearance in ${t||`the ${r({type:"single",mediaType:"movie"})}`}`}),renderRight:()=>e(S,{}),py:o*2}),e(V,{mediaType:"movie",cast:a,name:t,isLoading:h||f,isError:u,isSuccess:y,refetch:C})]})};export{Z as default};
