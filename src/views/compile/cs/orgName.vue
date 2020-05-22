<template>
    <div class="baseInfo1-wrap">
        <el-form ref="form" :model="formData" label-width="150px">
            <el-row>
                <el-col :span="22" class="mr15">
                    <el-form-item label="企业（组织）名称" prop="name">
                        <el-input v-model="formData.name" :size="size" placeholder="请输入企业（组织）名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="注册地址" prop="address">
                        <el-input v-model="formData.address" :size="size" placeholder="请输入注册地址"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="邮编" prop="zipcode">
                        <el-input v-model="formData.zipcode" :size="size" placeholder="请输入邮编" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="法定代表人" prop="fddb">
                        <el-input v-model="formData.fddb" :size="size" placeholder="请输入法定代表人" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="电话" prop="phone">
                        <el-input v-model="formData.phone" :size="size" placeholder="请输入电话" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="最高管理者" prop="manager">
                        <el-input v-model="formData.manager" :size="size" placeholder="请输入最高管理者" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="电话" prop="mobile">
                        <el-input v-model="formData.mobile" :size="size" placeholder="请输入电话" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="质量管理机构名称" prop="zlgljg">
                        <el-input v-model="formData.zlgljg" :size="size" placeholder="请输入质量管理机构名称" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人" prop="fzr">
                        <el-input v-model="formData.fzr" :size="size" placeholder="请输入负责人" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="dh">
                        <el-input v-model="formData.dh" :size="size" placeholder="请输入电话" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="传真" prop="fax">
                        <el-input v-model="formData.fax" :size="size" placeholder="请输入传真" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="成立日期" prop="cdate">
                         <el-date-picker
                            v-model="formData.cdate"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="工商注册号" prop="gszc">
                        <el-input v-model="formData.gszc" :size="size" placeholder="请输入工商注册号" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="组织机构代码" prop="zzjg">
                        <el-input v-model="formData.zzjg" :size="size" placeholder="请输入组织机构代码" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="经济类型" prop="jjlx">
                        <el-input v-model="formData.jjlx" :size="size" placeholder="请输入经济类型" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="所属行业" prop="industy">
                        <el-input v-model="formData.industy" :size="size" placeholder="请输入所属行业" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="企业规模" prop="guimo">
                        <el-radio-group v-model="formData.guimo">
                            <el-radio :label="1">大型</el-radio>
                            <el-radio :label="2">中型</el-radio>
                            <el-radio :label="3">小型</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="职工总数" prop="zgzs">
                                <el-input v-model="formData.zgzs" :size="size" placeholder="职工总数" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="管理人员数" prop="glrys">
                                <el-input v-model="formData.glrys" :size="size" placeholder="管理人员数" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> 
                </el-col>
                <el-col :span="22">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="质量管理人数" prop="zlglrs">
                                <el-input v-model="formData.zlglrs" :size="size" placeholder="质量管理人数" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="技术人员数" prop="jsrys">
                                <el-input v-model="formData.jsrys" :size="size" placeholder="技术人员数" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> 
                </el-col>
            </el-row>
        </el-form>
        <div class="tips">
            <p>注：1、经济类型指国有、有限责任、股份、集体、联营、私营、港澳台资、外商投资企业等。详见国家统计局2001年颁发的《关于划分企业登记注册类型的规定》。</p>
            <p>2、企业规模划分详见国家统计局2003年颁发的国经贸中小企〔2003〕143号《大中小型企业划分暂行标准》。</p>
            <p>3、企业所属行业详见国家统计局行业分类标准。</p>
        </div>
        <div class="" style="height:80px;"></div>
        <div class="submit-box">
            <el-button type="primary">提交保存</el-button>
        </div>
    </div>
</template>
<script>
import './cs.less'
export default {
    data(){
        return {
            id:'',
            formData:{
                
            },
            size:'small'
        }
    },
    methods:{
        
    },
    created(){
        
    }
}
</script>
