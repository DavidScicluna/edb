"use strict";(self.webpackChunkedb=self.webpackChunkedb||[]).push([[352],{31249:function(i,e,n){n.d(e,{Z:function(){return O}});var t=n(61895),o=n(99818),a=n(7300),r=n(66289),s=n(20347),l=n(10514),d=n.n(l),c=n(1459),u=n(70699),v=n(8771),g=d().range(25,100,10),h=["16.5px","19.25px","22px","24.75px","27.5px","33px"],p=function(i){var e=(0,c.If)().colorMode,n=(0,a.Sx)({base:"xs",sm:"sm",md:"md",lg:"lg",xl:"xl","2xl":"2xl"}),t=i.description,o=i.isLoading,l=void 0!==o&&o,p=i.inView,m=void 0===p||p,x=(0,r.Bs)(d().sample(g)||100);return(0,v.jsx)(s.xu,{width:"100%",maxWidth:"100%",height:h,children:m?(0,v.jsx)(u.Z,{width:l?"".concat(x,"%"):"auto",fontSize:n,isLoaded:!l,children:(0,v.jsx)(s.xv,{align:"left",fontSize:n,fontWeight:"normal",color:"gray.".concat("light"===e?400:500),isTruncated:!0,overflow:"hidden",whiteSpace:"nowrap",children:t||"Poster Description"})}):null})},m=n(8833),x=n(11428),f=n(11557),w=n(72233),b=n(9238),j=n(89782),Z=n(74884),L=n(53133),y=n(33311),S=["100px","116px","152px","188px","188px","224px"],k=(0,b.pt)(),E=function(i){var e=(0,x.Fg)(),n=(0,a.ac)("(max-width: 960px)"),o=(0,t.Z)(n,1)[0],r=(0,m.I0)(),l=(0,w.v9)((function(i){return i.user.ui.theme.color})),c=i.mediaItem,u=i.mediaType,g=i.title,h=i.image,p=i.isFocused,E=void 0!==p&&p,T=i.isLoading,F=void 0===T||T,_=i.isHovering,z=void 0!==_&&_,C=i.inView,D=void 0!==C&&C,M=i.onMouseChange;return(0,v.jsx)(s.oM,{as:f.pT,in:D,width:S,borderRadius:"base",ratio:(0,b.lz)("portrait"),children:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(Z.Z,{borderRadius:"base",isLoaded:!F&&D,children:(0,v.jsx)(y.Z,{alt:(null===h||void 0===h?void 0:h.alt)||"",borderRadius:"base",boringType:(0,b.Qg)(u),thumbnailSrc:"".concat("https://image.tmdb.org/t/p","/").concat((null===h||void 0===h?void 0:h.size.thumbnail)||"").concat((null===h||void 0===h?void 0:h.src)||""),fullSrc:"".concat("https://image.tmdb.org/t/p","/").concat((null===h||void 0===h?void 0:h.size.full)||"").concat((null===h||void 0===h?void 0:h.src)||"")})}),o||d().isNil(c)||d().isEmpty(c)||k||"company"===u?null:(0,v.jsx)(f.MT,{in:(z||E)&&!F,unmountOnExit:!0,children:(0,v.jsx)(s.xu,{position:"absolute",bottom:e.space[1],width:"100%",onMouseEnter:function(){return M(!0)},onMouseLeave:function(){return M(!1)},px:1,children:(0,v.jsx)(j.Z,{color:l,isFullWidth:!0,onClick:function(i){i.preventDefault(),i.stopPropagation(),r((0,L.k0)({open:!0,mediaType:u,mediaItem:{id:(null===c||void 0===c?void 0:c.id)||-1,title:g}}))},size:"sm",children:"Quick view"})})})]})})},T=d().range(25,100,10),F=["16.5px","19.25px","22px","24.75px","27.5px","33px"],_=function(i){var e=(0,c.If)().colorMode,n=(0,a.Sx)({base:"xs",sm:"sm",md:"md",lg:"lg",xl:"xl","2xl":"2xl"}),t=i.subtitle,o=i.isLoading,l=void 0!==o&&o,g=i.inView,h=void 0===g||g,p=(0,r.Bs)(d().sample(T)||100);return(0,v.jsx)(s.xu,{width:"100%",maxWidth:"100%",height:F,children:h?(0,v.jsx)(u.Z,{width:l?"".concat(p,"%"):"auto",fontSize:n,isLoaded:!l,children:(0,v.jsx)(s.xv,{align:"left",fontSize:n,fontWeight:"normal",color:"gray.".concat("light"===e?400:500),isTruncated:!0,overflow:"hidden",whiteSpace:"nowrap",children:t||"Poster Subtitle"})}):null})},z=d().range(25,100,10),C=["19.25px","22px","24.75px","27.5px","33px","41.25px"],D=function(i){var e=(0,c.If)().colorMode,n=(0,a.Sx)({base:"sm",sm:"md",md:"lg",lg:"xl",xl:"2xl","2xl":"3xl"}),t=i.title,o=i.isLoading,l=void 0!==o&&o,g=i.inView,h=void 0===g||g,p=(0,r.Bs)(d().sample(z)||100);return(0,v.jsx)(s.xu,{width:"100%",maxWidth:"100%",height:C,children:h?(0,v.jsx)(u.Z,{width:l?"".concat(p,"%"):"auto",fontSize:n,isLoaded:!l,children:(0,v.jsx)(s.xv,{align:"left",fontSize:n,fontWeight:"semibold",color:"gray.".concat("light"===e?900:50),isTruncated:!0,overflow:"hidden",whiteSpace:"nowrap",children:t||"Poster Title"})}):null})},M=n(8126),I=n(56816),N=n(76830),P=n(33263),Q=n(23403),W=n(55095),O=function(i){var e=(0,a.ac)("(max-width: 600px)"),n=(0,t.Z)(e,1)[0],l=(0,a.Sx)({base:"sm",sm:"md",md:"lg",lg:"xl",xl:"2xl","2xl":"3xl"}),c=(0,o.ZP)({threshold:[.2,.4,.6,.8,1],unobserveOnEnter:!0}),u=c.observe,g=c.inView,h=i.mediaItem,m=i.mediaType,x=i.image,f=i.rating,w=i.title,j=i.subtitle,Z=i.description,L=i.isLoading,y=void 0===L||L,S=(0,r.kt)(),k=(0,t.Z)(S,2),T=k[0],F=k[1],z=(0,r.kt)(),C=(0,t.Z)(z,2),O=C[0],V=C[1],B=(0,r.kt)(),R=(0,t.Z)(B,2),A=R[0],q=R[1];return(0,v.jsx)(I.Z,{isFullWidth:!0,isDisabled:y||A||"company"===m,to:"company"!==m?{pathname:"/".concat((0,b.OS)(m),"/").concat((null===h||void 0===h?void 0:h.id)||"")}:{},onFocus:function(){return F.on()},onBlur:function(){return F.off()},onMouseEnter:function(){return V.on()},onMouseLeave:function(){return V.off()},children:(0,v.jsx)(M.Z,{isFullWidth:!0,isDisabled:y,isClickable:"company"!==m,isFixed:A,isLight:!0,children:(0,v.jsxs)(s.Ug,{ref:u,width:"100%",position:"relative",spacing:[1,1,2,2,2,2],p:[1,1,2,2,2,2],children:[(0,v.jsx)(E,{mediaItem:h,mediaType:m,image:x,title:w,isFocused:T,isHovering:O,isLoading:y,inView:g,onMouseChange:function(i){i?q.on():q.off()}}),(0,v.jsxs)(s.gC,{width:["calc(100% - 108px)","calc(100% - 124px)","calc(100% - 168px)","calc(100% - 204px)","calc(100% - 204px)","calc(100% - 240px)"],alignItems:"flex-start",spacing:[y?2:1,y?2:1,y?4:2,y?4:2,y?4:2,y?4:2],children:["movie"!==m&&"tv"!==m||!f?null:(0,v.jsx)(N.Z,{count:null===f||void 0===f?void 0:f.count,inView:g,size:l,isLoading:y,children:null===f||void 0===f?void 0:f.rating}),(0,v.jsxs)(s.gC,{width:"100%",alignItems:"flex-start",spacing:[y?.5:.25,y?.5:.25,y?1:.5,y?1:.5,y?1:.5,y?1:.5],children:[(0,v.jsx)(D,{title:w,isLoading:y,inView:g}),!d().isNil(j)&&!d().isEmpty(j)||y?(0,v.jsx)(_,{subtitle:j,isLoading:y,inView:g}):null]}),!d().isNil(Z)&&!d().isEmpty(Z)||y?(0,v.jsx)(p,{description:Z,isLoading:y,inView:g}):null]}),(0,v.jsxs)(s.M5,{sx:{position:"absolute",top:1,right:1},children:["company"!==m?(0,v.jsx)(s.M5,{onMouseEnter:function(){return q.on()},onMouseLeave:function(){return q.off()},children:(0,v.jsx)(W.Z,{title:w,mediaType:m,mediaItem:h,isLoading:y,size:n?"md":"lg"})}):null,(0,v.jsx)(s.M5,{onMouseEnter:function(){return q.on()},onMouseLeave:function(){return q.off()},children:(0,v.jsx)(Q.Z,{title:w,mediaType:m,mediaItem:h,isLoading:y,size:n?"md":"lg"})}),"movie"===m||"tv"===m?(0,v.jsx)(s.M5,{onMouseEnter:function(){return q.on()},onMouseLeave:function(){return q.off()},children:(0,v.jsx)(P.Z,{title:w,mediaType:m,mediaItem:h,isLoading:y,size:n?"md":"lg"})}):null]})]})})})}},20742:function(i,e,n){var t=n(94869),o=n(10514),a=n.n(o),r=n(9238),s=n(7378),l=n(8771);e.Z=function(i){var e=i.movie,n=i.width,o=i.isLoading,d=void 0===o||o,c=e||{},u=c.title,v=c.poster_path,g=c.vote_average,h=c.release_date,p=c.genre_ids;return(0,l.jsx)(s.Z,{width:n||"100%",mediaItem:e?(0,t.Z)({},e):void 0,mediaType:"movie",image:{alt:"".concat(u||""," movie poster"),src:v||"",size:{thumbnail:"w92",full:"original"}},rating:g||null,title:u||"",subtitle:"".concat(a().compact([a().isNil(h)||a().isEmpty(h)?void 0:"".concat((0,r.ok)(h||"","year")," "),a().isNil(p)||a().isEmpty(p)?void 0:"".concat((0,r.Fm)(p||[],"movie"))]).join(" \u2022 ")),isLoading:d})}},66631:function(i,e,n){var t=n(94869),o=n(31249),a=n(8771);e.Z=function(i){var e=i.collection,n=i.isLoading,r=void 0===n||n,s=e||{},l=s.name,d=s.poster_path,c=s.overview;return(0,a.jsx)(o.Z,{mediaItem:e?(0,t.Z)({},e):void 0,mediaType:"collection",image:{alt:"".concat(l||""," collection poster"),src:d||"",size:{thumbnail:"w92",full:"original"}},title:l||"",subtitle:c||"",isLoading:r})}},41485:function(i,e,n){n.r(e),n.d(e,{default:function(){return Ni}});var t=n(43583),o=n(94869),a=n(26664),r=n(61895),s=n(75231),l=n.n(s),d=n(41484),c=n(67770),u=n(97417),v=n(8833),g=n(86617),h=n(7300),p=n(66289),m=n(11557),x=n(48831),f=n.n(x),w=n(14539),b=n.n(w),j=n(10514),Z=n.n(j),L=n(20347),y=n(72233),S=n(89782),k=n(79829),E=n(88010),T=n(3233),F=n(7378),_=n(8771),z=["185px","205px","230px"],C=function(i){var e=(0,h.ac)("(max-width: 600px)"),n=(0,r.Z)(e,1)[0],t=i.title,a=i.cast,s=i.isError,l=void 0!==s&&s,d=i.isSuccess,c=void 0!==d&&d,u=i.isLoading,v=void 0===u||u,g=i.onChangeTab,p=(0,y.v9)((function(i){return i.user.ui.theme.color}));return(0,_.jsx)(T.Z,{title:"Cast",footer:(0,_.jsx)(S.Z,{color:p,isFullWidth:!0,isDisabled:v,onClick:function(){return g()},size:n?"sm":"md",variant:"text",children:"View all ".concat((null===a||void 0===a?void 0:a.length)||0," cast member").concat(a&&(0===a.length||a.length>1?"s":""))}),isDisabled:v||0===(null===a||void 0===a?void 0:a.length),variant:"outlined",children:!v&&l?(0,_.jsx)(E.Z,{label:"Oh no! Something went wrong",description:"Failed to fetch ".concat(t?'"'.concat(t,'"'):""," cast list!"),variant:"transparent"}):!v&&c&&a&&0===a.length?(0,_.jsx)(k.Z,{label:"".concat(t?'"'.concat(t,'"'):""," cast list is currently empty!"),variant:"transparent"}):!v&&c&&a&&a.length>0?a.filter((function(i,e){return e<10})).map((function(i){return(0,_.jsx)(F.Z,{width:z,mediaItem:i?(0,o.Z)({},i):void 0,mediaType:"person",image:{alt:"".concat((null===i||void 0===i?void 0:i.name)||""," person poster"),src:(null===i||void 0===i?void 0:i.profile_path)||"",size:{thumbnail:"w45",full:"original"}},title:(null===i||void 0===i?void 0:i.name)||"",subtitle:i.character?"As ".concat(i.character):"",isLoading:v},i.id)})):Z().range(0,20).map((function(i,e){return(0,_.jsx)(F.Z,{width:z,mediaType:"person",title:"Cast Member Name",isLoading:!0},e)}))})},D=n(51880),M=n(66631),I=function(i){var e,n=i.collection;return(0,_.jsx)(D.Z,{isFullWidth:!0,children:{header:{title:"Part of the ".concat(null!==n&&void 0!==n&&n.name?'"'.concat(Z().capitalize((e=n.name,Z().compact(e.toLowerCase().replace("collection","").split(" ")).join(" "))),'" Collection'):"Collection")},body:(0,_.jsx)(M.Z,{collection:n,isLoading:!1})}})},N=n(1459),P=n(11428),Q=n(56816),W=n(70699),O=Z().range(25,100,20),V=function(i){var e=i.person,n=i.isLoading,t=void 0===n||n,o=(0,P.Fg)(),a=(0,N.If)().colorMode,r=(0,y.v9)((function(i){return i.user.ui.theme.color})),s=(0,p.Bs)(Z().sample(O)||50);return(0,_.jsx)(Q.Z,{to:{pathname:"/people/".concat(null===e||void 0===e?void 0:e.id)},isDisabled:t,children:(0,_.jsx)(W.Z,{width:t?"".concat(s,"px"):"auto",fontSize:"md",isLoaded:!t,children:(0,_.jsx)(L.xv,{align:"left",color:"gray.".concat("light"===a?900:50),fontSize:"md",whiteSpace:"nowrap",textDecorationStyle:"wavy",textDecorationLine:"underline",textDecorationThickness:"from-font",textDecorationColor:"".concat(r,".").concat("light"===a?500:400),sx:{transition:"".concat(o.transition.duration.faster," ").concat(o.transition.easing["ease-out"])},_focus:{boxShadow:"none",color:"".concat(r,".").concat("light"===a?600:300)},_hover:{color:"".concat(r,".").concat("light"===a?500:400)},children:(null===e||void 0===e?void 0:e.name)||"Person Name"})})})},B=n(35639),R=function(i){var e=i.people,n=void 0===e?[]:e,t=i.isLoading,o=void 0===t||t,a=(0,N.If)().colorMode;return(0,_.jsx)(B.Z,{renderDivider:function(i){var e=i.padding;return(0,_.jsx)(L.xv,{align:"left",color:"gray.".concat("light"===a?900:50),fontSize:"md",pr:e,children:","})},isDisabled:o,children:o?Z().range(0,2).map((function(i,e){return(0,_.jsx)(V,{isLoading:!0},e)})):n.map((function(i){return(0,_.jsx)(V,{person:i,isLoading:!1},i.id)}))})},A=n(8049),q=function(i){var e=(0,h.ac)("(max-width: 600px)"),n=(0,r.Z)(e,1)[0],o=i.crew,a=void 0===o?[]:o,s=i.isLoading,l=void 0===s||s,c=(0,d.useState)([]),u=(0,r.Z)(c,2),v=u[0],g=u[1],p=(0,d.useState)([]),m=(0,r.Z)(p,2),x=m[0],f=m[1],w=(0,d.useState)([]),b=(0,r.Z)(w,2),j=b[0],y=b[1],S=(0,d.useState)([]),k=(0,r.Z)(S,2),E=k[0],T=k[1],F=Z().compact([!Z().isNil(v)&&!Z().isEmpty(v)||l?{label:"Director".concat((v||[]).length>1?"s":""),children:(0,_.jsx)(R,{people:v,isLoading:l},"movie-directors")}:void 0,!Z().isNil(x)&&!Z().isEmpty(x)||l?{label:"Executive Producer".concat((x||[]).length>1?"s":""),children:(0,_.jsx)(R,{people:x,isLoading:l},"movie-executive-producers")}:void 0,!Z().isNil(j)&&!Z().isEmpty(j)||l?{label:"Producer".concat((j||[]).length>1?"s":""),children:(0,_.jsx)(R,{people:j,isLoading:l},"movie-producers")}:void 0,!Z().isNil(E)&&!Z().isEmpty(E)||l?{label:"Writer".concat((E||[]).length>1?"s":""),children:(0,_.jsx)(R,{people:E,isLoading:l},"movie-producers")}:void 0]);return(0,d.useEffect)((function(){Z().isNil(a)||Z().isEmpty(a)||l||a.filter((function(i){switch(i.job){case"Director":g([].concat((0,t.Z)(v),[i]));break;case"Executive Producer":f([].concat((0,t.Z)(x),[i]));break;case"Producer":y([].concat((0,t.Z)(j),[i]));break;case"Writer":T([].concat((0,t.Z)(E),[i]))}}))}),[a]),(0,_.jsx)(L.Kq,{width:"100%",maxWidth:"100%",alignItems:"stretch",justifyContent:"stretch",direction:n?"column":"row",spacing:n?2:4,children:F.map((function(i,e){return i.children?(0,_.jsx)(A.Z,{width:n?"100%":"auto",maxWidth:n?"100%":"".concat(100/F.length,"%"),flex:1,label:i.label,children:i.children},e):null}))})},U=n(9238),H=Z().range(25,100,20),Y=function(i){var e=i.budget,n=i.isLoading,t=void 0===n||n,o=(0,N.If)().colorMode,a=(0,p.Bs)(Z().sample(H)||50);return(0,_.jsx)(W.Z,{width:t?"".concat(a,"px"):"auto",fontSize:"md",isLoaded:!t,children:(0,_.jsx)(L.xv,{align:"left",color:"gray.".concat("light"===o?900:50),fontSize:"md",whiteSpace:"nowrap",children:e?"$".concat((0,U.cP)(e)):"Movie Budget"})})},G=n(6842),K=Z().range(25,150,15),$=function(i){var e=(0,P.Fg)(),n=(0,N.If)().colorMode,t=(0,y.v9)((function(i){return i.user.ui.theme.color})),o=i.id,a=i.name,r=i.isLoading,s=void 0===r||r,l=(0,p.Bs)(Z().sample(K)||100);return(0,_.jsx)(W.Z,{width:s?"".concat(l,"px"):"auto",fontSize:"md",isLoaded:!s,children:(0,_.jsx)(Q.Z,{to:{pathname:"/movies/",search:G.stringify({with_genres:o})},isDisabled:s,children:(0,_.jsx)(L.xv,{align:"left",color:"gray.".concat("light"===n?900:50),fontSize:"md",whiteSpace:"nowrap",textDecorationStyle:"wavy",textDecorationLine:"underline",textDecorationThickness:"from-font",textDecorationColor:"".concat(t,".").concat("light"===n?500:400),sx:{transition:"".concat(e.transition.duration.faster," ").concat(e.transition.easing["ease-out"])},_focus:{boxShadow:"none",color:"".concat(t,".").concat("light"===n?600:300)},_hover:{color:"".concat(t,".").concat("light"===n?500:400)},children:a||"Genre"})})})},J=function(i){var e=i.genres,n=void 0===e?[]:e,t=i.isLoading,a=void 0===t||t,r=(0,N.If)().colorMode;return(0,_.jsx)(B.Z,{renderDivider:function(i){var e=i.padding;return(0,_.jsx)(L.xv,{align:"left",color:"gray.".concat("light"===r?900:50),fontSize:"md",pr:e,children:","})},isDisabled:a,children:n.map((function(i){return(0,_.jsx)($,(0,o.Z)((0,o.Z)({},i),{},{isLoading:a}),i.id)}))})},X=Z().range(25,75,15),ii=function(i){var e,n=i.language,t=i.isLoading,o=void 0===t||t,a=(0,N.If)().colorMode,r=(0,y.v9)((function(i){return i.options.data.languages})),s=(0,p.Bs)(Z().sample(X)||50);return(0,_.jsx)(W.Z,{width:o?"".concat(s,"px"):"auto",fontSize:"md",isLoaded:!o,children:(0,_.jsx)(L.xv,{align:"left",color:"gray.".concat("light"===a?900:50),fontSize:"md",whiteSpace:"nowrap",children:n?null===(e=r.find((function(i){return i.iso_639_1===n})))||void 0===e?void 0:e.english_name:"Movie Language"})})},ei=function(i){var e=i.languages,n=void 0===e?[]:e,t=i.isLoading,o=void 0===t||t,a=(0,N.If)().colorMode;return(0,_.jsx)(B.Z,{renderDivider:function(i){var e=i.padding;return(0,_.jsx)(L.xv,{align:"left",color:"gray.".concat("light"===a?900:50),fontSize:"md",pr:e,children:","})},isDisabled:o,children:n.map((function(i,e){return(0,_.jsx)(ii,{language:i.iso_639_1,isLoading:o},e)}))})},ni=Z().range(25,100,20),ti=function(i){var e=i.revenue,n=i.isLoading,t=void 0===n||n,o=(0,N.If)().colorMode,a=(0,p.Bs)(Z().sample(ni)||50);return(0,_.jsx)(W.Z,{width:t?"".concat(a,"px"):"auto",fontSize:"md",isLoaded:!t,children:(0,_.jsx)(L.xv,{align:"left",color:"gray.".concat("light"===o?900:50),fontSize:"md",whiteSpace:"nowrap",children:e?"$".concat((0,U.cP)(e)):"Movie Revenue"})})},oi=function(i){var e,n=i.movie,t=i.isLoading,o=void 0===t||t,a=(0,h.ac)("(max-width: 600px)"),s=(0,r.Z)(a,1)[0],l=((null===n||void 0===n?void 0:n.spoken_languages)||[]).filter((function(i){return i.iso_639_1!==(null===n||void 0===n?void 0:n.original_language)})),d=Z().compact([!Z().isNil(null===n||void 0===n?void 0:n.budget)&&!Z().isEmpty(String(null===n||void 0===n?void 0:n.budget))||o?{label:"Budget",children:(0,_.jsx)(Y,{budget:null===n||void 0===n?void 0:n.budget,isLoading:o},"movie-".concat(null===n||void 0===n?void 0:n.id,"-budget"))}:void 0,!Z().isNil(null===n||void 0===n?void 0:n.revenue)&&!Z().isEmpty(String(null===n||void 0===n?void 0:n.revenue))||o?{label:"Revenue",children:(0,_.jsx)(ti,{revenue:null===n||void 0===n?void 0:n.revenue,isLoading:o},"movie-".concat(null===n||void 0===n?void 0:n.id,"-revenue"))}:void 0,!Z().isNil(null===n||void 0===n?void 0:n.genres)&&!Z().isEmpty(null===n||void 0===n?void 0:n.genres)||o?{label:"Genres",children:(0,_.jsx)(J,{genres:null===n||void 0===n?void 0:n.genres,isLoading:o})}:void 0,!Z().isNil(null===n||void 0===n?void 0:n.original_language)&&!Z().isEmpty(null===n||void 0===n?void 0:n.original_language)||o?{label:((null===n||void 0===n||null===(e=n.spoken_languages)||void 0===e?void 0:e.length)||0)>1?"Original Language":"Language",children:(0,_.jsx)(ii,{language:null===n||void 0===n?void 0:n.original_language,isLoading:o},"movie-".concat(null===n||void 0===n?void 0:n.id,"-language"))}:void 0,!Z().isNil(l)&&!Z().isEmpty(l)||o?{label:"Other Languages",children:(0,_.jsx)(ei,{languages:l,isLoading:o},"movie-".concat(null===n||void 0===n?void 0:n.id,"-languages"))}:void 0]);return(0,_.jsx)(L.Kq,{width:"100%",maxWidth:"100%",alignItems:"stretch",justifyContent:"stretch",direction:s?"column":"row",spacing:s?2:4,children:d.map((function(i,e){return i.children?(0,_.jsx)(A.Z,{width:s?"100%":"auto",maxWidth:s?"100%":"".concat(100/d.length,"%"),flex:1,label:i.label,children:i.children},e):null}))})},ai=n(20742),ri=["185px","205px","230px"],si=function(i){var e=i.title,n=i.recommendations,t=void 0===n?[]:n,o=i.isError,a=void 0!==o&&o,r=i.isSuccess,s=void 0!==r&&r,l=i.isLoading,d=void 0===l||l;return(0,_.jsx)(T.Z,{title:"Recommended Movies",isDisabled:d||0===t.length,variant:"outlined",children:!d&&a?(0,_.jsx)(E.Z,{label:"Oh no! Something went wrong",description:"Failed to fetch ".concat(e?'"'.concat(e,'"'):""," recommendations list!"),variant:"transparent"}):!d&&s&&t&&0===t.length?(0,_.jsx)(k.Z,{label:"Oh no! Something went wrong",description:"".concat(e?'"'.concat(e,'"'):""," recommendations list is currently empty!"),variant:"transparent"}):!d&&s&&t&&t.length>0?t.map((function(i){return(0,_.jsx)(ai.Z,{width:ri,movie:i,isLoading:!1},i.id)})):Z().range(0,20).map((function(i,e){return(0,_.jsx)(ai.Z,{width:ri,isLoading:!0},e)}))})},li=n(54915),di=n(39122),ci=n(40257),ui=n(77917),vi=n(53773),gi=n(13990),hi=function(i){var e=i.movie,n=i.reviews,t=void 0===n?[]:n,o=i.isLoading,a=void 0===o||o,s=i.onChangeTab,l=(0,h.ac)("(max-width: 600px)"),d=(0,r.Z)(l,1)[0],u=(0,y.v9)((function(i){return i.user.data.reviews.user})).filter((function(i){return i.mediaItem.id===(null===e||void 0===e?void 0:e.id)})),v=(0,y.v9)((function(i){return i.user.ui.theme.color})),g=function(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return i.sort((function(i,e){return Number((0,U.ok)(e.updated_at||e.created_at||"","year"))-Number((0,U.ok)(i.updated_at||i.created_at||"","year"))}))},p=g(t),x=g(u);return(0,_.jsx)(D.Z,{isFullWidth:!0,children:{header:{title:t.length>0?"Latest Review":u.length>0?"My Latest Review":"Reviews",actions:((null===t||void 0===t?void 0:t.length)||0)+(u.length||0)>0&&!d?(0,_.jsx)(m.pT,{in:!0,unmountOnExit:!0,children:(0,_.jsx)(li.Z,{size:"sm",children:(0,_.jsx)(c.ZP,{duration:1,prefix:"Total of ",end:((null===t||void 0===t?void 0:t.length)||0)+(u.length||0),suffix:" reviews"})})}):void 0},body:a||Z().isNil(p[0])||Z().isEmpty(p[0])?a||Z().isNil(x[0])||Z().isEmpty(x[0])?a?(0,_.jsx)(ci.Z,{review:{},isLoading:a}):(0,_.jsx)(k.Z,{hasIllustration:!1,button:(0,_.jsx)(ui.Z,{renderAction:function(i){var e=i.color,n=i.label,t=i.onClick;return(0,_.jsx)(S.Z,{color:e,onClick:function(){return t()},size:"sm",children:n})},mediaItem:e,mediaType:"movie"}),label:d?"Write a review":"You currently have not written any reviews ".concat(null!==e&&void 0!==e&&e.title?'for "'.concat(e.title,'"'):""),description:d?"You currently have not written any reviews!":"Write a review and leave your taughts about ".concat(null!==e&&void 0!==e&&e.title?'for "'.concat(e.title,'"'):""," to help others make up their mind."),variant:"transparent"}):(0,_.jsx)(ci.Z,{renderFooterActions:(0,_.jsxs)(L.Ug,{children:[(0,_.jsx)(gi.Z,{review:x[0]}),(0,_.jsx)(vi.Z,{id:x[0].id})]}),review:x[0],isLoading:!1}):(0,_.jsx)(ci.Z,{renderFooterActions:(0,_.jsxs)(L.Ug,{spacing:0,children:[(0,_.jsx)(di.Z,{review:p[0],state:"isLiked",label:"Like",isDisabled:a}),(0,_.jsx)(di.Z,{review:p[0],state:"isDisliked",label:"Dislike",isDisabled:a})]}),review:p[0],isLoading:!1}),footer:!Z().isNil(p[0])&&!Z().isEmpty(p[0])||!Z().isNil(x[0])&&!Z().isEmpty(x[0])?(0,_.jsx)(S.Z,{color:v,isFullWidth:!0,isDisabled:a,onClick:function(){return s()},size:d?"sm":"md",variant:"text",children:d?"View all reviews":"View all ".concat(null!==e&&void 0!==e&&e.title?'"'.concat(e.title,'"'):"Movie"," reviews")}):void 0}})},pi=["185px","205px","230px"],mi=function(i){var e=i.title,n=i.similar,t=void 0===n?[]:n,o=i.isError,a=void 0!==o&&o,r=i.isSuccess,s=void 0!==r&&r,l=i.isLoading,d=void 0===l||l;return(0,_.jsx)(T.Z,{title:"Similar Movies",isDisabled:d||0===t.length,variant:"outlined",children:!d&&a?(0,_.jsx)(E.Z,{label:"Oh no! Something went wrong",description:"Failed to fetch ".concat(e?'"'.concat(e,'"'):""," similar list!"),variant:"transparent"}):!d&&s&&t&&0===t.length?(0,_.jsx)(k.Z,{label:"Oh no! Something went wrong",description:"".concat(e?'"'.concat(e,'"'):""," similar list is currently empty!"),variant:"transparent"}):!d&&s&&t&&t.length>0?t.map((function(i){return(0,_.jsx)(ai.Z,{width:pi,movie:i,isLoading:!1},i.id)})):Z().range(0,20).map((function(i,e){return(0,_.jsx)(ai.Z,{width:pi,isLoading:!0},e)}))})},xi=n(26653),fi=n(28025),wi=n(49410),bi=n(67789),ji=function(i){var e,n,t,o,a,r,s,l,d,c,u,v,g,h,p,x=i.movieQuery,f=i.creditsQuery,w=i.collectionQuery,b=i.recommendationsQuery,j=i.similarQuery,y=i.reviews,S=i.reviewsQuery,k=i.imagesQuery,E=i.videosQuery,T=i.onAssetClick,F=i.onChangeTab;return(0,_.jsxs)(L.gC,{width:"100%",maxWidth:"100%",spacing:4,children:[(0,_.jsx)(xi.Z,{renderPoster:function(){var i,e;return(0,_.jsx)(wi.Z,{alt:null===(i=x.data)||void 0===i?void 0:i.title,path:null===(e=x.data)||void 0===e?void 0:e.poster_path,mediaType:"movie",isLoading:x.isFetching||x.isLoading,isError:x.isError,onClick:function(i){return T(i,"image")}})},renderBackdrop:function(){var i,e,n,t,o;return(0,_.jsx)(fi.Z,{alt:null===(i=x.data)||void 0===i?void 0:i.title,path:null===(e=x.data)||void 0===e?void 0:e.backdrop_path,video:(null===(n=x.data)||void 0===n?void 0:n.video)||((null===(t=E.data)||void 0===t||null===(o=t.results)||void 0===o?void 0:o.length)||0)>0,mediaType:"movie",isLoading:x.isFetching||x.isLoading||E.isFetching||E.isLoading,isError:x.isError||E.isError,onClick:function(i,e){return T(i,e?"video":"image")}})},renderDetails:function(){var i,e,n;return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(oi,{movie:x.data,isLoading:x.isFetching||x.isLoading}),!Z().isNil(null===(i=f.data)||void 0===i?void 0:i.crew)&&!Z().isEmpty(null===(e=f.data)||void 0===e?void 0:e.crew)||f.isFetching||f.isLoading?(0,_.jsx)(q,{crew:null===(n=f.data)||void 0===n?void 0:n.crew,isLoading:f.isFetching||f.isLoading}):null]})},tagline:null===(e=x.data)||void 0===e?void 0:e.tagline,overview:null===(n=x.data)||void 0===n?void 0:n.overview,isLoading:x.isFetching||x.isLoading}),(0,_.jsx)(C,{title:null===(t=x.data)||void 0===t?void 0:t.title,cast:null===(o=f.data)||void 0===o?void 0:o.cast,isError:f.isError,isSuccess:f.isSuccess,isLoading:f.isFetching||f.isLoading,onChangeTab:function(){return F(1)}}),(0,_.jsx)(m.UO,{in:w.isSuccess&&!Z().isNil(w.data)&&!Z().isEmpty(w.data),unmountOnExit:!0,style:{width:"100%"},children:(0,_.jsx)(I,{collection:w.data})}),(0,_.jsx)(si,{title:null===(a=x.data)||void 0===a?void 0:a.title,recommendations:b.data,isError:b.isError,isSuccess:b.isSuccess,isLoading:b.isFetching||b.isLoading}),(0,_.jsx)(mi,{title:null===(r=x.data)||void 0===r?void 0:r.title,similar:j.data,isError:j.isError,isSuccess:j.isSuccess,isLoading:j.isFetching||j.isLoading}),(0,_.jsx)(hi,{movie:x.data,reviews:null===y||void 0===y?void 0:y.results,isLoading:x.isFetching||x.isLoading||S.isFetching||S.isLoading,onChangeTab:function(){return F(2)}}),(0,_.jsx)(bi.Z,{alt:null===(s=x.data)||void 0===s?void 0:s.title,assets:Z().compact([{label:"Posters",type:"poster",isDisabled:0===(null===(l=k.data)||void 0===l||null===(d=l.posters)||void 0===d?void 0:d.length),data:(null===(c=k.data)||void 0===c?void 0:c.posters)||[]},{label:"Backdrops",type:"backdrop",isDisabled:0===((null===(u=k.data)||void 0===u?void 0:u.backdrops)||[]).length,data:(null===(v=k.data)||void 0===v?void 0:v.backdrops)||[]},{label:"Videos",type:"video",isDisabled:0===(null===(g=E.data)||void 0===g||null===(h=g.results)||void 0===h?void 0:h.length),data:(null===(p=E.data)||void 0===p?void 0:p.results)||[]}]),mediaType:"movie",isError:{images:k.isError,videos:E.isError},isSuccess:{images:k.isSuccess,videos:E.isSuccess},isLoading:{images:k.isFetching||k.isLoading,videos:E.isFetching||E.isLoading},onAssetClick:T,onFooterClick:function(){return F(3)}})]})},Zi=n(33128),Li=n(50762),yi=n(52752),Si=n(30938),ki=n(23698),Ei=n(27590),Ti=n(26668),Fi=n(1285),_i=n(65392),zi=n(69781),Ci=n(46831),Di=n(12042),Mi=n(60819),Ii=["overview","cast_crew","reviews","assets"],Ni=function(){var i,e,n,s,x,w,j,L,S,k,E,T,F,z,C,D,M,I,N,P,Q,W,O,V,B,R,A,q,H,Y,G,K,$,J,X,ii,ei,ni,ti=b().CancelToken.source(),oi=(0,h.ac)("(max-width: 960px)"),ai=(0,r.Z)(oi,1)[0],ri=(0,p.qY)(),si=ri.isOpen,di=ri.onOpen,ci=ri.onClose,ui=(0,g.UO)().id,vi=(0,g.TH)(),gi=(0,g.s0)(),hi=(0,v.I0)(),pi=(0,y.v9)((function(i){return i.user.data.recentlyViewed})),mi=(0,y.v9)((function(i){return i.user.data.reviews.user})).filter((function(i){return i.mediaItem.id===Number(ui)})),xi=(0,y.v9)((function(i){return i.user.ui.theme.color})),fi=(0,d.useState)(),wi=(0,r.Z)(fi,2),bi=wi[0],Ni=wi[1],Pi=(0,d.useState)(0),Qi=(0,r.Z)(Pi,2),Wi=Qi[0],Oi=Qi[1],Vi=(0,d.useState)(),Bi=(0,r.Z)(Vi,2),Ri=Bi[0],Ai=Bi[1],qi=(0,u.useQuery)(["movie-".concat(ui),ui],(0,a.Z)(l().mark((function i(){var e,n;return l().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,Li.Z.get("/movie/".concat(ui),{params:{append_to_response:"release_dates"},cancelToken:ti.token}).then((function(i){return(0,Li.t)(2500,i)}));case 2:return e=i.sent,n=e.data,i.abrupt("return",n);case 5:case"end":return i.stop()}}),i)}))),{onSuccess:function(i){hi((0,Fi.TE)((0,o.Z)((0,o.Z)({},pi),{},{movies:Z().uniq([].concat((0,t.Z)(pi.movies),[(0,o.Z)({},i)]))})))}}),Ui=(0,u.useQuery)(["movie-".concat(ui,"-credits"),ui],(0,a.Z)(l().mark((function i(){var e,n;return l().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,Li.Z.get("/movie/".concat(ui,"/credits"),{cancelToken:ti.token});case 2:return e=i.sent,n=e.data,i.abrupt("return",n);case 5:case"end":return i.stop()}}),i)}))),{enabled:qi.isSuccess}),Hi=(0,u.useQuery)(["movie-".concat(ui,"-external_ids"),ui],(0,a.Z)(l().mark((function i(){var e,n;return l().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,Li.Z.get("/movie/".concat(ui,"/external_ids"),{cancelToken:ti.token});case 2:return e=i.sent,n=e.data,i.abrupt("return",n);case 5:case"end":return i.stop()}}),i)}))),{enabled:qi.isSuccess}),Yi=(0,u.useQuery)(["movie-".concat(ui,"-images"),ui],(0,a.Z)(l().mark((function i(){var e,n;return l().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,Li.Z.get("/movie/".concat(ui,"/images"),{cancelToken:ti.token});case 2:return e=i.sent,n=e.data,i.abrupt("return",n);case 5:case"end":return i.stop()}}),i)}))),{enabled:qi.isSuccess}),Gi=(0,u.useQuery)(["movie-".concat(ui,"-videos"),ui],(0,a.Z)(l().mark((function i(){var e,n;return l().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,Li.Z.get("/movie/".concat(ui,"/videos"),{cancelToken:ti.token});case 2:return e=i.sent,n=e.data,i.abrupt("return",n);case 5:case"end":return i.stop()}}),i)}))),{enabled:qi.isSuccess}),Ki=(0,u.useQuery)("movie-".concat(ui,"-collection"),(0,a.Z)(l().mark((function i(){var e,n,t,o;return l().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,Li.Z.get("/collection/".concat(null===(e=qi.data)||void 0===e||null===(n=e.belongs_to_collection)||void 0===n?void 0:n.id),{cancelToken:ti.token});case 2:return t=i.sent,o=t.data,i.abrupt("return",o);case 5:case"end":return i.stop()}}),i)}))),{enabled:qi.isSuccess&&!Z().isNil(null===(i=qi.data)||void 0===i||null===(e=i.belongs_to_collection)||void 0===e?void 0:e.id)}),$i=(0,u.useInfiniteQuery)(["movie-".concat(ui,"-reviews"),ui],function(){var i=(0,a.Z)(l().mark((function i(e){var n,t,o,a;return l().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return n=e.pageParam,t=void 0===n?1:n,i.next=3,Li.Z.get("/movie/".concat(ui,"/reviews"),{params:{page:t},cancelToken:ti.token});case 3:return o=i.sent,a=o.data,i.abrupt("return",a);case 6:case"end":return i.stop()}}),i)})));return function(e){return i.apply(this,arguments)}}(),{enabled:qi.isSuccess,getPreviousPageParam:function(i){return 1!==i.page&&((null===i||void 0===i?void 0:i.page)||0)-1},getNextPageParam:function(i){return i.page!==i.total_pages&&((null===i||void 0===i?void 0:i.page)||0)+1},onSuccess:function(i){var e=[];i.pages.forEach((function(i){e=[].concat((0,t.Z)(e),(0,t.Z)((null===i||void 0===i?void 0:i.results)||[]))})),Ai({page:i.pages[i.pages.length-1].page,results:f()((0,t.Z)(Z().uniqBy(e,"id")),"updated_at",{reverse:!0}),total_pages:i.pages[i.pages.length-1].total_pages,total_results:i.pages[i.pages.length-1].total_results})}}),Ji=(0,u.useQuery)(["movie-".concat(ui,"-recommendations"),ui],(0,a.Z)(l().mark((function i(){var e,n;return l().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,Li.Z.get("/movie/".concat(ui,"/recommendations"),{cancelToken:ti.token});case 2:return e=i.sent,n=e.data,i.abrupt("return",f()((0,t.Z)(n.results||[]),"popularity",{reverse:!0}).filter((function(i,e){return e<20})));case 5:case"end":return i.stop()}}),i)}))),{enabled:qi.isSuccess}),Xi=(0,u.useQuery)(["movie-".concat(ui,"-similar"),ui],(0,a.Z)(l().mark((function i(){var e,n;return l().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,Li.Z.get("/movie/".concat(ui,"/similar"),{cancelToken:ti.token});case 2:return e=i.sent,n=e.data,i.abrupt("return",f()((0,t.Z)(n.results||[]),"popularity",{reverse:!0}).filter((function(i,e){return e<20})));case 5:case"end":return i.stop()}}),i)}))),{enabled:qi.isSuccess}),ie=function(i){var e;gi({pathname:".",hash:Ii[i]}),null===(e=document.scrollingElement)||void 0===e||e.scrollTo(0,0)},ee=function(i){Ni(i),di()},ne=function(i,e){if("video"===e){var n,t=((null===(n=Gi.data)||void 0===n?void 0:n.results)||[]).find((function(i){return i.official||"Trailer"===i.type}));ee((null===t||void 0===t?void 0:t.key)||i)}else ee(i)};return(0,d.useEffect)((function(){vi.pathname==="/movies/".concat(ui)&&function(){switch(String(vi.hash).replace("#","")){case"cast":case"crew":case"cast_crew":return void Oi(1);case"reviews":return void Oi(2);case"assets":return void Oi(3);default:Oi(0)}}()}),[vi.hash]),(0,d.useEffect)((function(){return function(){return ti.cancel()}}),[]),(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(ki.Z,{activeTab:Wi,onChange:ie,children:(0,_.jsx)(Mi.Z,{children:{title:(0,_.jsx)(Zi.Z,{movie:qi.data,isLoading:qi.isFetching||qi.isLoading}),actions:(0,_.jsx)(_i.Z,{mediaItem:qi.data,mediaType:"movie",title:null===(n=qi.data)||void 0===n?void 0:n.title,isLoading:qi.isFetching||qi.isLoading,isError:qi.isError}),tabList:(0,_.jsx)(Ei.Z,{color:xi,children:[{label:"Overview"},{label:"Cast & Crew",isDisabled:Ui.isError||Ui.isFetching||Ui.isLoading||((null===(s=Ui.data)||void 0===s||null===(x=s.cast)||void 0===x?void 0:x.length)||0)+((null===(w=Ui.data)||void 0===w||null===(j=w.crew)||void 0===j?void 0:j.length)||0)===0,renderRight:((null===(L=Ui.data)||void 0===L||null===(S=L.cast)||void 0===S?void 0:S.length)||0)+((null===(k=Ui.data)||void 0===k||null===(E=k.crew)||void 0===E?void 0:E.length)||0)>0?function(i){var e,n,t,o,a=i.isSelected,r=i.size;return(0,_.jsx)(m.pT,{in:!0,unmountOnExit:!0,children:(0,_.jsx)(li.Z,{color:a?xi:"gray",isLight:!a,size:r,children:(0,_.jsx)(c.ZP,{duration:1,end:((null===(e=Ui.data)||void 0===e||null===(n=e.cast)||void 0===n?void 0:n.length)||0)+((null===(t=Ui.data)||void 0===t||null===(o=t.crew)||void 0===o?void 0:o.length)||0)})})})}:void 0},{label:"Reviews",isDisabled:qi.isError||qi.isFetching||qi.isLoading||$i.isError||$i.isFetching||$i.isLoading,renderRight:((null===Ri||void 0===Ri?void 0:Ri.total_results)||0)+(mi.length||0)>0?function(i){var e=i.isSelected,n=i.size;return(0,_.jsx)(m.pT,{in:!0,unmountOnExit:!0,children:(0,_.jsx)(li.Z,{color:e?xi:"gray",isLight:!e,size:n,children:(0,_.jsx)(c.ZP,{duration:1,end:((null===Ri||void 0===Ri?void 0:Ri.total_results)||0)+(mi.length||0)})})})}:void 0},{label:"Assets",isDisabled:Yi.isError||Yi.isFetching||Yi.isLoading||Gi.isError||Gi.isFetching||Gi.isLoading||((null===(T=Yi.data)||void 0===T||null===(F=T.posters)||void 0===F?void 0:F.length)||0)+((null===(z=Yi.data)||void 0===z||null===(C=z.backdrops)||void 0===C?void 0:C.length)||0)+((null===(D=Gi.data)||void 0===D||null===(M=D.results)||void 0===M?void 0:M.length)||0)===0,renderRight:((null===(I=Yi.data)||void 0===I||null===(N=I.posters)||void 0===N?void 0:N.length)||0)+((null===(P=Yi.data)||void 0===P||null===(Q=P.backdrops)||void 0===Q?void 0:Q.length)||0)+((null===(W=Gi.data)||void 0===W||null===(O=W.results)||void 0===O?void 0:O.length)||0)>0?function(i){var e,n,t,o,a,r,s=i.isSelected,l=i.size;return(0,_.jsx)(m.pT,{in:!0,unmountOnExit:!0,children:(0,_.jsx)(li.Z,{color:s?xi:"gray",isLight:!s,size:l,children:(0,_.jsx)(c.ZP,{duration:1,end:((null===(e=Yi.data)||void 0===e||null===(n=e.posters)||void 0===n?void 0:n.length)||0)+((null===(t=Yi.data)||void 0===t||null===(o=t.backdrops)||void 0===o?void 0:o.length)||0)+((null===(a=Gi.data)||void 0===a||null===(r=a.results)||void 0===r?void 0:r.length)||0)})})})}:void 0}]}),socials:ai?void 0:(0,_.jsx)(Si.Z,{alt:null===(V=qi.data)||void 0===V?void 0:V.title,socials:(0,o.Z)((0,o.Z)({},Hi.data),{},{homepage_id:null===(B=qi.data)||void 0===B?void 0:B.homepage}),orientation:"horizontal",isLoading:qi.isFetching||qi.isLoading||Hi.isFetching||Hi.isLoading}),tabPanels:(0,_.jsxs)(Ti.Z,{children:[(0,_.jsx)(ji,{movieQuery:qi,creditsQuery:Ui,collectionQuery:Ki,recommendationsQuery:Ji,similarQuery:Xi,reviews:Ri,reviewsQuery:$i,imagesQuery:Yi,videosQuery:Gi,onAssetClick:ne,onChangeTab:ie}),(0,_.jsx)(Ci.Z,{alt:null===(R=qi.data)||void 0===R?void 0:R.title,credits:Ui.data,isError:Ui.isError,isSuccess:Ui.isSuccess,isLoading:Ui.isFetching||Ui.isLoading}),(0,_.jsx)(Di.Z,{alt:null===(A=qi.data)||void 0===A?void 0:A.title,mediaItem:qi.data?(0,o.Z)({},qi.data):void 0,mediaType:"movie",reviews:Ri,isError:$i.isError,isSuccess:$i.isSuccess,isLoading:$i.isFetching||$i.isLoading,hasNextPage:$i.hasNextPage,onFetchNextPage:$i.fetchNextPage}),(0,_.jsx)(zi.Z,{alt:null===(q=qi.data)||void 0===q?void 0:q.title,assets:{posters:null===(H=Yi.data)||void 0===H?void 0:H.posters,backdrops:null===(Y=Yi.data)||void 0===Y?void 0:Y.backdrops,videos:null===(G=Gi.data)||void 0===G?void 0:G.results},isError:Yi.isError||Gi.isError,isSuccess:Yi.isSuccess||Gi.isSuccess,isLoading:Yi.isFetching||Yi.isLoading||Gi.isFetching||Gi.isLoading,onClickAsset:ne})]})}})}),Yi.isSuccess||Gi.isSuccess?(0,_.jsx)(yi.Z,{alt:(null===(K=qi.data)||void 0===K?void 0:K.title)||"Movie Title",assets:Z().compact([((null===($=Yi.data)||void 0===$?void 0:$.posters)||[]).length>0?{label:"Posters",mediaItems:((null===(J=Yi.data)||void 0===J?void 0:J.posters)||[]).map((function(i){return{type:"image",boringType:(0,U.Qg)("movie"),srcSize:["w92","original"],data:(0,o.Z)({},i)}}))}:void 0,((null===(X=Yi.data)||void 0===X?void 0:X.backdrops)||[]).length>0?{label:"Backdrops",mediaItems:((null===(ii=Yi.data)||void 0===ii?void 0:ii.backdrops)||[]).map((function(i){return{type:"image",boringType:(0,U.Qg)("movie"),srcSize:["w300","original"],data:(0,o.Z)({},i)}}))}:void 0,((null===(ei=Gi.data)||void 0===ei?void 0:ei.results)||[]).length>0?{label:"Videos",mediaItems:((null===(ni=Gi.data)||void 0===ni?void 0:ni.results)||[]).map((function(i){return{type:"video",boringType:(0,U.Qg)("movie"),srcSize:["",""],data:(0,o.Z)({},i)}}))}:void 0]),selectedPath:bi,isOpen:si,onClose:ci}):null]})}}}]);
//# sourceMappingURL=352.dcaab847.chunk.js.map