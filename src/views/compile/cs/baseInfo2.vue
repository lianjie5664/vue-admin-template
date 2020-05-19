<template>
    <div class="compile-wrap">
        <el-form ref="form" :model="formData" label-width="160px">
            <div class="section">
                <h3>一、联系方式：</h3>
                <div class="data-table">
                    <div class="data-row">
                        <div class="data-item">
                            <div class="label"> 联系部门</div>
                            <div class="value">
                            <input type="text" v-model="formData.department" class="noborIpt">
                            </div>
                        </div>
                        <div class="data-item">
                            <div class="label"> 联系人</div>
                            <div class="value">
                                <input type="text" v-model="formData.contacter" class="noborIpt">
                            </div>
                        </div>
                    </div>
                    <div class="data-row">
                        <div class="data-item">
                            <div class="label">通讯地址 </div>
                            <div class="value">
                            <input type="text" v-model="formData.address" class="noborIpt">
                            </div>
                        </div>
                    </div>
                    <div class="data-row">
                        <div class="data-item">
                            <div class="label"> 邮政编码</div>
                            <div class="value">
                            <input type="text" v-model="formData.zipcode" class="noborIpt">
                            </div>
                        </div>
                    </div>
                    <div class="data-row">
                        <div class="data-item">
                            <div class="label">电话</div>
                            <div class="value">
                                <input type="text" v-model="formData.phone" class="noborIpt">
                            </div>
                        </div>
                        <div class="data-item">
                            <div class="label">手机</div>
                            <div class="value">
                                <input type="text" v-model="formData.mobile" class="noborIpt">
                            </div>
                        </div>
                    </div>
                    <div class="data-row">
                        <div class="data-item">
                            <div class="label">传真</div>
                            <div class="value">
                                <input type="text" v-model="formData.fax" class="noborIpt">
                            </div>
                        </div>
                        <div class="data-item">
                            <div class="label">Email</div>
                            <div class="value">
                                <input type="text" v-model="formData.email" class="noborIpt">
                            </div>
                        </div>
                    </div>
                </div>
                <h3>二、企业（组织）获得管理体系认证情况：</h3>
                <el-row :gutter="10" v-for="(item,index) in formData.certification" :key="index">
                    <el-col :span="18">
                        <el-form-item :label="item.label">
                            <el-radio-group v-model="item.value">
                                <el-radio :label="opt.label" v-for="(opt,index) in item.options" :key="index">{{opt.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-date-picker style="width:100%;" v-model="formData.time" type="date" size="small" placeholder="认证时间"></el-date-picker>
                    </el-col>
                </el-row>
                <h3>三、企业（组织）获得质量荣誉情况：</h3>
                <el-row :gutter="18" class="mt15" v-for="(i,idx) in formData.getAward" :key="idx">
                    <el-col :span="8">
                        <el-row :gutter="10">
                            <el-col :span="6">
                                <div class="lh32">
                                    <el-checkbox v-model="formData.checked">{{i.label}}</el-checkbox>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="10">
                        <el-row :gutter="10">
                            <el-col :span="8">
                                <div class="time">获奖时间：</div>
                            </el-col>
                            <el-col :span="8">
                                <el-date-picker v-model="i.awardTime" type="date" size="small" placeholder="获奖时间"></el-date-picker>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            formData:{
                certification:[
                    {label:'质量管理体系',value:1, certime:"",options:[{label:1,name:'已建立体系，但未获认证'},{label:2,name:'已获认证',}]},
                    {label:'环境管理体系',value:2, certime:"",options:[{label:1,name:'已建立体系，但未获认证'},{label:2,name:'已获认证',}]},
                    {label:'职业健康安全管理体系',value:1, certime:"",options:[{label:1,name:'已建立体系，但未获认证'},{label:2,name:'已获认证',}]}
                ],
                getAward:[
                    {label:'全国质量奖',awardTime:""},
                    {label:'长沙市质量管理奖',awardTime:""},
                    {label:'市（地）政府质量奖',awardTime:""}
                ]
            }
        }
    }
}
</script>
<style lang="less">
    .compile-wrap{
        padding: 0 15px;
        .section{
            h3{
                font-size: 16px;
                margin-top:20px;
                color: #666;
            }
            .data-table{
                width: 100%;
                border-left: 1px solid #ccc;
                border-bottom: solid 1px #ccc;
                font-size: 14px;
                .data-row{
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    height: 45px;
                    .data-item{
                        width: 100%;
                        border: 1px solid #ccc;
                        border-bottom: none;
                        border-left: none;
                        line-height: 45px;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        .label{
                            border-right: 1px solid #ccc;
                            width: 110px;
                            text-align: center;
                            color: #333;
                            background: #eee;
                            min-width: 100px;
                        }
                        .value{
                            width: 100%;
                            padding: 0 10px;
                            text-align: center;
                            color: #666;
                        }
                        .noborIpt{
                            height:100%;
                            width:100%;
                            border: none;
                            outline:none;
                        }
                    }
                }
            }
        }
        .time{
            font-size: 14px;
            color: #666;
            line-height: 32px;
        }
        .lh32{
            line-height: 32px;
        }
        .ml60{
            margin-left: 60px;
        }
        .mt15{
            margin-top: 15px;
        }
        .tips{
            padding:20px;
            margin-left:50px;
            p{
                font-size: 14px;
                color: #999;
                line-height: 25px;
            }
        }
    }
</style>