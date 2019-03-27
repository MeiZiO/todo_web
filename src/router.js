import Router from 'vue-router'
import Home from './views/Home.vue'

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // component: resolve=> require(['./App.vue'],resolve),
      component: resolve=> require(['./views/main/index.vue'],resolve),
      children: [
        {path: 'personal/info', name: 'personnInfo',component: resolve=> require(['./views/personal/info.vue'],resolve)},
        {path: 'charts/day', name: 'day',component: resolve=> require(['./views/charts/day.vue'],resolve)},
        {path: 'todo/today', name: 'today',component: resolve=> require(['./views/todo/today.vue'],resolve)},
        // {path: 'info', name: 'personnInfo',component: () => import ('./views/personal/info.vue')}
      ]
    },
    // {
    //   path: '/personal',
    //   name: 'personal',
    //   component: () => import ('./views/personal/info.vue')
    // },
    // {
    //   path: '/personal',
    //   name: 'personal',
    //   component: resolve=> require(['./App.vue'],resolve),
    //   children: [
    //     {path: 'info', name: 'personnInfo',component: resolve=> require(['./views/personal/info.vue'],resolve)}
    //     // {path: 'info', name: 'personnInfo',component: () => import ('./views/personal/info.vue')}
    //   ]
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: resolve=> require(['./views/About.vue'],resolve)
    }
  ]
})

export default router;
