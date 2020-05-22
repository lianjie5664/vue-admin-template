<template>
    <div class="three_qasafe">
        <table class="datatables">
            <tbody>
                <tr>
                    <td class="w100">时间</td>
                    <td v-for="(item,index) in formData.time" :key="index">
                        <input type="text" v-model="formData.time[index]" maxlength="4" placeholder="请输入年份" class="noborIpt">
                    </td>
                </tr>
                <tr v-for="(item,index) in formData.dataList" :key="index">
                    <td>{{item.title}}</td>
                    <td v-for="(i,idx) in item.vList" :key="idx">
                        <el-radio-group v-model="item.vList[idx]">
                            <el-radio :label="'1'">有</el-radio>
                            <el-radio :label="'0'">无</el-radio>
                        </el-radio-group>
                    </td>
                </tr>
                <tr>
                    <td>情形简述</td>
                    <td colspan="5">
                        <input type="text" v-model="formData.desc" class="noborIpt">
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="tips">
            <p>注：</p>
            <p>1、可根据所属行业和产品（服务）的实际情况填写；</p>
            <p>2、在相关的符合项的“□”内打“√”</p>
        </div>
    </div>
</template>
<script>
import './cs.less'
export default {
    data(){
        return {
            formData:{
                time:['','','','',''],
                dataList:[
                    {title:'市级以上工程质量监督检查不合格或有违法行为',vList:['','','','','']},
                    {title:'市级以上服务质量监督检查不合格或有违法行为',vList:['','','','','']},
                    {title:'市级以上环境保护监督检查不合格或有违法行为',vList:['','','','','']},
                    {title:'市级以上安全生产监督检查不合格或有违法行为',vList:['','','','','']},
                    {title:'重大的质量、安全、环保事故',vList:['','','','','']},
                    {title:'受到相关方的重大投诉',vList:['','','','','']},
                    {title:'其他违反法律法规的行为',vList:['','','','','']},
                ],
                desc:''
            }
        }
    }
}
</script>
