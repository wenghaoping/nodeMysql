/**
 * Created by WengHaoping on 2017/4/11.
 */
var express = require("express");
var app = express();
var mysql = require("./model/mysql_pool.js");
var formidable = require('formidable');
var sd = require("silly-datetime");
var number = 1;
/*
* CREATE TABLE chat (
     number INT(11),
     NAME VARCHAR(255),
     chat VARCHAR(255),
     TIME VARCHAR(255)
 );
* */
//设置模板引擎
app.set("view engine", "ejs");

//静态
app.use(express.static("./public"));

//显示留言列表

app.get("/", function (req, res, next) {
        res.render("index");
});

//处理留言
app.post("/tijiao", function (req, res, next) {
    var userAddSql_Params=[];
    var form = new formidable.IncomingForm();
    //执行里面的回调函数的时候，表单已经全部接收完毕了。
    form.parse(req, function(err, fields) {
        if(err){
            throw err;
        }
        console.log(fields)
        var  userAddSql = 'INSERT INTO chat (number,name,chat,time) VALUES(?,?,?,?)';
        var date=sd.format(new Date(), "YYYY_MM_DD_HH:mm:ss");
        userAddSql_Params.push(number);
        userAddSql_Params.push(fields.name);
        userAddSql_Params.push(fields.liuyan);
        userAddSql_Params.push(date);
        console.log(userAddSql_Params);
        mysql(userAddSql,userAddSql_Params,function (err, rows, fields) {
            if(err){
                res.send({"result":-1}); //-1是给Ajax看的
                return;
            }
            res.json({"result":1});
            number++;
            console.log('新增成功 : ', rows);
        })
        //console.log("util"+util.inspect({fields: fields, files: files}));
        //所有的文本域、单选框，都在fields存放；
        //所有的文件域，files

    });
});

//读取所有留言，这个页面是供Ajax使用的
var querysql = 'SELECT * FROM chat ORDER BY TIME DESC;'
app.get("/du", function (req, res, next) {
    //可以接受一个参数
    mysql(querysql,function (err, rows, fields) {
        if (err) {
            console.log(err);
            return;
        }
        console.log({"result":rows});
        res.json({"result":rows});
    });
});


//删除留言
app.get("/del:time",function(req,res,next){

    var time = req.params.time;
    var delsql = 'DELETE FROM chat WHERE time ="'+time+'"';
    mysql(delsql,function (err, rows, fields) {
        if (err) {
            console.log(err);
            return;
        }
        res.json({"result":rows});
    });
})

app.listen(80);






