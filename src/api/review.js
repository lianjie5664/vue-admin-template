import request from '@/utils/request'

// 提交
export function toSave(data) {
  return request({
    url: '/qaGrade/save',
    method: 'post',
    data
  })
}
