var mysql = require('mysql')
var $dbConfig = require('../config/dbConfig')

// 使用连接池，避免开太多的线程，提升性能
var pool = mysql.createPool($dbConfig);

//导出查询相关  
var query=function(sql,callback){
    pool.getConnection(function(err,conn){    
        if(err){    
            callback(err,null,null);    
        }else{    
            conn.query(sql,function(qerr,vals,fields){    
                //释放连接    
                conn.release();    
                //事件驱动回调    
                callback(qerr,vals,fields);    
            });    
        }    
    });    
};

module.exports = query