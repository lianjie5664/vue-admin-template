<template>
<div class="app-container">
  <div class="table">
    <el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
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
      <el-table-column label="操作" width="160" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="success" size="mini" plain @click="export2Word(row)">导出</el-button>
          <el-dropdown @command="handleCommand" trigger="click">
            <el-button type="primary" size="mini" plain>
              更多
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-show="roleEnname === 'gov_audit'" :command="{type:'allot',params: row}">分配评审专家</el-dropdown-item> <!--政府审核负责人分配专家-->
              <el-dropdown-item v-show="roleEnname === 'com_admin'" :command="{type:'approve',params: row}">审核通过</el-dropdown-item> <!--企业管理人通过-->
              <el-dropdown-item v-show="roleEnname === 'com_admin'" :command="{type:'return',params: row}">审核退回</el-dropdown-item> <!--企业管理人退回-->
              <el-dropdown-item v-show="roleEnname === 'com_compiler'" :command="{type:'aduit',params: row}">提交审核</el-dropdown-item> <!--企业奖编制人提交审核-->
              <el-dropdown-item v-show="roleEnname === 'com_compiler'" :command="{type:'edit',params: row}">修改</el-dropdown-item>
              <el-dropdown-item v-show="roleEnname === 'com_compiler'" :command="{type:'delete',params: row}">删除</el-dropdown-item>
              <el-dropdown-item v-show="roleEnname === 'gov_inter'" :command="{type:'govApprove',params: row}">审核通过</el-dropdown-item> <!--政府预审员通过-->
              <el-dropdown-item v-show="roleEnname === 'gov_inter'" :command="{type:'govBack',params: row}">审核退回</el-dropdown-item> <!--政府预审员退回-->
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 评审专家分配表 -->
          <el-dialog title="评审专家分配表" :visible.sync="govDailogVisible" class="govDailog">
            <el-checkbox-group v-model="govChecked">
              <el-checkbox v-for="item in allotList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
              <el-button @click="govDailogVisible = false">取 消</el-button>
              <el-button type="primary" @click.native="govSubmit(row)">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background class="pageStyle" :page-size="pageSize" @current-change="current_change" layout="prev, pager, next" :total="total"></el-pagination>

  </div>
