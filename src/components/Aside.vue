<template>
 <div>
    <el-aside width="150px">
          <div class="aside-login">
            <div v-if="this.$route.path==='/'">
              <div v-if="!loginMsg">
                <div class="aside-title">CNode：Node.js专业中文社区</div>
                <div class="aside-input">
                  你可以
                  <span>登录</span>或
                  <span>注册</span>
                </div>
                <div class="to-input">
                  <span @click="login('login')">立即登录</span>

                  <Modal width="300" height="800" v-model="modal1" :footer-hide="footerhide">
                    <login @send="send" :logintype="logintype"></login>
                  </Modal>
                </div>
              </div>
              <div v-else>
                <div class="aside-title">欢迎来到CNode</div>
                <div class="portrait">
                  <img src="../assets/头像 男孩.svg" />
                  <!-- <span v-if='loginMsg.phone'>{{loginMsg.phone}}</span> -->
                </div>
              </div>
            </div>
            <div v-if="this.$route.path==='/details/'&&author!==null">
              <div class="portrait">
                <img :src="author.avatar_url" width="35" />
                <span>{{author.loginname}}</span>
              </div>
              <div v-if="author1" class="flex recent_topics">
                <span>积分:{{author1.score}}</span>
                <span>发帖数:{{author1.recent_topics.length}}</span>
                <span>回帖数:{{author1.recent_replies.length}}</span>
              </div>
            </div>
          </div>
          <div class="aside-img flex">
            <img src="//static.cnodejs.org/Fn4D6BhOTz1IswvmzeZ1q7QW1ls_" />
            <img src="//static.cnodejs.org/FlajCCXkxZaOsuWp3k0iaiqfrJaS" />
            <img src="//static.cnodejs.org/FufeQ8S-sz6aKH5bvPXzVXvQG2Z-" />
          </div>
          <div class="cooperation">
            <div class="cooperation-top">友情社会</div>
            <img src="//static2.cnodejs.org/public/images/ruby-china-20150529.png" height="49" />
            <img src="//static2.cnodejs.org/public/images/golangtc-logo.png" height="49" />
            <img src="//static2.cnodejs.org/public/images/phphub-logo.png" height="49" />
            <img src="//static.cnodejs.org/FjLUc7IJ2--DqS706etPQ1EGajxK" height="49" />
          </div>
          <div class="cooperation">
            <div class="cooperation-top">客户端二维码</div>
            <div class="flex">
              <img src="//static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU" height="200" />
            </div>
            <div class="cooperation-text">客户端源码地址</div>
          </div>
        </el-aside>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   },
   methods: {

   },
   mounted() {

   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>