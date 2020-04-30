<template>
    <div class="statistics common-content">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-row :gutter="20" class="mt15">
                    <el-col :span="24">
                      <div style="height:calc(100vh - 100px);padding:4px;box-shadow: 0 0 10px 2px rgba(30,13,4,.15);">
                        <el-scrollbar style="height: 100%;"> <!-- 滚动条 -->
                          <el-table :data="statisticDatas" class="tableStyle" v-loading="leftTb" style="width:100% !important;" 
                                    size="medium" :row-style="selectedHighlight" :row-class-name="rowClassNameHandler" @row-click="selectRow">
                              <el-table-column label="指标名称" align="left" show-overflow-tooltip>
                                  <template slot-scope="scope">
                                  <span :style="{marginLeft: scope.row.level * 23 + 'px'}">&ensp;</span>
                                  <i v-if="scope.row.showChildren" :class="{'categoryStyle el-icon-folder-opened ':scope.row.showChildren, 'categoryStyle el-icon-document-remove':!scope.row.hasChildren}" @click="onExpand(scope.row)" :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}"></i>
                                  <i v-else :class="{'categoryStyle el-icon-folder':scope.row.hasChildren, 'categoryStyle el-icon-document-remove':!scope.row.hasChildren}" @click="onExpand(scope.row)" :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}"></i>
                                  <span :data-level="scope.row.level" :style="{marginLeft: 4 + 'px'}">{{ scope.row.name }}</span>
                                  </template>
                              </el-table-column>
                              <el-table-column prop="grade" label="指标等级" width="150" align="center"></el-table-column>
                              <el-table-column prop="score" label="分值" width="200" align="center"></el-table-column>
                          </el-table>
                        </el-scrollbar><!-- /滚动条 -->
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row :gutter="20" class="mt15" v-loading="loading">
                  <div style="height:calc(100vh - 100px);border: solid 1px rgba(216, 216, 216, 0.5);position:relative;box-shadow: 0 0 10px 2px rgba(30,13,4,.15);" 
                    v-if="multiplePoints.keyPointsList != false">
                    <el-scrollbar style="height: 100%;"> <!-- 滚动条 -->
                      <div class="parentTitle">{{currentTitle}}</div>
                      <img src="../../assets/imgs/noData.png" class="imgs" alt="" v-show="multiplePoints.keyPointsList == undefined">
                      <el-col :span="24">
                          <div v-if="multiplePoints.reportCompile != false">
                            <div class="content" v-for="(item,index) in multiplePoints.reportCompile" :key="index">
                              <div class="title">{{index + 1 +'）'}}{{item.keyPoint}}</div>
                              <vue-ueditor-wrap v-model="item.content" :config="myConfig"></vue-ueditor-wrap>
                            </div>
                          </div>
                          <div v-else>
                            <div class="content" v-for="(item,index) in multiplePoints.keyPointsList" :key="index">
                              <div class="title">{{index + 1 +'）'}}{{item.keyPoint}}</div>
                                <vue-ueditor-wrap v-model="item.content" :config="myConfig"></vue-ueditor-wrap>
                            </div>
                          </div>
                          <div style="height:60px;"></div>
                          <div class="opt">
                              <el-button type="primary" icon="el-icon-position" v-if="multiplePoints.keyPointsList != undefined" @click="savePoints">提交保存</el-button>
                          </div>
                      </el-col>
                    </el-scrollbar><!-- /滚动条 -->
                  </div>
                  <div style="height:calc(100vh - 100px);border: solid 1px rgba(216, 216, 216, 0.5);position:relative;box-shadow: 0 0 10px 2px rgba(30,13,4,.15);" v-else>
                    <el-scrollbar style="height: 100%;"> <!-- 滚动条 -->
                      <div class="parentTitle">{{currentTitle}}</div>
                      <img src="../../assets/imgs/noData.png" class="imgs" alt="" v-show="noDataVisible">
                      <el-col :span="24">
                        <dynamic-form 
                          :dynamicValidateForm="dynamicValidateForm"
                          :myConfig="myConfig"
                          @submit="handleSaveQaRept"
                          @Suppliers="handleSaveQaRept"
                          @Customers="handleSaveQaRept"
                          @SaveThdAward="handleSaveQaRept"
                        ></dynamic-form>
                      </el-col>
                    </el-scrollbar><!-- /滚动条 -->
                  </div>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { findListByAward,getPoints,savaQaRept} from '@/api/award' 
