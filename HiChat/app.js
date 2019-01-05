/**
 *  @Author : ZacharyIcoderKong
 *  @Date : 2019/1/5
 **/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var zimUtiils = require('./utils/utils.js');
var zimLog = require('./utils/MyLog.js');
var redis = require('redis');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var bodyParse = require('body-parser');
app.use(bodyParse.json({limit:'50mb'}));
app.use(bodyParse.urlencoded({limit:'50mb',extended: true}));

//session公式
var session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//模版引擎
app.set('view engine', 'ejs');
//静态服务
app.use(express.static("./public"));
app.use(session({
    secret:'keyboard cat',
    resave: true,
    cookie:{maxAge: 35 * 60 * 1000},
    saveUninitialized: true,
    rolling:true
}));

//socket.io 公式
var http = require('http').Server(app);
var  io = require('socket.io')(http, {
    pingInterval: 5000,
    pingTimeout: 3000,
    cookie: false,
    reconnection: true
});

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

global.zimGlobal = {
    //在线用户
    allUser: [],
    //所有的 token:user
    token_Map:{},
    //保存所有的user:socket 连接
    socket_map: {},
    //前端是否登录
    isLogin:-1,
    //utile
    util: zimUtiils,
    zimLog: zimLog,
    io: io,
    redis:redis,
};


module.exports = app;
