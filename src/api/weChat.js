import request from '@/utils/request'

export function jsApi (url) {
  return request({
    url: '/weChat/jsApi',
    method: 'POST',
    data: {
      url
    }
  })
}
