<template>
  <div class="setting-tab-wrap">
    <div class="tab-wrap">
      <div class="tab-box">
        <div
          class="tab-item"
          v-for="(item,index) in routers"
          :key="index"
          :class="{'active': index == active}"
        >
          <router-link :to="{path:item.path}">{{item.name}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routers: [
        { id:0,path: "/setting/profile", name: "个人资料" },
        { id:1,path: "/setting/security", name: "安全中心" },
        { id:2,path: "/setting/orgInfo", name: "组织信息" }
      ]
    }
  },
  props:{
      active:{
          type: String,
          default: ''
      }
  }
};
</script>

<style lang="less" scoped>
.setting-tab-wrap {
  .tab-wrap {
    width: 100%;
    background: #fff;
    box-shadow: 0 0 10px #ccc;
    height: 60px;
    .tab-box {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      .tab-item {
        // width:80px;
        line-height: 58px;
        margin: 0 45px;
        text-align: center;
        a{
            display:block;
        }
      }
      .active {
        color: #273eb0;
        border-bottom: solid 2px #273eb0;
      }
    }
  }
}
</style>