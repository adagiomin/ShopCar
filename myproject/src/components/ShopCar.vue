<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card" v-for="(item, i) in prodList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <!-- $store.getters.getProdsSelected得到购物车种所有商品的选择状态数组 [item.id] 为第几个-->
            <!-- v-model双向绑定 -->

            <img :src="item.img_url" />

            <mt-switch
              v-model="$store.getters.getProdsSelected[item.id]"
              @change="selectedChanged(item.id, $store.getters.getProdsSelected[item.id])"
            ></mt-switch>

            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initcount="$store.getters.getProdsCount[item.id]" :id="item.id"></numbox>
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件， 总价
              <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "./subComponents/ShopCarNumBox.vue";
import axios from "axios";
export default {
  data() {
    return {
      prodList: [] // 购物车中所有商品的数据
    };
  },
  created() {
    this.getProdList();
  },
  methods: {
    getProdList() {
      //取得购物车所有商品id
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      if (idArr.length <= 0) {
        //没有商品直接返回
        return;
      }
      // 获取购物车商品信息
      axios.get("shopCar/prodlist?id=" + idArr.join(",")).then(result => {
        this.prodList = result.data;
      });
    },
    selectedChanged(id, val) {
      this.$store.commit("updateProdsSelected", { id, selected: val });
    },
    remove(id, index) {
      // 点击删除，把商品从store中根据传递的Id 删除，
      //同时把当前组件中的 goodslist 中，对应要删除的那个商品，使用 index 来删除
      this.prodList.splice(index, 1);
      this.$store.commit("removeFormCar", id);
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>