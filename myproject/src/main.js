import Vue from 'vue'
import App from './App'

// 样式重置
// import './assets/styles/reset.css'    //移动端样式重置，将不同的手机的初始化样式做一个统一
import './assets/styles/border.css'   //解决分辨率较高的移动端1像素边框被显示成多倍像素

// fastClick  解决在某些机型中使用click会延迟3s进行
import fastClick from 'fastclick'
Vue.config.productionTip = false
fastClick.attach(document.body)

// Mint-UI
import { Header, Button, Switch } from 'mint-ui';
Vue.component(Header.name, Header);   //App.vue顶部用到
Vue.component(Button.name, Button);   //App.vue顶部返回按钮用到
Vue.component(Switch.name, Switch);   //购物车页开关用到
import 'mint-ui/lib/style.css'

// mui
import './assets/lib/mui/css/mui.css'
import './assets/lib/mui/fonts/mui-icons-extra.ttf'
import './assets/lib/mui/css/icons-extra.css'
import './assets/styles/index.css'

// VueResource
// import VueResource from 'vue-resource'
// Vue.use(VueResource)
// // 配置请求的数据接口根域名
// // Vue.http.options.root = 'http://127.0.0.1:3000/'   //3/19服务器前端合二为一后，不需要该句话了
// //全局启用emulateJSON选项,post时就不需要再设置emulateJson
// Vue.http.options.emulateJson = true

// 过滤器 - 使用moment库对时间进行处理
import moment from 'moment'   //日期处理类库
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
  mutations: { //this.$store.commit('方法名', '唯一的参数')
    // 商品页面'加入购物车'操作
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
    //购物车界面删除商品
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
    },
    // 购物车中更新商品的选中状态
    updateProdsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    //购物车种更新商品的购买数量
    updateprodsInfo(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.count = info.count
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
  },
  getters: {   // this.$store.getters.方法名
    //得到购物车中已选择的商品总量，用于在底部购物车图标上方的小红圈中显示
    getProdsSelectedCount(state) {
      var count = 0;
      state.car.forEach(item => {
        if (item.selected) {
          count += item.count
        }
      })
      return count
    },
    //得到购物车种各个商品的数量，用于在购物车界面numbox中显示商品当前购买数量
    //返回数组，根据商品id来获取其数购买量$store.getters.getProdsCount[item.id]
    getProdsCount(state) {
      var o = []
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    //得到购物车种各个商品的选择状态，用于在购物车界面设置商品的选中状态
    //返回数组，根据商品id来获取其选中状态$store.getters.getProdsSelected[item.id]
    getProdsSelected(state) {
      var o = []
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    //得到购物车总的选择数量和总价，用于在结算框中显示
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

import router from './router'

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
