/**
 *  @Author : ZacharyIcoderKong
 *  @Date : 2019/1/5
 **/

var mongoose = require('mongoose'); //引入mongoose模块
// var db = mongoose.createConnection('mongodb://127.0.0.1:27017/chat',{useNewUrlParser:true});
// db.on('error', function(error) {
// 	console.log('数据库连接失败：' + error);
// });
// db.on('open', function() {
// 	console.log('——数据库连接成功！——' + new Date().toLocaleString());
// });

// var db = mongoose.connect("mongodb://127.0.0.1:27017/chat", {useNewUrlParser:true}, function(err){
//
//     if(err){
//
//         console.log('Connection Error:' + err)
//
//     }else{
//
//         console.log('Connection success!') }
//
// });

var URL = 'mongodb://127.0.0.1:27017/chat';

var db = mongoose.connect(URL,function(err){
    if(err){
        console.warn('数据库连接失败：'+err);
    }else {
        console.log('数据库成功连接到：'+URL);
    }
});


module.exports = db;