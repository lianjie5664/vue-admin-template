import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/indexLib/index',
  // },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/homepage/index'),
      meta: { title: '系统首页', icon: 'el-icon-s-home' }
    }]
  },
  // {
  //   path: '/compile/:id',
  //   // component: () => import('@/views/compile/' + window.location.hash.split('/')[2]+'.vue'),
  //   component: () => import('@/views/compile/85eaf3d0965d4f03bfac14a75331f134.vue'),
  //   hidden: true
  // },

  // {
  //   path: '/indexLib',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'indexLibList',
  //       component: () => import('@/views/indexLib/index'),
  //       meta: { title: '指标库', icon: 'iconindex' }
  //     },
  //     // {
  //     //   path: 'enter/:id',
  //     //   name: 'indexLibEnter',
  //     //   component: () => import('@/views/indexLib/enter'),
  //     //   meta: { title: '配置指标库', noCache: true, activeMenu: '/indexLib/list'  },
  //     //   hidden: true
  //     // },
  //   ]
  // },
  // {
  //   path: '/report',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'compile',
  //       name: 'reportCompile',
  //       component: () => import('@/views/report/index'),
  //       meta: { title: '报告编制', icon: 'iconreport' }
  //     },
  //     {
  //       path: 'compile/:id',
  //       name: 'compileEnter',
  //       component: () => import('@/views/report/enter'),
  //       meta: { title: '进入编制', noCache: true, activeMenu: '/report/compile'  },
  //       hidden: true
  //     },
  //   ]
  // },
  // {
  //   path: '/review',
  //   component: Layout,
  //   // redirect: '/review/professor',
  //   meta: { title: '专家评审', icon: 'iconexpert' },
  //   alwaysShow:true,
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'reviewList',
  //       component: () => import('@/views/review/list'),
  //       meta: { title: '评审列表', keepAlive: true}
  //     },
  //     {
  //       path: 'professor/:awardId?',
  //       name: 'professor',
  //       component: () => import('@/views/review/professor'),
  //       meta: { title: '专家评审', keepAlive: true},
  //       hidden:true
  //     },
  //     // {
  //     //   path: '/review/result',
  //     //   name: 'result',
  //     //   component: () => import('@/views/review/result'),
  //     //   meta: { title: '评审结果', keepAlive: true}
  //     // },
  //   ]
  // },
  // 404 page must be placed at the end !!!
]

export const notFoundRouter = [{
  path: '*',
  redirect: '/404',
  hidden: true
}, ]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
