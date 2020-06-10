<template>
    <div class="app-container">
        <el-row>
            <el-button type="primary" icon="el-icon-plus" plain @click="showAwardForm" size="small" v-hasPermi="['lib:list:add']">新增</el-button>
            <el-button type="info" icon="el-icon-edit" plain @click="editAwardForm" size="small" v-hasPermi="['lib:list:edit']">编辑</el-button>
        </el-row>
        <div class="table">
            <div v-for="(item,index) in list" :key="index" :class="{'award-item':true,'addclass':isactive == index}"  @click="select(index,item.id)">
                <p class="title">{{item.name}}</p>
                <p class="desc">{{item.description}}</p>
                <div class="options">
                    <el-button type="primary" size="small" v-hasPermi="['btn:lib:config']">
                        <router-link :to="'enter/'+ item.id">配置奖项</router-link>
                    </el-button>
                    <el-button type="danger" size="small" v-hasPermi="['lib:list:delete']">
                        <a href="javascript:" @click="handleDelAward(item)">删除</a>
                    </el-button>
                </div>
            </div>
        </div>
        <award-form
            :awardFormVisble="awardVisble"
            :formData="formData"
            :selected="formSelect"
            @close="awardVisble.v = false"
            @submit="handleAwardForm">
        </award-form>   
    </div>
</template>
<script>
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
            selectedRow:'',
            formSelect:0,
            isactive:0,
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
        select(idx,id){
            this.isactive = idx
            this.selectedRow = id
        },
        fetchList() {
            this.listLoading = true
            fetchAwardList().then(response => {
                this.list = response.data.data
                this.listLoading = false
                this.selectedRow = this.list[0].id
            })
        },
        showAwardForm(){
            this.formSelect = 0
            this.formData.awardList.map((v)=>{
                v.value = ''
            })
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
            this.formSelect = 1
            let s = this.list.filter(item => item.id == this.selectedRow)
            this.formData.awardList[0].value = s[0].name
            this.formData.awardList[1].value = s[0].area
            this.formData.awardList[2].value = s[0].description

            this.awardVisble.v = true
        }
    }
}
</script>
<style lang="less" scoped>
    .table{
        margin-top:20px;
        // display: flex;
        // flex-wrap: wrap;
        // justify-content: space-between;
        // box-shadow: -5px 0 15px rgba(0,0,0,.1);
        .award-item{
            width: 22%;
            margin: 10px;
            padding: 0 20px 20px 20px ;
            border: solid 1px #f1f1f1;   
            float: left;
            // box-shadow:0 0 10px rgba(0,0,0,.2);
            box-shadow: 5px 20px 30px rgba(0,0,0,.1);
            // background: linear-gradient(130deg,#aa6aff,#706dff);
            .title{
                width: 100%;
                font-size: 22px;
                color: #000;
                font-weight: 440;
                margin-bottom: 14px;
            }
            .desc{
                margin-top: 2%;
                margin-bottom: 0;
                opacity: .5;
                font-size: 16px;
                color: #6a7b8c;
                max-height: 30px;
            }
            .options{
                width: 100%;
                margin-top: 15px;
                display: flex;
            }
            
        }
        .addclass{
            border: solid 1px #273EB0;
        }
    }
</style>