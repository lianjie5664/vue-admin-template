<template>
    <div class="app-container">
        <el-row>
            <el-button type="primary" icon="el-icon-plus" plain @click="showAwardForm" size="small" v-hasPermi="['lib:list:add']">新增</el-button>
            <el-button type="info" icon="el-icon-edit" plain @click="editAwardForm" size="small" v-hasPermi="['lib:list:edit']">编辑</el-button>
        </el-row>
        <div class="table">
            <div v-for="(item,index) in allRow" :key="index" :class="{'award-item':true,'addclass':isactive == index}"  @click="select(index,item.id)">
                <p class="title">{{item.name}}</p>
                <p class="desc">{{item.description}}</p>
                <div class="options">
                    <el-button type="primary" size="small" plain v-hasPermi="['btn:lib:config']">
                        <router-link :to="'enter/'+ item.id">配置奖项</router-link>
                    </el-button>
                    <el-button type="danger" size="small" plain v-hasPermi="['lib:list:delete']">
                        <a href="javascript:" @click="handleDelAward(item)">删除</a>
                    </el-button>
                </div>
            </div>
        </div>
        <award-form
            :show.sync="awardVisble"
            :indexData="selectRow"
            :types="formSelect"
            @close="awardVisble = false"
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
            listLoading: false,
            awardVisble:false,
            selectRow:{},
            activeRow:{},
            allRow:[],
            formSelect:0,
            isactive:0,
        }
    },
    created() {
        this.fetchList()
    },
    methods: {
        select(idx){
            this.isactive = idx
            this.selectRow = this.allRow[idx]
            this.activeRow = this.allRow[idx]
        },
        fetchList() {
            this.listLoading = true
            fetchAwardList().then(response => {
                let { data } = response.data
                this.listLoading = false
                this.selectRow = data[0]
                this.activeRow = data[0]
                this.allRow = data
            })
        },
        showAwardForm(){
            this.formSelect = 0
            this.selectRow = {}
            this.awardVisble = true
        },
        handleAwardForm(data){
            awardSave(data).then(res =>{
                if(res.code == 1){
                    this.awardVisble = false
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
                this.selectedIndex = selection[0].id
            }
        },
        editAwardForm(){
            this.formSelect = 1
            this.selectRow = this.activeRow
            this.awardVisble = true
        }
    }
}
</script>
<style lang="less" scoped>
    .table{
        margin-top:20px;
        .award-item{
            width: 22%;
            margin-bottom: 25px;
            margin-right:20px;
            padding: 0 20px 20px 20px ;
            border: solid 1px #f1f1f1;   
            float: left;
            border-radius:8px;
            // box-shadow: 5px 20px 30px rgba(0,0,0,.1);
            box-shadow: 0 2px 10px 0 rgba(70,130,242,.2);
            .title{
                width: 100%;
                font-size: 22px;
                // color: #000;
                font-weight: 440;
                margin-bottom: 14px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis
            }
            .desc{
                margin-top: 2%;
                margin-bottom: 0;
                opacity: .5;
                font-size: 16px;
                // color: #6a7b8c;
                max-height: 30px;
            }
            .options{
                width: 100%;
                margin-top: 15px;
                display: flex;
            }
            
        }
        .addclass{
            // border: solid 1px #273EB0;
            color: #fff;
            text-decoration: none;
            background-color: #5ebcff;
            background-image: linear-gradient(52deg,#5ebcff,#3ba1ff 40%,#005dcc);

        }
    }
</style>