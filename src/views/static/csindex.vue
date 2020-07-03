<template lang="html">
  <div class="app-container static-box">
    <!-- <div v-if="roleEnname === 'user'">
      <company-page />
    </div> -->
    <div>
      <government-page />
    </div>
  </div>
</template>

<script>
  import './styles/index.scss'
  import companyPage from './compage'
  import governmentPage from './govpage'

  export default {
    data () {
      return {
      }
    },
    computed: {
      roleId () {
        return this.$store.getters.roleId
      }
    },
    components: {companyPage, governmentPage}
  }
</script>
