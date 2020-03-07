(function(t){function e(e){for(var r,i,s=e[0],c=e[1],u=e[2],l=0,f=[];l<s.length;l++)i=s[l],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&f.push(a[i][0]),a[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);v&&v(e);while(f.length)f.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,i=1;i<n.length;i++){var c=n[i];0!==a[c]&&(r=!1)}r&&(o.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},a={app:0},o=[];function i(t){return s.p+"js/"+({calculator:"calculator",settings:"settings"}[t]||t)+"."+{calculator:"ddef03bc",settings:"95fcc3d4"}[t]+".js"}function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(t){var e=[],n=a[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise((function(e,r){n=a[t]=[e,r]}));e.push(n[2]=r);var o,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=i(t);var u=new Error;o=function(e){c.onerror=c.onload=null,clearTimeout(l);var n=a[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;u.message="Loading chunk "+t+" failed.\n("+r+": "+o+")",u.name="ChunkLoadError",u.type=r,u.request=o,n[1](u)}a[t]=void 0}};var l=setTimeout((function(){o({type:"timeout",target:c})}),12e4);c.onerror=c.onload=o,document.head.appendChild(c)}return Promise.all(e)},s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/",s.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var v=u;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("navbar")],1),n("b-container",[n("router-view")],1)],1)},o=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-navbar",{staticClass:"mb-3",attrs:{toggleable:"lg",type:"dark",variant:"dark"}},[n("b-container",[n("b-navbar-brand",{attrs:{href:"/"}},[t._v("Enterprise refinancing")]),n("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",{staticClass:"ml-auto"},[n("b-navbar-nav",[n("b-nav-item",{attrs:{to:"/"}},[t._v("Home")]),n("b-nav-item",{attrs:{to:"/calculator"}},[t._v("Calculator")]),n("b-nav-item",{attrs:{to:"/settings"}},[t._v("Settings")])],1)],1)],1)],1)],1)},s=[],c={},u=c,l=n("2877"),v=Object(l["a"])(u,i,s,!1,null,null,null),f=v.exports,d={components:{Navbar:f}},p=d,b=Object(l["a"])(p,a,o,!1,null,null,null),m=b.exports,g=(n("d3b7"),n("8c4f")),_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",[t._v("Рефінансування підприємств")]),t._m(0),n("div",{staticClass:"w-50 m-auto"},[n("b-btn",{attrs:{block:"",variant:"primary",to:"/calculator"}},[t._v("Нове обчислення")]),n("b-btn",{attrs:{block:"",variant:"warning",to:"/calculator?test=1"}},[t._v("Приклад")])],1)])},h=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v(" Розглянемо задачу вибору, яку опишемо за допомогою наступної математичної моделі. "),n("br"),t._v(" Множину альтернатив позначимо через "),n("i",[t._v("Х")]),t._v(", і припустимо, що вона скінченна, тобто допустимі альтернативи можна перерахувати "),n("i",[t._v(" Х ")]),t._v(" = { "),n("i",[t._v(" x ")]),n("sub",[t._v("1")]),t._v(", "),n("i",[t._v(" x ")]),n("sub",[t._v("2")]),t._v(", ... , "),n("i",[t._v(" x ")]),n("sub",[t._v("n")]),t._v("}. "),n("br"),t._v(" Позначимо "),n("i",[t._v(" K ")]),t._v(" = { "),n("i",[t._v(" K ")]),n("sub",[t._v("1")]),t._v(", "),n("i",[t._v(" K ")]),n("sub",[t._v("2")]),t._v(", ... , "),n("i",[t._v(" K ")]),n("sub",[t._v("m")]),t._v("} множину критеріїв ефективності, за допомогою яких проводиться оцінка кожної альтернативи із множини "),n("i",[t._v("Х")]),t._v(". "),n("br"),t._v(" Задачу вибору можна сформулювати наступним чином: вибрати найкращу альтернативу із множини Х, коли відомі на цій множині оцінки критеріїв. ")])}],y={},w=y,O=Object(l["a"])(w,_,h,!1,null,null,null),j=O.exports;r["default"].use(g["a"]);var S=[{path:"/",name:"Home",component:j},{path:"/calculator",name:"calculator",component:function(){return n.e("calculator").then(n.bind(null,"8e22"))}},{path:"/settings",name:"Settings",component:function(){return n.e("settings").then(n.bind(null,"26d3"))}}],x=new g["a"]({mode:"history",base:"/",routes:S}),k=x,C=n("2f62"),P=(n("4de4"),n("3835")),E=n("5530"),D=n("2909"),L={criterions:JSON.parse(localStorage.getItem("settingsCriterions"))||[]},H={setData:function(t,e){t.criterions=Object(D["a"])(e),localStorage.setItem("settingsCriterions",JSON.stringify(e))}},K={},T={addSettings:function(t,e){var n=t.state,r=t.commit;n.criterions.push(Object(E["a"])({},e,{k:"K".concat(n.criterions.length+1)})),r("setData",n.criterions)},editSettings:function(t,e){var n=t.state,r=t.commit,a=Object(P["a"])(e,2),o=a[0],i=a[1];i&&(n.criterions[o]=i,r("setData",n.criterions))},removeSettings:function(t,e){var n=t.state,r=t.commit;delete n.criterions[e],r("setData",n.criterions.filter((function(t){return t})))}},$={namespaced:!0,state:L,getters:K,actions:T,mutations:H},J=n("bc3a"),M=n.n(J),N={data:null,hasresult:!1,loading:!1},R={setData:function(t,e){t.data=e},setHasResult:function(t,e){t.hasresult=e},setLoading:function(t,e){t.loading=e}},I={},q={fetchCalc:function(t,e){var n=t.commit;n("setLoading",!0),M.a.post("https://enterprise-refinancing.herokuapp.com/api/calc",e).then((function(t){n("setData",t.data),n("setHasResult",!0),n("setLoading",!1)})).catch((function(){n("setLoading",!1)}))},reset:function(t){var e=t.commit;e("setData",null),e("setHasResult",!1)}},A={namespaced:!0,state:N,getters:I,actions:q,mutations:R};r["default"].use(C["a"]);var z=new C["a"].Store({modules:{settings:$,result:A}}),B=n("5f5b"),F=n("b1e0");n("f9e3"),n("2dd8");r["default"].use(B["a"]),r["default"].use(F["a"]),r["default"].config.productionTip=!1,new r["default"]({router:k,store:z,render:function(t){return t(m)}}).$mount("#app")}});
//# sourceMappingURL=app.bafc5210.js.map