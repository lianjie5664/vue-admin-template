<template>
  <div class="cuser-wrapper">
    <el-row :gutter="20">
      <el-col :span="4" class="search-box">
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
          <el-table-column label="登录账户" align="center">
            <template slot-scope="scope">{{ scope.row.mobile }}</template>
          </el-table-column>
          <el-table-column prop="name" label="用户姓名" align="center" width="100"></el-table-column>
          <el-table-column prop="roleName" label="用户角色" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="email" label="电子邮箱" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="loginFlag" label="用户状态" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.loginFlag"
                :active-value="'1'"
                :inactive-value="'0'"
                active-color="#13ce66"
                @change="changeCompanyUserStatus(scope.row)"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="updateDate" label="更新时间" align="center"></el-table-column>
          <el-table-column label="操作" v-if="active==0" align="center">
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
        <el-form-item label="用户角色" prop="roleId">
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
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="handleSaveUser('userForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { 
  getUserByRoleName, 
  saveUser,
  activationUser,
  lockUser,
  deleteUser
} from '@/api/user'
import { notice } from '@/utils/tools'
import { roleList } from "@/api/role"
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
      rolearr:[],
      activeRoleName: '',
      params:{
        pageSize:10,
        pageNo:1,
      },
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
          name: "企业管理员",
          roleName:'com_admin'
        },
        {
          id: "1",
          name: "企业编制员",
          roleName:'com_compiler'
        },
        {
          id: "2",
          name: "企业自评员",
          roleName:'com_self_reviewer'
        }
      ],
      active: 0
    };
  },
  methods: {
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
      this.activeRoleName = user.roleName
      this.currentSelectItem = {}
      this.fetchCompanyUserList(user.roleName)
    },
    fetchCompanyUserList(roleName) {
      roleName = roleName || 'com_admin'
      this.params.enName = roleName
      getUserByRoleName(this.params).then((res => {
        if(res.code == 1 && res.data.data){
          let resdata = res.data.data
          resdata.forEach(item => {
            item.checked = false;
          });
          this.tableData = resdata;
        }
      }))
    },
    changeCompanyUserStatus(row) {
      if (parseInt(row.loginFlag) == 0) {
        // 锁定
        this.handleLockUser(row.id)
      } else {
        //激活
        this.handleActivationUser(row.id)
      }
    },
    handleActivationUser(id) {
      activationUser({id:id}).then(res => {
        if (res.code == 1) {
          notice(1, "操作成功！", 1);
        } else {
          notice(0, "操作失败！", 0);
        }
      });
    },
    // 锁定用户
    handleLockUser(id) {
      lockUser({id:id}).then(res => {
        if (res.code == 1) {
          notice(1, "操作成功！", 1);
        } else {
          notice(0, "操作失败！", 0);
        }
      });
    },
    getRoleList() {
      roleList({}).then(res => {
        if (res.code == 1) {
          this.rolearr = res.data;
        }
      });
    },
    handleSaveUser() {
      let params = Object.assign(this.userForm,{officeId:this.$store.state.user.user.companyId})
      saveUser(params).then(res => {
        this.visible = false;
        if (res.code == 1) {
          notice(1, "添加成功！", 1);
          this.fetchCompanyUserList(this.activeRoleName);
        } else {
          notice(0, "添加失败！", 0);
        }
      });
    },
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
        }).then(() => {
            //todo删除
          })
          .catch((error) => {
            console.log('error ====>',error)
          });
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
    // this.setTable();
    this.getRoleList()
    this.fetchCompanyUserList()
    // this.fetchCompanyUserList(0);
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
      line-height: 35px;
      font-size: 14px;
      padding-left: 15px;
      margin-bottom: 12px;
      border-radius: 4px;
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