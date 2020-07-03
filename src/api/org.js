import request from '@/utils/request'

export function officeTree(data) {
  return request({
    url: '/office/findOfficeTree',
    method: 'post',
    data
  })
}