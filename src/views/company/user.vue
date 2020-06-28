<template>
  <div class="cuser-wrapper">
    <el-row :gutter="15">
      <el-col :span="4" class="search-box">
        <el-input placeholder="搜索" size="small" suffix-icon="el-icon-search" v-model="searchVal"></el-input>
        <div class="role-list">
          <div
            class="item"
            v-for="(user,index) in companyUserRoleList"
            :key="index"
            :class="{active:index == active}"
            @click="handleSelectCompanyUser(user,index)"
          >{{user.name}}</div>
        </div>
      </el-col>
      <el-col :span="20">
        <el-table
          ref="cuser"
          border
          :data="searchData"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号" width="120" align="center">
            <template slot-scope="scope">{{ scope.row.index }}</template>
          </el-table-column>
          <el-table-column prop="account" label="登录账户" width="120"></el-table-column>
          <el-table-column prop="role" width="120" label="角色" show-overflow-tooltip></el-table-column>
          <el-table-column prop="role" width="120" label="状态">
            <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.status"
                    :active-value="'1'"
                    :inactive-value="'0'"
                    active-color="#13ce66"
                    @change="changeCompanyUserStatus(scope.row)"
                    inactive-color="#ff4949">
                </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180" align="center"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="180" align="center"></el-table-column>
          <el-table-column prop="updateTime" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini">修改</el-button>
              <el-button type="danger" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchVal: "",
      multipleSelection: [],
      companyUserRoleList: [
        {
          id: "0",
          name: "企业负责人"
        },
        {
          id: "1",
          name: "企业编制员"
        },
        {
          id: "2",
          name: "企业自评员"
        }
      ],
      active: 0,
      tableData: [
        {
          index: 1,
          account: "王小虎",
          role: "1",
          createTime: "2020-11-11 20:22:22",
          updateTime: "3333"
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelectCompanyUser(user,index){
        this.active = index
    },
    fetchCompanyUserList(roleid){

    },
    changeCompanyUserStatus(row){
        if(parseInt(row.status) == 0){
            // 锁定
        }else{
            //激活
        }
    },
    lockCompanyUser(i){

    },
    unlockCompanyUser(i){

    }
  },
  computed: {
    searchData() {
      if (!this.searchVal) {
        return this.tableData;
      }
      return this.tableData.filter(v => {
        return v.account.includes(this.searchVal);
      });
    }
  },
  created(){
    // 获取企业用户列表
    // 默认获取企业管理员
    this.fetchCompanyUserList(0)
  }
};
</script>

<style lang="less" scoped>
.cuser-wrapper {
  padding: 15px;
  .search-box {
    background: #f4f6f8;
    // border-right: 1px solid #dedede;
    padding: 15px;
  }
  .role-list {
    margin-top: 15px;
    .item {
      background: #e7eaef;
      color: #333;
      line-height: 40px;
      font-size: 14px;
      padding-left: 15px;
      margin-bottom: 12px;
      border-radius: 40px;
      cursor: pointer;
      &:hover {
        background: #273eb0;
        color: #fff;
      }
    }
    .active{
        background: #273eb0;
        color: #fff;
    }
  }
}
</style>