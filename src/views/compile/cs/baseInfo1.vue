<template>
    <div class="compile-wrap">
        <el-form ref="form" :model="formData" label-width="150px">
            <el-row>
                <el-col :span="22" class="mr15">
                    <el-form-item label="企业（组织）名称" prop="v1">
                        <el-input v-model="formData.v1" :size="size" placeholder="企业（组织）名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="注册地址" prop="v2">
                        <el-input v-model="formData.v2" :size="size" placeholder="企业（组织）名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="邮编" prop="passWord">
                        <el-input v-model="formData.passWord" :size="size" placeholder="请输入登录密码" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="法定代表人" prop="passWordRepeat">
                        <el-input v-model="formData.passWordRepeat" :size="size" placeholder="请输入再次输入登录密码" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="电话" prop="passWord">
                        <el-input v-model="formData.passWord" :size="size" placeholder="请输入登录密码" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="最高管理者" prop="passWordRepeat">
                        <el-input v-model="formData.passWordRepeat" :size="size" placeholder="请输入再次输入登录密码" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="电话" prop="passWord">
                        <el-input v-model="formData.passWord" :size="size" placeholder="请输入登录密码" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22" class="block-item">
                    <el-form-item label="质量管理机构名称" prop="passWordRepeat">
                        <el-input v-model="formData.passWordRepeat" :size="size" placeholder="请输入再次输入登录密码" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人" prop="passWordRepeat">
                        <el-input v-model="formData.passWordRepeat" :size="size" placeholder="请输入再次输入登录密码" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="passWordRepeat">
                        <el-input v-model="formData.passWordRepeat" :size="size" placeholder="请输入再次输入登录密码" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="传真" prop="passWordRepeat">
                        <el-input v-model="formData.passWordRepeat" :size="size" placeholder="请输入再次输入登录密码" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="成立日期" prop="passWord">
                         <el-date-picker
                            v-model="formData.date"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="工商注册号" prop="passWord">
                        <el-input v-model="formData.passWord" :size="size" placeholder="请输入登录密码" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="组织机构代码" prop="passWord">
                        <el-input v-model="formData.passWord" :size="size" placeholder="请输入登录密码" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="经济类型" prop="passWord">
                        <el-input v-model="formData.passWord" :size="size" placeholder="请输入登录密码" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="所属行业" prop="passWord">
                        <el-input v-model="formData.passWord" :size="size" placeholder="请输入登录密码" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-form-item label="企业规模" prop="passWord">
                        <el-radio-group v-model="formData.radio">
                            <el-radio :label="1">大型</el-radio>
                            <el-radio :label="2">中型</el-radio>
                            <el-radio :label="3">小型</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="职工总数" prop="passWord">
                                <el-input v-model="formData.passWord" :size="size" placeholder="职工总数" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="职工总数" prop="passWord">
                                <el-input v-model="formData.passWord" :size="size" placeholder="职工总数" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> 
                </el-col>
                <el-col :span="22">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="质量管理人数" prop="passWord">
                                <el-input v-model="formData.passWord" :size="size" placeholder="质量管理人数" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="技术人员数" prop="passWord">
                                <el-input v-model="formData.passWord" :size="size" placeholder="技术人员数" autocomplete="off"></el-input>
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
    </div>
</template>
<script>
export default {
    data(){
        return {
            formData:{
                radio:3
            },
            size:'small'
        }
    }
}
</script>
<style lang="less">
    .compile-wrap{
        padding: 0 15px;
        .block-item{
            background:#eee;
            padding:20px 20px 0 0;
            margin-bottom: 15px;
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