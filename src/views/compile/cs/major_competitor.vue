<template>
    <div class="major_common">
        <table class="supply_table">
            <thead>
                <th class="w60">序号</th>
                <th>名称</th>
                <th>地址</th>
                <th>邮编</th>
                <th>产品</th>
                <th>品牌</th>
                <th>联系人</th>
                <th>电话</th>
                <th>传真</th>
            </thead>
            <tbody>
                <tr v-for="(item,index) in formData" :key="index">
                    <td class="center">{{index + 1}}</td>
                    <td><input type="text" v-model="item.name" class="noborIpt"></td>
                    <td><input type="text" v-model="item.address" class="noborIpt"></td>
                    <td><input type="text" v-model="item.zipcode" class="noborIpt"></td>
                    <td><input type="text" v-model="item.product" class="noborIpt"></td>
                    <td><input type="text" v-model="item.brand" class="noborIpt"></td>
                    <td><input type="text" v-model="item.contacter" class="noborIpt"></td>
                    <td><input type="text" v-model="item.mobile" class="noborIpt"></td>
                    <td>
                        <el-row :gutter="10">
                            <el-col :span="18">
                                <input type="text" v-model="item.fax" class="noborIpt">
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
    </div>
</template>
<script>
import './cs.less'
export default {
    data(){
        return {
            formData:[
                {cname:'',pname:'',pcount:'',unit:'',address:'',zipcode:'',contacter:'',mobile:''}
            ],
        } 
    },
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
        }
    }
}
</script>