(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5bfe86e5"],{"0a6e":function(t,e,n){},"0e9d":function(t,e,n){},2381:function(t,e,n){},"38d5":function(t,e,n){"use strict";n("68ef")},"3acc":function(t,e,n){"use strict";var i=n("d282"),a=n("78eb"),o=n("9884"),r=Object(i["a"])("checkbox-group"),s=r[0],c=r[1];e["a"]=s({mixins:[Object(o["b"])("vanCheckbox"),a["a"]],props:{max:[Number,String],disabled:Boolean,direction:String,iconSize:[Number,String],checkedColor:String,value:{type:Array,default:function(){return[]}}},watch:{value:function(t){this.$emit("change",t)}},methods:{toggleAll:function(t){if(!1!==t){var e=this.children;t||(e=e.filter((function(t){return!t.checked})));var n=e.map((function(t){return t.name}));this.$emit("input",n)}else this.$emit("input",[])}},render:function(){var t=arguments[0];return t("div",{class:c([this.direction])},[this.slots()])}})},"3c32":function(t,e,n){"use strict";n("68ef"),n("9d70"),n("3743"),n("2381")},"417e":function(t,e,n){"use strict";var i=n("d282"),a=n("ad06"),o=n("78eb"),r=n("9884"),s=n("ea8e"),c=function(t){var e=t.parent,n=t.bem,i=t.role;return{mixins:[Object(r["a"])(e),o["a"]],props:{name:null,value:null,disabled:Boolean,iconSize:[Number,String],checkedColor:String,labelPosition:String,labelDisabled:Boolean,shape:{type:String,default:"round"},bindGroup:{type:Boolean,default:!0}},computed:{disableBindRelation:function(){return!this.bindGroup},isDisabled:function(){return this.parent&&this.parent.disabled||this.disabled},direction:function(){return this.parent&&this.parent.direction||null},iconStyle:function(){var t=this.checkedColor||this.parent&&this.parent.checkedColor;if(t&&this.checked&&!this.isDisabled)return{borderColor:t,backgroundColor:t}},tabindex:function(){return this.isDisabled||"radio"===i&&!this.checked?-1:0}},methods:{onClick:function(t){var e=this,n=t.target,i=this.$refs.icon,a=i===n||i.contains(n);this.isDisabled||!a&&this.labelDisabled?this.$emit("click",t):(this.toggle(),setTimeout((function(){e.$emit("click",t)})))},genIcon:function(){var t=this.$createElement,e=this.checked,i=this.iconSize||this.parent&&this.parent.iconSize;return t("div",{ref:"icon",class:n("icon",[this.shape,{disabled:this.isDisabled,checked:e}]),style:{fontSize:Object(s["a"])(i)}},[this.slots("icon",{checked:e})||t(a["a"],{attrs:{name:"success"},style:this.iconStyle})])},genLabel:function(){var t=this.$createElement,e=this.slots();if(e)return t("span",{class:n("label",[this.labelPosition,{disabled:this.isDisabled}])},[e])}},render:function(){var t=arguments[0],e=[this.genIcon()];return"left"===this.labelPosition?e.unshift(this.genLabel()):e.push(this.genLabel()),t("div",{attrs:{role:i,tabindex:this.tabindex,"aria-checked":String(this.checked)},class:n([{disabled:this.isDisabled,"label-disabled":this.labelDisabled},this.direction]),on:{click:this.onClick}},[e])}}},l=Object(i["a"])("checkbox"),u=l[0],d=l[1];e["a"]=u({mixins:[c({bem:d,role:"checkbox",parent:"vanCheckbox"})],computed:{checked:{get:function(){return this.parent?-1!==this.parent.value.indexOf(this.name):this.value},set:function(t){this.parent?this.setParentValue(t):this.$emit("input",t)}}},watch:{value:function(t){this.$emit("change",t)}},methods:{toggle:function(t){var e=this;void 0===t&&(t=!this.checked),clearTimeout(this.toggleTask),this.toggleTask=setTimeout((function(){e.checked=t}))},setParentValue:function(t){var e=this.parent,n=e.value.slice();if(t){if(e.max&&n.length>=e.max)return;-1===n.indexOf(this.name)&&(n.push(this.name),e.$emit("input",n))}else{var i=n.indexOf(this.name);-1!==i&&(n.splice(i,1),e.$emit("input",n))}}}})},"66b9":function(t,e,n){"use strict";n("68ef"),n("9d70"),n("3743"),n("e3b3"),n("bc1b")},"772a":function(t,e,n){"use strict";var i=n("d282"),a=n("db85"),o=Object(i["a"])("form"),r=o[0],s=o[1];e["a"]=r({props:{colon:Boolean,labelWidth:[Number,String],labelAlign:String,inputAlign:String,scrollToError:Boolean,validateFirst:Boolean,errorMessageAlign:String,submitOnEnter:{type:Boolean,default:!0},validateTrigger:{type:String,default:"onBlur"},showError:{type:Boolean,default:!0},showErrorMessage:{type:Boolean,default:!0}},provide:function(){return{vanForm:this}},data:function(){return{fields:[]}},methods:{validateSeq:function(){var t=this;return new Promise((function(e,n){var i=[];t.fields.reduce((function(t,e){return t.then((function(){if(!i.length)return e.validate().then((function(t){t&&i.push(t)}))}))}),Promise.resolve()).then((function(){i.length?n(i):e()}))}))},validateAll:function(){var t=this;return new Promise((function(e,n){Promise.all(t.fields.map((function(t){return t.validate()}))).then((function(t){t=t.filter((function(t){return t})),t.length?n(t):e()}))}))},validate:function(t){return t?this.validateField(t):this.validateFirst?this.validateSeq():this.validateAll()},validateField:function(t){var e=this.fields.filter((function(e){return e.name===t}));return e.length?new Promise((function(t,n){e[0].validate().then((function(e){e?n(e):t()}))})):Promise.reject()},resetValidation:function(t){this.fields.forEach((function(e){t&&e.name!==t||e.resetValidation()}))},scrollToField:function(t,e){this.fields.some((function(n){return n.name===t&&(n.$el.scrollIntoView(e),!0)}))},addField:function(t){this.fields.push(t),Object(a["a"])(this.fields,this)},removeField:function(t){this.fields=this.fields.filter((function(e){return e!==t}))},getValues:function(){return this.fields.reduce((function(t,e){return t[e.name]=e.formValue,t}),{})},onSubmit:function(t){t.preventDefault(),this.submit()},submit:function(){var t=this,e=this.getValues();this.validate().then((function(){t.$emit("submit",e)})).catch((function(n){t.$emit("failed",{values:e,errors:n}),t.scrollToError&&t.scrollToField(n[0].name)}))}},render:function(){var t=arguments[0];return t("form",{class:s(),on:{submit:this.onSubmit}},[this.slots()])}})},"78eb":function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var i={inject:{vanField:{default:null}},watch:{value:function(){var t=this.vanField;t&&(t.resetValidation(),t.validateWithTrigger("onChange"))}},created:function(){var t=this.vanField;t&&!t.children&&(t.children=this)}}},"8a58":function(t,e,n){"use strict";n("68ef"),n("a71a"),n("9d70"),n("3743"),n("4d75")},9884:function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return o}));var i=n("db85");function a(t,e){var n,a;void 0===e&&(e={});var o=e.indexKey||"index";return{inject:(n={},n[t]={default:null},n),computed:(a={parent:function(){return this.disableBindRelation?null:this[t]}},a[o]=function(){return this.bindRelation(),this.parent?this.parent.children.indexOf(this):null},a),watch:{disableBindRelation:function(t){t||this.bindRelation()}},mounted:function(){this.bindRelation()},beforeDestroy:function(){var t=this;this.parent&&(this.parent.children=this.parent.children.filter((function(e){return e!==t})))},methods:{bindRelation:function(){if(this.parent&&-1===this.parent.children.indexOf(this)){var t=[].concat(this.parent.children,[this]);Object(i["a"])(t,this.parent),this.parent.children=t}}}}}function o(t){return{provide:function(){var e;return e={},e[t]=this,e},data:function(){return{children:[]}}}}},a55b:function(t,e,n){"use strict";n.r(e);var i,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"register"},[n("van-nav-bar",{attrs:{title:"登录","left-arrow":""},on:{"click-left":t.onClickLeft}}),n("div",{staticClass:"registerForm"},[n("van-form",{on:{submit:t.onSubmit}},[n("van-field",{attrs:{name:"useremail",label:"邮箱",placeholder:"邮箱",rules:[{validator:t.testEmail,required:!0,message:"请填写邮箱"}]},model:{value:t.useremail,callback:function(e){t.useremail=e},expression:"useremail"}}),n("van-field",{attrs:{type:"password",name:"password",label:"密码",placeholder:"密码",rules:[{required:!0,message:"请填写密码"}]},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),n("div",{staticClass:"toRegister"},[t._v("还没有账号？"),n("router-link",{attrs:{to:{name:"Register"}}},[t._v("立即注册")])],1),n("div",{staticStyle:{margin:"16px"}},[n("van-button",{attrs:{round:"",block:"",type:"info","native-type":"submit"}},[t._v(" 登录 ")])],1)],1)],1)],1)},o=[],r=(n("b0c0"),n("ade3")),s=(n("8a58"),n("e41f")),c=(n("a909"),n("3acc")),l=(n("3c32"),n("417e")),u=(n("e7e5"),n("d399")),d=(n("38d5"),n("772a")),f=(n("66b9"),n("b650")),h=(n("be7f"),n("565f")),b=(n("5246"),n("6b41")),p={name:"AddNote",components:(i={},Object(r["a"])(i,b["a"].name,b["a"]),Object(r["a"])(i,h["a"].name,h["a"]),Object(r["a"])(i,f["a"].name,f["a"]),Object(r["a"])(i,d["a"].name,d["a"]),Object(r["a"])(i,u["a"].name,u["a"]),Object(r["a"])(i,l["a"].name,l["a"]),Object(r["a"])(i,c["a"].name,c["a"]),Object(r["a"])(i,s["a"].name,s["a"]),i),props:{},data:function(){return{useremail:"",password:""}},watch:{},computed:{},methods:{onClickLeft:function(){this.$router.go(-1)},testEmail:function(t){return console.log(t),/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(t)},onSubmit:function(){var t=this;t.axios.post("/api&appsecret=PHPCMF3458092B107BA&s=member&c=login",t.$qs.stringify({is_ajax:1,"data[username]":t.useremail,"data[password]":t.password}),{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){if(console.log(e),0==e.data.code)t.$toast(e.data.msg);else if(e.data.code>0){var n=JSON.stringify(e.data.data.member),i=e.data.data.auth;localStorage.setItem("member",n),localStorage.setItem("member_auth",i),t.$store.commit("setMember",e.data.data.member),t.$store.commit("setMemberAuth",i),t.$toast.loading({message:"登录成功，正在跳转...",forbidClick:!0,onClose:function(){t.$router.push({path:"/home"})}})}})).catch((function(t){console.log("请求失败"+t)}))}},created:function(){},mounted:function(){}},m=p,v=(n("cfce"),n("2877")),g=Object(v["a"])(m,a,o,!1,null,"629a4a86",null);e["default"]=g.exports},a909:function(t,e,n){"use strict";n("68ef"),n("0a6e")},b650:function(t,e,n){"use strict";var i=n("c31d"),a=n("2638"),o=n.n(a),r=n("d282"),s=n("ba31"),c=n("b1d2"),l=n("48f4"),u=n("ad06"),d=n("543e"),f=Object(r["a"])("button"),h=f[0],b=f[1];function p(t,e,n,i){var a,r=e.tag,f=e.icon,h=e.type,p=e.color,m=e.plain,v=e.disabled,g=e.loading,k=e.hairline,S=e.loadingText,y=e.iconPosition,x={};function O(t){g||v||(Object(s["a"])(i,"click",t),Object(l["a"])(i))}function j(t){Object(s["a"])(i,"touchstart",t)}p&&(x.color=m?p:c["f"],m||(x.background=p),-1!==p.indexOf("gradient")?x.border=0:x.borderColor=p);var w=[b([h,e.size,{plain:m,loading:g,disabled:v,hairline:k,block:e.block,round:e.round,square:e.square}]),(a={},a[c["c"]]=k,a)];function B(){return g?n.loading?n.loading():t(d["a"],{class:b("loading"),attrs:{size:e.loadingSize,type:e.loadingType,color:"currentColor"}}):f?t(u["a"],{attrs:{name:f,classPrefix:e.iconPrefix},class:b("icon")}):void 0}function $(){var i,a=[];return"left"===y&&a.push(B()),i=g?S:n.default?n.default():e.text,i&&a.push(t("span",{class:b("text")},[i])),"right"===y&&a.push(B()),a}return t(r,o()([{style:x,class:w,attrs:{type:e.nativeType,disabled:v},on:{click:O,touchstart:j}},Object(s["b"])(i)]),[t("div",{class:b("content")},[$()])])}p.props=Object(i["a"])({},l["c"],{text:String,icon:String,color:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,hairline:Boolean,disabled:Boolean,iconPrefix:String,nativeType:String,loadingText:String,loadingType:String,tag:{type:String,default:"button"},type:{type:String,default:"default"},size:{type:String,default:"normal"},loadingSize:{type:String,default:"20px"},iconPosition:{type:String,default:"left"}}),e["a"]=h(p)},bc1b:function(t,e,n){},be7f:function(t,e,n){"use strict";n("68ef"),n("9d70"),n("3743"),n("1a04"),n("1146")},cfce:function(t,e,n){"use strict";n("0e9d")},db85:function(t,e,n){"use strict";function i(t){var e=[];function n(t){t.forEach((function(t){e.push(t),t.componentInstance&&n(t.componentInstance.$children.map((function(t){return t.$vnode}))),t.children&&n(t.children)}))}return n(t),e}function a(t,e){var n=e.$vnode.componentOptions;if(n&&n.children){var a=i(n.children);t.sort((function(t,e){return a.indexOf(t.$vnode)-a.indexOf(e.$vnode)}))}}n.d(e,"a",(function(){return a}))},e41f:function(t,e,n){"use strict";var i=n("d282"),a=n("a142"),o=n("6605"),r=n("ad06"),s=Object(i["a"])("popup"),c=s[0],l=s[1];e["a"]=c({mixins:[Object(o["a"])()],props:{round:Boolean,duration:[Number,String],closeable:Boolean,transition:String,safeAreaInsetBottom:Boolean,closeIcon:{type:String,default:"cross"},closeIconPosition:{type:String,default:"top-right"},position:{type:String,default:"center"},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}},beforeCreate:function(){var t=this,e=function(e){return function(n){return t.$emit(e,n)}};this.onClick=e("click"),this.onOpened=e("opened"),this.onClosed=e("closed")},render:function(){var t,e=arguments[0];if(this.shouldRender){var n=this.round,i=this.position,o=this.duration,s="center"===i,c=this.transition||(s?"van-fade":"van-popup-slide-"+i),u={};if(Object(a["c"])(o)){var d=s?"animationDuration":"transitionDuration";u[d]=o+"s"}return e("transition",{attrs:{appear:this.transitionAppear,name:c},on:{afterEnter:this.onOpened,afterLeave:this.onClosed}},[e("div",{directives:[{name:"show",value:this.value}],style:u,class:l((t={round:n},t[i]=i,t["safe-area-inset-bottom"]=this.safeAreaInsetBottom,t)),on:{click:this.onClick}},[this.slots(),this.closeable&&e(r["a"],{attrs:{role:"button",tabindex:"0",name:this.closeIcon},class:l("close-icon",this.closeIconPosition),on:{click:this.close}})])])}}})}}]);
//# sourceMappingURL=chunk-5bfe86e5.7bbea8a1.js.map