<template>
  <div>
    <!-- tabs -->
    <setting-tabs :active="'0'"></setting-tabs>
    <div class="company-console-wrap">
      123
    </div>
  </div>
</template>

<script>
import SettingTabs from "./component/tab";
import "./console.less";
export default {
  data() {
    return {};
  },
  components: {
    SettingTabs
  }
};
</script>

