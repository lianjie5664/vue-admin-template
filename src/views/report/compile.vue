<template>
    <div class="statistics common-content">
      <div class="awardInfo">
        <div class="awardName">
          <span class="label"><i class="el-icon-position"></i></span>
          <span class="name">{{awradObj.name}}</span>
        </div>
        <div class="info">
          <span><i class="el-icon-document-copy"></i>{{awradObj.description}}</span>
          <span><i class="el-icon-location-outline"></i>{{awradObj.area}}</span>
        </div>
      </div>
        <el-row :gutter="20">
            <el-col :span="8">
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
                              <el-table-column prop="score" label="分值" width="80" align="center"></el-table-column>
                          </el-table>
                        </el-scrollbar><!-- /滚动条 -->
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mt15" v-loading="loading" v-if="!keyPointShow">
                  <div class="rightbox" v-if="noDataVisible">
                    <el-scrollbar style="height: 100%;"> <!-- 滚动条 -->
                      <div class="parentTitle">{{currentTitle}}</div>
                      <dynamic-component 
                        :name="rowCpt" 
                        :aid="currentRow" 
                        :compileTime="compileTime" 
                        :compileId="compileId" 
                        :createUserId="createUserId" 
                        :awardId="awardId">
                      </dynamic-component>
                    </el-scrollbar><!-- /滚动条 -->
                  </div>
                  <div class="rightbox" v-else>
                    <el-scrollbar style="height: 100%;"> <!-- 滚动条 -->
                      <div class="parentTitle">{{currentTitle}}</div>
                      <!-- <img src="../../assets/imgs/noData.png" class="imgs" alt="" v-show="noDataVisible"> -->
                     <dynamic-component 
                     :name="rowCpt" 
                      :aid="currentRow" 
                      :compileId="compileId" 
                      :compileTime="compileTime" 
                      :createUserId="createUserId" 
                      :awardId="awardId">
                     </dynamic-component>
                    </el-scrollbar><!-- /滚动条 -->
                  </div>
                </el-row>
                <el-row :gutter="20" class="mt15" v-loading="loading" v-else>
                  <div class="rightbox">
                    <el-scrollbar style="height: 100%;"> <!-- 滚动条 -->
                      <div class="parentTitle">{{currentTitle}}</div>
                      <!-- <img src="../../assets/imgs/noData.png" class="imgs" alt="" v-show="noDataVisible"> -->
                      <el-col :span="24">
                        <div class="content" v-for="(item,index) in keyPointCompileList" :key="index">
                          <div class="title">{{index + 1 +'）'}}{{item.keyPoint}}</div>
                          <vue-ueditor-wrap v-model="item.content" :config="myConfig"></vue-ueditor-wrap>
                        </div>
                        <div style="height:80px;"></div>
                          <div class="opt">
                              <el-button type="primary" icon="el-icon-position" @click="handleSaveQaRept">提交保存</el-button>
                          </div>
                      </el-col>
                    </el-scrollbar><!-- /滚动条 -->
                  </div>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { findListByAward,getPoints,savaQaRept,getAwardById} from '@/api/award' 
