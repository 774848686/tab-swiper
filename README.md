# TabSwiper
这是基于tab栏跟content 滑动联动的一个组件

### 插件的安装
#### NPM 
```
npm i tabswiper
```
#### 引入插件
```
import Vue from 'vue';
import tabSwiper from 'tabswiper';

Vue.use(tabSwiper);
```

#### 基本用法  
```html
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
<style></style>
```

