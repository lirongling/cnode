<template>
  <div v-if="detailsData.author" class="details">
    <div class="top">
      <div class="title flex">
        <div class="tab0 flex">
          <span class="tab" v-if="detailsData.top">置顶</span>
          <span class="tab" v-else-if="(detailsData.tab==='share')">分享</span>
          <span class="tab" v-else-if="(detailsData.tab==='ask')">问答</span>
        </div>
        <div class="titkeName">{{detailsData.title}}</div>
      </div>
      <div class="producter" v-if="detailsData.author.loginname">
        <ul class="flex">
          <li>发布于:{{distanceTime(detailsData.create_at)}}</li>
          <li>作者:{{detailsData.author.loginname}}</li>
          <li>{{detailsData.visit_count}}次浏览</li>
          <li>
            来自
            <span class="tab" v-if="(detailsData.tab==='share')">分享</span>
            <span class="tab" v-else-if="(detailsData.tab==='ask')">问答</span>
          </li>
        </ul>
      </div>

      <div v-html="detailsData.content" class="conten markdown-body"></div>
    </div>
    <div class="comment">
      <div class="comment-mount">{{detailsData.reply_count}}回复</div>
      <div class="replies" v-for="(item,index) in arr[Number(currentPage4-1)]" :key="index">
        <div class="replies-title flex">
          <div>
            <img :src="item.author.avatar_url" width="30" />
            <a :href="item.author.avatar_url">{{item.author.loginname}}</a>
            <span>{{index+1}}楼</span>
            <span>{{distanceTime(item.create_at)}}</span>
          </div>

          <div class="dz">
            <img src="../assets/点赞.svg" />
          </div>
        </div>
        <div class="replies-text">
          <div v-html="item.content"></div>
        </div>
        <!-- <div class="split"></div> -->
      </div>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="value"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="detailsData.replies.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage4: 1,
      id: "",
      detailsData: [],
      pageSize: 10,
      arr: [],
      pageNumber: 0,
      value: false,
      author1:null
    };
  },
  components: {},
  methods: {
    paging() {
      this.arr = [];
      for (let i = 0; i < this.detailsData.replies.length; i += this.pageSize) {
        this.arr.push(this.detailsData.replies.slice(i, i + this.pageSize));
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.paging();
      console.log(this.arr);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage4 = Number(val);
    },
    distanceTime(oldTime) {
      let newTime = new Date();
        //  let time2 = this.$dayjs(newTime).format('YYYY-MM-DD hh:mm:ss')
      // valueOf是转换成时间戳
      let sputTme =
        this.$dayjs(newTime).valueOf() - this.$dayjs(oldTime).valueOf();
      let mounth = sputTme / (30 * 24 * 60 * 60 * 1000);
      let time = sputTme / (24 * 60 * 60 * 1000);
      let hour = sputTme / (60 * 60 * 1000);
      let minu = sputTme / (60 * 1000);
      if (mounth > 1) {
        return parseInt(mounth + 1) + "个月前";
      } else if (mounth < 1 && time >= 1) {
        return parseInt(time) + "天前";
      } else if (time < 1 && hour >= 1) {
        return parseInt(hour) + "小时前";
      } else if (hour < 1) {
        return parseInt(minu) + "分钟前";
      }
    },
    getData() {
      this.$axios
        .req(`topic/${this.id}`)
        .then(res => {
          if (res.success) {
            this.detailsData = res.data;
            this.$store.state.userMsg=this.detailsData.author
            localStorage.setItem(
              "author1",
              JSON.stringify(this.detailsData.author)
            );
            
            this.paging();
          }

          // let a = `v2/pois/${res.latitude},${res.longitude}`;
        })
        .catch(err => {
          console.log(err);
        });

        
    },
    //  getData1() {
    //   if (this.$route.path === "/details/") {
    //     this.$axios
    //       .req(`user/${this.$store.state.userMsg.loginname}`)
    //       .then(res => {
    //         this.author1 = null;
    //         if (res.success) {
    //           this.author1 = res.data;
    //           console.log(this.author1);
    //           let a= {
    //             score: this.author1.score,
    //             recent_topics: this.author1.recent_topics.length,
    //             recent_replies: this.author1.recent_replies.length
    //           };
    //           this.$store.state.autorMsg =a
    //           localStorage.setItem("autor", JSON.stringify(a));
    //         }
    //         // let a = `v2/pois/${res.latitude},${res.longitude}`;
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   }
    // }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getData();
    // this.getData1();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
@import "//at.alicdn.com/t/font_1567345_n2abse5hpn.css";
.details {
  /deep/img {
    max-width: 100% !important;
  }
}
.top {
  background: #ffffff;
  height: auto;
  padding-bottom: 20px;
}
.zw {
}
.title {
  margin: 0 10px;
  justify-content: flex-start;
  .tab0 {
    width: 32px;
    height: 18px;
    margin-left: 8px;
    font-size: 12px;
    color: #999999;
  }
  .tab {
    width: 32px;
    height: 18px;
    line-height: 18px;
    background: #80bd01;
    text-align: center;
    border-radius: 5px;
    color: #fff;
  }
  .titkeName {
    font-size: 22px;
    font-weight: 700;
    margin: 8px;
    display: inline-block;
    vertical-align: bottom;
    line-height: 130%;
  }
}
.producter {
  margin-top: -10px;
  font-size: 12px;
  color: #838383;
  margin-left: 20px;
}
.producter > ul {
  justify-content: flex-start;
}
.producter > ul li {
  list-style: disc;
  margin-right: 20px;
  .producter > ul > li:nth-child(1) {
    text-decoration: none;
  }
}

.spilt {
  width: 100%;
  height: 1px;
  background: lightgray;
}

.conten {
  margin: 15px;
}
.comment {
  width: 100%;
  background: #ffffff;
  margin-top: 20px;

  .comment-mount {
    color: #444;

    padding: 10px;
    font-size: 14px;
  }
  .replies {
    margin: 10px 0;
    border-bottom: silver 1px solid;
  }
  .replies-title {
    width: 95%;
    align-items: flex-start;
    font-size: 14px;
    margin: 0 auto;
    color: #666;
  }
  .replies-title > span {
    margin-left: 10px;
    color: #08c;
  }
  a {
    text-decoration: none;
    margin-left: 10px;
  }
  .replies-text {
    width: 95%;
    margin: 0 auto;
  }
  .split {
    margin: 1px auto;
    width: 100%;
    height: 1px;
    background: #999999;
  }
  .icon-dianzan {
    width: 30px;
    height: 30px;
  }
}
</style>