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
        <div class="table-list" ref="tab">
          <el-table
            v-loading="loading"
            :data="optionData"
            row-key="id"
            border
            :default-expand-all="false"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
              prop="name"
              label="评分项名称">
            </el-table-column>
            <el-table-column
              prop="score"
              width="120"
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
                  <el-input v-model="scope.row.gradeRemark" v-if="scope.row.grade == 3" placeholder="请输入备注"></el-input>
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
                <el-button type="success"  @click="subScore" round :loading="btnLoading" v-show="!disabled" :disabled="disabled" size="small">提交评审</el-button>
                <!-- <el-button type="danger" v-show="!disabled" v-else round disabled size="small">无评审权限</el-button> -->
              </div> 
            </div>
            <div class="outer-box">
              <div class="score-box">
                <div class="circle-box">
                 <img class="index-bgOne" src="../../assets/imgs/one.png" style="position: absolute;right: 0;top: -0;width: 200px; height: 200px;">
                  <img class="index-bgTwo" src="../../assets/imgs/two.png" style="position: absolute; right: 15px; top: 15px;width: 170px; height: 170px;">
                  <img class="index-bgThree" src="../../assets/imgs/three.png" style="position: absolute; right: 19px; top: 17px;width: 164px; height: 164px;">
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
          <div v-html="item.content" class="" style="border:solid 1px #ccc;padding:15px;"></div>
          <!-- <vue-ueditor-wrap v-model="item.content" :config="myConfig"></vue-ueditor-wrap> -->
        </div>
      </div>
      <div v-else>
        <dynami-cpt :name="dynamicpt.name" :aid="dynamicpt.aid" :createUserId="createUserId" :awardId="dynamicpt.awardId"></dynami-cpt>   
      </div>
    </el-drawer>
    <!-- 提交评审提示 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>如您已提交过评审，请选择取消，若还未提交评审结果，请点击确定！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="goBackOneStep">取 消</el-button>
        <el-button type="primary" @click="subGrade">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import './style/review.scss'
import { findListByAward,getPoints } from '@/api/award'
import { toSave,getReviewResult } from '@/api/review'
import DynamiCpt from '@/views/compile/dynamicpt'
import VueUeditorWrap from 'vue-ueditor-wrap'
import { ueditorConfig} from '@/utils/config'

export default {
  data () {
    return {
      // formParams: {
      //   scoreTotal: 0, // 得分情况
      //   gradeUserName: '', // 评审人
      // },
      awardList: [], // 奖项列表
      awardId: this.$route.query.awardId,
      reportUserId:this.$route.query.reportUserId || "",
      gradeUserId: this.$route.query.gradeUserId || "",
      createUserId:this.$route.query.createUserId || "",
      isFixed: false,
      loading: false, // 页面加载loading
      totalScore:0,
      btnLoading:false,
      disabled:true,
      drawer:false,
      direction: 'rtl',
      dialogVisible:false,
      dynamicpt:{
        name:'',
        aid:'',
        awardId:'',
        grade:0
      },
      keyPointCompileList:[],
      myConfig: ueditorConfig,
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
    // 回退监测
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.goBack, false);
    }
  },
  destroyed(){
    window.removeEventListener('popstate', this.goBack, false);
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
      getPoints({standardId:id,createUserId:this.createUserId}).then(res =>{
        if(res.code == 1){
          this.keyPointCompileList = res.data.reportCompile
        }
      })
    },
    getData(){
      if(this.gradeUserId == ""){
        this.gradeUserId = this.$store.state.user.userId
      }
      getReviewResult({awardId:this.awardId,reportUserId:this.reportUserId,gradeUserId:this.gradeUserId}).then(res => {
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
      this.disabled = false
    },
    subScore(){
      this.btnLoading = true
      toSave(this.submitData).then(res => {
        if(res.code == 1){
          this.gradeUserId = res.data.gradeUserId
          this.getData()
          // this.submitData = res.data.scoreSituationArray
          this.btnLoading = false
          this.disabled = true
          this.$message.success('评审成功！')
        }
      })
    },
    goBack(){
      if(!this.dialogVisible && !this.disabled && (this.gradeUserId == this.$store.state.user.userId || this.gradeUserId == '')){
        this.dialogVisible = true
      }
    },
    goBackOneStep(){
      this.$router.back(-1)
    },
    subGrade(){
      this.subScore()
      this.dialogVisible = false
    }
  }
}
</script>
