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
        <el-button type="primary" @click.stop="toCreate">提交</el-button>
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
          label="得分">
          <template slot-scope="scope">
            <!-- <el-input-number v-if="!scope.row.children"
              v-model="scope.row.calculate"
              controls-position="right"
              :precision="2"
              :step="0.05"
              :min="0" :max="1"
              @change="handleNumCon(scope.row)"></el-input-number> -->
              <el-progress v-if="scope.row.grade == '二级指标' && scope.row.score != ''" :text-inside="true" :stroke-width="20" :percentage="scope.row.groupScore || 0" :format="format" status="success"></el-progress>
              <el-row type="flex" v-if="scope.row.grade == '三级指标' && scope.row.score != ''" >
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
          prop="score1"
          align="center"
          label="备注">
           <template slot-scope="scope">
             <el-input v-model="scope.row.summary" placeholder="请输入备注"></el-input>
            </template>
        </el-table-column>
        <el-table-column
          prop="score"
          width="150"
          align="center"
          label="查看">
           <template>
             <el-button type="text" size="small">查看详情</el-button>
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
  </div>
</template>

<script>
import './style/review.scss'
import { findListByAward } from '@/api/award'
import { toSave } from '@/api/review'

export default {
  data () {
    return {
      formParams: {
        scoreTotal: 0, // 得分情况
        gradeUserName: '', // 评审人
      },
      awardList: [], // 奖项列表
      awardId: this.$route.query.awardId,
      companyId:this.$route.query.companyId,
      isFixed: false,
      loading: false, // 页面加载loading
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
  created () {
    this.getAward()
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
    totalScore(){
      let score = 0
      this.awardList.map((item) => {
        if(item.totalScore != undefined)
          score += item.totalScore
        })
      return score
    }
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
    getAward () {
      this.loading = true
      // let awardId = '476a8c26654a446bbdd7bc82c2dfa0b3'
      // let awardId = 'f603d02b076f4f9e80a56fd8c3ddd985'
      findListByAward({awardId: this.awardId}).then(res => {
        if (res && res.data && res.data[0]) {
          this.loading = false
          this.awardList = res.data
        }
      })
    },
    handleNumCon (row) {
      let cloneData = this.optionData
      cloneData.filter(father => {
        // 循环所有项，并添加children属性
        let branchArr = father.children.filter(child => father.id == child.parentId && child.score !="")  // 返回每一项的子级数组
        console.log('baranarr',branchArr)
        let finalArr = branchArr.filter(child => father.id == child.parentId),totalScore = 0
        finalArr.map((item) => {
          let sortArr = []
          for(let i=0;i<item.children.length;i++){
            sortArr.push(parseFloat(item.children[i].score * item.children[i].calculate))
          }
          item.groupScore = this.calcuMedian(sortArr)
          totalScore += this.calcuMedian(sortArr)
          console.log('分割线================')
        })
        father.totalScore = totalScore
      })
      this.awardList = cloneData
    },
    calcuMedian(data){
      let result =  data.sort(function(a,b){
           if (a>b) {
              return 1;
          }else if(a<b){
              return -1
          }else{
             return 0;
         }    
     })
      if(result.length%2===0){ //判断数字个数是奇数还是偶数
          return ((result[result.length/2]+result[result.length/2-1])/2);//偶数个取中间两个数的平均数
      }else{
          return result[parseInt(result.length/2)];//奇数个取最中间那个数
      }
    }, 
    // 提交
    toCreate () {
      console.log(111,this.optionData)
      return
      toSave({data: this.paramArr}).then(res => {
        if (res && +res.code === 1) {
          this.formParams.scoreTotal = res.data.scoreTotal
          this.formParams.gradeUserName = res.data.gradeUserName
          this.$message.success('提交成功！')
        } else {
          this.$message.error('保存失败！')
        }
      })
    },
    format(percentage) {
      return `${percentage}分`;
    }
  }
}
</script>
