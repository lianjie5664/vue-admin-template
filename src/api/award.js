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
    url: '/qaGrade/totalList',
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

// 企业奖编制人报告提交审核
export function aduitRecord(data){
  return request({
    url: '/qaReportCompile/submitAudit',
    method: 'post',
    data
  })
}

// 企业管理员退回报告
export function toBack(data){
  return request({
    url: '/qaReportCompile/companyToBack',
    method: 'post',
    data
  })
}

// 企业管理员提交报告编制到政府预审员
export function toGovern(data){
  return request({
    url: '/qaReportCompile/companyToGovern',
    method: 'post',
    data
  })
}

// 政府预审员通过报告
export function govInterAgree(data){
  return request({
    url: '/qaReportCompile/govInterAgree',
    method: 'post',
    data
  })
}

// 政府预审员退回报告编制
export function govInterBack(data){
  return request({
    url: '/qaReportCompile/govInterBack',
    method: 'post',
    data
  })
}

// 政府审核负责人分配评审专家，待专家评审
export function govExpert(data){
  return request({
    url: '/qaReportCompile/govAllotExpert',
    method: 'post',
    data
  })
}

// 获取评审专家列表
export function userList(data){
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

// 评审专家提交评审结果
export function expertToGovern(data){
  return request({
    url: '/qaReportCompile/expertToGovern',
    method: 'post',
    data
  })
}

// -政府管理员审核通过专家评审结果
export function govAdminAgree(data){
  return request({
    url: '/qaReportCompile/govAdminAgree',
    method: 'post',
    data
  })
}

// -政府管理员退回专家评审结果
export function govAdminBack(data){
  return request({
    url: '/qaReportCompile/govAdminBack',
    method: 'post',
    data
  })
}

// 政府管理员统计评审结果
export function govAdminStatic(data){
  return request({
    url: '/qaReportCompile/govAdminStatistics',
    method: 'post',
    data
  })
}

// 企业管理员分配自评专家，待自评专家评审
export function copExpert(data){
  return request({
    url: '/qaReportCompile/adminAllotExpert',
    method: 'post',
    data
  })
}

// 企业自评专家提交评审结果
export function expertToCom(data){
  return request({
    url: '/qaReportCompile/expertToAdmin',
    method: 'post',
    data
  })
}

// 企业管理员审核通过自评专家评审结果
export function comAdminAgree(data){
  return request({
    url: '/qaReportCompile/companyAdminAgree',
    method: 'post',
    data
  })
}

// 企业管理员退回自评专家评审结果
export function comAdminBack(data){
  return request({
    url: '/qaReportCompile/companyAdminBack',
    method: 'post',
    data
  })
}

// 企业管理员统计自评专家评审结果
export function comAdminStatic(data){
  return request({
    url: '/qaReportCompile/companyAdminStatistics',
    method: 'post',
    data
  })
}

// 自评结果列表页面根据用户角色获取能够显示的状态
export function gradeOwnRole(data) {
  return request({
    url: '/qaReportCompile/gradeTotalOwnListByRole',
    method: 'post',
    data
  })
}

// 评审结果列表页面根据用户角色获取能够显示的状态
export function gradeByRole(data) {
  return request({
    url: '/qaReportCompile/gradeTotalListByRole',
    method: 'post',
    data
  })
}

// 报告编制列表页面政府的状态
export function reportGovRole(data) {
  return request({
    url: '/qaReportCompile/reportGovListByRole',
    method: 'post',
    data
  })
}

// 报告编制列表页面企业的状态
export function reportComRole(data) {
  return request({
    url: '/qaReportCompile/reportComListByRole',
    method: 'post',
    data
  })
}

// 顾问-MYH专家提交评审结果
export function myhExpertAgree(data) {
  return request({
    url: '/qaReportCompile/myhExpertAgree',
    method: 'post',
    data
  })
}

// 企业管理员提交报告编制给MYH专家评审
export function myhExpert(data) {
  return request({
    url: '/qaReportCompile/adminAllotMyhExpert',
    method: 'post',
    data
  })
}

// MYH显示的状态
export function gradeMyhRole(data) {
  return request({
    url: '/qaReportCompile/gradeTotalMyhListByRole',
    method: 'post',
    data
  })
}
