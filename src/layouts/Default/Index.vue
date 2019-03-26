<template>
  <section class="app-main">
    <mt-header title="fixed top"></mt-header>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"/>
    </transition>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="tab1">
        <img slot="icon" src="@/assets/images/background.png">
        tab1
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <img slot="icon" src="@/assets/images/background.png">
        tab2
      </mt-tab-item>
      <mt-tab-item id="tab3">
        <img slot="icon" src="@/assets/images/background.png">
        tab3
      </mt-tab-item>
      <mt-tab-item id="tab4">
        <img slot="icon" src="@/assets/images/background.png">
        tab4
      </mt-tab-item>
    </mt-tabbar>
  </section>
</template>

<script>
  export default {
    name: 'Layout',
    components: {},
    data () {
      return {
        selected: ''
      }
    },
    mixins: [],
    computed: {
      key () {
        return this.$route.fullPath
      }
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
