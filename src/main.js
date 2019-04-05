import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router'
import store from './store'
import './registerServiceWorker'
// import axios from './axios/axios'
import axios from './axios/fetch'
Vue.prototype.$axios = axios
import './filters/vfilters'
import iview from 'iview'
import '../node_modules/iview/dist/styles/iview.css'
import '../theme/index.less'
import animated from 'animate.css'
import {validateRules, rules} from './validate/validate'
import './assets/css/base.css'
import echarts from 'echarts'




Vue.prototype.validateRules = validateRules;
Vue.prototype.rules = rules;
Vue.prototype.echarts = echarts;

Vue.use(animated)

Vue.use(iview)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


