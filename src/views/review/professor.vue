<template lang="html">
  <div class="app-container professor-page">
    <div class="top-info hg-flex mb20">
      <div class="items mr40">
        <label class="mr15">得分情况:</label>
        <el-input v-model="formParams.professorName"></el-input>
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
        :default-expand-all="true"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="id"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="评分项名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="cube"
          label="类目分值">
        </el-table-column>
        <el-table-column
          prop="score"
          label="得分">
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
        professorName: ''
      },
      tableData: [{
        id: 1,
        name: '质量发展',
        cube: '120分',
        score: '60分',
        children: [{
          id: 11,
          name: '质量战略',
          cube: '120分',
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
        cube: '120分',
        score: '60分',
        children: [{
          id: 31,
          name: '品牌建设',
          cube: '120分',
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
