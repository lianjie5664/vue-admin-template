import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'
import routerFormat from '@/utils/router'
import {convertTree} from '@/utils/tools'
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
  permissions:[],
  roleId: ''
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
  GET_ROLEID: (state, roleId) => {
    state.roleId = roleId
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
        const { userName, avatar, roleIdList,permissionList, roleId } = data
        commit('SET_NAME', userName)
        commit('SET_AVATAR', require("@/assets/imgs/profile.jpg"))
        commit('SET_ROLES', roleIdList)
        commit('SET_PERMISSION', permissionList)
        commit('GET_ROLEID', roleId)
        let menuList = data.menuList , menuRouters = []
        menuList.forEach((m, i) => {
          if (m.parentId == '0') {
              m.fullPath = m.path
              let module = {
                  path: '/'+ m.path,
                  component: Layout,
                  meta: { id: m.id, title: m.name, icon:m.icon, fullPath: m.path },
                  hidden: m.hidden == '0'? false : true ,
                  name: m.name,
                  alwaysShow:m.alwaysShow == 1 ? true : false,
                  sort:m.sort
              }
              menuRouters.push(module)
          }
        })
        convertTree(menuRouters,menuList) //用递归填充

        function sortKey(array,key){
          return array.sort(function(a,b){
           var x = a[key];
           var y = b[key];
           return ((x<y)?-1:(x>y)?1:0)
          })
         }
        menuRouters = sortKey(menuRouters,'sort')

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
