<template>
    <div class="baseInfo2-wrap">
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
                <el-row :gutter="10" v-for="(item,idss) in formData.certification" :key="idss+'1'">
                    <el-col :span="12">
                        <el-form-item :label="item.name">
                            <el-radio-group v-model="item.value">
                                <el-radio :label="opt.label" v-for="(opt,i) in item.options" :key="i">{{opt.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="认证时间">
                            <el-date-picker  v-model="item.certime" type="date" size="small" placeholder="认证时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h3>三、企业（组织）获得质量荣誉情况：</h3>
                <el-row :gutter="18" class="mt15" v-for="(i,idx) in formData.getAward" :key="idx">
                    <el-col :span="8">
                        <el-row :gutter="10" v-if="idx == 3">
                            <el-col :span="20">
                                <el-form-item :label="i.name+'：'" label-width="130px">
                                    <el-input v-model="i.value" size="small" placeholder="其他奖项"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10" v-else>
                            <el-col :span="6">
                                <el-form-item label="" label-width="80px">
                                    <el-checkbox v-model="i.checked">{{i.name}}</el-checkbox>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="10">
                        <el-row :gutter="10">
                            <el-col :span="8">
                                <el-form-item label="获奖时间：">
                                    <el-date-picker v-model="i.awardTime" type="date" size="small" placeholder="获奖时间"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </el-form>
        <div style="height:80px;"></div>
        <div class="submit-box">
            <el-button type="primary" @click="handleSubmit">提交保存</el-button>
        </div>
    </div>
</template>
<script>
import './cs.less'
import {savaQaRept,getReptCompileDetail} from '@/api/award' 
import {notice} from '@/utils/tools'
export default {
    data(){
        return {
            formData:{
                certification:[
                    {name:'质量管理体系',value:1, certime:"",options:[{label:1,name:'已建立体系，但未获认证'},{label:2,name:'已获认证',}]},
                    {name:'环境管理体系',value:2, certime:"",options:[{label:1,name:'已建立体系，但未获认证'},{label:2,name:'已获认证',}]},
                    {name:'职业健康安全管理体系',value:1, certime:"",options:[{label:1,name:'已建立体系，但未获认证'},{label:2,name:'已获认证',}]}
                ],
                getAward:[
                    {name:'全国质量奖',awardTime:"",checked:0},
                    {name:'长沙市质量管理奖',awardTime:"",checked:0},
                    {name:'市（地）政府质量奖',awardTime:"",checked:0},
                    {name:'其他',awardTime:"",value:''}
                ]
            }
        }
    },
    props:['id','awardId'],
    methods:{
        handleSubmit(){
            let data = {
                awardId:this.awardId,
                standardId:this.id,
                description:this.formData
            }
            savaQaRept(data).then( res => {
                if(res.code == 1){
                    notice(1,'保存成功！',1)
                }else{
                    notice(0,'保存失败，请重试！',0)
                }
            })
        },
        getDetail(){
            getReptCompileDetail({standardId:this.id}).then((res) =>{
                if(res.code == 1){
                    this.formData = Object.assign({},this.formData,JSON.parse(res.data.description))
                    console.log(this.formData)
                }
            })
        }
    },
    created(){
        this.getDetail()
    }
}
</script>
