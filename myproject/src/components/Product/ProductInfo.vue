<template>
  <div>
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <div class="mui-card">
      <div class="mui-card-header">{{ prodInfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <img :src="prodInfo.img_url" alt />
        </div>
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ prodInfo.market_price }}</del>&nbsp;&nbsp;
            <br />销售价：
            <span class="now_price">￥{{ prodInfo.sell_price }}</span>
          </p>
          <p>库存情况：{{ prodInfo.stock_quantity }}件</p>
          <p>
            购买数量：
            <numbox @getcount="getSelectedCount" :max="prodInfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../subComponents/NumBox.vue";
export default {
  data: function() {
    return {
      id: this.$route.params.id,
      prodInfo: {},
      selectedCount: 1,
      ballFlag: false
    };
  },
  created: function() {
    this.getProList();
  },
  methods: {
    getProList() {
      var url = `shopCar/prodlist?id=${this.id}`;
      this.$http.get(url).then(result => {
        this.prodInfo = result.body[0];
      });
    },
    getSelectedCount(msg) {
      this.selectedCount = msg;
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
      var product = {
        id: this.id,
        count: this.selectedCount,
        price: this.prodInfo.sell_price,
        selected: true
      };
      this.$store.commit("addToCar", product); //vuex 调用addToCar
    },
    // 添加购物车小球动画
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      el.style.transform = `translate(10px, 340px)`;
      el.style.transition = "all .5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="css" scoped>
.mui-card-content {
  display: flex;
}

.mui-card-content-inner {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.mui-card-content-inner img {
  width: 120px;
  height: 120px;
}

.now_price {
  color: red;
  font-size: 16px;
  font-weight: bold;
}

.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  z-index: 99;
  top: 255px;
  left: 280px;
}
</style>