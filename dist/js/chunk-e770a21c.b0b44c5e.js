(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e770a21c"],{5246:function(t,e,n){"use strict";n("68ef"),n("9d70"),n("3743"),n("8a0b")},"6b41":function(t,e,n){"use strict";var i=n("d282"),r=n("b1d2"),o=n("ad06"),a=Object(i["a"])("nav-bar"),s=a[0],c=a[1];e["a"]=s({props:{title:String,fixed:Boolean,zIndex:[Number,String],leftText:String,rightText:String,leftArrow:Boolean,placeholder:Boolean,safeAreaInsetTop:Boolean,border:{type:Boolean,default:!0}},data:function(){return{height:null}},mounted:function(){this.placeholder&&this.fixed&&(this.height=this.$refs.navBar.getBoundingClientRect().height)},methods:{genLeft:function(){var t=this.$createElement,e=this.slots("left");return e||[this.leftArrow&&t(o["a"],{class:c("arrow"),attrs:{name:"arrow-left"}}),this.leftText&&t("span",{class:c("text")},[this.leftText])]},genRight:function(){var t=this.$createElement,e=this.slots("right");return e||(this.rightText?t("span",{class:c("text")},[this.rightText]):void 0)},genNavBar:function(){var t,e=this.$createElement;return e("div",{ref:"navBar",style:{zIndex:this.zIndex},class:[c({fixed:this.fixed,"safe-area-inset-top":this.safeAreaInsetTop}),(t={},t[r["a"]]=this.border,t)]},[e("div",{class:c("content")},[this.hasLeft()&&e("div",{class:c("left"),on:{click:this.onClickLeft}},[this.genLeft()]),e("div",{class:[c("title"),"van-ellipsis"]},[this.slots("title")||this.title]),this.hasRight()&&e("div",{class:c("right"),on:{click:this.onClickRight}},[this.genRight()])])])},hasLeft:function(){return this.leftArrow||this.leftText||this.slots("left")},hasRight:function(){return this.rightText||this.slots("right")},onClickLeft:function(t){this.$emit("click-left",t)},onClickRight:function(t){this.$emit("click-right",t)}},render:function(){var t=arguments[0];return this.placeholder&&this.fixed?t("div",{class:c("placeholder"),style:{height:this.height+"px"}},[this.genNavBar()]):this.genNavBar()}})},"8a0b":function(t,e,n){},"8ab4":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("van-nav-bar",{attrs:{title:t.aboutTitle,"left-arrow":t.leftArrow},on:{"click-left":t.onClickLeft}}),n("router-view")],1)},r=[],o=(n("b0c0"),n("ade3")),a=(n("5246"),n("6b41")),s={name:"About",components:Object(o["a"])({},a["a"].name,a["a"]),props:{},data:function(){return{aboutTitle:"个人中心",leftArrow:!1}},watch:{},computed:{},methods:{onClickLeft:function(){this.$router.go(-1)},navBarInfo:function(t){this.aboutTitle=t.meta.title,this.leftArrow=t.meta.leftArrowShow}},created:function(){},mounted:function(){},beforeRouteEnter:function(t,e,n){n((function(e){e.navBarInfo(t)}))},beforeRouteUpdate:function(t,e,n){console.log(t),this.navBarInfo(t),n()}},c=s,l=n("2877"),f=Object(l["a"])(c,i,r,!1,null,"77011a56",null);e["default"]=f.exports},ade3:function(t,e,n){"use strict";function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return i}))},b0c0:function(t,e,n){var i=n("83ab"),r=n("9bf2").f,o=Function.prototype,a=o.toString,s=/^\s*function ([^ (]*)/,c="name";i&&!(c in o)&&r(o,c,{configurable:!0,get:function(){try{return a.call(this).match(s)[1]}catch(t){return""}}})},b1d2:function(t,e,n){"use strict";n.d(e,"f",(function(){return i})),n.d(e,"d",(function(){return o})),n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return s})),n.d(e,"c",(function(){return c})),n.d(e,"e",(function(){return l}));var i="#fff",r="van-hairline",o=r+"--top",a=r+"--left",s=r+"--bottom",c=r+"--surround",l=r+"--top-bottom"}}]);
//# sourceMappingURL=chunk-e770a21c.b0b44c5e.js.map