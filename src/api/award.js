import request from '@/utils/request'

export function awardSave(data) {
  return request({
    url: '/qaAward/save',
    method: 'post',
    data
  })
}

export function fetchAwardList(data) {
  return request({
    url: '/qaAward/list',
    method: 'post',
    data
  })
}

export function deleteAward(data) {
  return request({
    url: '/qaAward/delete',
    method: 'post',
    data
  })
}

// 根据奖项ID查询指标库
export function findListByAward(data) {
  return request({
    url: '/qaStandard/findListByAwardId',
    method: 'post',
    data
  })
}

//新增指标库项
export function awardCfgAdd(data) {
  return request({
    url: '/qaStandard/save',
    method: 'post',
    data
  })
}

//删除指标库项
export function awardCfgDel(data) {
  return request({
    url: '/qaStandard/delete',
    method: 'post',
    data
  })
}

//新增关键点
export function pointAdd(data) {
  return request({
    url: '/qaStandardKeyPoints/save',
    method: 'post',
    data
  })
}

//删除关键点
export function pointDel(data) {
  return request({
    url: '/qaStandardKeyPoints/delete',
    method: 'post',
    data
  })
}

//查询关键点
export function getPoints(data) {
  return request({
    url: '/qaStandardKeyPoints/findListByStandardId',
    method: 'post',
    data
  })
}









