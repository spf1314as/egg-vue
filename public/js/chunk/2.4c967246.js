(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"6b8C":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,n=r("4d7F"),a=(i=n)&&i.__esModule?i:{default:i};e.default={computed:{article:function(){return this.$store.state.article}},preFetch:function(t){var e=t.state,r=t.dispatch,i=(t.commit,e.route.params.id);return a.default.all([r("FETCH_ARTICLE_DETAIL",{id:i})])},beforeMount:function(){var t=this.$store.state.route.params.id;return a.default.all([this.$store.dispatch("FETCH_ARTICLE_DETAIL",{id:t})])}}},fihk:function(t,e,r){"use strict";r.d(e,"a",function(){return i}),r.d(e,"b",function(){return n});var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticStyle:{"font-size":"24px","text-align":"center"}},[r("h1",[t._v(t._s(t.article.title))]),t._v(" "),r("iframe",{attrs:{src:t.article.url,frameborder:"0",width:"100%",height:"600"}})])},n=[];i._withStripped=!0},j1Cf:function(t,e,r){"use strict";r.r(e);var i=r("6b8C"),n=r.n(i);for(var a in i)"default"!==a&&function(t){r.d(e,t,function(){return i[t]})}(a);var u=r("fihk"),o=r("yOOj");var c=function(t){r("wg9v")},s=Object(o.a)(n.a,u.a,u.b,!1,c,null,null);s.options.__file="app/web/page/detail.vue",e.default=s.exports},wg9v:function(t,e,r){}}]);