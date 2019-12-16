<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
        <el-container >
          <el-main width="1050px">Main</el-main>
          <el-aside width="150px">Aside</el-aside>
        </el-container>
      <el-footer>Footer</el-footer>
    </el-container>


    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    width: 150px;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
    display: flex;
    width: 1335px;
    margin: 0 auto;
  }
</style>