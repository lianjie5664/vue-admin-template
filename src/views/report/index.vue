<template>
    <div class="app-container">
        <div class="table">
            <el-table
                ref="multipleTable"
                v-loading="listLoading"
                :data="list"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
                @selection-change="handleSelectionChange">
                >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column align="center" label="编号" width="95">
                    <template slot-scope="scope">
                    {{ scope.$index }}
                    </template>
                </el-table-column>
                <el-table-column label="奖项名称" >
                    <template slot-scope="scope">
                    {{ scope.row.name }}
                    </template>
                </el-table-column>
                <el-table-column label="地区">
                    <template slot-scope="scope">
                    <span>{{ scope.row.area }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="描述">
                    <template slot-scope="scope">
                    {{ scope.row.description }}
                    </template>
                </el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">
                    {{ scope.row.createDate }}
                    </template>
                </el-table-column>
                <el-table-column label="更新时间">
                    <template slot-scope="scope">
                    {{ scope.row.updateDate }}
                    </template>
                </el-table-column>
                 <el-table-column label="操作" width="230" class-name="small-padding fixed-width">
                    <template slot-scope="{row}">
                        <el-button type="primary" size="mini" plain>
                            <router-link :to="'compile/'+ row.id">编制报告</router-link>
                        </el-button>
                        <el-button size="mini" plain type="danger" @click="handleDelAward(row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { awardSave,fetchAwardList,deleteAward } from '@/api/award'
import {statusFilter} from '@/utils/filter'
import {notice} from '@/utils/tools'
export default {
    data(){
        return {
            list: null,
            listLoading: false,
            awardVisble:{v:false},
            selectedRow:'',
            formData:{
                awardList:[
                    {type:'Input',label:'奖项名称',prop:'name',placeholder:'请输入奖项名称',value:''},
                    {type:'Input',label:'所在地区',prop:'area',placeholder:'请输入所在地区',value:''},
                    {type:'TextArea',label:'奖项描述',prop:'description',placeholder:'请输入奖项描述',value:''},
                ]
            },
        }
    },
    created() {
        this.fetchList()
    },
    methods: {
        fetchList() {
            this.listLoading = true
            fetchAwardList().then(response => {
                this.list = response.data.data
                this.listLoading = false
            })
        },
        showAwardForm(){
            this.awardVisble.v = true
        },
        handleAwardForm(data){
            awardSave(data).then(res =>{
                if(res.code == 1){
                    this.awardVisble.v = false
                    notice(1,'奖项添加成功！',1)
                    this.fetchList()
                }else{
                    notice(1,'奖项添加成功！',1)
                }
            })
        },
        handleDelAward(row){
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteAward({id:row.id}).then(res => {
                    if(res.code == 1){
                        notice(1,'奖项删除成功！',1)
                        this.fetchList()
                    }else{
                        notice(0,'奖项删除失败！',0)
                    }
                })
                }).catch(() => {
            });
        },
        handleSelectionChange(selection){
            if(selection.length > 1){
                let del_row = selection.shift();
                this.$refs.multipleTable.toggleRowSelection(del_row, false);
            }
            if(selection.length != 0){
                this.selectedRow = selection[0].id
            }
        },
        editAwardForm(){
            if(this.selectedRow == ''){
                this.$message.error('请选择一项编辑！')
                return
            }
            let s = this.list.filter(item => item.id == this.selectedRow)
            this.formData.awardList[0].value = s[0].name
            this.formData.awardList[1].value = s[0].area
            this.formData.awardList[2].value = s[0].description

            this.awardVisble.v = true
        }
    }
}
</script>
<style scoped>
    .table{
        margin-top:20px;
    }
    
</style>