(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-492941f7"],{"390a":function(t,n,e){},"48f4":function(t,n,e){"use strict";function i(t){return"NavigationDuplicated"===t.name||t.message&&-1!==t.message.indexOf("redundant navigation")}function r(t,n){var e=n.to,r=n.url,a=n.replace;if(e&&t){var o=t[a?"replace":"push"](e);o&&o.catch&&o.catch((function(t){if(t&&!i(t))throw t}))}else r&&(a?location.replace(r):location.href=r)}function a(t){r(t.parent&&t.parent.$router,t.props)}e.d(n,"b",(function(){return r})),e.d(n,"a",(function(){return a})),e.d(n,"c",(function(){return o}));var o={url:String,replace:Boolean,to:[String,Object]}},9312:function(t,n,e){},9884:function(t,n,e){"use strict";e.d(n,"a",(function(){return r})),e.d(n,"b",(function(){return a}));var i=e("db85");function r(t,n){var e,r;void 0===n&&(n={});var a=n.indexKey||"index";return{inject:(e={},e[t]={default:null},e),computed:(r={parent:function(){return this.disableBindRelation?null:this[t]}},r[a]=function(){return this.bindRelation(),this.parent?this.parent.children.indexOf(this):null},r),watch:{disableBindRelation:function(t){t||this.bindRelation()}},mounted:function(){this.bindRelation()},beforeDestroy:function(){var t=this;this.parent&&(this.parent.children=this.parent.children.filter((function(n){return n!==t})))},methods:{bindRelation:function(){if(this.parent&&-1===this.parent.children.indexOf(this)){var t=[].concat(this.parent.children,[this]);Object(i["a"])(t,this.parent),this.parent.children=t}}}}}function a(t){return{provide:function(){var n;return n={},n[t]=this,n},data:function(){return{children:[]}}}}},ade3:function(t,n,e){"use strict";function i(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}e.d(n,"a",(function(){return i}))},ae73:function(t,n,e){},b0c0:function(t,n,e){var i=e("83ab"),r=e("9bf2").f,a=Function.prototype,o=a.toString,c=/^\s*function ([^ (]*)/,u="name";i&&!(u in a)&&r(a,u,{configurable:!0,get:function(){try{return o.call(this).match(c)[1]}catch(t){return""}}})},b1d2:function(t,n,e){"use strict";e.d(n,"f",(function(){return i})),e.d(n,"d",(function(){return a})),e.d(n,"b",(function(){return o})),e.d(n,"a",(function(){return c})),e.d(n,"c",(function(){return u})),e.d(n,"e",(function(){return s}));var i="#fff",r="van-hairline",a=r+"--top",o=r+"--left",c=r+"--bottom",u=r+"--surround",s=r+"--top-bottom"},d504:function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"index"},[e("router-view"),e("div",{staticClass:"bottomNav"},[e("van-tabbar",{on:{change:t.onChange},model:{value:t.active,callback:function(n){t.active=n},expression:"active"}},[e("van-tabbar-item",{attrs:{icon:"home-o"}},[t._v("主页")]),e("van-tabbar-item",{attrs:{icon:"plus"}},[t._v("新增")]),e("van-tabbar-item",{attrs:{icon:"search"}},[t._v("搜索")]),e("van-tabbar-item",{attrs:{icon:"friends-o"}},[t._v("我的")])],1)],1)],1)},r=[],a=(e("b0c0"),e("ade3")),o=(e("68ef"),e("9d70"),e("3743"),e("ae73"),e("c31d")),c=e("d282"),u=e("a142"),s=e("48f4"),h=e("9884"),f=e("ad06"),d=e("6f2f"),l=Object(c["a"])("tabbar-item"),b=l[0],v=l[1],p=b({mixins:[Object(h["a"])("vanTabbar")],props:Object(o["a"])({},s["c"],{dot:Boolean,icon:String,name:[Number,String],info:[Number,String],badge:[Number,String],iconPrefix:String}),data:function(){return{active:!1}},computed:{routeActive:function(){var t=this.to,n=this.$route;if(t&&n){var e=Object(u["e"])(t)?t:{path:t},i=e.path===n.path,r=Object(u["c"])(e.name)&&e.name===n.name;return i||r}}},methods:{onClick:function(t){this.parent.onChange(this.name||this.index),this.$emit("click",t),Object(s["b"])(this.$router,this)},genIcon:function(t){var n=this.$createElement,e=this.slots("icon",{active:t});return e||(this.icon?n(f["a"],{attrs:{name:this.icon,classPrefix:this.iconPrefix}}):void 0)}},render:function(){var t,n=arguments[0],e=this.parent.route?this.routeActive:this.active,i=this.parent[e?"activeColor":"inactiveColor"];return n("div",{class:v({active:e}),style:{color:i},on:{click:this.onClick}},[n("div",{class:v("icon")},[this.genIcon(e),n(d["a"],{attrs:{dot:this.dot,info:null!=(t=this.badge)?t:this.info}})]),n("div",{class:v("text")},[this.slots("default",{active:e})])])}}),m=(e("9312"),e("b1d2"));function g(t){var n=t.interceptor,e=t.args,i=t.done;if(n){var r=n.apply(void 0,e);Object(u["f"])(r)?r.then((function(t){t&&i()})).catch(u["h"]):r&&i()}else i()}var x,O=Object(c["a"])("tabbar"),$=O[0],j=O[1],C=$({mixins:[Object(h["b"])("vanTabbar")],props:{route:Boolean,zIndex:[Number,String],placeholder:Boolean,activeColor:String,beforeChange:Function,inactiveColor:String,value:{type:[Number,String],default:0},border:{type:Boolean,default:!0},fixed:{type:Boolean,default:!0},safeAreaInsetBottom:{type:Boolean,default:null}},data:function(){return{height:null}},computed:{fit:function(){return null!==this.safeAreaInsetBottom?this.safeAreaInsetBottom:this.fixed}},watch:{value:"setActiveItem",children:"setActiveItem"},mounted:function(){this.placeholder&&this.fixed&&(this.height=this.$refs.tabbar.getBoundingClientRect().height)},methods:{setActiveItem:function(){var t=this;this.children.forEach((function(n,e){n.active=(n.name||e)===t.value}))},onChange:function(t){var n=this;t!==this.value&&g({interceptor:this.beforeChange,args:[t],done:function(){n.$emit("input",t),n.$emit("change",t)}})},genTabbar:function(){var t,n=this.$createElement;return n("div",{ref:"tabbar",style:{zIndex:this.zIndex},class:[(t={},t[m["e"]]=this.border,t),j({unfit:!this.fit,fixed:this.fixed})]},[this.slots()])}},render:function(){var t=arguments[0];return this.placeholder&&this.fixed?t("div",{class:j("placeholder"),style:{height:this.height+"px"}},[this.genTabbar()]):this.genTabbar()}}),I={name:"index",components:(x={},Object(a["a"])(x,C.name,C),Object(a["a"])(x,p.name,p),x),props:{},data:function(){return{active:0}},watch:{},computed:{},methods:{onChange:function(t){switch(t){case 0:this.$router.push({name:"Index"});break;case 1:this.$router.push({name:"Note"});break;case 2:this.$router.push({name:"Search"});break;case 3:this.$router.push({name:"About"});break;default:this.$router.push({name:"Index"})}},tabbarActive:function(t){this.active=t.meta.active}},created:function(){},mounted:function(){},beforeRouteEnter:function(t,n,e){e((function(n){n.tabbarActive(t)}))},beforeRouteUpdate:function(t,n,e){this.tabbarActive(t),e()}},w=I,y=(e("e4f7"),e("2877")),B=Object(y["a"])(w,i,r,!1,null,"ac36d416",null);n["default"]=B.exports},db85:function(t,n,e){"use strict";function i(t){var n=[];function e(t){t.forEach((function(t){n.push(t),t.componentInstance&&e(t.componentInstance.$children.map((function(t){return t.$vnode}))),t.children&&e(t.children)}))}return e(t),n}function r(t,n){var e=n.$vnode.componentOptions;if(e&&e.children){var r=i(e.children);t.sort((function(t,n){return r.indexOf(t.$vnode)-r.indexOf(n.$vnode)}))}}e.d(n,"a",(function(){return r}))},e4f7:function(t,n,e){"use strict";e("390a")}}]);
//# sourceMappingURL=chunk-492941f7.c4c95442.js.map