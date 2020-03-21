<template>
    <div class="statistics common-content">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content">
                            <el-button type="primary" icon="el-icon-plus" plain size="mini">录入</el-button>
                            <el-button type="info" icon="el-icon-edit" plain size="mini">编辑</el-button>
                            <el-button type="success" icon="el-icon-view" plain size="mini">查看</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mt20">
                    <el-col :span="24">
                        <el-table :data="statisticDatas" border style="width: 100%;" size="medium" :row-class-name="rowClassNameHandler" @row-click="do1">
                            <el-table-column label="指标名称" width="460" align="left" show-overflow-tooltip>
                                <template slot-scope="scope">
                                <span :style="{marginLeft: scope.row.level * 23 + 'px'}">&ensp;</span>
                                <i v-if="scope.row.showChildren" :class="{'fa el-icon-folder':scope.row.showChildren, 'fa el-icon-document-checked':!scope.row.hasChildren}" @click="onExpand(scope.row)" :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}"></i>
                                <i v-else :class="{'fa el-icon-folder':scope.row.hasChildren, 'fa el-icon-document-checked':!scope.row.hasChildren}" @click="onExpand(scope.row)" :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}"></i>
                                <span :data-level="scope.row.level" :style="{marginLeft: 4 + 'px'}" @click="do1(scope.row)">{{ scope.row.categoryName }}</span>
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
                            <el-button type="primary" icon="el-icon-plus" plain size="mini">录入</el-button>
                            <el-button type="info" icon="el-icon-edit" plain size="mini">编辑</el-button>
                            <el-button type="success" icon="el-icon-view" plain size="mini">查看</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mt20">
                    <el-col :span="24">
                        <el-table :data="tableData" border style="width: 100%">
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
    </div>
</template>
 
 
<style lang="less">
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

<script>
export default {
  name: 'ContractStatistic',
  data() {
    return {
      statisticDatas: [],
      pastDays: 0,
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
        }]
    }
  },
 
  mounted() {
    let self = this
    self.loadStatisticData()
  },
 
  methods: {
      do1(row){
        //   alert(row.categoryName)
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
            "value":4444
          },

          {
            "parentcategoryid": 1,
            "edit": 0,
            "undeployed": 0,
            "deployed": 0,
            "completed": 0,
            "categoryName": "lzk",
            "categoryid": 3739
          },
          {
            "parentcategoryid": 1,
            "edit": 0,
            "undeployed": 0,
            "deployed": 0,
            "completed": 0,
            "categoryName": "test",
            "categoryid": 3740
          },
          {
            "parentcategoryid": 1,
            "edit": 0,
            "undeployed": 0,
            "deployed": 0,
            "completed": 0,
            "categoryName": "122",
            "categoryid": 4201
          },
          {
            "parentcategoryid": 1,
            "edit": 0,
            "undeployed": 0,
            "deployed": 0,
            "completed": 0,
            "categoryName": "招标材设类（模板包）",
            "categoryid": 4602
          },
          {
            "parentcategoryid": 1101,
            "edit": 0,
            "undeployed": 0,
            "deployed": 0,
            "completed": 0,
            "categoryName": "111",
            "categoryid": 1102
          },
          {
            "parentcategoryid": 1101,
            "edit": 0,
            "undeployed": 0,
            "deployed": 0,
            "completed": 0,
            "categoryName": "11",
            "categoryid": 1103
          },
          {
            "parentcategoryid": 1103,
            "edit": 0,
            "undeployed": 0,
            "deployed": 0,
            "completed": 0,
            "categoryName": "111",
            "categoryid": 1104
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