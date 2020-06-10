<template lang="html">
  <div class="app-container static-box">
    <div v-if="roleId === 'cdd0e82032ec4aec82fc6f0494a83ff1'"><!-- cdd0e82032ec4aec82fc6f0494a83ff1 企业 -->
      <company-page />
    </div>
    <div v-if="roleId === '2cc247944de3468aab59f58a2b8aa0f4'"><!-- 2cc247944de3468aab59f58a2b8aa0f4 政府 -->
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
