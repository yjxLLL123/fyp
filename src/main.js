import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AMap from 'vue-amap';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

// Vue.use(AMap);
//
// // 初始化vue-amap
// AMap.initAMapApiLoader({
//   // 高德key
//   key: '3c36d5aaa945e9dd8789bbcd74dcfa58',  //注意这里引入你在高德申请的key值
//   // 插件集合 （插件按需引入）
//   plugin: ['AMap.Geolocation']
// });
