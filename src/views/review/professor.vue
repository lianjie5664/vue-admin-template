<template lang="html">
  <div class="app-container professor-page">
    <div class="top-info hg-flex mb20">
      <div class="items mr40">
        <label class="mr15">得分情况:</label>
        <el-input v-model="formParams.scoreCondition" :disabled="true" class="get-goal"></el-input>
      </div>
      <div class="items">
        <label>评审人:</label>
        <el-input v-model="formParams.professorName"></el-input>
      </div>
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
            <el-input-number v-if="!scope.row.children"
              v-model="scope.row.calculate"
              controls-position="right"
              :precision="2"
              :step="0.05"
              :min="0" :max="1"
              @change="handleNumCon(scope.row.calculate, scope.row.id)"></el-input-number>
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
import { toSave } from '@/api/review'

export default {
  data () {
    return {
      formParams: {
        scoreCondition: '', // 得分情况
        professorName: '', // 评审人
      },
      awardList: [], // 奖项列表
      loading: false, // 页面加载loading
      paramsList: {
        id: '',
        awardId: '',
        parentId: '',
        calculate: 0, // 系数
        score: '' // 分数
      },
      paramArr: []
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
    },
    handleNumCon (val, id) {
      this.awardList.forEach(item => {
        if (item.id === id) {
          this.paramsList.id = item.id
          this.paramsList.awardId = item.awardId
          this.paramsList.parentId = item.parentId
          this.paramsList.score = item.score
          this.paramsList.calculate = val
        }
      })
      this.paramArr.push(this.paramsList)
      this.paramArr = Array.from(new Set(this.paramArr))
      console.log('handleNumCon++', val, id)
      console.log('paramArr++', this.paramArr)
    },
    // 提交
    toCreate () {
      toSave({data: this.paramArr}).then(res => {
        if (res && +res.code === 1) {
          this.$message.success('提交成功！')
        } else {
          this.$message.error('保存失败！')
        }
      })
    }
  }
}
</script>
