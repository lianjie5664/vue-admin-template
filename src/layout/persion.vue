<template>
  <div class="app-wrapper">
    <div class="persion-container">
      <div :class="{'fixed-header':fixedHeader}">
        <div class="navbar">
        <div class="left-logo">
            <h2>企业成熟度智能评价系统 - 用户中心</h2>
        </div>
          <div class="right-menu">
            <el-dropdown class="avatar-container" trigger="click">
              <div class="avatar-wrapper">
                <img :src="avatar" class="user-avatar" />
                <span class="userName">{{name}}</span>
                <i class="el-icon-arrow-down" />
              </div>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <el-dropdown-item>
                  <router-link :to="{path:'/setting/profile'}">个人中心</router-link>
                </el-dropdown-item>
                <!-- <el-dropdown-item divided>
                    <router-link :to="{path:'/console/company'}">控制台</router-link>
                </el-dropdown-item>-->
                <el-dropdown-item divided @click.native="logout">
                  <span style="display:block;">退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Navbar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  components: {
    Navbar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    ...mapGetters(["sidebar", "avatar", "name"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=dashboard`);
    }
  },
  mounted() {
      console.log(this.$router)
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  .persion-container {
      background:#f0f2f5;
    .navbar {
      height: 70px;
      overflow: hidden;
      position: relative;
      background: #7e92f5;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      background: linear-gradient(to right, #445ede, #ca728e 99%);
      .left-logo{
          float:left;
          color: #fff;
          padding-left:20px;
          h2{
            font-size: 18px;
            font-weight: normal;
            line-height:40px;
          }
      }
      .right-menu {
        float: right;
        height: 100%;
        line-height: 70px;

        &:focus {
          outline: none;
        }

        .right-menu-item {
          display: inline-block;
          padding: 0 8px;
          height: 100%;
          font-size: 18px;
          vertical-align: text-bottom;

          &.hover-effect {
            cursor: pointer;
            transition: background 0.3s;

            &:hover {
              background: rgba(0, 0, 0, 0.025);
            }
          }
        }

        .avatar-container {
          margin-right: 30px;
          .avatar-wrapper {
            margin-top: 5px;
            position: relative;
            color:#fff !important;

            .user-avatar {
              cursor: pointer;
              width: 25px;
              height: 25px;
              border-radius: 50%;
              position: absolute;
              top: 21px;
              left: -36px;
            }

            .el-icon-caret-bottom {
              cursor: pointer;
              position: absolute;
              right: -20px;
              top: 20px;
              font-size: 12px;
            }
          }
          .user-dropdown {
            top: 46px;
          }
        }
      }
    }
  }
}

</style>
