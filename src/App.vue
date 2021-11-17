<template>
  <div id="app" class="app shadow">
    <router-view/>
  </div>
</template>

<script>
export default {
    data() {
      return {
        isPc: true,
      };
    },
    components: {
     /*  HeaderBar,
      BottomBar */
    },
    async created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="less">
  @import "assets/css/base.less";
  body, div, dl, dt, dd, ul, ol, li, p, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea {
    font-family: poppins,inter,PingFangSC-Regular,microsoft yahei,sans-serif !important;
  }
  .app {
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    position: relative;
    @media screen and (min-width: 1200px) {
      width: 450px;
      height: 780px;
      margin: 0 auto;
    }
  }
  @media screen and (max-width: 1200px) {
    html, body {
      height: 100%;
    }
  }

</style>
