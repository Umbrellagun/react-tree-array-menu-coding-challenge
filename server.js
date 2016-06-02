'use strict'
const express        = require('express');
const logger         = require('morgan');
const path           = require('path');
const bodyParser     = require('body-parser');
const moment         = require('moment');
const app            = express();

if(process.env.NODE_ENV === 'dev'){
  app.use(logger('dev'));
} else {
  app.use(logger('common'));
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
  res.render('pages/home');
})

app.get ('*', (req, res)=>{
  res.render('pages/home');
})

var port = process.env.PORT || 1337;
var currentDateTime = moment().format('MMMM Do YYYY, h:mm:ss a');
var server = app.listen(port, ()=>console.log('Server online, Sir. Date and time is ' + currentDateTime));
