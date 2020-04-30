import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'
import routerFormat from '@/utils/router'
import Layout from '@/layout'
import {
  constantRouterMap,
  notFoundRouter
} from '@/router';
const _import = file => require('@/views/' + file + '.vue').default

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
  routers: constantRouterMap,
  addRouters: [],
  permissions:[]
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers; //路由访问
    state.routers = constantRouterMap.concat(routers).concat(notFoundRouter); //菜单显示,404最后加入
  },
  SET_PERMISSION : (state, permissions) =>{
    state.permissions = permissions
  },
  LOGOUT: (state) => {
    state.addRouters = [];
    state.routers = [];
    state.name = '';
    state.roles = [];
    state.token = '';
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        if(response.code != 1){
          Message({
            message: response.msg || 'Error',
            type: 'error',
            duration: 3 * 1000
          })
        }
        const { data } = response
        commit('SET_TOKEN', data.accessToken)
        setToken(data.accessToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        // const { name, avatar, roles, routers } = data
        commit('SET_NAME', data.userName)
        // commit('SET_AVATAR', data.avatar)
        commit('SET_ROLES', ['admin'])
        commit('SET_PERMISSION', ['system:menu:query']) 
        let menuList = [
          {"id":7,"title":"指标库","parent_id":0,"path":"indexLib","component":"indexLib/list","icon":"iconindex","hidden": false,"alwaysShow":false},
          // {"id":4,"title":"配置奖项","icon":"iconindex","parent_id":1,"path":"enter/:id","component":"report/enter","hidden": true},
          // {"id":5,"title":"菜单管理1","icon":"book","parent_id":4,"path":"compile","component":"index","hidden": false},
          // {"id":6,"title":"菜单管理2","icon":"book","parent_id":4,"path":"compile","component":"index","hidden": false},
          // {"id":4,"title":"系统管理","parent_id":0,"path":"review","icon":"iconindex","hidden": false},
          // {"id":5,"title":"配置指标库","icon":"book","parent_id":4,"path":"list","component":"indexLib/index","hidden": true},

          {"id":4,"title":"报告编制","parent_id":0,"path":"report","icon":"iconindex","hidden": false,"visiable":false},
          {"id":5,"title":"报告编制","icon":"iconindex","parent_id":4,"path":"report/index","component":"report/index","hidden": false},
          // {"id":6,"title":"用户管理","icon":"iconindex","parent_id":4,"path":"enter/:id","component":"report/enter","hidden": true},

          {"id":1,"title":"系统管理","name":"sys","parent_id":0,"path":"review","icon":"iconindex","hidden": false,"visiable":true},
          {"id":2,"title":"菜单管理","name":"menu","icon":"book","parent_id":1,"path":"list","component":"sys/menu/index","hidden": false},
          {"id":2,"title":"角色管理","name":"role","icon":"book","parent_id":1,"path":"sys/role","component":"sys/role/index","hidden": false},
          {"id":3,"title":"用户管理","name":"user","icon":"book","parent_id":1,"path":"sys/user","component":"sys/user/index","hidden": false},
        ],menuRouters =[]

        menuList.forEach((m, i) => {
          if (m.parent_id == 0) {
              m.fullPath = m.path
              let module = {
                  path: '/'+ m.path,
                  component: Layout,
                  meta: { id: m.id, title: m.title, icon:m.icon, fullPath: m.path },
                  hidden:m.hidden,
                  name:m.name,
                  alwaysShow:m.visiable
              }
              menuRouters.push(module)
          }
        })

        function convertTree(routers) {
          routers.forEach(r => {
              menuList.forEach((m, i) => {
                if (m.parent_id && m.parent_id == r.meta.id) {
                    if (!r.children) r.children = []
                    m.fullPath = r.meta.fullPath
                    let menu = {
                        path: '/' + m.path,
                        component: _import(m.component),
                        meta: { id: m.id, title: m.title, fullPath: r.meta.fullPath + '/' + m.path },
                        hidden:m.hidden,
                        name:m.name
                    }
                    r.children.push(menu)
                }
              })
              if (r.children) convertTree(r.children)
          })
        }
        convertTree(menuRouters) //用递归填充
        commit('SET_ROUTERS', menuRouters)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout({}).then(() => {
        commit('LOGOUT', '')
        removeToken()
        resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

