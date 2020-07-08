<template>
  <div>
    <!-- tabs -->
    <setting-tabs :active="'2'"></setting-tabs>
    <div class="company-console-wrap">
      789
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
