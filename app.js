"use strict";

require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var myPokedex= require('./lib/pokedex.js');

var app = express();
const port = process.env.PORT

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/:name', function(req,res){
  res.send(myPokedex[req.params.name])
})

app.get('/type/:type', function(req,res){
  var findings=[];
  for(var seek in myPokedex){
    if(myPokedex[seek].type===req.params.type){
      findings.push(myPokedex[seek]);
    }
  }
  res.send(findings)
})

app.get('/species/:species', function(req,res){
  var findings=[];
  for(var seek in myPokedex){
    if(myPokedex[seek].species===req.params.species){
      findings.push(myPokedex[seek]);
    }
  }
  res.send(findings)
})

app.get('/IV/:IV1/:IV2', function(req,res){
  var findings=[];
  for(var seek in myPokedex){
    if(myPokedex[seek].IV>=req.params.IV1 && myPokedex[seek].IV<=req.params.IV2){
      findings.push(myPokedex[seek]);
    }
  }
  res.send(findings)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
