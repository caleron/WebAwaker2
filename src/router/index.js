import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'
import Library from '../components/Library.vue'

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
    }
  ]
}
export default new Router(routes)
