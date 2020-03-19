## 介绍

为了回顾学习的vue内容，将视频中一个大的项目里的购物车这一块单独拎出来写了个小demo。说难也不难，就是对所学的vue知识进行了个整合，实现了三个界面间的操作以及状态管理，但是说简单也不简单，虽然有点基础但独立写下来还是有些吃力。

>注意：由于demo中用到了vue-resource用来实现商品信息的获取，不得不建了个简易的node服务器搭配数据库使用。如果不想用到服务器，那么只要将Products.vue、ProductInfo.vue、ShopCar.vue中通过vue-resource获取的数据全都写死即可，字段和字段值可参考myproject.sql中的信息。

## 项目结构
+ myproject
  
  为项目前端部分，用vue-cli快速构建而成。

+ myserver

  一个很简单的服务器，node express开发，实现数据库的查询以及对前端请求的响应

+ myproject.sql

  数据库sql文件

## 项目运行
+ 数据库
 
  直接在mysql中运行myproject.sql

+ 服务器

  **注意：config/dbConfig.js中的配置信息需要修改成你自己的数据库信息**
  
  `nodemon app.js`
  
+ 前端

  - 安装所有依赖包

    `npm install`

  - 运行
  
    `npm run dev`
