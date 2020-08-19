<template>
<div class="app-container">
  <el-select v-model="statusVal" placeholder="请选择状态" @change="initOption" clearable>
    <el-option
      v-for="item in statusList"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <div class="table">
    <el-table ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading" border fit highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.$index +1 }}
        </template>
      </el-table-column>
      <el-table-column label="奖项类型">
        <template slot-scope="scope">
          <router-link
            :to="{ path:'/review/professor',
            query:{ awardId: scope.row.awardId,
            reportUserId: scope.row.createUserId,
            gradeTotalId: scope.row.gradeTotalId,
            createUserId: scope.row.createUserId,
            gradeUserId: scope.row.gradeUserId }}">{{scope.row.awardName}}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="分数">
        <template slot-scope="scope">
          <router-link
            :to="{ path:'/review/professor',
            query:{ awardId: scope.row.awardId,
            reportUserId: scope.row.createUserId,
            gradeTotalId: scope.row.gradeTotalId,
            createUserId: scope.row.createUserId,
            gradeUserId: scope.row.gradeUserId }}">{{scope.row.total}}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="编制人">
        <template slot-scope="scope">
          {{ scope.row.companyName }}
        </template>
      </el-table-column>
      <el-table-column label="评审人">
        <template slot-scope="scope">
          {{ scope.row.gradeUserName }}
        </template>
      </el-table-column>
      <el-table-column label="评审时间">
        <template slot-scope="scope">
          {{ scope.row.updateDate }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{govStatusList[scope.row.status]}}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="230" align="center" class-name="small-padding fixed-width" v-if="roleEnname !== 'admin'">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" plain v-show="roleEnname === 'review_experts' && (+row.status === 103020007 || +row.status === 103020010)">
            <router-link :to="{path:'/review/professor',
                            query:{awardId:row.awardId,
                            reportUserId:row.createUserId,
                            gradeTotalId: row.gradeTotalId,
                            createUserId:row.createUserId,gradeUserId:row.gradeUserId}}">评审</router-link>
          </el-button>
          <el-button v-show="roleEnname === 'review_experts' && +row.status === 103020007" type="primary" size="mini" plain @click="toAduit(row)">提交评审结果</el-button>
          <el-button v-show="roleEnname === 'gov_admin' && +row.status === 103020008" type="primary" size="mini" plain @click="toAgree(row)">审核通过</el-button>
          <el-button v-show="roleEnname === 'gov_admin' && +row.status === 103020009" type="primary" size="mini" plain @click="toBack(row)">审核退回</el-button>
          <!-- <el-button size="mini" disabled v-show="+row.status !== 103020007 || +row.status !== 103020008 || +row.status !== 103020009 || +row.status !== 103020010">暂无</el-button> -->

          <el-button v-show="roleEnname === 'com_self_reviewer'" type="primary" size="mini" plain @click="toComAduit(row)">提交自评结果</el-button>
          <el-button v-show="roleEnname === 'com_admin'" type="primary" size="mini" plain @click="comAgree(row)">通过</el-button>
          <el-button v-show="roleEnname === 'com_admin'" type="primary" size="mini" plain @click="comBack(row)">退回</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-pagination>
  </div>
</div>
</template>
<script>
import {
  reportNewList,
  expertToGovern,
  govAdminAgree,
  govAdminBack,
  expertToCom,
  comAdminAgree,
  comAdminBack,
  gradeByRole
} from '@/api/award'
import {
  notice
} from '@/utils/tools'
import { govStatusList } from '@/config/setting'
export default {
  data() {
    return {
      govStatusList: govStatusList,
      statusList: [],
      statusVal: '',
      list: null,
      listLoading: false,
      selectedRow: '',
      compileId: this.$route.query.compileId || '',
    }
  },
  created() {
    this.getStatusList()
    this.fetchList(this.compileId, this.statusVal)
  },
  computed: {
    roleEnname () {
      return this.$store.getters.roleEnname
    }
  },
  methods: {
    getStatusList () {
      gradeByRole({}).then(res => {
        if (res && res.data && res.data[0]) {
          this.statusList = res.data
        }
      })
    },
    // 企业管理员退回自评专家评审结果
    comBack (row) {
      this.$prompt('请输入退回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then((val) => {
        comAdminBack({
          'gradeTotalId': row.gradeTotalId,
          'backRemark': val.value
        }).then(res => {
          if (+res.code === 1) {
            notice(1, '退回成功', 1)
            this.fetchList(this.compileId, this.statusVal)
          } else {
            notice(0, '退回失败！', 0)
          }
        })
      }).catch(() => {})
    },
    // 企业管理员审核通过自评专家评审结果
    comAgree (row) {
      this.$confirm('确定审核通过自评结果吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        comAdminAgree({
          'gradeTotalId': row.gradeTotalId
        }).then(res => {
          if (+res.code === 1) {
            notice(1, '审核成功', 1)
            this.fetchList(this.compileId, this.statusVal)
          } else {
            notice(0, '审核失败！', 0)
          }
        })
      }).catch(() => {})
    },
    // 企业自评专家提交评审结果
    toComAduit (row) {
      this.$confirm('确定提交自评结果吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        expertToCom({
          gradeTotalId: row.gradeTotalId
        }).then(res => {
          if (+res.code === 1) {
            notice(1, '提交成功', 1)
            this.fetchList(this.compileId, this.statusVal)
          } else {
            notice(0, '提交失败！', 0)
          }
        })
      }).catch(() => {})
    },
    // 政府管理员退回专家评审结果
    toBack (row) {
      this.$prompt('请输入退回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then((val) => {
        govAdminBack({
          'gradeTotalId': row.gradeTotalId,
          'backRemark': val.value
        }).then(res => {
          if (+res.code === 1) {
            notice(1, '退回成功', 1)
            this.fetchList(this.compileId, this.statusVal)
          } else {
            notice(0, '退回失败！', 0)
          }
        })
      }).catch(() => {})
    },
    // 政府管理员审核通过专家评审结果
    toAgree (row) {
      this.$confirm('确定审核通过评审结果吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        govAdminAgree({
          'gradeTotalId': row.gradeTotalId
        }).then(res => {
          if (+res.code === 1) {
            notice(1, '审核成功', 1)
            this.fetchList(this.compileId, this.statusVal)
          } else {
            notice(0, '审核失败！', 0)
          }
        })
      }).catch(() => {})
    },
    // 评审专家提交评审结果
    toAduit (row) {
      this.$confirm('确定提交评审结果吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        expertToGovern({
          gradeTotalId: row.gradeTotalId
        }).then(res => {
          if (+res.code === 1) {
            notice(1, '提交成功', 1)
            this.fetchList(this.compileId, this.statusVal)
          } else {
            notice(0, '提交失败！', 0)
          }
        })
      }).catch(() => {})
    },
    initOption () {
      this.fetchList(this.compileId, this.statusVal)
    },
    fetchList(compileId, statusVal) {
      this.listLoading = true
      reportNewList({
        compileId: compileId,
        status: statusVal
      }).then(response => {
        this.list = response.data.data
        this.listLoading = false
      })
    },
    handleSelectionChange(selection) {
      if (selection.length > 1) {
        let del_row = selection.shift()
        this.$refs.multipleTable.toggleRowSelection(del_row, false)
      }
      if (selection.length != 0) {
        this.selectedRow = selection[0].id
      }
    }
  }
}
</script>
<style scoped>
.table {
  margin-top: 20px;
}

.pageStyle {
  margin-top: 20px;
  float: right;
}
</style>
