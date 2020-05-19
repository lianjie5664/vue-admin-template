<template>
    <div class="compile-wrap">
        <el-row :gutter="10">
            <el-col :span="3">
                <el-button style="width:100%;" round plain icon="el-icon-document-add" :size="size">新建</el-button>
            </el-col>
            <el-col :span="10">
                <el-alert
                    title="备注：多个产品时，可以创建多个表格"
                    type="info">
                </el-alert>
            </el-col>
        </el-row>
        <!-- 表格正文 -->
        <div class="mutiTable">
            <el-row :gutter="10" class="table-title">
                <el-col :span="5">
                    产品（服务）名称：
                </el-col>
                <el-col :span="8">
                    <el-input v-model="formData[0].name" :size="size" placeholder="请输入产品（服务）名称"></el-input>
                </el-col>
            </el-row>
            <el-row class="table-content">
                <el-col :span="24">
                    <table class="dataintable">
                        <tbody>
                        <tr>
                            <th>主要技术指标</th>
                            <th>本企业（组织）水平</th>
                            <th>国内先进水平</th>
                            <th>国际先进水平</th>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" class="noborIpt">
                            </td>
                            <td>
                                 <input type="text" class="noborIpt">
                            </td>
                            <td>
                                 <input type="text" class="noborIpt">
                            </td>
                            <td>
                                 <input type="text" class="noborIpt">
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
                {
                    name:'xxx'
                }
            ]
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
                th{
                    vertical-align: baseline;
                    padding: 15px 10px;
                    background-color: #eee;
                    border-right: 1px solid #ddd;
                    text-align: center;
                    color: #666;
                    font-weight: normal;
                    border-bottom: solid 1px #ddd;
                }
                td{
                    vertical-align: text-top;
                    padding: 10px;
                    border: 1px solid #ddd;
                    text-align: center;
                }
                .noborIpt{
                    height:100%;
                    width:100%;
                    border: none;
                    outline:none;
                }
            }
        }
        
        
        // .mt25{
        //     margin-top: 25px;
        // }
    }
</style>