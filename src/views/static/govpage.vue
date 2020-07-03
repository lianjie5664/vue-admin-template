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
    <div class="bottom-content hg-flex mb15">
      <div class="flex-one group-box mr10">
        <div class="title">企业报告进度</div>
        <div class="box" id="enterprise-report"></div>
      </div>
      <div class="flex-one group-box">
        <div class="title">报告评审进度</div>
        <div class="box" id="professor-report"></div>
      </div>
    </div>
    <div class="bottom-content hg-flex mb15">
      <div class="flex-one group-box mr10">
        <div class="title">卓越绩效二维分析</div>
        <div class="box" id="two-data"></div>
      </div>
      <div class="flex-one group-box">
        <div class="title">卓越绩效六维分析</div>
        <div class="box" id="four-data"></div>
      </div>
    </div>
  </div>
</template>

<script>
import DataSet from '@antv/data-set'
import { Chart } from '@antv/g2'
import { getTotalScoreRank, getScorePercent, getFirstLevelRadar, getReportProgress, getReviewProgress } from '@/api/static'
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
      }],
      totalScoreRank: [],
      scorePercent: [],
      countPercent: 0
    }
  },
  created () {
    this.getApiTotal()
    this.getApiPercent()
    // this.getApiFirst()
    // this.getApiReport()
    // this.getApiReview()
  },
  mounted () {
    this.$nextTick(() => {
      this.getScoreData()
      this.getTypeallData()
      this.getEnterReport()
      this.getProReport()
      this.getFourData()
      this.getTwoData()
    })
  },
  methods: {
    // 报告评审进度
    getApiReview () {
      const params = {
        awardName: '长沙市企业成熟度评价指标库',
        year: 2020
      }
      getReviewProgress(params).then(res => {
        if (res && res.data && res.data.data && res.data.data[0]){
          const data = res.data.data
          // data.forEach(item => {
          //   this.firstLevel.push({
          //     type: item.standardName,
          //     value: item.goal
          //   })
          // })
          // this.getProReport(this.firstLevel)
        }
      })
    },
    // 企业编制报告进度
    getApiReport () {
      const params = {
        awardName: '长沙市企业成熟度评价指标库',
        year: 2020
      }
      getReportProgress(params).then(res => {
        if (res && res.data && res.data.data && res.data.data[0]){
          const data = res.data.data
          // data.forEach(item => {
          //   this.firstLevel.push({
          //     type: item.standardName,
          //     value: item.goal
          //   })
          // })
          // this.getEnterReport(this.firstLevel)
        }
      })
    },
    // 一级指标雷达图
    getApiFirst () {
      const params = {
        awardName: '长沙市企业成熟度评价指标库',
        year: 2020
      }
      getFirstLevelRadar(params).then(res => {
        if (res && res.data && res.data.data && res.data.data[0]){
          const data = res.data.data
          data.forEach(item => {
            this.firstLevel.push({
              type: item.standardName,
              value: item.goal
            })
          })
          // this.getCompareScore(this.firstLevel)
        }
      })
    },
    // 各项得分占比
    getApiPercent () {
      const params = {
        awardName: '长沙市企业成熟度评价指标库',
        year: 2020
      }
      getScorePercent(params).then(res => {
        if (res && res.data && res.data.data && res.data.data[0]){
          const data = res.data.data
          data.forEach(item => {
            this.scorePercent.push({
              type: item.standardName,
              value: +item.goal
            })
          })
          this.countPercent = +res.data.total
          this.getCompareScore(this.scorePercent)
        }
      })
    },
    // 总分排行
    getApiTotal () {
      const params = {
        pageNo: 1,
        pageSize: 10,
        awardName: '长沙市企业成熟度评价指标库',
        year: 2020
      }
      getTotalScoreRank(params).then(res => {
        if (res && res.data && res.data.data && res.data.data[0]){
          const data = res.data.data
          data.forEach(item => {
            this.totalScoreRank.push({
              name: item.companyName,
              value: +item.total
            })
          })
          this.getTotalScore(this.totalScoreRank)
        }
      })
    },
    getTwoData () {
      let myTwoData = this.$echarts.init(document.getElementById('two-data'))
      // 散点数据
      let marksData = [
        {
          name: '企业1',
          value: [32, 15],
        },
        {
          name: '企业2',
          value: [42, 20],
        },
        {
          name: '企业3',
          value: [34, 51],
        },
        {
          name: '企业4',
          value: [45, 64],
        },
      ]
      // 中心线
      const centerLine = [{name: '过程分', xAxis: 40}, {name: '结果分', yAxis: 40}]
      const option = {
        tooltip: {
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            },
            label: {
              backgroundColor: '#555'
            }
          }
        },
        grid: {
          left: 50,
          right: 50,
          bottom: '4%',
          top: '6%',
          containLabel: true
        },
        xAxis: {
          scale: true,
          axisLine: {
            lineStyle: {
              color: '#ddd'
            }
          },
          axisLabel: {
            color: '#666'
          },
          splitLine: {
            lineStyle: {
              color: '#eee'
            }
          }
        },
        yAxis: {
          scale: true,
          axisLine: {
            lineStyle: {
              color: '#ddd'
            }
          },
          axisLabel: {
            color: '#666'
          },
          splitLine: {
            lineStyle: {
              color: '#eee'
            }
          }
        },
        series: [{
          type: 'scatter',
          data: marksData,
          label: {
            show: true,
            position: 'bottom',
            formatter: '{b}'
          },
          itemStyle: {
            shadowBlur: 2,
            shadowColor: 'rgba(120, 36, 50, 0.5)',
            shadowOffsetY: 1,
            color: function (e) {
              let randomColor = 'rgba(' + Math.floor(Math.random() * 240) + ',' + Math.floor(Math.random() * 240) + ',' + Math.floor(Math.random() * 240) + ',' + '.8' + ')'
              return randomColor.substring()
            }
          },
          // 各象限区域
          markArea: {
            silent: true,
            data: [
              // 第一象限
              [{
                name: '第一象限',
                xAxis: 40, // x 轴开始位置
                yAxis: 70, // y 轴结束位置(直接取最大值)
                itemStyle: {
                  color: 'rgba(56, 180, 139, .1)'
                },
                label: {
                  position: 'inside',
                  color: 'rgba(0, 0, 0, .1)',
                  fontSize: 22
                }
              }, {
                yAxis: 40 // y轴开始位置
              }],
              // 第二象限
              [{
                name: '第二象限',
                yAxis: 70, // y 轴结束位置(直接取最大值)
                itemStyle: {
                  color: 'rgba(68, 97, 123, .1)'
                },
                label: {
                  position: 'inside',
                  color: 'rgba(0, 0, 0, .1)',
                  fontSize: 22
                }
              }, {
                xAxis: 40, // x 轴结束位置
                yAxis: 40 // y轴开始位置
              }],
              // 第三象限
              [{
                name: '第三象限',
                yAxis: 40, // y 轴结束位置
                itemStyle: {
                  color: 'rgba(191, 120, 58, .1)'
                },
                label: {
                  position: 'inside',
                  color: 'rgba(0, 0, 0, .1)',
                  fontSize: 22
                }
              }, {
                xAxis: 40, // x 轴结束位置
                yAxis: 10 // y轴开始位置
              }],
              // 第四象限
              [{
                name: '第四象限',
                xAxis: 40, // x 轴开始位置
                yAxis: 40, // y 轴结束位置
                itemStyle: {
                  color: 'rgba(116, 83, 153, .1)'
                },
                label: {
                  position: 'inside',
                  color: 'rgba(0, 0, 0, .1)',
                  fontSize: 22
                }
              }, {
                yAxis: 10 // y轴开始位置
              }]
            ]
          },
          // 中心点交集象限轴
          markLine: {
            silent: true, // 是否不响应鼠标事件
            precision: 2, // 精度
            lineStyle: {
              type: 'solid',
              color: '#00aca6'
            },
            label: {
              color: '#00aca6',
              position: 'end',
              formatter: '{b}'
            },
            data: centerLine
          },
        }]
      }
      myTwoData.setOption(option, true)
    },
    getFourData () {
      const data = [
        { item: '质量', score: 270, total: 300 },
        { item: '创新', score: 250, total: 300 },
        { item: '品牌', score: 180, total: 300 },
        { item: '结果', score: 150, total: 300 },
        { item: '市场满意度', score: 89, total: 200 },
        { item: '顾客满意度', score: 87, total: 200 },
      ]
      const { DataView } = DataSet
      const dv = new DataView().source(data)
      dv.transform({
        type: 'fold',
        fields: ['score', 'total'], // 展开字段集
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
    },
    getEnterReport () {
      const data = [
        { item: '已完成', count: 40, percent: 0.4 },
        { item: '未完成', count: 60, percent: 0.6 }
      ]
      const chart = new Chart({
        container: 'enterprise-report',
        autoFit: false,
        height: 280,
        width: 420
      })
      chart.coordinate('theta', {
        radius: 0.6,
      })
      chart.data(data)
      chart.scale('percent', {
        formatter: (val) => {
          val = val * 100 + '%'
          return val;
        },
      })
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
      })
      chart
        .interval()
        .position('percent')
        .color('item')
        .label('percent', {
          content: (data) => {
            return `${data.item}: ${data.percent * 100}%`
          },
        })
        .adjust('stack')
      chart.render()
    },
    getProReport () {
      const data = [
        { item: '已完成', count: 70, percent: 0.7 },
        { item: '未完成', count: 30, percent: 0.3 }
      ]
      const chart = new Chart({
        container: 'professor-report',
        autoFit: false,
        height: 280,
        width: 420
      })
      chart.coordinate('theta', {
        radius: 0.6,
      })
      chart.data(data)
      chart.scale('percent', {
        formatter: (val) => {
          val = val * 100 + '%'
          return val;
        },
      })
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
      })
      chart
        .interval()
        .position('percent')
        .color('item')
        .label('percent', {
          content: (data) => {
            return `${data.item}: ${data.percent * 100}%`
          },
        })
        .adjust('stack')
      chart.render()
    },
    // 各项得分占比
    getCompareScore (val) {
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
      const userData = val
      const userDv = new DataView()
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
        content: `总得分${this.countPercent}分`,
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
    // 总分排行
    getTotalScore (val) {
      const data = val
      const chart = new Chart({
        container: 'total-score',
        autoFit: false,
        height: 260,
        width: 500
      })
      chart.data(data);
      chart.scale('value', {
        alias: '得分',
      })
      chart.axis('name', {
        tickLine: {
          alignTick: false,
        },
      })
      chart.tooltip({
        showMarkers: false,
      })
      chart.axis('name', false)
      chart.interval().position('name*value')
      // 添加文本标注
      data.forEach((item) => {
        chart
          .annotation()
          .text({
            position: [item.name, item.value],
            content: item.value,
            style: {
              textAlign: 'center',
            },
            offsetY: 10,
          })
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
