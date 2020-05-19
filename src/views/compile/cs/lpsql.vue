<template>
    <div class="compile-wrap">
        <el-row :gutter="10">
            <el-col :span="3">
                <el-button style="width:100%;" round plain icon="el-icon-document-add" :size="size" @click="addTable">新建</el-button>
            </el-col>
            <el-col :span="12">
                <el-alert
                    title="备注：多个产品时，可以创建多个表格"
                    type="info">
                </el-alert>
            </el-col>
        </el-row>
        <!-- 表格正文 -->
        <div class="mutiTable" v-for="(item,index) in formData" :key="index">
            <el-row :gutter="10" class="table-title">
                <el-col :span="6" align="center">
                    产品（服务）名称：
                </el-col>
                <el-col :span="8">
                    <el-input v-model="item.productName" :size="size" placeholder="请输入产品（服务）名称"></el-input>
                </el-col>
                <i class="el-icon-close" style="float:right;color:red;cursor:pointer;" @click="delTable(index)"></i>
                </el-row>
            <el-row class="table-content">
                <el-col :span="24">
                    <table class="dataintable">
                        <tbody>
                        <tr>
                            <th class="th">主要技术指标</th>
                            <th class="th">本企业（组织）水平</th>
                            <th class="th">国内先进水平</th>
                            <th class="th">国际先进水平</th>
                        </tr>
                        <tr v-for="(i,idx) in item.dataList" :key="idx">
                            <td>
                                <input type="text" v-model="i.mti" class="noborIpt">
                            </td>
                            <td>
                                <input type="text" v-model="i.lote" class="noborIpt">
                            </td>
                            <td>
                                <input type="text" v-model="i.dal" class="noborIpt">
                            </td>
                            <td>
                                <el-row :gutter="10">
                                    <el-col :span="18">
                                        <input type="text" v-model="i.ial" class="noborIpt">
                                    </el-col>
                                    <el-col :span="3" class="lh23"> 
                                        <i class="el-icon-delete pointer red" title="删除行" @click="delRow(index,idx)"></i>
                                    </el-col>
                                    <el-col :span="3" class="lh23"> 
                                        <i class="el-icon-document-add pointer green" title="新增行" v-if="idx == item.dataList.length - 1" @click="addRow(index)"></i>
                                    </el-col>
                                </el-row>
                            </td>
                        </tr>
                        <tr>
                            <td class="th">
                                产品质量情况
                            </td>
                            <td class="ipt32" v-for="(iqa,idx) in item.qa" :key="idx">
                                <el-row :gutter="10">
                                    <el-col :span="18">
                                        <input type="text" v-model="item.qa[idx]" placeholder="请输入年份" class="noborIpt">
                                    </el-col>
                                    <el-col :span="3" class="lh23">年</el-col>
                                </el-row>
                            </td>
                        </tr>
                        <tr>
                            <td class="th">
                                优等品率
                            </td>
                            <td class="ipt32" v-for="(i,idx) in item.premiumRate" :key="idx">
                                <input type="text" v-model="item.premiumRate[idx]" class="noborIpt">
                            </td>
                        </tr>
                        <tr>
                            <td class="th">
                                一等品率
                            </td>
                            <td class="ipt32" v-for="(i,idx) in item.firstClassRate" :key="idx">
                                <input type="text" v-model="item.firstClassRate[idx]" class="noborIpt">
                            </td>
                        </tr>
                        <tr>
                            <td class="th">
                                合格品率
                            </td>
                            <td class="ipt32" v-for="(i,idx) in item.qualifiedRate" :key="idx">
                                <input type="text" v-model="item.qualifiedRate[idx]" class="noborIpt">
                            </td>
                        </tr>
                        </tbody>   
                    </table>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            size:'small',
            formData:[
                
            ],
        }
    },
    methods:{
        addRow(index){
            let model = {mti:'',lote:'',dal:'',ial:''}
            this.formData[index].dataList.push(model)
        },
        delRow(index,rowIdx){
            this.formData[index].dataList.splice(rowIdx,1)
        },
        addTable(){
            let muban = {
                productName:'',
                dataList:[
                    {mti:'',lote:'',dal:'',ial:''}
                ],
                qa:['','',''],
                premiumRate:['','',''],
                firstClassRate:['','',''],
                qualifiedRate:['','',''],
            }
            this.formData.push(muban)
        },
        delTable(index){
            this.formData.splice(index,1)
        },
        submitData(){
            console.log(this.formData)
        }
    }
}
</script>
<style lang="less" scoped>
    .compile-wrap{
        padding: 0 15px;
        .mutiTable{
            margin-top: 25px;
            border: dashed 1px #ccc;
            padding:15px;
            .table-title{
                font-size: 14px;
                color: #666;
                line-height: 32px;
            }
            .dataintable{
                margin-top: 15px;
                border-collapse: collapse;
                border: 1px solid #ddd;
                width: 100%;
                .ipt32{
                    margin-top: 10px;
                }
                .lh23{
                    line-height: 23px;
                }
                .th{
                    vertical-align: baseline;
                    padding: 15px 10px;
                    background-color: #eee;
                    border-right: 1px solid #ddd;
                    text-align: center;
                    color: #666;
                    border-bottom: solid 1px #ddd;
                    font-size: 14px;
                    font-weight: 700;
                }
                td{
                    vertical-align: middle;
                    padding: 10px;
                    border: 1px solid #ddd;
                    text-align: center;
                    font-size: 14px;
                }
                .noborIpt{
                    height:100%;
                    width:100%;
                    border: none;
                    outline:none;
                }
                .pointer{
                    cursor: pointer;
                }
                .red{
                    color: rgb(241, 18, 18);
                }
                .green{
                    color: rgb(15, 150, 15);
                }
            }
        }
        
        
        // .mt25{
        //     margin-top: 25px;
        // }
    }
</style>