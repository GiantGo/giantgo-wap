import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { getToken } from '@/utils/token'

const DefaultLayout = () => import('../layouts/Default/Index.vue')
const SignIn = () => import('../views/Passport/SignIn.vue')
const Dashboard = () => import('../views/Dashboard/Index.vue')

Vue.use(Router)

export const routes = [
  {
    path: '/signIn',
    name: 'signIn',
    component: SignIn,
    hidden: true
  }, {
    path: '/',
    redirect: '/dashboard',
    component: DefaultLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        name: 'Dashboard'
      }
    ]
  }, {
    path: '*',
    redirect: '/404'
  }
]

const router = new Router({
  mode: 'hash',
  linkActiveClass: 'active',
  scrollBehavior: () => ({y: 0}),
  routes: routes
})

const whiteList = ['/signIn']// no redirect whitelist

router.beforeEach(function (to, from, next) {
  if (getToken()) {
    if (to.path === '/signIn') {
      next({path: '/'})
    } else {
      // 判断当前用户是否已获取用户信息，以验证token有效性
      if (!store.getters.tokenValid) {
        // 拉取用户信息
        store.dispatch('getMyInfo').then(() => {
          next({...to, replace: true}) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        }).catch(() => {
          store.dispatch('logout')
          setTimeout(() => {
            next({
              name: 'signIn',
              query: {redirect: to.fullPath}
            })
          }, 2000)
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      store.dispatch('logout')
      next({
        name: 'signIn'
      })
    }
  }
})

// When each route is finished evaluating...
router.afterEach(() => {
  // Complete the animation of the route progress bar.
})

export default router
