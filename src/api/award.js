import request from '@/utils/request'


export function getAwardById(data) {
  return request({
    url: '/qaAward/get',
    method: 'post',
    data
  })
}

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

//修改指标库项
export function awardCfgModify(data) {
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

// 新增动态表单
export function saveDynamicForm(data) {
  return request({
    url: '/qaStandard/updateFormStyle',
    method: 'post',
    data
  })
}
// 报告编制保存
export function savaQaRept(data) {
  return request({
    url: '/qaReportCompile/save',
    method: 'post',
    data
  })
}

//评审列表

export function reportList(data) {
  return request({
    url: '/qaReportCompile/list',
    method: 'post',
    data
  })
}
// 获取编制详情
export function getReptCompileDetail(data) {
  return request({
    url: '/qaReportCompile/getReportCompile',
    method: 'post',
    data
  })
}


// 获取个人编制列表
 
export function getReportCompileList(data){
  return request({
    url: '/qaReportCompile/reportCompileList',
    method: 'post',
    data
  })
}

// 导出word
export function exportWord(data){
  return request({
    url: '/word/export',
    method: 'post',
    data,
    responseType:'blob',
    header:{
      filename:data.filename
    }
  })
}


// 生成一条奖项记录

export function genRecord(data){
  return request({
    url: '/qaReportCompile/insert',
    method: 'post',
    data,
  })
}

// 删除一条报告编制
export function delRecord(data){
  return request({
    url: '/qaReportCompile/delete',
    method: 'post',
    data,
  })
}
