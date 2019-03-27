<template>
  <section class="app-main">
    <mt-header title="fixed top"></mt-header>
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key"/>
      </keep-alive>
    </transition>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="tab1">
        <svg-icon slot="icon" icon-class="shopping" class-name="card-panel-icon"/>
        <router-link to="/dashboard">tab1</router-link>
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <img slot="icon" src="@/assets/images/background.png">
        tab2
      </mt-tab-item>
      <mt-tab-item id="tab3">
        <img slot="icon" src="@/assets/images/background.png">
        tab3
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
  .svg-icon {
    font-size: 24px;
    color: #26a2ff;
  }
</style>
