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
        <div class="title">总分排序分析</div>
        <div class="box" id="total-score"></div>
      </div>
      <div class="flex-one group-box">
        <div class="title">每项得分占比分析</div>
        <div class="box" id="compare-score"></div>
      </div>
    </div>
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
    this.getTotalScore()
    this.getCompareScore()
  },
  methods: {
    getCompareScore () {
      const { DataView } = DataSet
      const chart = new Chart({
        container: 'compare-score',
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
        { type: '质量分', value: 200 },
        { type: '结果分', value: 300 },
        { type: '创新分', value: 200 },
        { type: '品牌分', value: 200 }
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
        content: '得分900分',
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
    getTotalScore () {
      const data = [
        { name: '企业1', value: 410 },
        { name: '企业2', value: 520 },
        { name: '企业3', value: 550 },
        { name: '企业4', value: 440 },
        { name: '企业5', value: 750 },
        { name: '企业6', value: 820 },
        { name: '企业7', value: 925 },
        { name: '企业8', value: 870 },
        { name: '企业9', value: 720 },
        { name: '企业10', value: 840 },
        { name: '企业11', value: 780 },
        { name: '企业12', value: 950 },
        { name: '企业13', value: 780 },
      ]
      const ds = new DataSet()
      const dv = ds.createView().source(data)
      dv.transform({
        type: 'map',
        callback: row => {
          row.name = parseInt(row.name, 10)
          return row
        }
      }).transform({
        type: 'regression',
        method: 'polynomial',
        fields: ['name', 'value'],
        bandwidth: 0.1,
        as: ['Name', 'Value']
      })
      const chart = new Chart({
        container: 'total-score',
        autoFit: false,
        height: 260,
        width: 500
      })
      chart.scale({
        Name: {
          range: [0, 1],
        },
        value: {
          alias: '得分',
          sync: true,
          nice: true
        },
        Value: {
          sync: true,
          nice: true
        },
      })
      chart.axis('name', {
        tickLine: null
      })
      const view1 = chart.createView()
      view1.data(data)
      view1.axis('name', false)
      view1
        .interval()
        .position('name*value')
        .style({
          fillOpacity: 1,
        })
      const view2 = chart.createView()
      view2.axis(false)
      view2.data(dv.rows)
      view2
        .line()
        .position('Name*Value')
        .style({
          stroke: '#333333',
          lineDash: [3, 3]
        })
        .tooltip(false)
      view2.annotation().text({
        content: '趋势线',
        position: ['min', 'min'],
        style: {
          fill: '#333333',
          fontSize: 12,
          fontWeight: 300
        },
        offsetY: -60
      })
      chart.render()
    },
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
