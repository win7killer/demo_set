import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
// console.log(1111, App)
let vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