import DynamicForm from 'vue-dynamic-form-component'
import VueUeditorWrap from 'vue-ueditor-wrap'
import {notice} from '@/utils/tools'
import dynamicComponent  from '@/views/compile/dynamicpt'
import { ueditorConfig } from '@/utils/config'
// import test from '@/views/compile/85eaf3d0965d4f03bfac14a75331f134'
export default {
  name: 'ContractStatistic',
  components:{VueUeditorWrap,DynamicForm,dynamicComponent},
  data() {
    return {
        compileTime:this.$route.query.compileTime,
        compileId:this.$route.query.compileId,
        awardId:this.$route.params.id,
        createUserId:this.$route.query.cuid,
        dynamicValidateForm:{
          formType:"",
          formData:{},
          descriptors: {},
        },
        rowCpt:'',
        keyPointShow:false,
        keyPointCompileList:[],
        statisticDatas:[],
        currentRow: '',
        leftTb:true,
        multiplePoints:[],
        currentTitle:'',
        loading:true,
        noDataVisible:false,
        myConfig: ueditorConfig,
        awradObj:{}
    }
  },
  mounted() {
    this.loadStatisticData(this.$route.params.id)
  },
  created(){
    this.getAwardInfo(this.awardId)
  },
  methods: {
    selectRow(row){
      this.currentRow = row.id
      this.currentTitle = row.name
        if(JSON.stringify(row.formStyle) != '{}'){
          this.noDataVisible = true
          this.rowCpt = row.formStyle.component
          this.keyPointShow = false
        }else{
          this.rowCpt = ""
          this.noDataVisible = false
          this.keyPointShow = false
        }
        this.getPoint(row.id)
    },
    getAwardInfo(awardId){
      getAwardById({id:awardId}).then((res => {
        if(res.code == 1){
          this.awradObj = res.data
          if(res.data.id !== this.awardId){
            this.$message.error('非法请求！')
            this.$router.push({path:'/report/index'})
            // alert('非法请求')
          }
        }
      }))
    },
    getPoint(id){
      this.loading = true
      getPoints({standardId:id}).then(res =>{
        if(res.code == 1){
          debugger
          let result = res.data
          // 获取关键点列表
          let generaKeyPointList = result.keyPointsList
          let compiledPointData = result.reportCompile
          // 如果关键点编制不为空，循环对比关键点列表
          if(generaKeyPointList.length > 0){
            this.keyPointShow = true
          }
          if(compiledPointData.length == 0){
            this.keyPointCompileList = generaKeyPointList
          }else if(generaKeyPointList.length >= compiledPointData.length){
            this.keyPointShow = true
            generaKeyPointList.map((v)=>{
              compiledPointData.map((x)=>{
                if(v.id == x.id){
                  v.content = x.content
                }
              })
            })
            this.keyPointCompileList = generaKeyPointList
          }else{
            // this.keyPointCompileList = {}
            // this.dynamicValidateForm.formData = compiledPointData
          }
        }
        this.loading = !this.loading
      })
    },
    // savePoints(){
    //   let data = {}
    //   if(this.compileId == 0){
    //     data = {
    //       awardId:this.awardId,
    //       compileTime:this.compileTime,
    //       standardId:this.currentRow,
    //       escription:this.null2str(this.dynamicValidateForm.formData)
    //     }
    //   }else{
    //     data = {
    //       awardId:this.awardId,
    //       compileTime:this.compileTime,
    //       compileId:this.compileId,
    //       standardId:this.currentRow,
    //       description:this.null2str(this.dynamicValidateForm.formData)
    //     }
    //   }
    //   savaQaRept(data).then( res => {
    //     if(res.code == 1){
    //        notice(1,'保存成功！',1)
    //        this.getPoint(this.currentRow)
    //     }else{
    //        notice(0,'保存失败，请重试！',0)
    //     }
    //   })
    // },
    handleSaveQaRept(){
      let data = {
        awardId:this.awardId,
        standardId:this.currentRow,
        compileTime:this.compileTime || '',
        compileId:this.compileId || '',
        description:this.keyPointCompileList  
      }
      savaQaRept(data).then( res => {
        if(res.code == 1){
           notice(1,'保存成功！',1)
        }else{
           notice(0,'保存失败，请重试！',0)
        }
      })
    },
    selectedHighlight ({ row, rowIndex }) {
        if (this.statisticDatas[rowIndex].id == this.currentRow) {
          return {
            "background-color": "#273EB0",
            "color":"#fff"
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
    loadStatisticData(awardId) {
      let self = this
      let params = {
        awardId
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
    },
    null2str(data) {
      for (let x in data) {
        if (data[x] === null) { // 如果是null 把直接内容转为 ''
          data[x] = '';
        } else {
          if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
            data[x] = data[x].map(z => {
              return this.null2str(z);
            });
          }
          if(typeof(data[x]) === 'object'){ // 是json 递归继续处理
            data[x] = this.null2str(data[x])
          }
        }
      }
      return data;
    }
  }
}
</script>

<style lang="less" scoped>
.statistics {
    padding: 10px;
    .awardInfo{
      background: #fff;
      box-shadow: rgba(30, 13, 4, 0.15) 0px 0px 10px 2px;
      padding: 20px;
      overflow: hidden;
      .awardName{
        margin-bottom: 15px;
        font-weight: normal;
        color: #666;
        .label{
          font-size: 16px;
        }
        .name{
          font-size: 18px;
          font-weight: 700;
        }
      }
      .info{
        color: #999;
        font-size: 14px;
        i{
          margin-right: 8px;
        }
        span{
          margin-right: 20px;
        }
      }
    }
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

    .rightbox{
      height:calc(100vh - 100px);
      border: solid 1px rgba(216, 216, 216, 0.5);
      position:relative;
      box-shadow: 0 0 10px 2px rgba(30,13,4,.15);
    }
  }
</style>
