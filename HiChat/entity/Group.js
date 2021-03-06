/**
 *  @Author : ZacharyIcoderKong
 *  @Date : 2019/1/5
 **/

var mongoose = require('mongoose'); //引入mongoose模块

var db = require('../config/mongoose.js');
var vfGroupUser = require('../entity/GroupUser.js');
var GroupSchema = mongoose.Schema({
    group_id: String,        //群聊 房间id (群聊时房间id)
    group_name: String,      //群聊 房间名称 (群聊时房间name)
    user_id: String,         //群里的人
    creat_id: String,        //创建的人 id
    creat_name: String,      //创建的人 name
    creat_date: String,      //创建时间
});
var Group = mongoose.model('Group', GroupSchema);

//加入群
var joinGroup = function (userName, group_name, callBack) {

    Group.findOne({group_name: group_name, creat_name: userName}, function (err, data) {

        if (data) { //说明 群已经存在 那么就加群
            vfGroupUser.findAndInsert(data.group_id, userName, data.group_name, function () {
                callBack("");
            });
        } else {
            callBack("群不存在");
        }
    });
}

// 注册
var createGroup = function (res, req) {
    var  userName  = req.body.userName;
    var group_name = req.body.group_name;
    create(userName,group_name,function () {
        res.json({
            code: 1,
            message: "创建群成功",
            data: {
                auth_token: group_name
            }
        });
    });
}

//创建群
var create = function (userName, group_name, callBack) {

    var group = new Group({
        group_id: vfglobal.util.generateUUID(),
        group_name: group_name,
        user_id: "123",        //字段保留
        creat_id: group_name,
        creat_date: new Date().getTime(),
        creat_name: userName,
    });

    vfglobal.MyLog("group_id" + group.group_id);
    Group.findOne({group_name: group_name, creat_name: userName}, function (err, data) {

        if (data) { //说明 群已经存在
            vfglobal.MyLog("群：" + group_name + "已经存在");
            callBack();
        } else {
            //保存
            group.save(function (err) {
                if (err) {
                    vfglobal.MyLog("群：" + group_name + "创建失败" );

                } else {
                    vfglobal.MyLog("群：" + group_name + "创建成功");     //创建 成功自动 加群

                    vfGroupUser.create(group.group_id, userName, group.group_name); //关联

                    callBack();
                }
            });
        }

    });
}

//离开了群
var leave = function (userName, group_name, callBack) {

    Group.findOne({group_name: group_name, creat_name: userName}, function (err, data) {

        if (data) { //说明 群已经存在
            vfGroupUser.leave(data.group_id, userName, group_name,function () {
                callBack();
            });
        } else {
            vfglobal.MyLog("没这个群");
        }
    });
}

module.exports = {
    Group,
    createGroup,
    create,
    joinGroup,
    leave,
};