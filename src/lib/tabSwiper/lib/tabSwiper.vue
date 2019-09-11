<template>
  <div class="tab-swiper">
    <div class="tabbar">
      <ul class="tab-wrapper" ref="twrapper">
        <li
          :class="state.tCurrentIndex===index?'tab-slide active':'tab-slide'"
          v-for="(item,index) in tabList"
          :key="index"
          :style="tabWidth"
          @click="tabSwitch(index)"
        >{{item}}</li>
      </ul>
    </div>
    <div class="swiperbar">
      <div class="swiperbar-wraper" :style="swiperWidth" ref="swraper">
       <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import {
  _translate,
  _transform,
  _transitionDuration,
  _getTranslate,
  _getSize
} from "../utils";
export default {
  name: "TabSwiper",
  props:['tabList'],
  data() {
    return {
      state: {
        tWrawpper: null, //tab   容器变量
        sWrapper: null, //swiper 容器变量
        tStartX: 0, // tab touch事件开始距离
        sStartX: 0, //swiper touch事件开始距离
        tMoveX: 0, // tab touch 滑动距离
        sMoveX: 0, // swiper 滑动距离
        tTranslateX: 0, //tab 切换的横向距离
        sTranslateX: 0, //swiper 切换的横向距离
        transitionDuring: 300, //滑动时间
        tCurrentIndex: 0, //tab 当前索引
        sCurrentIndex: 0, // swiper 当前索引
        tPreIndex: 0, //tab 前一个索引
        sPreIndex: 0, //swiper 前一个索引
        sSlideWd: 0, // swiper 每次滑动的距离
        currentTranslate: {
          x: 0,
          y: 0
        }, //当前的translate值
        sdedLine: 60 //swiper 滑动底线
      }
    };
  },
  computed: {
    /**
     * 初始化 tab样式
     */
    tabWidth() {
      let tabStyle = `width:${100 / this.tabList.length}%`;
      return tabStyle;
    },
    /**
     * 初始化 swiper 样式
     */
    swiperWidth() {
      let swiperStyle = `width:${100 * this.tabList.length}%`;
      return swiperStyle;
    }
  },
  methods: {
    bind() {
      let { sWrapper } = this.state;
      let events = [
        {
          wraper: sWrapper,
          eventName: "touchstart",
          callFn: this.sTouchStart
        },
        {
          wraper: sWrapper,
          eventName: "touchmove",
          callFn: this.sTouchMove
        },
        {
          wraper: sWrapper,
          eventName: "touchend",
          callFn: this.sTouchEnd
        },
        {
          wraper: sWrapper,
          eventName: "transitionend | webkitTransitionEnd",
          callFn: this.swiperSlideEnd
        }
      ];
      events.forEach(item => {
        this.addEvent(item.wraper, item.eventName, item.callFn);
      });
    },
    /**
     *  监听事件
     *  @params {Object}   wraper:元素变量
     *  @params {String}   eventname:事件名称
     *  @params {Function} fn:事件回调
     */
    addEvent(wraper, eventname, fn) {
      if (eventname.includes(" | ")) {
        let events = eventname.split(" | ");
        events.forEach(item => {
          wraper.addEventListener(item, fn);
        });
      }
      wraper.addEventListener(eventname, fn);
    },
    /**
     * tab 点击切换
     */
    tabSwitch(index) {
      this.state.tPreIndex = this.state.tCurrentIndex;
      this.state.tCurrentIndex = index;
      this.swiperTranslate();
      this.$emit('tabChange',index);
    },
    swiperTranslate() {
      let { sWrapper, transitionDuring } = this.state;
      _translate(sWrapper, this.swiperSlidedis(), 0, 0);
      _transitionDuration(sWrapper, transitionDuring);
    },
    /**
     * 滑动回来
     */
    swiperRever() {
      let {
        sWrapper,
        transitionDuring,
        currentTranslate,
        sSlideWd
      } = this.state;
      let integer = Math.floor(currentTranslate.x / sSlideWd) * sSlideWd;
      _translate(sWrapper, integer, 0, 0);
      _transitionDuration(sWrapper, transitionDuring - 100);
    },
    sTouchStart(e) {
      this.state.sStartX =
        e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX;
      this.state.sMoveX = 0;
    },
    sTouchMove(e) {
      let {
        sStartX,
        sWrapper,
        transitionDuring,
        sSlideWd,
        currentTranslate,
        tCurrentIndex
      } = this.state;
      let currentX =
        e.type === "touchmove" ? e.targetTouches[0].pageX : e.pageX;
      this.state.sMoveX = Math.round(currentX - sStartX);
      //临界值
      if ((tCurrentIndex === 0) & (this.state.sMoveX > 0)) {
        return;
      }
      if (
        (tCurrentIndex === this.tabList.length - 1) &
        (this.state.sMoveX < 0)
      ) {
        return;
      }
      _translate(sWrapper, currentTranslate.x + this.state.sMoveX, 0, 0);
      _transitionDuration(sWrapper, transitionDuring);
    },
    targetMaxmove() {
      let { sMoveX, swraper, sSlideWd, sdedLine, tCurrentIndex } = this.state;
      if (Math.abs(sMoveX) <= sdedLine) {
        this.swiperRever();
      } else if (sMoveX > 0) {
        if (tCurrentIndex === 0) return;
        let index = this.state.tCurrentIndex;
        this.tabSwitch(--index);
      } else {
        if (tCurrentIndex === this.tabList.length - 1) return;
        let index = this.state.tCurrentIndex;
        this.tabSwitch(++index);
      }
    },
    sTouchEnd() {
      this.targetMaxmove();
    },
    /**
     * 切换滑动逻辑
     */
    swiperSlidedis() {
      let {
        sWrapper,
        sSlideWd,
        tCurrentIndex,
        tPreIndex,
        currentTranslate
      } = this.state;
      let integer = Math.floor(currentTranslate.x / sSlideWd) * sSlideWd;
      //判断是往左边切换还是往右边切换
      sSlideWd =
        tPreIndex - tCurrentIndex < 0
          ? -sSlideWd * tCurrentIndex
          : integer + sSlideWd * (tPreIndex - tCurrentIndex);
      return sSlideWd;
    },
    /**
     * slide end事件
     */
    swiperSlideEnd() {
      let { sWrapper, sSlideWd, sMoveX } = this.state;
      this.state.currentTranslate = _getTranslate(sWrapper) || 0;
    }
  },
  mounted() {
    this.state.sWrapper = this.$refs.swraper;
    this.state.twrapper = this.$refs.twrapper;
    this.state.sSlideWd =
      _getSize(this.state.sWrapper).width / this.tabList.length;
    this.bind();
  }
};
</script>
<style scoped>
.tabbar .tab-slide {
  display: inline-block;
  height: 36px;
  line-height: 36px;
  text-align: center;
}
.tabbar .tab-slide.active {
  color: red;
}

.swiperbar {
  overflow-x: hidden;
  width: 100%;
}
.swiperbar .swiperbar-wraper {
  width: 200%;
  display: flex;
}
.swiperbar-wraper .swiperbar-slide {
  width: 50%;
  display: flex;
}
</style>