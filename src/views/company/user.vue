<template>
  <div class="cuser-wrapper">
    <el-row :gutter="20">
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
        <el-row :gutter="15" class="mb15">
          <el-col :span="24">
            <el-button
              type="primary"
              :disabled="active == 0"
              icon="el-icon-plus"
              size="mini"
              plain
              @click="showAddUserDialog"
            >新增</el-button>
            <el-button
              type="warning"
              :disabled="active == 0 || !editBtn"
              icon="el-icon-edit"
              size="mini"
              plain
              @click="showEditUserDialog"
            >编辑</el-button>
            <el-button
              type="danger"
              :disabled="active == 0 || !editBtn"
              size="mini"
              icon="el-icon-delete"
              plain
              @click="deleteUser"
            >删除</el-button>
          </el-col>
        </el-row>
        <el-table
          ref="cuser"
          border
          :data="searchData"
          highlight-current-row
          tooltip-effect="dark"
          @current-change="handleSelectionChange"
        >
          <el-table-column width="55" label="选择">
            <template slot-scope="scope">
              <div class="select-wrap" style="width:100%;height:30px;position:relative;">
                <div class="select-level1" style="width:100%;height:100%;position:absolute;z-index:2">&nbsp;</div>
                <el-checkbox  class="select-level2" v-model="scope.row.checked" style="width:100%;height:100%;position:absolute;z-index:1;"></el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="序号" align="center">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column prop="name" label="登录账户" width="120"></el-table-column>
          <el-table-column prop="role" label="角色" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="'1'"
                :inactive-value="'0'"
                active-color="#13ce66"
                @change="changeCompanyUserStatus(scope.row)"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
          <el-table-column prop="updateTime" label="操作" v-if="active==0" align="center">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-refresh" size="mini" plain>转移</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- useradd -->

    <el-dialog
      :title="modalType == 0?'企业用户录入':'企业用户编辑'"
      width="450px"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      :close-on-click-modal="false"
    >
      <el-form ref="userForm" :model="userForm" label-position="right" label-width="80px">
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="userForm.mobile" size="small" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="userForm.name" size="small" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="passWord">
          <el-input
            type="password"
            v-model="userForm.passWord"
            size="small"
            placeholder="请输入密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="userForm.email" size="small" placeholder="请输入电子邮箱" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户角色" prop="roleId">
          <el-select
            v-model="userForm.roleId"
            size="small"
            style="width:100%;"
            placeholder="请选择用户角色"
          >
            <el-option
              v-for="item in rolearr"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="handleEditUser('userForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalType: 0,
      visible: false,
      editBtn: false,
      searchVal: "",
      checked: null,
      tableData: [],
      currentSelectItem: {},
      userForm: {
        mobile: "",
        name: "",
        roleId: "",
        email: "",
        password: ""
      },
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
      active: 0
    };
  },
  methods: {
    setTable() {
      let resdata = [
        {
          id: 44,
          mobile: "15151515151",
          name: "王er虎",
          password: "123456",
          email: "1234@qq.com",
          role: "1",
          createTime: "2020-11-11 20:22:22",
          updateTime: "3333"
        },
        {
          id: 89,
          mobile: "15151515152",
          name: "王大虎",
          password: "123456",
          email: "12345@qq.com",
          role: "1",
          createTime: "2020-11-11 20:22:22",
          updateTime: "3333"
        }
      ];
      // 后台数据返回后,手动添加一个checked属性控制选中与否 如果是使用el-rodio单选框,不需要这一步
      resdata.forEach(item => {
        item.checked = false;
      });
      this.tableData = resdata;
    },
    handleSelectionChange(row) {
      this.tableData.forEach(item => {
        // 排他,每次选择时把其他选项都清除
        if (item.id !== row.id) {
          item.checked = false;
        } else if (item.id === row.id) {
          item.checked = true;
        }
      });
      this.editBtn = true;
      this.modalType = 1;
      this.currentSelectItem = row;
      this.userForm = row;
    },
    handleSelectCompanyUser(user, index) {
      this.active = index;
    },
    fetchCompanyUserList(roleid) {},
    changeCompanyUserStatus(row) {
      if (parseInt(row.status) == 0) {
        // 锁定
      } else {
        //激活
      }
    },
    lockCompanyUser(i) {},
    unlockCompanyUser(i) {},
    handleEditUser() {},
    showAddUserDialog() {
      this.userForm = {};
      this.modalType = 0;
      this.visible = true;
    },
    showEditUserDialog() {
      this.userForm = this.currentSelectItem;
      this.visible = true;
    },
    deleteUser() {
      if (this.currentSelectItem) {
        this.$confirm("确定要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            //todo删除
          })
          .catch(() => {});
      }
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
  created() {
    // 获取企业用户列表
    // 默认获取企业管理员
    this.setTable();
    this.fetchCompanyUserList(0);
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
    .active {
      background: #273eb0;
      color: #fff;
    }
  }
  .user-dept {
    padding: 15px 0;
  }
  .mb15 {
    margin-bottom: 15px;
  }
  .mt15 {
    margin-top: 15px;
  }
  .mr10 {
    margin-right: 10px;
  }
}
</style>