import request from '@/utils/request'

// 总分排行
export function getTotalScoreRank(data) {
  return request({
    url: '/statistical/totalScoreRank',
    method: 'post',
    data
  })
}

// 各项得分占比
export function getScorePercent(data) {
  return request({
    url: '/statistical/scorePercent',
    method: 'post',
    data
  })
}

// 一级指标雷达图
export function getFirstLevelRadar(data) {
  return request({
    url: '/statistical/firstLevelRadar',
    method: 'post',
    data
  })
}

// 企业编制报告进度
export function getReportProgress(data) {
  return request({
    url: '/statistical/reportProgress',
    method: 'post',
    data
  })
}

// 报告评审进度
export function getReviewProgress(data) {
  return request({
    url: '/statistical/reviewProgress',
    method: 'post',
    data
  })
}
