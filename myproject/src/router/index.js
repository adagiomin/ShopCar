import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

import Products from '@/components/Products'   //@表示src(webpack.base.config.js中设置)
import ProductInfo from '@/components/Product/ProductInfo'
import ShopCar from '@/components/ShopCar'
import Home from '@/components/Home'

export default new Router({
  routes: [
    { path: '/', redirect: '/home', component: Home },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/products/:id',
      name: 'ProductInfo',
      component: ProductInfo
    },
    {
      path: '/shopcar',
      name: 'ShopCar',
      component: ShopCar
    }
  ],
  linkActiveClass: 'mui-active'  //覆盖默认的选中某个路由时候的高亮类
})