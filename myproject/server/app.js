var express = require('express')
var app = express()

//静态资源
app.use('/public/',express.static('./public'))
app.use('/node_modules/',express.static('./node_modules'))

// //CORS跨资源共享
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:8080");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });

var routerCar = require('./routes/routerCar')  //引入路由模块

app.use('/shopCar',routerCar)

app.listen(3000,function(){
    console.log('server is running')
})