</div>
</template>
<script>
import {
  getReportCompileList,
  exportWord,
  delRecord,
  aduitRecord,
  toBack,
  toGovern,
  govInterAgree,
  govInterBack,
  govExpert,
  userList
} from '@/api/award';
import {
  statusFilter
} from '@/utils/filter';
import {
  notice
} from '@/utils/tools';
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      total: 0,
      pageSize: 10,
      govDailogVisible: false, // 政府评审专家弹框
      allotList: [], // 评审专员列表
      govChecked: [], // 选中
    };
  },
  created() {
    this.getCompileList(this.currentPage, this.pageSize)
    this.getUserList()
  },
  computed: {
    roleEnname () {
      return this.$store.getters.roleEnname
    }
  },
  methods: {
    getUserList () {
      userList({roleEnname: 'review_experts'}).then(res => {
        if (res && res.data && res.data.data && res.data.data[0]) {
          let newdata = res.data.data
          newdata.forEach(item => {
            this.allotList.push({
              id: item.id,
              name: item.name
            })
          })
        }
      })
    },
    getCompileList(currentPage, pageSize) {
      this.listLoading = true;
      getReportCompileList({
        pageNo: currentPage,
        pageSize: pageSize
      }).then(response => {
        this.list = response.data.data;
        this.total = response.data.count
        this.listLoading = false;
      });
    },
    export2Word(row) {
      let data = {
        createUserId: row.createUserId,
        awardId: row.awardId,
        filename: row.compileTime + '年' + row.createUserName + ' - ' + row.awardName
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
        delRecord({
          compileId: row.compileId
        }).then(res => {
          if (res.code == 1) {
            notice(1, "删除成功！", 1);
            this.getCompileList(this.currentPage, this.pageSize);
          } else {
            notice(0, "删除失败！", 0);
          }
        });
      }).catch(() => {});
    },
    handleCommand(command) {
      switch (command.type) {
        case 'edit':
          this.edit(command.params)
          break;
        case 'delete':
          this.handleDelRecord(command.params)
          break;
        case 'aduit':
          this.toAduit(command.params)
          break;
        case 'return':
          this.toReturn(command.params)
          break;
        case 'approve':
          this.toApprove(command.params)
          break;
        case 'govApprove':
          this.govAgree(command.params)
          break;
        case 'govBack':
          this.toGovBack(command.params)
          break;
        case 'allot':
          this.toGovAllot(command.params)
          break;
        default:
      }
    },
    govSubmit (row) {
      if (this.govChecked && this.govChecked[0]) {
        this.govDailogVisible = false
        govExpert({
          'compileId': row.compileId,
          'expertArray': this.govChecked
        }).then(res => {
          if (+res.code === 1) {
            notice(1, '分配成功', 1)
            this.getCompileList(this.currentPage, this.pageSize)
          } else {
            notice(0, '分配失败！', 0)
          }
        })
      } else {
        notice(0, '至少选择一位评审！', 0)
      }
    },
    // 政府审核负责人分配评审专家，待专家评审
    toGovAllot (row) {
      this.govChecked = []
      this.govDailogVisible = true
    },
    // 政府预审员退回
    toGovBack (row) {
      this.$prompt('请输入退回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then((val) => {
        govInterBack({
          'compileId': row.compileId,
          'backRemark': val.value
        }).then(res => {
          if (+res.code === 1) {
            notice(1, '退回成功', 1)
            this.getCompileList(this.currentPage, this.pageSize)
          } else {
            notice(0, '退回失败！', 0)
          }
        })
      }).catch(() => {})
    },
    // 政府预审员通过报告
    govAgree (row) {
      this.$confirm('确定通过审核？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        govInterAgree({
          compileId: row.compileId
        }).then(res => {
          if (+res.code === 1) {
            notice(1, '审核成功', 1)
            this.getCompileList(this.currentPage, this.pageSize)
          } else {
            notice(0, '审核失败！', 0)
          }
        })
      }).catch(() => {})
    },
    // 企业管理员提交报告编制到政府预审员
    toApprove (row) {
      this.$confirm('确定提交审核至政府？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        toGovern({
          compileId: row.compileId
        }).then(res => {
          if (+res.code === 1) {
            notice(1, '提交审核成功', 1)
            this.getCompileList(this.currentPage, this.pageSize)
          } else {
            notice(0, '提交审核失败！', 0)
          }
        })
      }).catch(() => {})
    },
    // 企业管理员退回报告
    toReturn (row) {
      this.$prompt('请输入退回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then((val) => {
        toBack({
          'compileId': row.compileId,
          'backRemark': val.value
        }).then(res => {
          if (+res.code === 1) {
            notice(1, '退回成功', 1)
            this.getCompileList(this.currentPage, this.pageSize)
          } else {
            notice(0, '退回失败！', 0)
          }
        })
      }).catch(() => {})
    },
    // 企业奖编制人提交审核
    toAduit (row) {
      this.$confirm('确定提交审核？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        aduitRecord({
          compileId: row.compileId
        }).then(res => {
          if (+res.code === 1) {
            notice(1, '提交成功', 1)
            this.getCompileList(this.currentPage, this.pageSize)
          } else {
            notice(0, '提交失败！', 0)
          }
        })
      }).catch(() => {})
    },
    edit(row) {
      this.$router.push({
        path: "compile/" + row.awardId,
        query: {
          compileTime: row.compileTime,
          compileId: row.compileId,
          cuid: row.createUserId
        }
      });
    },
    current_change(currentPage) {
      this.getCompileList(currentPage, this.pageSize);
    }
  }
};
</script>
<style scoped>
  .table {
    margin-top: 20px;
  }
  .pageStyle {
    margin-top: 20px;
    float: right;
  }
  .govDailog{

  }
</style>
