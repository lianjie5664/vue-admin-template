<template lang="html">
  <div class="app-container professor-page result-page">
    <div class="top-info hg-flex mb20">
      <div class="items mr40">
        <label class="mr15">得分情况:</label>
        <el-input v-model="formParams.scoreCondition" :disabled="true" class="get-goal"></el-input>
      </div>
      <div class="items">
        <label>评审人:</label>
        <el-input v-model="formParams.professorName" :disabled="true"></el-input>
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
          label="评分项名称"
          width="350">
        </el-table-column>
        <el-table-column
          prop="score"
          width="200"
          label="类目分值（分）">
        </el-table-column>
        <el-table-column
          width="180"
          label="系数">
          <template slot-scope="scope">
            <span v-if="!scope.row.children">系数: <span class="cient-item">{{scope.row.calculate || 0}}</span></span>
          </template>
        </el-table-column>
        <el-table-column
          label="得分">
          <template slot-scope="scope">
            <span v-if="scope.row.children && +scope.row.parentId !== 0" class="score-item">{{scope.row.goal || 0}} 分</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import './style/review.scss'
import { findListByAward } from '@/api/award'

export default {
  data () {
    return {
      formParams: {
        scoreCondition: '', // 得分情况
        professorName: '', // 评审人
        calculate: 0, // 系数
        goal: 0 // 项目得分
      },
      awardList: [], // 奖项列表
      loading: false // 页面加载loading
    }
  },
  created () {
    this.getAward()
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
    // 获取奖项评分列表
    getAward () {
      this.loading = true
      let awardId = '476a8c26654a446bbdd7bc82c2dfa0b3'
      findListByAward({awardId: awardId}).then(res => {
        if (res && res.data && res.data[0]) {
          this.loading = false
          this.awardList = res.data
        }
      })
    }
  }
}
</script>
