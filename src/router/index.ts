import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    redirect: '/welcome',
    component: Home,
    children: [
      {
        path: '/welcome',
        component: () => import('@/views/Welcome.vue')
      },
      {
        path: '/users',
        component: () => import('@/views/User/UserList.vue')
      },
      {
        path: '/roles',
        component: () => import('@/views/Permission/RoleList.vue')
      },
      {
        path: '/rights',
        component: () => import('@/views/Permission/RightList.vue')
      },
      {
        path: '/reports',
        component: () => import('@/views/report/report.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//前置路由守卫
router.beforeEach((to,from,next)=>{
  const token = window.sessionStorage.getItem('token')
  if(to.path=='/login' || token!==null){
    next()
  }
  else {
    next('/login')
  }
})

export default router
