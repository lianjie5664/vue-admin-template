import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    data: {},
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

export function userList(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

export function changeUserPwd(data) {
  return request({
    url: '/user/changePassword',
    method: 'post',
    data
  })
}

export function saveUser(data) {
  return request({
    url: '/user/save',
    method: 'post',
    data
  })
}

export function lockUser(data) {
  return request({
    url: '/user/lock',
    method: 'post',
    data
  })
}

export function activationUser(data) {
  return request({
    url: '/user/activate',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}
