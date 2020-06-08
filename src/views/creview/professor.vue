<template lang="html">
  <div class="app-container professor-page">
    <!-- <div class="top-info hg-flex mb20 box_fixed" id="boxFixed" :class="{'is_fixed' : isFixed}">
      <div class="items mr40">
        <label>得分情况：</label>
          <div class="score-item">{{totalScore}}<span>分</span>   </div> 
      </div>
      <div class="items ml30">
        <el-button type="primary" @click="subScore" round :loading="btnLoading" v-show="!disabled" :disabled="disabled">提交评审</el-button>
      </div>
    </div> -->
    <el-row>
      <el-col :span="18">
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
          </el-table>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right-score" id="boxFixed" :class="{'is_fixed' : isFixed}">
            <div class="head">
              <div class="left">
                <h3>得分情况</h3>
              </div>
              <div class="right">
                <el-button type="success" @click="subScore" round :loading="btnLoading" v-show="!disabled" :disabled="disabled" size="small">提交评审</el-button>
              </div> 
            </div>
            <div class="outer-box">
              <div class="score-box">
                <div class="circle-box">
                  <img class="index-bgOne" src="data:image/png;base64,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" style="position: absolute;right: 7px;top: -5px;width: 211px; height: 210px;">
                  <img class="index-bgTwo" src="data:image/png;base64,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" style="position: absolute; right: 23px; top: 9px;">
                  <img class="index-bgThree" src="http://risk.nanofintax.com/riskw/static/g_3.4fa4823a.png" style="position: absolute; right: 23px; top: 9px;">
                  <div class="index-gNumber">
                    <div>{{totalScore}}<span class="index-fen">分</span></div>
                  </div>
              </div>
              </div>
            </div>
        </div>
      </el-col>
    </el-row>
    <!-- 内容详情 -->
    <el-drawer
      title="详情"
      size="50%"
      :visible.sync="drawer"
      :direction="direction">
      <div v-if="dynamicpt.grade == 3">
        <div class="content" v-for="(item,index) in keyPointCompileList" :key="index">
          <div class="title">{{index + 1 +'）'}}{{item.keyPoint}}</div>
          <vue-ueditor-wrap v-model="item.content" :config="myConfig"></vue-ueditor-wrap>
        </div>
      </div>
      <div v-else>
        <dynami-cpt :name="dynamicpt.name" :aid="dynamicpt.aid" :awardId="dynamicpt.awardId"></dynami-cpt>   
      </div>
    </el-drawer>
  </div>
</template>

<script>
import '../review/style/review.scss'
import { findListByAward,getPoints } from '@/api/award'
import { saveOwn,getOwnReviewResult } from '@/api/review'
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
      isFixed: false,
      loading: false, // 页面加载loading
      totalScore:0,
      drawer:false,
      btnLoading:false,
      disabled:true,
      direction: 'rtl',
      dynamicpt:{
        name:'',
        aid:'',
        awardId:'',
        grade:0
      },
      submitData:[],
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
      getOwnReviewResult({awardId:this.awardId}).then(res => {
      // debugger
        // console.log(res)
        let data = res.data.scoreSituationArray 
        if(data.length > 1){
          data.map((v)=>{  
            v.calculate = Number(v.calculate)
          })
        }
        this.totalScore = res.data.total
        this.awardList = data
        let subArr = {}
        subArr.awardId = this.awardId
        subArr.scoreSituation = data
        this.submitData = subArr
      })
    },
    handleNumCon (row) {
      let cloneData = this.optionData
      let filterCate =  cloneData.filter(father => father.score != "")
       let subArr = {}
      subArr.awardId = this.awardId
      subArr.scoreSituation = filterCate
      this.submitData = subArr
      this.disabled = false
      // this.subScore(subArr)
    },
    subScore(){
      this.btnLoading = true
      saveOwn(this.submitData).then(res => {
        if(res.code == 1){
          this.disabled = true
          this.getData()
          this.btnLoading = false
          this.$message.success('自评成功！')
        }
      })
    },
    format(percentage) {
      return `${percentage}分`;
    }
  }
}
</script>
