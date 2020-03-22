<template>
    <div class="app-container">
        <el-row>
            <el-button type="primary" icon="el-icon-plus" plain @click="showAwardForm">新增</el-button>
            <el-button type="info" icon="el-icon-edit" plain>编辑</el-button>
        </el-row>
        <div class="table">
            <el-table
                v-loading="listLoading"
                :data="list"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
                >
                <el-table-column align="center" label="编号" width="95" header-align="center">
                    <template slot-scope="scope">
                    {{ scope.$index }}
                    </template>
                </el-table-column>
                <el-table-column label="奖项名称" header-align="center">
                    <template slot-scope="scope">
                    {{ scope.row.name }}
                    </template>
                </el-table-column>
                <el-table-column label="地区" align="center" header-align="center">
                    <template slot-scope="scope">
                    <span>{{ scope.row.area }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="描述" align="center" header-align="center">
                    <template slot-scope="scope">
                    {{ scope.row.description }}
                    </template>
                </el-table-column>
                 <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                    <template slot-scope="{row}">
                        <el-button type="primary" size="mini">
                            <router-link :to="'enter/'+ row.id">配置奖项</router-link>
                        </el-button>
                        <el-button size="mini" type="danger" @click="handleDelAward(row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <award-form
            :awardFormVisble="awardVisble"
            :formData="formData"
            @close="awardVisble.v = false"
            @submit="handleAwardForm">
        </award-form>   
    </div>
</template>
<script>
import { getList } from '@/api/table'
import { awardSave,fetchAwardList,deleteAward } from '@/api/award'
import {statusFilter} from '@/utils/filter'
import AwardForm from './components/awardForm'
import {notice} from '@/utils/tools'
export default {
    components:{AwardForm},
    data(){
        return {
            list: null,
            listLoading: false,
            awardVisble:{v:false},
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
            
        }
    }
}
</script>
<style scoped>
    .table{
        margin-top:20px;
    }
</style>