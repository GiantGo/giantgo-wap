import {
  signIn,
  getMyInfo
} from '@/api/user'
import { setToken, removeToken } from '@/utils/token'

const state = {
  email: '',
  avatar: '',
  name: '',
  createTime: '',
  tokenValid: false
}

const getters = {
  email: state => state.email,
  avatar: state => state.avatar,
  name: state => state.name,
  createTime: state => state.createTime,
  tokenValid: state => state.tokenValid
}

const actions = {
  signIn ({commit}, {username, password}) {
    return signIn(username, password).then((response) => {
      setToken(response.data.token)
    })
  },
  logout ({commit}) {
    commit('SET_EMAIL', '')
    commit('SET_AVATAR', '')
    commit('SET_NAME', '')
    commit('SET_CREATE_TIME', '')
    commit('SET_TOKEN_VALID', false)
    removeToken()
  },
  getMyInfo ({commit}) {
    return getMyInfo().then((response) => {
      let myInfo = response.data

      commit('SET_EMAIL', myInfo.email)
      commit('SET_AVATAR', myInfo.avatar)
      commit('SET_NAME', myInfo.name)
      commit('SET_CREATE_TIME', myInfo.createTime)
      commit('SET_TOKEN_VALID', true)

      return myInfo
    })
  }
}

const mutations = {
  SET_EMAIL (state, email) {
    state.email = email
  },
  SET_AVATAR (state, avatar) {
    state.avatar = avatar
  },
  SET_NAME (state, name) {
    state.name = name
  },
  SET_CREATE_TIME (state, createTime) {
    state.createTime = createTime
  },
  SET_TOKEN_VALID (state, valid) {
    state.tokenValid = valid
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
