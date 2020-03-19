<template>
  <div id="app">
    <!-- 顶部Header区域 -->
    <mt-header fixed title="我的商城">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <!-- 中间 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-llb" to="/products">
        <!-- <a class="mui-tab-item" @click.prevent="link2"> -->
        <span class="mui-icon mui-icon-list"></span>
        <span class="mui-tab-label">商品</span>
        <!-- </a> -->
      </router-link>
      <router-link class="mui-tab-item-llb" to="/shopcar">
        <!-- <a class="mui-tab-item" @click.prevent="link3"> -->
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" ref="count">{{$store.getters.getProdsSelectedCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
        <!-- </a> -->
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      flag: false
    };
  },
  created() {
    this.flag = this.$route.path === "/home" ? false : true;
  },
  mounted() {
    //初始化 购物车图标上的红色小球状态
    this.$refs.count.style.visibility =
      this.$store.getters.getProdsSelectedCount === 0 ? "hidden" : "visible";
  },
  methods: {
    // link2() {
    //   this.$router.push("/products");
    // },
    // link3() {
    //   this.$router.push("/shopcar");
    // },
    goBack() {
      this.$router.go(-1);
    }
  },
  watch: {
    // 监控路由 实现返回按钮功能的实现
    "$route.path": function(newVal) {
      //一级导航都不用返回按钮
      if (
        newVal === "/home" ||
        newVal === "/products" ||
        newVal === "/shopcar"
      ) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    //监听购物车 图标上的红色小球状态
    "$store.getters.getProdsSelectedCount": function(newVal) {
      this.$refs.count.style.visibility = newVal === 0 ? "hidden" : "visible";
    }
  }
};
</script>

<style lang="css" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  padding-top: 40px;
  overflow-x: hidden;
  padding-bottom: 50.4px;
}

.mint-header {
  z-index: 99;
}

/* 进来从100%位置进来 */
.v-enter {
  opacity: 0.5;
  transform: translateX(100%);
}

/* 出去的时候到-100% */
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.mui-bar-tab .mui-tab-item-llb.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item-llb {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
