"use strict";(self.webpackChunkedb=self.webpackChunkedb||[]).push([[840],{82115:function(i,e,n){var o=n(94869),t=n(61895),s=n(41484),a=n(97417),l=n(8833),r=n(11428),d=n(66289),c=n(26429),u=n(72233),p=n(46937),x=n(47779),m=n(21319),g=n(82170),v=n(8771),f=(0,s.forwardRef)((function(i,e){var n=(0,r.Fg)(),s=(0,l.I0)(),f=(0,u.v9)((function(i){return i.app.ui.displayMode})),h=(0,u.v9)((function(i){return i.user.ui.theme.color})),b=(0,a.useIsFetching)(),j=(0,a.useIsMutating)(),y=(0,d.kt)(),Z=(0,t.Z)(y,2),w=Z[0],M=Z[1],L=(0,d.kt)(),S=(0,t.Z)(L,2),k=S[0],T=S[1],E=(0,d.kt)(),I=(0,t.Z)(E,2),z=I[0],D=I[1],F=(0,d.kt)(),V=(0,t.Z)(F,2),_=V[0],C=V[1];return(0,v.jsxs)(c.hE,(0,o.Z)((0,o.Z)({ref:e},i),{},{isAttached:!0,children:[(0,v.jsx)(m.Z,{"aria-label":"grid"===f?"Display is in Grid Mode (Tooltip)":"Set display mode to Grid Mode (Tooltip)",isDisabled:b>0||j>0,isOpen:w,placement:"top",label:"grid"===f?"Display is in Grid Mode":"Set display mode to Grid Mode",gutter:k?7:10,children:(0,v.jsx)(g.Z,{"aria-label":"grid"===f?"Display is in Grid Mode":"Set display mode to Grid Mode",color:"grid"===f?h:"gray",isDisabled:b>0||j>0,onClick:"grid"!==f?function(){return s((0,p.LV)("grid"))}:void 0,onMouseDown:function(){return T.on()},onMouseUp:function(){return T.off()},onMouseEnter:function(){return M.on()},onMouseLeave:function(){return M.off()},variant:"outlined",sx:{back:{borderRadius:"".concat(n.radii.base," 0 0 ").concat(n.radii.base)},front:{borderRadius:"".concat(n.radii.base," 0 0 ").concat(n.radii.base)}},children:(0,v.jsx)(x.Z,{icon:"grid_on",type:"grid"===f?"filled":"outlined"})})}),(0,v.jsx)(m.Z,{"aria-label":"list"===f?"Display is in List Mode (Tooltip)":"Set display mode to List Mode (Tooltip)",isDisabled:b>0||j>0,isOpen:z,placement:"top",label:"list"===f?"Display is in List Mode":"Set display mode to List Mode",gutter:_?7:10,children:(0,v.jsx)(g.Z,{"aria-label":"list"===f?"Display is in List Mode":"Set display mode to List Mode",color:"list"===f?h:"gray",isDisabled:b>0||j>0,onClick:"list"!==f?function(){return s((0,p.LV)("list"))}:void 0,onMouseDown:function(){return C.on()},onMouseUp:function(){return C.off()},onMouseEnter:function(){return D.on()},onMouseLeave:function(){return D.off()},variant:"outlined",sx:{back:{borderRadius:"0 ".concat(n.radii.base," ").concat(n.radii.base," 0")},front:{borderRadius:"0 ".concat(n.radii.base," ").concat(n.radii.base," 0")}},children:(0,v.jsx)(x.Z,{icon:"view_agenda",type:"list"===f?"filled":"outlined"})})})]}))}));e.Z=f},31249:function(i,e,n){n.d(e,{Z:function(){return G}});var o=n(61895),t=n(99818),s=n(7300),a=n(66289),l=n(20347),r=n(10514),d=n.n(r),c=n(1459),u=n(70699),p=n(8771),x=d().range(25,100,10),m=["16.5px","19.25px","22px","24.75px","27.5px","33px"],g=function(i){var e=(0,c.If)().colorMode,n=(0,s.Sx)({base:"xs",sm:"sm",md:"md",lg:"lg",xl:"xl","2xl":"2xl"}),o=i.description,t=i.isLoading,r=void 0!==t&&t,g=i.inView,v=void 0===g||g,f=(0,a.Bs)(d().sample(x)||100);return(0,p.jsx)(l.xu,{width:"100%",maxWidth:"100%",height:m,children:v?(0,p.jsx)(u.Z,{width:r?"".concat(f,"%"):"auto",fontSize:n,isLoaded:!r,children:(0,p.jsx)(l.xv,{align:"left",fontSize:n,fontWeight:"normal",color:"gray.".concat("light"===e?400:500),isTruncated:!0,overflow:"hidden",whiteSpace:"nowrap",children:o||"Poster Description"})}):null})},v=n(8833),f=n(11428),h=n(11557),b=n(72233),j=n(9238),y=n(89782),Z=n(74884),w=n(53133),M=n(33311),L=["100px","116px","152px","188px","188px","224px"],S=(0,j.pt)(),k=function(i){var e=(0,f.Fg)(),n=(0,s.ac)("(max-width: 960px)"),t=(0,o.Z)(n,1)[0],a=(0,v.I0)(),r=(0,b.v9)((function(i){return i.user.ui.theme.color})),c=i.mediaItem,u=i.mediaType,x=i.title,m=i.image,g=i.isFocused,k=void 0!==g&&g,T=i.isLoading,E=void 0===T||T,I=i.isHovering,z=void 0!==I&&I,D=i.inView,F=void 0!==D&&D,V=i.onMouseChange;return(0,p.jsx)(l.oM,{as:h.pT,in:F,width:L,borderRadius:"base",ratio:(0,j.lz)("portrait"),children:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(Z.Z,{borderRadius:"base",isLoaded:!E&&F,children:(0,p.jsx)(M.Z,{alt:(null===m||void 0===m?void 0:m.alt)||"",borderRadius:"base",boringType:(0,j.Qg)(u),thumbnailSrc:"".concat("https://image.tmdb.org/t/p","/").concat((null===m||void 0===m?void 0:m.size.thumbnail)||"").concat((null===m||void 0===m?void 0:m.src)||""),fullSrc:"".concat("https://image.tmdb.org/t/p","/").concat((null===m||void 0===m?void 0:m.size.full)||"").concat((null===m||void 0===m?void 0:m.src)||"")})}),t||d().isNil(c)||d().isEmpty(c)||S||"company"===u?null:(0,p.jsx)(h.MT,{in:(z||k)&&!E,unmountOnExit:!0,children:(0,p.jsx)(l.xu,{position:"absolute",bottom:e.space[1],width:"100%",onMouseEnter:function(){return V(!0)},onMouseLeave:function(){return V(!1)},px:1,children:(0,p.jsx)(y.Z,{color:r,isFullWidth:!0,onClick:function(i){i.preventDefault(),i.stopPropagation(),a((0,w.k0)({open:!0,mediaType:u,mediaItem:{id:(null===c||void 0===c?void 0:c.id)||-1,title:x}}))},size:"sm",children:"Quick view"})})})]})})},T=d().range(25,100,10),E=["16.5px","19.25px","22px","24.75px","27.5px","33px"],I=function(i){var e=(0,c.If)().colorMode,n=(0,s.Sx)({base:"xs",sm:"sm",md:"md",lg:"lg",xl:"xl","2xl":"2xl"}),o=i.subtitle,t=i.isLoading,r=void 0!==t&&t,x=i.inView,m=void 0===x||x,g=(0,a.Bs)(d().sample(T)||100);return(0,p.jsx)(l.xu,{width:"100%",maxWidth:"100%",height:E,children:m?(0,p.jsx)(u.Z,{width:r?"".concat(g,"%"):"auto",fontSize:n,isLoaded:!r,children:(0,p.jsx)(l.xv,{align:"left",fontSize:n,fontWeight:"normal",color:"gray.".concat("light"===e?400:500),isTruncated:!0,overflow:"hidden",whiteSpace:"nowrap",children:o||"Poster Subtitle"})}):null})},z=d().range(25,100,10),D=["19.25px","22px","24.75px","27.5px","33px","41.25px"],F=function(i){var e=(0,c.If)().colorMode,n=(0,s.Sx)({base:"sm",sm:"md",md:"lg",lg:"xl",xl:"2xl","2xl":"3xl"}),o=i.title,t=i.isLoading,r=void 0!==t&&t,x=i.inView,m=void 0===x||x,g=(0,a.Bs)(d().sample(z)||100);return(0,p.jsx)(l.xu,{width:"100%",maxWidth:"100%",height:D,children:m?(0,p.jsx)(u.Z,{width:r?"".concat(g,"%"):"auto",fontSize:n,isLoaded:!r,children:(0,p.jsx)(l.xv,{align:"left",fontSize:n,fontWeight:"semibold",color:"gray.".concat("light"===e?900:50),isTruncated:!0,overflow:"hidden",whiteSpace:"nowrap",children:o||"Poster Title"})}):null})},V=n(8126),_=n(56816),C=n(76830),W=n(33263),R=n(23403),N=n(55095),G=function(i){var e=(0,s.ac)("(max-width: 600px)"),n=(0,o.Z)(e,1)[0],r=(0,s.Sx)({base:"sm",sm:"md",md:"lg",lg:"xl",xl:"2xl","2xl":"3xl"}),c=(0,t.ZP)({threshold:[.2,.4,.6,.8,1],unobserveOnEnter:!0}),u=c.observe,x=c.inView,m=i.mediaItem,v=i.mediaType,f=i.image,h=i.rating,b=i.title,y=i.subtitle,Z=i.description,w=i.isLoading,M=void 0===w||w,L=(0,a.kt)(),S=(0,o.Z)(L,2),T=S[0],E=S[1],z=(0,a.kt)(),D=(0,o.Z)(z,2),G=D[0],O=D[1],P=(0,a.kt)(),B=(0,o.Z)(P,2),U=B[0],H=B[1];return(0,p.jsx)(_.Z,{isFullWidth:!0,isDisabled:M||U||"company"===v,to:"company"!==v?{pathname:"/".concat((0,j.OS)(v),"/").concat((null===m||void 0===m?void 0:m.id)||"")}:{},onFocus:function(){return E.on()},onBlur:function(){return E.off()},onMouseEnter:function(){return O.on()},onMouseLeave:function(){return O.off()},children:(0,p.jsx)(V.Z,{isFullWidth:!0,isDisabled:M,isClickable:"company"!==v,isFixed:U,isLight:!0,children:(0,p.jsxs)(l.Ug,{ref:u,width:"100%",position:"relative",spacing:[1,1,2,2,2,2],p:[1,1,2,2,2,2],children:[(0,p.jsx)(k,{mediaItem:m,mediaType:v,image:f,title:b,isFocused:T,isHovering:G,isLoading:M,inView:x,onMouseChange:function(i){i?H.on():H.off()}}),(0,p.jsxs)(l.gC,{width:["calc(100% - 108px)","calc(100% - 124px)","calc(100% - 168px)","calc(100% - 204px)","calc(100% - 204px)","calc(100% - 240px)"],alignItems:"flex-start",spacing:[M?2:1,M?2:1,M?4:2,M?4:2,M?4:2,M?4:2],children:["movie"!==v&&"tv"!==v||!h?null:(0,p.jsx)(C.Z,{count:null===h||void 0===h?void 0:h.count,inView:x,size:r,isLoading:M,children:null===h||void 0===h?void 0:h.rating}),(0,p.jsxs)(l.gC,{width:"100%",alignItems:"flex-start",spacing:[M?.5:.25,M?.5:.25,M?1:.5,M?1:.5,M?1:.5,M?1:.5],children:[(0,p.jsx)(F,{title:b,isLoading:M,inView:x}),!d().isNil(y)&&!d().isEmpty(y)||M?(0,p.jsx)(I,{subtitle:y,isLoading:M,inView:x}):null]}),!d().isNil(Z)&&!d().isEmpty(Z)||M?(0,p.jsx)(g,{description:Z,isLoading:M,inView:x}):null]}),(0,p.jsxs)(l.M5,{sx:{position:"absolute",top:1,right:1},children:["company"!==v?(0,p.jsx)(l.M5,{onMouseEnter:function(){return H.on()},onMouseLeave:function(){return H.off()},children:(0,p.jsx)(N.Z,{title:b,mediaType:v,mediaItem:m,isLoading:M,size:n?"md":"lg"})}):null,(0,p.jsx)(l.M5,{onMouseEnter:function(){return H.on()},onMouseLeave:function(){return H.off()},children:(0,p.jsx)(R.Z,{title:b,mediaType:v,mediaItem:m,isLoading:M,size:n?"md":"lg"})}),"movie"===v||"tv"===v?(0,p.jsx)(l.M5,{onMouseEnter:function(){return H.on()},onMouseLeave:function(){return H.off()},children:(0,p.jsx)(W.Z,{title:b,mediaType:v,mediaItem:m,isLoading:M,size:n?"md":"lg"})}):null]})]})})})}},21805:function(i,e,n){var o=n(10514),t=n.n(o),s=n(79829),a=n(88010),l=n(18978),r=n(35816),d=n(20742),c=n(8771);e.Z=function(i){var e=i.isError,n=void 0!==e&&e,o=i.isSuccess,u=void 0!==o&&o,p=i.isLoading,x=void 0===p||p,m=i.movies;return!x&&n?(0,c.jsx)(a.Z,{label:"Oh no! Something went wrong",description:"Failed to fetch movies list!",variant:"outlined"}):!x&&u&&m&&0===m.length?(0,c.jsx)(s.Z,{label:"Movies list is currently empty!",variant:"outlined"}):!x&&u&&m&&m.length>0?(0,c.jsx)(l.Z,{children:function(i){var e=i.displayMode;return m.map((function(i){return"list"===e?(0,c.jsx)(r.Z,{movie:i,isLoading:!1},i.id):(0,c.jsx)(d.Z,{movie:i,isLoading:!1},i.id)}))}}):(0,c.jsx)(l.Z,{children:function(i){var e=i.displayMode;return t().range(0,u&&m&&m.length>0?m.length:20).map((function(i,n){return"list"===e?(0,c.jsx)(r.Z,{isLoading:!0},n):(0,c.jsx)(d.Z,{isLoading:!0},n)}))}})}},35816:function(i,e,n){var o=n(94869),t=n(10514),s=n.n(t),a=n(9238),l=n(31249),r=n(8771);e.Z=function(i){var e=i.movie,n=i.isLoading,t=void 0===n||n,d=e||{},c=d.title,u=d.poster_path,p=d.vote_average,x=d.vote_count,m=d.overview,g=d.release_date,v=d.genre_ids;return(0,r.jsx)(l.Z,{mediaItem:e?(0,o.Z)({},e):void 0,mediaType:"movie",image:{alt:"".concat(c||""," movie poster"),src:u||"",size:{thumbnail:"w92",full:"original"}},rating:{rating:p||null,count:x||null},title:c||"",subtitle:"".concat(s().compact([s().isNil(g)||s().isEmpty(g)?void 0:"".concat((0,a.ok)(g||"","full")),s().isNil(v)||s().isEmpty(v)?void 0:"".concat((0,a.Fm)(v||[],"movie"))]).join(" \u2022 ")),description:m||"",isLoading:t})}},20742:function(i,e,n){var o=n(94869),t=n(10514),s=n.n(t),a=n(9238),l=n(7378),r=n(8771);e.Z=function(i){var e=i.movie,n=i.width,t=i.isLoading,d=void 0===t||t,c=e||{},u=c.title,p=c.poster_path,x=c.vote_average,m=c.release_date,g=c.genre_ids;return(0,r.jsx)(l.Z,{width:n||"100%",mediaItem:e?(0,o.Z)({},e):void 0,mediaType:"movie",image:{alt:"".concat(u||""," movie poster"),src:p||"",size:{thumbnail:"w92",full:"original"}},rating:x||null,title:u||"",subtitle:"".concat(s().compact([s().isNil(m)||s().isEmpty(m)?void 0:"".concat((0,a.ok)(m||"","year")," "),s().isNil(g)||s().isEmpty(g)?void 0:"".concat((0,a.Fm)(g||[],"movie"))]).join(" \u2022 ")),isLoading:d})}}}]);
//# sourceMappingURL=840.dff6c1b8.chunk.js.map