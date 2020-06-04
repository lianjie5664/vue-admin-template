import request from '@/utils/request'

// 保存/修改 专家评审
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

export function getReviewResult(data) {
  return request({
    url: '/qaGrade/get',
    method: 'post',
    data
  })
}


