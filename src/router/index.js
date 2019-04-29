import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { getToken } from '@/utils/token'
import wx from 'weixin-js-sdk'

const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
const DefaultLayout = () => import('../layouts/Default/Index.vue')
const SignIn = () => import('../views/Passport/SignIn.vue')
const Dashboard = () => import('../views/Dashboard/Index.vue')

Vue.use(Router)

export const routes = [
  {
    path: '/signIn',
    name: 'signIn',
    component: SignIn,
    meta: {
      title: '登录',
      desc: '登录登录登录'
    }
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
  mode: 'history',
  base: process.env.VUE_APP_PUBLIC_PATH,
  linkActiveClass: 'active',
  scrollBehavior: () => ({y: 0}),
  routes: routes
})
const whiteList = ['/signIn']// no redirect whitelist

const validateBind = (isBind, path, next) => {
  if (isBind) {
    if (path === '/signIn') {
      next({path: '/'})
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next({name: 'signIn'})
    }
  }
}

const goAuth = (to) => {
  window.location.href = process.env.VUE_APP_BASE_URL + '/oAuth/login?redirectUrl=' + encodeURIComponent(window.location.origin + process.env.VUE_APP_PUBLIC_PATH + to.fullPath.replace('/', ''))
}

router.beforeEach(function (to, from, next) {
  if (getToken()) {
    // 判断当前用户是否已获取用户信息，以验证token有效性
    if (!store.getters.tokenValid) {
      // 拉取用户信息
      store.dispatch('getMyInfo').then(() => {
        // 判断联系人是否已绑定
        validateBind(store.getters.isBind, to.path, next)
      }).catch(() => {
        store.dispatch('logout')
        goAuth(to)
      })
    } else {
      // 判断联系人是否已绑定
      validateBind(store.getters.isBind, to.path, next)
    }
  } else {
    store.dispatch('logout')
    goAuth(to)
  }
})

// When each route is finished evaluating...
router.afterEach((to, from) => {
  if (!isiOS) {
    store.dispatch('jsApi', {
      url: encodeURIComponent(window.location.origin + process.env.VUE_APP_PUBLIC_PATH + to.fullPath.replace('/', ''))
      // url: encodeURIComponent(window.location.href.split('#')[0])
    })
  }

  wx.ready(function () {
    const appShareData = {
      title: to.meta.title, // 分享标题
      desc: to.meta.desc, // 分享描述
      link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: '', // 分享图标
      success: function () {}
    }
    const timeLineShareData = {
      title: to.meta.title, // 分享标题
      link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: '', // 分享图标
      success: function () {}
    }
    wx.onMenuShareAppMessage(appShareData)
    wx.onMenuShareTimeline(timeLineShareData)
    wx.updateAppMessageShareData(appShareData)
    wx.updateTimelineShareData(timeLineShareData)
  })
  wx.error(function (res) {
    console.log(res)
  })
})

if (isiOS) {
  store.dispatch('jsApi', {
    url: encodeURIComponent(window.location.href.split('#')[0])
  })
}

export default router
