<template>
  <div style="background:white">
    <!-- 导航栏 -->
    <div class="nav">
      <ul class="flex">
        <li>全部</li>
        <li>精选</li>
        <li>分享</li>
        <li>问答</li>
        <li>招聘测试</li>
      </ul>
    </div>
    <div class="contior">
      <!-- 循环当页数据 -->
      <div class="content flex" v-for="(item,index) in arr[currentPage4-1]" :key="index" :class="{'li': num === index}"  @mouseenter="changecolor(index)" @mouseleave="changecolor1">
        <div
          class="content-left flex" 
        >
          <img :src="item.author.avatar_url" width="30" />
          <div class="mounts flex">
            <span>{{item.reply_count}}</span>/
            <span>{{item.visit_count}}</span>
          </div>
          <div class="tab0 flex">
            <span class="tab" v-if="item.top">置顶</span>
            <span class="tab" v-else-if="(item.tab==='share')">分享</span>
            <span class="tab" v-else-if="(item.tab==='ask')">问答</span>
          </div>
          <!-- 点击标题跳转页面 -->
          <div class="title flex" @click="jumpDetails(item)">{{item.title}}</div>
        </div>
        <!-- 获取距当前时间 -->
        <div class="content-right flex">{{distanceTime(item.last_reply_at)}}</div>

        <!-- <div class="title flex"><span>{{item.title}}</span></div> -->
      </div>
    </div>
    <!-- 分页栏 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="value"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="topics.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topics: [],
      currentPage4: 1,
      value: false,
      pageSize: 20,
      arr: [],
      pageNumber: 0,
      id: "",
      num: -1
    };
  },
  components: {},
  methods: {
    changecolor(index) {
      this.num = index;
    },
     changecolor1(index) {
      this.num = -1;
    },
    // 对数据进行分组
    paging() {
      this.arr = [];
      for (let i = 0; i < this.topics.length; i += this.pageSize) {
        this.arr.push(this.topics.slice(i, i + this.pageSize));
      }
    },
    // 获取主题数据
    getData() {
      this.$axios
        .req("topics")
        .then(res => {
          this.arr = [];
          if (res.success) {
            this.topics = res.data;
            this.paging();
          }
          // let a = `v2/pois/${res.latitude},${res.longitude}`;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取当前每页有多少条
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.paging();
      console.log(this.arr);
    },
    // 获取当前页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage4 = Number(val);
    },
    // 获取最后回复日期并计算距当前日期
    distanceTime(oldTime) {
      let newTime = new Date();
      //  let time2 = this.$dayjs(newTime).format('YYYY-MM-DD hh:mm:ss')
      // valueOf是转换成时间戳
      let sputTme =
        this.$dayjs(newTime).valueOf() - this.$dayjs(oldTime).valueOf();
      let time = sputTme / (24 * 60 * 60 * 1000);
      let hour = sputTme / (60 * 60 * 1000);
      let minu = sputTme / (60 * 1000);
      if (time >= 1) {
        return parseInt(time) + "天前";
      } else if (time < 1 && hour >= 1) {
        return parseInt(hour) + "小时前";
      } else if (hour < 1) {
        return parseInt(minu) + "分钟前";
      }
    },
    // 跳转到详情页
    jumpDetails(item) {
      this.id = item.id;
      this.$router.push({ name: "details", query: { id: this.id } });
    }
  },
  mounted() {
    this.getData();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
* {
  margin: 0;
  padding: 0;
}
.li{
    background: rgb(214, 200, 200) !important;
  }
.nav {
  width: 100%;
  margin: 0 auto;
  height: 40px;
  background: #f6f6f6;
}
.nav > ul {
  width: 1042px;
  margin: 0 auto;
  height: 40px;
  justify-content: flex-start;
}
.nav > ul > li {
  margin: 0 10px;
  color: #80bd01;
  line-height: 20px;
  font-size: 14px;
}
.nav > ul > li:hover {
  cursor: pointer;
  color: #3362b9;
}
.nav > ul > li:nth-child(1) {
  background: #80bd01;
  color: #fff;
}
.content {
  width: 1042px;
  height: 30px;
  margin: 10px auto;

  .content-left {
    justify-content: flex-start;
    height: 30px;
    width: 90%;
  }
  .mounts {
    margin-left: 10px;
    width: 80px;
    height: 20px;
    text-align: left;
    justify-content: center;
  }
  .mounts > span:nth-child(1) {
    text-align: left;
    height: 20px;
    font-size: 15px;
    line-height: 20px;
    color: #9e78c0;
  }
  .mounts > span:nth-child(2) {
    text-align: left;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
  }

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
    background-color: #e5e5e5;
  }
  .title {
    width: 660px;
    height: 30px;
    margin-left: 8px;
    font-size: 16px;
    color: #333333;
    line-height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content-right {
    width: 100px;
    height: 30px;
    justify-content: flex-end;
    font-size: 11px;
    color: #778087;
  }
}
</style>
