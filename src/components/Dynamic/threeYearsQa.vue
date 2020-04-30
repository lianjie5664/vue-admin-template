<template>
    <div class="thdQawrap" style="height:calc(100vh - 250px);">
        <div class="thdQaBox" v-if="tableData.tableData.length == 0">
            <table border="1" class="thdQaTable" cellspacing="0" height="100%">
                <tr>
                    <td>时间</td><!--rowspan="2"纵向合并两个单元格-->
                    <td v-for="(child,i) in tableData.itemList[0].data" :key="i">
                        <el-date-picker v-if="child.type='dateTime'"
                            v-model="child.time"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </td>
                </tr>
                <tr v-for="(item,index) in tableData.itemList.slice(1)" :key="index">
                    <td width="200">{{item.label}}</td><!--rowspan="2"纵向合并两个单元格-->
                    <td v-for="(child,idx) in item.data" :key="idx">
                        <el-radio-group v-model="child.value" v-if="item.type =='radio'">
                            <el-radio :label="0">无</el-radio>
                            <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                    </td>
                    <td colspan='5' v-if="item.type=='textarea'">
                        <el-input type="textarea" v-model="item.prop"  :placeholder="item.label"></el-input>
                    </td>
                </tr>
            </table>
        </div>
        <div class="thdQaBox" v-else>
            <table border="1" class="thdQaTable" cellspacing="0" height="100%">
                <tr>
                    <td>时间</td><!--rowspan="2"纵向合并两个单元格-->
                    <td v-for="(child,i) in tableData.tableData[0].data" :key="i">
                        <el-date-picker v-if="child.type='dateTime'"
                            v-model="child.time"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </td>
                </tr>
                <tr v-for="(item,index) in tableData.tableData.slice(1)" :key="index">
                    <td width="200">{{item.label}}</td><!--rowspan="2"纵向合并两个单元格-->
                    <td v-for="(child,idx) in item.data" :key="idx">
                        <el-radio-group v-model="child.value" v-if="item.type =='radio'">
                            <el-radio :label="0">无</el-radio>
                            <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                    </td>
                    <td colspan='5' v-if="item.type=='textarea'">
                        <el-input type="textarea" v-model="item.prop"  :placeholder="item.label"></el-input>
                    </td>
                </tr>
            </table>
        </div>
        <div style="position:absolute;bottom:0;right:10px;">
            <el-button type="primary" @click="saveDataEvent">提交保存</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
  
        }
    },
    props:{
        tableData:Object,
        arrData:Object    
    },
    methods:{
        saveDataEvent(){
            this.$emit('saveData',this.tableData.tableData)
        }
    },
    created(){
    }
}
</script>

<style lang="less" scoped>
    .thdQawrap{
        width: 800px;
        height: 100%;
        position: relative;
        .thdQaBox{
            overflow: auto;
            .thdQaTable{
                width: 800px;
                border: solid 1px #ccc;
                tr > th,td {
                    padding:10px;
                    border:1px solid #ddd;
                }
                tr>td:first-child{
                    min-width: 120px;
                    font-size: 14px;
                }
                .el-date-editor.el-input{
                    width: 150px !important;
                }
            }
        }
        
   }
</style>