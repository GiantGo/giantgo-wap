import request from '@/utils/request'

export function signIn (username, password) {
  return request({
    url: '/auth/token',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

export function getMyInfo () {
  return request({
    url: '/weChat/user',
    method: 'GET'
  })
}
