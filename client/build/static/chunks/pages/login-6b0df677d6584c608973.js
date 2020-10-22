_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[19],{O2ls:function(e,t,o){"use strict";o.r(t);var n=o("q1tI"),a=o.n(n),r=o("a6RD"),i=o.n(r),l=o("9ONQ"),s=o("IYH+"),c=o("KYPV"),d=o("UGp+"),m=o("YFqc"),p=o.n(m),u=o("nOHt"),g=o.n(u),h=o("ZMKu"),b=o("IP2g"),x=o("wHSu"),w=o("twK/"),f=o("lski"),y=a.a.createElement,v=d.a({email:d.c().required("Please enter your registered email id").email("Please enter a valid email id").trim(),password:d.c().required("Please enter your password").trim()}),N=function(){var e=Object(n.useState)(!1),t=e[0],o=e[1],a=Object(n.useContext)(s.a),r=a.loginUser,i=a.isAuthenticated,l=a.loadUser,d=a.user,m=a.authError;Object(n.useEffect)((function(){i&&l(),null!==d&&g.a.push("/ads/".concat(d.apartment_name))}),[i,d]);var u=function(){o(!t)};return y("div",{className:"rounded-md shadow-boxshadowlogin z-50 bg-white pt-5 pl-10 pr-10 pb-10"},y(c.c,{initialValues:{email:"",password:""},validationSchema:v,onSubmit:function(e,t){var o=t.setSubmitting;o(!0),r(e.email,e.password),o(!1)}},(function(e){return y("div",null,y("h2",{className:"font-axiforma font-bold text-3xl text-center text-brand-gray tracking-wide mb-4"},"Welcome Back!"),y(f.a,{authError:m,alertTheme:"bg-purple-200 text-brand-purple"}),y(c.b,null,y("div",{className:'"flex items-center justify-center relative border-2 rounded-md " '.concat(e.touched.email&&e.errors.email?"mb-1 border-red-800":"mb-8 border-gray-300")},y(b.a,{icon:x.h,className:"inline align-middle fill-current text-gray-600 text-lg opacity-50 ml-2"}),y(c.a,{id:"email",name:"email",type:"text",placeholder:"Email",maxLength:"50",autoComplete:"off",autoFocus:"",className:"textbox-input w-10/12 placeholder-purple-900 placeholder-opacity-50"})),e.touched.email&&e.errors.email?y("div",{className:"font-axiforma text-xs text-red-800 p-1 mb-2"},y(b.a,{icon:x.i})," ",e.errors.email):null,y("div",{className:'"flex items-center justify-center relative border-2 rounded-md " '.concat(e.touched.password&&e.errors.password?"mb-1 border-red-800":"mb-8 border-gray-300")},y(b.a,{icon:x.n,className:"inline align-middle fill-current text-gray-600 text-lg opacity-50 ml-2"}),y(c.a,{id:"password",name:"password",type:t?"text":"password",placeholder:"Password",maxLength:"50",className:"textbox-input md:w-10/12 placeholder-purple-900 placeholder-opacity-50"}),y(b.a,{icon:t?w.b:w.a,className:"absolute text-sm align-middle top-0 right-0 mt-4 mr-2 opacity-50 cursor-pointer",onClick:u,"aria-label":t?"Hide Password":"Show Password"})),e.touched.password&&e.errors.password?y("div",{className:"font-axiforma text-xs text-red-800 p-1 mt-1 mb-2 "},y(b.a,{icon:x.i})," ",e.errors.password):null,y("div",{className:"text-center"},y(h.b.button,{type:"submit",className:"mt-2 mb-8 w-64 md:w-100 h-12 bg-purple-500 text-white font-axiforma font-bold rounded-md uppercase tracking-wide focus:outline-none",whileTap:{backgroundColor:"#D6BCFA",color:"#550052",y:"5px",boxShadow:"0px 8px 15px rgba(270, 90, 56, 0.15)"}},"Login"))),y("div",{className:"text-center font-axiforma text-purple-600 text-sm tracking-wide"},y(p.a,{href:"/forgotpassword"},y(h.b.a,{whileHover:{textDecoration:"underline",cursor:"pointer",color:"#550052",textDecorationColor:"#550052"}},"Forgot password?"))),y("div",{className:"font-axiforma text-purple-600 text-center mt-6 text-sm  lg:text-md"},"Don't have an account?"," ",y(h.b.button,{className:"ml-2 inline bg-opacity-25 bg-purple-400 text-brand-gray p-3 shadow-sm z-30 font-semibold focus:outline-none",whileHover:{backgroundColor:"#550052",color:"#FFFFFF"},onClick:function(){g.a.push("/registeruser")},"aria-label":"Button for the user registration page"},"Sign Up")))})))},D=o("8Kt/"),T=o.n(D),_=o("u8yp"),k=a.a.createElement,P=function(e){return k(n.Fragment,null,k(T.a,null,k(_.a,null),k("title",null,"NXT Door Deals | User Login"),k("meta",{name:"description",content:"Log into your NXT Door Deals account. NXT Door Deals is your one-stop shop to find amazing deals within your apartment complex, gated community or housing society."}),k("meta",{property:"og:locale",content:"en_US"}),k("meta",{property:"og:type",content:"website"}),k("meta",{property:"og:title",content:"NXT Door Deals | Login To Your Account"}),k("meta",{property:"og:description",content:"Log into your NXT Door Deals account. NXT Door Deals is your one-stop shop to find amazing deals within your apartment complex, gated community or housing society"}),k("meta",{property:"og:url",content:"https://nxtdoordeals.com/login"}),k("meta",{property:"og:site_name",content:"NXT Door Deals"}),k("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:'[\n              {\n                "@id": "https://nxtdoordeals.com/#website",\n                "@type": [\n                  "http://schema.org/WebSite"\n                ],\n                "http://schema.org/description": [\n                  {\n                    "@value": "NXT Door Deals is your one-stop shop to find amazing deals within your apartment complex, gated community or housing society."\n                  }\n                ],\n                "http://schema.org/inLanguage": [\n                  {\n                    "@value": "en"\n                  }\n                ],\n                "http://schema.org/url": [\n                  {\n                    "@id": "https://nxtdoordeals.com/"\n                  }\n                ]\n              },\n              {\n                "@id": "https://nxtdoordeals.com/login/#webpage",\n                "@type": [\n                  "http://schema.org/WebPage"\n                ],\n                "http://schema.org/datePublished": [\n                  {\n                    "@type": "http://schema.org/Date",\n                    "@value": "2020-10-15T00:00:00+00:00"\n                  }\n                ],\n                "http://schema.org/description": [\n                  {\n                    "@value": "Log into your NXT Dooe Deals account. NXT Door Deals is your one-stop shop to find amazing deals for preloved items in your neighbourhood."\n                  }\n                ],\n                "http://schema.org/inLanguage": [\n                  {\n                    "@value": "en"\n                  }\n                ],\n                "http://schema.org/isPartOf": [\n                  {\n                    "@id": "https://nxtdoordeals.com/#website"\n                  }\n                ],\n                "http://schema.org/potentialAction": [\n                  {\n                    "@type": [\n                      "http://schema.org/ReadAction"\n                    ],\n                    "http://schema.org/target": [\n                      {\n                        "@value": "https://nxtdoordeals.com/login"\n                      }\n                    ]\n                  }\n                ],\n                "http://schema.org/url": [\n                  {\n                    "@id": "https://nxtdoordeals.com/login"\n                  }\n                ]\n              }\n            ]'}})),e.children)},E=o("Hhg+"),F=a.a.createElement,L=i()((function(){return o.e(9).then(o.bind(null,"mzvJ"))}),{loadableGenerated:{webpack:function(){return["mzvJ"]},modules:["../components/utils/AlreadyLoggedIn"]}}),X=new l.a;t.default=function(){return X.get("nddToken")?F("div",null,F("div",{className:"h-full bg-cover bg-no-repeat"},F(L,null))):F(P,null,F(n.Fragment,null,F(E.a,null),F("div",{className:"flex justify-center items-center h-screen bg-login-background bg-cover bg-no-repeat overflow-hidden -z-20"},F("div",{className:"ml-12 mr-12 pt-16 lg:pt-0"},F(N,null)))))}},u6Hu:function(e,t,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return o("O2ls")}])}},[["u6Hu",0,1,3,5,2,4,6,7,8]]]);