<template>
  <div class="statistics common-content">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content">
              <el-button
                type="primary"
                icon="el-icon-plus"
                plain
                size="mini"
                v-hasPermi="['btn:lib:add']"
                @click="showLeftModal">新增指标</el-button>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="contains">
      <tree-table
        ref="recTree"
        :list.sync="treeDataSource"
        @actionFunc="editLeftRow"
        @deleteFunc="deleteFunc"
        @getRowFunc="getRowFunc"
        @configFunc="showSaveForm"
        @subordinateFunc="subordinateFunc"
        @handlerExpand="handlerExpand"
      ></tree-table>
    </div>
    <!-- 指标库组件 -->
    <index-add
      labelWidth="80px"
      :indexData="leftFormData"
      :show.sync="leftModalVisible"
      :list="statisticDatas"
      :row="currentRow"
      :types="modalType"
      @submit="handleLeftForm"
    ></index-add>
    <config-kpt
      :show.sync="formSettingVisible"
      :data="currentRow"
      :tableData="tableData"
      @getListData="getData"
      @delete="delPoint"
      @get="getPoint"
    ></config-kpt>
  </div>
</template>
<script>
import IndexAdd from "./components/indexadd";
import InfoForm from "./components/infoadd";
import treeTable from "@/components/TreeTable/tree-table.vue";
import ConfigKpt from "./components/configKeyPoint";

