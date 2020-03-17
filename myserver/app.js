var express = require('express')
var bodyParser = require('body-parser')
var app = express()

//POST
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//静态资源
app.use('/public/',express.static('./public'))
app.use('/node_modules/',express.static('./node_modules'))

//配置完成，使用路由
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
var routerCar = require('./routes/routerCar')  //引入路由模块
app.use('/shopCar',routerCar)

app.listen(3000,function(){
    console.log('server is running')
})
