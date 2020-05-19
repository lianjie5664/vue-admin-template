
import request from '@/utils/request'

export function roleList(data) {
  return request({
    url: '/role/list',
    method: 'post',
    data
  })
}

export function roleSave(data) {
    return request({
      url: '/role/save',
      method: 'post',
      data
    })
}

export function roleDel(data) {
    return request({
      url: '/role/delete',
      method: 'post',
      data
    })
}

export function getRole(data) {
    return request({
      url: '/role/get',
      method: 'post',
      data
    })
}

  