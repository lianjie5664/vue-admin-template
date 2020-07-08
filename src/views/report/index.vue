<template>
  <div class="app-container">
    <div class="table">
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        >
        <el-table-column align="center" label="编号" width="95">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="所属年度" width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.compileTime }} 年</span>
          </template>
        </el-table-column>
        <el-table-column label="奖项名称">
          <template slot-scope="scope">{{ scope.row.awardName }}</template>
        </el-table-column>
        <el-table-column label="地区" width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.awardArea }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述">
          <template slot-scope="scope">{{ scope.row.awardDescription }}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="160px" align="center">
          <template slot-scope="scope">{{ scope.row.createDate }}</template>
        </el-table-column>
        <el-table-column label="更新时间" width="160px" align="center">
          <template slot-scope="scope">{{ scope.row.updateDate }}</template>
        </el-table-column>
        <!-- <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{ scope.row.status }}</template>
        </el-table-column> -->
        <el-table-column
          label="操作"
          width="160"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="success" size="mini" plain @click="export2Word(row)">导出</el-button>
            <el-dropdown @command="handleCommand" trigger="click">
              <el-button type="primary" size="mini" plain>
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{type:'edit',params:row}">修改</el-dropdown-item>
                <el-dropdown-item :command="{type:'delete',params:row}">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      background
       class="pageStyle"
      :page-size="pageSize"
      @current-change="current_change"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
    </div>
  </div>
</template>
<script>
import { getReportCompileList, exportWord,delRecord } from "@/api/award";
import { statusFilter } from "@/utils/filter";
import { notice } from "@/utils/tools";
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      total:0,
      pageSize:10
    };
  },
  created() {
    this.getCompileList(this.currentPage,this.pageSize);
  },
  methods: {
    getCompileList(currentPage,pageSize) {
      this.listLoading = true;
      getReportCompileList({pageNo:currentPage,pageSize:pageSize}).then(response => {
        this.list = response.data.data;
        this.total = response.data.count
        this.listLoading = false;
      });
    },
    export2Word(row) {
      let data = {
        createUserId: row.createUserId,
        awardId: row.awardId,
        filename:row.compileTime + '年' +row.createUserName + ' - ' +row.awardName  
      };
      exportWord(data).then(res => {
        // console.log(res)
        // if(res.code == 1){
        //     alert('daochuchenggong!')
        // }
      });
    },
    // 删除编制项
    handleDelRecord(row) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          delRecord({ compileId: row.compileId }).then(res => {
            if (res.code == 1) {
              notice(1, "删除成功！", 1);
              this.getCompileList(this.currentPage,this.pageSize);
            } else {
              notice(0, "删除失败！", 0);
            }
          });
        }).catch(() => {});
    },
    handleCommand(command) {
      if (command.type === "edit") {
        this.edit(command.params);
      } else if(command.type === "delete") {
        this.handleDelRecord(command.params)
      }
    },
    edit(row) {
      this.$router.push({
        path: "compile/" + row.awardId,
        query: { compileTime: row.compileTime, compileId: row.compileId,cuid:row.createUserId }
      });
    },
    current_change(currentPage){
      this.getCompileList(currentPage,this.pageSize);
    }
  }
};
</script>
<style scoped>
.table {
  margin-top: 20px;
}
.pageStyle{
  margin-top:20px;
  float: right;
}
</style>