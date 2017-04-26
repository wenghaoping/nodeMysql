/**
 * Created by WengHaoping on 2017/4/10.
 */
/**
 * mysql连接池模块
 */

var mysql=require("mysql");
/**
 * 连接池建立
 * @pool {object}
 */
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '0p-0p-0p-',
    database: 'chatdemo',
    port: 3306
});

/**
 * select和delete操作
 * @param  {string}   sql      sql语句
 * @param  {Function} callback 回调函数
 * @return {none}
 */
var sdQuery=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){

            console.log('CONNECT ERROR:', err.message);
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

/**
 * update和insert操作
 * @param  {string}   sql      sql语句
 * @param  {array}    params   参数数组
 * @param  {Function} callback 回调函数
 * @return {none}
 */
var uiQuery=function(sql,params,callback){
    pool.getConnection(function(err,conn){
        if(err){

            console.log('CONNECT ERROR:', err.message);
            callback(err,null,null);
        }else{
            conn.query(sql,params,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};

/**
 * query函数重载
 * @return {none}
 */
var query = function(){

    var len = arguments.length;
    if(len==2) {
        var sql = arguments[0];
        var cb = arguments[1];
        sdQuery(sql, cb);
    } else if(len == 3){
        var sql = arguments[0];
        var params = arguments[1];
        var cb = arguments[2];
        uiQuery(sql, params, cb);

    } else {
        console.log('ERROR:', '传参不对');
    }
};




// 暴露接口
module.exports = query;