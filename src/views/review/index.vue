<template>
<div class="app-container">
  <el-select v-model="statusVal" placeholder="请选择状态" @change="initOption">
    <el-option
      v-for="(item, index) in statusList"
      :key="index"
      :label="item"
      :value="index">
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
          {{ scope.row.awardName }}
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
          {{allStatusList[scope.row.status]}}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="230" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" plain v-show="roleEnname === 'review_experts'">
            <router-link :to="{path:'/review/professor',
                            query:{awardId:row.awardId,
                            reportUserId:row.createUserId,
                            gradeTotalId: row.gradeTotalId,
                            createUserId:row.createUserId,gradeUserId:row.gradeUserId}}">评审</router-link>
          </el-button>
          <el-button v-show="roleEnname === 'review_experts'" type="primary" size="mini" plain @click="toAduit(row)">提交评审结果</el-button>
          <el-button v-show="roleEnname === 'gov_admin'" type="primary" size="mini" plain @click="toAgree(row)">审核通过</el-button>
          <el-button v-show="roleEnname === 'gov_admin'" type="primary" size="mini" plain @click="toBack(row)">审核退回</el-button>
          <el-button v-show="roleEnname === 'com_self_reviewer'" type="primary" size="mini" plain @click="toComAduit(row)">提交自评结果</el-button>
          <el-button v-show="roleEnname === 'com_admin'" type="primary" size="mini" plain @click="comAgree(row)">通过</el-button>
          <el-button v-show="roleEnname === 'com_admin'" type="primary" size="mini" plain @click="comBack(row)">退回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pageStyle" :page-size="pageSize" layout="total,prev, pager, next" @current-change="current_change" :total="total">
    </el-pagination>
  </div>
</div>
</template>
<script>
import {
  reportList,
  expertToGovern,
  govAdminAgree,
  govAdminBack,
  expertToCom,
  comAdminAgree,
  comAdminBack
} from '@/api/award'
import {
  notice
} from '@/utils/tools'
import { allStatusList } from '@/config/setting'
export default {
  data() {
    return {
      allStatusList: allStatusList,
      statusList: {
        '103010007': '待评审',
        '103010008': '已提交，待审核',
        '103010009': '审核通过',
        '103010010': '评审结果被退回',
        '103010011': '评审结果已纳入统计',
      },
      statusVal: '',
      pageSize: 10,
      total: 0,
      currentPage: 1,
      list: null,
      listLoading: false,
      awardVisble: {
        v: false
      },
      selectedRow: '',
      formData: {
        awardList: [{
          type: 'Input',
          label: '奖项名称',
          prop: 'name',
          placeholder: '请输入奖项名称',
          value: ''
        }, {
          type: 'Input',
          label: '所在地区',
          prop: 'area',
          placeholder: '请输入所在地区',
          value: ''
        }, {
          type: 'TextArea',
          label: '奖项描述',
          prop: 'description',
          placeholder: '请输入奖项描述',
          value: ''
        }]
      }
    }
  },
  created() {
    this.fetchList(this.currentPage, this.pageSize, this.statusVal)
  },
  computed: {
    roleEnname () {
      return this.$store.getters.roleEnname
    }
  },
  methods: {
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
            this.fetchList(this.currentPage, this.pageSize, this.statusVal)
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
            this.fetchList(this.currentPage, this.pageSize, this.statusVal)
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
            this.fetchList(this.currentPage, this.pageSize, this.statusVal)
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
            this.fetchList(this.currentPage, this.pageSize, this.statusVal)
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
            this.fetchList(this.currentPage, this.pageSize, this.statusVal)
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
            this.fetchList(this.currentPage, this.pageSize, this.statusVal)
          } else {
            notice(0, '提交失败！', 0)
          }
        })
      }).catch(() => {})
    },
    initOption () {
      this.fetchList(this.currentPage, this.pageSize, this.statusVal)
    },
    fetchList(currentPage, pageSize, statusVal) {
      this.listLoading = true
      reportList({
        pageNo: currentPage,
        pageSize: pageSize,
        status: statusVal
      }).then(response => {
        this.list = response.data.data
        this.listLoading = false
        this.total = response.data.count
      })
    },
    showAwardForm() {
      this.awardVisble.v = true
    },
    handleAwardForm(data) {
      awardSave(data).then(res => {
        if (res.code == 1) {
          this.awardVisble.v = false
          notice(1, '奖项添加成功！', 1)
          this.fetchList()
        } else {
          notice(1, '奖项添加成功！', 1)
        }
      })
    },
    handleDelAward(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAward({
          id: row.id
        }).then(res => {
          if (res.code == 1) {
            notice(1, '奖项删除成功！', 1)
            this.fetchList()
          } else {
            notice(0, '奖项删除失败！', 0)
          }
        })
      }).catch(() => {});
    },
    handleSelectionChange(selection) {
      if (selection.length > 1) {
        let del_row = selection.shift();
        this.$refs.multipleTable.toggleRowSelection(del_row, false);
      }
      if (selection.length != 0) {
        this.selectedRow = selection[0].id
      }
    },
    current_change(currentPage) {
      this.fetchList(currentPage, this.pageSize, this.statusVal);
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
