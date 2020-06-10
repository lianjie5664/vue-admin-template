<template>
    <div class="statistics common-content">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content">
                            <el-button type="primary" icon="el-icon-plus" plain size="mini" v-hasPermi="['btn:lib:add']" @click="showLeftModal">录入</el-button>
                            <el-button type="info" icon="el-icon-edit" plain size="mini" v-hasPermi="['btn:libitem:edit']" @click="editLeftRow">编辑</el-button>
                            <el-button type="warning" icon="el-icon-setting" plain size="mini" v-hasPermi="['btn:libForm:config']" @click="showSaveForm">配置表单</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mt15">
                    <el-col :span="24">
                        <el-table :data="statisticDatas" class="tableStyle" v-loading="leftTb" style="height:calc(100vh - 160px);overflow-y:scroll"
                                  size="medium" :row-style="selectedHighlight" :row-class-name="rowClassNameHandler" @row-click="selectRow">
                            <el-table-column label="指标名称" align="left" show-overflow-tooltip>
                                <template slot-scope="scope">
                                <span :style="{marginLeft: scope.row.level * 23 + 'px'}">&ensp;</span>
                                <i v-if="scope.row.showChildren" :class="{'categoryStyle el-icon-folder-opened ':scope.row.showChildren, 'categoryStyle el-icon-document-remove':!scope.row.hasChildren}" @click="onExpand(scope.row)" :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}"></i>
                                <i v-else :class="{'categoryStyle el-icon-folder':scope.row.hasChildren, 'categoryStyle el-icon-document-remove':!scope.row.hasChildren}" @click="onExpand(scope.row)" :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}"></i>
                                <span :data-level="scope.row.level" :style="{marginLeft: 4 + 'px'}">{{ scope.row.name }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="grade" label="指标等级" width="180" align="center">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.grade == 1">一级指标</span>
                                    <span v-if="scope.row.grade == 2">二级指标</span>
                                    <span v-if="scope.row.grade == 3">三级指标</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="score" label="分值" width="80" align="center"></el-table-column>
                            <el-table-column label="操作" width="120" align="left">
                                <template slot-scope="scope">
                                    <el-button type="danger" icon="el-icon-delete" size="small" v-hasPermi="['btn:libitem:delete']" plain @click="delAwardCfg(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content">
                            <el-button type="primary" icon="el-icon-plus" plain size="mini" v-hasPermi="['btn:keypoint:add']" @click="showInfoDialog">录入</el-button>
                            <el-button type="info" icon="el-icon-edit" plain size="mini" v-hasPermi="['btn:keypoint:update']" @click="editKeyPoint">编辑</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mt15">
                    <el-col :span="24">
                        <el-table :data="tableData" class='tableStyle' ref="keyPointForm" border @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column prop="sort" label="序号" width="180"></el-table-column>
                            <el-table-column prop="keyPoint" label="关键点" width="180"></el-table-column>
                            <el-table-column prop="description" label="详细说明"> </el-table-column>
                              <el-table-column label="操作" width="80" align="left">
                                <template slot-scope="scope">
                                    <el-button type="danger" size="small" v-hasPermi="['btn:keypoint:delete']" plain @click="delPoint(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <add-form
            labelWidth = "80px"
            :formData="formData"
            :dialog="leftModalVisible"
            :list="statisticDatas"
            :row="currentRow"
            :types="modalType"
            @close="leftModalVisible.v = false"
            @submit="handleLeftForm"
            ></add-form>
        <info-form
            :dialogFormVisible="rightDialogVisble"
            :formData="formData"
            :types="keyPointType"
            @close="rightDialogVisble.v = false"
            @submit="handleRightForm">
        </info-form>   

        <el-dialog title="动态表单配置" :visible.sync="formSettingVisible" :close-on-click-modal="false">
          <!-- <el-form> -->
            <el-alert style="margin-bottom:12px;"
              title="此处为指标库的动态表单配置，针对无关键点的自定义表单。"
              type="warning"
              show-icon>
            </el-alert>
            <!-- <el-form-item label-width="400">
              <el-input v-model="formSettingVal" type="textarea" :rows="16"></el-input>
            </el-form-item> -->
            <vue-json-editor v-model="formSettingVal" :mode="'code'" :lang="'zh'"></vue-json-editor>
          <!-- </el-form> -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="formSettingVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSettingForm">确 定</el-button>
          </div>
        </el-dialog> 
    </div>
</template>
<script>
import AddForm from './components/indexadd'
import InfoForm from './components/infoadd'
import vueJsonEditor from 'vue-json-editor'
import {  findListByAward,
          awardCfgAdd, 
          awardCfgModify,
          awardCfgDel,
          awardCfgUpt,
          pointAdd,
          pointDel,
          getPoints,
          saveDynamicForm 
} from '@/api/award' 
import {notice} from '@/utils/tools'
export default {
  name: 'ContractStatistic',
  components:{AddForm,InfoForm,vueJsonEditor},
  data() {
    let sexs=[{label:'顶级',value:'0'},{label:'女',value:'F'}]
    let intersts=[{label:'羽毛球',value:'badminton'},{label:'篮球',value:'basketball'}]
    return {
        statisticDatas: [],
        pastDays: 0,
        currentRow: {},
        // rightTb:true,
        modalType:0,
        keyPointType:0,
        leftTb:true,
        leftModalVisible:{v:false},
        formSettingVisible:false,
        formSettingVal:'',
        rightDialogVisble:{v:false},
        awardId:this.$route.params.id,
        keyPointId:'',
        editPointRow:{},
        formData:{
            formItemList:[
                {type:'Input',label:'指标名称',prop:'name',width:'180px',placeholder:'请输入指标名称',value:''},
                {type:'TreeSelect',label:'上级指标库',prop:'parentId',width:'310px',change:row=>'',placeholder:'请选择上级指标库',value:''},
                {type:'Select',label:'指标等级',prop:'grade',width:'180px',change:row=>'',options:[
                {value: 1,label: '一级指标' },{value: 2,label: '二级指标' },{value: 3,label: '三级指标' }],placeholder:'请输入指标等级',value:''},
                {type:'Input',label:'分值',prop:'score',width:'180px',placeholder:'请输入分值',value:''},
                {type:'TextArea',label:'指标内容',prop:'content',width:'180px',placeholder:'请输入指标内容',value:''},
            ],
            rightItemList:[
                {type:'Input',label:'序号',prop:'sort',placeholder:'请输入序号',value:''},
                {type:'TextArea',label:'关键点',prop:'keyPoint',placeholder:'请输入关键点',value:''},
                {type:'TextArea',label:'详细说明',prop:'description',placeholder:'请输入详细说明',value:''},
            ]
        },
        tableData: [],
    }
  },
 
  mounted() {
    let self = this
    self.loadStatisticData()
  },
  created(){
     
  },
  methods: {
    selectRow(row){
      this.currentRow = row
      this.getPoint(row.id)
      this.formSettingVal = row.formStyle
    },
    selectedHighlight ({ row, rowIndex }) {
        if (this.statisticDatas[rowIndex].id == this.currentRow.id) {
            return {
                "background-color": "rgb(39, 62, 176)",
                "color":"#fff"
            }
        }
    },
    editLeftRow(){
      this.modalType = 1
      let params = Object.assign({id:this.currentRow.id},this.currentRow),
          formData = this.formData.formItemList
      for(let i in formData){
        for (let j in params){
          if(formData[i].prop == j){
            formData[i].value = params[j]
          }
        }
        this.formData.formItemList  =  formData
        this.leftModalVisible.v = true
      }
    },
    handleEditLeftRow(){

    },
    showLeftModal(){
        this.leftModalVisible.v = true
    },
    handleLeftForm(data){
      data.parentId == "" ? data.parentId = 0 : data.parentId = data.parentId
      if(!data.types){
        let params = Object.assign({awardId:this.awardId},data)
        awardCfgAdd(params).then(res =>{
          if(res.code == 1){
            notice(1,'添加成功！',1)
            this.loadStatisticData()
          }else{
            notice(0,'添加失败！',0)
            this.loadStatisticData()
          }
          this.leftModalVisible.v = false
        })
      }else{
        let params = Object.assign({id:this.currentRow.id,awardId:this.awardId},data)
        awardCfgModify(params).then(res =>{
          if(res.code == 1){
            notice(1,'修改成功！',1)
            this.loadStatisticData()
          }else{
            notice(0,'修改失败！',0)
            this.loadStatisticData()
          }
          this.leftModalVisible.v = false
        })
      }
        
    },
    showInfoDialog(){
      if(JSON.stringify(this.currentRow) == "{}"){
        this.$message.error('请选择左侧指标项进行配置！')
        return
      }
      this.formData.rightItemList.map((v) =>{
        v.value = ''
      })
      this.rightDialogVisble.v = true
    },
    handleRightForm(data){
      if(this.standardId == 0) return 
      let params 
      if(this.keyPointId){
        params = Object.assign({id:this.keyPointId,standardId:this.currentRow.id},data)
      }else{
        params = Object.assign({standardId:this.currentRow.id},data)
      }
      pointAdd(params).then(res => {
        if(res.code == 1){
            notice(1,'添加成功！',1)
            this.getPoint(this.currentRow.id)
          }else{
            notice(0,'添加失败！',0)
          }
          this.rightDialogVisble.v = false
      })
    },
    getPoint(id){
      getPoints({standardId:id}).then(res =>{
        this.tableData = res.data.keyPointsList
      })
    },
    delAwardCfg(id){
      this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          awardCfgDel({id:id}).then(res => {
            if(res.code == 1){
              notice(1,'删除成功！',1)
              this.loadStatisticData()
            }else{
              notice(0,'删除失败！'+ res.msg,0)
            }
          })
        });
    },
    delPoint(pointId){
      this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          pointDel({id:pointId}).then(res => {
            if(res.code == 1){
              notice(1,'删除成功！',1)
              this.getPoint(this.currentRow.id)
            }else{
              notice(0,'删除失败！'+ res.msg,0)
            }
          })
        });
    },
    handleSelectionChange(selection){
      if(selection.length > 1){
          let del_row = selection.shift();
          this.$refs.keyPointForm.toggleRowSelection(del_row, false);
      }
      if(selection.length != 0){
          this.keyPointId = selection[0].id,
          this.editPointRow = selection[0]
      }
    },
    editKeyPoint(){
      if(!this.keyPointId){
        this.$message.error('请选择一项进行编辑！')
        return
      }
        this.keyPointType = 1
        let params = Object.assign({standardId:this.currentRow.id},this.editPointRow),
          formData = this.formData.rightItemList
          for(let i in formData){
            for (let j in params){
              if(formData[i].prop == j){
                formData[i].value = params[j]
              }
            }
            this.formData.rightItemList  =  formData
            this.rightDialogVisble.v = true
          }
    },
    showSaveForm(){
      if(JSON.stringify(this.currentRow) == "{}"){
        this.$message.error('请选择左侧指标项进行配置！')
         return
      }
      this.formSettingVisible = true
    },
    handleSettingForm(){
      let params = {
        id:this.currentRow.id,
        formStyle:this.formSettingVal
      }
      saveDynamicForm(params).then( res => {
        if(res.code == 1){
          this.formSettingVisible = false
          notice(1,'操作成功！'+ res.msg,1)
        }
      })
    },
    _processLevelStatisticData(dataArray) {
      let self = this
 
      let resultArray = [] // 一级栏目
      let level = 1
      for (let i = 0; i < dataArray.length; i++) {
        let item = dataArray[i]
        // 查找一级分类
        if (item.parentId === "0") {
          item['level'] = level
          resultArray.push(item)
          self._loadChildrenData(resultArray, dataArray, item, level + 1)
        }
      }
      return resultArray
    },
 
    _loadChildrenData(resultArray, originArray, item, level) {
      let self = this
 
    //   let deployed = 0
    //   let undeployed = 0
    //   let edit = 0
      let score = 0
      for (let i = 0; i < originArray.length; i++) {
        let originItem = originArray[i]
        // 判断是否是item项的子项
        if (originItem.parentId === item.id.toString()) {
          item['hasChildren'] = true
          item['showChildren'] = true
 
          originItem['level'] = level
          originItem['visible'] = true // 子项默认隐藏
          originItem['hiddenByCategory'] = false
 
          resultArray.push(originItem)
          self._loadChildrenData(
            resultArray,
            originArray,
            originItem,
            level + 1
          )
 
          // 应该放在统计完子类数据之后
        //   deployed += originItem.deployed
        //   undeployed += originItem.undeployed
        //   edit += originItem.edit
          score += parseInt(originItem.score)
        }
      }
      // 计算子栏目统计合计
    //   item.deployed += deployed
    //   item.undeployed += undeployed
    //   item.edit += edit
      // item.score += score
    },
 
    search() {
      this.loadStatisticData()
    },
 
    loadStatisticData() {
      let self = this
      let params = {
        awardId: this.awardId
      }
      findListByAward(params).then(res=> {
        let result = res.data
        let resultArray = self._processLevelStatisticData(result)
        self.statisticDatas = resultArray
        this.leftTb = false
      })
    },
    async getAwardCfgList(params){
      const res = await findListByAward(params)
      return res
    },
    rowClassNameHandler({ row, rowIndex }) {
      let className = 'pid-' + row.parentId
      if (
        row.parentId !== "0" &&
        (row['visible'] !== true || row['hiddenByCategory'] === true)
      ) {
        className += ' hiddenRow'
      }
      return className
    },
 
    onExpand(row) {
      let self = this
      let isShowChildren = !row['showChildren']
      row['showChildren'] = isShowChildren
      self._loadAllSubItems(row, true, isShowChildren)
    },
 
    _loadAllSubItems(item, isFirstLevlChildren, isShowChilren) {
      let self = this
      let dataArray = []
      for (let i = 0; i < self.statisticDatas.length; i++) {
        let tempItem = self.statisticDatas[i]
        if (tempItem.parentId === item.id) {
          if (isFirstLevlChildren) {
            tempItem['visible'] = !tempItem['visible']
          }
          tempItem['hiddenByCategory'] = !isShowChilren
 
          dataArray.push(tempItem)
          let subItemArray = self._loadAllSubItems(
            tempItem,
            false,
            isShowChilren
          )
          dataArray = dataArray.concat(subItemArray)
        }
      }
      return dataArray
    }
  }
}
</script>

<style lang="less">
.statistics {
    padding: 10px;
    .hiddenRow {
        display: none;
    }
    .tableStyle{
        width: 100%;
        box-shadow: 0 0 10px rgba(216,216,216,.5);
    }
    .mt15{
      margin-top: 15px;
    }
    
}
</style>
