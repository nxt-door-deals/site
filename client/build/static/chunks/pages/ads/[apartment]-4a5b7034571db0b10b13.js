_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[16],{"/fxN":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/ads/[apartment]",function(){return n("Ivqs")}])},Ivqs:function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),o=n.n(r),a=n("nOHt"),f=n("YFqc"),c=n.n(f),u=o.a.createElement;t.default=function(){var e=Object(a.useRouter)().query.apartment;return u("div",{className:"font-axiform text-lg p-10"},"Ads for ",u("span",{className:"font-bold text-brand-purple"},e)," ","will go here"," ",u(c.a,{href:"/"},u("a",null,"Home")))}},YFqc:function(e,t,n){e.exports=n("cTJO")},cTJO:function(e,t,n){"use strict";var r=n("J4zp"),o=n("284h");t.__esModule=!0,t.default=void 0;var a,f=o(n("q1tI")),c=n("elyg"),u=(n("g/15"),n("nOHt")),s=new Map,i=window.IntersectionObserver,l={};var p=function(e,t){var n=a||(i?a=new i((function(e){e.forEach((function(e){if(s.has(e.target)){var t=s.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(a.unobserve(e.target),s.delete(e.target),t())}}))}),{rootMargin:"200px"}):void 0);return n?(n.observe(e),s.set(e,t),function(){try{n.unobserve(e)}catch(t){console.error(t)}s.delete(e)}):function(){}};function d(e,t,n,r){(0,c.isLocalURL)(t)&&(e.prefetch(t,n,r).catch((function(e){0})),l[t+"%"+n]=!0)}var v=function(e){var t=!1!==e.prefetch,n=f.default.useState(),o=r(n,2),a=o[0],s=o[1],v=(0,u.useRouter)(),h=v&&v.pathname||"/",w=f.default.useMemo((function(){var t=(0,c.resolveHref)(h,e.href);return{href:t,as:e.as?(0,c.resolveHref)(h,e.as):t}}),[h,e.href,e.as]),y=w.href,g=w.as;f.default.useEffect((function(){if(t&&i&&a&&a.tagName&&(0,c.isLocalURL)(y)&&!l[y+"%"+g])return p(a,(function(){d(v,y,g)}))}),[t,a,y,g,v]);var m=e.children,E=e.replace,_=e.shallow,b=e.scroll;"string"===typeof m&&(m=f.default.createElement("a",null,m));var N=f.Children.only(m),x={ref:function(e){e&&s(e),N&&"object"===typeof N&&N.ref&&("function"===typeof N.ref?N.ref(e):"object"===typeof N.ref&&(N.ref.current=e))},onClick:function(e){N.props&&"function"===typeof N.props.onClick&&N.props.onClick(e),e.defaultPrevented||function(e,t,n,r,o,a,f){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,c.isLocalURL)(n))&&(e.preventDefault(),null==f&&(f=r.indexOf("#")<0),t[o?"replace":"push"](n,r,{shallow:a}).then((function(e){e&&f&&(window.scrollTo(0,0),document.body.focus())})))}(e,v,y,g,E,_,b)}};return t&&(x.onMouseEnter=function(e){(0,c.isLocalURL)(y)&&(N.props&&"function"===typeof N.props.onMouseEnter&&N.props.onMouseEnter(e),d(v,y,g,{priority:!0}))}),!e.passHref&&("a"!==N.type||"href"in N.props)||(x.href=(0,c.addBasePath)(g)),f.default.cloneElement(N,x)};t.default=v}},[["/fxN",0,1,2]]]);