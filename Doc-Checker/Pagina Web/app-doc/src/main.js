import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import Vue from 'vue'   // in Vue 2
import VueAxios from 'vue-axios'
import Axios from 'axios'

Vue.config.productionTip = false

//global registration vue-tabs
// import VueTabs from 'vue-nav-tabs'
// import 'vue-nav-tabs/themes/vue-tabs.css'
// Vue.use(VueTabs) 
 
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueAxios, Axios)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
