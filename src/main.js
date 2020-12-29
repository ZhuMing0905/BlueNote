import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'; 
import qs from 'qs';
import {Toast} from 'vant'; 
Vue.prototype.$qs = qs;
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.prototype.$moment = moment;
moment.locale('zh-cn');

Vue.filter('datafmt',function (time, fmtstring) {
  return moment(time*1000).format(fmtstring);
});
Vue.filter('numberFilter', (value) => {
  if(value<10){
    return "0" + value
  }else{
    return value
  }
  
})
axios.interceptors.request.use(function (config) {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  return config;
}, function (error) {
  Toast.fail('请求出错');
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  Toast.clear()
  return response;
}, function (error) {
  Toast.fail('未响应');
  return Promise.reject(error);
});
// axios.interceptors.request.use(function(config){
//   const appid=1;
//   const appsecret="PHPCMFEBAEB0BF3C57D";
//   if(config.headers['Content-Type'] == 'multipart/form-data'){
//    config.data.set('appid',appid);
//    config.data.set('appsecret',appsecret);
//    return config;
//   }
//   //判断请求的类型：如果是post请求就把默认参数拼到data里面；如果是get请求就拼到params里面
//   if(config.method==='post'){
//     config.data=qs.stringify({
//       appid:appid,
//       appsecret:appsecret,
//       ...config.data
//     })
//   }else if(config.method==='get'){
//     config.params={
//       appid:appid,
//       appsecret:appsecret,
//       ...config.params
//     }
//   }
//   return config;
// },function(error){
//   return Promise.reject(error);
// })


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
