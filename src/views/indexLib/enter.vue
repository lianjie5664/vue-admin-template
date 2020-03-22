<template>
    <div class="statistics common-content">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content">
                            <el-button type="primary" icon="el-icon-plus" plain size="mini" @click="showLeftModal">录入</el-button>
                            <el-button type="info" icon="el-icon-edit" plain size="mini">编辑</el-button>
                            <el-button type="success" icon="el-icon-view" plain size="mini">查看</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mt20">
                    <el-col :span="24">
                        <el-table :data="statisticDatas" class="tableStyle" v-loading="leftTb" 
                                  size="medium" :row-style="selectedHighlight" :row-class-name="rowClassNameHandler" @row-click="selectRow">
                            <el-table-column label="指标名称" align="left" show-overflow-tooltip>
                                <template slot-scope="scope">
                                <span :style="{marginLeft: scope.row.level * 23 + 'px'}">&ensp;</span>
                                <i v-if="scope.row.showChildren" :class="{'categoryStyle el-icon-folder-add ':scope.row.showChildren, 'categoryStyle el-icon-document-remove':!scope.row.hasChildren}" @click="onExpand(scope.row)" :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}"></i>
                                <i v-else :class="{'categoryStyle el-icon-folder-add':scope.row.hasChildren, 'categoryStyle el-icon-document-remove':!scope.row.hasChildren}" @click="onExpand(scope.row)" :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}"></i>
                                <span :data-level="scope.row.level" :style="{marginLeft: 4 + 'px'}">{{ scope.row.categoryName }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="categoryid" label="指标等级" width="80" align="center"></el-table-column>
                            <el-table-column prop="completed" label="分值" width="80" align="center"></el-table-column>
                            <el-table-column label="操作" align="left">
                                <template slot-scope="scope">
                                    <el-button type="danger" size="small" plain>删除</el-button>
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
                            <el-button type="primary" icon="el-icon-plus" plain size="mini" @click="showInfoDialog">录入</el-button>
                            <el-button type="info" icon="el-icon-edit" plain size="mini">编辑</el-button>
                            <el-button type="success" icon="el-icon-view" plain size="mini">查看</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mt20">
                    <el-col :span="24">
                        <el-table :data="tableData" class='tableStyle' border v-loading="rightTb">
                            <el-table-column prop="date" label="序号" width="180"></el-table-column>
                            <el-table-column prop="name" label="关键点" width="180"></el-table-column>
                            <el-table-column prop="address" label="详细说明"> </el-table-column>
                            <el-table-column prop="address" label="操作"> 
                                <el-table-column label="操作" align="left">
                                    <template slot-scope="scope">
                                        <el-button type="danger" size="small" plain>删除</el-button>
                                    </template>
                                </el-table-column>
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
            @close="leftModalVisible.v = false"
            @submit="handleLeftForm"
            ></add-form>
        <info-form
            :dialogFormVisible="rightDialogVisble"
            :formData="formData"
            @close="rightDialogVisble.v = false"
            @submit="handleRightForm">
        </info-form>    
    </div>
</template>
<script>
import AddForm from './components/indexadd'
import InfoForm from './components/infoadd'
export default {
  name: 'ContractStatistic',
  components:{AddForm,InfoForm},
  data() {
    let sexs=[{label:'男',value:'M'},{label:'女',value:'F'}]
    let intersts=[{label:'羽毛球',value:'badminton'},{label:'篮球',value:'basketball'}]
    return {
        statisticDatas: [],
        pastDays: 0,
        currentRow:0,
        rightTb:true,
        leftTb:false,
        leftModalVisible:{v:false},
        rightDialogVisble:{v:false},
        formData:{
            formItemList:[
                {type:'Input',label:'指标名称',prop:'name',width:'180px',placeholder:'请输入指标名称',value:''},
                {type:'TreeSelect',label:'上级指标库',prop:'sex',width:'310px',options:sexs,change:row=>'',placeholder:'请选择上级指标库',value:''},
                {type:'Input',label:'指标等级',prop:'name1',width:'180px',placeholder:'请输入指标等级',value:''},
                {type:'Input',label:'分值',prop:'age1',width:'180px',placeholder:'请输入分值',value:''},
                {type:'TextArea',label:'指标内容',prop:'age11',width:'180px',placeholder:'请输入指标内容',value:''},
            ],
            rightItemList:[
                {type:'TextArea',label:'关键点',prop:'age11',placeholder:'请输入关键点',value:''},
                {type:'TextArea',label:'详细说明',prop:'age12',placeholder:'请输入详细说明',value:''},
            ]
        },
        tableData: [{
            date: '1',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
        }, {
            date: '3',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        }, {
            date: '4',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }],
    }
  },
 
  mounted() {
    let self = this
    self.loadStatisticData()
  },
 
  methods: {
    selectRow(row){
        this.currentRow = row.categoryid
    },
    selectedHighlight ({ row, rowIndex }) {
        if (this.statisticDatas[rowIndex].categoryid == this.currentRow) {
            return {
                "background-color": "rgba(198, 226, 255, 0.48)"
            }
        }
    },
    showLeftModal(){
        this.leftModalVisible.v = true
    },
    handleLeftForm(data){
        console.log(data)
    },
    showInfoDialog(){
        this.rightDialogVisble.v = true
    },
    handleRightForm(data){
        console.log(1,data)
    },
    _processLevelStatisticData(dataArray) {
      let self = this
 
      let resultArray = [] // 一级栏目
      let level = 1
      for (let i = 0; i < dataArray.length; i++) {
        let item = dataArray[i]
        // 查找一级分类
        if (item.parentcategoryid === 0) {
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
      let completed = 0
 
      for (let i = 0; i < originArray.length; i++) {
        let originItem = originArray[i]
        // 判断是否是item项的子项
        if (originItem.parentcategoryid === item.categoryid) {
          item['hasChildren'] = true
          item['showChildren'] = false
 
          originItem['level'] = level
          originItem['visible'] = false // 子项默认隐藏
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
          completed += originItem.completed
        }
      }
      // 计算子栏目统计合计
    //   item.deployed += deployed
    //   item.undeployed += undeployed
    //   item.edit += edit
      item.completed += completed
    },
 
    search() {
      console.log(this.pastDays)
      this.loadStatisticData()
    },
 
    loadStatisticData() {
      let self = this
      let params = {
        pastDays: self.pastDays
      }
        let result = [
          {
            "parentcategoryid": 0,
            "edit": 0,
            "undeployed": 1,
            "deployed": 0,
            "completed": 0,
            "categoryName": "商业管理类",
            "categoryid": 1105,
          },
        
          {
            "parentcategoryid": 1105,
            "edit": 0,
            "undeployed": 0,
            "deployed": 0,
            "completed": 0,
            "categoryName": "合同模板管理",
            "categoryid": 1902
          },
          {
            "parentcategoryid": 1902,
            "edit": 0,
            "undeployed": 0,
            "deployed": 0,
            "completed": 20,
            "categoryName": "菜单管理",
            "categoryid": 1903
          },
          {
            "parentcategoryid": 1902,
            "edit": 0,
            "undeployed": 0,
            "deployed": 0,
            "completed": 20,
            "categoryName": "研发设计类",
            "categoryid": 1904
          },
          {
            "parentcategoryid": 1902,
            "edit": 0,
            "undeployed": 0,
            "deployed": 0,
            "completed": 20,
            "categoryName": "招标材设类",
            "categoryid": 1905
          },
        ]
        let resultArray = self._processLevelStatisticData(result)
        self.statisticDatas = resultArray
    },
 
    rowClassNameHandler({ row, rowIndex }) {
      // console.log(row['visible'])
      let className = 'pid-' + row.parentcategoryid
      if (
        row.parentcategoryid !== 0 &&
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
        if (tempItem.parentcategoryid === item.categoryid) {
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
<style lang="scss" scoped>
    .el-table--enable-row-hover .el-table__body tr:hover>td{
        background-color: rgba(198, 226, 255, 0.48) !important;
    }
    .tableStyle{
        width: 100%;
        box-shadow: 0 0 10px rgba(216,216,216,.5);
    }
    .categoryStyle{
        color: rgb(92, 157, 253);
    }
    .el-table__row{
    cursor:pointer;
}
.statistics {
    padding: 10px;
    .hiddenRow {
        display: none;
    }
    .searchForm{
        padding: 10px;
        span.label{
            margin-right: 10px;
        }
        span.attention{
            color: #e50021;
        }
    }
}
.mt20{
    margin-top:20px;
}
</style>