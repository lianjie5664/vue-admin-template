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
                <el-table-column align="center" label="编号" width="95">
                    <template slot-scope="scope">
                    {{ scope.$index +1 }}
                    </template>
                </el-table-column>
                <el-table-column label="奖项类型">
                    <template slot-scope="scope">
                        {{ scope.row.awardName }}
                    </template>
                </el-table-column>
                <el-table-column label="分数">
                    <template slot-scope="scope">
                        {{scope.row.gradeTotal}}
                    </template>
                </el-table-column>
                 <el-table-column label="编制人">
                    <template slot-scope="scope">
                    {{ scope.row.createUserName }}
                    </template>
                </el-table-column>
                <el-table-column label="编制时间">
                    <template slot-scope="scope">
                    {{ scope.row.createDate }}
                    </template>
                </el-table-column>
                <el-table-column label="评审时间">
                    <template slot-scope="scope">
                    {{ scope.row.gradeDate }}
                    </template>
                </el-table-column>
                
                 <el-table-column label="操作" width="230" class-name="small-padding fixed-width">
                    <template slot-scope="{row}">
                        <el-button type="primary" size="mini">
                            <router-link :to="{path:'/review/professor',query:{awardId:row.awardId,reportUserId:row.createUserId,gradeUserId:row.gradeUserId}}">评审</router-link>
                        </el-button>
                        <!-- <el-button size="mini" type="success" @click="handleDelAward(row)">
                            评审结果
                        </el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pageStyle"
                :page-size="pageSize"
                layout="total,prev, pager, next"
                @current-change="current_change"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { reportList } from '@/api/award'
import {notice} from '@/utils/tools'
export default {
    data(){
        return {
            pageSize:10,
            total:0,
            currentPage:1,
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
        this.fetchList(this.currentPage,this.pageSize)
    },
    methods: {
        fetchList(currentPage,pageSize) {
            this.listLoading = true
            reportList({pageNo:currentPage,pageSize:pageSize}).then(response => {
                this.list = response.data.data
                this.listLoading = false
                this.total = response.data.count
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
        current_change(currentPage){
            this.fetchList(currentPage,this.pageSize);
        }
    }
}
</script>
<style scoped>
    .table{
        margin-top:20px;
    }
    .pageStyle{
        margin-top:20px;
        float: right;
    }
    
</style>