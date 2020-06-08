const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  permission_routers: state => state.user.routers,  //路由列表
  routers: state => state.user.routers,
  roleId: state => state.user.roleId,
  userId: state => state.user.userId,
}
export default getters
