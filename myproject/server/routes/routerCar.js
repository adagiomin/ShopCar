var express = require('express')
var router = express.Router()  //创建一个路由

var Products = require('../models/Products')

router.get('/prodlist',function(req,res){
    Products.getList(req.query.id,function(qerr,vals,fields){
        if(qerr){
            res.status(500).send('ERR')
        }else{
            res.json(vals)
        }
    })
})
module.exports = router  //导出router