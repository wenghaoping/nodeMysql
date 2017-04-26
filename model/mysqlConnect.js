var db    = {};
var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '0p-0p-0p-',
    database        : 'chat'
});
/*查询
* sql:  查询语句
* */
db.query = function(sql, callback){
    if (!sql) {
        callback();
        return;
    }
    pool.query(sql, function(err, rows, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        };

        callback(null, rows, fields);

    });
}
/*新增
* insertsql    新增语句
* insertSql_Params 新增参数
* */
db.insert = function (insertsql, insertSql_Params, callback) {
    if (!insertsql) {
        callback();
        return;
    }
    pool.query(insertsql, insertSql_Params,function(err, rows, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        };

        callback(null, rows, fields);
    });
}

/*修改
 * Updatesql    修改语句
 * Update_Params 修改参数
 * */
db.upadate = function (Updatesql, Update_Params, callback) {
    if (!Updatesql) {
        callback();
        return;
    }
    pool.query(Updatesql, Update_Params,function(err, rows, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        };

        callback(null, rows, fields);
    });
}

/*删除
 * sql: 删除语句
 * */
db.delete = function(Delsql, callback){
    if (!Delsql) {
        callback();
        return;
    }
    pool.query(Delsql, function(err, rows, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        };

        callback(null, rows, fields);

    });
}


module.exports = db;

