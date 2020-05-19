import request from '@/utils/request'

export function menuList(data) {
  return request({
    url: '/menu/findMenuTree',
    method: 'post',
    data
  })
}

export function menuSave(data) {
  return request({
    url: '/menu/save',
    method: 'post',
    data
  })
}

export function menuDel(data) {
  return request({
    url: '/menu/delete',
    method: 'post',
    data
  })
}

  