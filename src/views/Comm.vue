<template>
  <div class="comm">

    <BackTop :height="100" :bottom="200">
      <div class="top111">返回顶端</div>
    </BackTop>
    <el-container>
      <!-- 头部导航 -->
      <el-header class="header">
        <div class="top flex">
          <div class="top-left">
            <span>
              <img
                src="//static2.cnodejs.org/public/images/cnodejs_light.svg"
                height="28"
                @click="jump"
              />
            </span>
            <span>
              <el-input
                class="search"
                @mouseenter="mouse(1)"
                @mouseleave="mouse(-1)"
                @focus="mouse(2)"
                @blur="mouse(-2)"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="input"
              ></el-input>
            </span>
          </div>
          <div class="top-right">
            <ul class="flex">
              <li @click="jump">首页</li>
              <li>新手入门</li>
              <li>API</li>
              <li>关于</li>
              <li @click="login('register')">注册</li>
              <li @click="login('login')">登录</li>
            </ul>
          </div>
        </div>
      </el-header>
      <el-container class="element__">
        <!-- 主题内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 侧边栏 -->
        <el-aside width="150px">
          <div class="aside-login">
            <div v-if="this.$route.path==='/'">
              <div v-if="!this.$store.state.loginMsg">
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
                  <span v-if="this.$store.state.loginMsg.phone">{{this.$store.state.loginMsg.phone}}</span>
                </div>
              </div>
            </div>
            <div v-if="this.$route.path==='/details/'">
              <div class="portrait">
                <img :src="this.$store.state.userMsg.avatar_url" width="35" />
                <span>{{this.$store.state.userMsg.loginname}}</span>
              </div>
              <div v-if="this.$store.state.authorMsg" class="flex recent_topics">
                <span>积分:{{this.$store.state.autorMsg.score}}</span>
                <span>发帖数:{{this.$store.state.autorMsg.recent_topics}}</span>
                <span>回帖数:{{this.$store.state.autorMsg.recent_replies}}</span>
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
      </el-container>
      <!-- 底部导航 -->
      <el-footer class="flex">
        <div class="footer-content">
          <div class="rss">
            <span>RSS</span>|
            <span>源码地址</span>
          </div>
          <div class="footer-title">CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</div>
          <div class="footer-img">
            服务器赞助商为
            <img src="//static.cnodejs.org/FuIpEaM9bvsZKnQ3QfPtBHWQmLM9" />
            ，存储赞助商为
            <img
              src="//static.cnodejs.org/Fg0jtDIcTqVC049oVu5-sn6Om4NX"
              height="43"
            />
            ，由
            <img src="//static.cnodejs.org/FpMZk31PDyxkC8yStmMQL4XroaGD" />提供应用性能服务。
          </div>
          <div>
            新手搭建 Node.js 服务器，推荐使用无需备案的
            <a
              href="https://www.digitalocean.com/?refcode=eba02656eeb3"
            >DigitalOcean(https://www.digitalocean.com/)</a>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Login from "../components/Login";
export default {
  data() {
    return {
      input: "",
      num: 0,
      modal1: false,
      footerhide: true,
      logintype: "",
      author: null,
      author1: null,
      loginname1:null,
    };
  },
  components: {
    Login
  },
  methods: {
    send(val) {
      this.modal1 = val;
    },
    login(index) {
      this.logintype = index;
      if (this.loginMsg === undefined) {
        this.modal1 = true;
      }
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    jump() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
    mouse(index) {
      this.num += index;
      console.log(this.num);
    },
    getData() {
      if (this.$route.path === "/details/") {
        this.$axios
          .req(`user/${this.$store.state.userMsg.loginname}`)
          .then(res => {
            this.author1 = null;
            if (res.success) {
              this.author1 = res.data;
              console.log(this.author1);
              let a= {
                score: this.author1.score,
                recent_topics: this.author1.recent_topics.length,
                recent_replies: this.author1.recent_replies.length
              };
              this.$store.state.autorMsg =a
              localStorage.setItem("autor", JSON.stringify(a));
            }
            // let a = `v2/pois/${res.latitude},${res.longitude}`;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
     this.loginname1 =this.$store.state.userMsg.loginname
    this.author = JSON.parse(sessionStorage.getItem("author"));
    this.getData();
    console.log(this.$store.state.userMsg);
     console.log(this.$store.state.userMsg);
  },
  watch: {
    
  },
  computed: {
    loginMsg() {
      return this.$store.state.loginMsg;
    }
  }
};
</script>

<style scoped lang='scss'>
.top111 {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
.recent_topics {
  padding-top: 20px !important;
  justify-content: space-around;
}
.portrait {
  width: 80%;
  margin: 0 auto !important;
  line-height: 32px;
  display: flex;
  padding-top: 10px !important;
}
.portrait > span {
  margin-left: 10px;
}
.modal {
  height: 600px !important;
}
.comm {
  background: #e1e1e1;
}
.el-header {
  background: #444444 !important;
}
.el-header,
.el-footer {
  line-height: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  * {
    margin: 0;
    padding: 0;
  }
  ol,
  ul {
    list-style: none;
  }
}
.el-footer {
  padding: 0;
  height: 230px !important;
  background: #ffffff;
  border: #d3dce6 1px solid;
  .footer-content {
    width: 1367px;
    margin: 0 auto;
    height: 190px;

    .rss {
      font-size: 13px;
      color: #666;
      .rss > sapn:nth-child(1) {
        color: #666;
      }
    }
    .footer-title {
      line-height: 20px;
      font-size: 14px;
      color: #ababab;
    }
    a {
      text-decoration: none;
      color: #08c;
    }
  }
}

.el-aside {
  * {
    margin: 0;
    padding: 0;
  }
  width: 270px !important;
  .aside-login {
    border-radius: 5px;
    height: 115px;
    background: white;
    .aside-title {
      width: 95%;
      margin: 0 auto;
      padding: 15px 0;
      font-size: 14px;
      // word-break: break-word;
    }
    .aside-input {
      font-size: 13px;
      width: 95%;
      margin: 0 auto;
      .aside-input > span:nth-child(1) {
        color: #778087;
      }
      .aside-input > span:nth-child(2) {
        color: #778087;
      }
    }
    .to-input {
      width: 90%;
      margin: 10px auto;
    }
    .to-input > span {
      display: block;
      color: #fff;
      background-color: #5bc0de;
      line-height: 30px;
      font-size: 14px;
      width: 75px;
      height: 30px;
      text-align: center;
      border-radius: 6px;
    }
  }
  .aside-img {
    border-radius: 5px;
    margin-top: 20px;
    height: 235px;
    background: white;
  }
  .aside-img > img {
    height: 65px !important;
  }
  .cooperation {
    padding-left: 20px;
    background: white;
    margin-top: 20px;
    border-radius: 5px;
    .cooperation-top {
      height: 40px;
      line-height: 40px;
      font-size: 13px;
      color: #444444;
    }
    .cooperation-text {
      text-align: center;
      font-size: 13px;
      padding: 10px 0;
      color: #ababab;
    }
  }
  .code {
    padding-left: 20px;
    background: white;
    margin-top: 20px;
    border-radius: 5px;
  }
}
.el-main {
  color: #333;
  text-align: center;
  width: 1062px !important;
  height: auto !important;
  line-height: 160px;
  padding: 0;
  margin: 0;
  * {
    margin: 0;
    padding: 0;
  }
}

body > .el-container {
  margin-bottom: 40px;
  display: flex;
  width: 1367px;
  margin: 0 auto;
}
.li {
  background: #5bc0de !important;
}
.top {
  width: 1367px;
  margin: 0 auto;
  height: 40px;
  .top-left {
    width: 500px;
    height: 100%;

    justify-content: flex-start;
    .search {
      width: 223px;
      height: 26px !important;
    }
  }
  .top-left > span:nth-child(1) {
    cursor: pointer;
  }
  .top-left > span:nth-child(2) {
    display: block;
    width: 223px;
    height: 26px !important;
    margin-left: 140px;
    margin-top: -43px !important;
  }
  .top-right {
    width: 355px;
    height: 100%;
  }
  .top-right > ul {
    width: 100%;
    height: 100%;
    color: #cccccc;
    font-size: 13px;

    justify-content: space-between;
  }
  .top-right > ul > li {
    padding: 0 10px;
  }
  .top-right > ul > li:hover {
    color: #fdfbfb;
    cursor: pointer;
  }
}
</style>