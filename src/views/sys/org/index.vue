<template>
  <div class="org-manage">
    <!-- <el-col :span="4">
      <user-tree 
        :treeData="officeTreeData" 
        @nodeClick="handleNodeClick">
      </user-tree>
    </el-col>-->
    <!-- <el-row :gutter="10" class="mb15">
      <el-col :span="24">
        <el-button type="primary" plain round size="small" icon="el-icon-plus">新增单位</el-button>
        <el-button type="warning" plain round size="small" icon="el-icon-edit">编辑单位</el-button>
      </el-col>
    </el-row>-->
    <!-- <el-row :gutter="10" class="mb15">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchVal" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="企业" value="1"></el-option>
            <el-option label="政府" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search">查询</el-button>
        </el-input>
      </el-col>
    </el-row>-->
    <el-tabs type="border-card" v-model="parentId" @tab-click="handleTabClick">
      <el-tab-pane v-for="(item,index) in officeTreeData" :key="index" :name="item.id">
        <span slot="label">
          <i class="el-icon-date"></i>
          {{item.label}}
        </span>
        <el-row :gutter="10" class="mb15">
          <el-col :span="24">
            <el-button
              type="primary"
              plain
              size="small"
              icon="el-icon-plus"
              @click="showAddOrgDialog"
            >新增</el-button>
            <el-button
              type="warning"
              plain
              size="small"
              icon="el-icon-edit"
              :disabled="editStatus"
              @click="showEditOrgDialog"
            >编辑</el-button>
            <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete">
              <el-button
                type="danger"
                slot="reference"
                icon="el-icon-delete"
                size="mini"
                :disabled="editStatus"
                plain
              >删除</el-button>
            </el-popconfirm>
          </el-col>
        </el-row>
        <org-table :tableData="tableData" :loading="tableLoading" @selectRow="handleSelectRow"></org-table>
        <div class="pageStyle">
          <el-pagination
            class="fr"
            background
            layout="prev, pager, next"
            @current-change="current_change"
            :total="total"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 政府</span>
        <el-button type="primary" plain size="small" icon="el-icon-plus" @click="showAddOrgDialog">新增</el-button>
        <el-button type="warning" plain size="small" icon="el-icon-edit">编辑</el-button>
        <org-table :tableData="tableData"></org-table>
      </el-tab-pane>-->
    </el-tabs>
    <!-- 新增 编辑 -->
    <el-dialog
      :title="dialogType == 0 ? '新建组织' : '编辑组织'"
      :visible.sync="orgFormVisible"
      :close-on-click-modal="false"
      width="600px"
    >
      <el-form ref="orgForm" :model="orgForm" :rules="rules" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="单位名称" prop="name">
              <el-input v-model="orgForm.name" placeholder="请输入单位名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="归属区域" prop="code">
              <el-cascader
                size="large"
                style="width:480px;"
                :options="options"
                v-model="orgForm.code"
                placeholder="请选择归属区域"
                :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="联系地址" prop="address">
              <el-input v-model="orgForm.address" placeholder="请输入联系地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="orgForm.phone" placeholder="请输入联系电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="传真" prop="fax">
              <el-input v-model="orgForm.fax" placeholder="请输入传真"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="orgForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="orgFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitOrgForm('orgForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "./index.less";
import { officeTree, orgList, orgDelete } from "@/api/org";
import { notice, multiarrson } from "@/utils/tools";
import { saveOrg } from "@/api/org";
import UserTree from "@/components/Tree/index";
import { regionData } from "element-china-area-data";
import OrgTable from "./table";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    var checkFax = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("传真不能为空"));
      } else {
        const reg = /^(\d{3,4}-)?\d{7,8}$/;
        const isTel = reg.test(value);
        if (value.length < 10 || value.length > 13 || !isTel) {
          //判断传真字符范围是在10到13
          callback(new Error("座机或传真格式如:0376-1234567"));
        } else {
          callback();
        }
      }
    };
    return {
      officeTreeData: [],
      searchVal: "",
      select: "",
      options: regionData,
      dialogType: 0,
      orgFormVisible: false,
      parentId: "",
      editStatus: true,
      tableLoading: true,
      orgForm: {
        parentId: "",
        name: "",
        code: [],
        address: "",
        phone: "",
        fax: "",
        email: ""
      },
      pageSize: 10,
      pageNo: 1,
      total: 0,
      currentRow: {},
      rules: {
        parentId: [
          { required: true, message: "请选择上级", trigger: "change" }
        ],
        name: [{ required: true, message: "单位名称不能为空", trigger: "blur" }],
        code: [
          {
            required: true,
            type: "array",
            message: "归属地不能为空",
            trigger: "blur"
          }
        ],
        address: [
          { required: true, message: "联系地址不能为空", trigger: "blur" }
        ],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        fax: [{ validator: checkFax, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }]
      },
      tableData: []
    };
  },
  components: {
    UserTree,
    OrgTable
  },
  methods: {
    showAddOrgDialog() {
      this.orgForm = {};
      this.orgForm.parentId = this.parentId;
      this.orgFormVisible = true;
    },
    showEditOrgDialog() {
      this.dialogType = 1;
      this.orgForm = this.currentRow || {};
      this.orgFormVisible = true;
    },
    handleTabClick(data, event) {
      this.orgForm.parentId = data.name;
      this.pageNo = 1;
      this.tableLoading = true
      this.getOrgList();
    },
    handleSelectRow(row) {
      this.editStatus = false;
      this.currentRow = row;
    },
    handleSubmitOrgForm(formName) {
      this.$refs[formName].validate(valid => {
        if(valid){
          saveOrg(this.orgForm).then(res => {
            if (res.code == 1) {
              notice(1, "操作成功！", 1);
              this.orgFormVisible = false;
              this.getOrgList();
            } else {
              notice(0, "操作失败！", 0);
              this.orgFormVisible = false;
            }
          });
        }
      });
    },
    handleDelete() {
      if (this.currentRow) {
        orgDelete({ id: this.currentRow.id }).then(res => {
          if (res.code == 1) {
            notice(1, "操作成功！", 1);
            this.editStatus = true;
            this.getOrgList();
          }
        });
      }
    },
    current_change(currentPage) {
      this.pageNo = currentPage;
      this.getOrgList();
    },
    async getOfficeTree() {
      await officeTree({}).then(res => {
        if (res.code == 1) {
          let data = multiarrson(res.data[0]);
          this.officeTreeData = data.children;
          this.orgForm.parentId = this.parentId = data.children[0].id;
        }
      });
    },
    getOrgList() {
      let filter = {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        parentId: this.orgForm.parentId
      };

      orgList(filter).then(res => {
        let data = res.data.data;
        data.map(v => {
          if (v.code) {
            v.code = v.code
              .toString()
              .replace(/\[|]/g, "")
              .replace(/\"/g, "")
              .split(",");
          }
        });
        this.tableData = data;
        this.total = res.data.total;
        this.tableLoading = false;
      });
    },
    handleNodeClick(data) {
      console.log(data);
    }
  },
  mounted() {
    this.getOfficeTree().then(() => {
      this.getOrgList();
    });
  }
};
</script>
