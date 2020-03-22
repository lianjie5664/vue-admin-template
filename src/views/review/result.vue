<template lang="html">
  <div class="app-container professor-page result-page">
    <div class="top-info hg-flex mb20">
      <div class="items mr40">
        <label class="mr15">得分情况:</label>
        <el-input v-model="formParams.scoreCondition"></el-input>
      </div>
      <div class="items">
        <label>评审人:</label>
        <el-input v-model="formParams.professorName"></el-input>
      </div>
      <div class="items ml30">
        <el-button type="primary">提交</el-button>
      </div>
    </div>
    <div class="table-list">
      <el-table
        :data="tableData"
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
          prop="cube"
          width="180"
          label="类目分值">
        </el-table-column>
        <el-table-column
          label="得分">
          <template slot-scope="scope">
            <span>系数: <span>0.5</span></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import './style/review.scss'

export default {
  data () {
    return {
      formParams: {
        scoreCondition: '', // 得分情况
        professorName: '', // 评审人
        numCon: 0 // 系数
      },
      tableData: [{
        id: 1,
        name: '质量发展',
        cube: '120分',
        score: '60分',
        children: [{
          id: 11,
          name: '质量战略',
          cube: '100分',
          score: '60分'
        }, {
          id: 12,
          name: '质量文化',
          cube: '120分',
          score: '60分'
        }]
      }, {
        id: 2,
        name: '创新',
        cube: '120分',
        score: '60分'
      }, {
        id: 3,
        name: '品牌',
        cube: '1210分',
        score: '40分',
        children: [{
          id: 31,
          name: '品牌建设',
          cube: '130分',
          score: '60分'
        }, {
          id: 32,
          name: '品牌规划',
          cube: '120分',
          score: '60分'
        }]
      }, {
        id: 4,
        name: '结果',
        cube: '120分',
        score: '60分',
        children: [{
          id: 41,
          name: '产品和服务',
          cube: '120分',
          score: '60分'
        }, {
          id: 42,
          name: '经济效益',
          cube: '120分',
          score: '60分'
        }]
      }]
    }
  }
}
</script>