import {
  findListByAward,
  awardCfgAdd,
  awardCfgModify,
  awardCfgDel,
  awardCfgUpt,
  pointAdd,
  pointDel,
  getPoints,
  saveDynamicForm
} from "@/api/award";
import { notice } from "@/utils/tools";
// import treeTable from '@/components/tree-table.vue'
export default {
  name: "ContractStatistic",
  components: { IndexAdd, InfoForm, treeTable, ConfigKpt },
  data() {
    return {
      list: [], // 请求原始数据
      treeDataSource: [],
      statisticDatas: [],
      currentRow: {},
      // rightTb:true,
      modalType: 0,
      keyPointType: 0,
      leftTb: true,
      leftModalVisible: false,
      formSettingVisible: false,
      // formSettingVal:'',
      // rightDialogVisble:{v:false},
      awardId: this.$route.params.id,
      keyPointId: "",
      editPointRow: {},
      leftFormData: {
        content: "", //指标内容
        // grade:'1',//指标等级
        name: "", //指标名称
        parentId: "", //父级指标
        score: "" //指标分值
      },
      tableData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getRowFunc(model) {
      // this.delAwardCfg(model.id)
      // console.log(1112,model)
    },
    deleteFunc(model) {
      this.delAwardCfg(model.id);
    },
    subordinateFunc(model) {
      this.modalType = 0;
      let { id } = model;
      (this.leftFormData = {
        content: "", //指标内容
        name: "", //指标名称
        parentId: id, //父级指标
        score: "" //指标分值
      }),
        (this.leftModalVisible = true);
    },
    handlerExpand(m) {
      m.isExpand = !m.isExpand;
    },
    getTreeData() {
      let cloneData = JSON.parse(JSON.stringify(this.list)); // 对源数据深度克隆
      this.treeDataSource = cloneData.filter(father => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(child => father.id == child.parentId); // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
        return father.parentId == 0; //返回第一层
      });
    },
    editLeftRow(row) {
      this.currentRow = row;
      this.leftFormData = Object.assign({ id: row.id }, this.leftFormData, row);
      this.modalType = 1;
      this.leftModalVisible = true;
    },
    showLeftModal() {
      this.modalType = 0;
      (this.leftFormData = {
        content: "", //指标内容
        name: "", //指标名称
        parentId: 0, //父级指标
        score: "" //指标分值
      }),
        (this.leftModalVisible = true);
    },
    handleLeftForm(data) {
      data.parentId == ""
        ? (data.parentId = 0)
        : (data.parentId = data.parentId);
      if (!data.types) {
        let params = Object.assign({ awardId: this.awardId }, data);
        awardCfgAdd(params).then(res => {
          if (res.code == 1) {
            notice(1, "添加成功！", 1);
            this.getData();
          } else {
            notice(0, "添加失败！", 0);
            this.getData();
          }
          this.leftModalVisible = false;
        });
      } else {
        let params = Object.assign(
          { id: this.currentRow.id, awardId: this.awardId },
          data
        );
        awardCfgModify(params).then(res => {
          if (res.code == 1) {
            notice(1, "修改成功！", 1);
            this.getData();
          } else {
            notice(0, "修改失败！", 0);
            this.getData();
          }
          this.leftModalVisible = false;
        });
      }
    },
    showInfoDialog() {
      // if(JSON.stringify(this.currentRow) == "{}"){
      //   this.$message.error('请选择左侧指标项进行配置！')
      //   return
      // }
      // this.keyPointType = 0
      // this.formData.rightItemList.map((v) =>{
      //   v.value = ''
      // })
      // this.rightDialogVisble.v = true
    },
    // handleRightForm(data){
    //   if(this.standardId == 0) return
    //   let params
    //   if(this.keyPointId){
    //     params = Object.assign({id:this.keyPointId,standardId:this.currentRow.id},data)
    //   }else{
    //     params = Object.assign({standardId:this.currentRow.id},data)
    //   }
    //   pointAdd(params).then(res => {
    //     if(res.code == 1){
    //         notice(1,'添加成功！',1)
    //         this.getPoint(this.currentRow.id)
    //       }else{
    //         notice(0,'添加失败！',0)
    //       }
    //       this.rightDialogVisble.v = false
    //   })
    // },
    getPoint(id) {
      getPoints({ standardId: id }).then(res => {
        this.tableData = res.data.keyPointsList;
      });
    },
    delAwardCfg(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        awardCfgDel({ id: id }).then(res => {
          if (res.code == 1) {
            notice(1, "删除成功！", 1);
            this.getData();
          } else {
            notice(0, "删除失败！" + res.msg, 0);
          }
        });
      });
    },
    delPoint(pointId) {
      pointDel({ id: pointId }).then(res => {
        if (res.code == 1) {
          notice(1, "删除成功！", 1);
          this.getPoint(this.currentRow.id);
        } else {
          notice(0, "删除失败！" + res.msg, 0);
        }
      });
    },
    handleSelectionChange(selection) {
      if (selection.length > 1) {
        let del_row = selection.shift();
        this.$refs.keyPointForm.toggleRowSelection(del_row, false);
      }
      if (selection.length != 0) {
        (this.keyPointId = selection[0].id), (this.editPointRow = selection[0]);
      }
    },
    editKeyPoint(row) {
      // this.keyPointType = 1
      // let params = Object.assign({standardId:this.currentRow.id},row),
      //   formData = this.formData.rightItemList
      //   for(let i in formData){
      //     for (let j in params){
      //       if(formData[i].prop == j){
      //         formData[i].value = params[j]
      //       }
      //     }
      //     this.formData.rightItemList  =  formData
      //     this.rightDialogVisble.v = true
      //   }
    },
    showSaveForm(model) {
      this.currentRow = model;
      this.getPoint(model.id);
      this.formSettingVisible = true;
    },
    handleSettingForm() {
      let params = {
        id: this.currentRow.id,
        formStyle: this.formSettingVal
      };
      saveDynamicForm(params).then(res => {
        if (res.code == 1) {
          this.formSettingVisible = false;
          notice(1, "操作成功！" + res.msg, 1);
        }
      });
    },
    async getAwardCfgList() {
      let params = {
        awardId: this.awardId
      };
      return await findListByAward(params);
    },

    getData() {
      this.getAwardCfgList()
        .then(res => {
          this.list = res.data;
          this.statisticDatas = res.data;
        })
        .then(() => {
          this.getTreeData();
        });
    }
  }
};
</script>

<style lang="less">
.statistics {
  height: calc(100vh - 50px);
  overflow: auto;
  padding: 10px;
  .hiddenRow {
    display: none;
  }
  .tableStyle {
    width: 100%;
    box-shadow: 0 0 10px rgba(216, 216, 216, 0.5);
  }
  .mt15 {
    margin-top: 15px;
  }
}
</style>
