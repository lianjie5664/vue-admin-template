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
          <router-link :to="{path:'/creview/newlist',
            query:{compileId: scope.row.compileId}}">{{scope.row.awardName}}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="分数">
        <template slot-scope="scope">
          <router-link :to="{path:'/creview/professor',
            query:{compileId: scope.row.compileId}}">{{scope.row.total}}</router-link>
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
          {{comStatusList[scope.row.status]}}
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
  gradeOwnRole,
} from '@/api/award'
import { comStatusList } from '@/config/setting'
export default {
  data() {
    return {
      comStatusList: comStatusList,
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
