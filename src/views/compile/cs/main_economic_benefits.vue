<template>
    <div class="main_eco_ben">
        <table class="dataTable">
            <thead>
                <th  v-for="(item,index) in formData.head" :key="index">
                    <div v-if="item.name != ''">{{item.name}}</div>
                    <div v-else style="position:relative;">
                        <input type="text" style="width:65px;" placeholder="年份" v-model="item.value">
                        <span style="position:abso3
                        lute;right:20%;top:15%;">年</span>
                    </div>
                </th>
            </thead>
            <tbody>
                <tr v-for="(i,idx) in formData.body" :key="idx">
                    <td>{{i.sort}}</td>
                    <td>{{i.name}}</td>
                    <td>{{i.unit}}</td>
                    <td><input type="text" v-model="i.v1" class="noborIpt"></td>
                    <td><input type="text" v-model="i.v2" class="noborIpt"></td>
                    <td><input type="text" v-model="i.v3" class="noborIpt"></td>
                    <td><input type="text" v-model="i.ranking" class="noborIpt"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import './cs.less'
export default {
    data(){
        return {
            formData:{
                head:[
                    {name:'序号',value:'',ext:''},
                    {name:'项目',value:'',ext:''},
                    {name:'单位',value:'',ext:''},
                    {name:'',value:'',ext:'年'},
                    {name:'',value:'',ext:'年'},
                    {name:'',value:'',ext:'年'},
                    {name:'省内同行业排名',value:'',ext:''},
                ],
                body:[
                    {sort:1,name:'总资产额',unit:'万元',v1:'',v2:'',v3:'',ranking:''},
                    {sort:2,name:'主营业务收入',unit:'万元',v1:'',v2:'',v3:'',ranking:''},
                    {sort:3,name:'投资收益',unit:'万元',v1:'',v2:'',v3:'',ranking:''},
                    {sort:4,name:'营业外收入',unit:'万元',v1:'',v2:'',v3:'',ranking:''},
                    {sort:5,name:'利润总额',unit:'万元',v1:'',v2:'',v3:'',ranking:''},
                    {sort:6,name:'纳税总额',unit:'万元',v1:'',v2:'',v3:'',ranking:''},
                    {sort:7,name:'销售额',unit:'万元',v1:'',v2:'',v3:'',ranking:''},
                    {sort:8,name:'创汇总额',unit:'万美元',v1:'',v2:'',v3:'',ranking:''},
                    {sort:9,name:'社会贡献值',unit:'%',v1:'',v2:'',v3:'',ranking:''},
                    {sort:10,name:'总资产贡献率',unit:'%',v1:'',v2:'',v3:'',ranking:''},
                    {sort:11,name:'资本保值增值率',unit:'%',v1:'',v2:'',v3:'',ranking:''},
                    {sort:12,name:'资产负债率',unit:'%',v1:'',v2:'',v3:'',ranking:''},
                    {sort:13,name:'流动资产周转率',unit:'次',v1:'',v2:'',v3:'',ranking:''},
                    {sort:14,name:'成本费用利润率',unit:'%',v1:'',v2:'',v3:'',ranking:''},
                    {sort:15,name:'全员劳动生产率',unit:'万元/人',v1:'',v2:'',v3:'',ranking:''},
                    {sort:16,name:'产品销售率',unit:'%',v1:'',v2:'',v3:'',ranking:''},
                    {sort:17,name:'产品质量等级品率',unit:'%',v1:'',v2:'',v3:'',ranking:''},
                    {sort:18,name:'质量损失率',unit:'%',v1:'',v2:'',v3:'',ranking:''},
                    {sort:19,name:'新产品产值率',unit:'%',v1:'',v2:'',v3:'',ranking:''},
                    {sort:20,name:'万元总产值综合能耗',unit:'吨/万元',v1:'',v2:'',v3:'',ranking:''},
                    {sort:21,name:'万元总产值综合能耗年下降率',unit:'%',v1:'',v2:'',v3:'',ranking:''},
                    {sort:22,name:'安全指标',unit:'/',v1:'',v2:'',v3:'',ranking:''}
                ]
            }
        }
    },
    props:['id'],
    created(){
           console.log(this.id)
    }
}
</script>
