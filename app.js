var createError = require('http-errors');
var express = require('express');
const handlebars = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const knex = require('./db/knex');
var indexRouter = require('./routes/index');
var gamesRouter = require('./routes/games');
var profileRouter = require('./routes/profile');

var app = express();

// view engine setup
app.engine(
  'hbs',
  handlebars({
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    defaultLayout: 'main',
    extname: 'hbs'
  })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.locals.user = async () => {
  const user = await knex('player_list').select()
    .where('player_id', 1);
  console.log(user);
  console.log('User helper has been called');
  return user;
};
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.username =
app.use('/', indexRouter);
app.use('/games', gamesRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
