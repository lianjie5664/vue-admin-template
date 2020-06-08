<template>
    <div class="baseInfo3-wrap">
        <el-form ref="formData" :model="formData" label-width="180px">
            <el-row>
                <el-col :span="22">
                    <el-form-item label="主要产品（服务）名称" prop="v1">
                        <el-input v-model="formData.v1" type="textarea" :size="size" placeholder="请输入主要产品（服务）名称"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <h3>一、产品（服务）获得质量荣誉情况</h3>
            <!-- 省部级以上科技进步 -->
            <el-row class="section">
                <el-col :span="24">
                    <el-row :gutter="15">
                        <el-col :span="6" class="item">
                            <el-checkbox v-model="formData.honor[0].chk.value">{{formData.honor[0].chk.label}}</el-checkbox>
                        </el-col>
                        <el-col :span="8" class="item" align="center">
                            <el-radio-group v-model="formData.honor[0].v1">
                                <el-radio :label="i.label" v-for="(i,idx) in formData.honor[0].options" :key="idx">{{i.name}}</el-radio>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="4" class="item">
                            <el-input v-model="formData.honor[0].ipt1" :size="size" placeholder="请输入整数"></el-input>
                        </el-col>
                        <el-col :span="2" class="item">等奖</el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="4" class="item">
                            获奖产品名称：
                        </el-col>
                        <el-col :span="6" class="item">
                            <el-input v-model="formData.honor[0].ipt2" :size="size" placeholder="请输入获奖产品名称"></el-input>
                        </el-col>
                        <el-col :span="3" class="item">
                            获奖时间：
                        </el-col>
                        <el-col :span="5" class="item">
                            <el-date-picker v-model="formData.honor[0].ipt3" :size="size" type="date" placeholder="请选择获奖时间"></el-date-picker>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <!-- 国家级重点新产品 -->
            <el-row class="section">
                <el-col :span="24">
                    <el-row :gutter="15">
                        <el-col :span="6" class="item">
                            <el-checkbox v-model="formData.honor[1].chk.value">{{formData.honor[1].chk.label}}</el-checkbox>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="4" class="item">
                            认定产品名称：
                        </el-col>
                        <el-col :span="6" class="item">
                            <el-input v-model="formData.honor[1].ipt1" :size="size" placeholder="请输入认定产品名称"></el-input>
                        </el-col>
                        <el-col :span="3" class="item">
                            认定时间：
                        </el-col>
                        <el-col :span="5" class="item">
                            <el-date-picker v-model="formData.honor[1].ipt2" :size="size" type="date" placeholder="请选择认定时间"></el-date-picker>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <!-- 省级以上高新技术产品 -->
            <el-row class="section">
                <el-col :span="24">
                    <el-row :gutter="15">
                        <el-col :span="6" class="item">
                            <el-checkbox v-model="formData.honor[2].chk.value">{{formData.honor[2].chk.label}}</el-checkbox>
                        </el-col>
                        <el-col :span="8" class="item" align="center">
                            <el-radio-group v-model="formData.honor[2].v1">
                                <el-radio :label="i.label" v-for="(i,idx) in formData.honor[2].options" :key="idx">{{i.name}}</el-radio>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="4" align="right" class="item">
                            认定产品名称：
                        </el-col>
                        <el-col :span="6" class="item">
                            <el-input v-model="formData.honor[2].ipt1" :size="size" placeholder=""></el-input>
                        </el-col>
                        <el-col :span="3" class="item" align="right">
                            认定时间：
                        </el-col>
                        <el-col :span="5" class="item">
                            <el-date-picker v-model="formData.honor[2].ipt2" :size="size" type="date" placeholder="请选择认定时间"></el-date-picker>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <!-- 省级以上品牌荣誉 -->
            <el-row class="section">
                <el-col :span="24">
                    <el-row :gutter="15">
                        <el-col :span="6" class="item">
                            <el-checkbox v-model="formData.honor[3].chk.value">{{formData.honor[3].chk.label}}</el-checkbox>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="24" class="item">
                            <el-radio-group v-model="formData.honor[3].v1">
                                <el-radio :label="i.label" v-for="(i,idx) in formData.honor[3].options" :key="idx">{{i.name}}</el-radio>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="6" class="item" align="center">
                            获得产品或商标名称：
                        </el-col>
                        <el-col :span="6" class="item">
                            <el-input v-model="formData.honor[3].ipt1" :size="size" placeholder="请输入产品或商标名称"></el-input>
                        </el-col>
                        <el-col :span="3" class="item" align="center">
                            获得时间：
                        </el-col>
                        <el-col :span="5" class="item">
                            <el-date-picker v-model="formData.honor[3].ipt2" :size="size" type="date" placeholder="请选择获得时间"></el-date-picker>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <!-- 省级以上工程质量奖 -->
            <el-row class="section">
                <el-col :span="24">
                    <el-row :gutter="15">
                        <el-col :span="6" class="item">
                            <el-checkbox v-model="formData.honor[4].chk.value">{{formData.honor[4].chk.label}}</el-checkbox>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" align="right" class="item">
                            获奖工程名称：
                        </el-col>
                        <el-col :span="6" class="item">
                            <el-input v-model="formData.honor[4].ipt1" :size="size" placeholder="请输入获奖工程名称"></el-input>
                        </el-col>
                        <el-col :span="3" class="item" align="right">
                            获得时间：
                        </el-col>
                        <el-col :span="5" class="item">
                            <el-date-picker v-model="formData.honor[4].ipt2" :size="size" type="date" placeholder="请选择认定时间"></el-date-picker>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <h3 class="mt45">二、产品获得质量认证和生产（制造）许可证情况</h3>
            <el-row class="section" v-for="(i,idx) in formData.honor[5].multiline" :key="idx">
                <el-col :span="24">
                    <el-checkbox v-model="i.chk.value">{{i.chk.label}}</el-checkbox>
                </el-col>
                <el-col :span="7" class="item">
                    <el-form-item label-width="100px" :label="i.ipt1.label">
                        <el-input v-model="i.ipt1.value" :size="size" placeholder="请输入认证名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9" class="item">
                    <el-form-item label-width="120px" :label="i.ipt2.label">
                        <el-input v-model="i.ipt2.value" :size="size" placeholder="请输入获证产品名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="item">
                    <el-form-item label-width="100px" :label="i.ipt3.label">
                        <el-date-picker style="width:100%;" v-model="i.ipt3.value" :size="size" type="date" placeholder="请输入获证时间"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
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
    name:'baseInfo3',
    data(){
        return {
            size:'small',
            formData:{
                v1:'',
                honor:[
                    {options:[{label:1,name:'国家级'},{label:2,name:'省部级'}],chk:{label:'省级以上工程质量奖',value:true},v1:2,ipt1:'',ipt2:'',ipt3:''},
                    {chk:{label:'省级以上高新技术产品',value:true},ipt1:'',ipt2:''},
                    {ipt1:'',ipt2:'',options:[{label:1,name:'国家级'},{label:2,name:'省部级'}],chk:{label:'省级以上高新技术产品',value:0}},
                    {ipt1:'',ipt2:'',options:[{label:1,name:'中国名牌'},{label:2,name:'湖南名片'},{label:3,name:'驰名商标'},{label:4,name:'著明商标'}],chk:{label:'省级以上品牌荣誉',value:false}},
                    {ipt1:'',ipt2:'',chk:{label:'省级以上工程质量奖',value:0}},
                    {multiline:[
                        {ipt1:{label:'认证名称：',value:''},ipt2:{label:'获证产品名称：',value:''},ipt3:{label:'获证时间：',value:''},chk:{label:"强制性认证",value:true}},
                        {ipt1:{label:'认证名称：',value:''},ipt2:{label:'获证产品名称：',value:''},ipt3:{label:'获证时间：',value:''},chk:{label:'生产（制造）许可证',value:false}},
                        {ipt1:{label:'认证名称：',value:''},ipt2:{label:'获证产品名称：',value:''},ipt3:{label:'获证时间：',value:''},chk:{label:'其他（证书名称）',value:false}},
                    ]},
                    
                ]
            }
        }
    },
    props:['id','awardId','cid'],
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
            getReptCompileDetail({standardId:this.id,createUserId:this.cid}).then((res) =>{
                if(res.code == 1){
                    this.formData = Object.assign({},this.formData,res.data.description)
                }
            })
        }
    },
    created(){
        this.getDetail()
    }
}
</script>
