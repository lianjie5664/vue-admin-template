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

// 查询企业评审列表
export function getNewOwnList(data) {
  return request({
    url: '/qaGradeOwn/totalList',
    method: 'post',
    data
  })
}

// 查询企业自评专家评审列表
export function getOwnList(data) {
  return request({
    url: '/qaReportCompile/gradeOwnList',
    method: 'post',
    data
  })
}

export function saveOwn(data) {
  return request({
    url: '/qaGradeOwn/save',
    method: 'post',
    data
  })
}

export function getOwnReviewResult(data) {
  return request({
    url: '/qaGradeOwn/get',
    method: 'post',
    data
  })
}

// 顾问评审结果列表
export function getGwList(data) {
  return request({
    url: '/qaGradeMyh/totalList',
    method: 'post',
    data
  })
}

// 查询顾问评审详情
export function getMyhResult(data) {
  return request({
    url: '/qaGradeMyh/get',
    method: 'post',
    data
  })
}

// 保存/修改顾问打分
export function saveMyh(data) {
  return request({
    url: '/qaGradeMyh/save',
    method: 'post',
    data
  })
}
