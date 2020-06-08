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
        <div class="title">参评企业数</div>
        <div class="box" id="company-data"></div>
      </div>
      <div class="flex-one group-box">
        <div class="title">企业得分情况</div>
        <div class="box" id="score-data"></div>
      </div>
    </div>
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
          width: 500,
          height: 250
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
        chart
          .line()
          .position('year*value')
          .label('value')
          .shape('smooth')
        chart.point().position('year*value')
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
