<template lang="html">
  <div class="register-content">
    <div class="logo-img">
      <a href="/">
        <img :src="logoImg" alt="">
      </a>
    </div>
    <div class="register-box">
      <div class="title">企业账号注册</div>
      <div class="box-contain">
        <el-form ref="registerForm" :model="formParams" :rules="rules" size="small">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item prop="phone">
                <el-input v-model="formParams.phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="code" class="get-code">
                  <el-input v-model="formParams.code" placeholder="请输入验证码" style="width:68%"></el-input>
                  <el-button @click.native.prevent="getCode" class="code-btn" style="width:30%" :disabled="!show">
                    <span v-show="show">获取验证码</span>
                    <span v-show="!show" class="count">{{count}} s</span>
                  </el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item prop="password">
                <el-input type="password" v-model="formParams.password" placeholder="请输入密码" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="checkPass">
                <el-input type="password" v-model="formParams.checkPass" placeholder="请确认密码" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col>
              <el-form-item prop="name">
                <el-input v-model="formParams.name" placeholder="请输入企业名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item prop="industry">
                <el-select v-model="formParams.industry" placeholder="请选择行业">
                  <el-option v-for="(item, index) in industies" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="organizationCode">
                <el-input v-model="formParams.organizationCode" placeholder="请输入组织机构代码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item prop="linkman">
                <el-input v-model="formParams.linkman" placeholder="请输入联系人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="email">
                <el-input v-model="formParams.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col>
              <div class="mb15">
                <v-Distpicker :placeholders="distholders" @selected="onSelected"></v-Distpicker>
                <el-form-item>
                  <el-input placeholder="详细地址" class="mt15" v-model="formParams.detailAddress"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item prop="remarks">
                <el-input type="textarea" v-model="formParams.remarks" placeholder="请输入简介内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item class="register-btn tocenter">
                <el-button :loading="loading" type="primary" @click.native.prevent="toRegister">立即注册</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import './register.scss'
import {industies} from '@/utils/industry'
import VDistpicker from 'v-distpicker'
import { register, sendcode } from '@/api/user'
export default {
  components: { VDistpicker },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formParams.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formParams.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      distholders: {
        province: '湖南省',
        city: '长沙市',
        area: '请选择区域'
      },
      loading: false,
      logoImg: require('@/assets/imgs/logo.png'),
      timer:null,
      count:0,
      show:true,
      formParams: {
        name: '',
        password: '',
        checkPass: '',
        code: '',
        organizationCode: '',
        industry: '',
        address: '',
        linkman: '',
        phone: '',
        email: '',
        remarks: ''
      },
      industies: industies,
      rules: {
        name: [{ required: true, message:'企业名称不能为空'}],
        password: [{ required: true, message:'密码不能为空', validator: validatePass}],
        checkPass: [{ required: true, validator: validatePass2}],
        code: [{ required: true, message:'验证码不能为空'}],
        organizationCode: [{ required: true, message:'组织机构代码不能为空'}],
        industry: [{ required: true, message:'行业不能为空'}],
        address: [{ required: true, message:'地址不能为空'}],
        linkman: [{ required: true, message:'联系人不能为空'}],
        phone: [{ required: true, message:'手机号不能为空'}],
        email: [{ required: true, message:'邮箱不能为空'}],
        remarks: [{ required: true, message:'简介不能为空'}]
      }
    }
  },
  methods: {
    onSelected (val) {
      if (val && this.formParams.detailAddress) {
        this.formParams.address = val.province.value + val.city.value + val.area.value + this.formParams.detailAddress
      }
    },
    getCode () {
      if (this.formParams.phone) {
        const params = {
          phone: this.formParams.phone,
          type: '101020001'
        }
        if (!this.timer) {
          this.count = 60;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= 60) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        sendcode(params).then(res => {
          console.log('res++++', res)
          if (+res.code === 1) {
            this.$message.success('获取成功！')
            // this.formParams.code = res.smsCd
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$message.error('手机号不能为空！！')
      }
    },
    toRegister () {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          register(this.formParams).then(res => {
            if (+res.code === 1) {
              this.loading = false
              this.$message({
                type: 'success',
                message: '注册成功！请等待审核。。。',
                onClose: () => {
                  this.$router.push({ path: '/' })
                }
              })
            } else {
              this.loading = false
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
