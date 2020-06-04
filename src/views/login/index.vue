<template>
  <div class="login-container">
    <div class="login-box-container">
      <div class="login-title">
        <h2>企业成熟度智能评价系统</h2>
      </div>
      <div class="login-box">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="手机号或邮箱"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>

            <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleLogin">立即登录</el-button>
          </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur',message:'用户名不能为空'}],
        password: [{ required: true, trigger: 'blur',message:'密码不能为空'}]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  background-position: 50%;
  position: relative;
  background: url(../../assets/imgs/login-bg.png);
  background-size: 100% 100%;  
	background-size: cover;
  .login-box-container{
    width: 500px;
    position: absolute;
    right: 160px;
    top: 50%;
    -webkit-transform: translateY(-60%);
    transform: translateY(-60%);
    .login-title{
      h2{
        font-size: 32px;
        font-weight: 400;
        text-align: center;
        // padding-bottom: 40px;
        color:#283443;
        letter-spacing: 4px;
      }
    }
    .login-box{
      width: 400px;
      // height: 340px;
      background: #fff url(../../assets/imgs/login-box-bg.png) no-repeat top;
      background-size:100%;
      box-shadow: 0 0 10px 2px rgba(30,13,4,.15);
      border-radius: 12px;
      margin:0 auto;
    }
    .login-btn{
      width:100%;
      margin-bottom:30px;
      background:#273EB0;
      border: solid 1px #273EB0;
      height: 45px;
      &:hover{
        background: rgb(57, 80, 197);
      }
    }
  }
 
  .el-input {
    display: inline-block;
    height: 42px;
    width: 85%;

    input {
      background: #fff;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 8px 5px 8px 15px;
      color: $light_gray;
      height: 42px;
      color: #333;
    }
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px white inset;	/**通过边框阴影遮挡住背景*/
      -webkit-text-fill-color: #333;
    }
  }

  .el-form-item {
    border: 1px solid #d4d3d3;
    border-radius: 4px 4px 0 0;
    border-radius: 5px;
    color: #454545;
    .el-form-item__content{
      line-height: 35px;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#fff;
$dark_gray:#889aa4;
$light_gray:#fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
