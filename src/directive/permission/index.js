import hasRole from './hasRole'
import hasPermi from './hasPerm'

const install = function(Vue) {
  Vue.directive('hasRole', hasRole)
  Vue.directive('hasPermi', hasPermi)
}

if (window.Vue) {
  window['hasRole'] = hasRole
  window['hasPermi'] = hasPermi
  Vue.use(install); // eslint-disable-line
}

export default install
