_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[13],{"97Is":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/404",function(){return n("uNx/")}])},"9ONQ":function(e,t,n){"use strict";var i=n("iVi/");function o(e,t){void 0===t&&(t={});var n=function(e){if(e&&"j"===e[0]&&":"===e[1])return e.substr(2);return e}(e);if(function(e,t){return"undefined"===typeof t&&(t=!e||"{"!==e[0]&&"["!==e[0]&&'"'!==e[0]),!t}(n,t.doNotParse))try{return JSON.parse(n)}catch(i){}return e}var r=n("Qetd"),a=function(){function e(e,t){var n=this;this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.cookies=function(e,t){return"string"===typeof e?i.parse(e,t):"object"===typeof e&&null!==e?e:{}}(e,t),new Promise((function(){n.HAS_DOCUMENT_COOKIE="object"===typeof document&&"string"===typeof document.cookie})).catch((function(){}))}return e.prototype._updateBrowserValues=function(e){this.HAS_DOCUMENT_COOKIE&&(this.cookies=i.parse(document.cookie,e))},e.prototype._emitChange=function(e){for(var t=0;t<this.changeListeners.length;++t)this.changeListeners[t](e)},e.prototype.get=function(e,t,n){return void 0===t&&(t={}),this._updateBrowserValues(n),o(this.cookies[e],t)},e.prototype.getAll=function(e,t){void 0===e&&(e={}),this._updateBrowserValues(t);var n={};for(var i in this.cookies)n[i]=o(this.cookies[i],e);return n},e.prototype.set=function(e,t,n){var o;"object"===typeof t&&(t=JSON.stringify(t)),this.cookies=r({},this.cookies,((o={})[e]=t,o)),this.HAS_DOCUMENT_COOKIE&&(document.cookie=i.serialize(e,t,n)),this._emitChange({name:e,value:t,options:n})},e.prototype.remove=function(e,t){var n=t=r({},t,{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=r({},this.cookies),delete this.cookies[e],this.HAS_DOCUMENT_COOKIE&&(document.cookie=i.serialize(e,"",n)),this._emitChange({name:e,value:void 0,options:t})},e.prototype.addChangeListener=function(e){this.changeListeners.push(e)},e.prototype.removeChangeListener=function(e){var t=this.changeListeners.indexOf(e);t>=0&&this.changeListeners.splice(t,1)},e}();t.a=a},"Hhg+":function(e,t,n){"use strict";var i=n("q1tI"),o=n.n(i),r=n("YFqc"),a=n.n(r),s=n("ZMKu"),u=o.a.createElement;t.a=function(){return u("div",null,u("div",{className:"w-full z-50 absolute"},u(s.b.div,{className:"absolute top-0 left-0 ml-2 lg:ml-4 lg:pl-4",initial:{y:"-100vh"},animate:{y:0},transition:{duration:1,delay:.2,type:"tween"}},u(a.a,{href:"/"},u("a",null,u("img",{src:"/brand.svg",alt:"Logo for the NXT Door Deals brand",className:"w-24 h-24 xl:w-28 xl:h-28 z-50"}))))))}},YFqc:function(e,t,n){e.exports=n("cTJO")},cTJO:function(e,t,n){"use strict";var i=n("J4zp"),o=n("284h");t.__esModule=!0,t.default=void 0;var r,a=o(n("q1tI")),s=n("elyg"),u=(n("g/15"),n("nOHt")),c=new Map,l=window.IntersectionObserver,f={};var p=function(e,t){var n=r||(l?r=new l((function(e){e.forEach((function(e){if(c.has(e.target)){var t=c.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(r.unobserve(e.target),c.delete(e.target),t())}}))}),{rootMargin:"200px"}):void 0);return n?(n.observe(e),c.set(e,t),function(){try{n.unobserve(e)}catch(t){console.error(t)}c.delete(e)}):function(){}};function d(e,t,n,i){(0,s.isLocalURL)(t)&&(e.prefetch(t,n,i).catch((function(e){0})),f[t+"%"+n]=!0)}var m=function(e){var t=!1!==e.prefetch,n=a.default.useState(),o=i(n,2),r=o[0],c=o[1],m=(0,u.useRouter)(),h=m&&m.pathname||"/",v=a.default.useMemo((function(){var t=(0,s.resolveHref)(h,e.href);return{href:t,as:e.as?(0,s.resolveHref)(h,e.as):t}}),[h,e.href,e.as]),g=v.href,y=v.as;a.default.useEffect((function(){if(t&&l&&r&&r.tagName&&(0,s.isLocalURL)(g)&&!f[g+"%"+y])return p(r,(function(){d(m,g,y)}))}),[t,r,g,y,m]);var b=e.children,w=e.replace,x=e.shallow,N=e.scroll;"string"===typeof b&&(b=a.default.createElement("a",null,b));var E=a.Children.only(b),_={ref:function(e){e&&c(e),E&&"object"===typeof E&&E.ref&&("function"===typeof E.ref?E.ref(e):"object"===typeof E.ref&&(E.ref.current=e))},onClick:function(e){E.props&&"function"===typeof E.props.onClick&&E.props.onClick(e),e.defaultPrevented||function(e,t,n,i,o,r,a){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,s.isLocalURL)(n))&&(e.preventDefault(),null==a&&(a=i.indexOf("#")<0),t[o?"replace":"push"](n,i,{shallow:r}).then((function(e){e&&a&&(window.scrollTo(0,0),document.body.focus())})))}(e,m,g,y,w,x,N)}};return t&&(_.onMouseEnter=function(e){(0,s.isLocalURL)(g)&&(E.props&&"function"===typeof E.props.onMouseEnter&&E.props.onMouseEnter(e),d(m,g,y,{priority:!0}))}),!e.passHref&&("a"!==E.type||"href"in E.props)||(_.href=(0,s.addBasePath)(y)),a.default.cloneElement(E,_)};t.default=m},"iVi/":function(e,t,n){"use strict";t.parse=function(e,t){if("string"!==typeof e)throw new TypeError("argument str must be a string");for(var n={},o=t||{},a=e.split(r),u=o.decode||i,c=0;c<a.length;c++){var l=a[c],f=l.indexOf("=");if(!(f<0)){var p=l.substr(0,f).trim(),d=l.substr(++f,l.length).trim();'"'==d[0]&&(d=d.slice(1,-1)),void 0==n[p]&&(n[p]=s(d,u))}}return n},t.serialize=function(e,t,n){var i=n||{},r=i.encode||o;if("function"!==typeof r)throw new TypeError("option encode is invalid");if(!a.test(e))throw new TypeError("argument name is invalid");var s=r(t);if(s&&!a.test(s))throw new TypeError("argument val is invalid");var u=e+"="+s;if(null!=i.maxAge){var c=i.maxAge-0;if(isNaN(c)||!isFinite(c))throw new TypeError("option maxAge is invalid");u+="; Max-Age="+Math.floor(c)}if(i.domain){if(!a.test(i.domain))throw new TypeError("option domain is invalid");u+="; Domain="+i.domain}if(i.path){if(!a.test(i.path))throw new TypeError("option path is invalid");u+="; Path="+i.path}if(i.expires){if("function"!==typeof i.expires.toUTCString)throw new TypeError("option expires is invalid");u+="; Expires="+i.expires.toUTCString()}i.httpOnly&&(u+="; HttpOnly");i.secure&&(u+="; Secure");if(i.sameSite){switch("string"===typeof i.sameSite?i.sameSite.toLowerCase():i.sameSite){case!0:u+="; SameSite=Strict";break;case"lax":u+="; SameSite=Lax";break;case"strict":u+="; SameSite=Strict";break;case"none":u+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return u};var i=decodeURIComponent,o=encodeURIComponent,r=/; */,a=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function s(e,t){try{return t(e)}catch(n){return e}}},"uNx/":function(e,t,n){"use strict";n.r(t);var i=n("q1tI"),o=n.n(i),r=n("IYH+"),a=n("nOHt"),s=n.n(a),u=n("ZMKu"),c=n("9ONQ"),l=n("Hhg+"),f=o.a.createElement,p=new c.a;t.default=function(){var e=Object(i.useContext)(r.a),t=e.loadUser,n=e.user,o=e.logout;return Object(i.useEffect)((function(){t()}),[]),f(i.Fragment,null,f(l.a,null),f("div",{className:"flex justify-center items-center pt-16 -z-20"},f("img",{src:"/images/error/404.svg",alt:"404 not found",height:"600px",width:"600px"})),f("div",{className:"font-axiforma text-brand-gray text-center ml-2 mr-2"},f("h1",{className:"text-2xl font-bold pb-2"},"This page does not exist yet!"),f("p",{className:"text-base"},"Sorry! The page you were looking for could not be found at this time. However, here are some pages you might be interested in.")),f("div",{className:"flex justify-center items-center mt-6"},p.get("nddToken")?f("div",{className:"flex-col"},f(u.b.button,{initial:{x:"-100vw"},animate:{x:0},transition:{delay:.2,duration:1},className:"btn-style bg-purple-500 mb-4 md:mr-6 md:mb-0 focus:outline-none",onClick:function(){s.a.push("/")}},"Home"),f(u.b.button,{initial:{y:"100vh"},animate:{y:0},transition:{delay:.4,duration:1},className:"btn-style bg-brand-purple mb-4 md:mr-6 md:mb-0 focus:outline-none",onClick:function(){null!==n&&s.a.push("/ads/".concat(n.apartment_name))}},"My Neighbourhood"),f(u.b.button,{initial:{x:"100vw"},animate:{x:0},transition:{delay:.7,duration:1},className:"btn-style bg-gray-500 mb-4 md:mr-6 md:mb-0 focus:outline-none",onClick:function(){o(),s.a.push("/login")}},"Logout")):f("div",{className:"flex flex-col md:flex-row"},f(u.b.button,{initial:{x:"-100vw"},animate:{x:0},transition:{delay:.2,duration:.5},className:"btn-style bg-purple-500 mb-4 md:mr-6 md:mb-0 focus:outline-none",onClick:function(){s.a.push("/")}},"Home"),f(u.b.button,{initial:{y:"100vh"},animate:{y:0},transition:{delay:.4,duration:.5},className:"btn-style bg-brand-purple mb-4 md:mr-6 md:mb-0 focus:outline-none",onClick:function(){s.a.push("/registeruser")}},"Register"),f(u.b.button,{initial:{x:"100vw"},animate:{x:0},transition:{delay:.7,duration:.5},className:"btn-style bg-gray-500 mb-4 md:mr-6 md:mb-0 focus:outline-none",onClick:function(){s.a.push("/login")}},"Login"))))}}},[["97Is",0,1,3,2,4]]]);