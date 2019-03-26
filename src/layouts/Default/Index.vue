<template>
  <section class="app-main">
    <mt-header title="fixed top"></mt-header>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="tab1">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key"/>
        </transition>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab2">
        <mt-cell v-for="n in 4" :title="'测试 ' + n" :key="n"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab3">
        <mt-cell v-for="n in 6" :title="'选项 ' + n" :key="n"/>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="tab1">
        <svg-icon slot="icon" icon-class="shopping" class-name="card-panel-icon"/>
        <a href="/signIn">tab1</a>
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
  .svg-icon {
    font-size: 24px;
    color: #26a2ff;
  }
</style>
