<template lang="html">
  <div class="table-box">
    <el-table class="mb15"
      border
      :data="ownList"
      style="width: 100%"
      :default-sort = "{prop: 'scoreTotal', order: 'descending'}">
      <el-table-column
        prop="name"
        label="奖项名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name2"
        label="所属行业"
        width="180">
      </el-table-column>
      <el-table-column
        prop="score1"
        label="质量分"
        width="150">
      </el-table-column>
      <el-table-column
        prop="score2"
        label="创新分"
        width="150">
      </el-table-column>
      <el-table-column
        prop="score3"
        label="品牌分"
        width="180">
      </el-table-column>
      <el-table-column
        prop="score4"
        label="结果分"
        width="180">
      </el-table-column>
      <el-table-column
        prop="scoreTotal"
        label="总分"
        sortable>
      </el-table-column>
    </el-table>
    <div class="bottom-content hg-flex">
      <div class="flex-one group-box mr10">
        <div class="title">成熟度概况</div>
        <div class="box" id="four-data"></div>
      </div>
      <div class="flex-one group-box">
        <div class="title">年度企业平均分</div>
        <div class="box" id="typeall-data"></div>
      </div>
    </div>
  </div>
</template>

<script>
import DataSet from '@antv/data-set'
import { Chart } from '@antv/g2'
export default {
  data () {
    return {
      ownList: [{
        id: 1,
        name: '长沙市质量奖1',
        name2: '食品制造业',
        score1: 319,
        score2: 200,
        score3: 200,
        score4: 200,
        scoreTotal: 919
      }, {
        id: 2,
        name: '长沙市质量奖2',
        name2: '农业（养殖业）',
        score1: 209,
        score2: 198,
        score3: 320,
        score4: 180,
        scoreTotal: 907
      }, {
        id: 3,
        name: '长沙市质量奖3',
        name2: '石油加工业',
        score1: 199,
        score2: 150,
        score3: 220,
        score4: 130,
        scoreTotal: 699
      }]
    }
  },
  mounted () {
    this.getTypeallData()
    this.getFourData()
  },
  methods: {
    getTypeallData () {
      const data = [
        { year: '2017年', average: 780 },
        { year: '2018年', average: 620 },
        { year: '2019年', average: 810 },
        { year: '2020年', average: 950 }
      ];
      const chart = new Chart({
        container: 'typeall-data',
        autoFit: false,
        height: 250,
        width: 500
      })
      chart.data(data)
      chart.scale('average', {
        nice: true
      })
      chart.tooltip({
        showMarkers: false
      })
      chart
        .interval()
        .position('year*average')
      chart.render()
    },
    getFourData () {
      const data = [
        { item: '质量', score: 270 },
        { item: '创新', score: 250 },
        { item: '品牌', score: 180 },
        { item: '结果', score: 150 },
        { item: '市场满意度', score: 89 },
        { item: '顾客满意度', score: 87 },
      ]
      const { DataView } = DataSet
      const dv = new DataView().source(data)
      dv.transform({
        type: 'fold',
        fields: ['score'], // 展开字段集
        key: 'user', // key字段
        value: 'score', // value字段
      })
      const chart = new Chart({
        container: 'four-data',
        autoFit: false,
        height: 280,
        width: 500
      })
      chart.data(dv.rows)
      chart.scale('score', {
        min: 0,
        max: 400
      })
      chart.coordinate('polar', {
        radius: 0.8
      })
      chart.tooltip({
        shared: true,
        showCrosshairs: true,
        crosshairs: {
          line: {
            style: {
              lineDash: [4, 4],
              stroke: '#333'
            }
          }
        }
      })
      chart.axis('item', {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            },
          },
        }
      })
      chart.axis('score', {
        line: null,
        tickLine: null,
        grid: {
          line: {
            type: 'line',
            style: {
              lineDash: null,
            },
          },
        }
      })
      chart
        .line()
        .position('item*score')
        .color('user')
        .size(2)
      chart
        .point()
        .position('item*score')
        .color('user')
        .shape('circle')
        .size(4)
        .style({
          stroke: '#fff',
          lineWidth: 1,
          fillOpacity: 1
        })
      chart
        .area()
        .position('item*score')
        .color('user')
      chart.render()
    }
  }
}
</script>
