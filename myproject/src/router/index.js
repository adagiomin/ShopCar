import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//解决报错：Uncaught (in promise)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

import Products from '@/components/Products'   //@表示src(webpack.base.config.js中设置)
import ProductInfo from '@/components/ProductInfo'
import ShopCar from '@/components/ShopCar'

export default new Router({
  routes: [
    { path: '/', redirect: '/products', component: Products },
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