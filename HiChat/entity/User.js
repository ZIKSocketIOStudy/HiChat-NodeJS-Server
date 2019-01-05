/**
 *  @Author : ZacharyIcoderKong
 *  @Date : 2019/1/5
 **/

var mongoose = require('mongoose');//引入mongoose模块

var db = require('../config/mongoose');

var  userSchema = mongoose.Schema({
    userId:Number,
    name:String,
    headUrl:String,//头像
    thumbHeadUrl:String,//头像缩略图
    nickname:String,//昵称
    password:String,//密码
    auth_token:String,
    auth_date:Number,
    sign:String,//签名
    sex:Number,//性别
    email:String,//邮箱
    birth:String,//生日
    mobile:String,//电话
    ext:String//用户自定义扩展字段
});

var User = mongoose.model('User', userSchema);

//保存
var save = function (userName,password,headUrl,callBack) {
    //生成token
     var mtoken = zimGlobal.util.generateUUID();
     //生成token 对应的失效日期
    var auth_date = zimGlobal.util.dateAdd("m", 2, new  Date()).getTime();
    //实例化，实例化的时候，new User
    var userN = new  User({
        name:userName,password:password,headUrl:headUrl,thumbHeadUrl:headUrl,nickname:userName,
        auth_token:mtoken, auth_date: auth_date,
        sign:"暂无签名",sex:0,email:"",birth:"",mobile:"",ext:""
    });
};

module.exports = {
    User,
};