import DynamicForm from '@/components/Dynamic/form'
import VueUeditorWrap from 'vue-ueditor-wrap'
import {notice} from '@/utils/tools'
export default {
  name: 'ContractStatistic',
  components:{VueUeditorWrap,DynamicForm},
  data() {
    return {
        dynamicValidateForm:{
          formType:"",
          itemList:[],
          tableData:[]
        },
        statisticDatas:[],
        pastDays: 0,
        currentRow: 0,
        leftTb:true,
        awardId:this.$route.params.id,
        multiplePoints:[],
        currentTitle:'',
        msg: '',
        loading:true,
        noDataVisible:false,
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
      row.formStyle == ''? this.noDataVisible = true : this.noDataVisible = false
      this.getPoint(row.id)
      this.dynamicValidateForm.formType = row.formStyle.formType
      this.dynamicValidateForm.itemList = row.formStyle.formItemList
    },
    selectedHighlight ({ row, rowIndex }) {
        if (this.statisticDatas[rowIndex].id == this.currentRow) {
            return {
                "background-color": "#273EB0",
                "color":"#fff"
            }
        }
    },
    getPoint(id){
      this.loading = true
      getPoints({standardId:id}).then(res =>{
        if(res.code == 1){
          this.loading = !this.loading
          let result = res.data,formType = this.dynamicValidateForm.formType
          this.multiplePoints = result
          if(result.reportCompile.length > 0 && result.keyPointsList.length == 0 && formType !== null || typeof formType !== 'undefined'){
            // this.dynamicValidateForm.itemList = result.reportCompile
            this.dynamicValidateForm.tableData = result.reportCompile
          }else if(result.reportCompile.length > 0 && result.keyPointsList.length <= 0){
            this.dynamicValidateForm.tableData = result.reportCompile
          }
        }
      })
    },
    handleSaveQaRept(params){
      let data = {
        standardId:this.currentRow,
        description:params
      }
      savaQaRept(data).then( res => {
        if(res.code == 1){
           notice(1,'保存成功！',1)
           this.getPoint(this.currentRow)
        }else{
           notice(0,'保存失败，请重试！',0)
        }
      })
    },
    savePoints(){
      let params = []
      if(this.multiplePoints.reportCompile.length >=1){
        params = this.multiplePoints.reportCompile
      }else{
        params = this.multiplePoints.keyPointsList
      }
      let data = {
        standardId:this.currentRow,
        description:params
      }

      savaQaRept(data).then( res => {
        if(res.code == 1){
           notice(1,'保存成功！',1)
        }else{
           notice(0,'保存失败，请重试！',0)
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
        this.loading = false
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

<style lang="less" scoped>
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
    .parentTitle{
      margin:20px 20px 20px 0;
      font-weight: 700;
      font-size: 18px;
      color: #273EB0;
      border-left: solid 10px #273EB0;
      padding-left: 15px;
    }
    .content{
      box-shadow: 0 0 10px rgba(216,216,216,.5);
      padding: 15px;
      border: solid 1px rgba(216,216,216,.5);
      margin: 15px 0;
      .title{
        color: #333;
        font-size: 15px;
        font-weight: 700;
        display: inline-block;
        margin:0 0 15px 0;
      }
    }
    .opt{
      position: absolute;
      bottom: 0;
      right:0;
      width: 100%;
      margin-top: 15px;
      background:#fff;
      z-index: 999;
      text-align: right;
      padding:20px 30px 20px 0;
    }
    .el-table--enable-row-hover .el-table__body tr:hover>td{
      background-color: #273EB0 !important;
      color: #fff;
      cursor: pointer;
    }
  .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .el-table--medium td{
    padding:10px 0 !important;
  }
  .imgs{
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
    
  }
</style>
