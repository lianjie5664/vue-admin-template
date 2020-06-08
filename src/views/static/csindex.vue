<template lang="html">
  <div class="app-container static-box">
    <div class="table-box" v-if="roleId === '1'">
      <el-table class="mb15"
        border
        :data="ownList"
        style="width: 100%"
        :default-sort = "{prop: 'score', order: 'descending'}">
        <el-table-column
          prop="name"
          label="名称"
          width="280">
        </el-table-column>
        <el-table-column
          prop="score"
          label="分数"
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
          <!-- <div class="box" id="typeall-data"></div> -->
        </div>
      </div>
    </div>
    <div class="table-box" v-if="roleId === '2cc247944de3468aab59f58a2b8aa0f4'">
      <el-table class="mb15"
        border
        :data="govList"
        style="width: 100%"
        :default-sort = "{prop: 'scoreTotal', order: 'descending'}">
        <el-table-column
          prop="name"
          label="名称"
          width="280">
        </el-table-column>
        <el-table-column
          prop="score1"
          label="质量分"
          width="180">
        </el-table-column>
        <el-table-column
          prop="score2"
          label="创新分"
          width="180">
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
      <div class="bottom-content hg-flex mb15">
        <div class="flex-one group-box">
          <div class="title">企业得分情况</div>
          <div class="box" id="score-data"></div>
        </div>
        <div class="flex-one group-box">
          <div class="title">年度企业平均分</div>
          <div class="box" id="typeall-data"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import './styles/index.scss'
  import DataSet from '@antv/data-set'
  import { Chart } from '@antv/g2'

  export default {
    data () {
      return {
        ownList: [{
          id: 1,
          name: '长沙1',
          score: 99
        }, {
          id: 2,
          name: '长沙2',
          score: 199
        }, {
          id: 3,
          name: '长沙3',
          score: 299
        }, {
          id: 4,
          name: '长沙4',
          score: 399
        }],
        govList: [{
          id: 1,
          name: '长沙1',
          score1: 99,
          score2: 100,
          score3: 100,
          score4: 100,
          scoreTotal: 399
        }, {
          id: 2,
          name: '长沙2',
          score1: 199,
          score2: 200,
          score3: 100,
          score4: 100,
          scoreTotal: 599
        }, {
          id: 3,
          name: '长沙3',
          score1: 199,
          score2: 100,
          score3: 300,
          score4: 100,
          scoreTotal: 699
        }]
      }
    },
    computed: {
      roleId () {
        return this.$store.getters.roleId
      }
    },
    mounted () {
      this.getScoreData()
      this.getFourData()
      this.getTypeallData()
      // this.$nextTick(() => {
      //
      // })
    },
    methods: {
      getScoreData () {
        const { DataView } = DataSet
        const chart = new Chart({
          container: 'score-data',
          autoFit: false,
          height: 300,
          width: 420
        })
        chart.legend(false)
        chart.tooltip({
          showTitle: false,
          showMarkers: false,
          itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
        })
        const userData = [
          { type: '900~1000分', value: 45 },
          { type: '800~900分', value: 10 },
          { type: '700~800分', value: 10 },
          { type: '600~700分', value: 20 },
          { type: '低于600分', value: 30 }
        ]
        const userDv = new DataView();
        userDv.source(userData).transform({
          type: 'percent',
          field: 'value',
          dimension: 'type',
          as: 'percent',
        })
        const pieView = chart.createView()
        pieView.data(userDv.rows)
        pieView.scale('percent', {
          formatter: (val) => {
            return (val * 100).toFixed(2) + '%'
          }
        })
        pieView.coordinate('theta', {
          radius: 0.8,
          innerRadius: 0.7
        })
        pieView.annotation().text({
          position: ['50%', '50%'],
          content: '总分1000分',
          style: {
            lineHeight: '24px',
            fontSize: '16',
            fill: '#333333',
            textAlign: 'center',
          }
        })
        pieView
          .interval()
          .adjust('stack')
          .position('percent')
          .label('type')
          .color('type')
        chart.render()
      },
      getFourData () {
        const data = [
          { type: '质量', value: 270 },
          { type: '创新', value: 250 },
          { type: '品牌', value: 180 },
          { type: '结果', value: 150 },
        ]
        const chart = new Chart({
          container: 'four-data',
          autoFit: false,
          height: 280,
          width: 500
        })
        chart.coordinate('theta', {
          startAngle: Math.PI, // 起始角度
          endAngle: Math.PI * (3 / 2), // 结束角度
        })
        chart.data(data)
        chart.tooltip({
          showTitle: false,
          showMarkers: false,
        })
        chart.legend({
          position: 'right-bottom',
        })
        chart
          .interval()
          .adjust('stack')
          .position('value')
          .color('type')
        chart.render()
      },
      getTypeallData () {
        const data = [
          { year: '2017年', average: 380 },
          { year: '2018年', average: 520 },
          { year: '2019年', average: 610 },
          { year: '2020年', average: 450 }
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
      }
    }
  }
</script>
