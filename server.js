var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser=require('body-parser');
var morgan=require('morgan');

const router=express.Router();
const allowCors = require('./config/cors');
const shB=require('./routes/books');
const userRoutes=require('./routes/users');
var server = express();

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'pug');

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(allowCors);
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

server.use(morgan('dev'));
server.use(bodyparser.json());
//server.use("/api", router);
server.use('/items',shB);
server.use('/user',userRoutes);



// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = server;
