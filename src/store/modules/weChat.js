import {
  jsApi
} from '@/api/weChat'
import wx from 'weixin-js-sdk'

const state = {}

const getters = {}

const actions = {
  jsApi ({commit}, {url}) {
    return jsApi(url).then(res => {
      wx.config({
        debug: false,
        appId: res.data.appId,
        timestamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        signature: res.data.signature,
        jsApiList: ['chooseImage', 'uploadImage', 'previewImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseWXPay']
      })
      wx.ready(function () {
        wx.onMenuShareTimeline({})
        wx.onMenuShareAppMessage({})
      })
    })
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
