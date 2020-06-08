<template>
    <div class="userAddForm">
        <el-dialog :title="modalType == 0?'用户录入':'用户编辑'" width="700px" :visible.sync="visible" @close="$emit('update:show', false)" :close-on-click-modal="false">
            <el-form ref="userForm" :model="userForm" :rules="rules">
                <el-row
                :gutter="12"
                style="margin-top:20px;">
                <el-col :span="12">
                    <el-form-item label="登录账号" prop="loginName">
                        <el-input v-model="userForm.loginName" size="small" placeholder="请输入登录账号" :disabled="modalType == 1" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="用户名称" prop="name">
                        <el-input v-model="userForm.name" size="small" placeholder="请输入用户名称" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-if="modalType == 0">
                    <el-form-item label="密码" prop="passWord">
                        <el-input type="password" v-model="userForm.passWord" size="small" placeholder="请输入用户名称" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-if="modalType == 0">
                    <el-form-item label="确认密码" prop="passWordRepeat">
                        <el-input type="password" v-model="userForm.passWordRepeat" size="small" placeholder="请输入用户名称" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="用户角色" prop="roleId">
                    <el-select v-model="userForm.roleId" size="small" style="width:100%;" placeholder="请选择用户角色">
                        <el-option
                        v-for="item in rolearr"
                        :key="item.value"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="用户类型" prop="userType">
                        <el-select v-model="userForm.userType" size="small" value-key="id" style="width:100%;" placeholder="请选择用户类型">
                            <el-option
                                v-for="item in userType"
                                :key="item.id"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="userForm.mobile" size="small" placeholder="请输入手机号码" autocomplete="off"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="办公电话" prop="phone">
                        <el-input v-model="userForm.phone" size="small" placeholder="请输入办公电话" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input v-model="userForm.email" size="small" placeholder="请输入电子邮箱" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="常用地址" prop="address">
                        <el-input v-model="userForm.address" size="small" placeholder="请输入常用地址" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属行业" prop="industry">
                        <el-select v-model="userForm.industry" size="small" value-key="id" style="width:100%;" placeholder="请选择所属行业">
                            <el-option
                                v-for="item in industry"
                                :key="item.id"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="show = false">取 消</el-button>
                <el-button type="primary" v-if="!modalType" size="small" @click="submitForm('userForm')">确 定</el-button>
                <el-button type="primary" v-else size="small" @click="modifyUser('userForm')">修 改</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.userForm.passWord) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        var validateEmail = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请正确填写邮箱'));
            } else {
                if (value !== '') { 
                    var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    if(!reg.test(value)){
                    callback(new Error('请输入有效的邮箱'));
                    }
                }
                callback();
            }
        };
        return {
            // modalVisible : this.visiabled,
            visible: this.show,
            userType:[
                {id:1,value: '101080001',label: '管理员' },
                {id:2,value: '101080002',label: '政府人员' },
                {id:3,value: '101080003',label: '专家' },
                {id:4,value: '101080004',label: '企业用户' }
            ],
            userForm:{
                loginName:'',
                name:'',
                roleId:'',
                userType:'',
                mobile:'',
                phone:'',
                email:'',
                address:'',
                passWord:'',
                industry:''
            },
            rules: {
                loginName: [
                    { required: true, message: '请输入登录账号', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' }
                ],
                passWordRepeat: [
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ],
                roleId: [
                    { required: true, message: '请选择用户角色', trigger: 'change' }
                ],
                userType: [
                    { required: true, message: '请选择用户类型', trigger: 'change' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
                ],
                phone: [
                    { required: true, message: '请输入办公电话', trigger: 'blur' }
                ],
                email: [
                    { required: true,validator:validateEmail, trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入常用地址', trigger: 'blur' }
                ],
                industry: [
                    { required: true, message: '请选择所属行业', trigger: 'change' }
                ],
            }
        }
    },
    props:{
        show: {
            type: Boolean,
            default: false
        },
        rolearr:{
            type:Array,
            default:[]
        },
        modalType:{
            type:Number,
            default:0
        },
        userModel:{
            type:Object,
        },
        industry:{
            type:Array,
            default:[]
        }
    },
    methods:{
       submitForm(formName){
        this.$refs[formName].validate((valid) => {
            if(valid){
                this.$emit('userAdd',this.userForm)
            }
        })
       },
       modifyUser(formName){
            this.$refs[formName].validate((valid) => {
            if(valid){
                this.$emit('userModify',this.userForm)
            }
        })
       }
    },
    watch: {
        show () {
            this.visible = this.show;
            this.userForm = this.userModel
        }
    }
}
</script>
<style lang="less" scoped>
    .userAddForm{

    }
    
</style>