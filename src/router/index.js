import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: '/',
        name: "Dashboard",
        component: () => import('../views/Home.vue')
      },
      {
        path: '/GateWay',
        name: 'list languages',
        component: () => import('../views/GatewayList.vue')
      },
      {
        path: "/Form",
        name: "Form",
        component: () => import('../views/fromAddnew.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
