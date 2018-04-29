<template lang="html">
    <div>
        <nav-bar></nav-bar>
        <router-view class="router-view"></router-view>
        <foot-bar></foot-bar>
        <play-bar></play-bar>
    </div>
</template>


<script>
  import Vue from 'vue'
  import 'components/nav-bar.vue'
  import 'components/play-bar.vue'
  import 'components/foot-bar.vue'

  let component = {
    data() {
      return {};
    },
    mounted() {
    },
    methods: {

    }
  };

//  Vue.component('app', component)

  export default component
</script>

<style lang="scss" type="text/scss">
    .router-view {
        padding-top: 70px;
    }
</style>