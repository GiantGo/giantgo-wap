import axios from 'axios'
import { getToken } from '@/utils/token'
import store from '@/store'
import router from '@/router'
import { MessageBox } from 'mint-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // api的base_url
  timeout: 5000 // request timeout
})

service.interceptors.request.use(function (config) {
  if (getToken()) {
    config.headers['authorization'] = 'Bearer ' + getToken()
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

service.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  if (error.response.status === 401) {
    store.dispatch('logout').then(() => {
      MessageBox.alert('登录状态过期，请重新登录', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          window.location.reload()
        }
      })
    })
  } else if (error.response.status === 403) {
    router.push({path: '/401', replace: true, query: {noGoBack: true}})
  }

  return Promise.reject(error)
})

export default service
