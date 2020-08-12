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
    <el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column align="center" label="编号" width="95">
        <template slot-scope="scope">
          {{ scope.$index +1}}
        </template>
      </el-table-column>
      <el-table-column label="奖项类型">
        <template slot-scope="scope">
          {{ scope.row.awardName }}
        </template>
      </el-table-column>
      <el-table-column label="分数">
        <template slot-scope="scope">
          <router-link :to="{path:'/mreview/professor',
            query:{awardId: scope.row.awardId, gradeTotalMyhId: scope.row.gradeTotalMyhId}}">{{scope.row.total}}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="编制人">
        <template slot-scope="scope">
          {{ scope.row.companyName }}
        </template>
      </el-table-column>
      <el-table-column label="评审时间">
        <template slot-scope="scope">
          {{ scope.row.updateDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230" align="center" class-name="small-padding fixed-width" v-if="roleEnname !== 'admin'">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" plain v-show="roleEnname === 'myh_experts' && +row.status === 103030003">
            <router-link :to="{path:'/mreview/professor',query:{awardId:row.awardId, gradeTotalMyhId: row.gradeTotalMyhId}}">顾问打分</router-link>
          </el-button>
          <el-button v-show="roleEnname === 'myh_experts' && +row.status === 103030003" type="primary" size="mini" plain @click="toComAduit(row)">提交打分结果</el-button>
          <el-button size="mini" disabled  v-show="+row.status !== 103030003">暂无</el-button>
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
  getGwList
} from '@/api/review'
import {
  gradeMyhRole,
  myhExpertAgree,
} from '@/api/award'
import {
  notice
} from '@/utils/tools'
export default {
  data() {
    return {
      statusList: [],
      statusVal: '',
      pageSize: 10,
      total: 0,
      currentPage: 1,
      list: null,
      listLoading: false,
      selectedRow: '',
      formData: {
        awardList: [{
          type: 'Input',
          label: '奖项名称',
          prop: 'name',
          placeholder: '请输入奖项名称',
          value: ''
        },
        {
          type: 'Input',
          label: '所在地区',
          prop: 'area',
          placeholder: '请输入所在地区',
          value: ''
        },
        {
          type: 'TextArea',
          label: '奖项描述',
          prop: 'description',
          placeholder: '请输入奖项描述',
          value: ''
        }]
      },
    }
  },
  computed: {
    roleEnname () {
      return this.$store.getters.roleEnname
    }
  },
  created() {
    this.getStatusList()
    this.fetchList(this.currentPage, this.pageSize, this.statusVal)
  },
  methods: {
    getStatusList () {
      gradeMyhRole({}).then(res => {
        if (res && res.data && res.data[0]) {
          this.statusList = res.data
        }
      })
    },
    initOption () {
      this.fetchList(this.currentPage, this.pageSize, this.statusVal)
    },
    fetchList(currentPage, pageSize, statusVal) {
      this.listLoading = true
      getGwList({
        pageNo: currentPage,
        pageSize: pageSize,
        status: statusVal
      }).then(response => {
        this.list = response.data.data
        this.listLoading = false
        this.total = response.data.count
      })
    },
    // 顾问-MYH专家提交评审结果
    toComAduit (row) {
      this.$confirm('确定提交本次打分结果吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        myhExpertAgree({
          gradeTotalMyhId: row.gradeTotalMyhId
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
    handleSelectionChange(selection) {
      if (selection.length > 1) {
        let del_row = selection.shift()
        this.$refs.multipleTable.toggleRowSelection(del_row, false)
      }
      if (selection.length != 0) {
        this.selectedRow = selection[0].id
      }
    },
    current_change (currentPage) {
      this.fetchList(currentPage, this.pageSize, this.statusVal)
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
