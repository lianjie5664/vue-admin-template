<template>
    <div class="three_qacheck">
        <table class="dataTable">
            <thead>
                <th>时间</th>
                <th>产品名称</th>
                <th>抽查部门</th>
                <th>抽查结论</th>
            </thead>
            <tbody>
                <tr v-for="(item,index) in formData" :key="index">
                    
                    <td>
                        <el-date-picker
                            v-model="item.time"
                            type="datetime"
                            class="noborIpt"
                            size="small"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </td>
                    <td><input type="text" v-model="item.name" class="noborIpt"></td>
                    <td><input type="text" v-model="item.dept" class="noborIpt"></td>
                    <td>
                        <el-row :gutter="10">
                            <el-col :span="18">
                                <input type="text" v-model="item.result" class="noborIpt">
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
                {time:'',name:'',dept:'',result:''}
            ],
        } 
    },
    props:['id','awardId'],
    methods:{
        delRow(rowIdx){
            this.formData.splice(rowIdx,1)
        },
        addRow(index){
            let muban = {time:'',name:'',dept:'',result:''}
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
        }
    },
    created(){
        this.getDetail()
    }
}
</script>