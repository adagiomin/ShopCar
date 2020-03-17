## 介绍
跟着视频学Vue的时候，
## 使用

## 过程

### 创建Node服务器
    
### 编写商品列表界面
#### 子组件NumBox
  + 使用mui.css
  + 解决引入mui.js导致的3个问题 
  + 实现父子组件的交流
  - 父组件给子组件传递库存数max，用于设置NumBox的上限
  - 子组件数量变化的时候，传当前值给父组件
### 实现加入购物车
### vuex实现购物车信息的管理
### 返回上一级
```javascript
this.$router.go(-1);
```

### 实现页面跳转动画
```html
<transition>
  <router-view></router-view>
</transition>
```

```css
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
```
### 加入购物车小球动画
```html
<transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
  <div class="ball" v-show="ballFlag" ref="ball"></div>
</transition>
```
```javascript
 methods: {
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
```
