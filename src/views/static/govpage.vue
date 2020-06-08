<template lang="html">
  <div class="table-box">
    <el-table class="mb15"
      border
      :data="govList"
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
    <div class="bottom-content hg-flex mb15">
      <div class="flex-one group-box mr10">
        <div class="title">企业得分情况</div>
        <div class="box" id="score-data"></div>
      </div>
      <div class="flex-one group-box">
        <div class="title">行业平均分</div>
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
      govList: [{
        id: 1,
        name: '长沙市质量奖1',
        name2: '烟草制品业',
        score1: 301,
        score2: 120,
        score3: 210,
        score4: 100,
        scoreTotal: 731
      }, {
        id: 2,
        name: '长沙市质量奖2',
        name2: '纺织业',
        score1: 209,
        score2: 210,
        score3: 280,
        score4: 200,
        scoreTotal: 899
      }, {
        id: 3,
        name: '长沙市质量奖3',
        name2: '家具制造业',
        score1: 199,
        score2: 213,
        score3: 198,
        score4: 297,
        scoreTotal: 907
      }, {
        id: 4,
        name: '长沙市质量奖4',
        name2: '医药制造业',
        score1: 291,
        score2: 210,
        score3: 198,
        score4: 150,
        scoreTotal: 849
      }]
    }
  },
  mounted () {
    this.getScoreData()
    this.getTypeallData()
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
    getTypeallData () {
      const data = [
        { business: '烟草制品业', average: 980 },
        { business: '纺织业', average: 720 },
        { business: '家具制造业', average: 810 },
        { business: '医药制造业', average: 750 },
        { business: '农业（养殖业）', average: 820 },
        { business: '塑料制造业', average: 910 },
        { business: '橡胶制造业', average: 850 },
        { business: '金属制品业', average: 920 },
        { business: '专用设备制造业', average: 810 },
        { business: '交通运输设备制造业', average: 950 }
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
        .position('business*average')
      chart.render()
    }
  }
}
</script>
