import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/styles/index.scss'
import router from './router'
import store from './store'
import App from './App.vue'

import './errorLog' // error log
import './icons' // icon

Vue.use(MintUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
