import Vue from 'vue'

Vue.filter('statusFilter', function (status) {
    const statusMap = {
        0: '禁用',
        1: '正常',
      }
    return statusMap[status]
})