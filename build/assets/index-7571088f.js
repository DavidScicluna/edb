import{a8 as L,U as M,b6 as w,b7 as m,E as e,bp as D,a6 as S,bq as s,c5 as y,c6 as g,ck as u,al as h}from"./useUserTheme-cad0e91d.js";const I=({separator:i,isDisabled:t,variant:l="outlined",...a})=>{const{color:n,colorMode:d}=L(),c=M(),o=w(G=>G.app.ui.displayMode),[b,r]=m(),[v,p]=m();return e(D,{children:S.compact([e(s,{index:0,total:i?2:1,children:e(y,{"aria-label":o==="grid"?"Display-mode set to Grid mode (tooltip)":"Switch display-mode to Grid mode (tooltip)",colorMode:d,isOpen:!t&&b,isDisabled:t,placement:"top",label:o==="grid"?"Display-mode set to Grid mode":"Switch display-mode to Grid mode",children:e(g,{...a,"aria-label":o==="grid"?"Display-mode set to Grid mode":"Switch display-mode to Grid mode",color:o==="grid"?n:"gray",colorMode:d,isActive:o==="grid",onMouseEnter:()=>r.on(),onMouseLeave:()=>r.off(),onClick:o==="list"?()=>c(u("grid")):void 0,variant:l,children:e(h,{icon:"grid_on",category:"outlined"})})})},"ds-edb-display-mode-grid"),i&&e(s,{index:1,total:2,children:i},"ds-edb-display-mode-separator"),e(s,{index:i?2:1,total:i?2:1,children:e(y,{"aria-label":o==="list"?"Display-mode set to List mode (tooltip)":"Switch display-mode to List mode (tooltip)",colorMode:d,isOpen:!t&&v,isDisabled:t,placement:"top",label:o==="list"?"Display-mode set to List mode":"Switch display-mode to List mode",children:e(g,{...a,"aria-label":o==="list"?"Display-mode set to List mode":"Switch display-mode to List mode",color:o==="list"?n:"gray",colorMode:d,isActive:o==="list",onMouseEnter:()=>p.on(),onMouseLeave:()=>p.off(),onClick:o==="grid"?()=>c(u("list")):void 0,variant:l,children:e(h,{icon:"view_agenda",category:"outlined"})})})},"ds-edb-display-mode-list")])})};export{I as D};
