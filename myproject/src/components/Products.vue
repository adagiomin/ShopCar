<template>
  <div>
    <div class="mui-card" v-for="item in prodList" :key="item.id" @click="goDetail(item.id)">
      <div class="mui-card-header">{{ item.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <img :src="item.img_url" alt />
        </div>
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ item.market_price }}</del>&nbsp;&nbsp;<br>
            销售价：
            <span class="now_price">￥{{ item.sell_price }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function() {
    return {
      prodList: []
    };
  },
  created: function() {
    this.getProList();
  },
  methods: {
    getProList() {
      axios.get("shopCar/prodlist").then(result => {
        // console.log(result)
        this.prodList = result.data;
      });
    },
    goDetail(id) {
      this.$router.push({ name: "ProductInfo", params: { id } });
    }
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
</style>