import { jsApi } from '@/api/weChat'
import wx from 'weixin-js-sdk'

const state = {}

const getters = {}

const actions = {
  jsApi ({commit}, {url}) {
    return new Promise((resolve, reject) => {
      jsApi(url).then(res => {
        wx.config({
          debug: false,
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: [
            'chooseImage',
            'uploadImage',
            'previewImage',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'chooseWXPay'
          ]
        })
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
