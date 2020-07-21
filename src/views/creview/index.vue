<template>
<div class="app-container">
  <el-select v-model="statusVal" placeholder="请选择状态" @change="initOption">
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
          <router-link :to="{path:'/creview/professor',
            query:{awardId: scope.row.awardId, gradeTotalOwnId: scope.row.gradeTotalOwnId}}">{{scope.row.total}}</router-link>
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

      <el-table-column label="操作" width="230" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" plain>
            <router-link :to="{path:'/creview/professor',query:{awardId:row.awardId, gradeTotalOwnId: row.gradeTotalOwnId}}">自评</router-link>
          </el-button>
          <!-- <el-button size="mini" type="success" @click="handleDelAward(row)">
                            评审结果
                        </el-button> -->
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
  getOwnList
} from '@/api/review'
import {
  gradeOwnRole
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
  created() {
    this.getStatusList()
    this.fetchList(this.currentPage, this.pageSize, this.statusVal)
  },
  methods: {
    getStatusList () {
      gradeOwnRole({}).then(res => {
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
      getOwnList({
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
    handleDel(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

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
