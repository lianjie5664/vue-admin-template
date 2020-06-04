<template>
    <div class="major_common">
        <el-row :gutter="10">
            <el-col :span="6">
                顾客总数： <span class="red fw700">{{formData.length}}</span> 家
            </el-col>
        </el-row>
        <table class="supply_table">
            <thead>
                <th>序号</th>
                <th>顾客名称</th>
                <th>销售产品名称(规格)</th>
                <th>销售数</th>
                <th>单位</th>
                <th>通讯地址</th>
                <th>邮政编码</th>
                <th>联系人</th>
                <th>联系电话</th>
            </thead>
            <tbody>
                <tr v-for="(item,index) in formData" :key="index">
                    <td>{{index + 1}}</td>
                    <td><input type="text" v-model="item.cname" class="noborIpt"></td>
                    <td><input type="text" v-model="item.pname" class="noborIpt"></td>
                    <td><input type="text" v-model="item.pcount" class="noborIpt"></td>
                    <td><input type="text" v-model="item.unit" class="noborIpt"></td>
                    <td><input type="text" v-model="item.address" class="noborIpt"></td>
                    <td><input type="text" v-model="item.zipcode" class="noborIpt"></td>
                    <td><input type="text" v-model="item.contacter" class="noborIpt"></td>
                    <td>
                        <el-row :gutter="10">
                            <el-col :span="18">
                                <input type="text" v-model="item.mobile" class="noborIpt">
                            </el-col>
                            <el-col :span="3" class="lh23"> 
                                <i class="el-icon-delete pointer red" title="删除行" @click="delRow(index)"></i>
                            </el-col>
                            <el-col :span="3" class="lh23"> 
                                <i class="el-icon-document-add pointer green" title="新增行" v-if="index == formData.length - 1" @click="addRow(index)"></i>
                            </el-col>
                        </el-row>
                     </td>
                </tr>
            </tbody>
        </table>
        <div class="tips">
            <p>注：填写企业（组织）的主要顾客名单，可另加附页。</p>
        </div>
        <div style="height:80px;"></div>
        <div class="submit-box">
            <el-button type="primary" @click="handleSubmit">提交保存</el-button>
        </div>
    </div>
</template>
<script>
import './cs.less'
import {savaQaRept,getReptCompileDetail} from '@/api/award' 
import {notice} from '@/utils/tools'
export default {
    data(){
        return {
            formData:[
                {cname:'',pname:'',pcount:'',unit:'',address:'',zipcode:'',contacter:'',mobile:''}
            ],
        } 
    },
    props:['id','awardId'],
    methods:{
        delRow(rowIdx){
            if(rowIdx == 0){
                this.$message.error('至少保留一条数据')
                return
            }
            this.formData.splice(rowIdx,1)
        },
        addRow(index){
            let muban = {cname:'',pname:'',pcount:'',unit:'',address:'',zipcode:'',contacter:'',mobile:''}
            this.formData.push(muban)
        },
        handleSubmit(){
            let data = {
                awardId:this.awardId,
                standardId:this.id,
                description:this.formData
            }
            savaQaRept(data).then( res => {
                if(res.code == 1){
                    notice(1,'保存成功！',1)
                }else{
                    notice(0,'保存失败，请重试！',0)
                }
            })
        },
        getDetail(){
            getReptCompileDetail({standardId:this.id}).then((res) =>{
                if(res.code == 1){
                    this.formData = JSON.parse(res.data.description)
                }
            })
        },
    },
    created(){
        this.getDetail()
    }
}
</script>