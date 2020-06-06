<template lang="html">
  <div class="app-container professor-page">
    <div class="top-info hg-flex mb20 box_fixed" id="boxFixed" :class="{'is_fixed' : isFixed}">
      <div class="items mr40">
        <label>得分情况：</label>
          <div class="score-item">{{totalScore}}<span>分</span>   </div> 
      </div>
      <!-- <div class="items">
        <label>评审人:</label>
        <el-input v-model="formParams.gradeUserName"></el-input>
      </div> -->
      <div class="items ml30">
        <el-button type="primary" @click="subScore" round :loading="btnLoading">提交评审</el-button>
      </div>
    </div>
    <div class="table-list">
      <el-table
        v-loading="loading"
        :data="optionData"
        row-key="id"
        border
        :default-expand-all="true"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="name"
          label="评分项名称">
        </el-table-column>
        <el-table-column
          prop="score"
          width="150"
          align="center"
          label="类目分值（分）">
        </el-table-column>
        <el-table-column
          width="300"
          align="center"
          label="得分系数">
          <template slot-scope="scope">
            <el-row type="flex" v-if="scope.row.grade == 3 && scope.row.score != ''" >
                <el-col :span="18">
                  <el-slider v-if="!scope.row.children"
                  v-model="scope.row.calculate"
                  :min="0" :max="1"
                  @change="handleNumCon(scope.row)"
                  :step="0.05">
                </el-slider>
            </el-col>
              <el-col :span="6" style="line-height:35px;border：solid 1px red;padding-left:8px;">
                <div>{{scope.row.calculate}}</div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="备注">
           <template slot-scope="scope">
              <el-input v-model="scope.row.summary" v-if="scope.row.grade == 3" placeholder="请输入备注"></el-input>
            </template>
        </el-table-column>
        <el-table-column
          prop="score"
          width="150"
          align="center"
          label="查看">
          <template slot-scope="scope">
              <el-button type="text" size="small" @click="detail(scope.row)">查看详情</el-button>
            </template>
        </el-table-column>
        <!-- <el-table-column
          label="得分">
          <template slot-scope="scope">
            <span v-if="scope.row.children && +scope.row.parentId !== 0" class="score-item">{{scope.row.goal || 0}} 分</span>
          </template>
        </el-table-column> -->
      </el-table>
    </div>

    <!-- 内容详情 -->
    <el-drawer
      title="详情"
      size="40%"
      :visible.sync="drawer"
      :direction="direction">
      <div v-if="dynamicpt.grade == 3">
        <div class="content" v-for="(item,index) in keyPointCompileList" :key="index">
          <div class="title">{{index + 1 +'）'}}{{item.keyPoint}}</div>
          <div v-html="item.content "></div>
          <!-- <vue-ueditor-wrap v-model="item.content" :config="myConfig"></vue-ueditor-wrap> -->
        </div>
      </div>
      <div v-else>
        <dynami-cpt :name="dynamicpt.name" :aid="dynamicpt.aid" :awardId="dynamicpt.awardId"></dynami-cpt>   
      </div>
    </el-drawer>
  </div>
</template>

<script>
import './style/review.scss'
import { findListByAward,getPoints } from '@/api/award'
import { toSave,getReviewResult } from '@/api/review'
import DynamiCpt from '@/views/compile/dynamicpt'
import VueUeditorWrap from 'vue-ueditor-wrap'

export default {
  data () {
    return {
      // formParams: {
      //   scoreTotal: 0, // 得分情况
      //   gradeUserName: '', // 评审人
      // },
      awardList: [], // 奖项列表
      awardId: this.$route.query.awardId,
      reportUserId:this.$route.query.reportUserId,
      isFixed: false,
      loading: false, // 页面加载loading
      totalScore:0,
      btnLoading:false,
      drawer:false,
      direction: 'rtl',
      dynamicpt:{
        name:'',
        aid:'',
        awardId:'',
        grade:0
      },
      keyPointCompileList:[],
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
      },
      submitData:[],
      paramsList: {
        id: '',
        awardId: '',
        parentId: '',
        calculate: 0, // 系数
        score: '' // 分数
      },
      paramArr: [],
      saveList: [] // 返回数据
    }
  },
  components:{DynamiCpt,VueUeditorWrap},
  created () {
    this.getAward().then(()=>{
      this.getData()
    })
  },
  mounted(){
    window.addEventListener('scroll',this.initHeight);
    this.$nextTick( () => {
      this.offsetTop = document.querySelector('#boxFixed').offsetTop;
    })
  },
  computed: {
    // 数据树形整合
    optionData () {
      let cloneData = JSON.parse(JSON.stringify(this.awardList))  // 对源数据深度克隆
      return cloneData.filter(father => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(child => father.id == child.parentId)  // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ''   //给父级添加一个children属性，并赋值
        return father.parentId == 0   //返回第一层
      })
    },
  },
  methods: {
    initHeight () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.isFixed = scrollTop > this.offsetTop ? true : false;
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
    // 获取奖项评分列表
    async getAward () {
      this.loading = true
      await findListByAward({awardId: this.awardId}).then(res => {
        if (res && res.data && res.data[0]) {
          this.loading = false
          this.awardList = res.data
        }
      })
    },
    detail(row){
      this.dynamicpt.name = row.formStyle.component
      this.dynamicpt.aid = row.id
      this.dynamicpt.awardId = row.awardId
      this.dynamicpt.grade = row.grade
      if(row.grade == 3){
        this.getPoints(row.id)
      }
      this.drawer = true
    },
    getPoints(id){
      getPoints({standardId:id}).then(res =>{
        if(res.code == 1){
          this.keyPointCompileList = res.data.reportCompile
        }
      })
    },
    getData(){
      getReviewResult({awardId:this.awardId,reportUserId:this.reportUserId,gradeUserId:1}).then(res => {
        let data = res.data.scoreSituationArray 
        data.map((v)=>{  
          v.calculate = Number(v.calculate)
        })
        this.totalScore = res.data.total
        this.awardList = data
        let subArr = {}
        subArr.awardId = this.awardId
        subArr.reportUserId = this.reportUserId
        subArr.scoreSituation = data
        this.submitData = subArr
      })
    },
    handleNumCon (row) {
      let cloneData = this.optionData
      let filterCate =  cloneData.filter(father => father.score != "")
      let subArr = {}
      subArr.awardId = this.awardId
      subArr.reportUserId = this.reportUserId
      subArr.scoreSituation = filterCate
      this.submitData = subArr
      // this.subScore(subArr)
    },
    subScore(){
      this.btnLoading = true
      toSave(this.submitData).then(res => {
        if(res.code == 1){
          this.getData()
          this.btnLoading = false
          this.$message.success('提交成功！')
        }
      })
    },
    format(percentage) {
      return `${percentage}分`;
    }
  }
}
</script>
