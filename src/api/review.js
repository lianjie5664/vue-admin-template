import request from '@/utils/request'

// 提交
export function toSave(data) {
  return request({
    url: '/qaGrade/save',
    method: 'post',
    data
  })
}

export function getSaveSuccess(data) {
  return request({
    url: '/qaGrade/saveSuccessGet',
    method: 'post',
    data
  })
}
