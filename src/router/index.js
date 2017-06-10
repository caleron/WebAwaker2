import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'
import Library from '../components/Library.vue'
import LightControl from '../components/LightControl.vue'

Vue.use(Router)

let routes = {
  routes: [
    {
      path: '/',
      name: 'Library',
      component: Library
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/light',
      name: 'LightControl',
      component: LightControl
    }
  ]
}
export default new Router(routes)
