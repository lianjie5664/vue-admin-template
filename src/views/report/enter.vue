<template>
    <div class="statistics common-content">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-row :gutter="20" class="mt15">
                    <el-col :span="24">
                        <el-table :data="statisticDatas" class="tableStyle" v-loading="leftTb"  style="height:calc(100vh - 160px);overflow-y:scroll"
                                  size="medium" :row-style="selectedHighlight" :row-class-name="rowClassNameHandler" @row-click="selectRow">
                            <el-table-column label="指标名称" align="left" show-overflow-tooltip>
                                <template slot-scope="scope">
                                <span :style="{marginLeft: scope.row.level * 23 + 'px'}">&ensp;</span>
                                <i v-if="scope.row.showChildren" :class="{'categoryStyle el-icon-folder-opened ':scope.row.showChildren, 'categoryStyle el-icon-document-remove':!scope.row.hasChildren}" @click="onExpand(scope.row)" :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}"></i>
                                <i v-else :class="{'categoryStyle el-icon-folder':scope.row.hasChildren, 'categoryStyle el-icon-document-remove':!scope.row.hasChildren}" @click="onExpand(scope.row)" :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}"></i>
                                <span :data-level="scope.row.level" :style="{marginLeft: 4 + 'px'}">{{ scope.row.name }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="grade" label="指标等级" width="80" align="center"></el-table-column>
                            <el-table-column prop="score" label="分值" width="80" align="center"></el-table-column>
                            <el-table-column label="操作" align="left">
                                <template slot-scope="scope">
                                    <el-button type="danger" icon="el-icon-delete" size="small" plain @click="delAwardCfg(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row :gutter="20" class="mt15">
                    <el-col :span="24">
                        <div class="content">
                          <div class="title">{{currentTitle}}</div>
                          <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
                          <div class="opt">
                            <el-button type="primary" round>提交保存</el-button>
                          </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { findListByAward} from '@/api/award' 
import VueUeditorWrap from 'vue-ueditor-wrap'
import {notice} from '@/utils/tools'
export default {
  name: 'ContractStatistic',
  components:{VueUeditorWrap},
  data() {
    return {
        statisticDatas: [],
        pastDays: 0,
        currentRow: 0,
        leftTb:true,
        awardId:this.$route.params.id,
        currentTitle:'',
        msg: '',
        myConfig: {
            // 编辑器不自动被内容撑高
            autoHeightEnabled: false,
            // 初始容器高度
            initialFrameHeight: 240,
            // 初始容器宽度
            initialFrameWidth: '100%',
            // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
            serverUrl: 'http://35.201.165.105:8000/controller.php',
            // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
            UEDITOR_HOME_URL: '/Ueditor/'
        }
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
      this.currentRow = row.id
      let jsonStr = this.statisticDatas.filter(item => item.id == row.id)
      this.currentTitle = jsonStr[0].name
    },
    selectedHighlight ({ row, rowIndex }) {
        if (this.statisticDatas[rowIndex].id == this.currentRow) {
            return {
                "background-color": "rgba(198, 226, 255, 0.48)"
            }
        }
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
          score += parseInt(originItem.score)
        }
      }

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
        this.currentRow = resultArray[0].id
        this.currentTitle = resultArray[0].name
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
    .content{
      box-shadow: 0 0 10px rgba(216,216,216,.5);
      padding:20px;
      border: solid 1px rgba(216,216,216,.5);
      .title{
        color: #fff;
        font-size: 16px;
        border-radius: 20px;
        padding: 6px 12px;
        background: rgba(30, 71, 204, 0.5);
        width: 200px;
        margin:15px 0;
        text-align: center;
      }
      .opt{
        margin-top: 15px;
      }
    }
  }
</style>
