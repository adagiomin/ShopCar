import Vue from 'vue'
import App from './App'

// 样式重置
// import './assets/styles/reset.css'
import './assets/styles/border.css'

// fastClick
import fastClick from 'fastclick'
Vue.config.productionTip = false
fastClick.attach(document.body)

// MinUI
// 顶部Header区域用到
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// mui
import './assets/lib/mui/css/mui.css'
import './assets/lib/mui/fonts/mui-icons-extra.ttf'
import './assets/lib/mui/css/icons-extra.css'
import './assets/styles/index.css'

import router from './router'

// VueResource
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://127.0.0.1:3000/'
Vue.http.options.emulateJson = true

// 过滤器
import moment from 'moment'
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

// VueX
import Vuex from 'vuex'
Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('car') || '[]')
const store = new Vuex.Store({
  state: {     // this.$store.state.***
    car: car
    // {
    //   id: ,
    //   count:,
    //   price:,
    //   selected:,
    // };
  },
  mutations: { //this.$store.commit('方法的名称', '按需传递唯一的参数')
    // 商品页面中
    addToCar(state, product) {
      //判断是否已存在
      var flag = false
      state.car.some(item => {
        if (item.id == product.id) {
          item.count += parseInt(product.count)
          flag = true
          return true
        }
      })
      // 不存在,则添加
      if (!flag) {
        state.car.push(product)
      }
      //更新本地的localStorage
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 购物车中
    updateProdsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateprodsInfo(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.count = info.count
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state, id) {
      // 根据Id，从store 中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true;
        }
      })
      // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {   // this.$store.getters.***
    //购物车中
    getProdsCount(state) {           //得到购物车种各个商品的数量
      var o = []
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getProdsSelectedCount(state) {  //得到购物车中已选择的商品总量
      var count = 0;
      state.car.forEach(item => {
        if (item.selected) {
          count += item.count
        }
      })
      return count
    },
    getProdsSelected(state) {    //得到商品选择与否信息
      var o = []
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0, // 勾选的数量
        amount: 0 // 勾选的总价
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
