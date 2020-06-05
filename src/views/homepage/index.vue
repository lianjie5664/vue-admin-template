<template lang="html">
  <div class="app-container homepage-box">
    <el-row class="top-content hg-flex mb15">
      <el-col :span="6">
        <div class="grid-col col1">
          <div class="title">长沙市市长质量奖</div>
          <div class="cont-item hg-flex">
            <div class="item-info borderRight">
              <div class="item-pot">63 %</div>
              <div class="item-type">完成度</div>
            </div>
            <div class="item-info">
              <div class="item-pot">63 %</div>
              <div class="item-type">专家评审进度</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="ml10">
        <div class="grid-col col2">
          <div class="title">长沙市市长质量奖</div>
          <div class="cont-item hg-flex">
            <div class="item-info borderRight">
              <div class="item-pot">63 %</div>
              <div class="item-type">完成度</div>
            </div>
            <div class="item-info">
              <div class="item-pot">63 %</div>
              <div class="item-type">专家评审进度</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="mr10 ml10">
        <div class="grid-col col3">
          <div class="title">长沙市市长质量奖</div>
          <div class="cont-item hg-flex">
            <div class="item-info borderRight">
              <div class="item-pot">63 %</div>
              <div class="item-type">完成度</div>
            </div>
            <div class="item-info">
              <div class="item-pot">63 %</div>
              <div class="item-type">专家评审进度</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-col col4">
          <div class="title">长沙市市长质量奖</div>
          <div class="cont-item hg-flex">
            <div class="item-info borderRight">
              <div class="item-pot">63 %</div>
              <div class="item-type">完成度</div>
            </div>
            <div class="item-info">
              <div class="item-pot">63 %</div>
              <div class="item-type">专家评审进度</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="bottom-content hg-flex mb15">
      <div class="flex-one group-box mr10">
        <div class="title">参评企业数图</div>
        <div class="box" id="company-data"></div>
      </div>
      <div class="flex-one group-box">
        <div class="title">企业得分情况图</div>
        <div class="box" id="score-data"></div>
      </div>
    </div>
    <div class="bottom-content hg-flex">
      <div class="flex-one group-box mr10">
        <div class="title">结果（质量4个）</div>
        <div class="box" id="four-data"></div>
      </div>
      <div class="flex-one group-box">
        <div class="title">各企业得分</div>
        <div class="box" id="typeall-data"></div>
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
      }
    },
    mounted () {
      this.getCompanyData()
      this.getScoreData()
      this.getFourData()
      this.getTypeallData()
    },
    methods: {
      getCompanyData () {
        const data = [
          { year: '2017', value: 5 },
          { year: '2018', value: 15 },
          { year: '2019', value: 19 }
        ]
        const chart = new Chart({
          container: 'company-data',
          autoFit: false,
          height: 250,
          width: 500
        })
        chart.data(data)
        chart.scale({
          year: {
            range: [0, 1],
          },
          value: {
            min: 0,
            nice: true,
          },
        })
        chart.tooltip({
          showCrosshairs: true,
          shared: true,
        })
        chart.line().position('year*value').label('value')
        chart.point().position('year*value')
        chart.render()
      },
      getScoreData () {
        const { DataView } = DataSet
        const chart = new Chart({
          container: 'score-data',
          autoFit: false,
          height: 300,
          width: 300
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
          .color('type')
        chart.render()
      },
      getFourData () {
        const data = [
          { type: '质量', percent: 0.21 },
          { type: '创新', percent: 0.4 },
          { type: '品牌', percent: 0.49 },
          { type: '结果', percent: 0.52 }
        ]
        const chart = new Chart({
          container: 'four-data',
          autoFit: false,
          height: 250,
          width: 500
        })
        chart.data(data)
        chart.scale('percent', {
          min: 0,
          max: 2,
        })
        chart.tooltip({
          title: 'type',
          showMarkers: false
        })
        chart.legend(false)
        chart.axis('type', {
          grid: null,
          tickLine: null,
          line: null,
          label: {
            style: {
              fill: '#595959'
            }
          }
        })
        chart.coordinate('polar', { innerRadius: 0.1 }).transpose()
        chart
          .interval()
          .position('type*percent')
          .color('percent', '#BAE7FF-#1890FF-#0050B3')
          .tooltip('percent', (val) => {
            return {
              name: '占比',
              value: val * 100 + '%',
            }
          })
          .label('percent', {
            offset: -2,
            content: (data) => {
              return data.percent * 100 + '%'
            }
          })
        chart.render()
      },
      getTypeallData () {
        const data = [
          { year: '1951 年', sales: 38 },
          { year: '1952 年', sales: 52 },
          { year: '1956 年', sales: 61 },
          { year: '1957 年', sales: 145 }
        ];
        const chart = new Chart({
          container: 'typeall-data',
          autoFit: false,
          height: 250,
          width: 500
        })
        chart.data(data)
        chart.scale('sales', {
          nice: true
        })
        chart.tooltip({
          showMarkers: false
        })
        chart.interval().position('year*sales')
        chart.render()
      }
    }
  }
</script>
