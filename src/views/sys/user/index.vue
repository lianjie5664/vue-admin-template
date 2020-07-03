<template>
  <div class="user-wrap">
    <el-row :gutter="15" class="mt15">
      <el-col :span="4">
        <user-tree :treeData="officeTreeData" @nodeClick="handleNodeClick"></user-tree>
      </el-col>
      <el-col :span="20">
        <div class="user-oprate-group mb15">
          <el-row :gutter="10">
            <el-col :span="2">
              <el-button type="primary" plain round size="mini" icon="el-icon-plus" @click="showUserAddModal">用户录入</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="warning" plain round size="mini" icon="el-icon-edit" @click="showResetPasswdModal">密码重置</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="user-list">
          <user-table
            :userList="users"
            :listLoading="listLoading"
            :total="totalCount"
            @editUser="handleEditUser"
            @delUser="handleDelUser"
            @giveData="getResetPwdRow"
            @pageChange="handlePageChange"
            @activationUser="handleActivationUser"
            @lockUser="handleLockUser"
            @deleteUser="handleDeleteUser"
          ></user-table>
        </div>
      </el-col>
    </el-row>

    <!-- resetpassword modal -->
    <el-dialog
      title="重置密码"
      width="25%"
      :visible.sync="editPasswdModal"
      :close-on-click-modal="false"
    >
      <el-form ref="resetForm" :model="resetForm" :rules="rules">
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="resetForm.password"
            placeholder="请输入密码"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="passwordRepeat">
          <el-input
            v-model="resetForm.passwordRepeat"
            placeholder="请再次输入密码"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editPasswdModal = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleRestPasswd('resetForm')"
          :loading="resetBtnLoading"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- useradd form modal -->
    <user-add
      :show.sync="userAddModal"
      :modalType="modalType"
      :userModel="user"
      :rolearr="rolearr"
      :industy="industy"
      @userAdd="handleSaveUser"
      @userModify="handleUserModify"
    ></user-add>
  </div>
</template>
<script>
import UserTable from "./components/userTable";
import UserAdd from "./components/userAdd";
import { notice } from "@/utils/tools";
import { roleList } from "@/api/role";
import { industies } from "@/utils/industry.js";
import UserTree from "@/components/Tree/index";
import { officeTree } from '@/api/org'
import {
  userList,
  changeUserPwd,
  saveUser,
  activationUser,
  lockUser,
  deleteUser
} from "@/api/user";
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resetForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formParams: {
        username: "",
        nickname: ""
      },
      resetForm: {
        password: "",
        passwordRepeat: ""
      },
      industy: industies,
      users: [],
      rolearr: [],

      listLoading: false,
      selectedRow: {},
      editPasswdModal: false,
      resetBtnLoading: false,
      userAddModal: false,

      totalCount: 0,
      activeOfficeId:'',
      currentPage: 1,
      pageSize: 10,
      modalType: 0,
      user: {},

      rules: {
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
        ],
        passwordRepeat: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      officeTreeData:[]
    };
  },
  components: { UserTable, UserAdd, UserTree },
  methods: {
    expand(data) {
      data.className = "el-icon-folder-opened mr10";
    },
    close(data) {
      data.className = "el-icon-folder mr10";
    },
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <i class={data.className}></i>
          <span>{node.label}</span>
        </span>
      );
    },
    getOfficeTree(){
      officeTree({}).then((res =>{
        if(res.code == 1){
          let data = this.multiarrson(res.data[0])
          this.officeTreeData.push(data)
          this.activeOfficeId = this.officeTreeData[0].id
        }
      }))
    },
    multiarrson(arr) {
      arr.className = 'el-icon-folder-opened mr10'
      var chidren = arr.children;
      if (chidren == null || chidren.length == 0) {
        return;
      } else {
        for (var i = 0 ; i < chidren.length;i++){
          this.multiarrson(chidren[i]);
        }
      }
      return arr
    },
    handleEditUser(row) {
      this.userAddModal = true;
      this.modalType = 1;
      this.user = row;
    },
    handleDelUser(row) {},
    getResetPwdRow(row) {
      this.selectedRow = row;
    },
    // 显示重置密码对话框
    showResetPasswdModal() {
      if (JSON.stringify(this.selectedRow) == "{}") return;
      this.resetForm.password = "";
      this.resetForm.passwordRepeat = "";
      this.editPasswdModal = true;
    },
    // 重置 用户密码
    handleRestPasswd(formName) {
      this.resetBtnLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            id: this.selectedRow.id,
            password: this.resetForm.password
          };
          changeUserPwd(data).then(res => {
            this.resetBtnLoading = false;
            this.editPasswdModal = false;
            if (res.code == 1) {
              notice(1, "密码重置成功！", 1);
            } else {
              notice(0, res.msg, 0);
            }
          });
        } else {
          this.resetBtnLoading = false;
        }
      });
    },
    // 激活用户
    handleActivationUser(id) {
      activationUser(id).then(res => {
        if (res.code == 1) {
          notice(1, "操作成功！", 1);
        } else {
          notice(0, "操作失败！", 0);
        }
      });
    },
    // 锁定用户
    handleLockUser(id) {
      lockUser(id).then(res => {
        if (res.code == 1) {
          notice(1, "操作成功！", 1);
        } else {
          notice(0, "操作失败！", 0);
        }
      });
    },
    // 删除用户
    handleDeleteUser(row) {
      if (row) {
        this.$confirm("确定要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteUser({ id: row.id }).then(res => {
              if (res.code == 1) {
                notice(1, "删除成功！", 1);
                this.getUserList();
              } else {
                notice(0, "删除失败！", 0);
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 分页处理
    handlePageChange(currentPage) {
      // do 分页
      this.getUserList(currentPage, this.pageSize);
    },
    // 显示用户添加modal
    showUserAddModal() {
      this.modalType = 0;
      this.user = {};
      this.userAddModal = true;
    },
    // 获取用户列表
    getUserList(currentPage, pageSize) {
      this.listLoading = true;
      let params = { 
        pageNo: currentPage, 
        pageSize: pageSize,
        officeId: this.activeOfficeId
      }
      userList(params).then(res => {
        let { code, data } = res;
        this.totalCount = data.count;
        this.users = data.data;
        this.listLoading = false;
      });
    },
    // 保存用户
    handleSaveUser(data) {
      saveUser(data).then(res => {
        this.userAddModal = false;
        if (res.code == 1) {
          notice(1, "添加成功！", 1);
          this.getUserList(this.currentPage,this.pageSize);
        } else {
          notice(0, "添加失败！", 0);
        }
      });
    },
    // 修改用户
    handleUserModify(data) {
      saveUser(data).then(res => {
        this.userAddModal = false;
        if (res.code == 1) {
          notice(1, "修改成功！", 1);
          this.getUserList(this.currentPage,this.pageSize);
        } else {
          notice(0, "修改失败！", 0);
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
    handleNodeClick(data){
        this.activeOfficeId = data.id
        this.getUserList(1, this.pageSize);
    }
  },
  created() {
    this.getOfficeTree()
    this.getUserList(this.currentPage, this.pageSize);
    this.getRoleList();
  }
};
</script>

<style lang="less">
.user-wrap {
  margin: 16px 20px 0;
}
.el-scrollbar__wrap {
  margin-bottom: 0 !important;
}
</style>