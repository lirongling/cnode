<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: {
    modal1: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  components: {},
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      if (localStorage.getItem("user")) {
        this.$store.state.loginMsg = JSON.parse(localStorage.getItem("user"));
      }
      if (localStorage.getItem("author1")) {
        this.$store.state.userMsg = JSON.parse(
          localStorage.getItem("author1")
        );
      }
      if (localStorage.getItem("author")) {
        this.$store.state.authorMsg = JSON.parse(localStorage.getItem("author"));
      }
    }
  },
  // mounted() {
  //   // 登录信息传给vuex
  //    this.getdata();
  // },
  watch: {},
  computed: {}
};
</script>
<style lang="scss">
@import "styles/common";

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
</style>
