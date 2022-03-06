"use strict";(self.webpackChunkedb=self.webpackChunkedb||[]).push([[584],{33027:function(e,t,n){n.d(t,{Z:function(){return v},y:function(){return h}});var i=n(94869),o=n(20347),r=n(61895),a=n(11428),s=n(23890),c=n(72233),l=n(8126),u=n(8771),d=function(e){var t=(0,a.Fg)(),n=(0,c.v9)((function(e){return e.user.ui.theme.color})),i=(0,s.h4)(),d=(0,r.Z)(i,2),p=d[0],g=d[1].height,h=e.renderLeft,v=e.label,f=e.value,x=e.isActive,m=void 0!==x&&x,y=e.onClick;return(0,u.jsx)(l.Z,{ref:p,color:m?n:"gray",isFullWidth:!0,isClickable:!0,onClick:function(){return y(f)},p:4,sx:{back:{minWidth:"".concat(1.5*g,"px")}},children:(0,u.jsxs)(o.M5,{flexDirection:"column",children:[h({isActive:m,fontSize:t.fontSizes["4xl"]}),(0,u.jsx)(o.xv,{align:"center",fontSize:"xl",fontWeight:"semibold",textTransform:"uppercase",whiteSpace:"nowrap",children:v})]})})},p=n(47779),g=n(41484),h=[{renderLeft:function(e){var t=e.isActive,n=e.fontSize;return(0,u.jsx)(p.Z,{icon:"theaters",type:t?"filled":"outlined",fontSize:n})},label:"Movies",value:"movie"},{renderLeft:function(e){var t=e.isActive,n=e.fontSize;return(0,u.jsx)(p.Z,{icon:"tv",type:t?"filled":"outlined",fontSize:n})},label:"TV Shows",value:"tv"},{renderLeft:function(e){var t=e.isActive,n=e.fontSize;return(0,u.jsx)(p.Z,{icon:"people_alt",type:t?"filled":"outlined",fontSize:n})},label:"People",value:"person"},{renderLeft:function(e){var t=e.isActive,n=e.fontSize;return(0,u.jsx)(p.Z,{icon:"business",type:t?"filled":"outlined",fontSize:n})},label:"Companies",value:"company"},{renderLeft:function(e){var t=e.isActive,n=e.fontSize;return(0,u.jsx)(p.Z,{icon:"library_books",type:t?"filled":"outlined",fontSize:n})},label:"Collections",value:"collection"}],v=function(e){var t=e.mediaTypes,n=e.mediaType,r=e.onSetType,a=function(e){r(e)};return(0,u.jsx)(o.Ug,{width:"100%",wrap:"wrap",spacing:0,gap:2,children:h.map((function(e){return t&&t.includes(e.value)||!t?(0,u.jsx)(o.M5,{flex:1,children:(0,g.createElement)(d,(0,i.Z)((0,i.Z)({},e),{},{key:e.value,isActive:e.value===n,onClick:a}))}):null}))})}},24808:function(e,t,n){n.d(t,{Kz:function(){return g},oh:function(){return h}});var i=n(94869),o=n(11428),r=n(1459),a=n(75848),s=n(20347),c=n(10514),l=n.n(c),u=n(47690),d=n(9238),p=n(8771),g=function(e){switch(e){case"sm":return.5;case"lg":return 2;default:return 1}},h=function(e,t){switch(e){case"sm":return(0,d.d4)((0,d.Cy)(t.fontSizes.xs,"rem"))+2;case"lg":return(0,d.d4)((0,d.Cy)(t.fontSizes.md,"rem"))+3;default:return(0,d.d4)((0,d.Cy)(t.fontSizes.sm,"rem"))+2}};t.ZP=function(e){var t=(0,o.Fg)(),n=(0,r.If)().colorMode,c=e.label,d=e.color,v=void 0===d?"gray":d,f=e.renderLeft,x=e.renderRight,m=e.isDisabled,y=void 0!==m&&m,b=e.isFullWidth,Z=void 0!==b&&b,w=e.isOnlyTab,j=void 0!==w&&w,S=e.isSelected,T=void 0!==S&&S,_=e.size,L=void 0===_?"md":_,k=T&&!j,z=(0,u.Z)(t,{color:v,isFullWidth:Z,isOnlyTab:j,isSelected:k,size:L}),C=function(){return{width:"".concat(h(L,t),"px"),height:"".concat(h(L,t),"px"),color:v,isSelected:k,fontSize:t.fontSizes[L],size:"sm"===L?"xs":"md"===L?"sm":"md"}};return(0,p.jsx)(a.OK,{isDisabled:y,isSelected:k,sx:(0,i.Z)({},l().merge(z.tab.default,z.tab[L],z[n])),_disabled:(0,i.Z)({},l().merge(z.disabled)),children:(0,p.jsxs)(s.Ug,{width:"100%",alignItems:"inherit",justifyContent:"inherit",spacing:g(L),children:[f?f(C()):null,(0,p.jsx)(s.M5,{children:c}),x?x(C()):null]})})}},47690:function(e,t,n){var i=(0,n(9238).pt)();t.Z=function(e,t){var n=t.color,o=void 0===n?"gray":n,r=t.isFullWidth,a=void 0!==r&&r,s=t.isOnlyTab,c=void 0!==s&&s,l=t.isSelected,u=void 0!==l&&l,d=t.size,p=void 0===d?"md":d;return{tab:{default:{cursor:c?"default":"pointer",width:a?"100%":"auto",height:"100%",userSelect:"none",willChange:"auto",display:"flex",flexWrap:"nowrap",alignItems:"center",justifyContent:"center",fontWeight:"semibold",textTransform:"uppercase",whiteSpace:"nowrap",lineHeight:"normal",opacity:1,outline:i?"none !important":"0px auto",borderStyle:"solid",WebkitTapHighlightColor:"transparent",transition:"".concat(e.transition.duration.faster," ").concat(e.transition.easing["ease-out"]," !important"),"&:focus:not(:focus-visible)":{outline:i?"none !important":"0px auto"},"&:focus":{boxShadow:"none",outline:i?"none !important":"0px auto"},"&:active":{outline:i?"none !important":"0px auto"},"& .edb-icon":{transition:"".concat(e.transition.duration.faster," ").concat(e.transition.easing["ease-out"]," !important")}},sm:{fontSize:"xs",borderRadius:"sm",borderWidth:"1px",padding:c?0:"".concat(e.space[.5]," ").concat(e.space[1])},md:{fontSize:"sm",borderRadius:"base",borderWidth:"2px",padding:c?0:"".concat(e.space[1]," ").concat(e.space[2])},lg:{fontSize:"md",borderRadius:"lg",borderWidth:"2px",padding:c?0:"".concat(e.space[1.5]," ").concat(e.space[3])}},disabled:{cursor:"not-allowed",pointerEvents:"none",opacity:.5},light:{color:u?"gray.50":"gray.400",borderColor:u?"".concat(o,".").concat("gray"===o?400:500):"transparent",backgroundColor:u?"".concat(o,".").concat("gray"===o?400:500):"transparent","& .edb-icon":{color:u?"gray.50":"gray.400"},"&:hover":{color:u?"gray.50":"gray.".concat(c?400:500),borderColor:u?"".concat(o,".").concat("gray"===o?500:600):"transparent",backgroundColor:u?"".concat(o,".").concat("gray"===o?500:600):"transparent","& .edb-icon":{color:u?"gray.50":"gray.500"}},"&:focus-visible":{outline:i?"none":"".concat("sm"===p?1:2,"px auto ").concat(e.colors[o]["gray"===o?400:500]),outlineOffset:i?0:"".concat("sm"===p?2:"md"===p?3:4,"px")}},dark:{color:u?"gray.900":"gray.500",borderColor:u?"".concat(o,".").concat("gray"===o?500:400):"transparent",backgroundColor:u?"".concat(o,".").concat("gray"===o?500:400):"transparent","& .edb-icon":{color:u?"gray.900":"gray.500"},"&:hover":{color:u?"gray.900":"gray.".concat(c?500:400),borderColor:u?"".concat(o,".").concat("gray"===o?400:300):"transparent",backgroundColor:u?"".concat(o,".").concat("gray"===o?400:300):"transparent","& .edb-icon":{color:u?"gray.900":"gray.400"}},"&:focus-visible":{outline:i?"none":"".concat("sm"===p?1:2,"px auto ").concat(e.colors[o]["gray"===o?500:400]),outlineOffset:i?0:"".concat("sm"===p?2:"md"===p?3:4,"px")}}}}},27590:function(e,t,n){var i=n(94869),o=n(41484),r=n(75848),a=n(24808),s=n(23698),c=n(35639),l=n(8771);t.Z=function(e){var t=(0,o.useContext)(s.R).activeTab,n=e.children,u=void 0===n?[]:n,d=e.color,p=void 0===d?"gray":d,g=e.isActiveForced,h=void 0!==g&&g,v=e.size,f=void 0===v?"md":v;return(0,l.jsx)(r.td,{width:"100%",height:"100%",children:(0,l.jsx)(c.Z,{children:u.map((function(e,n){return(0,o.createElement)(a.ZP,(0,i.Z)((0,i.Z)({},e),{},{key:n,color:p,isOnlyTab:!h&&1===u.length,isSelected:t===n,size:f}))}))})})}},26668:function(e,t,n){var i=n(41484),o=n(75848),r=n(20347),a=n(11557),s=n(10731),c=n(23698),l=n(8771);t.Z=function(e){var t=e.children,n=(0,i.useContext)(c.R).activeTab,u=void 0===n?0:n;return(0,l.jsx)(o.nP,{as:s.M,width:"100%",exitBeforeEnter:!0,initial:!1,children:t.map((function(e,t){return(0,l.jsx)(o.x4,{width:"100%",p:0,children:(0,l.jsx)(r.xu,{as:a.pT,in:u===t,width:"100%",unmountOnExit:!0,children:e})},"tab_panel_".concat(t))}))})}},23698:function(e,t,n){n.d(t,{R:function(){return l}});var i=n(94869),o=n(55550),r=n(41484),a=n(75848),s=n(8771),c=["children","activeTab"],l=(0,r.createContext)({activeTab:-1}),u=(0,r.forwardRef)((function(e,t){var n=e.children,r=e.activeTab,u=void 0===r?-1:r,d=(0,o.Z)(e,c);return(0,s.jsx)(a.mQ,(0,i.Z)((0,i.Z)({},d),{},{ref:t,width:"100%",maxWidth:"100%",activeTab:u,index:u,isLazy:!0,lazyBehavior:"unmount",variant:"unstyled",children:(0,s.jsx)(l.Provider,{value:{activeTab:u},children:n})}))}));t.Z=u},44492:function(e,t,n){n.d(t,{Z:function(){return f}});var i=n(10514),o=n.n(i),r=n(13719),a=n(56313),s=n(18978),c=n(43583),l=n(94869),u=n(48831),d=n.n(u),p=n(31249),g=n(8771),h=function(e){var t=e.person,n=e.isLoading,i=void 0===n||n,o=t||{},r=o.name,a=o.profile_path,s=o.known_for,u=o.known_for_department;return(0,g.jsx)(p.Z,{mediaItem:t?(0,l.Z)({},t):void 0,mediaType:"person",image:{alt:"".concat(r||""," person poster"),src:a||"",size:{thumbnail:"w45",full:"original"}},title:r||"",subtitle:u||"",description:d()((0,c.Z)(s||[]),"popularity",{reverse:!0}).map((function(e){return e.title||e.name||void 0})).join(" \u2022 "),isLoading:i})},v=n(70461),f=function(e){var t=e.isError,n=void 0!==t&&t,i=e.isSuccess,c=void 0!==i&&i,l=e.isLoading,u=void 0===l||l,d=e.people;return!u&&n?(0,g.jsx)(a.Z,{label:"Oh no! Something went wrong",description:"Failed to fetch people list!",variant:"outlined"}):!u&&c&&d&&0===d.length?(0,g.jsx)(r.Z,{label:"People list is currently empty!",variant:"outlined"}):!u&&c&&d&&d.length>0?(0,g.jsx)(s.Z,{children:function(e){var t=e.displayMode;return d.map((function(e){return"list"===t?(0,g.jsx)(h,{person:e,isLoading:!1},e.id):(0,g.jsx)(v.Z,{person:e,isLoading:!1},e.id)}))}}):(0,g.jsx)(s.Z,{children:function(e){var t=e.displayMode;return o().range(0,c&&d&&d.length>0?d.length:20).map((function(e,n){return"list"===t?(0,g.jsx)(h,{isLoading:!0},n):(0,g.jsx)(v.Z,{isLoading:!0},n)}))}})}},70461:function(e,t,n){var i=n(94869),o=n(7378),r=n(8771);t.Z=function(e){var t=e.person,n=e.width,a=e.isLoading,s=void 0===a||a,c=t||{},l=c.name,u=c.profile_path,d=c.known_for_department;return(0,r.jsx)(o.Z,{width:n||"100%",mediaItem:t?(0,i.Z)({},t):void 0,mediaType:"person",image:{alt:"".concat(l||""," person poster"),src:u||"",size:{thumbnail:"w45",full:"original"}},title:l||"",subtitle:d||"",isLoading:s})}},76915:function(e,t,n){var i=n(10514),o=n.n(i),r=n(13719),a=n(56313),s=n(18978),c=n(2991),l=n(29256),u=n(8771);t.Z=function(e){var t=e.isError,n=void 0!==t&&t,i=e.isSuccess,d=void 0!==i&&i,p=e.isLoading,g=void 0===p||p,h=e.shows;return!g&&n?(0,u.jsx)(a.Z,{label:"Oh no! Something went wrong",description:"Failed to fetch TV Shows list!",variant:"outlined"}):!g&&d&&h&&0===h.length?(0,u.jsx)(r.Z,{label:"TV Shows list is currently empty!",variant:"outlined"}):!g&&d&&h&&h.length>0?(0,u.jsx)(s.Z,{children:function(e){var t=e.displayMode;return h.map((function(e){return"list"===t?(0,u.jsx)(c.Z,{show:e,isLoading:!1},e.id):(0,u.jsx)(l.Z,{show:e,isLoading:!1},e.id)}))}}):(0,u.jsx)(s.Z,{children:function(e){var t=e.displayMode;return o().range(0,d&&h&&h.length>0?h.length:20).map((function(e,n){return"list"===t?(0,u.jsx)(c.Z,{isLoading:!0},n):(0,u.jsx)(l.Z,{isLoading:!0},n)}))}})}},2991:function(e,t,n){var i=n(94869),o=n(10514),r=n.n(o),a=n(9238),s=n(31249),c=n(8771);t.Z=function(e){var t=e.show,n=e.isLoading,o=void 0===n||n,l=t||{},u=l.name,d=l.poster_path,p=l.vote_average,g=l.vote_count,h=l.first_air_date,v=l.genre_ids,f=l.overview;return(0,c.jsx)(s.Z,{mediaItem:t?(0,i.Z)({},t):void 0,mediaType:"tv",image:{alt:"".concat(u||""," tv show poster"),src:d||"",size:{thumbnail:"w92",full:"original"}},rating:{rating:p||null,count:g||null},title:u||"",subtitle:"".concat(r().compact([r().isNil(h)||r().isEmpty(h)?void 0:"".concat((0,a.ok)(h||"","full")),r().isNil(v)||r().isEmpty(v)?void 0:"".concat((0,a.Fm)(v||[],"tv"))]).join(" \u2022 ")),description:f||"",isLoading:o})}},29256:function(e,t,n){var i=n(94869),o=n(10514),r=n.n(o),a=n(9238),s=n(7378),c=n(8771);t.Z=function(e){var t=e.show,n=e.width,o=e.isLoading,l=void 0===o||o,u=t||{},d=u.name,p=u.poster_path,g=u.vote_average,h=u.first_air_date,v=u.genre_ids;return(0,c.jsx)(s.Z,{width:n||"100%",mediaItem:t?(0,i.Z)({},t):void 0,mediaType:"tv",image:{alt:"".concat(d||""," tv show poster"),src:p||"",size:{thumbnail:"w92",full:"original"}},rating:g||null,title:d||"",subtitle:"".concat(r().compact([r().isNil(h)||r().isEmpty(h)?void 0:"".concat((0,a.ok)(h||"","year")),r().isNil(v)||r().isEmpty(v)?void 0:"".concat((0,a.Fm)(v||[],"tv"))]).join(" \u2022 ")),isLoading:l})}},13584:function(e,t,n){n.r(t),n.d(t,{default:function(){return R}});var i=n(43583),o=n(26664),r=n(61895),a=n(75231),s=n.n(a),c=n(41484),l=n(97417),u=n(86617),d=n(20347),p=n(11557),g=n(14539),h=n.n(g),v=n(10731),f=n(10514),x=n.n(f),m=n(23890),y=n(72233),b=n(82115),Z=n(54077),w=n(47779),j=n(27590),S=n(8771),T=function(e){var t=e.activeTab,n=(0,y.v9)((function(e){return e.user.ui.theme.color})),i=(0,m.h4)(),o=(0,r.Z)(i,2),a=o[0],s=o[1],c=s.width,l=s.height;return(0,S.jsxs)(d.Ug,{width:"100%",minHeight:"43px",maxHeight:"43px",spacing:2,divider:x().isNil(t)?void 0:(0,S.jsx)(Z.Z,{orientation:"vertical",height:"".concat(l,"px"),mx:2}),children:[(0,S.jsx)(d.M5,{width:"calc(100% - ".concat(x().isNil(t)?0:c+34,"px)"),children:(0,S.jsx)(j.Z,{color:n,size:"lg",children:[{label:"Movies",renderLeft:function(e){var t=e.isSelected,n=e.width,i=e.height;return(0,S.jsx)(w.Z,{icon:"theaters",type:t?"filled":"outlined",width:n,height:i})}},{label:"TV Shows",renderLeft:function(e){var t=e.isSelected,n=e.width,i=e.height;return(0,S.jsx)(w.Z,{icon:"tv",type:t?"filled":"outlined",width:n,height:i})}},{label:"People",renderLeft:function(e){var t=e.isSelected,n=e.width,i=e.height;return(0,S.jsx)(w.Z,{icon:"people_alt",type:t?"filled":"outlined",width:n,height:i})}}]})}),(0,S.jsx)(p.pT,{in:!x().isNil(t),unmountOnExit:!0,children:(0,S.jsx)(b.Z,{ref:a})})]})},_=n(13719),L=n(33027),k=function(e){var t=e.onSelected;return(0,S.jsx)(_.Z,{button:(0,S.jsx)(L.Z,{mediaTypes:["movie","tv","person"],onSetType:function(e){return t(L.y.findIndex((function(t){return e===t.value})))}}),hasIllustration:!1,label:"Select Media-Type",description:"Select the Media-Type list that you would prefer to view",size:"xl",variant:"outlined"})},z=n(7300),C=n(96981),P=n(21805),E=function(e){var t,n=e.movies,i=e.query,o=(0,z.ac)("(max-width: 600px)"),a=(0,r.Z)(o,1)[0];return(0,S.jsxs)(d.gC,{width:"100%",spacing:4,children:[(0,S.jsx)(P.Z,{isError:i.isError,isSuccess:i.isSuccess,isLoading:i.isFetching||i.isLoading,movies:(null===n||void 0===n?void 0:n.results)||[]}),(0,S.jsx)(d.xu,{style:{width:a?"100%":"auto"},children:(0,S.jsx)(C.Z,{amount:(null===n||void 0===n||null===(t=n.results)||void 0===t?void 0:t.length)||0,total:(null===n||void 0===n?void 0:n.total_results)||0,label:"Trending Movies",isLoading:i.isFetching||i.isLoading,isButtonVisible:i.hasNextPage&&!i.isError,onClick:function(){return i.fetchNextPage()}})})]})},M=n(44492),F=function(e){var t,n=e.people,i=e.query,o=(0,z.ac)("(max-width: 600px)"),a=(0,r.Z)(o,1)[0];return(0,S.jsxs)(d.gC,{width:"100%",spacing:4,children:[(0,S.jsx)(M.Z,{isError:i.isError,isSuccess:i.isSuccess,isLoading:i.isFetching||i.isLoading,people:(null===n||void 0===n?void 0:n.results)||[]}),(0,S.jsx)(d.xu,{style:{width:a?"100%":"auto"},children:(0,S.jsx)(C.Z,{amount:(null===n||void 0===n||null===(t=n.results)||void 0===t?void 0:t.length)||0,total:(null===n||void 0===n?void 0:n.total_results)||0,label:"Trending People",isLoading:i.isFetching||i.isLoading,isButtonVisible:i.hasNextPage&&!i.isError,onClick:function(){return i.fetchNextPage()}})})]})},N=n(76915),O=function(e){var t,n=e.shows,i=e.query,o=(0,z.ac)("(max-width: 600px)"),a=(0,r.Z)(o,1)[0];return(0,S.jsxs)(d.gC,{width:"100%",spacing:4,children:[(0,S.jsx)(N.Z,{isError:i.isError,isSuccess:i.isSuccess,isLoading:i.isFetching||i.isLoading,shows:(null===n||void 0===n?void 0:n.results)||[]}),(0,S.jsx)(d.xu,{style:{width:a?"100%":"auto"},children:(0,S.jsx)(C.Z,{amount:(null===n||void 0===n||null===(t=n.results)||void 0===t?void 0:t.length)||0,total:(null===n||void 0===n?void 0:n.total_results)||0,label:"Trending TV Shows",isLoading:i.isFetching||i.isLoading,isButtonVisible:i.hasNextPage&&!i.isError,onClick:function(){return i.fetchNextPage()}})})]})},W=n(50762),I=n(23698),q=n(26668),A=n(87929),B=["movie","tv","person","company","collection"],R=function(){var e=h().CancelToken.source(),t=(0,u.TH)(),n=(0,u.s0)(),a=(0,c.useState)(),g=(0,r.Z)(a,2),f=g[0],m=g[1],y=(0,c.useState)(),b=(0,r.Z)(y,2),w=b[0],j=b[1],_=(0,c.useState)(),L=(0,r.Z)(_,2),z=L[0],C=L[1],P=(0,c.useState)(),M=(0,r.Z)(P,2),N=M[0],R=M[1],V=(0,l.useInfiniteQuery)("trending-movies",function(){var t=(0,o.Z)(s().mark((function t(n){var i,o,r,a;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=n.pageParam,o=void 0===i?1:i,t.next=3,W.Z.get("/trending/movie/day",{params:{page:o},cancelToken:e.token}).then((function(e){return(0,W.t)(2500,e)}));case 3:return r=t.sent,a=r.data,t.abrupt("return",a);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),{enabled:0===f,getPreviousPageParam:function(e){return 1!==e.page&&((null===e||void 0===e?void 0:e.page)||0)-1},getNextPageParam:function(e){return e.page!==e.total_pages&&((null===e||void 0===e?void 0:e.page)||0)+1},onSuccess:function(e){var t=[];e.pages.forEach((function(e){t=[].concat((0,i.Z)(t),(0,i.Z)((null===e||void 0===e?void 0:e.results)||[]))})),j({page:e.pages[e.pages.length-1].page,results:(0,i.Z)(x().uniqBy(t,"id")),total_pages:e.pages[e.pages.length-1].total_pages,total_results:e.pages[e.pages.length-1].total_results})}}),H=(0,l.useInfiniteQuery)("trending-tv-shows",function(){var t=(0,o.Z)(s().mark((function t(n){var i,o,r,a;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=n.pageParam,o=void 0===i?1:i,t.next=3,W.Z.get("/trending/tv/day",{params:{page:o},cancelToken:e.token}).then((function(e){return(0,W.t)(2500,e)}));case 3:return r=t.sent,a=r.data,t.abrupt("return",a);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),{enabled:1===f,getPreviousPageParam:function(e){return 1!==e.page&&((null===e||void 0===e?void 0:e.page)||0)-1},getNextPageParam:function(e){return e.page!==e.total_pages&&((null===e||void 0===e?void 0:e.page)||0)+1},onSuccess:function(e){var t=[];e.pages.forEach((function(e){t=[].concat((0,i.Z)(t),(0,i.Z)(e.results||[]))})),C({page:e.pages[e.pages.length-1].page,results:(0,i.Z)(x().uniqBy(t,"id")),total_pages:e.pages[e.pages.length-1].total_pages,total_results:e.pages[e.pages.length-1].total_results})}}),Q=(0,l.useInfiniteQuery)("trending-people",function(){var t=(0,o.Z)(s().mark((function t(n){var i,o,r,a;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=n.pageParam,o=void 0===i?1:i,t.next=3,W.Z.get("/trending/person/week",{params:{page:o},cancelToken:e.token}).then((function(e){return(0,W.t)(2500,e)}));case 3:return r=t.sent,a=r.data,t.abrupt("return",a);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),{enabled:2===f,getPreviousPageParam:function(e){return 1!==e.page&&((null===e||void 0===e?void 0:e.page)||0)-1},getNextPageParam:function(e){return e.page!==e.total_pages&&((null===e||void 0===e?void 0:e.page)||0)+1},onSuccess:function(e){var t=[];e.pages.forEach((function(e){t=[].concat((0,i.Z)(t),(0,i.Z)((null===e||void 0===e?void 0:e.results)||[]))})),R({page:e.pages[e.pages.length-1].page,results:(0,i.Z)(x().uniqBy(t,"id")),total_pages:e.pages[e.pages.length-1].total_pages,total_results:e.pages[e.pages.length-1].total_results})}});return(0,c.useEffect)((function(){"/trending"===t.pathname&&function(){switch(t.hash.replace("#","")){case"movie":return void m(0);case"tv":return void m(1);case"person":return void m(2);default:m(void 0)}}()}),[t.hash]),(0,c.useEffect)((function(){return function(){return e.cancel()}}),[]),(0,S.jsx)(A.Z,{title:"Trending",children:{body:(0,S.jsx)(I.Z,{activeTab:f,onChange:function(e){return n({pathname:".",hash:B[e]})},children:(0,S.jsxs)(d.gC,{width:"100%",divider:(0,S.jsx)(Z.Z,{orientation:"horizontal"}),spacing:2,p:2,children:[(0,S.jsx)(T,{activeTab:f}),(0,S.jsx)(v.M,{exitBeforeEnter:!0,initial:!1,children:x().isNil(f)?(0,S.jsx)(d.M5,{as:p.pT,width:"100%",in:!0,unmountOnExit:!0,children:(0,S.jsx)(k,{onSelected:function(e){return n({pathname:".",hash:B[e]})}})},"media-types-picker"):(0,S.jsx)(d.M5,{as:p.pT,width:"100%",in:!0,unmountOnExit:!0,children:(0,S.jsxs)(q.Z,{children:[(0,S.jsx)(E,{movies:w,query:V}),(0,S.jsx)(O,{shows:z,query:H}),(0,S.jsx)(F,{people:N,query:Q})]})},"list-tab-panels")})]})})}})}}}]);
//# sourceMappingURL=584.eb93896d.chunk.js.map