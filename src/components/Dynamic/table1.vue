<template>
    <div class="table-wrapper">
        <el-form :model="tableData" ref="table1" label-width="100px">    
            <el-row
            :gutter="12"
            style="margin-top:20px;">
                <el-col :span="item.span" v-for="(item,index) in tableData.itemList" :key="index">
                    <el-form-item
                        :label="item.label"
                        :prop="'itemList.'+index +'.value'"
                        :rules="item.rules"
                        class="el-form-item-module">
                        <el-input v-model="item.value" :placeholder="item.label"></el-input>
                    </el-form-item>  
                </el-col>
                <el-col :span="24" style="text-align:center;">
                    <el-button type="primary" @click="addOne('table1')">新增一条</el-button>
                </el-col>
            </el-row>
        </el-form>
        <div class="data-view">
             <el-table
            :data="tableData.tableData"
            style="width: 100%">
            <el-table-column v-for="(item,index) in tableData.itemList" :key="index"
                :prop="item.prop"
                :label="item.label">
            </el-table-column>
            </el-table>
        </div>
    </div>    
</template>

<script>
export default {
    data(){
        return {
            // tableDataList:this.tableData,
            oneData:{},
            pushData:[]
        }
    },
    props:{
        tableData:Object,
        addData:Array
    },
    methods:{
        addOne(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    // debugger
                    let obj = {}
                    this.tableData.itemList.map((v) => {
                        obj[v.prop] = v.value
                    })
                    this.oneData = obj
                    this.tableData.itemList.map((v) => {
                        v.value = ""
                    })
                    this.$emit('dataFor',this.oneData)
                }
            })
        }
    },
    created(){
        console.log(24,this.tableDataList)
        // this.addData = this.tableData.tableData
    }
}
</script>

<style>
    .data-view{
        margin-top: 20px;
    }
</style>