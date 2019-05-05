import Router from 'vue-router'
import Home from './views/Home.vue'

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/todo/today',
      // component: resolve=> require(['./App.vue'],resolve),
      component: resolve=> require(['./views/main/index.vue'],resolve),
      children: [
        {path: 'personal/info', name: 'info',component: resolve=> require(['./views/personal/info.vue'],resolve)},
        {path: 'us', name: 'us',component: resolve=> require(['./views/personal/us.vue'],resolve)},
        {path: 'charts/day', name: 'day',component: resolve=> require(['./views/charts/day.vue'],resolve)},
        {path: 'todo/today', name: 'today',component: resolve=> require(['./views/todo/today.vue'],resolve)},
        {path: 'todo/yesterday', name: 'yesterday',component: resolve=> require(['./views/todo/yesterday.vue'],resolve)},
        {path: 'statistics/week', name: 'week',component: resolve=> require(['./views/statistics/week.vue'],resolve)},
        {path: 'statistics/month', name: 'month',component: resolve=> require(['./views/statistics/month.vue'],resolve)},
        {path: 'statistics/tomorrow', name: 'tomorrow',component: resolve=> require(['./views/todo/tomorrow.vue'],resolve)},
        {path: 'nav/pandect', name: 'pandect',component: resolve=> require(['./views/nav/pandect.vue'],resolve)},
        {path: 'event', name: 'event',component: resolve=> require(['./views/event/list.vue'],resolve)},
        {path: 'dayBefore', name: 'dayBefore',component: resolve=> require(['./views/charts/before.vue'],resolve)},
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
