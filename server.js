const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override'); // Add this line

require('dotenv').config()
require('./config/database')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const athletesRouter = require('./routes/athletes'); //athletes router
const teamsRouter = require('./routes/teams'); // teams router

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); ///////

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/athletes', athletesRouter);
app.use('/teams', teamsRouter);

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;