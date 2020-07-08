import request from '@/utils/request'

export function officeTree(data) {
  return request({
    url: '/office/findOfficeTree',
    method: 'post',
    data
  })
}

export function saveOrg(data) {
  return request({
    url: '/office/save',
    method: 'post',
    data
  })
}

export function orgList(data) {
  return request({
    url: '/office/list',
    method: 'post',
    data
  })
}

export function orgDelete(data) {
  return request({
    url: '/office/delete',
    method: 'post',
    data
  })
}





