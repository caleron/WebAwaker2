// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import Toasted from 'vue-toasted'
import { status, initSocket } from './services/connect'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Toasted, {
  duration: 3000,
  position: 'top-right'
})

initSocket()

// it is crucial! that objects outside vue that are used in views are referenced in the data property of the global Vue instance

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    status
  },
  router,
  template: '<App/>',
  components: { App }
})

