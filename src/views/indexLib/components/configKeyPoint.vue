<template>
  <div class>
    <el-drawer
      title="关键点配置"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      custom-class="demo-drawer"
      size="50%"
    >
      <div class="demo-drawer__content">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="关键点配置" name="first">
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="grid-content">
                  <el-button
                    type="primary"
                    icon="el-icon-plus"
                    plain
                    size="mini"
                    v-hasPermi="['btn:keypoint:add']"
                    @click="handleAddKeyPoint"
                  >新增关键点</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="mt15">
              <el-col :span="24">
                <el-table :data="formData" class="tableStyle" ref="keyPointForm" border>
                  <el-table-column prop="sort" label="序号" align="center" width="80"></el-table-column>
                  <el-table-column prop="keyPoint" label="关键点" width="180"></el-table-column>
                  <el-table-column prop="description" label="详细说明"></el-table-column>
                  <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="info"
                        icon="el-icon-edit"
                        plain
                        size="mini"
                        v-hasPermi="['btn:keypoint:update']"
                        @click="showEditKeyPoint(scope.row)"
                      >修改</el-button>
                      <el-popconfirm title="确定删除吗？" @onConfirm="handleKeyPointDel(scope.row.id)">
                        <el-button
                          type="danger"
                          slot="reference"
                          icon="el-icon-delete"
                          size="mini"
                          v-hasPermi="['btn:keypoint:delete']"
                          plain
                        >删除</el-button>
                      </el-popconfirm>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane v-if="roleEnname == 'admin'" label="报告编制组件配置" name="second">
            <el-alert
              style="margin-bottom:12px;"
              title="此处为指标库的动态表单配置，针对无关键点的自定义表单，若已配置过关键点，则无需配置此处！"
              type="warning"
              show-icon
            ></el-alert>
            <vue-json-editor v-model="formStyle" :mode="'code'" :lang="'zh'"></vue-json-editor>
            <div class="draw-opt">
              <el-button @click="show = false">返回</el-button>
              <el-button
                type="primary"
                @click="handleFormSetting"
                :loading="loading"
              >{{ loading ? '提交中 ...' : '保 存' }}</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>
    <!-- 录入关键点 -->
    <info-form
      :dialogFormVisible="keyPointDialogVisble"
      :formData="keyPointData"
      :types="keyPointType"
      @close="keyPointDialogVisble = false"
      @edit="handleKeyPointEdit"
      @delete="handleKeyPointDel"
      @submit="handleKeyPointSave"
    ></info-form>
  </div>
</template>

<script>
import vueJsonEditor from "vue-json-editor";
import InfoForm from "../components/infoadd";
import { notice } from "@/utils/tools";
import { pointAdd, saveDynamicForm } from "@/api/award";
export default {
  data() {
    return {
      visible: this.show,
      activeName: "first",
      current: {},
      formData: [],
      formStyle: "",
      loading: false,
      keyPointData: {},
      keyPointDialogVisble: false,
      keyPointType: 0
    };
  },
  components: { vueJsonEditor, InfoForm },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: {}
    },
    tableData: {
      type: Array,
      default: []
    },
    formAssembly: {
      type: String,
      default: ""
    }
  },
  methods: {
    // delRow(rowIdx){
    //     this.formData.splice(rowIdx,1)
    // },
    // addRow(index){
    //     let muban = {time:'',name:'',dept:'',result:''}
    //     this.formData.push(muban)
    // },
    // handleSubmit(){
    //     let data = {
    //         awardId:this.awardId,
    //         standardId:this.id,
    //         description:this.formData
    //     }
    //     savaQaRept(data).then( res => {
    //         if(res.code == 1){
    //             notice(1,'保存成功！',1)
    //         }else{
    //             notice(0,'保存失败，请重试！',0)
    //         }
    //     })
    // },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    showEditKeyPoint(row) {
      this.keyPointType = 1;
      this.keyPointData = row;
      this.keyPointDialogVisble = true;
    },
    handleKeyPointSave(data) {
      let { keyPoint, description, sort } = data;
      let params = {
        standardId: this.current.id,
        keyPoint: keyPoint,
        description: description,
        sort: sort
      };
      pointAdd(params).then(res => {
        if (res.code == 1) {
          notice(1, "添加成功！", 1);
          // this.getPoint(this.currentRow.id)
        } else {
          notice(0, "添加失败！", 0);
        }
        this.keyPointDialogVisble = false;
        this.$emit("get", this.current.id);
      });
    },
    handleKeyPointEdit(data) {
      let { keyPoint, description, sort, id } = data;
      let params = {
        standardId: this.current.id,
        id: id,
        keyPoint: keyPoint,
        description: description,
        sort: sort
      };
      pointAdd(params).then(res => {
        if (res.code == 1) {
          notice(1, "修改成功！", 1);
          // this.getPoint(this.currentRow.id)
        } else {
          notice(0, "修改成功！", 0);
        }
        this.keyPointDialogVisble = false;
        this.$emit("get", this.current.id);
      });
    },
    handleKeyPointDel(id) {
      this.$emit("delete", id);
    },
    handleAddKeyPoint() {
      this.keyPointType = 0;
      this.keyPointData = {};
      this.keyPointDialogVisble = true;
    },
    handleFormSetting() {
      let params = {
        id: this.current.id,
        formStyle: this.formStyle
      };
      saveDynamicForm(params).then(res => {
        if (res.code == 1) {
          this.show = false;
          notice(1, "操作成功！" + res.msg, 1);
        }
        this.$emit("getListData");
      });
    }
  },
  watch: {
    show() {
      this.visible = this.show;
      this.current = this.data;
      this.formStyle = this.current.formStyle;
    },
    tableData(newVal) {
      this.formData = newVal;
    }
  },
  computed: {
    roleEnname () {
      return this.$store.getters.roleEnname
    }
  },
};
</script>

<style lang="less" scoped>
.dataTable {
  margin-top: 15px;
  border-collapse: collapse;
  border: 1px solid #ddd;
  width: 100%;
  th {
    vertical-align: baseline;
    padding: 12px 0;
    background-color: #eee;
    border-right: 1px solid #ddd;
    text-align: center;
    color: #666;
    border-bottom: solid 1px #ddd;
    font-size: 14px;
    font-weight: 700;
    &:first-child {
      width: 50px;
    }
    &:nth-child(3) {
      width: 60%;
    }
  }
  td {
    vertical-align: middle;
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
    font-size: 14px;
    &:first-child,
    &:nth-child(3) {
      text-align: center;
    }
    input {
      text-align: center;
    }
  }
  tr {
    padding: 8px;
    td {
      padding: 8px;
    }
  }
  .noborIpt {
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
  }
  .red {
    color: red;
  }
  .lh23 {
    margin: 0 4px;
    text-align: center;
  }
}
.draw-opt {
  margin-top: 20px;
  float: right;
}
</style>