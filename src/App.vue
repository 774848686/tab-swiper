<template>
  <div id="app">
    <tab-swiper :tabList="menuData" @tabChange="tabChange">
      <div class="swiperbar-slide" v-for="(item,index) in swiperList" :key="index">
        <ul class="slide-wrapper">
          <li class="slide-item" v-for="(subitem,index) in item.list" :key="index">{{subitem}}</li>
        </ul>
      </div>
    </tab-swiper>
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      menuData: ["旅游娃娃", "自然风光", "亲子畅玩", "历史画卷"]
    };
  },
  computed: {
    /**
     * 初始化 swiper 数组
     */
    swiperList() {
      let templist = [];
      this.menuData.forEach((item, index) => {
        templist.push({
          tabid: item.id,
          list: [index + 1, index + 2, index + 3, index + 4]
        });
      });
      return templist;
    }
  },
  methods: {
    tabChange(data) {
      console.log(data);
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  user-select: none;
}
body {
  max-width: 750px;
  margin: 0 auto;
}
#app {
  min-height: 100vh;
  background: #f1f1f1;
}
.index-title {
  padding-top: 50px;
  font-weight: normal;
  text-align: center;
}
.submit-btn {
  width: 50%;
  height: 50px;
  margin: 100px auto 0;
  line-height: 50px;
  text-align: center;
  border-radius: 10px;
  background: #f00;
  color: #fff;
  cursor: pointer;
}
</style>
